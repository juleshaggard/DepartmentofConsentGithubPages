import { useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { ButtonLink, Section } from "@/components/marketing/primitives";
import type { LinkProps } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import heroImg from "../../assets/hero.jpg";
import heroLogo from "../../assets/Logo.svg";
import meetJulesImg from "../../assets/meetjules.jpg";
import polyIcon from "../../assets/poly.png";
import eventImg from "../../assets/Photo1.jpg";
import coachingImg from "../../assets/Photo2.jpg";
import prepImg from "../../assets/Photo3.jpg";
import ctaBackgroundImg from "../../assets/bottomcta.jpg";
import prepCardImg from "@/assets/card-flogger.jpg";
import stickerFeather from "@/assets/sticker-feather-flat.png";

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
    headline: "You do not have to figure this out alone.",
    body: "Ask the beginner questions before your first conversation, event, scene, or open relationship without pretending you know more than you do.",
  },
  {
    headline: "Kink has an instruction manual.",
    body: "The rules are rarely written down. Etiquette, vetting, negotiation, boundaries, safety, communication, and aftercare can be learned before something goes wrong.",
  },
  {
    headline: "Consent is only the beginning.",
    body: "A clear yes matters. Good kink also takes preparation, judgment, self-knowledge, communication, care, and the confidence to change your mind.",
  },
] as const;

type ServiceCardData = {
  title: string;
  to: LinkProps["to"];
  body?: string;
  image?: string;
  centered?: boolean;
  largeTitle?: boolean;
  sticker?: string;
  stickerClassName?: string;
};

const SERVICE_CARDS: ServiceCardData[] = [
  {
    title: "First Kink Scene Prep",
    to: "/guides/how-to-negotiate-your-first-scene",
    image: prepCardImg,
  },
  {
    title: "Kink Event Accompaniment",
    to: "/services/kink-event-accompaniment",
    body: "For select San Francisco Bay Area events, attend with Jules Holloway as a knowledgeable, platonic guide who can explain the space and help you find your footing.",
  },
  {
    title: "Polyamory Coaching for Beginners",
    to: "/services/polyamory-coaching-for-beginners",
    centered: true,
    largeTitle: true,
    sticker: polyIcon,
    stickerClassName: "right-2 bottom-4 w-28 rotate-[3deg] opacity-95 sm:w-34",
  },
  {
    title: "Beginner BDSM Coaching",
    to: "/services/beginner-bdsm-coaching",
    centered: true,
    largeTitle: true,
    sticker: stickerFeather,
    stickerClassName: "-right-2 bottom-4 w-32 rotate-[-13deg] sm:w-40",
  },
];

const HERO_CIRCLE_SENTENCE_GAP = "     ";
const HERO_CIRCLE_COPY = `Virtual Coaching.${HERO_CIRCLE_SENTENCE_GAP}San Francisco Based.${HERO_CIRCLE_SENTENCE_GAP}Event Support.${HERO_CIRCLE_SENTENCE_GAP}Beginner Kink Coaching.${HERO_CIRCLE_SENTENCE_GAP}`;
const HERO_CIRCLE_COPY_INDEXES = Array.from({ length: 18 }, (_, index) => index - 2);
const HERO_CIRCLE_PREVIOUS_FULL_PATH_DURATION = 36;
const HERO_CIRCLE_SPEED_RATIO = 0.1;
const HERO_CIRCLE_FALLBACK_SEGMENT_PERCENT = 12;
const SERVICE_MARQUEE_SET_COUNT = 4;

const SECTION_TWO_PARAGRAPHS = [
  "Want to know how to explore kink or polyamory without walking in blind?",
  "Department of Consent offers education, private coaching, and nonsexual event support for adults ready for their first real steps.",
] as const;

const CTA_QUESTIONS = [
  "How do I figure out what I'm into?",
  "How do I know if I'm a Dom, sub, switch, or something else?",
  "What happens at my first play party?",
  "What do I wear to a kink event?",
  "How do I approach someone at a play party?",
  "How do I know if someone is safe to play with?",
  "Can you help me prepare for my first kink event?",
  "Can you come with me to my first kink event?",
  "What are the biggest red flags in the kink community?",
  "How do I negotiate my first scene?",
  "What should I say before a scene starts?",
  "How do I say no without feeling guilty?",
  "How do I introduce kink to my partner?",
  "What if my partner isn't into kink?",
  "How do I prepare for my first scene?",
  "What's the safest way to explore BDSM as a beginner?",
  "How do I avoid making embarrassing beginner mistakes?",
  "What are the unwritten rules of the kink community?",
  "How do I find beginner-friendly events?",
  "How do I make friends in the kink community?",
  "How do I know if I'm ready for a play party?",
  "What gear do I need (and what can wait)?",
  "How do I build confidence before my first event?",
  "How do I write a FetLife profile that represents me?",
  "How do I recover after an awkward or bad first experience?",
  "How do I become part of the community instead of just attending events?",
  "Can you review my negotiation before I send it?",
  "Can you help me decide whether this person is a red flag?",
  "How do I go from kink-curious to kink-confident?",
] as const;

