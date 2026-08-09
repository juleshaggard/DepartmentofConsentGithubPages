import sanitizeHtml from "sanitize-html";
import { fourthwallClient, StorefrontApiError } from "./client";
import type { Collection, FourthwallImage, Money, Product, Shop, Variant } from "./types";

const CACHE_TTL_MS = 60_000;

export type Availability = "available" | "sold-out";

export type PriceRange = {
  minimum: Money;
  maximum: Money;
  varies: boolean;
};

export type ProductSummary = {
  id: string;
  name: string;
  slug: string;
  primaryImage: FourthwallImage | null;
  secondaryImage: FourthwallImage | null;
  colorOptions?: Array<{
    name: string;
    swatch: string | null;
    image: FourthwallImage | null;
  }>;
  price: PriceRange | null;
  availability: Availability;
};

export type ShopSpotlightProduct = ProductSummary & {
  descriptionHtml: string;
  descriptionText: string;
  quickAddVariantId: string | null;
};

export type ProductDetail = Omit<
  Product,
  "description" | "images" | "variants" | "additionalInformation" | "sizeGuide"
> & {
  descriptionHtml: string;
  descriptionText: string;
  images: FourthwallImage[];
  variants: Array<Omit<Variant, "images"> & { imageIds: string[]; availability: Availability }>;
  collections: Collection[];
  additionalInformation: Array<{
    type: string;
    title: string;
    bodyHtml: string;
  }>;
  sizeGuide: {
    descriptionHtml: string;
    previewUrl?: string | null;
    fileUrl?: string | null;
    fitGuideUrls: string[];
  } | null;
};

export type CollectionSummary = Collection & {
  productCount: number;
  primaryImage: FourthwallImage | null;
};

export type ShopChromeData = { shop: Shop; collections: Collection[] };
export type ShopLandingData = ShopChromeData & {
  featuredCollection: Collection | null;
  featuredProducts: ProductSummary[];
  spotlightProduct: ShopSpotlightProduct | null;
  collectionSummaries: CollectionSummary[];
  allProducts: ProductSummary[];
};
export type CollectionPageData = {
  collection: Collection;
  products: ProductSummary[];
};

type CatalogIndex = {
  shop: Shop;
  collections: Collection[];
  products: Map<string, Product>;
  productOrder: string[];
  collectionProducts: Map<string, string[]>;
  productCollections: Map<string, Collection[]>;
};

let cachedCatalog: { expiresAt: number; promise: Promise<CatalogIndex> } | null = null;

export function sanitizeRichHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      "p",
      "br",
      "strong",
      "b",
      "em",
      "i",
      "u",
      "s",
      "ul",
      "ol",
      "li",
      "h2",
      "h3",
      "h4",
      "blockquote",
      "a",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
    ],
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      th: ["scope", "colspan", "rowspan"],
      td: ["colspan", "rowspan"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: {
      a: (_tagName, attributes) => ({
        tagName: "a",
        attribs: { ...attributes, rel: "noreferrer noopener" },
      }),
    },
  });
}

export function htmlToPlainText(html: string): string {
  return sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} }).replace(/\s+/g, " ").trim();
}

export function isVariantAvailable(variant: Variant): boolean {
  if (variant.stock.type === "UNLIMITED") return true;
  if (typeof variant.stock.inStock === "number") return variant.stock.inStock > 0;
  return variant.stock.type === "AVAILABLE" || variant.stock.type === "IN_STOCK";
}

export function productAvailability(product: Product): Availability {
  return product.state.type === "AVAILABLE" && product.variants.some(isVariantAvailable)
    ? "available"
    : "sold-out";
}

export function productPriceRange(product: Product): PriceRange | null {
  if (product.variants.length === 0) return null;
  const prices = product.variants.map((variant) => variant.unitPrice);
  const sorted = [...prices].sort((a, b) => a.value - b.value);
  const minimum = sorted[0];
  const maximum = sorted[sorted.length - 1];
  if (!minimum || !maximum) return null;
  return {
    minimum,
    maximum,
    varies: minimum.value !== maximum.value,
  };
}

