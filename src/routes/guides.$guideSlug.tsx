import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { FieldGuideCoverLink } from "@/components/guides/FieldGuideCoverLink";
import { JsonLd } from "@/components/marketing/JsonLd";
import { NewsletterSignup } from "@/components/marketing/NewsletterSignup";
import { ProductGrid } from "@/components/shop/ProductCard";
import { getShopLandingData } from "@/lib/fourthwall/repository";
import {
  getFieldGuideByLegacySlug,
  getFieldGuideBySlug,
  getRelatedFieldGuides,
} from "@/lib/field-guides";
import { breadcrumbJsonLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/guides/$guideSlug")({
  beforeLoad: ({ params }) => {
    const legacyGuide = getFieldGuideByLegacySlug(params.guideSlug);
    if (!legacyGuide) return;

    throw redirect({
      to: "/guides/$guideSlug",
      params: { guideSlug: legacyGuide.slug },
      replace: true,
      statusCode: 301,
    });
  },
  loader: async ({ params }) => {
    const guide = getFieldGuideBySlug(params.guideSlug);
    if (!guide) throw notFound();

    const shopProducts = await getShopLandingData()
      .then((shop) => {
        const products = [...shop.featuredProducts];
        const productIds = new Set(products.map((product) => product.id));

        for (const product of shop.allProducts) {
          if (products.length >= 4) break;
          if (productIds.has(product.id)) continue;
          products.push(product);
          productIds.add(product.id);
        }

        return products.slice(0, 4);
      })
      .catch(() => []);

    return { ...guide, shopProducts };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return pageHead({
        title: "Guide not found | Department of Consent",
        description: "This Department of Consent guide could not be found.",
        path: "/guides",
        noindex: true,
      });
    }

    return pageHead({
      title: `${loaderData.title} | Department of Consent`,
      description: `Read all ${loaderData.pages.length} pages of ${loaderData.title} from Department of Consent.`,
      path: `/guides/${loaderData.slug}`,
      ogType: "article",
      image: loaderData.cover.src,
    });
  },
  notFoundComponent: MissingGuide,
  component: FieldGuidePage,
});

function FieldGuidePage() {
  const guide = Route.useLoaderData();
  const relatedGuides = getRelatedFieldGuides(guide.slug);

  return (
    <article>
      <section
        aria-label={`${guide.title} pages`}
        className="bg-[#f3f0ed] px-5 pb-6 pt-8 sm:px-10 sm:pb-10 sm:pt-10 lg:px-16"
      >
        <header className="mx-auto mb-7 max-w-5xl text-center sm:mb-9">
          <h1 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-tight tracking-[-0.015em] text-plum">
            {guide.title}
          </h1>
        </header>

        <div className="mx-auto grid max-w-[44rem] grid-cols-1 justify-items-center gap-4 md:grid-cols-2 md:gap-6">
          {guide.pages.map((page, index) => (
            <figure key={page.pageNumber} className="m-0 w-full max-w-[18rem] md:max-w-none">
              <img
                src={page.src}
                alt={`${guide.title}, page ${index + 1} of ${guide.pages.length}`}
                width={page.width}
                height={page.height}
                loading={index < 2 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                decoding="async"
                className="block h-auto w-full bg-white"
              />
            </figure>
          ))}
        </div>
      </section>

      <section
        aria-label="Guide newsletter"
        className="border-t border-plum/10 px-5 py-14 sm:px-8 sm:py-20"
      >
        <div className="mx-auto max-w-3xl rounded-[2rem] border-2 border-coral bg-white px-6 py-9 sm:px-10 sm:py-12">
          <NewsletterSignup
            variant="modal"
            heading="MORE WHERE THAT CAME FROM."
            description="New guides, practical kink notes, and thoughtful troublemaking, sent occasionally."
            descriptionClassName="italic"
            buttonLabel="SEND ME THE NEXT ONE"
            className="mx-auto max-w-[32rem]"
          />
        </div>
      </section>

      <section
        aria-labelledby="more-guides-title"
        className="border-t border-plum/10 px-4 py-16 sm:px-8 sm:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <h2
              id="more-guides-title"
              className="font-display text-3xl leading-tight text-plum sm:text-5xl"
            >
              Keep reading.
            </h2>
            <p className="label-condensed text-xs text-plum/55">More from the archive</p>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-7 lg:grid-cols-4 lg:gap-x-8">
            {relatedGuides.map((related) => (
              <FieldGuideCoverLink key={related.slug} guide={related} />
            ))}

            <div>
              <Link
                to="/guides"
                className="group flex aspect-[1600/2472] flex-col justify-between bg-plum p-5 text-white transition-colors hover:bg-coral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-4 sm:p-7"
              >
                <span className="label-condensed text-xs text-white/65">Complete archive</span>
                <span className="font-display text-2xl leading-tight sm:text-3xl">
                  View all guides <span aria-hidden>→</span>
                </span>
              </Link>
              <p className="mt-3 font-display text-lg leading-tight text-plum">All guides</p>
              <p className="label-condensed mt-1 text-[0.7rem] text-plum/55">Start anywhere</p>
            </div>
          </div>
        </div>
      </section>

      {guide.shopProducts.length > 0 && (
        <section
          aria-labelledby="guide-shop-title"
          className="bg-[#f3f0ed] px-5 py-16 sm:px-8 sm:py-24"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 grid items-end gap-6 md:grid-cols-[minmax(0,1fr)_minmax(18rem,0.7fr)] md:gap-12">
              <div>
                <p className="label-condensed text-xs text-coral">From the shop</p>
                <h2
                  id="guide-shop-title"
                  className="mt-3 max-w-3xl font-display text-4xl leading-[1.02] text-plum sm:text-6xl"
                >
                  Take it off the page.
                </h2>
              </div>
              <div>
                <p className="max-w-xl font-display text-base leading-relaxed text-plum/72 sm:text-lg">
                  The guides give you ideas. The shop gives you something to do with them. Explore
                  handmade pieces built for actual play.
                </p>
                <Link to="/shop" className="btn-editorial mt-6">
                  Shop the collection
                </Link>
              </div>
            </div>

            <ProductGrid products={guide.shopProducts} />
          </div>
        </section>
      )}

      <JsonLd
        data={breadcrumbJsonLd([
          { label: "Home", path: "/" },
          { label: "Guides", path: "/guides" },
          { label: guide.title, path: `/guides/${guide.slug}` },
        ])}
      />
    </article>
  );
}

function MissingGuide() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <p className="label-condensed text-xs text-plum/55">Guides</p>
      <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight text-plum sm:text-6xl">
        That guide is not in the stack.
      </h1>
      <Link
        to="/guides"
        className="mt-8 inline-flex min-h-12 items-center rounded-full bg-plum px-6 font-display text-white hover:bg-coral"
      >
        View all guides
      </Link>
    </section>
  );
}
