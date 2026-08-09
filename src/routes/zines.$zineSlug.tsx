import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { JsonLd } from "@/components/marketing/JsonLd";
import { ZineCoverLink } from "@/components/zines/ZineCoverLink";
import { breadcrumbJsonLd, pageHead } from "@/lib/seo";
import { getRelatedZines, getZineBySlug } from "@/lib/zines";

export const Route = createFileRoute("/zines/$zineSlug")({
  loader: ({ params }) => {
    const zine = getZineBySlug(params.zineSlug);
    if (!zine) throw notFound();
    return zine;
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return pageHead({
        title: "Zine not found | Department of Consent",
        description: "This Department of Consent zine could not be found.",
        path: "/zines",
        noindex: true,
      });
    }

    return pageHead({
      title: `${loaderData.title} | Department of Consent`,
      description: `Read all ${loaderData.pages.length} pages of ${loaderData.title} from Department of Consent.`,
      path: `/zines/${loaderData.slug}`,
      ogType: "article",
    });
  },
  notFoundComponent: MissingZine,
  component: ZineIssue,
});

function ZineIssue() {
  const zine = Route.useLoaderData();
  const relatedZines = getRelatedZines(zine.slug);

  return (
    <article>
      <header className="border-b border-plum/10 px-5 py-10 sm:px-8 sm:py-14">
        <div className="mx-auto max-w-7xl">
          <Link
            to="/zines"
            className="label-condensed text-xs text-plum/60 underline decoration-plum/25 underline-offset-4 hover:text-coral"
          >
            Back to all zines
          </Link>
          <div className="mt-8 flex flex-wrap items-end justify-between gap-5">
            <h1 className="display-condensed text-[clamp(3.5rem,9vw,7rem)] leading-[0.82] tracking-[-0.03em] text-coral">
              {zine.title}
            </h1>
            <p className="label-condensed pb-1 text-xs text-plum/55">
              {zine.pages.length} pages, read in order
            </p>
          </div>
        </div>
      </header>

      <section
        aria-label={`${zine.title} pages`}
        className="bg-[#f3f0ed] px-5 py-6 sm:px-10 sm:py-10 lg:px-16"
      >
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          {zine.pages.map((page, index) => (
            <figure key={page.pageNumber} className="m-0">
              <img
                src={page.src}
                alt={`${zine.title}, page ${index + 1} of ${zine.pages.length}`}
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
        aria-labelledby="more-zines-title"
        className="border-t border-plum/10 px-4 py-16 sm:px-8 sm:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <h2
              id="more-zines-title"
              className="font-display text-3xl leading-tight text-plum sm:text-5xl"
            >
              Keep reading.
            </h2>
            <p className="label-condensed text-xs text-plum/55">More from the archive</p>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-7 lg:grid-cols-4 lg:gap-x-8">
            {relatedZines.map((related) => (
              <ZineCoverLink key={related.slug} zine={related} />
            ))}

            <div>
              <Link
                to="/zines"
                className="group flex aspect-[1600/2472] flex-col justify-between bg-plum p-5 text-white transition-colors hover:bg-coral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-4 sm:p-7"
              >
                <span className="label-condensed text-xs text-white/65">Complete archive</span>
                <span className="font-display text-2xl leading-tight sm:text-3xl">
                  View all zines <span aria-hidden>→</span>
                </span>
              </Link>
              <p className="mt-3 font-display text-lg leading-tight text-plum">All issues</p>
              <p className="label-condensed mt-1 text-[0.7rem] text-plum/55">Start anywhere</p>
            </div>
          </div>
        </div>
      </section>

      <JsonLd
        data={breadcrumbJsonLd([
          { label: "Home", path: "/" },
          { label: "Zines", path: "/zines" },
          { label: zine.title, path: `/zines/${zine.slug}` },
        ])}
      />
    </article>
  );
}

function MissingZine() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <p className="label-condensed text-xs text-plum/55">Zines</p>
      <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight text-plum sm:text-6xl">
        That issue is not in the stack.
      </h1>
      <Link
        to="/zines"
        className="mt-8 inline-flex min-h-12 items-center rounded-full bg-plum px-6 font-display text-white hover:bg-coral"
      >
        View all zines
      </Link>
    </section>
  );
}
