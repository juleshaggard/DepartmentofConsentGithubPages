# Storefront Design QA

## Comparison target

- Source visual truth: `artifacts/design-qa/source-desktop-top.png`, `artifacts/design-qa/source-mobile-section-0.png`, and the source section captures under `artifacts/design-qa/source-*.png`.
- Implementation: `http://127.0.0.1:4173/DepartmentofConsentGithubPages/shop`.
- Implementation evidence: `artifacts/design-qa/implementation-desktop-final.png`, `artifacts/design-qa/implementation-mobile-final.png`, `artifacts/design-qa/implementation-desktop-feature-sizing-final.png`, and `artifacts/design-qa/implementation-desktop-commission-image-final.png`.
- State: loaded storefront with the live Fourthwall catalog; cart closed for visual comparisons.

## Viewports and normalization

- Desktop source and implementation: 1265 × 712 pixels, matching CSS viewport capture, device scale factor 1.
- Mobile source and implementation: 375 × 812 pixels, matching browser-content capture produced from the same 390 × 844 viewport setting, device scale factor 1.
- No density scaling or crop normalization was required.

## Full-view comparison evidence

- Desktop side-by-side: `artifacts/design-qa/comparison-desktop-top.png`.
- Mobile side-by-side: `artifacts/design-qa/comparison-mobile-top.png`.
- The hero copy, centered composition, signature section, four-up desktop grid, two-up mobile grid, image proportions, typography family, card radii, product order, and white-space rhythm match the source section structure.
- Department of Consent's existing global header and the live collection/cart sub-navigation are intentional product constraints and replace the source site's header.

## Focused comparison evidence

- Commission section side-by-side: `artifacts/design-qa/comparison-desktop-commission.png`.
- Featured-product side-by-side: `artifacts/design-qa/comparison-desktop-feature-sizing.png`.
- Product-grid evidence: `artifacts/design-qa/implementation-desktop-grid.png` compared with `artifacts/design-qa/source-desktop-section-1.png` through `source-desktop-section-3.png`.
- Commission evidence: `artifacts/design-qa/implementation-desktop-commission-image-final.png` and `artifacts/design-qa/implementation-mobile-commission-image-final.png` compared with `artifacts/design-qa/source-desktop-section-4.png`.

## Required fidelity surfaces

- Fonts and typography: Trocchi is used for storefront display and merchandising copy, preserving the source's editorial serif character; Department of Consent navigation keeps its existing brand type system. Heading scale and wrapping were reduced after the first comparison to match the source hierarchy.
- Spacing and layout rhythm: section order, centered hero, split feature/commission layouts, four-column desktop grids, two-column mobile grids, card aspect ratios, and section spacing match the captured source. The two-tier Department of Consent mobile header creates an accepted vertical offset before the hero.
- Colors and visual tokens: the storefront uses the source's restrained black-and-white merchandising treatment while retaining Department of Consent coral for navigation and focus states.
- Image quality and asset fidelity: product imagery is loaded from the live Fourthwall catalog at intrinsic dimensions. The commission section uses the source site's matching static editorial asset at its native 4:5 ratio; it is not treated as catalog data. No placeholder imagery is used.
- Copy and content: all captured homepage section headings and merchandising copy are represented. Shop-facing Leather Worship brand mentions have been removed. Product names, prices, descriptions, availability, variants, and imagery remain Fourthwall-derived.

## Comparison history

1. Initial desktop comparison found oversized hero and spotlight headings plus excessive vertical hero space (P2). The hero type scale, body scale, spotlight heading, and hero padding were reduced. Post-fix evidence: `artifacts/design-qa/implementation-desktop-final.png`.
2. Initial mobile comparison found a wrapped hero heading and a left-aligned, wrapped signature heading with a competing View All control (P2). The hero now fits on one line, section headings center on mobile, and View All moves below the mobile grid. Post-fix evidence: `artifacts/design-qa/implementation-mobile-final.png`.
3. The initial commission section used a Fourthwall catalog image that did not match the source merchandising block (P2). It now uses the exact black leather harness editorial image locally, while all catalog content remains API-derived.
4. The initial Spike Spanker feature used a full `max-w-7xl` two-column layout and a 3rem headline, placing the image too close to the viewport edge (P2). The final feature uses a `max-w-6xl` frame, a capped 30rem image column, balanced 3rem gutters, and a 2.65rem maximum headline.

## Interaction and diagnostics checks

- Featured Add to Cart created/updated the Fourthwall cart and opened the accessible cart drawer.
- Cart line details, subtotal, checkout control, and close control were present and operable.
- Product/collection links and cart controls were present in the browser DOM.
- Browser diagnostic log after the final render was empty.
- Focused lint passed for all touched storefront files, 10 scoped Vitest tests passed, and the base-path-aware Pages build prerendered the shop successfully.

## Findings

- No actionable P0, P1, or P2 differences remain.
- P3: the Department of Consent mobile header and collection bar consume more vertical space than the source site's compact header. This is retained to preserve the host site's navigation continuity and live collection/cart access.

## Implementation checklist

- [x] Preserve the source homepage section order.
- [x] Remove shop-facing Leather Worship mentions.
- [x] Use four product columns on desktop and two on mobile.
- [x] Keep product content and imagery Fourthwall-derived.
- [x] Match the commission editorial image and native aspect ratio.
- [x] Keep the Spike Spanker feature inside the desktop page frame.
- [x] Verify the featured cart action and responsive layouts.
- [x] Preserve Department of Consent global navigation and footer.

final result: passed
