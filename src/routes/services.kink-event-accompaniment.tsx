import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { EventSupportPricingSection } from "@/components/marketing/CoachingPricingContent";
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

const PATH = "/services/kink-event-accompaniment";

export const Route = createFileRoute("/services/kink-event-accompaniment")({
  head: () =>
    pageHead({
      title: "Kink Event Accompaniment in San Francisco",
      description:
        "Looking for someone to accompany you to a kink event? Ask about nonsexual preparation and event support with Jules Holloway in San Francisco.",
      path: PATH,
    }),
  component: AccompanimentPage,
});

const WHY = [
  "You have never attended a kink event",
  "You do not know which event is appropriate",
  "You are nervous about arriving alone",
  "You want someone to explain the venue and rules",
  "You want help distinguishing social expectations from actual requirements",
  "You want a planned check-in during the event",
  "You want to debrief with someone who understands the context",
];

const BEFORE = [
  "Reviewing the event description",
  "Confirming beginner suitability",
  "Discussing clothing and venue rules",
  "Clarifying your goals",
  "Reviewing boundaries",
  "Planning transportation and departure",
  "Discussing how you will handle invitations or unwanted attention",
];

const DURING = [
  "Arriving together",
  "Orienting you to the space",
  "Explaining what is happening",
  "Helping you identify staff or event contacts",
  "Making introductions when natural and appropriate",
  "Checking in at agreed times",
  "Supporting your decision to leave",
];

const AFTER = [
  "Debriefing what happened",
  "Discussing questions or discomfort",
  "Identifying useful next steps",
  "Deciding whether a different event would fit better",
];

const NOT_INCLUDED = [
  "Sexual activity",
  "Kink play",
  "Topping",
  "Bottoming",
  "Dating",
  "Romantic companionship",
  "Physical intimacy",
  "Guaranteed introductions",
  "Guaranteed admission",
  "Acting as security",
  "Medical supervision",
  "Responsibility for the organizer, venue, or other attendees",
];

const AVAILABILITY = [
  "The event",
  "Venue policies",
  "Location",
  "Scheduling",
  "Travel time",
  "Whether the event permits or is appropriate for this type of support",
  "Whether Jules believes accompaniment is a suitable service for the situation",
];

function AccompanimentPage() {
  return (
    <MarketingLayout>
      <Container>
        <Breadcrumbs
          crumbs={[
            { label: "Home", path: "/" },
            { label: "Coaching", path: "/coaching" },
            { label: "Kink Event Accompaniment", path: PATH },
          ]}
        />
      </Container>

      <Section wide className="!pt-10 sm:!pt-14">
        <div className="mx-auto max-w-3xl">
          <Eyebrow>Nonsexual event support in San Francisco</Eyebrow>
          <h1 className="display-condensed text-coral text-4xl sm:text-6xl">
            Want someone knowledgeable to accompany you to a kink event?
          </h1>
          <div className="prose-doc mt-6">
            <p>Walking into a new kink space alone can make every unfamiliar rule feel louder.</p>
            <p>
              For selected events in San Francisco and the greater Bay Area, Jules Holloway may be
              available to attend as a knowledgeable, nonsexual guide.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink to="/coaching">Ask about event accompaniment</ButtonLink>
            <ButtonLink to="/coaching" variant="outline">
              Book an event preparation session
            </ButtonLink>
          </div>
        </div>
      </Section>

      <EventSupportPricingSection />

      <Section ruled>
        <h2 className="display-condensed text-coral text-3xl sm:text-5xl">
          Why people ask for accompaniment
        </h2>
        <div className="prose-doc mt-6">
          <p>You may want a guide if:</p>
          <ul>
            {WHY.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
          <p>Wanting a guide means you are taking the environment seriously.</p>
        </div>
      </Section>

      <Section wide ruled>
        <h2 className="display-condensed text-coral text-3xl sm:text-5xl">
          What event accompaniment may include
        </h2>
        <div className="mt-9 grid gap-8 md:grid-cols-3">
          {[
            { label: "Before the event", items: BEFORE },
            { label: "At the event", items: DURING },
            { label: "After the event", items: AFTER },
          ].map((col) => (
            <div key={col.label} className="border-t-2 border-coral pt-5">
              <h3 className="font-display text-2xl text-plum leading-tight">{col.label}</h3>
              <ul className="mt-4 space-y-2 text-[0.95rem] leading-relaxed text-foreground/80 list-disc pl-5">
                {col.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section ruled>
        <h2 className="display-condensed text-coral text-3xl sm:text-5xl">
          What it does not include
        </h2>
        <div className="prose-doc mt-6">
          <ul>
            {NOT_INCLUDED.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
          <p>
            Jules does not control event admission, venue rules, attendee behavior, or event safety.
          </p>
        </div>
      </Section>

      <Section ruled>
        <h2 className="display-condensed text-coral text-3xl sm:text-5xl">Availability</h2>
        <div className="prose-doc mt-6">
          <p>Availability depends on:</p>
          <ul>
            {AVAILABILITY.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
          <p>In some cases, a private preparation session may be more useful than accompaniment.</p>
        </div>
        <div className="mt-7">
          <TextLink to="/guides/preparing-for-your-first-kink-event">
            Read the free first-event guide
          </TextLink>
        </div>
      </Section>

      <CtaBlock
        headline="You can ask for a guide without giving up your own judgment."
        primaryLabel="Ask about event accompaniment"
        primaryTo="/coaching"
        tone="dark"
      />

      <JsonLd
        data={serviceJsonLd({
          name: "Kink event accompaniment",
          description:
            "Nonsexual educational and social support for attending selected kink events in San Francisco and the greater Bay Area, including preparation, orientation, check-ins, and debriefing.",
          path: PATH,
          areaServed: "San Francisco Bay Area",
        })}
      />
    </MarketingLayout>
  );
}
