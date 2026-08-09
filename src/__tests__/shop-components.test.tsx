import React, { forwardRef } from "react";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@tanstack/react-router", () => ({
  Link: forwardRef<
    HTMLAnchorElement,
    React.AnchorHTMLAttributes<HTMLAnchorElement> & {
      to?: string;
      params?: Record<string, string>;
      activeProps?: unknown;
    }
  >(({ to = "#", params: _params, activeProps: _activeProps, children, ...props }, ref) => (
    <a ref={ref} href={to} {...props}>
      {children}
    </a>
  )),
}));

import { ProductPage } from "@/components/shop/ProductPage";
import { ShopCartProvider } from "@/components/shop/ShopCartProvider";
import { ShopCartSheet } from "@/components/shop/ShopCartSheet";
import { useShopCart } from "@/components/shop/ShopCartContext";
import { fourthwallClient, StorefrontApiError } from "@/lib/fourthwall/client";
import type { ProductDetail } from "@/lib/fourthwall/repository";
import type { Cart, Shop } from "@/lib/fourthwall/types";

const shop: Shop = {
  id: "shop",
  name: "Leather Worship",
  domain: "leather-worship.fourthwall.com",
  publicDomain: "leatherworship.com",
};

const product: ProductDetail = {
  id: "collar",
  name: "Devotion Collar",
  slug: "devotion-collar",
  state: { type: "AVAILABLE" },
  access: { type: "PUBLIC" },
  images: [
    {
      id: "red-image",
      url: "https://images.example/red.jpg",
      transformedUrl: "https://images.example/red-large.jpg",
      width: 900,
      height: 1200,
    },
    {
      id: "black-image",
      url: "https://images.example/black.jpg",
      transformedUrl: "https://images.example/black-large.jpg",
      width: 900,
      height: 1200,
    },
  ],
  variants: [
    {
      id: "red-small",
      name: "Red / Small",
      sku: "RED-S",
      unitPrice: { value: 10, currency: "USD" },
      compareAtPrice: null,
      attributes: {
        description: "Red / Small",
        color: { name: "Red", swatch: "#ff0000" },
        size: { name: "Small" },
      },
      stock: { type: "UNLIMITED" },
      imageIds: ["red-image"],
      availability: "available",
    },
    {
      id: "red-large",
      name: "Red / Large",
      sku: "RED-L",
      unitPrice: { value: 12, currency: "USD" },
      compareAtPrice: null,
      attributes: {
        description: "Red / Large",
        color: { name: "Red", swatch: "#ff0000" },
        size: { name: "Large" },
      },
      stock: { type: "LIMITED", inStock: 0 },
      imageIds: ["red-image"],
      availability: "sold-out",
    },
    {
      id: "black-large",
      name: "Black / Large",
      sku: "BLACK-L",
      unitPrice: { value: 15, currency: "USD" },
      compareAtPrice: { value: 20, currency: "USD" },
      attributes: {
        description: "Black / Large",
        color: { name: "Black", swatch: "#111111" },
        size: { name: "Large" },
      },
      stock: { type: "LIMITED", inStock: 2 },
      imageIds: ["black-image"],
      availability: "available",
    },
  ],
  collections: [
    {
      id: "signature",
      name: "Signature",
      slug: "signature",
      description: "Signature pieces.",
    },
  ],
  descriptionHtml: "<p>A deliberate collar.</p>",
  descriptionText: "A deliberate collar.",
  additionalInformation: [],
  sizeGuide: null,
};

function cartFor(variantId = "black-large"): Cart {
  const selected = product.variants.find((variant) => variant.id === variantId)!;
  return {
    id: "cart-1",
    metadata: {},
    items: [
      {
        quantity: 1,
        groupedBy: null,
        variant: {
          ...selected,
          images: product.images.filter((image) => selected.imageIds.includes(image.id)),
          product: { id: product.id, name: product.name, slug: product.slug },
        },
      },
    ],
  };
}

function renderProduct() {
  return render(
    <ShopCartProvider shop={shop}>
      <CartProbe />
      <ProductPage product={product} />
      <ShopCartSheet />
    </ShopCartProvider>,
  );
}

