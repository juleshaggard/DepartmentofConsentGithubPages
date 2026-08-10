import { getShopLandingData, type ProductSummary } from "@/lib/fourthwall/repository";
import { getKinkInTenFeed, type PodcastFeed } from "@/lib/kink-in-ten";

const CURATED_PRODUCT_SLUGS = [
  "the-emerald-seal-signature-collar",
  "lil-pup-collar",
  "copy-of-spike-spanker-classic",
  "obey-kneel-submit-relax-bdsm-crop-t-shirt",
] as const;

export type HomepageData = {
  products: ProductSummary[];
  shopAvailable: boolean;
  podcast: PodcastFeed | null;
};

function curateProducts(products: ProductSummary[]) {
  const bySlug = new Map(products.map((product) => [product.slug, product]));
  const curated = CURATED_PRODUCT_SLUGS.map((slug) => bySlug.get(slug)).filter(
    (product): product is ProductSummary => Boolean(product),
  );

  if (curated.length === CURATED_PRODUCT_SLUGS.length) return curated;

  const selectedIds = new Set(curated.map((product) => product.id));
  for (const product of products) {
    if (curated.length >= 4) break;
    if (!selectedIds.has(product.id)) {
      curated.push(product);
      selectedIds.add(product.id);
    }
  }

  return curated;
}

export async function loadHomepageData(): Promise<HomepageData> {
  const [shopResult, podcastResult] = await Promise.allSettled([
    getShopLandingData(),
    getKinkInTenFeed(),
  ]);

  return {
    products: shopResult.status === "fulfilled" ? curateProducts(shopResult.value.allProducts) : [],
    shopAvailable: shopResult.status === "fulfilled",
    podcast: podcastResult.status === "fulfilled" ? podcastResult.value : null,
  };
}
