# Architecture & Migration Decisions

_Marketing-site build, July 2026._

## Existing architecture (found)

- **Stack:** TanStack Start v1 (React 19, file-based routes in `src/routes`),
  Vite 7, Tailwind CSS v4 (design tokens in `src/styles.css`), shadcn/Radix UI,
  TanStack Query.
- **Deployment:** `npm run build:pages` prerenders routes to static HTML in
  `dist/client`; `scripts/prepare-pages.mjs` adds `404.html` (SPA fallback),
  `.nojekyll`, `sitemap.xml`, `robots.txt`, `rss.xml`. GitHub Actions deploys
  on push to `main`.
- **Consent app data:** entirely client-side. Profiles/kinks/scenes in
  `localStorage` (`src/lib/storage.ts`); scene invite/response links encode
  compressed scene data in the URL hash (`src/lib/sceneLinks.ts`). No auth, no
  backend, no analytics. Legacy Supabase/Stripe env values in gitignored
  `.env.*` files are unused by this build.

## Key decisions

1. **Kept the stack.** TanStack Start prerendering already produces a static,
   SEO-capable site; no reason to replace it.
2. **Scene Negotiator moved by `git mv`.** All app routes renamed from
   `sessions.*`, `join.$token`, `scene.$token`, `kinks`, `onboarding`,
   `settings`, `index` → `scene-negotiator.*`, preserving git history. A
   `scene-negotiator.tsx` layout route adds `noindex, nofollow` to the whole
   subtree. Functionality, storage keys, and hash-encoded link formats are
   untouched, so existing localStorage data and previously shared links keep
   working.
3. **Rebrand is minimal.** Page titles now say "Scene Negotiator"; the app's
   internal visuals and copy are otherwise unchanged. It remains a Department
   of Consent product.
4. **Legacy redirects live in the root notFound handler**
   (`src/routes/__root.tsx`). GitHub Pages serves `404.html` (the SPA shell)
   for unknown paths, so old URLs (`/sessions*`, `/join/*`, `/scene/*`,
   `/kinks`, `/onboarding`, `/settings`, `/auth`, `/subscribe`,
   `/reset-password`, `/checkout/return`) hit the router's notFound component,
   which client-side-redirects to `/scene-negotiator/...` **preserving the URL
   hash** — critical because shared scene links carry their data in the hash.
   Static-host limitation: these are client-side redirects (no 301s possible
   on GitHub Pages).
5. **Old stub routes deleted.** `auth`, `subscribe`, `checkout.return`,
   `reset-password` were Supabase-era "this feature is gone" stubs; their URLs
   now redirect to `/scene-negotiator`.
6. **Content system.** `copy.md` (repo root) is the editorial source of truth.
   Rendered copy lives centrally in `src/content/` (guides, FAQ) and in the
   route files for bespoke page layouts. `src/config/site.ts` centralizes site
   name, URLs, contact email, provider endpoints, feature flags, and pricing
   display mode. MDX was deliberately not added — it would be a new dependency
   with no clear win over typed content modules at this page count.
7. **Legal pages replaced.** The app's old `/privacy` and `/terms` were
   app-only; the new root legal pages cover both the coaching business and
   Scene Negotiator (its localStorage/share-link behavior is described
   accurately). All legal pages carry a visible "draft pending attorney
   review" notice. The app's internal footer links to `/privacy` and `/terms`
   still work.
8. **Forms never fake success.** The inquiry form posts to
   `VITE_INQUIRY_FORM_ENDPOINT` when set; otherwise submission is disabled
   with a visible "not connected" notice and a mailto alternative. The
   newsletter capture renders the provider's real form POST when
   `VITE_NEWSLETTER_ENDPOINT` is set; otherwise it shows a development state.
9. **Analytics off by default.** Plausible script is injected only when
   `VITE_PLAUSIBLE_DOMAIN` is set. No pixels, replay, or fingerprinting.
10. **Structured data:** Organization (site-wide), Person (About), Service
    (service pages), Article (guides), BreadcrumbList (breadcrumb pages),
    FAQPage (homepage + FAQ, visible FAQs only). No LocalBusiness markup — no
    verified street address exists, and inventing one is prohibited.
11. **Printable guide.** `public/before-your-first-kink-event-print.html` is a
    self-contained, print-styled HTML version of the lead-magnet guide for
    later PDF export. Unlinked and noindex.
12. **OG image** generated from brand tokens at `public/og-default.png`
    (1200×630).

## SEO exclusions

`/scene-negotiator` and children are: unlinked everywhere, `noindex,
nofollow`, absent from `sitemap.xml`, `rss.xml`, `llms.txt`, and structured
data. `robots.txt` deliberately does **not** `Disallow` the path — crawlers
must be able to fetch it to see the noindex directive, and a Disallow line
would advertise the URL.

## Remaining launch tasks (require Jules's approval)

- [ ] Attorney review of `/privacy`, `/terms`, `/disclaimer` (all marked draft);
      supply cancellation/refund policy and governing-law language
- [ ] Legal business name (`VITE_LEGAL_NAME`)
- [ ] Confirm contact email (currently `support@departmentofconsent.com`)
- [ ] Booking scheduler URL (`VITE_BOOKING_URL`)
- [ ] Inquiry form endpoint (`VITE_INQUIRY_FORM_ENDPOINT`)
- [ ] Newsletter provider + endpoint, and actual delivery of the email guide
- [ ] Analytics provider + domain (`VITE_PLAUSIBLE_DOMAIN`)
- [ ] Prices (set `prices` + `pricingDisplayMode: "listed"` in `site.ts`) or
      keep "contact for pricing"
- [ ] Session durations/availability (60-minute session copy is from copy.md)
- [ ] Exact in-person service area wording
- [ ] Approved biography, professional photo, verified credentials for /about
      (credentials section is currently omitted rather than invented)
- [ ] Social links
- [ ] Custom domain cutover: set `VITE_SITE_URL=https://departmentofconsent.com`,
      change `base` to `/` in `vite.config.ts`, add CNAME
- [ ] Decide whether public workshops are scheduled (waitlist URL)

## Copy claims that still need review

- Testimonials on the Scene Negotiator landing page (`J, 31`, `R, 26`,
  `A, 29`) and its "Trusted by communities worldwide" line predate this build
  and are unverified — they are hidden from the public site but visible to
  anyone opening the app. Recommend removing or verifying before wide sharing.
- "Trans owned and operated" statement (app pages) — confirm Jules wants it on
  the marketing site as well (currently app-only).
