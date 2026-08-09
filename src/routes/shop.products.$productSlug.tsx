import { createFileRoute, notFound, useRouter } from "@tanstack/react-router";
import { ProductPage } from "@/components/shop/ProductPage";
import { ShopErrorState, ShopLoadingState } from "@/components/shop/ShopStates";
import { getProductPageData } from "@/lib/fourthwall/repository";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/shop/products/$productSlug")({
  loader: async ({ params }) => {
    const product = await getProductPageData(params.productSlug);
    if (!product) throw notFound();
    return product;
  },
  staleTime: 60_000,
  pendingComponent: () => <ShopLoadingState label="Loading the product…" />,
  errorComponent: ProductError,
  notFoundComponent: MissingProduct,
  head: ({ loaderData }) => {
    if (!loaderData) {
      return pageHead({
        title: "Product not found | Department of Consent",
        description: "This Department of Consent shop product could not be found.",
        path: "/shop",
        noindex: true,
      });
    }
    return pageHead({
      title: `${loaderData.name} | Department of Consent`,
      description:
        loaderData.descriptionText || `Shop ${loaderData.name} from Department of Consent.`,
      path: `/shop/products/${loaderData.slug}`,
      ogType: "website",
      image: loaderData.images[0]?.transformedUrl || loaderData.images[0]?.url || undefined,
    });
  },
  component: ProductRoute,
});

function ProductRoute() {
  const product = Route.useLoaderData();
  return <ProductPage product={product} />;
}

function ProductError() {
  const router = useRouter();
  return (
    <ShopErrorState
      title="This product did not load."
      onRetry={() => {
        void router.invalidate();
      }}
    />
  );
}

function MissingProduct() {
  return (
    <ShopErrorState
      title="That product is not here."
      body="It may be unavailable or its address may have changed. Browse the current catalog to find what is live now."
    />
  );
}
