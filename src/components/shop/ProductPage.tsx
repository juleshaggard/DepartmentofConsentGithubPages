import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Minus, Plus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { JsonLd } from "@/components/marketing/JsonLd";
import { breadcrumbJsonLd, productJsonLd } from "@/lib/seo";
import { formatMoney, type ProductDetail } from "@/lib/fourthwall/repository";
import { useShopCart } from "./ShopCartContext";

type ProductVariant = ProductDetail["variants"][number];

function unique(values: Array<string | null | undefined>): string[] {
  return Array.from(new Set(values.filter((value): value is string => Boolean(value))));
}

function firstVariant(product: ProductDetail): ProductVariant | null {
  return (
    product.variants.find((variant) => variant.availability === "available") ??
    product.variants[0] ??
    null
  );
}

function QuantityControl({
  quantity,
  maximum,
  disabled,
  onChange,
}: {
  quantity: number;
  maximum?: number;
  disabled: boolean;
  onChange: (quantity: number) => void;
}) {
  return (
    <div className="min-w-0">
      <span className="doc-label">Quantity</span>
      <div className="inline-flex items-center rounded-full border border-plum/20 bg-white p-1">
        <button
          type="button"
          aria-label="Decrease quantity"
          disabled={disabled || quantity <= 1}
          onClick={() => onChange(Math.max(1, quantity - 1))}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-pinkcard disabled:opacity-35"
        >
          <Minus className="h-4 w-4" aria-hidden />
        </button>
        <span className="w-10 text-center text-sm font-semibold" aria-live="polite">
          {quantity}
        </span>
        <button
          type="button"
          aria-label="Increase quantity"
          disabled={disabled || (typeof maximum === "number" && quantity >= maximum)}
          onClick={() => onChange(quantity + 1)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-pinkcard disabled:opacity-35"
        >
          <Plus className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}

function ProductGallery({
  product,
  variant,
}: {
  product: ProductDetail;
  variant: ProductVariant | null;
}) {
  const imageMap = useMemo(
    () => new Map(product.images.map((image) => [image.id, image])),
    [product.images],
  );
  const variantImages = (variant?.imageIds ?? [])
    .map((id) => imageMap.get(id))
    .filter((image): image is ProductDetail["images"][number] => Boolean(image));
  const images = variantImages.length > 0 ? variantImages : product.images;
  const firstImageId = images[0]?.id ?? "";
  const [activeImageId, setActiveImageId] = useState(images[0]?.id ?? "");

  useEffect(() => {
    setActiveImageId(firstImageId);
  }, [firstImageId]);

  const activeImage = images.find((image) => image.id === activeImageId) ?? images[0];

  if (!activeImage) {
    return (
      <div className="flex aspect-[3/4] items-center justify-center rounded-2xl bg-cream text-sm text-plum/55">
        Product image unavailable
      </div>
    );
  }

  return (
    <div className="min-w-0">
      <div className="flex min-h-[28rem] items-center justify-center overflow-hidden rounded-2xl bg-cream ring-1 ring-plum/10 sm:min-h-[36rem] lg:min-h-[44rem]">
        <img
          key={activeImage.id}
          src={activeImage.transformedUrl || activeImage.url}
          alt={`${product.name} — view ${Math.max(1, images.indexOf(activeImage) + 1)}`}
          width={activeImage.width}
          height={activeImage.height}
          fetchPriority="high"
          decoding="async"
          className="max-h-[78vh] w-full object-contain"
        />
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-3 overflow-x-auto pb-1" aria-label="Product images">
          {images.map((image, index) => (
            <button
              key={image.id}
              type="button"
              aria-label={`Show ${product.name} image ${index + 1}`}
              aria-pressed={image.id === activeImage.id}
              onClick={() => setActiveImageId(image.id)}
              className={`h-20 w-16 shrink-0 overflow-hidden rounded-xl bg-cream ring-offset-2 transition-shadow sm:h-24 sm:w-20 ${
                image.id === activeImage.id
                  ? "ring-2 ring-coral"
                  : "ring-1 ring-plum/12 hover:ring-plum/35"
              }`}
            >
              <img
                src={image.transformedUrl || image.url}
                alt=""
                width={image.width}
                height={image.height}
                loading="lazy"
                className="h-full w-full object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function ProductPage({ product }: { product: ProductDetail }) {
  const initialVariant = firstVariant(product);
  const [selectedColor, setSelectedColor] = useState<string | null>(
    initialVariant?.attributes.color?.name ?? null,
  );
  const [selectedSize, setSelectedSize] = useState<string | null>(
    initialVariant?.attributes.size?.name ?? null,
  );
  const [quantity, setQuantity] = useState(1);
  const { addItem, isPending, error, clearError } = useShopCart();

  useEffect(() => {
    const nextVariant = firstVariant(product);
    setSelectedColor(nextVariant?.attributes.color?.name ?? null);
    setSelectedSize(nextVariant?.attributes.size?.name ?? null);
    setQuantity(1);
    clearError();
  }, [clearError, product]);

  const colors = unique(product.variants.map((variant) => variant.attributes.color?.name));
  const sizes = unique(product.variants.map((variant) => variant.attributes.size?.name));
  const selectedVariant =
    product.variants.find(
      (variant) =>
        (selectedColor === null || variant.attributes.color?.name === selectedColor) &&
        (selectedSize === null || variant.attributes.size?.name === selectedSize),
    ) ?? initialVariant;

  const productIsAvailable =
    product.state.type === "AVAILABLE" && selectedVariant?.availability === "available";
  const maximumQuantity = selectedVariant?.stock.inStock;

  const chooseColor = (color: string) => {
    const matchingVariants = product.variants.filter(
      (variant) => variant.attributes.color?.name === color && variant.availability === "available",
    );
    const keepsSize = matchingVariants.some(
      (variant) => variant.attributes.size?.name === selectedSize,
    );
    setSelectedColor(color);
    if (!keepsSize) setSelectedSize(matchingVariants[0]?.attributes.size?.name ?? null);
    setQuantity(1);
    clearError();
  };

  const chooseSize = (size: string) => {
    setSelectedSize(size);
    setQuantity(1);
    clearError();
  };

  const productPath = `/shop/products/${product.slug}`;
  const priceValues = product.variants.map((variant) => variant.unitPrice.value);
  const lowPrice = Math.min(...priceValues);
  const highPrice = Math.max(...priceValues);
  const firstCurrency = selectedVariant?.unitPrice.currency ?? "USD";
  const crumbs = [
    { label: "Department of Consent", path: "/" },
    { label: "Shop", path: "/shop" },
    ...(product.collections[0]
      ? [
          {
            label: product.collections[0].name,
            path: `/shop/collections/${product.collections[0].slug}`,
          },
        ]
      : []),
    { label: product.name, path: productPath },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      {selectedVariant && Number.isFinite(lowPrice) && Number.isFinite(highPrice) && (
        <JsonLd
          data={productJsonLd({
            name: product.name,
            description: product.descriptionText,
            path: productPath,
            images: product.images.map((image) => image.transformedUrl || image.url),
            currency: firstCurrency,
            lowPrice,
            highPrice,
            offerCount: product.variants.length,
            available:
              product.state.type === "AVAILABLE" &&
              product.variants.some((variant) => variant.availability === "available"),
          })}
        />
      )}

      <div className="mx-auto max-w-6xl px-5 pb-20 pt-8 sm:px-8 sm:pb-28 sm:pt-12">
        <nav
          aria-label="Breadcrumb"
          className="mb-7 flex flex-wrap items-center gap-2 text-xs text-plum/58"
        >
          <Link to="/shop" className="underline-offset-4 hover:text-coral hover:underline">
            Shop
          </Link>
          {product.collections[0] && (
            <>
              <span aria-hidden>/</span>
              <Link
                to="/shop/collections/$collectionSlug"
                params={{ collectionSlug: product.collections[0].slug }}
                className="underline-offset-4 hover:text-coral hover:underline"
              >
                {product.collections[0].name}
              </Link>
            </>
          )}
        </nav>

        <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(20rem,0.8fr)] lg:items-start lg:gap-16">
          <ProductGallery product={product} variant={selectedVariant} />

          <div className="min-w-0 lg:sticky lg:top-[10.75rem]">
            <p className="section-label text-coral">Department of Consent shop</p>
            <h1 className="font-display text-[clamp(2.5rem,5vw,4.75rem)] leading-[0.98] text-plum">
              {product.name}
            </h1>
            {selectedVariant && (
              <div className="mt-5 flex flex-wrap items-baseline gap-3">
                <p className="font-display text-2xl text-plum">
                  {formatMoney(selectedVariant.unitPrice)}
                </p>
                {selectedVariant.compareAtPrice && (
                  <p className="text-sm text-plum/45 line-through">
                    {formatMoney(selectedVariant.compareAtPrice)}
                  </p>
                )}
              </div>
            )}

            <div className="mt-8 space-y-7">
              {colors.length > 0 && (
                <fieldset>
                  <legend className="doc-label">Color</legend>
                  <div className="flex flex-wrap gap-2.5">
                    {colors.map((color) => {
                      const colorVariant = product.variants.find(
                        (variant) => variant.attributes.color?.name === color,
                      );
                      const available = product.variants.some(
                        (variant) =>
                          variant.attributes.color?.name === color &&
                          variant.availability === "available",
                      );
                      const selected = selectedColor === color;
                      return (
                        <label
                          key={color}
                          className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-2 text-sm transition-colors ${
                            selected
                              ? "border-coral bg-pinkcard text-plum"
                              : "border-plum/18 bg-white text-plum hover:border-plum/45"
                          } ${!available ? "cursor-not-allowed opacity-38" : ""}`}
                        >
                          <input
                            type="radio"
                            name="product-color"
                            value={color}
                            checked={selected}
                            disabled={!available}
                            onChange={() => chooseColor(color)}
                            className="sr-only"
                          />
                          <span
                            aria-hidden
                            className="h-4 w-4 rounded-full border border-plum/15"
                            style={{
                              backgroundColor: colorVariant?.attributes.color?.swatch || color,
                            }}
                          />
                          {color}
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              )}

              {sizes.length > 0 && (
                <fieldset>
                  <legend className="doc-label">Size</legend>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => {
                      const available = product.variants.some(
                        (variant) =>
                          variant.attributes.size?.name === size &&
                          (selectedColor === null ||
                            variant.attributes.color?.name === selectedColor) &&
                          variant.availability === "available",
                      );
                      const selected = selectedSize === size;
                      return (
                        <label
                          key={size}
                          className={`inline-flex min-w-12 cursor-pointer items-center justify-center rounded-full border px-3 py-2 text-sm font-semibold transition-colors ${
                            selected
                              ? "border-coral bg-coral text-white"
                              : "border-plum/18 bg-white text-plum hover:border-plum/45"
                          } ${!available ? "cursor-not-allowed opacity-35 line-through" : ""}`}
                        >
                          <input
                            type="radio"
                            name="product-size"
                            value={size}
                            checked={selected}
                            disabled={!available}
                            onChange={() => chooseSize(size)}
                            className="sr-only"
                          />
                          {size}
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              )}

              <QuantityControl
                quantity={quantity}
                maximum={maximumQuantity}
                disabled={!productIsAvailable || isPending}
                onChange={setQuantity}
              />
            </div>

            <button
              type="button"
              disabled={!productIsAvailable || !selectedVariant || isPending}
              onClick={() => {
                if (!selectedVariant) return;
                void addItem(selectedVariant.id, quantity).catch(() => undefined);
              }}
              className="btn-editorial mt-8 w-full disabled:cursor-not-allowed disabled:border-plum/20 disabled:bg-plum/10 disabled:text-plum/45 disabled:opacity-100"
            >
              <span>
                {!productIsAvailable ? "Sold out" : isPending ? "Adding…" : "Add to cart"}
              </span>
            </button>
            {error && (
              <p role="alert" className="mt-3 text-sm leading-relaxed text-coral">
                {error}
              </p>
            )}
            {selectedVariant?.stock.type !== "UNLIMITED" && productIsAvailable && (
              <p className="mt-3 text-xs text-plum/55">
                {selectedVariant?.stock.inStock} available
              </p>
            )}

            {product.collections.length > 0 && (
              <div className="mt-8 border-t border-plum/12 pt-5">
                <p className="text-xs font-semibold uppercase text-plum/45">Found in</p>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                  {product.collections.map((collection) => (
                    <Link
                      key={collection.id}
                      to="/shop/collections/$collectionSlug"
                      params={{ collectionSlug: collection.slug }}
                      className="text-sm font-semibold text-plum underline underline-offset-4 hover:text-coral"
                    >
                      {collection.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 grid gap-10 border-t border-plum/12 pt-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16 sm:mt-24 sm:pt-14">
          <section>
            <h2 className="font-display text-3xl text-plum sm:text-4xl">About this piece</h2>
            {product.descriptionHtml ? (
              <div
                className="shop-rich-text mt-5"
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              />
            ) : (
              <p className="mt-4 text-sm text-plum/60">No description is available yet.</p>
            )}
          </section>

          {(product.additionalInformation.length > 0 || product.sizeGuide) && (
            <aside>
              <Accordion type="single" collapsible className="w-full border-t border-plum/12">
                {product.sizeGuide && (
                  <AccordionItem value="size-guide">
                    <AccordionTrigger className="text-left font-semibold text-plum hover:text-coral hover:no-underline">
                      Size guide
                    </AccordionTrigger>
                    <AccordionContent>
                      {product.sizeGuide.descriptionHtml && (
                        <div
                          className="shop-rich-text text-sm"
                          dangerouslySetInnerHTML={{ __html: product.sizeGuide.descriptionHtml }}
                        />
                      )}
                      <div className="mt-4 flex flex-wrap gap-4">
                        {product.sizeGuide.previewUrl && (
                          <a
                            href={product.sizeGuide.previewUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm font-semibold underline underline-offset-4 hover:text-coral"
                          >
                            Preview size guide
                          </a>
                        )}
                        {product.sizeGuide.fileUrl && (
                          <a
                            href={product.sizeGuide.fileUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm font-semibold underline underline-offset-4 hover:text-coral"
                          >
                            Download size guide
                          </a>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )}
                {product.additionalInformation.map((item, index) => (
                  <AccordionItem key={`${item.type}-${index}`} value={`${item.type}-${index}`}>
                    <AccordionTrigger className="text-left font-semibold text-plum hover:text-coral hover:no-underline">
                      {item.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div
                        className="shop-rich-text text-sm"
                        dangerouslySetInnerHTML={{ __html: item.bodyHtml }}
                      />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </aside>
          )}
        </div>
      </div>
    </>
  );
}
