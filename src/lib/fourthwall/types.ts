import { z } from "zod";

const moneyValueSchema = z.union([z.number(), z.string()]).transform((value) => Number(value));

export const moneySchema = z.object({
  value: moneyValueSchema,
  currency: z.string().min(3),
});

export const imageSchema = z.object({
  id: z.string(),
  url: z.string().url(),
  transformedUrl: z.string().url().optional().nullable(),
  width: z.number().positive(),
  height: z.number().positive(),
});

export const stockSchema = z.object({
  type: z.string(),
  inStock: z.number().int().nonnegative().optional(),
});

const colorSchema = z.object({
  name: z.string(),
  swatch: z.string().optional().nullable(),
});

const sizeSchema = z.object({ name: z.string() });

export const variantSchema = z.object({
  id: z.string(),
  name: z.string(),
  sku: z.string().optional().default(""),
  unitPrice: moneySchema,
  compareAtPrice: moneySchema.nullable().optional(),
  attributes: z
    .object({
      description: z.string().optional().default(""),
      color: colorSchema.nullable().optional(),
      size: sizeSchema.nullable().optional(),
    })
    .passthrough(),
  stock: stockSchema,
  images: z.array(imageSchema).default([]),
});

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().default(""),
  state: z.object({ type: z.string() }),
  access: z.object({ type: z.string() }),
  images: z.array(imageSchema).default([]),
  variants: z.array(variantSchema).default([]),
  additionalInformation: z
    .array(
      z.object({
        type: z.string(),
        title: z.string(),
        bodyHtml: z.string().default(""),
      }),
    )
    .default([]),
  sizeGuide: z
    .object({
      fitGuideUrls: z.array(z.string().url()).optional().default([]),
      previewUrl: z.string().url().optional().nullable(),
      fileUrl: z.string().url().optional().nullable(),
      description: z.string().optional().default(""),
      fitGuideDescription: z.string().optional().default(""),
    })
    .nullable()
    .optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const collectionSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().default(""),
});

export const shopSchema = z.object({
  id: z.string(),
  name: z.string(),
  domain: z.string(),
  publicDomain: z.string(),
});

export const pagingSchema = z.object({
  pageNumber: z.number().int().nonnegative(),
  pageSize: z.number().int().positive(),
  elementsSize: z.number().int().nonnegative(),
  elementsTotal: z.number().int().nonnegative(),
  totalPages: z.number().int().nonnegative(),
  hasNextPage: z.boolean(),
});

export function pagedSchema<T extends z.ZodTypeAny>(resultSchema: T) {
  return z.object({
    results: z.array(resultSchema),
    paging: pagingSchema,
  });
}

const cartProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
});

const cartVariantSchema = variantSchema.extend({
  product: cartProductSchema,
});

export const cartSchema = z.object({
  id: z.string(),
  items: z
    .array(
      z.object({
        variant: cartVariantSchema,
        quantity: z.number().int().positive(),
        groupedBy: z.unknown().optional().nullable(),
      }),
    )
    .default([]),
  metadata: z
    .record(z.unknown())
    .nullish()
    .transform((metadata) => metadata ?? {}),
});

export type Money = z.infer<typeof moneySchema>;
export type FourthwallImage = z.infer<typeof imageSchema>;
export type Stock = z.infer<typeof stockSchema>;
export type Variant = z.infer<typeof variantSchema>;
export type Product = z.infer<typeof productSchema>;
export type Collection = z.infer<typeof collectionSchema>;
export type Shop = z.infer<typeof shopSchema>;
export type Paging = z.infer<typeof pagingSchema>;
export type Cart = z.infer<typeof cartSchema>;
export type CartItem = Cart["items"][number];
