import { describe, expect, it } from "vitest";
import { parseShopHomepage } from "../../scripts/sync-shop-homepage.mjs";

describe("Leather Worship homepage sync", () => {
  it("preserves recognized module and product order", () => {
    const snapshot = parseShopHomepage(`
      <main>
        <div class="main__sections">
          <div class="fw-section" id="fw-section-featured-collection-toys">
            <h2>Impact toys</h2>
            <a href="/products/first">First</a>
            <a href="/products/second">Second</a>
          </div>
          <div class="fw-section" id="fw-section-featured-product-paw">
            <h2>Puppy Paw</h2>
            <a href="/products/puppy-paw">Puppy Paw</a>
            <a href="/products/puppy-paw">Read more</a>
          </div>
          <div class="fw-section" id="fw-section-image-with-text-commission">
            <h2>Commission a piece.</h2>
          </div>
          <div class="fw-section" id="fw-section-newsletter">
            <h2>Newsletter</h2>
          </div>
        </div>
      </main>
    `);

    expect(snapshot.modules).toEqual([
      {
        id: "fw-section-featured-collection-toys",
        type: "collection",
        title: "Impact toys",
        productSlugs: ["first", "second"],
      },
      {
        id: "fw-section-featured-product-paw",
        type: "product",
        productSlug: "puppy-paw",
      },
      {
        id: "fw-section-image-with-text-commission",
        type: "commission",
      },
    ]);
  });

  it("rejects an unrecognized Fourthwall page instead of replacing the fallback", () => {
    expect(() => parseShopHomepage("<html><body>Unavailable</body></html>")).toThrow(
      "No Fourthwall collection modules were found.",
    );
  });
});
