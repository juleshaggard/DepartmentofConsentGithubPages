import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import {
  Breadcrumbs,
  ButtonLink,
  Container,
  Eyebrow,
  Section,
} from "@/components/marketing/primitives";
import { pageHead } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const Route = createFileRoute("/workshops")({
  head: () =>
    pageHead({
      title: "Beginner Kink, Consent and Polyamory Workshops",
      description:
        "Practical workshops on consent, kink negotiation, vetting, aftercare, community etiquette, polyamory, and open relationships.",
      path: "/workshops",
    }),
  component: WorkshopsPage,
});

const TOPICS = [
  {
    title: "Consent Is Only the Beginning",
    body: "How permission, communication, context, pressure, self-awareness, and the ability to change your mind work together.",
  },
  {
    title: "Negotiating Your First Scene",
    body: "A practical framework for discussing interests, boundaries, health considerations, intensity, stopping, and aftercare.",
  },
  {
    title: "Kink Etiquette for Beginners",
    body: "The unwritten rules of events, observation, introductions, privacy, invitations, and participation.",
  },
  {
    title: "Vetting Without Playing Detective",
    body: "How to gather useful information, identify concerning behavior, ask for references when appropriate, and accept that no process eliminates all risk.",
  },
  {
    title: "Opening a Relationship Thoughtfully",
    body: "A practical discussion of motives, expectations, autonomy, agreements, jealousy, dating, and the possibility that consensual nonmonogamy may not be the right answer.",
  },
] as const;

function WorkshopsPage() {
  const waitlist = siteConfig.workshopWaitlistUrl;
  return (
    <MarketingLayout>
      <Container className="pt-8 sm:pt-12">
        <Breadcrumbs
          crumbs={[
            { label: "Home", path: "/" },
            { label: "Workshops", path: "/workshops" },
          ]}
        />
      </Container>

      <Section wide className="!pt-2">
        <div className="max-w-3xl">
          <Eyebrow>Workshops</Eyebrow>
          <h1 className="font-display text-4xl sm:text-6xl text-plum leading-[1.02]">
            The conversations people should have before things get complicated.
          </h1>
          <p className="prose-doc mt-6">
            Beginner-friendly workshops for partners, small groups, organizations, and community
            spaces.
          </p>
        </div>
      </Section>

      <Section wide ruled>
        <h2 className="font-display text-3xl sm:text-4xl text-plum leading-[1.08]">
          Workshop topics
        </h2>
        <div className="mt-9 divide-y divide-plum/10 border-y border-plum/10">
          {TOPICS.map((t) => (
            <div key={t.title} className="py-6 grid gap-2 md:grid-cols-[1fr_2fr]">
              <h3 className="font-display text-2xl text-plum leading-tight">{t.title}</h3>
              <p className="text-[0.95rem] leading-relaxed text-foreground/75 max-w-xl">{t.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Workshops are educational. They are not therapy and do not include demonstrations of
          sexual activity. All attendees must be 18 or older.
        </p>
      </Section>

      <Section wide>
        <div className="rounded-2xl bg-plum text-cream px-6 py-12 sm:px-14 sm:py-16 text-center">
          <h2 className="font-display text-3xl sm:text-4xl leading-[1.08] max-w-2xl mx-auto">
            Bring Department of Consent to your group.
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink to="/book" className="!bg-cream !text-plum !border-cream hover:!bg-white">
              Inquire about a private workshop
            </ButtonLink>
            {waitlist ? (
              <a
                href={waitlist}
                className="btn-editorial btn-editorial-outline !text-cream !border-cream/50 hover:!bg-cream hover:!text-plum"
              >
                Join the public workshop list
              </a>
            ) : (
              <ButtonLink
                to="/book"
                variant="outline"
                className="!text-cream !border-cream/50 hover:!bg-cream hover:!text-plum"
              >
                Join the public workshop list
              </ButtonLink>
            )}
          </div>
        </div>
      </Section>
    </MarketingLayout>
  );
}
