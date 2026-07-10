import { copyFile, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const clientDir = path.resolve("dist/client");
const indexPath = path.join(clientDir, "index.html");

if (!existsSync(indexPath)) {
  throw new Error("Expected dist/client/index.html after the Pages prerender build.");
}

// SPA fallback for client-side routes (Scene Negotiator deep links, legacy
// redirects). GitHub Pages serves 404.html for unknown paths.
await copyFile(indexPath, path.join(clientDir, "404.html"));
await writeFile(path.join(clientDir, ".nojekyll"), "");
await rm(path.join(clientDir, "CNAME"), { force: true });

const siteUrl = (
  process.env.VITE_SITE_URL || "https://juleshaggard.github.io/DepartmentofConsentGithubPages"
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
  "/services/polyamory-coaching-for-beginners",
  "/services/kink-event-accompaniment",
  "/guides/preparing-for-your-first-kink-event",
  "/guides/how-to-enter-the-kink-scene",
  "/guides/how-to-negotiate-your-first-scene",
  "/guides/kink-red-flags-for-beginners",
];

const urls = marketingPaths
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

const escapeXml = (s) =>
  s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

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
    <description>Practical guides to kink, consent, negotiation, events, and polyamory for beginners.</description>
    <language>en-us</language>
${items}
  </channel>
</rss>
`,
);
