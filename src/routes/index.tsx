import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import {
  ButtonLink,
  CtaBlock,
  FaqAccordion,
  PinkCard,
  Section,
  TextLink,
  type Faq,
} from "@/components/marketing/primitives";
import { NewsletterSignup } from "@/components/marketing/NewsletterSignup";
import { pageHead } from "@/lib/seo";
import { allGuides } from "@/content/guides";
import heroImg from "@/assets/hero-friends.jpg";
import photoCardBg from "@/assets/built-for-bg.png";
import stickerFeather from "@/assets/sticker-feather.png";
import stickerWandPink from "@/assets/sticker-wand-pink.png";
import stickerRope from "@/assets/sticker-rope.png";

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
      {/* 1. Hero — full-bleed photo with condensed display headline */}
      <section className="relative overflow-hidden bg-plum">
        <img
          src={heroImg}
          alt="Four friends sitting close together, laughing"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[50%_30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-black/20" />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-10 pt-40 sm:pt-64 pb-16 sm:pb-20">
          <h1 className="display-condensed text-white text-[3.2rem] sm:text-[5.5rem] lg:text-[6.5rem] max-w-[14ch] drop-shadow-sm">
            From kink&#8209;curious to kink&#8209;confident.
          </h1>
          <p className="font-display text-white text-2xl sm:text-4xl mt-4 drop-shadow-sm">
            Kink and polyamory coaching for beginners
          </p>
        </div>
        <p
          aria-label="Virtual coaching. Selected in-person services in San Francisco and the greater Bay Area. For adults 18 and older."
          className="hero-ticker relative text-white/95 text-xs sm:text-sm pb-5 pl-4 sm:pl-8"
        >
          In San Francisco and the greater Bay Area. For adults 18+. &nbsp;·&nbsp; Virtual coaching.
          &nbsp;·&nbsp; Selected in-person services in San Francisco. &nbsp;·&nbsp; From
          kink-curious to kink-confident.
        </p>
      </section>

      {/* 2. Recognition — coral serif statement */}
      <Section wide className="!py-16 sm:!py-24">
        <div className="max-w-xl sm:ml-[14%]">
          <div className="font-display text-coral text-2xl sm:text-[2rem] leading-[1.3] space-y-7">
            <p>
              You have done the wondering. Now you want to know how to explore kink or polyamory
              without walking in blind.
            </p>
            <p>
              Department of Consent offers practical education, private coaching, and nonsexual
              event support for adults ready to take their first real steps.
            </p>
          </div>
          <div className="prose-doc mt-10 space-y-4">
            <p>
              You may already know what interests you. The harder part is knowing what happens next.
              Where do you meet people? What should you ask before playing with someone? How do you
              know whether an event welcomes beginners? What is normal nervousness, and what is an
              actual warning sign?
            </p>
            <p>
              The internet can give you a thousand conflicting answers. Coaching gives you a private
              place to ask the questions that actually apply to you.
            </p>
          </div>
        </div>
      </Section>

      {/* 3. Services — giant coral display + card row */}
      <Section wide className="!pt-4">
        <h2 className="display-condensed text-coral text-center text-5xl sm:text-7xl lg:text-[5.5rem] max-w-4xl mx-auto">
          Start where you actually are.
        </h2>
        <p className="prose-doc mx-auto mt-6 text-center !max-w-2xl">
          You do not need the right vocabulary, a fixed identity, or a perfectly organized list of
          interests. We can begin with the questions you already have.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <PinkCard to="/services/beginner-bdsm-coaching" title="Beginner BDSM Coaching" centered>
            <img
              src={stickerFeather}
              alt=""
              aria-hidden
              className="pointer-events-none absolute -left-6 bottom-2 w-32 rotate-[-18deg]"
            />
            <img
              src={stickerWandPink}
              alt=""
              aria-hidden
              className="pointer-events-none absolute -right-4 -bottom-4 w-28 rotate-[15deg]"
            />
          </PinkCard>

          <Link
            to="/guides/preparing-for-your-first-kink-event"
            className="group relative flex min-h-[16rem] flex-col items-center justify-center overflow-hidden rounded-3xl bg-plum px-6 py-7 text-center transition-transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            <img
              src={photoCardBg}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover opacity-45"
            />
            <h3 className="display-condensed relative text-4xl text-coral drop-shadow-sm">
              First
              <br />
              Kink
              <br />
              Event
              <br />
              Prep
            </h3>
            <span
              aria-hidden
              className="absolute bottom-4 right-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-plum shadow-sm transition-colors group-hover:bg-coral group-hover:text-white"
            >
              →
            </span>
          </Link>

          <PinkCard
            to="/services/kink-event-accompaniment"
            title="Kink Event Accompaniment"
            body="For selected San Francisco Bay Area events, attend with Jules Holloway as a knowledgeable, nonsexual guide who can help you understand the space and find your footing."
          />

          <PinkCard
            to="/services/polyamory-coaching-for-beginners"
            title="Polyamory Coaching for Beginners"
            body="Practical support for individuals and partners considering consensual nonmonogamy — agreements, dating, jealousy, time, and course correction."
          />

          <PinkCard to="/workshops" title="Private Workshops" centered />

          <PinkCard
            to="/coaching"
            title="Not sure where to start?"
            body="Explore every coaching option, session formats, and ways to begin."
            centered
          />
        </div>
      </Section>

      {/* 4. Pillars */}
      <Section wide ruled>
        <h2 className="display-condensed text-coral text-4xl sm:text-6xl max-w-3xl">
          Kink is easier to explore when someone explains the room.
        </h2>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {PILLARS.map((p) => (
            <div key={p.n}>
              <p className="label-condensed text-coral text-sm">{p.n}</p>
              <h3 className="font-display text-2xl sm:text-[1.7rem] text-plum leading-tight mt-2">
                {p.headline}
              </h3>
              <p className="prose-doc mt-3 !text-base">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 5. What coaching can help with */}
      <Section ruled>
        <h2 className="display-condensed text-coral text-4xl sm:text-6xl">
          Bring the questions you cannot solve with a glossary.
        </h2>
        <ul className="mt-9 space-y-3">
          {HELP_ITEMS.map((item) => (
            <li key={item} className="flex gap-3 font-display text-lg sm:text-xl text-plum/90">
              <span aria-hidden className="text-coral select-none">
                —
              </span>
              <span className="italic">“{item}”</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* 6. First-event support feature */}
      <Section wide ruled>
        <div className="relative overflow-hidden rounded-3xl bg-pinkcard px-6 py-12 sm:px-14 sm:py-16">
          <img
            src={stickerRope}
            alt=""
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-8 w-48 rotate-[15deg] hidden sm:block"
          />
          <p className="label-condensed text-coral text-sm">First event support</p>
          <h2 className="display-condensed text-coral text-4xl sm:text-6xl mt-3 max-w-[16ch]">
            Walk into the room knowing what to expect.
          </h2>
          <div className="prose-doc mt-6">
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
          <p className="mt-6 max-w-2xl border-l-2 border-coral/50 pl-4 text-sm text-plum/75">
            Event accompaniment is educational and social support. It does not include sexual
            activity, kink play, topping, bottoming, dating, romantic companionship, or guaranteed
            introductions.
          </p>
          <div className="mt-8">
            <ButtonLink to="/services/kink-event-accompaniment">
              Learn about event support
            </ButtonLink>
          </div>
        </div>
      </Section>

      {/* 7. Process */}
      <Section wide ruled>
        <h2 className="font-display text-3xl sm:text-4xl text-plum text-center leading-[1.08]">
          No grand initiation. Just a useful next step.
        </h2>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="text-center">
              <p className="label-condensed text-coral text-sm">{s.n}</p>
              <h3 className="font-display text-2xl text-plum leading-tight mt-2">{s.title}</h3>
              <p className="prose-doc mx-auto mt-3 !text-base">{s.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 8. About preview */}
      <Section ruled>
        <p className="label-condensed text-coral text-sm">About</p>
        <h2 className="font-display text-3xl sm:text-[2.4rem] text-plum leading-[1.15] mt-3 max-w-[24ch]">
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
        <h2 className="display-condensed text-coral text-center text-4xl sm:text-6xl max-w-3xl mx-auto">
          Read this before asking strangers on the internet.
        </h2>
        <p className="prose-doc mx-auto mt-5 text-center !max-w-2xl">
          Straightforward guides to entering the kink scene, preparing for your first event,
          negotiating a scene, vetting people, aftercare, polyamory, and the unwritten rules
          beginners are expected to know.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {allGuides.map((g) => (
            <PinkCard key={g.slug} to={g.path} title={g.crumbLabel} body={g.description} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <ButtonLink to="/resources" variant="outline">
            Browse all beginner guides
          </ButtonLink>
        </div>
      </Section>

      {/* 10. FAQ */}
      <Section ruled>
        <h2 className="display-condensed text-coral text-4xl sm:text-6xl">Common questions</h2>
        <div className="mt-7">
          <FaqAccordion faqs={HOME_FAQS} withJsonLd />
        </div>
        <div className="mt-7">
          <TextLink to="/faq">Read the full FAQ</TextLink>
        </div>
      </Section>

      {/* 11. Email guide capture */}
      <Section wide ruled>
        <NewsletterSignup />
      </Section>

      {/* 12. Final CTA — mint panel */}
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
