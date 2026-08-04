import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { Breadcrumbs, Container, Eyebrow, Section } from "@/components/marketing/primitives";
import { NewsletterSignup } from "@/components/marketing/NewsletterSignup";
import { pageHead } from "@/lib/seo";
import { allGuides } from "@/content/guides";

export const Route = createFileRoute("/resources")({
  head: () =>
    pageHead({
      title: "Beginner Kink and Polyamory Guides | Department of Consent",
      description:
        "Clear, practical guides to entering the kink scene, first events, consent, negotiation, vetting, aftercare, polyamory, and open relationships.",
      path: "/resources",
    }),
  component: ResourcesPage,
});

const CATEGORIES = [
  "Getting Started",
  "Events and Community",
  "Consent and Negotiation",
  "Vetting and Boundaries",
  "Aftercare",
  "Polyamory and Open Relationships",
  "Communication",
  "Terminology",
];

function ResourcesPage() {
  return (
    <MarketingLayout>
      <Container>
        <Breadcrumbs
          crumbs={[
            { label: "Home", path: "/" },
            { label: "Guides", path: "/resources" },
          ]}
        />
      </Container>

      <Section wide className="!pt-10 sm:!pt-14">
        <div className="mx-auto max-w-3xl">
          <Eyebrow>Guides</Eyebrow>
          <h1 className="display-condensed text-coral text-4xl sm:text-6xl">
            The instruction manual nobody handed you.
          </h1>
          <p className="prose-doc mt-6">
            Practical introductions to kink, polyamory, consent, community etiquette, boundaries,
            communication, and the decisions that happen before anyone touches anyone.
          </p>
        </div>
      </Section>

      <Section wide ruled>
        <h2 className="display-condensed text-coral text-3xl sm:text-5xl">Featured guides</h2>
        <div className="mt-9 grid gap-5 sm:grid-cols-2">
          <Link
            to="/negotiate"
            className="group relative rounded-3xl bg-[#1B1B1B] px-6 py-7 text-white transition-transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            <p className="section-label !text-[#5BCEFA]">Free form</p>
            <h3 className="display-condensed text-2xl text-coral mt-1">
              Play Party Negotiation Form
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/72">
              A checklist for talking through boundaries, risks, signals, logistics, and aftercare
              before a scene.
            </p>
          </Link>
          {allGuides.map((g) => (
            <Link
              key={g.slug}
              to={g.path}
              className="group relative rounded-3xl bg-pinkcard px-6 py-7 transition-transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <p className="section-label">Beginner guide</p>
              <h3 className="display-condensed text-2xl text-coral mt-1">{g.crumbLabel}</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70">{g.description}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section ruled>
        <h2 className="font-display text-2xl text-plum leading-tight">Topics we cover</h2>
        <p className="mt-3 text-sm text-muted-foreground max-w-xl">
          New guides are published over time. Current and planned topics include:
        </p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <li
              key={c}
              className="rounded-full border border-plum/20 bg-card px-4 py-1.5 text-sm text-plum/85"
            >
              {c}
            </li>
          ))}
        </ul>
      </Section>

      <Section wide ruled>
        <NewsletterSignup />
      </Section>
    </MarketingLayout>
  );
}
