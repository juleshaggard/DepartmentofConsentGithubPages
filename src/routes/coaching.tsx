import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import {
  Breadcrumbs,
  ButtonLink,
  Container,
  CtaBlock,
  Eyebrow,
  Section,
  TextLink,
} from "@/components/marketing/primitives";
import { pageHead } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const Route = createFileRoute("/coaching")({
  head: () =>
    pageHead({
      title: "Beginner Kink and Polyamory Coaching | Department of Consent",
      description:
        "Private coaching for adults exploring BDSM, kink, polyamory, and open relationships. Learn negotiation, boundaries, vetting, communication, and community etiquette.",
      path: "/coaching",
    }),
  component: CoachingPage,
});

const OPTIONS = [
  {
    title: "Beginner BDSM Coaching",
    body: "Understand your interests, learn common terminology, prepare for real-world experiences, and build confidence without pretending to be experienced.",
    cta: "Explore beginner BDSM coaching",
    to: "/services/beginner-bdsm-coaching",
  },
  {
    title: "Polyamory Coaching for Beginners",
    body: "Think through motives, structures, agreements, autonomy, jealousy, dating, time, and the practical realities of opening a relationship.",
    cta: "Explore polyamory coaching",
    to: "/services/polyamory-coaching-for-beginners",
  },
  {
    title: "Kink Coach in San Francisco",
    body: "Work with Jules Holloway virtually or through selected in-person services in San Francisco and the greater Bay Area.",
    cta: "Meet your San Francisco kink coach",
    to: "/services/kink-coach-san-francisco",
  },
  {
    title: "First Event Support",
    body: "Prepare for an event privately or ask about nonsexual event accompaniment.",
    cta: "Explore first event support",
    to: "/services/kink-event-accompaniment",
  },
] as const;

function priceLine(price: string) {
  if (siteConfig.pricingDisplayMode === "listed" && price) return price;
  return "Contact for current pricing";
}

const OFFERS = [
  {
    title: "Introductory Consultation",
    body: "A short conversation to discuss what you need, answer basic questions about coaching, and determine whether the service is appropriate.",
    price: siteConfig.prices.introductoryConsultation,
  },
  {
    title: "Private Coaching Session",
    body: "A focused 60-minute session built around a specific question, decision, or upcoming experience.",
    price: siteConfig.prices.privateSession,
  },
  {
    title: "Beginner Coaching Package",
    body: "Three private sessions for people preparing to take their first significant real-world steps into kink or polyamory.",
    price: siteConfig.prices.beginnerPackage,
  },
] as const;

function CoachingPage() {
  return (
    <MarketingLayout>
      <Container>
        <Breadcrumbs
          crumbs={[
            { label: "Home", path: "/" },
            { label: "Coaching", path: "/coaching" },
          ]}
        />
      </Container>

      <Section wide className="!pt-2">
        <div className="mx-auto max-w-3xl">
          <Eyebrow>Coaching</Eyebrow>
          <h1 className="display-condensed text-coral text-4xl sm:text-6xl">
            Private coaching for the questions you are not ready to ask publicly.
          </h1>
          <p className="prose-doc mt-6">
            Get practical, nonjudgmental support for exploring kink or consensual nonmonogamy with
            more preparation and less guesswork.
          </p>
          <div className="mt-8">
            <ButtonLink to="/book">Book an introductory session</ButtonLink>
          </div>
        </div>
      </Section>

      <Section wide ruled>
        <h2 className="display-condensed text-coral text-3xl sm:text-5xl">Coaching options</h2>
        <div className="mt-9 grid gap-5 sm:grid-cols-2">
          {OPTIONS.map((o) => (
            <div key={o.title} className="rounded-3xl bg-pinkcard px-6 py-7 flex flex-col">
              <h3 className="display-condensed text-2xl text-coral">{o.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-foreground/75 flex-1">
                {o.body}
              </p>
              <div className="mt-5">
                <TextLink to={o.to}>{o.cta}</TextLink>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section ruled>
        <h2 className="display-condensed text-coral text-3xl sm:text-5xl">
          What a coaching session looks like
        </h2>
        <div className="prose-doc mt-6">
          <p>
            Sessions are conversational but structured. We identify the immediate situation, clarify
            the decision in front of you, and turn broad uncertainty into specific questions and
            next steps.
          </p>
          <p>
            You will not be pressured to disclose unnecessary details, adopt a label, attend an
            event, open a relationship, or act on any fantasy.
          </p>
        </div>
      </Section>

      <Section wide ruled>
        <h2 className="display-condensed text-coral text-3xl sm:text-5xl">Ways to begin</h2>
        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {OFFERS.map((o) => (
            <div key={o.title} className="border-t-2 border-coral pt-5">
              <h3 className="display-condensed text-2xl text-coral">{o.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-foreground/75">{o.body}</p>
              <p className="mt-4 text-sm font-semibold text-plum">{priceLine(o.price)}</p>
            </div>
          ))}
        </div>
      </Section>

      <CtaBlock
        headline="Bring the uncertainty. We will turn it into a plan."
        primaryLabel="Book an introductory session"
        primaryTo="/book"
      />
    </MarketingLayout>
  );
}