export function formatMoney(money: Money): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: money.currency,
  }).format(money.value);
}

function dedupeImages(images: FourthwallImage[]): FourthwallImage[] {
  return Array.from(new Map(images.map((image) => [image.id || image.url, image])).values());
}

function summarizeProduct(product: Product): ProductSummary {
  const productImages = dedupeImages([
    ...product.images,
    ...product.variants.flatMap((variant) => variant.images),
  ]);
  const colorOptions = Array.from(
    product.variants.reduce((colors, variant) => {
      const color = variant.attributes.color;
      if (!color?.name || colors.has(color.name)) return colors;
      colors.set(color.name, {
        name: color.name,
        swatch: color.swatch ?? null,
        image: variant.images[0] ?? product.images[0] ?? null,
      });
      return colors;
    }, new Map<string, NonNullable<ProductSummary["colorOptions"]>[number]>()),
  ).map(([, option]) => option);

  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    primaryImage: productImages[0] ?? null,
    secondaryImage: productImages[1] ?? null,
    colorOptions,
    price: productPriceRange(product),
    availability: productAvailability(product),
  };
}

async function collectAll<T>(
  fetchPage: (page: number) => Promise<{ results: T[]; paging: { hasNextPage: boolean } }>,
) {
  const results: T[] = [];
  let page = 0;
  while (true) {
    const response = await fetchPage(page);
    results.push(...response.results);
    if (!response.paging.hasNextPage) return results;
    page += 1;
  }
}

async function buildCatalogIndex(): Promise<CatalogIndex> {
  const [shop, collections, allProducts] = await Promise.all([
    fourthwallClient.getShop(),
    collectAll((page) => fourthwallClient.listCollections(page)),
    collectAll((page) => fourthwallClient.getCollectionProducts("all", page)),
  ]);

  const products = new Map(allProducts.map((product) => [product.slug, product]));
  const collectionProducts = new Map<string, string[]>();
  collectionProducts.set(
    "all",
    allProducts.map((product) => product.slug),
  );

  const relationshipCollections = collections.filter((collection) => collection.slug !== "all");
  const relationshipResults = await Promise.all(
    relationshipCollections.map(async (collection) => ({
      collection,
      products: await collectAll((page) =>
        fourthwallClient.getCollectionProducts(collection.slug, page),
      ),
    })),
  );

  relationshipResults.forEach(({ collection, products: collectionProductList }) => {
    collectionProducts.set(
      collection.slug,
      collectionProductList.map((product) => product.slug),
    );
    collectionProductList.forEach((product) => {
      if (!products.has(product.slug)) products.set(product.slug, product);
    });
  });

  const productCollections = new Map<string, Collection[]>();
  relationshipResults.forEach(({ collection, products: collectionProductList }) => {
    collectionProductList.forEach((product) => {
      const memberships = productCollections.get(product.slug) ?? [];
      memberships.push(collection);
      productCollections.set(product.slug, memberships);
    });
  });

  return {
    shop,
    collections,
    products,
    productOrder: allProducts.map((product) => product.slug),
    collectionProducts,
    productCollections,
  };
}

async function catalogIndex(): Promise<CatalogIndex> {
  const now = Date.now();
  if (cachedCatalog && cachedCatalog.expiresAt > now) return cachedCatalog.promise;
  const promise = buildCatalogIndex();
  cachedCatalog = { expiresAt: now + CACHE_TTL_MS, promise };
  try {
    return await promise;
  } catch (error) {
    if (cachedCatalog?.promise === promise) cachedCatalog = null;
    throw error;
  }
}

export async function getShopChromeData(): Promise<ShopChromeData> {
  const index = await catalogIndex();
  return { shop: index.shop, collections: index.collections };
}

