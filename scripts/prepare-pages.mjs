import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const clientDir = path.resolve("dist/client");
const indexPath = path.join(clientDir, "index.html");

if (!existsSync(indexPath)) {
  throw new Error("Expected dist/client/index.html after the Pages prerender build.");
}

// TanStack's prerendered SPA shell is the GitHub Pages fallback for dynamic
// routes and legacy redirects. Unlike a copied homepage, it hydrates the
// requested client route without a markup mismatch.
if (!existsSync(path.join(clientDir, "404.html"))) {
  throw new Error("Expected TanStack's SPA shell at dist/client/404.html.");
}
await writeFile(path.join(clientDir, ".nojekyll"), "");

const customDomain = process.env.DOC_PAGES_CUSTOM_DOMAIN?.trim();
if (customDomain) {
  await writeFile(path.join(clientDir, "CNAME"), `${customDomain}\n`);
} else {
  await rm(path.join(clientDir, "CNAME"), { force: true });
}

const siteUrl = (
  process.env.VITE_SITE_URL ||
  (customDomain
    ? `https://${customDomain}`
    : "https://juleshaggard.github.io/DepartmentofConsentGithubPages")
).replace(/\/$/, "");

// Public marketing pages only. Scene Negotiator (/scene-negotiator and all
// child routes) is intentionally excluded from the sitemap and RSS feed.
const marketingPaths = [
  "/",
  "/coaching",
  "/workshops",
  "/about",
  "/resources",
  "/faq",
  "/book",
  "/privacy",
  "/terms",
  "/disclaimer",
  "/services/kink-coach-san-francisco",
  "/services/beginner-bdsm-coaching",
  "/services/kink-event-accompaniment",
  "/guides/preparing-for-your-first-kink-event",
  "/guides/how-to-enter-the-kink-scene",
  "/guides/how-to-negotiate-your-first-scene",
  "/guides/kink-red-flags-for-beginners",
  "/negotiate",
  "/guides",
];

async function discoverIndexRoutes(directory, relativeDirectory = "") {
  const entries = await readdir(path.join(directory, relativeDirectory), { withFileTypes: true });
  const discovered = [];
  for (const entry of entries) {
    const relativePath = path.join(relativeDirectory, entry.name);
    if (entry.isDirectory()) {
      discovered.push(...(await discoverIndexRoutes(directory, relativePath)));
    } else if (entry.name === "index.html") {
      const route = `/${relativeDirectory.split(path.sep).filter(Boolean).join("/")}`;
      discovered.push(route || "/");
    }
  }
  return discovered;
}

const shopPaths = (await discoverIndexRoutes(path.join(clientDir, "shop"), ""))
  .map((route) => (route === "/" ? "/shop" : `/shop${route}`))
  .sort();

const guidePaths = (await discoverIndexRoutes(path.join(clientDir, "guides"), ""))
  .map((route) => (route === "/" ? "/guides" : `/guides${route}`))
  .sort();

const sitemapPaths = Array.from(new Set([...marketingPaths, ...shopPaths, ...guidePaths]));

const urls = sitemapPaths
  .map(
    (route) => `  <url>
    <loc>${siteUrl}${route === "/" ? "/" : route}</loc>
  </url>`,
  )
  .join("\n");

await writeFile(
  path.join(clientDir, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`,
);

// GitHub Pages cannot issue server-side 301 responses. These generated pages
// preserve old field-guide links with an immediate canonical redirect, while
// the client router handles the same addresses during in-app navigation.
const fieldGuideSlugs = [
  ["01", "diy-kink-cheap-thrills"],
  ["02", "collar-me-devotion-and-desire"],
  ["03", "femininity-defined-by-you"],
  ["04", "bondage-beyond-rope"],
  ["05", "needles-care-and-doctor-play"],
  ["06", "whispers-tongues-and-ear-play"],
];
const legacyGuideRedirects = [
  { from: "/zines", to: "/guides" },
  ...fieldGuideSlugs.flatMap(([number, slug]) => {
    const to = `/guides/${slug}`;
    return [
      { from: `/guides/guide-${number}`, to },
      { from: `/zines/zine-${number}`, to },
    ];
  }),
];

const escapeHtmlAttribute = (value) =>
  value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");

for (const { from, to } of legacyGuideRedirects) {
  const target = `${siteUrl}${to}`;
  const outputDirectory = path.join(clientDir, ...from.split("/").filter(Boolean));
  await mkdir(outputDirectory, { recursive: true });
  await writeFile(
    path.join(outputDirectory, "index.html"),
    `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex, follow" />
    <meta http-equiv="refresh" content="0; url=${escapeHtmlAttribute(target)}" />
    <link rel="canonical" href="${escapeHtmlAttribute(target)}" />
    <title>Moved | Department of Consent</title>
  </head>
  <body>
    <p>This guide has moved. <a href="${escapeHtmlAttribute(target)}">Continue to the guide</a>.</p>
    <script>window.location.replace(${JSON.stringify(target)} + window.location.search + window.location.hash);</script>
  </body>
</html>
`,
  );
}

// robots.txt with the correct sitemap URL for this deployment target.
await writeFile(
  path.join(clientDir, "robots.txt"),
  `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`,
);

// RSS feed for the beginner guides.
const guides = [
  {
    title: "How to Enter the Kink Scene Without Pretending You Already Belong",
    path: "/guides/how-to-enter-the-kink-scene",
    description:
      "A practical beginner guide to entering the kink scene, finding events, learning etiquette, protecting privacy, vetting people, and exploring at your own pace.",
    pubDate: "Thu, 09 Jul 2026 00:00:00 GMT",
  },
  {
    title: "Preparing for Your First Kink Event",
    path: "/guides/preparing-for-your-first-kink-event",
    description:
      "Prepare for your first kink event with clear advice on event types, clothing, consent, etiquette, participation, privacy, substances, and exit planning.",
    pubDate: "Thu, 09 Jul 2026 00:00:00 GMT",
  },
  {
    title: "How to Negotiate Your First Kink Scene Without Feeling Awkward",
    path: "/guides/how-to-negotiate-your-first-scene",
    description:
      "A beginner guide to negotiating a first kink scene, including interests, boundaries, limits, health information, intensity, stop signals, and aftercare.",
    pubDate: "Thu, 09 Jul 2026 00:00:00 GMT",
  },
  {
    title: "Kink Red Flags Beginners Should Know",
    path: "/guides/kink-red-flags-for-beginners",
    description:
      "Learn how to recognize pressure, boundary testing, unsafe claims, manipulation, and other concerning behavior when entering the kink scene.",
    pubDate: "Thu, 09 Jul 2026 00:00:00 GMT",
  },
];

const escapeXml = (s) => s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

const items = guides
  .map(
    (g) => `    <item>
      <title>${escapeXml(g.title)}</title>
      <link>${siteUrl}${g.path}</link>
      <guid isPermaLink="true">${siteUrl}${g.path}</guid>
      <description>${escapeXml(g.description)}</description>
      <pubDate>${g.pubDate}</pubDate>
    </item>`,
  )
  .join("\n");

await writeFile(
  path.join(clientDir, "rss.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Department of Consent — Beginner Guides</title>
    <link>${siteUrl}/resources</link>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Practical guides to kink, consent, negotiation, and events for beginners.</description>
    <language>en-us</language>
${items}
  </channel>
</rss>
`,
);
