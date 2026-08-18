# Shop

Last verified: 2026-08-17, America/Los_Angeles

- Live shop: <https://departmentofconsent.com/shop>
- Fourthwall storefront: <https://leatherworship.com>
- Fourthwall API: <https://storefront-api.fourthwall.com/v1>
- Currency: USD

This document is the working reference for the Department of Consent shop. It
describes the storefront as implemented in this repository, the Fourthwall data
model, the current catalog, cart and checkout behavior, deployment, testing,
ownership boundaries, and known failure modes.

The catalog snapshot below will age. Fourthwall remains the source of truth for
live products, prices, inventory, images, variants, descriptions, and collection
membership.

## Store identity

The Department of Consent site presents a Fourthwall shop under the Department
of Consent brand. The Fourthwall shop currently reports:

| Field                       | Value                                            |
| --------------------------- | ------------------------------------------------ |
| Shop name                   | Leather Worship \| Devotional Leather BDSM Goods |
| Fourthwall slug             | `leather-worship-shop`                           |
| Public storefront domain    | `leatherworship.com`                             |
| Department of Consent route | `/shop`                                          |
| Currency                    | USD                                              |

The public Fourthwall domain is read from the shop API. It is used to construct
the checkout URL, so a domain change in Fourthwall should flow through without a
code change.

## Source-of-truth boundaries

Fourthwall owns the commerce data:

- Product names, slugs, descriptions, images, variants, SKUs, prices, and stock
- Collection names, slugs, membership, and product order
- Cart state and checkout
- Payments, production, fulfillment, returns, and order support
- The customer-facing checkout terms

This site owns the presentation:

- Landing-page copy and section labels
- The mapping from landing sections to Fourthwall collections
- Product and collection layouts
- Commission and coaching calls to action
- Editorial policy summaries
- Sanitization and rendering of Fourthwall HTML
- SEO metadata and structured data

Do not duplicate Fourthwall catalog data in site code unless there is a specific
editorial reason. Collection membership and order should come from Fourthwall.

## Customer experience

### Routes

| Route                               | Purpose                   |
| ----------------------------------- | ------------------------- |
| `/shop`                             | Curated shop landing page |
| `/shop/collections/$collectionSlug` | Full collection page      |
| `/shop/products/$productSlug`       | Product detail page       |
| `/shop/privacy-policy`              | Shop privacy policy       |
| `/shop/returns-faq`                 | Returns and order FAQ     |
| `/shop/terms-of-service`            | Shop terms of service     |

The shop layout supplies the sticky collection navigation, cart provider, cart
sheet, shared marketing shell, loading state, error state, and legal links.

### Landing page

The landing page follows the recognized commerce modules on the public Leather
Worship homepage. A build-time sync records module order, headings, featured
product slugs, and product order. The Department of Consent page resolves each
product row to the narrowest matching Fourthwall collection for its `View all`
link.

The verified module order is:

1. Impact toys
2. Puppy Paw Spike Toy spotlight
3. Uniforms for the devoted.
4. Signature pieces
5. Pup play collars
6. BDSM gear and accessories
7. Commission a piece.

The page also contains:

- A shop hero using the current leather and play-focused campaign copy
- A synced featured-product spotlight
- A static commission-by-email call to action
- A coaching call to action
- Links to the full Fourthwall collections

If Leather Worship removes or reorders one of these modules, the next successful
site build updates the Department of Consent landing page. If a synced product no
longer exists in the Storefront API, the site omits that product instead of
crashing.

Products can appear in more than one landing section because Fourthwall
collections overlap. That is expected.

## Catalog snapshot

At the time of verification, the API returned 40 products. All were in the
`AVAILABLE` state.

### Collections

| Collection        | Slug          | Product count |
| ----------------- | ------------- | ------------: |
| Pup collars       | `pup-collars` |             4 |
| Toys              | `toys`        |             9 |
| Accessories       | `accessories` |             4 |
| Signature collars | `signature`   |             4 |
| Apparel           | `apparel`     |            13 |
| Leather           | `leather`     |            18 |
| All Products      | `all`         |            40 |

Collection slugs are integration keys. Keep `all`, `signature`, `toys`,
`pup-collars`, `accessories`, and `apparel` stable unless the corresponding code
is updated at the same time.

### Pup collars

1. Lil Pup Collar (`lil-pup-collar`)
2. Frisky Dog Collar (`frisky-dog-collar`)
3. Big Dog Choker and Leash Convertible
   (`big-dog-choker-and-leash-convertible`)
