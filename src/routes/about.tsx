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
    body: "You can be curious without proving that you are dominant, submissive, polyamorous, queer, experienced, adventurous, or ready.",
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

      <Section wide className="!pt-10 sm:!pt-14">
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
            <p>I'm Jules Holloway. I run Department of Consent.</p>
            <p>
              My first Dore Alley and Folsom were in 2009. Kink stayed private for a long time after
              that; in 2025 I came back to the public scene in San Francisco.
            </p>
            <p>
              I'm a switch and a sadomasochist, with years on both sides of power exchange. I'm not
              a therapist or a certified educator. What I know comes from doing this, and from a lot
              of conversations with people trying to figure out where they fit.
            </p>
            <p>
              I coach beginners. Not with hype or jargon, but the practical stuff: what actually
              happens at a play party, how to negotiate before you know what you want, how to spot
              pressure.
            </p>
            <p>
              You don't need the right vocabulary. You need a place to ask honest questions before
              you're in the middle of something you don't understand.
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

      <CtaBlock
        headline="You are allowed to ask the beginner question."
        primaryLabel="Book a Free Coaching Session"
        primaryTo="/coaching"
      />

      <JsonLd data={personJsonLd()} />
    </MarketingLayout>
  );
}
