import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { fourthwallClient, StorefrontApiError } from "@/lib/fourthwall/client";
import { buildCheckoutUrl, cartSubtotalCents } from "@/lib/fourthwall/cart";
import type { Cart, Shop } from "@/lib/fourthwall/types";
import { ShopCartContext, type ShopCartContextValue } from "./ShopCartContext";

const CART_STORAGE_KEY = "doc:fourthwall:cart-id";

function safeErrorMessage(error: unknown): string {
  if (error instanceof StorefrontApiError) return error.message;
  return "The cart could not be updated. Please try again.";
}

export function ShopCartProvider({ shop, children }: { shop: Shop; children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isHydrating, setHydrating] = useState(true);
  const [isPending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setOpen] = useState(false);
  const operationInFlight = useRef(false);

  useEffect(() => {
    let active = true;
    const cartId = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!cartId) {
      setHydrating(false);
      return () => {
        active = false;
      };
    }

    fourthwallClient
      .getCart(cartId)
      .then((nextCart) => {
        if (active) setCart(nextCart);
      })
      .catch((loadError: unknown) => {
        if (!active) return;
        if (loadError instanceof StorefrontApiError && loadError.isNotFound) {
          window.localStorage.removeItem(CART_STORAGE_KEY);
          return;
        }
        setError(safeErrorMessage(loadError));
      })
      .finally(() => {
        if (active) setHydrating(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const commitCart = useCallback((nextCart: Cart) => {
    setCart(nextCart);
    window.localStorage.setItem(CART_STORAGE_KEY, nextCart.id);
  }, []);

  const recreateCart = useCallback(
    async (items: Array<{ variantId: string; quantity: number }>) => {
      setCart(null);
      window.localStorage.removeItem(CART_STORAGE_KEY);
      if (items.length === 0) return;
      commitCart(await fourthwallClient.createCart(items));
    },
    [commitCart],
  );

  const runOperation = useCallback(async (operation: () => Promise<void>) => {
    if (operationInFlight.current) return;
    operationInFlight.current = true;
    setPending(true);
    setError(null);
    try {
      await operation();
    } catch (operationError) {
      setError(safeErrorMessage(operationError));
      throw operationError;
    } finally {
      operationInFlight.current = false;
      setPending(false);
    }
  }, []);

  const addItem = useCallback(
    async (variantId: string, quantity: number) => {
      await runOperation(async () => {
        const items = [{ variantId, quantity }];
        if (!cart) {
          const createdCart = await fourthwallClient.createCart(items);
          commitCart(createdCart);
          setOpen(true);
          return;
        }

        try {
          const nextCart = await fourthwallClient.addToCart(cart.id, items);
          commitCart(nextCart);
        } catch (addError) {
          if (!(addError instanceof StorefrontApiError) || !addError.isNotFound) throw addError;
          const recoveredItems = new Map(
            cart.items.map((item) => [item.variant.id, item.quantity]),
          );
          items.forEach((item) => {
            recoveredItems.set(
              item.variantId,
              (recoveredItems.get(item.variantId) ?? 0) + item.quantity,
            );
          });
          await recreateCart(
            Array.from(recoveredItems, ([recoveredVariantId, recoveredQuantity]) => ({
              variantId: recoveredVariantId,
              quantity: recoveredQuantity,
            })),
          );
        }
        setOpen(true);
      });
    },
    [cart, commitCart, recreateCart, runOperation],
  );

  const changeQuantity = useCallback(
    async (variantId: string, quantity: number) => {
      if (!cart) return;
      await runOperation(async () => {
        try {
          const nextCart = await fourthwallClient.changeCartQuantity(cart.id, [
            { variantId, quantity },
          ]);
          commitCart(nextCart);
        } catch (changeError) {
          if (!(changeError instanceof StorefrontApiError) || !changeError.isNotFound) {
            throw changeError;
          }
          await recreateCart(
            cart.items.map((item) => ({
              variantId: item.variant.id,
              quantity: item.variant.id === variantId ? quantity : item.quantity,
            })),
          );
        }
      });
    },
    [cart, commitCart, recreateCart, runOperation],
  );

  const removeItem = useCallback(
    async (variantId: string, quantity: number) => {
      if (!cart) return;
      await runOperation(async () => {
        try {
          const nextCart = await fourthwallClient.removeFromCart(cart.id, [
            { variantId, quantity },
          ]);
          commitCart(nextCart);
        } catch (removeError) {
          if (!(removeError instanceof StorefrontApiError) || !removeError.isNotFound) {
            throw removeError;
          }
          await recreateCart(
            cart.items
              .map((item) => ({
                variantId: item.variant.id,
                quantity:
                  item.variant.id === variantId
                    ? Math.max(0, item.quantity - quantity)
                    : item.quantity,
              }))
              .filter((item) => item.quantity > 0),
          );
        }
      });
    },
    [cart, commitCart, recreateCart, runOperation],
  );

  const checkout = useCallback(() => {
    if (!cart || cart.items.length === 0) return;
    window.location.assign(buildCheckoutUrl(shop.publicDomain, cart.id));
  }, [cart, shop.publicDomain]);

  const clearError = useCallback(() => setError(null), []);

  const value = useMemo<ShopCartContextValue>(
    () => ({
      cart,
      itemCount: cart?.items.reduce((total, item) => total + item.quantity, 0) ?? 0,
      subtotalCents: cartSubtotalCents(cart),
      isHydrating,
      isPending,
      error,
      isOpen,
      setOpen,
      clearError,
      addItem,
      changeQuantity,
      removeItem,
      checkout,
    }),
    [
      addItem,
      cart,
      changeQuantity,
      checkout,
      clearError,
      error,
      isHydrating,
      isOpen,
      isPending,
      removeItem,
    ],
  );

  return <ShopCartContext.Provider value={value}>{children}</ShopCartContext.Provider>;
}
