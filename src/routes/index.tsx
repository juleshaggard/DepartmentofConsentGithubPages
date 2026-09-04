import { useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { MeetJulesCoachingSection } from "@/components/marketing/MeetJulesCoachingSection";
import { ButtonLink, Section } from "@/components/marketing/primitives";
import type { LinkProps } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import heroImg from "../../assets/hero.jpg";
import heroLogo from "../../assets/Logo.svg";
import eventImg from "../../assets/Photo1.jpg";
import coachingImg from "../../assets/Photo2.jpg";
import prepImg from "../../assets/Photo3.jpg";
import ctaBackgroundImg from "../../assets/bottomcta.jpg";
import prepCardImg from "@/assets/card-flogger.jpg";
import stickerFeather from "@/assets/sticker-feather-flat.png";
import { loadHomepageData } from "@/lib/homepage-data";
import { HomepageTestPending, NewHomepage } from "@/routes/homepage-test";

export const Route = createFileRoute("/")({
  loader: loadHomepageData,
  staleTime: 60_000,
  pendingComponent: HomepageTestPending,
  head: () =>
    pageHead({
      title: "Kink Coaching for Beginners | Department of Consent",
      description:
        "Practical kink coaching for adults ready to move from curiosity into real-world exploration. Virtual sessions and San Francisco event support.",
      path: "/",
    }),
  component: CurrentHomepage,
});

function CurrentHomepage() {
  const data = Route.useLoaderData();

  return <NewHomepage data={data} />;
}

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
    body: "For select San Francisco Bay Area events, attend with Jules as a knowledgeable, platonic guide who can explain the space and help you find your footing.",
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
  "Want to know how to explore kink without walking in blind?",
  "Department of Consent offers education, private coaching, and nonsexual event support for adults ready for their first real steps.",
] as const;

type Testimonial = {
  quote: string;
  attribution: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "I spent two years reading forums and AO3 at 2am. Now I have a partner I actually explore with, and the stuff I used to just read about, we do on Saturdays. Then mac and cheese for aftercare.",
    attribution: "Coaching client, 34F Marin",
  },
  {
    quote:
      "Jules came to my first play party as my anchor. We set intentions before, they held down home base while I went and was brave, and the debrief after helped me more than the party did.",
    attribution: "Event accompaniment client, 55M San Francisco",
  },
];

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
          Kink coaching for beginners
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

export function OriginalHomepage() {
  const mainRef = useRef<HTMLDivElement>(null);
  const marqueeTrackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(".testimonial-card", {
        y: 24,
        opacity: 0,
        duration: 0.65,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".testimonial-grid", start: "top 84%", once: true },
      });

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
      <TestimonialsSection />

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
        />
      </section>

      <MeetJulesCoachingSection
        cta={
          <ButtonLink
            to="/coaching"
            className="!border-[#1B1B1B] !bg-[#1B1B1B] !px-10 !py-3 hover:!bg-coral hover:!border-coral"
          >
            Expert coaching
          </ButtonLink>
        }
      />

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

function TestimonialsSection() {
  return (
    <Section wide className="relative z-10 bg-white !py-8 sm:!py-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="sr-only">Client testimonials</h2>
        <div className="testimonial-grid mx-auto grid max-w-4xl gap-5 py-6 md:grid-cols-2 md:gap-0 md:divide-x md:divide-plum/10">
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.attribution} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </Section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="testimonial-card text-plum md:px-6 md:first:pl-0 md:last:pr-0">
      <blockquote className="font-display text-[0.98rem] leading-[1.35] text-plum/86 sm:text-[1.05rem]">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <p className="label-condensed mt-4 text-[0.66rem] leading-tight text-coral sm:text-[0.7rem]">
        <span aria-hidden="true">&mdash; </span>
        {testimonial.attribution}
      </p>
    </article>
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
}: {
  image: string;
  title: string;
  to: LinkProps["to"];
  label: string;
  position: string;
  layerIndex: number;
}) {
  return (
    <section
      className="image-band relative min-h-[100svh] overflow-hidden bg-plum md:min-h-[100dvh]"
      style={{ zIndex: layerIndex }}
    >
      <img
        src={image}
        alt=""
        aria-hidden
        className={`absolute inset-0 h-full w-full object-cover ${position}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B1B]/68 via-[#1B1B1B]/20 to-[#1B1B1B]/22" />
      <div className="image-band-copy relative z-10 flex min-h-[100svh] items-center justify-center px-5 py-20 text-center sm:px-12 md:min-h-[100dvh]">
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
