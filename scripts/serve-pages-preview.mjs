import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";

const root = path.resolve("dist/client");
const host = process.env.HOST || "127.0.0.1";
const port = Number(process.env.PORT || 4173);
const basePath = normalizeBase(process.env.DOC_PAGES_BASE || "/DepartmentofConsentGithubPages/");

const mimeTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".ico", "image/x-icon"],
  [".jpeg", "image/jpeg"],
  [".jpg", "image/jpeg"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".mjs", "text/javascript; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".txt", "text/plain; charset=utf-8"],
  [".xml", "application/xml; charset=utf-8"],
]);

function normalizeBase(value) {
  const withLeadingSlash = value.startsWith("/") ? value : `/${value}`;
  return withLeadingSlash.replace(/\/+$/, "");
}

function sendHead(res, status, headers = {}) {
  res.writeHead(status, {
    "Cache-Control": "no-cache",
    ...headers,
  });
}

async function pathExists(filePath) {
  try {
    return await stat(filePath);
  } catch {
    return undefined;
  }
}

async function resolveFile(requestUrl) {
  const url = new URL(requestUrl || "/", `http://${host}:${port}`);
  let pathname = decodeURIComponent(url.pathname);

  if (pathname === "/" || pathname === basePath) {
    return { redirect: `${basePath}/` };
  }

  if (!pathname.startsWith(`${basePath}/`)) {
    return undefined;
  }

  pathname = pathname.slice(basePath.length).replace(/^\/+/, "");
  const relativePath = pathname || "index.html";
  let filePath = path.resolve(root, relativePath);

  if (!filePath.startsWith(root)) {
    return undefined;
  }

  const initialStat = await pathExists(filePath);
  if (initialStat?.isDirectory()) {
    filePath = path.join(filePath, "index.html");
  } else if (!initialStat && !path.extname(filePath)) {
    filePath = path.join(filePath, "index.html");
  }

  const finalStat = await pathExists(filePath);
  if (finalStat?.isFile()) {
    return { filePath, status: 200 };
  }

  return {
    filePath: path.join(root, "404.html"),
    status: 404,
  };
}

async function handleRequest(req, res) {
  const resolved = await resolveFile(req.url);

  if (resolved?.redirect) {
    sendHead(res, 302, { Location: resolved.redirect });
    res.end();
    return;
  }

  if (!resolved) {
    sendHead(res, 404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(`Use ${basePath}/ for this GitHub Pages preview.\n`);
    return;
  }

  const ext = path.extname(resolved.filePath);
  sendHead(res, resolved.status, {
    "Content-Type": mimeTypes.get(ext) || "application/octet-stream",
  });

  if (req.method === "HEAD") {
    res.end();
    return;
  }

  createReadStream(resolved.filePath).pipe(res);
}

const rootStat = await pathExists(root);
if (!rootStat?.isDirectory()) {
  console.error("Missing dist/client. Run `npm run build:pages` first.");
  process.exit(1);
}

const server = createServer((req, res) => {
  handleRequest(req, res).catch((error) => {
    sendHead(res, 500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(`${error?.stack || error}\n`);
  });
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${port} is already in use. Try PORT=${port + 1} npm run preview:pages`);
  } else {
    console.error(error);
  }
  process.exit(1);
});

server.listen(port, host, () => {
  console.log(`Local staging: http://${host}:${port}${basePath}/`);
});