function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const intro = gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".hero-line", { yPercent: 112, duration: 0.85, stagger: 0.12 }, 0.12)
        .from(".hero-sub", { y: 20, opacity: 0, duration: 0.65 }, "-=0.4")
        .from(".hero-chrome", { opacity: 0, duration: 0.5 }, "-=0.35")
        .from(".hero-circle-wrap", { opacity: 0, y: 18, duration: 0.6 }, "-=0.25");

      const circlePaths = gsap.utils.toArray<SVGTextPathElement>(".hero-circle-path");
      const pathShape = ref.current?.querySelector<SVGPathElement>("#hero-circle-text-path");
      const firstSegment = ref.current?.querySelector<SVGTextElement>(".hero-circle-segment");
      const textAdvance = firstSegment?.getComputedTextLength() ?? 0;
      const pathLength = pathShape?.getTotalLength() ?? 0;

      if (circlePaths.length > 0) {
        const hasMeasuredText = textAdvance > 0 && pathLength > 0;
        const copyDuration = hasMeasuredText
          ? (textAdvance / pathLength) *
            (HERO_CIRCLE_PREVIOUS_FULL_PATH_DURATION / HERO_CIRCLE_SPEED_RATIO)
          : (HERO_CIRCLE_PREVIOUS_FULL_PATH_DURATION / HERO_CIRCLE_SPEED_RATIO) *
            (HERO_CIRCLE_FALLBACK_SEGMENT_PERCENT / 100);

        gsap.set(circlePaths, {
          attr: {
            startOffset: (_index, target: SVGTextPathElement) =>
              hasMeasuredText
                ? Number(target.dataset.copyIndex) * textAdvance
                : `${Number(target.dataset.copyIndex) * HERO_CIRCLE_FALLBACK_SEGMENT_PERCENT}%`,
          },
        });

        gsap.to(circlePaths, {
          attr: {
            startOffset: (_index, target: SVGTextPathElement) =>
              hasMeasuredText
                ? (Number(target.dataset.copyIndex) - 1) * textAdvance
                : `${(Number(target.dataset.copyIndex) - 1) * HERO_CIRCLE_FALLBACK_SEGMENT_PERCENT}%`,
          },
          duration: copyDuration,
          ease: "none",
          repeat: -1,
          delay: intro.duration() * 0.45,
        });
      }
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-plum">
      <img
        src={heroImg}
        alt="Four friends sitting close together, laughing"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-[50%_28%]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B1B]/65 via-[#1B1B1B]/10 to-[#1B1B1B]/25" />

      <div className="hero-chrome relative z-10 flex items-start justify-between gap-4 px-5 pt-5 sm:px-8">
        <Link to="/" aria-label="Department of Consent - Home" className="block">
          <img
            src={heroLogo}
            alt="Department of Consent"
            className="h-9 w-auto brightness-0 invert sm:h-10"
          />
        </Link>
        <a
          href={siteConfig.bookingLinks.discoveryCall}
          aria-label="Book a Free Coaching Session"
          className="btn-editorial shrink-0 !px-3 !py-2 sm:!px-5 sm:!py-2.5"
        >
          <span className="sm:hidden">Free session</span>
          <span className="hidden sm:inline">Book a Free Coaching Session</span>
        </a>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[92rem] flex-1 flex-col items-center justify-center px-5 pb-36 pt-12 text-center sm:px-8 sm:pb-44 lg:pb-48">
        <h1 className="display-condensed w-full text-white text-[clamp(2.25rem,10.5vw,7.5rem)] leading-[0.88] drop-shadow-[0_1px_2px_rgb(27_27_27_/_0.16)] sm:text-[clamp(3.8rem,8.4vw,9rem)]">
          <span className="block overflow-hidden">
            <span className="hero-line block whitespace-nowrap">From kink&#8211;curious</span>
          </span>
          <span className="block overflow-hidden">
            <span className="hero-line block whitespace-nowrap">to kink&#8211;confident.</span>
          </span>
        </h1>
        <p className="hero-sub font-display text-white text-xl sm:text-[clamp(1.4rem,2.2vw,2.6rem)] mt-4 drop-shadow-[0_1px_2px_rgb(27_27_27_/_0.16)]">
          Kink and polyamory coaching for beginners
        </p>
      </div>

      <RotatingCircleText />
    </section>
  );
}

