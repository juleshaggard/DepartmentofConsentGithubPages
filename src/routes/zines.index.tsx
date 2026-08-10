import { createFileRoute } from "@tanstack/react-router";
import { ZineCoverLink } from "@/components/zines/ZineCoverLink";
import { allZines } from "@/lib/zines";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/zines/")({
  head: () =>
    pageHead({
      title: "Kink Field Guides | Department of Consent",
      description: "Read the Department of Consent Kink Field Guides in issue and page order.",
      path: "/zines",
    }),
  component: ZineArchive,
});

function ZineArchive() {
  return (
    <>
      <section className="px-5 pb-8 pt-14 text-center sm:px-8 sm:pb-10 sm:pt-16">
        <p className="font-display text-sm text-plum sm:text-base">
          Department of Consent <span aria-hidden>•</span> {allZines.length} issues
        </p>
        <h1 className="mt-7 font-display text-[clamp(2rem,5vw,3.5rem)] leading-none text-plum">
          Kink Field Guides
        </h1>
        <p className="mx-auto mt-7 max-w-2xl font-display text-sm leading-relaxed text-plum/78 sm:text-base">
          Six-page provocations,
          <br />
          presented in their original order.
        </p>
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
