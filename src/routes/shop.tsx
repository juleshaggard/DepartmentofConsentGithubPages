import { Outlet, createFileRoute, useRouter } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { ShopChrome } from "@/components/shop/ShopChrome";
import { ShopErrorState, ShopLoadingState } from "@/components/shop/ShopStates";
import { getShopChromeData } from "@/lib/fourthwall/repository";

export const Route = createFileRoute("/shop")({
  loader: getShopChromeData,
  staleTime: 60_000,
  pendingComponent: () => (
    <MarketingLayout>
      <ShopLoadingState />
    </MarketingLayout>
  ),
  errorComponent: ShopRouteError,
  component: ShopLayout,
});

function ShopLayout() {
  const data = Route.useLoaderData();
  return (
    <ShopChrome data={data}>
      <Outlet />
    </ShopChrome>
  );
}

function ShopRouteError() {
  const router = useRouter();
  return (
    <MarketingLayout>
      <ShopErrorState
        onRetry={() => {
          void router.invalidate();
        }}
      />
    </MarketingLayout>
  );
}
