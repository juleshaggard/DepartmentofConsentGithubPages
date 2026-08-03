import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { JsonLd } from "@/components/marketing/JsonLd";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import {
  Breadcrumbs,
  ButtonLink,
  Container,
  CtaBlock,
  Eyebrow,
  Section,
} from "@/components/marketing/primitives";
import { articleJsonLd, pageHead } from "@/lib/seo";

const pagePath = "/play-party-negotiation-checklist";
const pageTitle = "Play Party Negotiation Checklist | Department of Consent";
const pageDescription =
  "A practical play party negotiation checklist for adults preparing to discuss boundaries, risks, signals, logistics, and aftercare before a kink scene.";
const datePublished = "2026-08-03";

const CHECKLIST_SECTIONS = [
  {
    number: "01",
    title: "Fit before fantasy",
    intro: "Start with the scene you are actually considering, not the hottest version of it.",
    items: [
      "Name the activity, role, or feeling each person wants.",
      "Confirm who is involved and who is not involved.",
      "Ask what each person wants from the scene: sensation, service, power, attention, release, exploration, or something else.",
      "Check whether anyone feels rushed, watched, or pressured to say yes.",
      "Decide whether this is for tonight, for later, or for a private follow-up.",
    ],
  },
  {
    number: "02",
    title: "Limits, maybes, and privacy",
    intro: "A clear no makes the yes easier to trust.",
    items: [
      "Name hard limits that are off the table.",
      "Name maybes that need a slower conversation.",
      "Discuss body areas, words, roles, names, and emotional themes to avoid.",
      "Clarify whether sexual contact, nudity, marks, fluids, or photos are off-limits.",
      "Agree on privacy: who can know, what can be shared, and what stays between you.",
    ],
  },
  {
    number: "03",
    title: "Risk and bodies",
    intro: "Share what affects the activity without asking for a full medical history.",
    items: [
      "Mention injuries, mobility needs, circulation issues, allergies, or medication concerns that affect play.",
      "Discuss substance use and whether everyone can consent with a clear head.",
      "Talk through safer sex needs if sexual contact, fluids, or genital contact might happen.",
      "Confirm who knows how to use the toys, restraints, or gear involved.",
      "Pause any activity where the risks are unclear to either person.",
    ],
  },
  {
    number: "04",
    title: "Signals and pacing",
    intro: "Do not make stopping depend on one perfect word at one perfect moment.",
    items: [
      "Choose a safeword or stop signal everyone understands.",
      "Choose a nonverbal signal if speech might be hard.",
      "Agree on check-ins that will not break the mood.",
      "Define intensity with examples, not vague words like rough or light.",
      "Start lower than you think you need to, then increase only with clear feedback.",
    ],
  },
  {
    number: "05",
    title: "Party logistics",
    intro: "The venue matters. So do witnesses, house rules, and how you get home.",
    items: [
      "Read the party rules before you negotiate the scene.",
      "Choose where the scene will happen and whether observers are acceptable.",
      "Know who the host, monitor, or dungeon monitor is if you need help.",
      "Set a time limit or check-in point before the scene starts.",
      "Keep transportation, belongings, phone access, and exit plans independent from a new play partner.",
    ],
  },
  {
    number: "06",
    title: "Aftercare and debrief",
    intro: "The scene is not over when the activity stops.",
    items: [
      "Ask what each person usually needs afterward: quiet, water, touch, space, reassurance, food, or a ride check.",
      "Agree on what to do if someone feels embarrassed, shaky, numb, or flooded.",
      "Decide whether you will exchange contact information.",
      "Plan a short debrief for later, when everyone is more regulated.",
      "Respect a no to follow-up, flirting, more play, or a second scene.",
    ],
  },
] as const;

const QUICK_LINES = [
  "I am interested, but I want to negotiate before I say yes.",
  "Can we start lower and check in after a few minutes?",
  "That is a no for tonight.",
  "I want to pause and think before I answer.",
  "I am done for now. Please help me wrap up.",
] as const;

const READINESS_CHECKS = [
  "I can leave without depending on this person.",
  "I know how to stop the scene.",
  "I know who to ask for help at the party.",
  "I understand the biggest risks of what we are doing.",
  "I am saying yes because I want this, not because I feel cornered.",
] as const;

export const Route = createFileRoute("/play-party-negotiation-checklist")({
  head: () =>
    pageHead({
      title: pageTitle,
      description: pageDescription,
      path: pagePath,
      ogType: "article",
      noindex: true,
    }),
  component: PlayPartyNegotiationChecklistPage,
});

