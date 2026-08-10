import { createFileRoute } from "@tanstack/react-router";
import { FieldGuideCoverLink } from "@/components/guides/FieldGuideCoverLink";
import { allFieldGuides } from "@/lib/field-guides";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/guides/")({
  head: () =>
    pageHead({
      title: "Kink Guides and Field Manuals | Department of Consent",
      description:
        "Visual field manuals exploring kink, bodies, power, ritual, consent, objects, and desire from Department of Consent.",
      path: "/guides",
    }),
  component: GuideArchive,
});

function GuideArchive() {
  return (
    <>
      <section className="px-5 pb-8 pt-14 text-center sm:px-8 sm:pb-10 sm:pt-16">
        <p className="font-display text-sm text-plum sm:text-base">
          Department of Consent <span aria-hidden>•</span> {allFieldGuides.length} guides
        </p>
        <h1 className="mt-7 font-display text-[clamp(2rem,5vw,3.5rem)] leading-none text-plum">
          Kink Field Guides
        </h1>
        <div className="mx-auto mt-7 max-w-2xl space-y-3 font-display text-sm leading-relaxed text-plum/78 sm:text-base">
          <p>
            Short, visual guides for navigating the practices, language, objects, and culture of
            kink.
          </p>
          <p>
            Made for the curious, the experienced, and anyone still figuring out where they belong.
          </p>
        </div>
      </section>

      <section aria-label="Guide archive" className="px-4 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-7 lg:grid-cols-4 lg:gap-x-8">
          {allFieldGuides.map((guide) => (
            <FieldGuideCoverLink key={guide.slug} guide={guide} loading="eager" />
          ))}
        </div>
      </section>
    </>
  );
}