export async function getShopLandingData(): Promise<ShopLandingData> {
  const index = await catalogIndex();
  const nonAllCollections = index.collections.filter((collection) => collection.slug !== "all");
  const featuredCollection =
    nonAllCollections.find((collection) => collection.slug === "signature") ??
    nonAllCollections[0] ??
    null;
  const featuredSlugs = featuredCollection
    ? (index.collectionProducts.get(featuredCollection.slug) ?? [])
    : [];
  const spotlightProduct = index.products.get("our-best-selling-impact-and-stim-toy") ?? null;

  return {
    shop: index.shop,
    collections: index.collections,
    featuredCollection,
    featuredProducts: featuredSlugs
      .map((slug) => index.products.get(slug))
      .filter((product): product is Product => Boolean(product))
      .map(summarizeProduct),
    spotlightProduct: spotlightProduct
      ? {
          ...summarizeProduct(spotlightProduct),
          descriptionHtml: sanitizeRichHtml(spotlightProduct.description),
          descriptionText: htmlToPlainText(spotlightProduct.description),
          quickAddVariantId: spotlightProduct.variants.find(isVariantAvailable)?.id ?? null,
        }
      : null,
    collectionSummaries: nonAllCollections.map((collection) => {
      const productSlugs = index.collectionProducts.get(collection.slug) ?? [];
      const firstProduct = productSlugs
        .map((slug) => index.products.get(slug))
        .find((product): product is Product => Boolean(product));
      return {
        ...collection,
        productCount: productSlugs.length,
        primaryImage: firstProduct?.images[0] ?? null,
      };
    }),
    allProducts: index.productOrder
      .map((slug) => index.products.get(slug))
      .filter((product): product is Product => Boolean(product))
      .map(summarizeProduct),
  };
}

export async function getCollectionPageData(slug: string): Promise<CollectionPageData | null> {
  const index = await catalogIndex();
  const collection = index.collections.find((candidate) => candidate.slug === slug);
  if (!collection) return null;
  const productSlugs = index.collectionProducts.get(slug) ?? [];
  return {
    collection,
    products: productSlugs
      .map((productSlug) => index.products.get(productSlug))
      .filter((product): product is Product => Boolean(product))
      .map(summarizeProduct),
  };
}

export async function getProductPageData(slug: string): Promise<ProductDetail | null> {
  const index = await catalogIndex();
  let product = index.products.get(slug);
  if (!product) {
    try {
      product = await fourthwallClient.getProduct(slug);
    } catch (error) {
      if (error instanceof StorefrontApiError && error.isNotFound) return null;
      throw error;
    }
  }

  const images = dedupeImages([
    ...product.images,
    ...product.variants.flatMap((variant) => variant.images),
  ]);

  return {
    ...product,
    descriptionHtml: sanitizeRichHtml(product.description),
    descriptionText: htmlToPlainText(product.description),
    images,
    variants: product.variants.map(({ images: variantImages, ...variant }) => ({
      ...variant,
      imageIds: dedupeImages(variantImages).map((image) => image.id),
      availability: isVariantAvailable({ ...variant, images: variantImages })
        ? "available"
        : "sold-out",
    })),
    collections: index.productCollections.get(product.slug) ?? [],
    additionalInformation: product.additionalInformation.map((item) => ({
      type: item.type,
      title: item.title,
      bodyHtml: sanitizeRichHtml(item.bodyHtml),
    })),
    sizeGuide: product.sizeGuide
      ? {
          descriptionHtml: sanitizeRichHtml(
            product.sizeGuide.description || product.sizeGuide.fitGuideDescription,
          ),
          previewUrl: product.sizeGuide.previewUrl,
          fileUrl: product.sizeGuide.fileUrl,
          fitGuideUrls: product.sizeGuide.fitGuideUrls,
        }
      : null,
  };
}

export function clearCatalogCacheForTests() {
  cachedCatalog = null;
}
