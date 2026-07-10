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
import { JsonLd } from "@/components/marketing/JsonLd";
import { pageHead, serviceJsonLd } from "@/lib/seo";

const PATH = "/services/kink-coach-san-francisco";

export const Route = createFileRoute("/services/kink-coach-san-francisco")({
  head: () =>
    pageHead({
      title: "Kink Coach in San Francisco | Jules Holloway",
      description:
        "Beginner-focused kink coaching with Jules Holloway in San Francisco. Virtual sessions, event preparation, and selected nonsexual Bay Area event support.",
      path: PATH,
    }),
  component: SfCoachPage,
});

const WORK_ON = [
  "Choosing a first event",
  "Understanding common terms and event formats",
  "Preparing a profile or introduction",
  "Clarifying interests and boundaries",
  "Vetting a potential partner",
  "Negotiating a first scene",
  "Recognizing pressure and red flags",
  "Planning transportation and an exit",
  "Debriefing an experience afterward",
  "Talking with an existing partner about kink",
  "Deciding whether you are ready to take the next step",
];

const WAYS = [
  {
    title: "Virtual Coaching",
    body: "Private sessions from anywhere, with flexible preparation for events, conversations, relationships, and decisions.",
  },
  {
    title: "In-Person Coaching",
    body: "Selected in-person sessions may be available in San Francisco and parts of the greater Bay Area.",
  },
  {
    title: "Event Preparation",
    body: "A focused session covering the event type, rules, etiquette, boundaries, clothing, participation expectations, and exit plan.",
  },
  {
    title: "Nonsexual Event Accompaniment",
    body: "For selected Bay Area events, Jules may be available to attend as an educational and social guide.",
  },
] as const;

function SfCoachPage() {
  return (
    <MarketingLayout>
      <Container className="pt-8 sm:pt-12">
        <Breadcrumbs
          crumbs={[
            { label: "Home", path: "/" },
            { label: "Coaching", path: "/coaching" },
            { label: "Kink Coach in San Francisco", path: PATH },
          ]}
        />
      </Container>

      <Section wide className="!pt-2">
        <div className="max-w-3xl">
          <Eyebrow>San Francisco kink coaching</Eyebrow>
          <h1 className="display-condensed text-coral text-4xl sm:text-6xl">
            A kink coach for people who are ready to stop guessing.
          </h1>
          <div className="prose-doc mt-6">
            <p>
              I am Jules Holloway, a San Francisco-based kink and polyamory coach for adults taking
              their first real steps into the scene.
            </p>
            <p>
              Whether you are preparing for an event, talking with a potential partner, negotiating
              a first scene, or trying to understand what you want, coaching gives you a private
              place to get practical answers before the stakes feel high.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink to="/book">Book an introductory session</ButtonLink>
            <ButtonLink to="/services/kink-event-accompaniment" variant="outline">
              Ask about in-person support
            </ButtonLink>
          </div>
        </div>
      </Section>

      <Section ruled>
        <h2 className="display-condensed text-coral text-3xl sm:text-5xl max-w-[24ch]">
          The Bay Area has options. That does not make it easy to begin.
        </h2>
        <div className="prose-doc mt-6">
          <p>
            San Francisco has social gatherings, educational workshops, play spaces, private events,
            online groups, and overlapping communities. A long list of events does not tell you
            which space fits your experience level, comfort, identity, interests, or goals.
          </p>
          <p>
            Local coaching can help you understand the differences, identify beginner-friendly
            options, prepare for venue rules, and make a plan that does not depend on pretending you
            already know everyone.
          </p>
        </div>
      </Section>

      <Section ruled>
        <h2 className="display-condensed text-coral text-3xl sm:text-5xl">What we can work on</h2>
        <ul className="prose-doc mt-6 !max-w-2xl columns-1 sm:columns-2 gap-10 [&>li]:break-inside-avoid list-disc pl-5">
          {WORK_ON.map((w) => (
            <li key={w}>{w}</li>
          ))}
        </ul>
      </Section>

      <Section wide ruled>
        <h2 className="display-condensed text-coral text-3xl sm:text-5xl">Ways to work together</h2>
        <div className="mt-9 grid gap-8 sm:grid-cols-2">
          {WAYS.map((w) => (
            <div key={w.title} className="border-t-2 border-coral pt-5">
              <h3 className="font-display text-2xl text-plum leading-tight">{w.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-foreground/75">{w.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <TextLink to="/guides/preparing-for-your-first-kink-event">
            Read the free first-event guide
          </TextLink>
        </div>
      </Section>

      <Section ruled>
        <h2 className="display-condensed text-coral text-3xl sm:text-5xl">
          Clear support. Clear boundaries.
        </h2>
        <div className="prose-doc mt-6">
          <p>Department of Consent provides coaching, education, and nonsexual event support.</p>
          <p>
            Services do not include kink play, topping, bottoming, sexual activity, dating, romantic
            companionship, physical intimacy, therapy, medical care, or legal advice.
          </p>
          <p>
            No coach can guarantee that a person, venue, event, or experience is safe. Coaching can
            help you ask better questions, recognize concerns, and make more deliberate decisions.
          </p>
        </div>
      </Section>

      <Section ruled>
        <h2 className="font-display text-2xl text-plum leading-tight">Service area</h2>
        <div className="prose-doc mt-4">
          <p>
            Virtual coaching is available more broadly. In-person availability is limited to San
            Francisco and selected parts of the greater Bay Area — exact in-person coverage is
            confirmed when you inquire.
          </p>
        </div>
      </Section>

      <CtaBlock
        headline="You do not need to know the scene before asking for help entering it."
        primaryLabel="Book an introductory session"
        primaryTo="/book"
      />

      <JsonLd
        data={serviceJsonLd({
          name: "Kink coaching in San Francisco",
          description:
            "Beginner-focused kink and polyamory coaching with Jules Holloway: virtual sessions, event preparation, and selected nonsexual Bay Area event support.",
          path: PATH,
          areaServed: "San Francisco Bay Area",
        })}
      />
    </MarketingLayout>
  );
}
