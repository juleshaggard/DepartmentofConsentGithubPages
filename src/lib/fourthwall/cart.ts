import type { Cart } from "./types";

export function cartSubtotalCents(cart: Cart | null): number {
  return (
    cart?.items.reduce(
      (total, item) => total + Math.round(item.variant.unitPrice.value * 100) * item.quantity,
      0,
    ) ?? 0
  );
}

export function buildCheckoutUrl(publicDomain: string, cartId: string): string {
  const domain = publicDomain.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const url = new URL(`https://${domain}/cart/checkout`);
  url.searchParams.set("cartId", cartId);
  url.searchParams.set("currency", "USD");
  return url.toString();
}