4. Troublemaker Pup Collar (`troublemaker-pup-collar`)

### Toys

1. Spike Spanker Princess (`spike-spanker-princess`)
2. Spike Spanker Heart (`spike-spanker-heart`)
3. Spike Spanker Sadist (`spike-spanker-sadist`)
4. Spike Spanker Star (`spike-impact-smacker-and-stim-toy`)
5. Thigh Strap Princess (`spike-thigh-wrap-pain-stim-toy`)
6. Thigh Strap Heart (`thigh-wrap-heart`)
7. Thigh Strap Sadist (`sadist-spike-thigh-wrap-pain-stim-toy`)
8. Thigh Strap Star (`classic-star-spike-thigh-wrap-pain-stim-toy`)
9. Puppy Paw Spike Toy (`puppy-paw-spike-toy`)

### Accessories

1. Spike Spanker Star (`copy-of-spike-spanker-classic`)
2. Dominion Bondage Belt (`dominion-bondage-belt`)
3. Leather Flogger Bag Charm (`leather-flogger-bag-charm`)
4. Everyday Leather Leash Black & Natural
   (`everyday-leather-leash-black-natural`)

### Signature collars

1. The Crimson Testament Signature Collar
   (`the-crimson-testament-signature-collar`)
2. The Eden Signature Collar (`the-eden-signature-collar`)
3. The Iron Testament Signature Collar
   (`the-iron-testament-signature-collar`)
4. The Emerald Seal Signature Collar
   (`the-emerald-seal-signature-collar`)

### Apparel

1. Garbage Baby Tee (`garbage-baby-tee`)
2. Don’t Bully Me, I’ll Bark! Baby Tee
   (`dont-bully-me-ill-bark-baby-tee`)
3. Obey. Kneel. Submit. Relax. BDSM Crop T-Shirt
   (`obey-kneel-submit-relax-bdsm-crop-t-shirt`)
4. Negotiate. Play. Aftercare. Repeat. BDSM Crop T-Shirt
   (`negotiate-play-aftercare-repeat-bdsm-crop-t-shirt`)
5. Marina Girl Crop Tee (`marina-girl-crop-tee`)
6. Bite Risk Tee (`bite-risk-tee`)
7. Service Dog Tee (`service-dog-tee`)
8. Good Pup Tee (`good-pup-tee`)
9. Friendly Dog Tee (`friendly-dog-tee`)
10. Dad shirt (`dad-shirt`)
11. Bay Area Faggot Crop Tee (`bay-area-faggot-crop-tee`)
12. Bondage & Discipline & Dominance & Submission Crop Tee
    (`bondage-discipline-dominance-submission-crop-tee`)
13. All the girls have cocks these days crop tee
    (`all-the-girls-have-cocks-these-days-crop-tee`)

### Leather

1. Troublemaker Pup Collar (`troublemaker-pup-collar`)
2. Dominion Bondage Belt (`dominion-bondage-belt`)
3. Our Best Selling Impact and Stim Toy - Spike Spanker Classic
   (`our-best-selling-impact-and-stim-toy`)
4. Big Dog Choker and Leash Convertible
   (`big-dog-choker-and-leash-convertible`)
5. Lil Pup Collar (`lil-pup-collar`)
6. The Eden Signature Collar (`the-eden-signature-collar`)
7. The Crimson Testament Signature Collar
   (`the-crimson-testament-signature-collar`)
8. Spike Spanker Star (`spike-impact-smacker-and-stim-toy`)
9. The Iron Testament Signature Collar
   (`the-iron-testament-signature-collar`)
10. The Emerald Seal Signature Collar
    (`the-emerald-seal-signature-collar`)
11. Daisy Choker Collar (`daisy-choker-collar`)
12. Wild Collar (`wild-collar`)
13. Night Daisy Collar (`night-daisy-collar`)
14. Frisky Dog Collar (`frisky-dog-collar`)
15. Devotion Leather Collar (`devotion-leather-collar`)
16. Liturgical Collar (`liturgical-collar`)
17. Everyday Leather Leash Black & Natural
    (`everyday-leather-leash-black-natural`)
18. Leather Flogger Bag Charm (`leather-flogger-bag-charm`)

### All Products order

The `all` collection supplies the canonical full-catalog order used by the site.

