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

const PATH = "/services/beginner-bdsm-coaching";

export const Route = createFileRoute("/services/beginner-bdsm-coaching")({
  head: () =>
    pageHead({
      title: "Beginner BDSM Coaching | Department of Consent",
      description:
        "Private beginner BDSM coaching for adults exploring kink, dominance, submission, negotiation, boundaries, vetting, safety, and aftercare.",
      path: PATH,
    }),
  component: BdsmCoachingPage,
});

const HELP_WITH = [
  "Separating fantasy from real-world interest",
  "Understanding dominance, submission, switching, and role exploration",
  "Learning common kink terminology",
  "Identifying boundaries and limits",
  "Talking with an existing partner",
  "Evaluating potential partners",
  "Preparing for a first scene",
  "Negotiating interests, intensity, and stopping",
  "Understanding aftercare",
  "Recognizing manipulation and pressure",
  "Preparing for an event",
  "Debriefing an experience afterward",
];

function BdsmCoachingPage() {
  return (
    <MarketingLayout>
      <Container>
        <Breadcrumbs
          crumbs={[
            { label: "Home", path: "/" },
            { label: "Coaching", path: "/coaching" },
            { label: "Beginner BDSM Coaching", path: PATH },
          ]}
        />
      </Container>

      <Section wide className="!pt-2">
        <div className="mx-auto max-w-3xl">
          <Eyebrow>Private coaching for kink beginners</Eyebrow>
          <h1 className="display-condensed text-coral text-4xl sm:text-6xl">
            Learn BDSM before experience is the only teacher.
          </h1>
          <div className="prose-doc mt-6">
            <p>
              Beginner BDSM coaching helps you understand the language, skills, expectations, and
              decisions that come before real-world kink.
            </p>
            <p>
              You do not need to arrive with a role, a label, a partner, or a list of activities.
              You can begin with a question.
            </p>
          </div>
          <div className="mt-8">
            <ButtonLink to="/pricing">Book a Free Coaching Session</ButtonLink>
          </div>
        </div>
      </Section>

      <Section ruled>
        <h2 className="display-condensed text-coral text-3xl sm:text-5xl">
          What beginner BDSM coaching is
        </h2>
        <div className="prose-doc mt-6">
          <p>
            BDSM is an umbrella term often used for bondage and discipline, dominance and
            submission, and sadism and masochism. In real life, it can also involve roleplay,
            sensation, power exchange, ritual, restraint, impact, service, or forms of intimacy that
            do not fit neatly into one category.
          </p>
          <p>
            Coaching is not a class where you are tested on terminology. It is a private
            conversation that helps you understand what is relevant to your interests and what you
            should consider before acting on them.
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
          You do not need to prove anything
        </h2>
        <div className="prose-doc mt-6">
          <p>
            You do not need to be “kinky enough.” You do not need to pick a role before you
            understand it. You do not need to perform confidence for someone more experienced.
          </p>
          <p>A good first step can be learning, asking questions, or deciding not to proceed.</p>
        </div>
      </Section>

      <Section ruled>
        <h2 className="display-condensed text-coral text-3xl sm:text-5xl">
          What a session looks like
        </h2>
        <div className="prose-doc mt-6">
          <p>
            We begin with the situation in front of you. That might be an invitation, a fantasy, a
            new relationship, an event, a conversation with a partner, or a general sense that you
            are ready to explore.
          </p>
          <p>
            We identify the questions that matter, the information you still need, the boundaries
            you want to clarify, and the next step that makes sense for you.
          </p>
        </div>
        <div className="mt-7">
          <TextLink to="/guides/how-to-negotiate-your-first-scene">
            Read the free scene-negotiation guide
          </TextLink>
        </div>
      </Section>

      <Section ruled>
        <h2 className="display-condensed text-coral text-3xl sm:text-5xl">What coaching is not</h2>
        <div className="prose-doc mt-6">
          <p>
            Coaching is educational and practical. It is not psychotherapy, medical treatment, legal
            advice, crisis support, or hands-on kink instruction with Jules.
          </p>
          <p>
            Services do not include sexual activity, kink play, topping, bottoming, dating, romantic
            companionship, or physical intimacy.
          </p>
        </div>
      </Section>

      <CtaBlock
        headline="Kink confidence is built before anyone touches anyone."
        primaryLabel="Book a Free Coaching Session"
        primaryTo="/pricing"
      />

      <JsonLd
        data={serviceJsonLd({
          name: "Beginner BDSM coaching",
          description:
            "Private beginner BDSM coaching for adults exploring kink: interests, terminology, negotiation, boundaries, vetting, safety, and aftercare.",
          path: PATH,
        })}
      />
    </MarketingLayout>
  );
}
