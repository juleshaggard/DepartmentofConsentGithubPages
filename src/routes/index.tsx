import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import {
  ButtonLink,
  Container,
  CtaBlock,
  Eyebrow,
  FaqAccordion,
  Section,
  TextLink,
  type Faq,
} from "@/components/marketing/primitives";
import { NewsletterSignup } from "@/components/marketing/NewsletterSignup";
import { pageHead } from "@/lib/seo";
import { allGuides } from "@/content/guides";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: "Kink and Poly Coaching for Beginners | Department of Consent",
      description:
        "Practical kink and polyamory coaching for adults ready to move from curiosity into real-world exploration. Virtual sessions and San Francisco event support.",
      path: "/",
    }),
  component: HomePage,
});

const PILLARS = [
  {
    n: "01",
    headline: "You do not have to figure this out alone.",
    body: "Being new does not mean you need to fake confidence or quietly follow whoever seems most experienced. Get clear, judgment-free guidance before your first conversation, event, scene, or open relationship.",
  },
  {
    n: "02",
    headline: "Kink has an instruction manual.",
    body: "The rules are rarely written down, but the important parts can be learned. Etiquette, vetting, negotiation, boundaries, safety, communication, and aftercare should not be secrets people discover only after something goes wrong.",
  },
  {
    n: "03",
    headline: "Consent is only the beginning.",
    body: "A clear yes matters. It does not automatically create a good experience. Good kink also takes preparation, judgment, self-knowledge, communication, care, and the confidence to change your mind.",
  },
] as const;

const SERVICES = [
  {
    title: "Beginner BDSM Coaching",
    body: "Private coaching for understanding your interests, learning the language, evaluating potential partners, negotiating clearly, and preparing for real-world experiences.",
    cta: "Explore beginner BDSM coaching",
    to: "/services/beginner-bdsm-coaching",
  },
  {
    title: "Polyamory Coaching for Beginners",
    body: "Practical support for individuals and partners considering consensual nonmonogamy, from the first conversation through agreements, dating, jealousy, time, and course correction.",
    cta: "Explore polyamory coaching",
    to: "/services/polyamory-coaching-for-beginners",
  },
  {
    title: "First Kink Event Preparation",
    body: "Learn what kind of event you are attending, what the rules mean, what to wear, what participation is expected, and how to protect your boundaries.",
    cta: "Prepare for your first kink event",
    to: "/guides/preparing-for-your-first-kink-event",
  },
  {
    title: "Kink Event Accompaniment",
    body: "For selected San Francisco Bay Area events, attend with Jules Holloway as a knowledgeable, nonsexual guide who can help you understand the space and find your footing.",
    cta: "Ask about event accompaniment",
    to: "/services/kink-event-accompaniment",
  },
  {
    title: "Private Workshops",
    body: "Clear, beginner-friendly education for partners, small groups, organizations, and community spaces.",
    cta: "Inquire about a workshop",
    to: "/workshops",
  },
] as const;

const HELP_ITEMS = [
  "I know what I fantasize about, but I do not know how to begin.",
  "I want to attend an event, but I am nervous about going alone.",
  "I do not know how to tell whether someone is trustworthy.",
  "I want to negotiate without sounding robotic or inexperienced.",
  "My partner and I are discussing opening our relationship.",
  "I am unsure whether I am dominant, submissive, a switch, or none of the above.",
  "I had an experience that left me confused, and I want to understand it.",
  "I want to learn community etiquette before accidentally breaking it.",
  "I need help separating pressure from genuine consent.",
  "I want to feel prepared without pretending that every risk can be eliminated.",
];

const STEPS = [
  {
    n: "Step one",
    title: "Tell me what you are considering.",
    body: "You do not need the perfect language. Explain what interests you, what concerns you, and what you are thinking about doing next.",
  },
  {
    n: "Step two",
    title: "Get a plan built around your situation.",
    body: "We identify the information, skills, boundaries, and practical preparation most relevant to you.",
  },
  {
    n: "Step three",
    title: "Explore with better judgment.",
    body: "You leave with specific next steps, useful questions, and a clearer understanding of what you do and do not want.",
  },
] as const;