1. Spike Spanker Heart (`spike-spanker-heart`)
2. Spike Spanker Star (`spike-impact-smacker-and-stim-toy`)
3. Spike Spanker Princess (`spike-spanker-princess`)
4. Spike Spanker Sadist (`spike-spanker-sadist`)
5. Puppy Paw Spike Toy (`puppy-paw-spike-toy`)
6. Thigh Strap Princess (`spike-thigh-wrap-pain-stim-toy`)
7. Thigh Strap Heart (`thigh-wrap-heart`)
8. Thigh Strap Sadist (`sadist-spike-thigh-wrap-pain-stim-toy`)
9. Thigh Strap Star (`classic-star-spike-thigh-wrap-pain-stim-toy`)
10. Night Daisy Collar (`night-daisy-collar`)
11. Daisy Choker Collar (`daisy-choker-collar`)
12. Devotion Leather Collar (`devotion-leather-collar`)
13. Liturgical Collar (`liturgical-collar`)
14. Troublemaker Pup Collar (`troublemaker-pup-collar`)
15. Big Dog Choker and Leash Convertible
    (`big-dog-choker-and-leash-convertible`)
16. Lil Pup Collar (`lil-pup-collar`)
17. Frisky Dog Collar (`frisky-dog-collar`)
18. Wild Collar (`wild-collar`)
19. The Iron Testament Signature Collar
    (`the-iron-testament-signature-collar`)
20. The Crimson Testament Signature Collar
    (`the-crimson-testament-signature-collar`)
21. The Eden Signature Collar (`the-eden-signature-collar`)
22. The Emerald Seal Signature Collar
    (`the-emerald-seal-signature-collar`)
23. Leather Flogger Bag Charm (`leather-flogger-bag-charm`)
24. Dominion Bondage Belt (`dominion-bondage-belt`)
25. Everyday Leather Leash Black & Natural
    (`everyday-leather-leash-black-natural`)
26. Friendly Dog Tee (`friendly-dog-tee`)
27. Good Pup Tee (`good-pup-tee`)
28. Bite Risk Tee (`bite-risk-tee`)
29. Service Dog Tee (`service-dog-tee`)
30. Dad shirt (`dad-shirt`)
31. Garbage Baby Tee (`garbage-baby-tee`)
32. Marina Girl Crop Tee (`marina-girl-crop-tee`)
33. Obey. Kneel. Submit. Relax. BDSM Crop T-Shirt
    (`obey-kneel-submit-relax-bdsm-crop-t-shirt`)
34. Don’t Bully Me, I’ll Bark! Baby Tee
    (`dont-bully-me-ill-bark-baby-tee`)
35. Negotiate. Play. Aftercare. Repeat. BDSM Crop T-Shirt
    (`negotiate-play-aftercare-repeat-bdsm-crop-t-shirt`)
36. All the girls have cocks these days crop tee
    (`all-the-girls-have-cocks-these-days-crop-tee`)
37. Bay Area Faggot Crop Tee (`bay-area-faggot-crop-tee`)
38. Bondage & Discipline & Dominance & Submission Crop Tee
    (`bondage-discipline-dominance-submission-crop-tee`)
39. Our Best Selling Impact and Stim Toy - Spike Spanker Classic
    (`our-best-selling-impact-and-stim-toy`)
40. Spike Spanker Star (`copy-of-spike-spanker-classic`)

## Technical architecture

The site uses TanStack Start with React 19, Tailwind CSS v4, and shadcn/Radix
components. The production site is fully prerendered and hosted on GitHub Pages.

### Important files

