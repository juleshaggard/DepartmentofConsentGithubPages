import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { publicSiteUrl, withBasePath } from "@/lib/app-url";
import { siteConfig } from "@/config/site";

import appCss from "../styles.css?url";

const GOOGLE_ANALYTICS_ID = siteConfig.analytics.googleAnalyticsId;

const googleAnalyticsScripts = GOOGLE_ANALYTICS_ID
  ? [
      {
        async: true,
        src: `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`,
      },
      {
        children: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GOOGLE_ANALYTICS_ID}', { send_page_view: false });
`,
      },
    ]
  : [];

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Old public URLs of the consent app (now Scene Negotiator) that may exist
 * as shared direct links. Scene/invite links carry their data in the URL
 * hash, so redirects must preserve it.
 */
const LEGACY_APP_PREFIXES = ["/sessions", "/join/", "/scene/"];
const LEGACY_APP_PATHS = new Set([
  "/kinks",
  "/onboarding",
  "/auth",
  "/subscribe",
  "/reset-password",
  "/checkout/return",
]);

function legacyRedirectTarget(pathname: string): string | null {
  if (pathname.startsWith("/scene-negotiator")) return null;
  if (
    LEGACY_APP_PREFIXES.some((p) => pathname === p.replace(/\/$/, "") || pathname.startsWith(p))
  ) {
    return `/scene-negotiator${pathname}`;
  }
  if (pathname === "/settings") return "/scene-negotiator/settings";
  if (LEGACY_APP_PATHS.has(pathname)) return "/scene-negotiator";
  return null;
}

function NotFoundComponent() {
  const router = useRouter();
  const { pathname } = useLocation();
  const target = legacyRedirectTarget(pathname);

  useEffect(() => {
    if (!target) return;
    const hash =
      typeof window !== "undefined" && window.location.hash
        ? window.location.hash.slice(1)
        : undefined;
    router.navigate({ to: target, hash, replace: true });
  }, [target, router]);

  if (target) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <p className="text-sm text-muted-foreground">Taking you to the new address…</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="section-label">Error 404</p>
        <h1 className="font-display text-5xl text-foreground">This page does not exist.</h1>
        <p className="mt-4 text-base text-muted-foreground">
          The address may have changed, or the link you followed is out of date. Nothing to be
          embarrassed about.
        </p>
        <nav className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-semibold">
          <Link to="/" className="underline underline-offset-4 hover:opacity-80">
            Home
          </Link>
          <Link to="/coaching" className="underline underline-offset-4 hover:opacity-80">
            Coaching
          </Link>
          <Link to="/guides" className="underline underline-offset-4 hover:opacity-80">
            Guides
          </Link>
          <Link to="/resources" className="underline underline-offset-4 hover:opacity-80">
            Resources
          </Link>
          <Link to="/faq" className="underline underline-offset-4 hover:opacity-80">
            FAQ
          </Link>
          <Link to="/book" className="underline underline-offset-4 hover:opacity-80">
            Book
          </Link>
        </nav>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold text-foreground">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href={withBasePath("/")}
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Kink Coaching for Beginners | Department of Consent" },
      {
        name: "description",
        content:
          "Practical kink coaching for adults ready to move from curiosity into real-world exploration. Virtual sessions and San Francisco event support.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: siteConfig.name },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: publicSiteUrl(siteConfig.defaultSocialImage) },
      { name: "twitter:image", content: publicSiteUrl(siteConfig.defaultSocialImage) },
      { name: "google-site-verification", content: "LUB9s3s53IiXuOCLky5t-49ByASpytHjLeco_ULPXqI" },
    ],
    links: [
      { rel: "icon", type: "image/png", href: withBasePath("/favicon.png") },
      { rel: "apple-touch-icon", href: withBasePath("/favicon.png") },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Phudu:wght@400..900&family=Trocchi&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
    scripts: [
      ...googleAnalyticsScripts,
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: siteConfig.name,
          url: publicSiteUrl("/"),
          logo: publicSiteUrl("/favicon.png"),
          email: siteConfig.contactEmail,
          founder: {
            "@type": "Person",
            name: siteConfig.founder,
          },
          description:
            "Beginner-focused kink coaching: practical education, one-to-one coaching, and nonsexual event support for adults.",
        }),
      },
      ...(siteConfig.analytics.plausibleDomain
        ? [
            {
              defer: true,
              "data-domain": siteConfig.analytics.plausibleDomain,
              src: siteConfig.analytics.plausibleScriptSrc,
            },
          ]
        : []),
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <AnalyticsPageView />
      <Outlet />
      <Toaster />
    </QueryClientProvider>
  );
}

function AnalyticsPageView() {
  const location = useLocation();

  useEffect(() => {
    if (!GOOGLE_ANALYTICS_ID || typeof window.gtag !== "function") return;

    const pagePath = `${location.pathname}${location.searchStr}`;
    window.gtag("event", "page_view", {
      page_title: document.title,
      page_location: `${window.location.origin}${pagePath}`,
      page_path: pagePath,
    });
  }, [location.pathname, location.searchStr]);

  return null;
}