const HOME_FAQS: Faq[] = [
  {
    question: "Do I need previous kink experience?",
    answer:
      "No. Department of Consent is designed for people who are new, uncertain, or preparing to explore kink in real life for the first time.",
    answerText:
      "No. Department of Consent is designed for people who are new, uncertain, or preparing to explore kink in real life for the first time.",
  },
  {
    question: "Do I need to know exactly what I am into?",
    answer:
      "No. Coaching can help you separate fantasy, curiosity, identity, and real-world interest without forcing you into a label.",
    answerText:
      "No. Coaching can help you separate fantasy, curiosity, identity, and real-world interest without forcing you into a label.",
  },
  {
    question: "Is this therapy?",
    answer:
      "No. Coaching is educational and practical. It does not diagnose or treat mental-health conditions and is not a substitute for a licensed therapist, medical provider, attorney, or crisis service.",
    answerText:
      "No. Coaching is educational and practical. It does not diagnose or treat mental-health conditions and is not a substitute for a licensed therapist, medical provider, attorney, or crisis service.",
  },
  {
    question: "Do you offer in-person sessions?",
    answer:
      "Virtual coaching is available. Selected in-person coaching and nonsexual event support may be available in San Francisco and the greater Bay Area.",
    answerText:
      "Virtual coaching is available. Selected in-person coaching and nonsexual event support may be available in San Francisco and the greater Bay Area.",
  },
];

