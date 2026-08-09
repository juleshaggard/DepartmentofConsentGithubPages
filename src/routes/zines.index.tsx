import { createFileRoute } from "@tanstack/react-router";
import { ZineCoverLink } from "@/components/zines/ZineCoverLink";
import { allZines } from "@/lib/zines";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/zines/")({
  head: () =>
    pageHead({
      title: "Zines | Department of Consent",
      description: "Read the Department of Consent zine archive in issue and page order.",
      path: "/zines",
    }),
  component: ZineArchive,
});

function ZineArchive() {
  return (
    <>
      <section className="border-b border-plum/10 px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)] lg:items-end">
          <div>
            <p className="label-condensed mb-4 text-xs text-plum/60">Department of Consent</p>
            <h1 className="display-condensed text-[clamp(4.75rem,13vw,9rem)] leading-[0.78] tracking-[-0.035em] text-coral">
              Zines
            </h1>
          </div>
          <div className="max-w-md lg:pb-2">
            <p className="font-display text-xl leading-relaxed text-plum sm:text-2xl">
              Eight-page provocations, presented in their original order.
            </p>
            <p className="label-condensed mt-5 text-xs text-plum/55">
              {allZines.length} issues in the archive
            </p>
          </div>
        </div>
      </section>

      <section aria-label="Zine archive" className="px-4 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-7 lg:grid-cols-4 lg:gap-x-8">
          {allZines.map((zine) => (
            <ZineCoverLink key={zine.slug} zine={zine} loading="eager" />
          ))}
        </div>
      </section>
    </>
  );
}
