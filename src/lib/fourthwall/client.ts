import { z } from "zod";
import {
  cartSchema,
  collectionSchema,
  pagedSchema,
  productSchema,
  shopSchema,
  type Cart,
  type Collection,
  type Paging,
  type Product,
  type Shop,
} from "./types";

const API_BASE = "https://storefront-api.fourthwall.com/v1";
const CURRENCY = "USD";
const PAGE_SIZE = 100;

type Page<T> = { results: T[]; paging: Paging };
type CartRequestItem = { variantId: string; quantity: number };

export class StorefrontApiError extends Error {
  readonly status: number;
  readonly code?: string;

  constructor(message: string, status = 0, code?: string) {
    super(message);
    this.name = "StorefrontApiError";
    this.status = status;
    this.code = code;
  }

  get isNotFound() {
    return this.status === 404;
  }
}

function storefrontToken(): string {
  const token = import.meta.env.VITE_FOURTHWALL_STOREFRONT_TOKEN?.trim();
  if (!token) {
    throw new StorefrontApiError("The shop is not configured yet.");
  }
  return token;
}

async function request<TSchema extends z.ZodTypeAny>({
  path,
  schema,
  method = "GET",
  body,
  currency = true,
  query,
}: {
  path: string;
  schema: TSchema;
  method?: "GET" | "POST";
  body?: unknown;
  currency?: boolean;
  query?: Record<string, string | number>;
}): Promise<z.output<TSchema>> {
  const url = new URL(`${API_BASE}${path}`);
  url.searchParams.set("storefront_token", storefrontToken());
  if (currency) url.searchParams.set("currency", CURRENCY);
  Object.entries(query ?? {}).forEach(([key, value]) => url.searchParams.set(key, String(value)));

  let response: Response;
  try {
    response = await fetch(url, {
      method,
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new StorefrontApiError("Fourthwall could not be reached. Please try again.");
  }

  if (!response.ok) {
    let code: string | undefined;
    try {
      const payload = (await response.json()) as { code?: string };
      code = payload.code;
    } catch {
      // The status code is enough to present a safe error without exposing the tokenized URL.
    }
    throw new StorefrontApiError(
      response.status === 404
        ? "That shop item could not be found."
        : "Fourthwall returned an error.",
      response.status,
      code,
    );
  }

  const payload: unknown = await response.json();
  const result = schema.safeParse(payload);
  if (!result.success) {
    throw new StorefrontApiError("Fourthwall returned data in an unexpected format.");
  }
  return result.data;
}

export class FourthwallStorefrontClient {
  getShop(): Promise<Shop> {
    return request({ path: "/shop", schema: shopSchema, currency: false });
  }

  listCollections(page = 0): Promise<Page<Collection>> {
    return request({
      path: "/collections",
      schema: pagedSchema(collectionSchema),
      currency: false,
      query: { page, size: PAGE_SIZE },
    });
  }

  getCollection(slug: string): Promise<Collection> {
    return request({
      path: `/collections/${encodeURIComponent(slug)}`,
      schema: collectionSchema,
      currency: false,
    });
  }

  getCollectionProducts(slug: string, page = 0): Promise<Page<Product>> {
    return request({
      path: `/collections/${encodeURIComponent(slug)}/products`,
      schema: pagedSchema(productSchema),
      query: { page, size: PAGE_SIZE },
    });
  }

  getProduct(slug: string): Promise<Product> {
    return request({ path: `/products/${encodeURIComponent(slug)}`, schema: productSchema });
  }

  createCart(items: CartRequestItem[]): Promise<Cart> {
    return request({ path: "/carts", schema: cartSchema, method: "POST", body: { items } });
  }

  getCart(cartId: string): Promise<Cart> {
    return request({ path: `/carts/${encodeURIComponent(cartId)}`, schema: cartSchema });
  }

  addToCart(cartId: string, items: CartRequestItem[]): Promise<Cart> {
    return request({
      path: `/carts/${encodeURIComponent(cartId)}/add`,
      schema: cartSchema,
      method: "POST",
      body: { items },
    });
  }

  changeCartQuantity(cartId: string, items: CartRequestItem[]): Promise<Cart> {
    return request({
      path: `/carts/${encodeURIComponent(cartId)}/change`,
      schema: cartSchema,
      method: "POST",
      body: { items },
    });
  }

  removeFromCart(cartId: string, items: CartRequestItem[]): Promise<Cart> {
    return request({
      path: `/carts/${encodeURIComponent(cartId)}/remove`,
      schema: cartSchema,
      method: "POST",
      body: { items },
    });
  }
}

export const fourthwallClient = new FourthwallStorefrontClient();
