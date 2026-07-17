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
      title: "About Jules Darling | Department of Consent",
      description:
        "Meet Jules Darling, the San Francisco-based beginner kink and polyamory coach behind Department of Consent.",
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
        <div className="grid gap-9 md:grid-cols-[minmax(0,1fr)_minmax(260px,0.72fr)] md:items-start md:gap-12">
          <div className="prose-doc space-y-7">
            <section className="space-y-2">
              <h2 className="display-condensed text-coral text-2xl leading-[0.95] sm:text-3xl">
                About Jules Darling
              </h2>
              <p>Kink's favorite tour guide.</p>
              <p>
                My first Dore Alley and Folsom were in 2009. My kink practice stayed with private
                partners as I gained experience as a dom; in 2025 I came back to the public scene in
                San Francisco as a sub to let my freak flag fully fly. Now I proudly declare myself
                a switch and a sadomasochist.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="display-condensed text-coral text-2xl leading-[0.95] sm:text-3xl">
                My practice
              </h2>
              <p>
                I'm intentionally not a therapist. I practice more intimate coaching than a
                therapist, like going shopping together for your first fetish wear, or being your
                event buddy at your first play party.
              </p>
              <p>
                I teach PRICK and RACK consent. PRICK: Personal Responsibility, Informed, Consensual
                Kink. RACK: Risk-Aware Consensual Kink.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="display-condensed text-coral text-2xl leading-[0.95] sm:text-3xl">
                Qualifications
              </h2>
              <p>
                My qualifications come from lived experience on both sides of the slash. My
                education is ongoing, by attending workshops in the SF Bay Area from organizations
                like Wicked Grounds, Dark Odyssey, Society of Janus, Kink.com, and Foundations. I am
                also a frequent attendee of local munches and kink community events where I've found
                such an amazing community that I love to be a part of.
              </p>
              <p>
                I also run{" "}
                <a href="https://leatherworship.com" target="_blank" rel="noreferrer">
                  Leather Worship
                </a>
                , a handmade boutique kink store selling collars, impact toys, and custom orders.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="display-condensed text-coral text-2xl leading-[0.95] sm:text-3xl">
                Beginners welcome
              </h2>
              <p>
                I specialize in coaching beginners, because when I first started in the local scene
                finding a mentor was next to impossible and feeling comfortable in the scene felt
                endless and confusing.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="display-condensed text-coral text-2xl leading-[0.95] sm:text-3xl">
                What I teach best
              </h2>
              <p>
                I focus on the practical stuff: what actually happens at a play party, how to
                negotiate before you know what you want, how to spot pressure, what to wear, and
                most importantly how to brand yourself.
              </p>
            </section>
          </div>

          <div className="mx-auto w-full max-w-[360px] overflow-hidden rounded-[1.25rem] bg-[#1B1B1B] shadow-[0_18px_46px_-34px_rgba(27,27,27,0.65)] md:sticky md:top-28 md:mx-0 md:justify-self-end lg:top-32">
            <img
              src={julesPortrait}
              alt="Portrait of Jules Darling"
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
        headline="You are allowed to ask the beginner questions."
        primaryLabel="Book a Free Coaching Session"
        primaryTo="/coaching"
        tone="dark"
      />

      <JsonLd data={personJsonLd()} />
    </MarketingLayout>
  );
}