function RotatingCircleText() {
  return (
    <div
      className="hero-circle-wrap pointer-events-none absolute inset-x-0 bottom-0 z-10 h-44 overflow-hidden sm:h-48 lg:h-56"
      aria-label="Virtual coaching. San Francisco based."
    >
      <svg
        className="absolute bottom-0 left-1/2 h-full w-[52rem] -translate-x-1/2 overflow-visible sm:w-[86rem] lg:w-[100rem]"
        viewBox="0 0 1400 320"
        role="presentation"
        focusable="false"
      >
        <defs>
          <path
            id="hero-circle-text-path"
            d="M 700 3760 m -3600 0 a 3600 3600 0 1 1 7200 0 a 3600 3600 0 1 1 -7200 0"
          />
        </defs>
        {HERO_CIRCLE_COPY_INDEXES.map((copyIndex) => (
          <text key={copyIndex} className="hero-circle-text hero-circle-segment" aria-hidden="true">
            <textPath
              className="hero-circle-path"
              data-copy-index={copyIndex}
              href="#hero-circle-text-path"
              xmlSpace="preserve"
              startOffset={`${copyIndex * 12}%`}
            >
              {HERO_CIRCLE_COPY}
            </textPath>
          </text>
        ))}
      </svg>
    </div>
  );
}