function CartProbe() {
  const { cart } = useShopCart();
  return <span data-testid="cart-probe">{cart?.id ?? "no-cart"}</span>;
}

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("product selection and cart UI", () => {
  it("updates valid combinations, price, gallery, and opens the accessible cart", async () => {
    vi.spyOn(fourthwallClient, "createCart").mockResolvedValue(cartFor());
    renderProduct();

    expect((screen.getByRole("radio", { name: "Large" }) as HTMLInputElement).disabled).toBe(true);
    fireEvent.click(screen.getByRole("radio", { name: "Black" }));

    expect((screen.getByRole("radio", { name: "Large" }) as HTMLInputElement).checked).toBe(true);
    expect(screen.getByText("$15.00")).toBeTruthy();
    expect(
      (screen.getByRole("img", { name: /Devotion Collar — view 1/ }) as HTMLImageElement).src,
    ).toContain("black-large.jpg");

    fireEvent.click(screen.getByRole("button", { name: "Add to cart" }));
    expect(await screen.findByRole("dialog")).toBeTruthy();
    expect(await screen.findByRole("heading", { name: "Your cart" })).toBeTruthy();
    expect(screen.getAllByText("Devotion Collar").length).toBeGreaterThan(0);
    expect(screen.getAllByText("$15.00").length).toBeGreaterThan(0);
    expect(localStorage.getItem("doc:fourthwall:cart-id")).toBe("cart-1");

    fireEvent.keyDown(document, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });

  it("clears an expired persisted cart and recreates it once on add", async () => {
    localStorage.setItem("doc:fourthwall:cart-id", "expired-cart");
    vi.spyOn(fourthwallClient, "getCart").mockRejectedValue(
      new StorefrontApiError("Not found", 404),
    );
    const createCart = vi
      .spyOn(fourthwallClient, "createCart")
      .mockResolvedValue(cartFor("red-small"));
    renderProduct();

    await waitFor(() => expect(localStorage.getItem("doc:fourthwall:cart-id")).toBeNull());
    fireEvent.click(screen.getByRole("button", { name: "Add to cart" }));
    await waitFor(() => expect(createCart).toHaveBeenCalledTimes(1));
    expect(localStorage.getItem("doc:fourthwall:cart-id")).toBe("cart-1");
  });

  it("recreates the full cart once if it expires during a mutation", async () => {
    localStorage.setItem("doc:fourthwall:cart-id", "expired-during-add");
    vi.spyOn(fourthwallClient, "getCart").mockResolvedValue({
      ...cartFor("red-small"),
      id: "expired-during-add",
    });
    vi.spyOn(fourthwallClient, "addToCart").mockRejectedValue(
      new StorefrontApiError("Not found", 404),
    );
    const createCart = vi.spyOn(fourthwallClient, "createCart").mockResolvedValue({
      ...cartFor("red-small"),
      id: "replacement-cart",
    });
    renderProduct();

    await waitFor(() =>
      expect(screen.getByTestId("cart-probe").textContent).toBe("expired-during-add"),
    );
    fireEvent.click(screen.getByRole("button", { name: "Add to cart" }));
    await waitFor(() => expect(createCart).toHaveBeenCalledTimes(1));
    expect(createCart).toHaveBeenCalledWith([{ variantId: "red-small", quantity: 2 }]);
    expect(localStorage.getItem("doc:fourthwall:cart-id")).toBe("replacement-cart");
  });

  it("disables purchasing when every variant is unavailable", () => {
    const soldOutProduct: ProductDetail = {
      ...product,
      variants: product.variants.map((variant) => ({
        ...variant,
        stock: { type: "LIMITED", inStock: 0 },
        availability: "sold-out",
      })),
    };
    render(
      <ShopCartProvider shop={shop}>
        <ProductPage product={soldOutProduct} />
      </ShopCartProvider>,
    );
    expect((screen.getByRole("button", { name: "Sold out" }) as HTMLButtonElement).disabled).toBe(
      true,
    );
  });
});
