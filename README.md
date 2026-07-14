# Department of Consent

Marketing site for Department of Consent — beginner-focused kink and polyamory
coaching by Jules Holloway — plus **Scene Negotiator**, the original consent /
scene-planning app, preserved as a hidden product at `/scene-negotiator`.

- Framework: TanStack Start (React 19), fully prerendered to static HTML
- Styling: Tailwind CSS v4 + shadcn/Radix components
- Hosting: GitHub Pages via GitHub Actions (`.github/workflows/deploy-pages.yml`)
- Editorial source of truth: [`copy.md`](copy.md)
- Site configuration: [`src/config/site.ts`](src/config/site.ts) + `.env` (see `.env.example`)
- Architecture and migration decisions: [`docs/DECISIONS.md`](docs/DECISIONS.md)

## Live Site

https://departmentofconsent.com/

GitHub Pages fallback:

https://juleshaggard.github.io/DepartmentofConsentGithubPages/

## Scene Negotiator

The original app lives at `/scene-negotiator` (and child routes). It is:

- fully client-side — profiles, kinks, and scenes live in browser localStorage;
  invite/response links carry compressed scene data in the URL hash
- unlinked from all public navigation, sitemaps, feeds, and structured data
- marked `noindex, nofollow`
- **not** access-controlled — anyone with the URL can use it

Old app URLs (`/sessions/*`, `/join/:token`, `/scene/:token`, `/kinks`,
`/onboarding`, `/settings`, …) redirect client-side to their
`/scene-negotiator/*` equivalents, preserving the URL hash so previously
shared scene links keep working.

## Development

```bash
npm install
npm run dev          # dev server
npm run local:staging # local GitHub Pages-style build + preview
npm run build:pages:local # local staging build → dist/client
npm run build:pages  # production custom-domain Pages build → dist/client
npm run preview:pages # preview the GitHub Pages build with the correct base path
npm run preview      # raw Vite preview; not for GitHub Pages base-path QA
npm run test         # smoke tests (Scene Negotiator)
npm run lint         # eslint
```

For local staging details and CSS/path troubleshooting, see
[`docs/local-staging.md`](docs/local-staging.md).

## Environment variables

All browser-safe (`VITE_*`) — see `.env.example` for full documentation:

| Variable                                                                                                                                                                                                               | Purpose                                                                                                                    |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `VITE_SITE_URL`                                                                                                                                                                                                        | Public base URL (canonical/sitemap/OG)                                                                                     |
| `VITE_BOOKING_URL`                                                                                                                                                                                                     | External scheduler (Cal.com/Calendly). Empty → inquiry form only                                                           |
| `VITE_CALENDLY_DISCOVERY_CALL_URL` / `VITE_CALENDLY_COACHING_SESSION_URL` / `VITE_CALENDLY_DEEP_DIVE_URL` / `VITE_CALENDLY_PACKAGE_URL` / `VITE_CALENDLY_EVENT_PREP_URL` / `VITE_CALENDLY_EVENT_COMPANION_INQUIRY_URL` | Service-specific pricing-page booking links. Empty → inquiry form fallback                                                 |
| `VITE_INQUIRY_FORM_ENDPOINT`                                                                                                                                                                                           | Form POST endpoint (e.g. Formspree). Empty → form disabled with honest notice                                              |
| `VITE_CONTACT_EMAIL`                                                                                                                                                                                                   | Contact email shown on the site                                                                                            |
| `VITE_NEWSLETTER_PROVIDER` / `VITE_NEWSLETTER_ENDPOINT` / `VITE_NEWSLETTER_EMAIL_FIELD`                                                                                                                                | Email-guide signup (Buttondown/Kit/Mailchimp/Loops). Kit uses `email_address`; empty endpoint → dev state, no fake success |
| `VITE_WORKSHOP_WAITLIST_URL`                                                                                                                                                                                           | Public workshop list signup                                                                                                |
| `VITE_GOOGLE_ANALYTICS_ID`                                                                                                                                                                                             | GA4 measurement ID for high-level page and booking CTA events                                                              |
| `VITE_PLAUSIBLE_DOMAIN` / `VITE_PLAUSIBLE_SRC`                                                                                                                                                                         | Privacy-friendly analytics. Empty → no analytics script at all                                                             |
| `VITE_LEGAL_NAME`                                                                                                                                                                                                      | Legal entity name once confirmed                                                                                           |

There are no server-side secrets in this project.

## Deployment

Pushing to `main` triggers the Pages workflow: `npm ci`, `npm run build:pages`,
deploy `dist/client`. Set repository **Actions variables** for any `VITE_*`
values you want baked into the build (at minimum keep `VITE_SITE_URL` correct
— when the custom domain is connected, change it to `https://departmentofconsent.com`
and the base path in `vite.config.ts` to `/`).

## Before launch (requires Jules's sign-off)

See the "Remaining launch tasks" section of `docs/DECISIONS.md` — legal pages
are drafts pending attorney review; prices, credentials, booking/newsletter/
analytics providers, and the exact in-person service area are placeholders.
