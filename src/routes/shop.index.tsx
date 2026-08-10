import { useId, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import commissionImage from "../../assets/shop-commission.jpg";
import coachingImage from "../../assets/Photo2.jpg";
import { ProductGrid } from "@/components/shop/ProductCard";
import { useShopCart } from "@/components/shop/ShopCartContext";
import { EmptyCollectionState, ShopLoadingState } from "@/components/shop/ShopStates";
import { siteConfig } from "@/config/site";
import {
  formatMoney,
  getShopLandingData,
  type ProductSummary,
  type ShopSpotlightProduct,
} from "@/lib/fourthwall/repository";
import { pageHead } from "@/lib/seo";

const MERCHANDISING = {
  impact: [
    "spike-spanker-princess",
    "spike-spanker-heart",
    "spike-spanker-sadist",
    "spike-impact-smacker-and-stim-toy",
  ],
  pup: [
    "lil-pup-collar",
    "frisky-dog-collar",
    "big-dog-choker-and-leash-convertible",
    "troublemaker-pup-collar",
  ],
  gear: [
    "copy-of-spike-spanker-classic",
    "dominion-bondage-belt",
    "leather-flogger-bag-charm",
    "everyday-leather-leash-black-natural",
  ],
  apparel: [
    "obey-kneel-submit-relax-bdsm-crop-t-shirt",
    "bite-risk-tee",
    "negotiate-play-aftercare-repeat-bdsm-t-shirt",
    "service-dog-tee",
  ],
} as const;

export const Route = createFileRoute("/shop/")({
  loader: getShopLandingData,
  staleTime: 60_000,
  pendingComponent: () => <ShopLoadingState />,
  head: () =>
    pageHead({
      title: "Shop | Department of Consent",
      description:
        "Shop handmade collars, leather goods, impact toys, accessories, apparel, and signature pieces from Department of Consent.",
      path: "/shop",
    }),
  component: ShopLandingPage,
});

function selectProducts(products: ProductSummary[], slugs: readonly string[]) {
  const bySlug = new Map(products.map((product) => [product.slug, product]));
  return slugs
    .map((slug) => bySlug.get(slug))
    .filter((product): product is ProductSummary => Boolean(product));
}

function SectionHeading({ title, collectionSlug }: { title: string; collectionSlug?: string }) {
  return (
    <div className="mb-9 flex items-end justify-between gap-5 sm:mb-10">
      <h2 className="w-full text-center font-display text-3xl text-plum sm:text-4xl lg:text-left">
        {title}
      </h2>
      {collectionSlug && (
        <Link
          to="/shop/collections/$collectionSlug"
          params={{ collectionSlug }}
          className="hidden shrink-0 rounded-full border border-plum px-4 py-2 font-display text-sm text-plum transition-colors hover:bg-plum hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 lg:inline-flex"
        >
          View all
        </Link>
      )}
    </div>
  );
}

function ProductSection({
  title,
  products,
  collectionSlug,
}: {
  title: string;
  products: ProductSummary[];
  collectionSlug?: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-8 sm:py-20">
      <SectionHeading title={title} collectionSlug={collectionSlug} />
      {products.length > 0 ? <ProductGrid products={products} /> : <EmptyCollectionState />}
      {collectionSlug && (
        <div className="mt-12 flex justify-center lg:hidden">
          <Link
            to="/shop/collections/$collectionSlug"
            params={{ collectionSlug }}
            className="rounded-full border border-plum px-5 py-2.5 font-display text-base text-plum transition-colors hover:bg-plum hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2"
          >
            View all
          </Link>
        </div>
      )}
    </section>
  );
}

function SpotlightProduct({ product }: { product: ShopSpotlightProduct }) {
  const { addItem, isPending, error, clearError } = useShopCart();
  const image = product.primaryImage;
  const descriptionId = useId();
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);

  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(24rem,30rem)] lg:items-center lg:gap-12">
      <div className="order-2 flex flex-col justify-center lg:order-1 lg:py-8">
        <h2 className="font-display text-[clamp(1.9rem,2.6vw,2.65rem)] leading-[1.04] text-plum">
          {product.name}
        </h2>
        {product.price && (
          <p className="mt-4 font-display text-xl text-plum/68">
            {product.price.varies && "From "}
            {formatMoney(product.price.minimum)}
          </p>
        )}
        {product.descriptionHtml ? (
          <>
            <div
              id={descriptionId}
              className={`relative mt-6 ${descriptionExpanded ? "" : "max-h-48 overflow-hidden"}`}
            >
              <div
                className="shop-rich-text font-display text-plum/78"
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              />
              {!descriptionExpanded && (
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent"
                  aria-hidden
                />
              )}
            </div>
            <button
              type="button"
              aria-expanded={descriptionExpanded}
              aria-controls={descriptionId}
              onClick={() => setDescriptionExpanded((expanded) => !expanded)}
              className="mt-4 w-fit font-display text-base text-plum underline underline-offset-4 hover:text-coral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2"
            >
              {descriptionExpanded ? "Show less" : "Read more"}
            </button>
          </>
        ) : (
          <p className="mt-6 max-w-xl font-display text-lg leading-relaxed text-plum/72">
            Designed for play and made to leave an impression.
          </p>
        )}
        {product.quickAddVariantId ? (
          <button
            type="button"
            disabled={isPending || product.availability === "sold-out"}
            onClick={() => {
              clearError();
              void addItem(product.quickAddVariantId!, 1).catch(() => undefined);
            }}
            className="mt-8 inline-flex min-h-14 w-full items-center justify-center rounded-full bg-plum px-7 font-display text-lg text-white transition-colors hover:bg-coral disabled:cursor-not-allowed disabled:opacity-45 sm:w-auto sm:min-w-64"
          >
            {product.availability === "sold-out"
              ? "Sold out"
              : isPending
                ? "Adding…"
                : "Add to Cart"}
          </button>
        ) : (
          <Link
            to="/shop/products/$productSlug"
            params={{ productSlug: product.slug }}
            className="mt-8 inline-flex min-h-14 w-full items-center justify-center rounded-full bg-plum px-7 font-display text-lg text-white transition-colors hover:bg-coral sm:w-auto sm:min-w-64"
          >
            Choose options
          </Link>
        )}
        {error && (
          <p className="mt-3 text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
      </div>

      <Link
        to="/shop/products/$productSlug"
        params={{ productSlug: product.slug }}
        className="order-1 block aspect-[3/4] w-full overflow-hidden rounded-lg bg-[#f2f0ee] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 lg:order-2 lg:max-w-[30rem] lg:justify-self-end"
      >
        {image ? (
          <img
            src={image.transformedUrl || image.url}
            alt={product.name}
            width={image.width}
            height={image.height}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="flex h-full items-center justify-center font-display text-plum/55">
            Image unavailable
          </span>
        )}
      </Link>
    </section>
  );
}

