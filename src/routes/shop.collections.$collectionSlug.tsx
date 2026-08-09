import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { JsonLd } from "@/components/marketing/JsonLd";
import { ProductGrid } from "@/components/shop/ProductCard";
import {
  EmptyCollectionState,
  ShopErrorState,
  ShopLoadingState,
} from "@/components/shop/ShopStates";
import { getCollectionPageData, htmlToPlainText } from "@/lib/fourthwall/repository";
import { breadcrumbJsonLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/shop/collections/$collectionSlug")({
  loader: async ({ params }) => {
    const data = await getCollectionPageData(params.collectionSlug);
    if (!data) throw notFound();
    return data;
  },
  staleTime: 60_000,
  pendingComponent: () => <ShopLoadingState label="Loading the collection…" />,
  errorComponent: CollectionError,
  notFoundComponent: MissingCollection,
  head: ({ loaderData }) => {
    if (!loaderData) {
      return pageHead({
        title: "Collection not found | Department of Consent",
        description: "This Department of Consent shop collection could not be found.",
        path: "/shop",
        noindex: true,
      });
    }
    const description =
      htmlToPlainText(loaderData.collection.description) ||
      `Shop every piece in the ${loaderData.collection.name} collection from Department of Consent.`;
    return pageHead({
      title: `${loaderData.collection.name} | Department of Consent`,
      description,
      path: `/shop/collections/${loaderData.collection.slug}`,
      image:
        loaderData.products[0]?.primaryImage?.transformedUrl ||
        loaderData.products[0]?.primaryImage?.url ||
        undefined,
    });
  },
  component: CollectionPage,
});

function CollectionPage() {
  const { collection, products } = Route.useLoaderData();
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { label: "Department of Consent", path: "/" },
          { label: "Shop", path: "/shop" },
          { label: collection.name, path: `/shop/collections/${collection.slug}` },
        ])}
      />
      <div className="mx-auto max-w-7xl px-5 pb-20 pt-10 sm:px-8 sm:pb-28 sm:pt-16">
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs text-plum/58">
          <Link to="/shop" className="underline-offset-4 hover:text-coral hover:underline">
            Shop
          </Link>
          <span aria-hidden>/</span>
          <span>{collection.name}</span>
        </nav>
        <header className="max-w-3xl">
          <p className="section-label text-coral">Shop collection</p>
          <h1 className="font-display text-[clamp(3.25rem,8vw,6.5rem)] text-plum">
            {collection.name}
          </h1>
          {collection.description && (
            <p className="mt-5 max-w-2xl font-display text-lg leading-relaxed text-plum/68 sm:text-xl">
              {htmlToPlainText(collection.description)}
            </p>
          )}
          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-plum/45">
            {products.length} {products.length === 1 ? "piece" : "pieces"}
          </p>
        </header>
        <div className="mt-12 sm:mt-16">
          {products.length > 0 ? <ProductGrid products={products} /> : <EmptyCollectionState />}
        </div>
      </div>
    </>
  );
}

function CollectionError() {
  const router = useRouter();
  return (
    <ShopErrorState
      title="This collection did not load."
      onRetry={() => {
        void router.invalidate();
      }}
    />
  );
}

function MissingCollection() {
  return (
    <ShopErrorState
      title="That collection is not here."
      body="It may have moved or been retired. The complete current catalog is still available in the shop."
    />
  );
}