| File                                              | Responsibility                                       |
| ------------------------------------------------- | ---------------------------------------------------- |
| `src/lib/fourthwall/types.ts`                     | Zod schemas and normalized API types                 |
| `src/lib/fourthwall/client.ts`                    | Fourthwall Storefront API client                     |
| `src/lib/fourthwall/homepage.ts`                  | Synced homepage types and collection matching        |
| `src/lib/fourthwall/homepage.generated.ts`        | Last valid Leather Worship homepage snapshot         |
| `src/lib/fourthwall/repository.ts`                | Catalog indexing, caching, and view models           |
| `src/lib/fourthwall/cart.ts`                      | Cart subtotal and checkout helpers                   |
| `src/components/shop/ShopCartProvider.tsx`        | Persistent browser cart state and mutations          |
| `src/components/shop/ShopCartSheet.tsx`           | Cart interface                                       |
| `src/components/shop/ShopChrome.tsx`              | Collection subnavigation and cart trigger            |
| `src/components/shop/ProductCard.tsx`             | Catalog card and color previews                      |
| `src/components/shop/ProductPage.tsx`             | Product gallery, variants, quantity, and add to cart |
| `src/routes/shop.tsx`                             | Shared shop layout and chrome data                   |
| `src/routes/shop.index.tsx`                       | Curated landing page                                 |
| `src/routes/shop.collections.$collectionSlug.tsx` | Collection route                                     |
| `src/routes/shop.products.$productSlug.tsx`       | Product route and structured data                    |
| `src/__tests__/fourthwall.test.ts`                | API, repository, cart, and sanitizer tests           |
| `src/__tests__/shop-components.test.tsx`          | Product and cart interface tests                     |
| `scripts/sync-shop-homepage.mjs`                  | Build-time Leather Worship homepage sync             |
| `.github/workflows/deploy-pages.yml`              | Build and deployment workflow                        |
| `vite.config.ts`                                  | Base paths, prerendering, and local token handoff    |

### API client

The client uses `https://storefront-api.fourthwall.com/v1` and passes the
browser-safe storefront token as the `storefront_token` query parameter.

Supported requests:

- `GET /shop`
- `GET /collections?page=&size=`
- `GET /collections/:slug`
- `GET /collections/:slug/products?page=&size=&currency=USD`
- `GET /products/:slug?currency=USD`
- `POST /carts`
- `GET /carts/:id`
- `POST /carts/:id/add`
- `POST /carts/:id/change`
- `POST /carts/:id/remove`

Catalog page size is 100. Pagination is followed until all results are loaded.

The client converts transport and validation failures into safe messages:

| Condition              | Customer-safe message                              |
| ---------------------- | -------------------------------------------------- |
| Missing token          | The shop is not configured yet.                    |
| Network failure        | Fourthwall could not be reached. Please try again. |
| HTTP 404               | That shop item could not be found.                 |
| Other HTTP error       | Fourthwall returned an error.                      |
| Invalid response shape | Fourthwall returned data in an unexpected format.  |

`StorefrontApiError` retains the HTTP status, optional error code, and an
`isNotFound` helper for route and cart recovery logic.

### Validation and normalization

Fourthwall responses are parsed with Zod before use. The normalized model covers:

- Shop identity and public domain
- Collections and paging
- Products, rich descriptions, images, variants, stock, additional information,
  and size guides
- Money values, including string-to-number conversion
- Carts, cart items, quantities, prices, images, and metadata

Nullable cart metadata is normalized to an empty object. Images require a URL,
positive width, and positive height. Product timestamps are optional because the
Storefront API does not always include them.

### Catalog repository

The repository builds a single in-memory catalog index. It fetches the shop,
collections, and the `all` collection in parallel, then fetches the remaining
collection product lists in parallel.

The index contains:

- Products by product slug
- Full product order from the `all` collection
- Product slugs by collection slug
- Collection memberships by product slug

Public selectors provide data for the shop chrome, landing page, collection
pages, and product pages. The cache lifetime is 60 seconds within a running
process. A failed catalog load clears the cache so the next request can retry.

The `all` collection is required. Renaming or deleting it makes catalog indexing
fail until the integration is updated.

### Product summaries

Repository view models:

- Deduplicate product and variant images by image ID or URL
- Select primary and secondary card images
- Derive color options and swatches from variant attributes
- Calculate product price ranges
- Mark a product available only when its state and at least one variant allow it
- Sanitize Fourthwall HTML before rendering it
- Preserve collection memberships for product detail pages

A variant is treated as available when the product state is `AVAILABLE` and the
stock is unlimited, has a numeric `inStock` value greater than zero, or uses an
available stock type such as `AVAILABLE` or `IN_STOCK`.

Money is formatted with the `en-US` locale and the currency returned by the API.

### Rich-text safety

Descriptions, size guides, collection copy, and additional product information
can contain Fourthwall HTML. They must pass through `sanitize-html` before being
rendered.

The allowlist includes basic text, lists, headings, blockquotes, links, and table
markup. Link schemes are limited to HTTP, HTTPS, and email. Rendered links receive
`noreferrer noopener`. Scripts, images embedded in rich text, event handlers, and
unsupported markup are removed.

Never render raw Fourthwall HTML directly.

## Product interface

### Product cards

The product grid uses two columns on small screens and four on desktop. Cards:

