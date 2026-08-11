import path from "node:path";
import { existsSync, readFileSync } from "node:fs";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { loadEnv } from "vite";

const PRERENDER_PATHS = [
  "/",
  "/coaching",
  "/pricing",
  "/workshops",
  "/about",
  "/podcast",
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
  "/play-party-negotiation-form",
  "/play-party-negotiation-checklist",
  "/scene-negotiator",
  "/shop",
  "/guides",
] as const;

const NOINDEX_PRERENDER_PATHS = ["/homepage-test", "/homepage-archive"] as const;

const PRERENDER_PATH_SET = new Set<string>([...PRERENDER_PATHS, ...NOINDEX_PRERENDER_PATHS]);

const isGitHubPages = process.env.DOC_DEPLOY_TARGET === "github-pages";
const hasCustomDomain = Boolean(process.env.DOC_PAGES_CUSTOM_DOMAIN);
const githubPagesBase = hasCustomDomain ? "/" : "/DepartmentofConsentGithubPages/";

function prerenderRoutePath(pagePath: string) {
  if (githubPagesBase === "/" || !pagePath.startsWith(githubPagesBase)) return pagePath;
  return `/${pagePath.slice(githubPagesBase.length)}`;
}

// Load all (non-VITE_) env vars into process.env for server routes
const serverEnv = loadEnv(process.env.NODE_ENV || "development", process.cwd(), "");
Object.assign(process.env, serverEnv);

// Local-only compatibility with the existing credential handoff. The value is
// never written into the repository or printed. CI provides the same variable
// through GitHub Actions secrets instead.
if (!process.env.VITE_FOURTHWALL_STOREFRONT_TOKEN) {
  const legacyTokenFile = path.resolve(__dirname, "../LW API.rtf");
  if (existsSync(legacyTokenFile)) {
    const token = readFileSync(legacyTokenFile, "utf8").match(/ptkn_[A-Za-z0-9_-]+/)?.[0];
    if (token) process.env.VITE_FOURTHWALL_STOREFRONT_TOKEN = token;
  }
}

export default defineConfig({
  cloudflare: isGitHubPages ? false : undefined,
  tanstackStart: {
    server: { entry: "server" },
    ...(isGitHubPages
      ? {
          spa: {
            enabled: true,
            maskPath: "/scene-negotiator/settings",
            prerender: {
              outputPath: "/404",
              crawlLinks: false,
            },
          },
          prerender: {
            enabled: true,
            autoStaticPathsDiscovery: false,
            crawlLinks: true,
            filter: ({
              path: pagePath,
              prerender: pagePrerender,
            }: {
              path: string;
              prerender?: { outputPath?: string };
            }) => {
              if (pagePrerender?.outputPath === "/404") return true;
              const routePath = prerenderRoutePath(pagePath);
              return (
                PRERENDER_PATH_SET.has(routePath) ||
                routePath.startsWith("/shop/") ||
                routePath.startsWith("/guides/")
              );
            },
            failOnError: true,
            concurrency: 1,
          },
          // Public marketing pages (indexed) + unlinked noindex entry
          // points kept out of sitemap.xml.
          pages: [...PRERENDER_PATHS, ...NOINDEX_PRERENDER_PATHS].map((pagePath) => ({
            path: pagePath,
          })),
          sitemap: { enabled: false },
        }
      : {}),
  },
  vite: {
    base: isGitHubPages ? githubPagesBase : "/",
    resolve: {
      alias: [
        {
          find: /^entities\/lib\/decode\.js$/,
          replacement: path.resolve(__dirname, "node_modules/entities/lib/decode.js"),
        },
        {
          find: /^entities\/lib\/encode\.js$/,
          replacement: path.resolve(__dirname, "node_modules/entities/lib/encode.js"),
        },
        {
          find: /^entities$/,
          replacement: path.resolve(__dirname, "node_modules/entities"),
        },
      ],
    },
  },
});
