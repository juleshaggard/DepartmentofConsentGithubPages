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
      <Container className="pt-8 sm:pt-12">
        <Breadcrumbs
          crumbs={[
            { label: "Home", path: "/" },
            { label: "Guides", path: "/resources" },
          ]}
        />
      </Container>

      <Section wide className="!pt-2">
        <div className="max-w-3xl">
          <Eyebrow>Guides</Eyebrow>
          <h1 className="font-display text-4xl sm:text-6xl text-plum leading-[1.02]">
            The instruction manual nobody handed you.
          </h1>
          <p className="prose-doc mt-6">
            Practical introductions to kink, polyamory, consent, community etiquette, boundaries,
            communication, and the decisions that happen before anyone touches anyone.
          </p>
        </div>
      </Section>

      <Section wide ruled>
        <h2 className="font-display text-3xl sm:text-4xl text-plum leading-[1.08]">
          Featured guides
        </h2>
        <div className="mt-9 grid gap-5 sm:grid-cols-2">
          {allGuides.map((g) => (
            <Link
              key={g.slug}
              to={g.path}
              className="group rounded-2xl border border-plum/15 bg-card px-6 py-7 hover:border-coral/50 transition-colors"
            >
              <p className="section-label">Beginner guide</p>
              <h3 className="font-display text-2xl text-plum leading-tight mt-1 group-hover:text-coral transition-colors">
                {g.crumbLabel}
              </h3>
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
