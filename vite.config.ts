import path from "node:path";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { loadEnv } from "vite";

const isGitHubPages = process.env.DOC_DEPLOY_TARGET === "github-pages";
const hasCustomDomain = Boolean(process.env.DOC_PAGES_CUSTOM_DOMAIN);
const githubPagesBase = hasCustomDomain ? "/" : "/DepartmentofConsentGithubPages/";

// Load all (non-VITE_) env vars into process.env for server routes
const serverEnv = loadEnv(process.env.NODE_ENV || "development", process.cwd(), "");
Object.assign(process.env, serverEnv);

export default defineConfig({
  cloudflare: isGitHubPages ? false : undefined,
  tanstackStart: {
    server: { entry: "server" },
    ...(isGitHubPages
      ? {
          prerender: {
            enabled: true,
            autoStaticPathsDiscovery: false,
            crawlLinks: false,
            failOnError: true,
            concurrency: 1,
          },
          // Public marketing pages (indexed) + unlinked noindex entry
          // points kept out of sitemap.xml.
          pages: [
            { path: "/" },
            { path: "/coaching" },
            { path: "/pricing" },
            { path: "/workshops" },
            { path: "/about" },
            { path: "/resources" },
            { path: "/faq" },
            { path: "/book" },
            { path: "/privacy" },
            { path: "/terms" },
            { path: "/disclaimer" },
            { path: "/services/kink-coach-san-francisco" },
            { path: "/services/beginner-bdsm-coaching" },
            { path: "/services/polyamory-coaching-for-beginners" },
            { path: "/services/kink-event-accompaniment" },
            { path: "/guides/preparing-for-your-first-kink-event" },
            { path: "/guides/how-to-enter-the-kink-scene" },
            { path: "/guides/how-to-negotiate-your-first-scene" },
            { path: "/guides/kink-red-flags-for-beginners" },
            { path: "/play-party-negotiation-form" },
            { path: "/play-party-negotiation-checklist" },
            { path: "/scene-negotiator" },
          ],
          sitemap: { enabled: false },
        }
      : {}),
  },
  vite: {
    base: isGitHubPages ? githubPagesBase : "/",
    resolve: {
      alias: {
        "entities/lib/decode.js": path.resolve(__dirname, "node_modules/entities/lib/decode.js"),
        "entities/lib/encode.js": path.resolve(__dirname, "node_modules/entities/lib/encode.js"),
        entities: path.resolve(__dirname, "node_modules/entities"),
      },
    },
  },
});
