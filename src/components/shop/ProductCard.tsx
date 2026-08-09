import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { formatMoney, type ProductSummary } from "@/lib/fourthwall/repository";

export function ProductCard({
  product,
  priority = false,
}: {
  product: ProductSummary;
  priority?: boolean;
}) {
  const colorOptions = product.colorOptions ?? [];
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]?.name ?? "");
  const selectedColorOption = colorOptions.find((option) => option.name === selectedColor);
  const image = selectedColorOption?.image ?? product.primaryImage;

  return (
    <article className="group min-w-0">
      <Link
        to="/shop/products/$productSlug"
        params={{ productSlug: product.slug }}
        className="block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2"
      >
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-[#f2f0ee]">
          {image ? (
            <img
              src={image.transformedUrl || image.url}
              alt={product.name}
              width={image.width}
              height={image.height}
              loading={priority ? "eager" : "lazy"}
              fetchPriority={priority ? "high" : "auto"}
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.015] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-5 text-center font-display text-sm text-plum/55">
              Image unavailable
            </div>
          )}
          {product.availability === "sold-out" && (
            <span className="label-condensed absolute bottom-3 left-3 rounded-full bg-white px-3 py-1.5 text-[0.68rem] text-plum ring-1 ring-plum/15">
              Sold out
            </span>
          )}
        </div>
      </Link>

      <div className="mt-4 text-center">
        <Link
          to="/shop/products/$productSlug"
          params={{ productSlug: product.slug }}
          className="inline-block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2"
        >
          <h3 className="font-display text-base leading-[1.15] text-plum sm:text-[1.05rem]">
            {product.name}
          </h3>
        </Link>
        {product.price && (
          <p className="mt-2 font-display text-sm text-plum sm:text-base">
            {product.price.varies && <span className="text-plum/60">From </span>}
            {formatMoney(product.price.minimum)}
          </p>
        )}
        {colorOptions.length > 1 && (
          <fieldset className="mt-3 flex items-center justify-center gap-2">
            <legend className="sr-only">Choose a color preview for {product.name}</legend>
            {colorOptions.slice(0, 4).map((option) => {
              const active = option.name === selectedColor;
              return (
                <button
                  key={option.name}
                  type="button"
                  aria-label={`Preview ${option.name}`}
                  aria-pressed={active}
                  title={option.name}
                  onClick={() => setSelectedColor(option.name)}
                  className={`h-3.5 w-3.5 rounded-full border bg-white p-[2px] transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 ${
                    active ? "border-plum" : "border-plum/18"
                  }`}
                >
                  <span
                    className="block h-full w-full rounded-full border border-plum/10"
                    style={{ backgroundColor: option.swatch || option.name }}
                    aria-hidden
                  />
                </button>
              );
            })}
            {colorOptions.length > 4 && (
              <span className="font-display text-xs text-plum/70">+{colorOptions.length - 4}</span>
            )}
          </fieldset>
        )}
      </div>
    </article>
  );
}

export function ProductGrid({ products }: { products: ProductSummary[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-16">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} priority={index < 4} />
      ))}
    </div>
  );
}
