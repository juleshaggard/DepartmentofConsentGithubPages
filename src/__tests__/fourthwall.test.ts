import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { FourthwallStorefrontClient } from "@/lib/fourthwall/client";
import { resolveSyncedCollectionSlug } from "@/lib/fourthwall/homepage";
import {
  clearCatalogCacheForTests,
  formatMoney,
  getProductPageData,
  getShopLandingData,
  productAvailability,
  productPriceRange,
  sanitizeRichHtml,
} from "@/lib/fourthwall/repository";
import { fourthwallClient } from "@/lib/fourthwall/client";
import type { Collection, FourthwallImage, Product, Shop, Variant } from "@/lib/fourthwall/types";
import { cartSchema } from "@/lib/fourthwall/types";
import { buildCheckoutUrl, cartSubtotalCents } from "@/lib/fourthwall/cart";

const shop: Shop = {
  id: "shop-1",
  name: "Leather Worship",
  domain: "leather-worship.fourthwall.com",
  publicDomain: "leatherworship.com",
};

const signature: Collection = {
  id: "collection-signature",
  name: "Signature",
  slug: "signature",
  description: "The signature collection.",
};

const allCollection: Collection = {
  id: "collection-all",
  name: "All",
  slug: "all",
  description: "Everything.",
};

function image(id: string): FourthwallImage {
  return {
    id,
    url: `https://images.example/${id}.jpg`,
    transformedUrl: `https://images.example/${id}-large.jpg`,
    width: 1200,
    height: 1600,
  };
}

function variant(
  id: string,
  price: number,
  images: FourthwallImage[],
  stock: Variant["stock"] = { type: "UNLIMITED" },
): Variant {
  return {
    id,
    name: id,
    sku: id,
    unitPrice: { value: price, currency: "USD" },
    compareAtPrice: null,
    attributes: { description: id, color: null, size: null },
    stock,
    images,
  };
}

function product(
  id: string,
  slug: string,
  variants: Variant[],
  images: FourthwallImage[],
): Product {
  return {
    id,
    name: `Product ${id}`,
    slug,
    description: '<p>Safe copy.</p><script>alert("no")</script>',
    state: { type: "AVAILABLE" },
    access: { type: "PUBLIC" },
    images,
    variants,
    additionalInformation: [
      {
        type: "CARE",
        title: "Care",
        bodyHtml: '<p>Wipe clean.</p><img src="bad"><a href="javascript:bad()">Bad</a>',
      },
    ],
    sizeGuide: null,
  };
}

function page<T>(results: T[], hasNextPage = false) {
  return {
    results,
    paging: {
      pageNumber: 0,
      pageSize: 100,
      elementsSize: results.length,
      elementsTotal: results.length,
      totalPages: hasNextPage ? 2 : 1,
      hasNextPage,
    },
  };
}

beforeEach(() => {
  clearCatalogCacheForTests();
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
});

