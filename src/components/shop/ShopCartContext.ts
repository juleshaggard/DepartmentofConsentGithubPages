import { createContext, useContext } from "react";
import type { Cart } from "@/lib/fourthwall/types";

export type ShopCartContextValue = {
  cart: Cart | null;
  itemCount: number;
  subtotalCents: number;
  isHydrating: boolean;
  isPending: boolean;
  error: string | null;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  clearError: () => void;
  addItem: (variantId: string, quantity: number) => Promise<void>;
  changeQuantity: (variantId: string, quantity: number) => Promise<void>;
  removeItem: (variantId: string, quantity: number) => Promise<void>;
  checkout: () => void;
};

export const ShopCartContext = createContext<ShopCartContextValue | null>(null);

export function useShopCart(): ShopCartContextValue {
  const value = useContext(ShopCartContext);
  if (!value) throw new Error("useShopCart must be used within ShopCartProvider");
  return value;
}
