import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import {
  Breadcrumbs,
  ButtonLink,
  Container,
  CtaBlock,
  Eyebrow,
  Section,
} from "@/components/marketing/primitives";
import { JsonLd } from "@/components/marketing/JsonLd";
import { pageHead, serviceJsonLd } from "@/lib/seo";

const PATH = "/services/polyamory-coaching-for-beginners";

export const Route = createFileRoute("/services/polyamory-coaching-for-beginners")({
  head: () =>
    pageHead({
      title: "Polyamory Coaching for Beginners | Department of Consent",
      description:
        "Practical polyamory coaching for beginners, individuals, and couples considering consensual nonmonogamy, open relationships, agreements, jealousy, and dating.",
      path: PATH,
    }),
  component: PolyCoachingPage,
});

const HELP_WITH = [
  "Clarifying why you want consensual nonmonogamy",
  "Understanding common relationship structures",
  "Discussing autonomy and expectations",
  "Creating agreements without trying to control every outcome",
  "Talking about disclosure and privacy",
  "Handling jealousy and insecurity",
  "Dating independently",
  "Managing time and attention",
  "Discussing safer-sex practices",
  "Responding to broken agreements",
  "Recognizing incompatibility",
  "Deciding not to open a relationship",
];

function PolyCoachingPage() {
  return (
    <MarketingLayout>
      <Container className="pt-8 sm:pt-12">
        <Breadcrumbs
          crumbs={[
            { label: "Home", path: "/" },
            { label: "Coaching", path: "/coaching" },
            { label: "Polyamory Coaching for Beginners", path: PATH },
          ]}
        />
      </Container>

      <Section wide className="!pt-2">
        <div className="max-w-3xl">
          <Eyebrow>Beginner polyamory and open-relationship coaching</Eyebrow>
          <h1 className="display-condensed text-coral text-4xl sm:text-6xl">
            Opening a relationship is not a settings change.
          </h1>
          <div className="prose-doc mt-6">
            <p>
              Polyamory coaching helps individuals and partners think through the real decisions
              behind consensual nonmonogamy before rules, dating apps, and new relationships make
              everything more complicated.
            </p>
          </div>
          <div className="mt-8">
            <ButtonLink to="/book">Book an introductory session</ButtonLink>
          </div>
        </div>
      </Section>

      <Section ruled>
        <h2 className="display-condensed text-coral text-3xl sm:text-5xl">
          Start with the actual question
        </h2>
        <div className="prose-doc mt-6">
          <p>“Should we open our relationship?” often contains several different questions.</p>
          <p>
            Do you want more sexual freedom, additional romantic relationships, independent
            experiences, shared experiences, or permission to explore an identity? Are both people
            interested, or is one person afraid of losing the relationship? Are you trying to solve
            a problem that opening will not fix?
          </p>
          <p>
            Coaching creates room to answer those questions without assuming that polyamory is
            automatically the right destination.
          </p>
        </div>
      </Section>

      <Section ruled>
        <h2 className="display-condensed text-coral text-3xl sm:text-5xl">
          Coaching can help with
        </h2>
        <ul className="prose-doc mt-6 !max-w-2xl columns-1 sm:columns-2 gap-10 [&>li]:break-inside-avoid list-disc pl-5">
          {HELP_WITH.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      </Section>

      <Section ruled>
        <h2 className="display-condensed text-coral text-3xl sm:text-5xl">
          For individuals and partners
        </h2>
        <div className="prose-doc mt-6">
          <p>You can attend alone, with one partner, or with multiple partners when appropriate.</p>
          <p>
            Joint coaching is not couples therapy. Jules will not diagnose either person, take
            responsibility for saving the relationship, or force agreement where there is a real
            incompatibility.
          </p>
        </div>
      </Section>

      <Section ruled>
        <h2 className="display-condensed text-coral text-3xl sm:text-5xl">
          Consent includes the freedom to say no
        </h2>
        <div className="prose-doc mt-6">
          <p>
            A relationship is not consensually nonmonogamous because one person finally gives in.
          </p>
          <p>
            Coaching should make motives, pressure, uncertainty, and boundaries easier to see.
            Sometimes the most honest outcome is to wait, change the plan, or admit that two people
            want different relationship structures.
          </p>
        </div>
      </Section>

      <Section ruled>
        <h2 className="display-condensed text-coral text-3xl sm:text-5xl">What coaching is not</h2>
        <div className="prose-doc mt-6">
          <p>
            Polyamory coaching is educational and practical. It is not psychotherapy, mediation,
            legal advice, medical care, or crisis support.
          </p>
          <p>No relationship outcome can be guaranteed.</p>
        </div>
      </Section>

      <CtaBlock
        headline="Do not use rules to avoid the conversation."
        primaryLabel="Book an introductory session"
        primaryTo="/book"
      />

      <JsonLd
        data={serviceJsonLd({
          name: "Polyamory coaching for beginners",
          description:
            "Practical polyamory and open-relationship coaching for individuals and couples considering consensual nonmonogamy: agreements, jealousy, dating, and communication.",
          path: PATH,
        })}
      />
    </MarketingLayout>
  );
}