- Use a 3:4 image area
- Prefer Fourthwall's transformed image URL
- Reveal a secondary image on hover when available
- Display sold-out status
- Display `From` for a price range
- Show up to four color swatches plus a remainder count
- Load the first four images eagerly and later cards lazily

### Product detail

The product page starts with the first available variant, falling back to the
first variant if everything is sold out. Color and size selections stay in sync.
Unavailable combinations are disabled, and quantity respects finite stock.

Variant-specific images replace the general gallery when available. The page
also shows compare-at pricing, collection memberships, description, size guide,
and additional information. The detail panel is sticky on desktop.

Product pages emit breadcrumb and product-offer JSON-LD. SEO title, description,
and social image come from the current API product.

Changing a product slug changes its site URL. There is no automatic redirect map,
so old product URLs will return 404 unless a redirect is added separately.

## Cart and checkout

The cart is anonymous and browser-local. There is no site-owned customer or order
database.

The Fourthwall cart ID is stored in local storage under:

```text
doc:fourthwall:cart-id
```

On startup, the provider restores that cart from Fourthwall. If the saved cart no
longer exists, it clears local storage. Cart mutations are serialized so repeated
clicks cannot race.

When an existing cart expires during an add or quantity change, the provider
creates a replacement cart and preserves recoverable item quantities. The cart
sheet supports quantity controls, item removal, finite-stock limits, subtotal,
and safe error states.

Subtotal math converts each unit price to integer cents before multiplying by
quantity. Shipping and taxes are calculated by Fourthwall at checkout.

The checkout URL has this form:

```text
https://{publicDomain}/cart/checkout?cartId={cartId}&currency=USD
```

The browser leaves Department of Consent for Fourthwall checkout. Fourthwall is
the seller and merchant of record and handles payment, production, fulfillment,
returns, and order support.

## Configuration and secrets

The required environment variable is:

```text
VITE_FOURTHWALL_STOREFRONT_TOKEN
```

It is a browser-safe Storefront API token. A `VITE_` value is included in the
client bundle, so it must never be treated as a privileged server secret or used
with private Fourthwall APIs.

`.env.example` documents the variable. GitHub Actions injects it from the
repository secret named `FOURTHWALL_STOREFRONT_TOKEN`.

For legacy local development, `vite.config.ts` can read a token matching
`ptkn_[A-Za-z0-9_-]+` from `../LW API.rtf`. Do not copy the token into this file,
commit it, print it to logs, or share it as documentation.

## Prerendering and deployment

Production is a static GitHub Pages deployment. Vite prerenders `/shop`, follows
all discovered `/shop/*` links, and fails the build if a route cannot be rendered.
Prerender concurrency is one.

Before Vite runs, `npm run sync:shop-homepage` fetches the server-rendered Leather
Worship homepage and updates `homepage.generated.ts`. The sync recognizes
featured collections, featured products, and the commission module. It keeps the
last valid generated snapshot when the homepage cannot be reached or its markup
cannot be parsed.

Fourthwall catalog data and the synced homepage snapshot are baked into the
generated HTML during each deployment. Changes are not guaranteed to appear in
prerendered pages immediately after editing Fourthwall.

The Pages workflow runs:

- On every push to `main`
- On manual dispatch
- Daily at `0 10 * * *` UTC

The daily build refreshes the catalog and homepage layout even when no source
code changes. The workflow uses Node 24, runs `npm ci`, builds with
`npm run build:pages`, uploads `dist/client`, and deploys it to GitHub Pages.

The custom domain uses `/` as its base path. Local GitHub Pages preview uses
`/DepartmentofConsentGithubPages/`.

### Local preview

```bash
npm run build:pages:local
npm run preview:pages
```

Then open:

```text
http://127.0.0.1:4173/DepartmentofConsentGithubPages/shop
```

Use `preview:pages` for base-path QA. Plain `npm run preview` does not reproduce
the GitHub Pages subpath correctly.

## Legal and policy notes

Department of Consent controls site design, editorial presentation, and product
curation. Fourthwall provides the commerce platform and is the seller and
merchant of record.

The current policy copy communicates that made-to-order goods are generally not
returnable or exchangeable for fit, defects should be reported within 30 days,
and order changes may only be possible before production begins. Fourthwall's
checkout and order terms remain authoritative.

The policy pages are working drafts, not a substitute for legal review. Do not
expand or strengthen legal claims without checking the Fourthwall terms and
getting appropriate counsel.

