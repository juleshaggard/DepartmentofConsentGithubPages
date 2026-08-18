export type SyncedShopHomepageModule =
  | {
      id: string;
      type: "collection";
      title: string;
      productSlugs: readonly string[];
    }
  | {
      id: string;
      type: "product";
      productSlug: string;
    }
  | {
      id: string;
      type: "commission";
    };

export type SyncedShopHomepage = {
  sourceUrl: string;
  modules: readonly SyncedShopHomepageModule[];
};

export function resolveSyncedCollectionSlug(
  productSlugs: readonly string[],
  collectionProductSlugs: Record<string, string[]>,
): string | undefined {
  if (productSlugs.length === 0) return undefined;

  const candidates = Object.entries(collectionProductSlugs)
    .filter(([, collectionSlugs]) =>
      productSlugs.every((productSlug) => collectionSlugs.includes(productSlug)),
    )
    .sort(([firstSlug, firstProducts], [secondSlug, secondProducts]) => {
      const firstExact = firstProducts.length === productSlugs.length ? 0 : 1;
      const secondExact = secondProducts.length === productSlugs.length ? 0 : 1;
      return (
        firstExact - secondExact ||
        firstProducts.length - secondProducts.length ||
        firstSlug.localeCompare(secondSlug)
      );
    });

  return candidates[0]?.[0];
}
