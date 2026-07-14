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
import { pageHead, personJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead({
      title: "About Jules Holloway | Department of Consent",
      description:
        "Meet Jules Holloway, the San Francisco-based beginner kink and polyamory coach behind Department of Consent.",
      path: "/about",
    }),
  component: AboutPage,
});

const VALUES = [
  {
    title: "No pressure to perform an identity",
    body: "You do not need to prove that you are dominant, submissive, polyamorous, queer, experienced, adventurous, or ready.",
  },
  {
    title: "Information without false certainty",
    body: "Preparation matters. So does admitting what no checklist can guarantee.",
  },
  {
    title: "Consent without complacency",
    body: "Permission is necessary. Judgment, context, communication, accountability, and care still matter.",
  },
  {
    title: "Privacy without isolation",
    body: "People deserve discretion. They also deserve outside perspectives, community connections, and the freedom to ask for help.",
  },
] as const;

function AboutPage() {
  return (
    <MarketingLayout>
      <Container>
        <Breadcrumbs
          crumbs={[
            { label: "Home", path: "/" },
            { label: "About", path: "/about" },
          ]}
        />
      </Container>

      <Section wide className="!pt-2">
        <div className="mx-auto max-w-3xl">
          <Eyebrow>About</Eyebrow>
          <h1 className="display-condensed text-coral text-4xl sm:text-6xl">
            I help people enter the scene without pretending they already know the rules.
          </h1>
        </div>
      </Section>

      <Section ruled>
        <div className="prose-doc">
          <p>I am Jules Holloway, founder of Department of Consent.</p>
          <p>
            I kept finding myself in the same role. Newer people came to me with the questions they
            did not feel comfortable asking publicly.
          </p>
          <p>
            What should I expect at an event? Is this behavior normal? How do I negotiate without
            sounding inexperienced? How do I tell the difference between confidence and pressure?
            How do I enter a community where everyone seems to know rules no one has explained?
          </p>
          <p>
            I am good at making unfamiliar systems legible. My work is not about telling people what
            they should want. It is about helping them understand the situation clearly enough to
            make their own decisions.
          </p>
          <p>
            Department of Consent turns informal mentorship into practical, structured support for
            adults who are ready to make their curiosity real.
          </p>
        </div>
      </Section>

      <Section wide ruled>
        <h2 className="display-condensed text-coral text-3xl sm:text-5xl">Values</h2>
        <div className="mt-9 grid gap-8 sm:grid-cols-2">
          {VALUES.map((v) => (
            <div key={v.title} className="border-t-2 border-coral pt-5">
              <h3 className="font-display text-2xl text-plum leading-tight">{v.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-foreground/75">{v.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section ruled>
        <h2 className="font-display text-2xl text-plum leading-tight">Scope, plainly</h2>
        <div className="prose-doc mt-4">
          <p>
            Coaching with Department of Consent is educational and practical. It is not
            psychotherapy, medical care, legal advice, or crisis support, and it does not include
            kink play, topping, bottoming, dating, romantic companionship, or physical intimacy. All
            services are for adults aged 18 and older.
          </p>
        </div>
      </Section>

      <CtaBlock
        headline="You are allowed to ask the beginner question."
        primaryLabel="View pricing and booking options"
        primaryTo="/pricing"
      />

      <JsonLd data={personJsonLd()} />
    </MarketingLayout>
  );
}
