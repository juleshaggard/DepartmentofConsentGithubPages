import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import {
  Breadcrumbs,
  Container,
  CtaBlock,
  Eyebrow,
  Section,
} from "@/components/marketing/primitives";
import { JsonLd } from "@/components/marketing/JsonLd";
import { pageHead, personJsonLd } from "@/lib/seo";
import julesPortrait from "../../assets/julesholloway.jpg";

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

      <Section wide ruled>
        <div className="grid gap-9 md:grid-cols-[minmax(0,1fr)_minmax(260px,0.72fr)] md:items-center md:gap-12">
          <div className="prose-doc">
            <p>I am Jules Holloway, founder of Department of Consent.</p>
            <p>
              I kept finding myself in the same role. Newer people came to me with the questions
              they did not feel comfortable asking publicly.
            </p>
            <p>
              What should I expect at an event? Is this behavior normal? How do I negotiate without
              sounding inexperienced? How do I tell the difference between confidence and pressure?
              How do I enter a community where everyone seems to know rules no one has explained?
            </p>
            <p>
              I am good at making unfamiliar systems legible. My work is not about telling people
              what they should want. It is about helping them understand the situation clearly
              enough to make their own decisions.
            </p>
            <p>
              Department of Consent turns informal mentorship into practical, structured support for
              adults who are ready to make their curiosity real.
            </p>
          </div>

          <div className="mx-auto w-full max-w-[360px] overflow-hidden rounded-[1.25rem] bg-[#1B1B1B] shadow-[0_18px_46px_-34px_rgba(27,27,27,0.65)] md:mx-0 md:justify-self-end">
            <img
              src={julesPortrait}
              alt="Portrait of Jules Holloway"
              className="aspect-[4/5] h-full w-full object-cover object-[50%_20%]"
            />
          </div>
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
        primaryLabel="Book a Free Coaching Session"
        primaryTo="/pricing"
      />

      <JsonLd data={personJsonLd()} />
    </MarketingLayout>
  );
}