function PlayPartyNegotiationChecklistPage() {
  return (
    <MarketingLayout>
      <Container>
        <Breadcrumbs
          crumbs={[
            { label: "Home", path: "/" },
            { label: "Play Party Negotiation Checklist", path: pagePath },
          ]}
        />
      </Container>

      <Section wide className="!pt-10 sm:!pt-14">
        <div className="mx-auto max-w-4xl">
          <Eyebrow>Free checklist</Eyebrow>
          <h1 className="display-condensed max-w-[13ch] text-coral text-5xl leading-[0.88] sm:text-7xl lg:text-8xl">
            Play Party Negotiation Checklist
          </h1>
          <p className="prose-doc mt-6 max-w-2xl">
            Use this before you agree to play at a kink party. It helps you name the scene,
            boundaries, risks, signals, logistics, and aftercare while everyone can still think
            clearly.
          </p>
        </div>
      </Section>

      <Section wide>
        <div className="grid gap-7 lg:grid-cols-[minmax(16rem,0.46fr)_minmax(0,1fr)] lg:items-start lg:gap-10">
          <aside className="rounded-[1.25rem] bg-[#1B1B1B] px-6 py-7 text-white shadow-[0_24px_80px_rgb(27_27_27_/_0.12)] lg:sticky lg:top-28">
            <p className="section-label !text-[#5BCEFA]">Use before</p>
            <h2 className="mt-2 font-display text-3xl leading-[1.02]">
              A yes at a party still needs a conversation.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/72">
              This is not a legal form, a medical screening, or a promise that a scene is safe. It
              is a way to slow down, ask better questions, and notice pressure before you are in the
              middle of something.
            </p>
            <div className="mt-7 space-y-3">
              {READINESS_CHECKS.map((item) => (
                <label key={item} className="flex items-start gap-3 text-sm leading-snug">
                  <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/30 accent-[#5BCEFA]"
                  />
                  <span className="text-white/82">{item}</span>
                </label>
              ))}
            </div>
          </aside>

          <div className="space-y-5">
            {CHECKLIST_SECTIONS.map((section) => (
              <ChecklistSection key={section.title} section={section} />
            ))}
          </div>
        </div>
      </Section>

      <Section wide>
        <div className="grid gap-6 rounded-[1.25rem] bg-pinkcard px-6 py-8 sm:px-8 md:grid-cols-[0.62fr_1fr] md:items-start">
          <div>
            <p className="section-label">Say it out loud</p>
            <h2 className="display-condensed mt-2 text-3xl text-coral sm:text-5xl">
              Borrow these lines.
            </h2>
          </div>
          <div className="grid gap-3">
            {QUICK_LINES.map((line) => (
              <div
                key={line}
                className="rounded-2xl border border-coral/15 bg-white/70 px-4 py-3 font-display text-[1.05rem] leading-snug text-plum"
              >
                "{line}"
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section wide>
        <div className="mx-auto max-w-3xl text-center">
          <CheckCircle2 className="mx-auto h-9 w-9 text-[#5BCEFA]" strokeWidth={2.25} />
          <h2 className="mt-4 font-display text-3xl leading-[1.05] text-plum sm:text-4xl">
            If one of these answers feels hard to say, that is information.
          </h2>
          <p className="prose-doc mx-auto mt-4 max-w-2xl">
            You can slow down, ask someone outside the situation, choose a smaller first step, or
            decide the scene is not for tonight.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink to="/coaching">Talk it through with Jules</ButtonLink>
            <ButtonLink to="/services/kink-event-accompaniment" variant="outline">
              Explore event support
            </ButtonLink>
          </div>
        </div>
      </Section>

      <CtaBlock
        headline="Want help preparing before the party?"
        body="Bring the invitation, the person, the scene idea, or the thing you are nervous to ask."
        primaryLabel="Book a Free Coaching Session"
        primaryTo="/coaching"
        tone="dark"
      />

      <JsonLd
        data={articleJsonLd({
          headline: "Play Party Negotiation Checklist",
          description: pageDescription,
          path: pagePath,
          datePublished,
        })}
      />
    </MarketingLayout>
  );
}

function ChecklistSection({ section }: { section: (typeof CHECKLIST_SECTIONS)[number] }) {
  return (
    <section className="rounded-[1.25rem] border border-plum/10 bg-white px-5 py-6 shadow-[0_18px_50px_rgb(27_27_27_/_0.05)] sm:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="section-label text-coral">{section.number}</p>
          <h2 className="display-condensed mt-1 text-3xl leading-[0.95] text-coral sm:text-4xl">
            {section.title}
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-plum/70 sm:text-right">
          {section.intro}
        </p>
      </div>

      <div className="mt-5 grid gap-3">
        {section.items.map((item) => (
          <label
            key={item}
            className="group flex items-start gap-3 rounded-2xl border border-plum/10 bg-card/70 px-4 py-3 transition-colors hover:border-coral/35 hover:bg-blush/40"
          >
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-plum/25 accent-[#5BCEFA]"
            />
            <span className="text-sm leading-relaxed text-plum/82">{item}</span>
          </label>
        ))}
      </div>
    </section>
  );
}