function HomePage() {
  const mainRef = useRef<HTMLDivElement>(null);
  const marqueeTrackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(".svc-card", {
        opacity: 0,
        duration: 0.45,
        ease: "power3.out",
        stagger: 0.035,
        scrollTrigger: { trigger: ".svc-marquee", start: "top 82%", once: true },
      });

      const track = marqueeTrackRef.current;
      const firstSet = track?.querySelector<HTMLElement>("[data-marquee-set='0']");
      const distance = firstSet?.getBoundingClientRect().width ?? 0;

      if (track && distance > 0) {
        gsap.set(track, { x: 0, force3D: true });
        gsap.to(track, {
          x: -distance,
          duration: Math.max(20, distance / 44),
          ease: "none",
          repeat: -1,
          scrollTrigger: {
            trigger: ".svc-marquee",
            start: "top bottom",
            end: "bottom top",
            toggleActions: "play pause resume pause",
          },
        });
      }

      gsap.utils.toArray<HTMLElement>(".image-band-copy").forEach((copy) => {
        const section = copy.closest<HTMLElement>(".image-band");
        if (!section || copy.dataset.staticCopy === "true") return;

        gsap.fromTo(
          copy,
          { y: 0 },
          {
            y: () => -window.innerHeight,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".artboard-rise", mainRef.current!).forEach((el) => {
        gsap.from(el, {
          y: 26,
          opacity: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
    },
    { scope: mainRef },
  );

  return (
    <MarketingLayout hero={<Hero />} mainRef={mainRef}>
      <Section wide className="!py-16 sm:!py-24">
        <div className="mx-auto max-w-xl space-y-7 font-display text-2xl leading-[1.35] text-coral sm:text-[2.05rem]">
          {SECTION_TWO_PARAGRAPHS.map((paragraph) => (
            <p key={Array.isArray(paragraph) ? paragraph.join(" ") : paragraph}>
              {Array.isArray(paragraph)
                ? paragraph.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))
                : paragraph}
            </p>
          ))}
        </div>
      </Section>

      <Section wide className="!pt-4 !pb-16 sm:!pb-24">
        <h2 className="artboard-rise display-condensed text-coral text-center text-[clamp(3.8rem,12vw,8.2rem)] leading-[0.82] max-w-5xl mx-auto">
          Start where you are.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-center font-semibold text-plum leading-snug">
          Bring the questions you already have. We can sort out vocabulary, identity, and next steps
          together.
        </p>

        <div className="svc-marquee mx-[calc(50%-50vw)] mt-11 pb-10 motion-reduce:overflow-x-auto">
          <div
            ref={marqueeTrackRef}
            className="svc-row flex w-max will-change-transform motion-reduce:will-change-auto"
          >
            {Array.from({ length: SERVICE_MARQUEE_SET_COUNT }, (_, setIndex) => (
              <div
                key={setIndex}
                data-marquee-set={setIndex}
                className="flex items-start gap-5 pr-5"
                aria-hidden={setIndex !== 0}
              >
                {SERVICE_CARDS.map((card) => (
                  <ServiceCard
                    key={`${setIndex}-${card.title}`}
                    card={card}
                    duplicate={setIndex !== 0}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </Section>

      <section className="relative isolate">
        <ImageBand
          image={eventImg}
          title="Event Support"
          to="/services/kink-event-accompaniment"
          label="Learn more"
          position="object-[50%_50%]"
          layerIndex={1}
        />
        <ImageBand
          image={coachingImg}
          title="Expert Coaching"
          to="/coaching"
          label="Learn more"
          position="object-[36%_50%]"
          layerIndex={2}
        />
        <ImageBand
          image={prepImg}
          title="First Scene Preparation"
          to="/guides/how-to-negotiate-your-first-scene"
          label="Learn more"
          position="object-[30%_50%]"
          layerIndex={3}
          staticCopy
        />
      </section>

      <Section wide className="relative z-10 bg-white !pb-0 !pt-0">
        <QuestionScroll />
      </Section>

      <Section wide className="relative z-10 bg-white !pb-16 !pt-0 sm:!pb-24 sm:!pt-0">
        <div className="mx-auto text-center">
          <div className="relative mx-auto flex flex-col items-center">
            <h2 className="meet-jules-title artboard-rise display-condensed text-coral text-center text-[clamp(5.6rem,18vw,15.5rem)]">
              <span className="block">Meet</span>
              <span className="block">Jules</span>
            </h2>
            <div className="relative z-10 mt-2 w-[min(23.125rem,78vw)] overflow-hidden rounded-[1.15rem] shadow-sm sm:mt-[clamp(1rem,2vw,2rem)]">
              <img
                src={meetJulesImg}
                alt="Jules coaching a client in conversation"
                className="aspect-[370/247] w-full object-cover"
              />
            </div>
          </div>

          <p className="mx-auto mt-8 max-w-[45rem] font-display text-[clamp(1.45rem,2.25vw,2rem)] leading-[1.18] text-plum">
            <strong className="block">Skip years of awkward mistakes.</strong>
            <span className="block">Learn the unwritten rules of kink before you need them.</span>
          </p>
        </div>

        <div className="mx-auto mt-4 max-w-[68rem] bg-white/62 px-5 py-7 text-left sm:px-10 sm:py-8">
          <div className="grid gap-8 md:grid-cols-3 md:gap-11">
            {PILLARS.map((pillar, index) => (
              <article key={pillar.headline}>
                <p className="label-condensed text-xs text-coral">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-display text-[1.55rem] leading-[1.04] text-plum sm:text-[1.75rem]">
                  {pillar.headline}
                </h3>
                <p className="mt-4 font-display text-[0.94rem] leading-[1.34] text-plum/82">
                  {pillar.body}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <ButtonLink
            to="/coaching"
            className="!border-[#1B1B1B] !bg-[#1B1B1B] !px-10 !py-3 hover:!bg-coral hover:!border-coral"
          >
            Expert coaching
          </ButtonLink>
        </div>
      </Section>

      <Section wide className="relative z-10 bg-white !pt-0 !pb-12 sm:!pb-16">
        <div className="group relative mx-auto flex min-h-[30rem] w-full max-w-[22rem] flex-col justify-center overflow-hidden rounded-[1.35rem] bg-[#1B1B1B] px-5 py-6 text-center text-white shadow-[0_18px_60px_rgb(27_27_27_/_0.16)] sm:aspect-[1044/478] sm:min-h-0 sm:max-w-4xl sm:px-8 sm:py-10 md:px-12 md:py-12">
          <img
            src={ctaBackgroundImg}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full scale-105 object-cover object-[50%_42%] transition-transform duration-500 group-hover:scale-110"
          />
          <div className="relative z-10 mx-auto flex max-w-[50rem] flex-col items-center">
            <h2 className="display-condensed text-[3.05rem] leading-[0.86] text-white sm:text-[clamp(3.7rem,6.4vw,5.5rem)]">
              Your life is calling.
              <span className="block">Are you ready?</span>
            </h2>
            <ButtonLink to="/coaching" className="mt-6 w-full sm:w-auto sm:!px-10">
              Book a Free Coaching Session
            </ButtonLink>
          </div>
        </div>
      </Section>
    </MarketingLayout>
  );
}

function QuestionScroll() {
  const scrollingQuestions = [...CTA_QUESTIONS, ...CTA_QUESTIONS];

  return (
    <div className="question-scroll mx-auto h-[38rem] max-w-5xl overflow-hidden sm:h-[46rem] lg:h-[50rem]">
      <h2 className="sr-only">Questions Department of Consent can help with</h2>
      <ul className="sr-only">
        {CTA_QUESTIONS.map((question) => (
          <li key={question}>{question}</li>
        ))}
      </ul>
      <div className="question-scroll-track" aria-hidden="true">
        {scrollingQuestions.map((question, index) => (
          <p key={`${question}-${index}`} className="question-scroll-item">
            {question}
          </p>
        ))}
      </div>
    </div>
  );
}

function ServiceCard({ card, duplicate }: { card: ServiceCardData; duplicate?: boolean }) {
  const tabIndex = duplicate ? -1 : undefined;

  if (card.image) {
    return (
      <Link
        to={card.to}
        tabIndex={tabIndex}
        aria-hidden={duplicate}
        className="svc-card group relative flex h-[28rem] w-[76vw] max-w-[18.5rem] shrink-0 flex-col items-center justify-center overflow-hidden rounded-[1.35rem] bg-plum px-6 py-7 text-center sm:w-[16.5rem] md:w-[17.5rem] xl:w-[18.5rem]"
      >
        <img
          src={card.image}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#1B1B1B]/45" />
        <h3 className="display-condensed relative text-[3.2rem] leading-[0.86] text-coral drop-shadow-[0_1px_2px_rgb(27_27_27_/_0.16)]">
          First
          <br />
          Kink
          <br />
          Scene
          <br />
          Prep
        </h3>
        <span className="card-arrow" aria-hidden>
          <ArrowRight className="h-4 w-4" />
        </span>
      </Link>
    );
  }

  return (
    <Link
      to={card.to}
      tabIndex={tabIndex}
      aria-hidden={duplicate}
      className={`svc-card group relative flex h-[28rem] w-[76vw] max-w-[18.5rem] shrink-0 flex-col overflow-hidden rounded-[1.35rem] bg-pinkcard px-6 pb-16 pt-7 sm:w-[16.5rem] md:w-[17.5rem] xl:w-[18.5rem] ${
        card.centered ? "items-center justify-center text-center" : ""
      }`}
    >
      <h3
        className={`display-condensed relative z-10 text-coral ${
          card.largeTitle
            ? "max-w-[16.25rem] text-[clamp(2.65rem,3.35vw,3.55rem)] leading-[0.86]"
            : "max-w-[15rem] text-2xl"
        }`}
      >
        {card.title}
      </h3>
      {card.body && (
        <p className="prose-doc relative z-10 mt-3 !text-[0.95rem] !leading-snug">{card.body}</p>
      )}
      {card.sticker && (
        <img
          src={card.sticker}
          alt=""
          aria-hidden
          className={`pointer-events-none absolute ${card.stickerClassName}`}
        />
      )}
      <span className="card-arrow" aria-hidden>
        <ArrowRight className="h-4 w-4" />
      </span>
    </Link>
  );
}

function ImageBand({
  image,
  title,
  to,
  label,
  position,
  layerIndex,
  staticCopy = false,
}: {
  image: string;
  title: string;
  to: LinkProps["to"];
  label: string;
  position: string;
  layerIndex: number;
  staticCopy?: boolean;
}) {
  return (
    <section
      className="image-band sticky top-0 min-h-[100dvh] overflow-hidden bg-plum"
      style={{ zIndex: layerIndex }}
    >
      <img
        src={image}
        alt=""
        aria-hidden
        className={`absolute inset-0 h-full w-full object-cover ${position}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B1B]/68 via-[#1B1B1B]/20 to-[#1B1B1B]/22" />
      <div
        className="image-band-copy relative z-10 flex min-h-[100dvh] items-center justify-center px-5 py-20 text-center will-change-transform sm:px-12"
        data-static-copy={staticCopy ? "true" : undefined}
      >
        <div className="mx-auto flex max-w-5xl flex-col items-center">
          <h2 className="display-condensed text-white text-[clamp(3.3rem,13vw,7.5rem)] leading-[0.86] drop-shadow-[0_1px_2px_rgb(27_27_27_/_0.16)]">
            {title}
          </h2>
          <Link to={to} className="btn-editorial mt-5 !px-5 !py-2.5">
            {label}
          </Link>
        </div>
      </div>
    </section>
  );
}
