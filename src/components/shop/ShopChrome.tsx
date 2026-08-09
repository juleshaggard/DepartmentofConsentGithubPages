import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import type { ShopChromeData } from "@/lib/fourthwall/repository";
import { useShopCart } from "./ShopCartContext";
import { ShopCartProvider } from "./ShopCartProvider";
import { ShopCartSheet } from "./ShopCartSheet";
import { ShopLegalNav } from "./ShopLegalNav";

function CartButton() {
  const { itemCount, setOpen, isHydrating } = useShopCart();
  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label={`Open cart${itemCount > 0 ? ` with ${itemCount} items` : ""}`}
      className="label-condensed inline-flex shrink-0 items-center gap-2 rounded-full border border-plum/15 bg-white px-3 py-2 text-xs text-plum transition-colors hover:border-coral hover:text-coral"
    >
      <ShoppingBag className="h-4 w-4" strokeWidth={2} aria-hidden />
      <span>Cart</span>
      {!isHydrating && itemCount > 0 && (
        <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-coral px-1.5 py-0.5 text-[0.65rem] text-white">
          {itemCount}
        </span>
      )}
    </button>
  );
}

function ShopSubnav({ data }: { data: ShopChromeData }) {
  return (
    <div className="sticky top-[calc(4.45rem-1px)] z-30 -mt-px border-b border-plum/10 bg-white/96 backdrop-blur-md sm:top-[calc(5rem-1px)]">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3 sm:px-8">
        <Link
          to="/shop"
          className="label-condensed shrink-0 text-sm text-coral hover:text-plum sm:text-base"
        >
          Shop
        </Link>
        <nav
          aria-label="Shop collections"
          className="min-w-0 flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <ul className="flex w-max items-center gap-5 pr-3">
            {data.collections.map((collection) => (
              <li key={collection.id}>
                <Link
                  to="/shop/collections/$collectionSlug"
                  params={{ collectionSlug: collection.slug }}
                  className="whitespace-nowrap text-xs font-semibold text-plum/65 hover:text-coral"
                  activeProps={{ className: "whitespace-nowrap text-xs font-semibold text-coral" }}
                >
                  {collection.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <CartButton />
      </div>
    </div>
  );
}

export function ShopChrome({
  data,
  children,
}: {
  data: ShopChromeData;
  children: React.ReactNode;
}) {
  return (
    <ShopCartProvider shop={data.shop}>
      <MarketingLayout>
        <ShopSubnav data={data} />
        {children}
        <ShopLegalNav />
      </MarketingLayout>
      <ShopCartSheet />
    </ShopCartProvider>
  );
}
