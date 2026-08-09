import { Link } from "@tanstack/react-router";
import { Minus, Plus } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { formatMoney } from "@/lib/fourthwall/repository";
import { useShopCart } from "./ShopCartContext";

function QuantityButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full text-plum transition-colors hover:bg-pinkcard disabled:cursor-not-allowed disabled:opacity-35"
    >
      {children}
    </button>
  );
}

export function ShopCartSheet() {
  const {
    cart,
    subtotalCents,
    isHydrating,
    isPending,
    error,
    isOpen,
    setOpen,
    clearError,
    changeQuantity,
    removeItem,
    checkout,
  } = useShopCart();
  const items = cart?.items ?? [];

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => {
        setOpen(open);
        if (!open) clearError();
      }}
    >
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 border-plum/10 bg-white p-0 sm:max-w-[29rem]"
      >
        <SheetHeader className="border-b border-plum/10 px-5 py-5 pr-14 text-left sm:px-7">
          <SheetTitle className="font-display text-3xl font-normal text-plum">Your cart</SheetTitle>
          <SheetDescription className="text-sm text-plum/60">
            Department of Consent, fulfilled and checked out by Fourthwall.
          </SheetDescription>
        </SheetHeader>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-7">
          {isHydrating ? (
            <p className="py-12 text-center text-sm text-plum/60">Checking your cart…</p>
          ) : items.length === 0 ? (
            <div className="flex min-h-[20rem] flex-col items-center justify-center text-center">
              <p className="font-display text-3xl text-plum">Your cart is empty.</p>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-plum/60">
                Browse the full collection and find something made for play.
              </p>
              <SheetClose asChild>
                <Link to="/shop" className="btn-editorial mt-7">
                  <span>Browse the shop</span>
                </Link>
              </SheetClose>
            </div>
          ) : (
            <ul className="divide-y divide-plum/10">
              {items.map((item) => {
                const image = item.variant.images[0];
                const finiteMaximum = item.variant.stock.inStock;
                const canIncrease =
                  typeof finiteMaximum !== "number" || item.quantity < finiteMaximum;
                return (
                  <li
                    key={item.variant.id}
                    className="grid grid-cols-[5.5rem_1fr] gap-4 py-5 first:pt-0"
                  >
                    <SheetClose asChild>
                      <Link
                        to="/shop/products/$productSlug"
                        params={{ productSlug: item.variant.product.slug }}
                        className="aspect-[3/4] overflow-hidden rounded-xl bg-cream ring-1 ring-plum/10"
                      >
                        {image && (
                          <img
                            src={image.transformedUrl || image.url}
                            alt=""
                            width={image.width}
                            height={image.height}
                            className="h-full w-full object-contain"
                          />
                        )}
                      </Link>
                    </SheetClose>
                    <div className="min-w-0">
                      <SheetClose asChild>
                        <Link
                          to="/shop/products/$productSlug"
                          params={{ productSlug: item.variant.product.slug }}
                          className="font-display text-lg leading-tight text-plum hover:text-coral"
                        >
                          {item.variant.product.name}
                        </Link>
                      </SheetClose>
                      {item.variant.attributes.description && (
                        <p className="mt-1 text-xs text-plum/58">
                          {item.variant.attributes.description}
                        </p>
                      )}
                      <p className="mt-2 text-sm font-semibold text-plum">
                        {formatMoney(item.variant.unitPrice)}
                      </p>
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        <div className="inline-flex items-center rounded-full border border-plum/15 bg-white p-0.5">
                          <QuantityButton
                            label={`Decrease ${item.variant.product.name} quantity`}
                            disabled={isPending}
                            onClick={() => {
                              if (item.quantity === 1) {
                                void removeItem(item.variant.id, item.quantity);
                              } else {
                                void changeQuantity(item.variant.id, item.quantity - 1);
                              }
                            }}
                          >
                            <Minus className="h-3.5 w-3.5" aria-hidden />
                          </QuantityButton>
                          <span
                            className="w-8 text-center text-sm font-semibold"
                            aria-live="polite"
                          >
                            {item.quantity}
                          </span>
                          <QuantityButton
                            label={`Increase ${item.variant.product.name} quantity`}
                            disabled={isPending || !canIncrease}
                            onClick={() => void changeQuantity(item.variant.id, item.quantity + 1)}
                          >
                            <Plus className="h-3.5 w-3.5" aria-hidden />
                          </QuantityButton>
                        </div>
                        <button
                          type="button"
                          disabled={isPending}
                          onClick={() => void removeItem(item.variant.id, item.quantity)}
                          className="text-xs font-semibold text-plum/60 underline underline-offset-4 hover:text-coral disabled:opacity-40"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-plum/10 bg-cream/45 px-5 py-5 sm:px-7 sm:py-6">
            {error && (
              <p role="alert" className="mb-4 rounded-xl bg-pinkcard px-4 py-3 text-sm text-plum">
                {error}
              </p>
            )}
            <div className="flex items-center justify-between gap-4">
              <span className="label-condensed text-sm text-plum">Subtotal</span>
              <span className="font-display text-2xl text-plum">
                {formatMoney({ value: subtotalCents / 100, currency: "USD" })}
              </span>
            </div>
            <p className="mt-1 text-xs text-plum/55">
              Shipping and taxes are calculated at checkout.
            </p>
            <button
              type="button"
              onClick={checkout}
              disabled={isPending}
              className="btn-editorial mt-5 w-full disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span>{isPending ? "Updating…" : "Checkout securely"}</span>
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