function ShopLandingPage() {
  const data = Route.useLoaderData();
  const impactProducts = selectProducts(data.allProducts, MERCHANDISING.impact);
  const pupProducts = selectProducts(data.allProducts, MERCHANDISING.pup);
  const gearProducts = selectProducts(data.allProducts, MERCHANDISING.gear);
  const apparelProducts = selectProducts(data.allProducts, MERCHANDISING.apparel);

  return (
    <>
      <section className="px-5 pb-0 pt-14 text-center sm:px-8 sm:pt-16">
        <p className="font-display text-sm text-plum sm:text-base">
          Full-Grain Leather <span aria-hidden>•</span> Built for play
        </p>
        <h1 className="mt-7 font-display text-[clamp(2rem,5vw,3.5rem)] leading-none text-plum">
          Wear your devotion.
        </h1>
        <p className="mx-auto mt-7 max-w-2xl font-display text-sm leading-relaxed text-plum/78 sm:text-base">
          Handmade in San Francisco from premium leather.
          <br />
          Designed for the dungeon, the dinner party, and everything after.
        </p>
      </section>

      <ProductSection
        title="Signature pieces"
        products={data.featuredProducts.slice(0, 4)}
        collectionSlug={data.featuredCollection?.slug}
      />

      {data.spotlightProduct && <SpotlightProduct product={data.spotlightProduct} />}

      <ProductSection title="Impact toys" products={impactProducts} />
      <ProductSection title="Pup play collars" products={pupProducts} />
      <ProductSection title="BDSM gear and accessories" products={gearProducts} />

      <section className="mx-auto grid max-w-7xl px-4 py-14 sm:px-8 sm:py-20 lg:grid-cols-2 lg:items-stretch lg:gap-0">
        <div className="order-2 flex flex-col justify-center py-12 lg:order-1 lg:pr-20">
          <h2 className="font-display text-[clamp(2.25rem,4vw,3.5rem)] leading-none text-plum">
            Commission a piece.
          </h2>
          <p className="mt-7 font-display text-lg text-plum/82">
            Some ideas don&apos;t belong on a shelf.
          </p>
          <p className="mt-3 max-w-xl font-display text-lg leading-relaxed text-plum/72">
            Whether it&apos;s custom sizing, unique hardware, or a one-of-one design, we&apos;ll
            build something that&apos;s entirely yours.
          </p>
          <a
            href={`mailto:${siteConfig.contactEmail}?subject=Custom%20shop%20commission`}
            className="mt-9 inline-flex min-h-14 w-full items-center justify-center rounded-full bg-plum px-7 font-display text-lg text-white transition-colors hover:bg-coral sm:w-fit sm:min-w-64"
          >
            Begin a commission
          </a>
        </div>
        <div className="order-1 aspect-[4/5] overflow-hidden rounded-lg bg-[#f2f0ee] lg:order-2">
          <img
            src={commissionImage}
            alt="Custom black leather harness with polished steel rings"
            width={1024}
            height={1280}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      <ProductSection
        title="Uniforms for the devoted."
        products={apparelProducts}
        collectionSlug="apparel"
      />

      <section aria-labelledby="shop-coaching-title" className="px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[1.5rem] bg-[#1B1B1B] md:grid-cols-[0.95fr_1.05fr]">
          <div className="aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-[20rem]">
            <img
              src={coachingImage}
              alt="A coaching client speaking with Jules in a warm living room"
              width={1444}
              height={905}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="flex flex-col justify-center px-7 py-9 sm:px-10 sm:py-12 md:px-12">
            <p className="label-condensed text-xs text-coral">Coaching</p>
            <h2
              id="shop-coaching-title"
              className="mt-3 font-display text-3xl leading-[1.04] text-white sm:text-4xl"
            >
              Gear is only one part of the conversation.
            </h2>
            <p className="mt-5 max-w-lg font-display text-base leading-relaxed text-white/72 sm:text-lg">
              Not sure what you want, how to ask for it, or what happens after it arrives? Bring the
              questions. Jules will help you turn curiosity into a plan.
            </p>
            <Link to="/coaching" className="btn-editorial mt-7 w-full sm:w-fit">
              Explore coaching
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