describe("Fourthwall normalization", () => {
  it("resolves a synced homepage row to the narrowest matching collection", () => {
    const collections = {
      all: ["one", "two", "three", "four"],
      toys: ["one", "two", "three"],
      featured: ["one", "two"],
    };

    expect(resolveSyncedCollectionSlug(["one", "two"], collections)).toBe("featured");
    expect(resolveSyncedCollectionSlug(["one", "two", "three"], collections)).toBe("toys");
    expect(resolveSyncedCollectionSlug(["missing"], collections)).toBeUndefined();
  });

  it("loads every page, preserves API order, and builds collection relationships", async () => {
    const shared = image("shared");
    const alternate = image("alternate");
    const first = product("one", "one", [variant("one-small", 12, [shared])], [shared]);
    const second = product("two", "two", [variant("two-large", 18, [shared, alternate])], [shared]);

    vi.spyOn(fourthwallClient, "getShop").mockResolvedValue(shop);
    vi.spyOn(fourthwallClient, "listCollections").mockImplementation(async (pageNumber) =>
      pageNumber === 0 ? page([signature], true) : page([allCollection]),
    );
    vi.spyOn(fourthwallClient, "getCollectionProducts").mockImplementation(
      async (slug, pageNumber) => {
        if (slug === "all") return pageNumber === 0 ? page([first], true) : page([second]);
        return page([second]);
      },
    );

    const landing = await getShopLandingData();
    expect(landing.collections.map((collection) => collection.slug)).toEqual(["signature", "all"]);
    expect(landing.allProducts.map((item) => item.slug)).toEqual(["one", "two"]);
    expect(landing.allProducts[1]?.secondaryImage?.id).toBe("alternate");
    expect(landing.featuredProducts.map((item) => item.slug)).toEqual(["two"]);
    expect(landing.collectionSummaries[0]?.productCount).toBe(1);
    expect(landing.collectionProductSlugs).toEqual({
      all: ["one", "two"],
      signature: ["two"],
    });

    const detail = await getProductPageData("two");
    expect(detail?.collections.map((collection) => collection.slug)).toEqual(["signature"]);
    expect(detail?.images.map((item) => item.id)).toEqual(["shared", "alternate"]);
    expect(detail?.variants[0]?.imageIds).toEqual(["shared", "alternate"]);
    expect(detail?.descriptionHtml).not.toContain("script");
    expect(detail?.additionalInformation[0]?.bodyHtml).not.toContain("img");
  });

  it("computes ranges and availability from variants", () => {
    const available = product(
      "range",
      "range",
      [
        variant("low", 10, [], { type: "LIMITED", inStock: 0 }),
        variant("high", 25, [], { type: "LIMITED", inStock: 2 }),
      ],
      [],
    );
    expect(productPriceRange(available)).toEqual({
      minimum: { value: 10, currency: "USD" },
      maximum: { value: 25, currency: "USD" },
      varies: true,
    });
    expect(productAvailability(available)).toBe("available");
    expect(formatMoney({ value: 25, currency: "USD" })).toBe("$25.00");

    available.variants[1]!.stock = { type: "LIMITED", inStock: 0 };
    expect(productAvailability(available)).toBe("sold-out");
  });

  it("sanitizes executable and unsupported Fourthwall HTML", () => {
    const sanitized = sanitizeRichHtml(
      '<h2>Details</h2><script>alert(1)</script><a href="https://example.com">Link</a><img src="x">',
    );
    expect(sanitized).toContain("<h2>Details</h2>");
    expect(sanitized).not.toContain("script");
    expect(sanitized).not.toContain("<img");
    expect(sanitized).toContain('rel="noreferrer noopener"');
  });

  it("rejects malformed API responses without exposing request details", async () => {
    vi.stubEnv("VITE_FOURTHWALL_STOREFRONT_TOKEN", "test-token");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ id: 42 }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      ),
    );
    await expect(new FourthwallStorefrontClient().getShop()).rejects.toThrow(
      "Fourthwall returned data in an unexpected format.",
    );
  });
});

describe("cart calculations", () => {
  it("normalizes Fourthwall's nullable cart metadata", () => {
    const lineVariant = {
      ...variant("line", 19.95, []),
      product: { id: "product-line", name: "Line", slug: "line" },
    };
    const parsed = cartSchema.parse({
      id: "cart",
      items: [{ variant: lineVariant, quantity: 1, groupedBy: null }],
      metadata: null,
    });
    expect(parsed.metadata).toEqual({});
  });

  it("uses integer cents for the subtotal and constructs the hosted checkout URL", () => {
    const lineVariant = {
      ...variant("line", 19.95, []),
      product: { id: "product-line", name: "Line", slug: "line" },
    };
    expect(
      cartSubtotalCents({
        id: "cart with spaces",
        items: [{ variant: lineVariant, quantity: 3, groupedBy: null }],
        metadata: {},
      }),
    ).toBe(5985);
    expect(buildCheckoutUrl("https://leatherworship.com/", "cart with spaces")).toBe(
      "https://leatherworship.com/cart/checkout?cartId=cart+with+spaces&currency=USD",
    );
  });
});
