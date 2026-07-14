import { createReadStream } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";

const root = path.resolve("dist/client");
const indexPath = path.join(root, "index.html");
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
  return withLeadingSlash.replace(/\/+$/, "") || "/";
}

function previewUrl(pathname = "/") {
  if (basePath === "/") {
    return pathname;
  }

  return `${basePath}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
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

  if (basePath !== "/" && (pathname === "/" || pathname === basePath)) {
    return { redirect: previewUrl("/") };
  }

  if (basePath !== "/" && pathname.startsWith(`${basePath}/`)) {
    pathname = pathname.slice(basePath.length).replace(/^\/+/, "");
  } else if (basePath !== "/" && !path.extname(pathname)) {
    return { redirect: previewUrl(pathname) };
  } else {
    pathname = pathname.replace(/^\/+/, "");
  }

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
    res.end(`Use ${previewUrl("/")} for this GitHub Pages preview.\n`);
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

async function assertBuildMatchesPreviewBase() {
  const html = await readFile(indexPath, "utf8");
  const expectedAssetPrefix = basePath === "/" ? "/assets/" : `${basePath}/assets/`;
  const expectedStaticPrefix = basePath === "/" ? "/favicon.png" : `${basePath}/favicon.png`;
  const hasExpectedBase = html.includes(expectedAssetPrefix) || html.includes(expectedStaticPrefix);
  const hasRootAssets =
    html.includes('"/assets/') ||
    html.includes("'/assets/") ||
    html.includes('import("/assets/') ||
    html.includes("import('/assets/");

  if (basePath !== "/" && hasRootAssets && !hasExpectedBase) {
    console.error("");
    console.error("This dist/client build was generated for the custom-domain root path (/).");
    console.error(`Local staging is trying to serve it at ${basePath}/, which can blank the app.`);
    console.error("");
    console.error("Run this instead:");
    console.error("");
    console.error("  npm run build:pages:local");
    console.error("  npm run preview:pages");
    console.error("");
    process.exit(1);
  }

  if (basePath === "/" && html.includes("/DepartmentofConsentGithubPages/assets/")) {
    console.error("");
    console.error("This dist/client build was generated for the GitHub Pages repository path.");
    console.error("Root preview expects a custom-domain/root-path build.");
    console.error("");
    process.exit(1);
  }
}

const rootStat = await pathExists(root);
if (!rootStat?.isDirectory()) {
  console.error("Missing dist/client. Run `npm run build:pages:local` first.");
  process.exit(1);
}

const indexStat = await pathExists(indexPath);
if (!indexStat?.isFile()) {
  console.error("Missing dist/client/index.html. Run `npm run build:pages:local` first.");
  process.exit(1);
}

await assertBuildMatchesPreviewBase();

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
  console.log(`Local staging: http://${host}:${port}${previewUrl("/")}`);
});