## Common changes

### Reorder products

Reorder the featured products on the Leather Worship homepage. The next successful
sync and deployment will use that exact order. Collection pages still follow
their Fourthwall collection order.

### Change a landing collection

Add, remove, or reorder a supported homepage module in Fourthwall. The sync
currently understands featured collections, featured products, and the commission
module. A new Fourthwall module type needs a corresponding Department of Consent
component and parser rule.

### Change the spotlight

Change the featured-product module on the Leather Worship homepage. The next
successful sync uses that product. Products with multiple available variants link
to their product page so the customer can choose the correct option.

### Add or remove a product

Do it in Fourthwall, add it to the appropriate collections, and place it in the
desired collection order. Trigger a manual deployment if the change should appear
before the next daily refresh.

### Rename a product or collection slug

Treat a slug rename as a URL and integration change. Run the homepage sync, update
tests, and consider redirects for old public URLs.

### Change the checkout domain

Update the public domain in Fourthwall. The site reads it from `/shop` and uses it
for checkout. Verify the result with a new cart before publishing.

## Failure modes and recovery

| Symptom                                   | Likely cause                                                         | Action                                                                  |
| ----------------------------------------- | -------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Shop says it is not configured            | Storefront token missing                                             | Configure the local environment or GitHub secret                        |
| Pages build fails while prerendering shop | Missing token, API outage, missing `all` collection, or schema drift | Read the build error, verify API access, and inspect the response shape |
| Product page is 404                       | Product was removed or its slug changed                              | Confirm the Fourthwall slug and add a redirect if needed                |
| Landing section is empty                  | Synced product is missing from the API or homepage parsing changed   | Run the sync, inspect its output, and verify the Fourthwall product     |
| Homepage order looks stale                | No deployment has run since the Leather Worship edit                 | Run a manual Pages deployment                                           |
| Sync uses the previous snapshot           | Leather Worship was unavailable or its module markup changed         | Retry, then update the parser if the markup changed                     |
| Prices or stock look stale                | Static site has not rebuilt since the Fourthwall edit                | Run a manual Pages deployment                                           |
| Cart vanishes                             | Fourthwall expired or removed the cart                               | The provider clears or rebuilds it automatically                        |
| Checkout opens the wrong domain           | Fourthwall public domain is misconfigured                            | Correct the shop domain and rebuild                                     |
| Rich content is missing formatting        | The sanitizer removed unsupported markup                             | Extend the allowlist only after a security review                       |

The API and schema error messages are intentionally generic for customers. Use
the build output, tests, and direct API inspection for diagnosis.

## Verification checklist

Before publishing a shop integration change:

1. Confirm the token is available without printing its value.
2. Run `npm test`.
3. Run `npm run lint`.
4. Run `npm run build`.
5. Run `npm run build:pages:local`.
6. Preview `/DepartmentofConsentGithubPages/shop` locally.
7. Check the shop landing page, one collection, and one product.
8. Check mobile and desktop product grids.
9. Add a variant product to the cart and change its quantity.
10. Verify the checkout URL uses `leatherworship.com`, the current cart ID, and
    `currency=USD` without completing a real order.
11. Push to `main` or manually run the Pages workflow.
12. Verify the live custom-domain routes after deployment.

Current automated coverage includes pagination, collection order, product and
collection relationships, image deduplication, landing data, sanitization,
availability, price ranges, malformed responses, cart metadata normalization,
subtotal math, checkout URLs, product-card images, variant selection, local cart
restoration, expired-cart recovery, and sold-out states.

## Known constraints

- The storefront depends on the Fourthwall Storefront API and its current schema.
- The `all` collection is mandatory for catalog indexing.
- Static HTML can lag behind Fourthwall until the next deployment.
- Product and collection slug changes can break public URLs and code mappings.
- Homepage synchronization happens at build time, not at the instant a Fourthwall
  editor saves a change.
- The sync recognizes featured collections, featured products, and the commission
  module. Other Fourthwall module types remain Department of Consent-specific work.
- Overlapping collections can produce repeated products across the landing page.
- The browser-safe token grants only the access Fourthwall intends for storefront
  use. It is not suitable for privileged operations.
- Cart persistence depends on browser local storage and Fourthwall cart lifetime.
- Checkout, payment, tax, shipping, order email, fulfillment, and customer service
  behavior are outside this repository.