function HomePage() {
  return (
    <MarketingLayout>
      {/* 1. Hero */}
      <Section wide className="!pt-16 sm:!pt-24 !pb-14">
        <div className="max-w-3xl">
          <Eyebrow>Beginner kink and polyamory coaching</Eyebrow>
          <h1 className="font-display text-5xl sm:text-7xl text-plum leading-[0.98]">
            From kink-curious to kink&#8209;confident.
          </h1>
          <div className="prose-doc mt-7">
            <p>
              You have done the wondering. Now you want to know how to explore kink or polyamory
              without walking in blind.
            </p>
            <p>
              Department of Consent offers practical education, private coaching, and nonsexual
              event support for adults ready to take their first real steps.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink to="/book">Book an introductory session</ButtonLink>
            <ButtonLink to="/coaching" variant="outline">
              Explore coaching
            </ButtonLink>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Virtual coaching. Selected in-person services in San Francisco and the greater Bay Area.
            For adults 18+.
          </p>
        </div>
      </Section>

      {/* 2. Recognition */}
      <Section ruled>
        <h2 className="font-display text-3xl sm:text-4xl text-plum leading-[1.08] max-w-[22ch]">
          You do not need more random internet advice.
        </h2>
        <div className="prose-doc mt-6">
          <p>
            You may already know what interests you. The harder part is knowing what happens next.
          </p>
          <p>
            Where do you meet people? What should you ask before playing with someone? How do you
            know whether an event welcomes beginners? What is normal nervousness, and what is an
            actual warning sign?
          </p>
          <p>
            The internet can give you a thousand conflicting answers. Coaching gives you a private
            place to ask the questions that actually apply to you.
          </p>
        </div>
      </Section>

      {/* 3. Pillars */}
      <Section wide ruled>
        <h2 className="font-display text-3xl sm:text-4xl text-plum leading-[1.08] max-w-[24ch]">
          Kink is easier to explore when someone explains the room.
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {PILLARS.map((p) => (
            <div key={p.n} className="border-t-2 border-coral pt-5">
              <p className="text-xs font-bold text-coral">{p.n}</p>
              <h3 className="font-display text-2xl text-plum leading-tight mt-2">{p.headline}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-foreground/75">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 4. Services overview */}
      <Section wide ruled>
        <Eyebrow>Services</Eyebrow>
        <h2 className="font-display text-3xl sm:text-4xl text-plum leading-[1.08]">
          Start where you actually are.
        </h2>
        <p className="prose-doc mt-4">
          You do not need the right vocabulary, a fixed identity, or a perfectly organized list of
          interests. We can begin with the questions you already have.
        </p>
        <div className="mt-10 divide-y divide-plum/10 border-y border-plum/10">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="py-7 grid gap-3 md:grid-cols-[1fr_2fr_auto] md:items-baseline"
            >
              <h3 className="font-display text-2xl text-plum leading-tight">{s.title}</h3>
              <p className="text-[0.95rem] leading-relaxed text-foreground/75 max-w-xl">{s.body}</p>
              <TextLink to={s.to} className="md:justify-self-end whitespace-nowrap">
                {s.cta}
              </TextLink>
            </div>
          ))}
        </div>
      </Section>

      {/* 5. What coaching can help with */}
      <Section ruled>
        <h2 className="font-display text-3xl sm:text-4xl text-plum leading-[1.08] max-w-[22ch]">
          Bring the questions you cannot solve with a glossary.
        </h2>
        <ul className="mt-8 space-y-3">
          {HELP_ITEMS.map((item) => (
            <li key={item} className="flex gap-3 text-[1.0325rem] leading-relaxed text-plum/90">
              <span aria-hidden className="text-coral font-bold select-none">
                —
              </span>
              <span className="italic">“{item}”</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* 6. First-event support feature */}
      <Section wide ruled>
        <div className="rounded-2xl bg-blush/50 border border-coral/15 px-6 py-10 sm:px-12 sm:py-14">
          <Eyebrow>First event support</Eyebrow>
          <h2 className="font-display text-3xl sm:text-4xl text-plum leading-[1.08] max-w-[22ch]">
            You can walk into the room knowing what to expect.
          </h2>
          <div className="prose-doc mt-5">
            <p>
              Your first kink event should not feel like being dropped into a private club with no
              explanation.
            </p>
            <p>
              We can choose an appropriate event, discuss dress and etiquette, review your
              boundaries, plan how to handle conversations, and make sure you know how to leave
              whenever you want.
            </p>
            <p>
              For selected events in the San Francisco Bay Area, nonsexual accompaniment may also be
              available.
            </p>
          </div>
          <p className="mt-6 max-w-2xl text-sm text-plum/70 border-l-2 border-coral/40 pl-4">
            Event accompaniment is educational and social support. It does not include sexual
            activity, kink play, topping, bottoming, dating, romantic companionship, or guaranteed
            introductions.
          </p>
          <div className="mt-7">
            <ButtonLink to="/services/kink-event-accompaniment" variant="outline">
              Learn about event support
            </ButtonLink>
          </div>
        </div>
      </Section>

      {/* 7. Process */}
      <Section wide ruled>
        <h2 className="font-display text-3xl sm:text-4xl text-plum leading-[1.08]">
          No grand initiation. Just a useful next step.
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n}>
              <p className="section-label">{s.n}</p>
              <h3 className="font-display text-2xl text-plum leading-tight mt-1">{s.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-foreground/75">{s.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 8. About preview */}
      <Section ruled>
        <Eyebrow>About</Eyebrow>
        <h2 className="font-display text-3xl sm:text-4xl text-plum leading-[1.08] max-w-[24ch]">
          The person you wish you had met before taking your first step into the scene.
        </h2>
        <div className="prose-doc mt-6">
          <p>I am Jules Holloway, founder of Department of Consent.</p>
          <p>
            I kept finding myself in the same role: helping newer people understand the language,
            read the room, ask better questions, and avoid learning everything through trial and
            error.
          </p>
          <p>
            Department of Consent turns that informal mentorship into practical, structured support
            for adults who are ready to make their curiosity real.
          </p>
        </div>
        <div className="mt-7">
          <TextLink to="/about">Meet Jules</TextLink>
        </div>
      </Section>

      {/* 9. Guide cards */}
      <Section wide ruled>
        <Eyebrow>Free guides</Eyebrow>
        <h2 className="font-display text-3xl sm:text-4xl text-plum leading-[1.08] max-w-[22ch]">
          Read this before asking strangers on the internet.
        </h2>
        <p className="prose-doc mt-4">
          Straightforward guides to entering the kink scene, preparing for your first event,
          negotiating a scene, vetting people, aftercare, polyamory, and the unwritten rules
          beginners are expected to know.
        </p>
        <div className="mt-9 grid gap-5 sm:grid-cols-2">
          {allGuides.map((g) => (
            <Link
              key={g.slug}
              to={g.path}
              className="group rounded-2xl border border-plum/15 bg-card px-6 py-7 hover:border-coral/50 transition-colors"
            >
              <p className="section-label">Beginner guide</p>
              <h3 className="font-display text-2xl text-plum leading-tight mt-1 group-hover:text-coral transition-colors">
                {g.crumbLabel}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70 line-clamp-3">
                {g.description}
              </p>
            </Link>
          ))}
        </div>
        <div className="mt-7">
          <TextLink to="/resources">Browse beginner guides</TextLink>
        </div>
      </Section>

      {/* 10. FAQ */}
      <Section ruled>
        <h2 className="font-display text-3xl sm:text-4xl text-plum leading-[1.08]">
          Common questions
        </h2>
        <div className="mt-6">
          <FaqAccordion faqs={HOME_FAQS} withJsonLd />
        </div>
        <div className="mt-6">
          <TextLink to="/faq">Read the full FAQ</TextLink>
        </div>
      </Section>

      {/* 11. Email guide capture */}
      <Section wide ruled>
        <NewsletterSignup />
      </Section>

      {/* 12. Final CTA */}
      <CtaBlock
        headline="You do not need to become an expert before you begin."
        body="You need enough knowledge, support, and confidence to make your next decision deliberately."
        primaryLabel="Book an introductory session"
        primaryTo="/book"
        secondaryLabel="Explore coaching"
        secondaryTo="/coaching"
      />
    </MarketingLayout>
  );
}
