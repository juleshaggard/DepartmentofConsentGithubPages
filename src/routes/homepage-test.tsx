import { useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import type { LinkProps } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { ButtonLink, Eyebrow, Section } from "@/components/marketing/primitives";
import { ProductGrid } from "@/components/shop/ProductCard";
import { FieldGuideCoverLink } from "@/components/guides/FieldGuideCoverLink";
import type { ProductSummary } from "@/lib/fourthwall/repository";
import { loadHomepageData, type HomepageData } from "@/lib/homepage-data";
import { KINK_IN_TEN_LISTEN_LINKS, type PodcastEpisode, type PodcastFeed } from "@/lib/kink-in-ten";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { pageHead } from "@/lib/seo";
import { allFieldGuides } from "@/lib/field-guides";
import heroImg from "../../assets/hero.jpg";
import ctaBackgroundImg from "../../assets/Photo2.jpg";
import prepCardImg from "@/assets/card-flogger.jpg";
import stickerFeather from "@/assets/sticker-feather-flat.png";

const TESTIMONIALS = [
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
] as const;

type CoachingOption = {
  title: string;
  description: string;
  to: LinkProps["to"];
  image?: string;
  centered?: boolean;
  largeTitle?: boolean;
  sticker?: string;
  stickerClassName?: string;
};

const COACHING_OPTIONS: CoachingOption[] = [
  {
    title: "Beginner Kink Coaching",
    description:
      "Figure out what you’re into, how you want to explore it, and how to talk about it with another person.",
    to: "/services/beginner-bdsm-coaching",
    centered: true,
    largeTitle: true,
    sticker: stickerFeather,
    stickerClassName: "-right-2 bottom-4 w-32 rotate-[-13deg] sm:w-40",
  },
  {
    title: "First Scene Preparation",
    description:
      "Prepare for the conversation before the scene, including interests, limits, signals, safety, intensity, and aftercare.",
    to: "/guides/how-to-negotiate-your-first-scene",
    image: prepCardImg,
  },
  {
    title: "Kink Event Support",
    description:
      "Know what to expect before your first event, or attend selected San Francisco Bay Area events with Jules Darling as a knowledgeable, platonic guide.",
    to: "/services/kink-event-accompaniment",
  },
];

const HERO_CIRCLE_SENTENCE_GAP = "     ";
const HERO_CIRCLE_COPY = `Virtual Coaching.${HERO_CIRCLE_SENTENCE_GAP}San Francisco Based.${HERO_CIRCLE_SENTENCE_GAP}Event Support.${HERO_CIRCLE_SENTENCE_GAP}Beginner Kink Coaching.${HERO_CIRCLE_SENTENCE_GAP}`;
const HERO_CIRCLE_COPY_INDEXES = Array.from({ length: 18 }, (_, index) => index - 2);
const HERO_CIRCLE_PREVIOUS_FULL_PATH_DURATION = 36;
const HERO_CIRCLE_SPEED_RATIO = 0.1;
const HERO_CIRCLE_FALLBACK_SEGMENT_PERCENT = 12;
const SERVICE_MARQUEE_SET_COUNT = 4;

export const Route = createFileRoute("/homepage-test")({
  loader: loadHomepageData,
  staleTime: 60_000,
  pendingComponent: HomepageTestPending,
  head: () =>
    pageHead({
      title: "Homepage Layout Test | Department of Consent",
      description:
        "A private layout test for the Department of Consent coaching, shop, guides, and podcast homepage.",
      path: "/homepage-test",
      noindex: true,
    }),
  component: HomepageTestPage,
});

export function HomepageTestPending() {
  return (
    <MarketingLayout>
      <Section wide className="min-h-[55vh] !pt-32 text-center">
        <p className="label-condensed text-sm text-coral">Loading homepage preview</p>
        <h1 className="mt-4 font-display text-4xl text-plum sm:text-6xl">Putting it together…</h1>
      </Section>
    </MarketingLayout>
  );
}

function HomepageTestHero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const intro = gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to(".test-hero-line", { y: 0, duration: 0.85, stagger: 0.12 }, 0.12)
        .to(".test-hero-detail", { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.08 }, "-=0.42")
        .to(".test-hero-circle-wrap", { autoAlpha: 1, y: 0, duration: 0.6 }, "-=0.25");

      const circlePaths = gsap.utils.toArray<SVGTextPathElement>(".test-hero-circle-path");
      const pathShape = ref.current?.querySelector<SVGPathElement>("#test-hero-circle-text-path");
      const firstSegment = ref.current?.querySelector<SVGTextElement>(".test-hero-circle-segment");
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
              (hasMeasuredText
                ? Number(target.dataset.copyIndex) * textAdvance
                : `${Number(target.dataset.copyIndex) * HERO_CIRCLE_FALLBACK_SEGMENT_PERCENT}%`) as unknown as number,
          },
        });
        gsap.to(circlePaths, {
          attr: {
            startOffset: (_index, target: SVGTextPathElement) =>
              (hasMeasuredText
                ? (Number(target.dataset.copyIndex) - 1) * textAdvance
                : `${(Number(target.dataset.copyIndex) - 1) * HERO_CIRCLE_FALLBACK_SEGMENT_PERCENT}%`) as unknown as number,
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
    <section
      ref={ref}
      className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-plum text-white"
    >
      <img
        src={heroImg}
        alt="Four friends sitting close together, laughing"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-[50%_28%]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B1B]/78 via-[#1B1B1B]/25 to-[#1B1B1B]/38" />

      <div className="relative z-10 mx-auto flex w-full max-w-[92rem] flex-1 flex-col items-center justify-center px-5 pb-40 pt-12 text-center sm:px-8 sm:pb-48 lg:pb-52">
        <p className="test-hero-detail label-condensed mb-4 text-[0.7rem] text-white/88 sm:text-xs">
          Kink coaching for beginners
        </p>
        <h1 className="display-condensed w-full text-[clamp(2.2rem,9.6vw,7rem)] leading-[0.88] text-white drop-shadow-[0_1px_2px_rgb(27_27_27_/_0.16)] sm:text-[clamp(3.5rem,7.8vw,8.1rem)]">
          <span className="block overflow-hidden">
            <span className="test-hero-line block whitespace-nowrap">From kink&#8211;curious</span>
          </span>
          <span className="block overflow-hidden">
            <span className="test-hero-line block whitespace-nowrap">to kink&#8211;confident.</span>
          </span>
        </h1>
        <p className="test-hero-detail mt-5 max-w-2xl font-display text-sm leading-relaxed text-white drop-shadow-[0_1px_2px_rgb(27_27_27_/_0.2)] sm:text-base">
          Get practical help figuring out what you want, preparing for your first scene or event,
          and learning the unwritten rules of kink before you have to learn them the hard way.
        </p>
        <div className="test-hero-detail mt-6 flex justify-center">
          <Link to="/coaching" className="btn-editorial">
            <span>Explore Coaching</span>
          </Link>
        </div>
      </div>

      <RotatingCircleText />
    </section>
  );
}

function RotatingCircleText() {
  return (
    <div
      className="test-hero-circle-wrap pointer-events-none absolute inset-x-0 bottom-0 z-10 h-44 overflow-hidden sm:h-48 lg:h-56"
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
            id="test-hero-circle-text-path"
            d="M 700 3760 m -3600 0 a 3600 3600 0 1 1 7200 0 a 3600 3600 0 1 1 -7200 0"
          />
        </defs>
        {HERO_CIRCLE_COPY_INDEXES.map((copyIndex) => (
          <text
            key={copyIndex}
            className="hero-circle-text test-hero-circle-segment"
            aria-hidden="true"
          >
            <textPath
              className="test-hero-circle-path"
              data-copy-index={copyIndex}
              href="#test-hero-circle-text-path"
              xmlSpace="preserve"
              startOffset={`${copyIndex * HERO_CIRCLE_FALLBACK_SEGMENT_PERCENT}%`}
            >
              {HERO_CIRCLE_COPY}
            </textPath>
          </text>
        ))}
      </svg>
    </div>
  );
}

function HomepageTestPage() {
  const data = Route.useLoaderData();

  return <NewHomepage data={data} />;
}

export function NewHomepage({ data }: { data: HomepageData }) {
  const mainRef = useRef<HTMLDivElement>(null);
  const marqueeTrackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.to(".test-testimonial-card", {
        y: 0,
        autoAlpha: 1,
        duration: 0.65,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".test-testimonial-grid", start: "top 84%", once: true },
      });

      const track = marqueeTrackRef.current;
      const firstSet = track?.querySelector<HTMLElement>("[data-homepage-marquee-set='0']");
      const distance = firstSet?.getBoundingClientRect().width ?? 0;
      if (track && distance > 0) {
        gsap.set(track, { x: 0, force3D: true });
        gsap.to(track, {
          x: -distance,
          duration: Math.max(22, distance / 42),
          ease: "none",
          repeat: -1,
          scrollTrigger: {
            trigger: ".test-service-marquee",
            start: "top bottom",
            end: "bottom top",
            toggleActions: "play pause resume pause",
          },
        });
      }

      gsap.utils.toArray<HTMLElement>(".test-section-rise", mainRef.current!).forEach((element) => {
        gsap.to(element, {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 88%", once: true },
        });
      });
    },
    { scope: mainRef },
  );

  return (
    <MarketingLayout hero={<HomepageTestHero />} mainRef={mainRef} navOverHero>
      <TestimonialsSection />
      <CoachingSection marqueeTrackRef={marqueeTrackRef} />
      <ShopSection products={data.products} available={data.shopAvailable} />
      <GuidesSection />
      <PodcastSection podcast={data.podcast} />
      <BrandStatement />
    </MarketingLayout>
  );
}

function TestimonialsSection() {
  return (
    <Section wide className="relative z-10 bg-white !py-8 sm:!py-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="sr-only">Client testimonials</h2>
        <div className="test-testimonial-grid mx-auto grid max-w-4xl gap-5 py-6 md:grid-cols-2 md:gap-0 md:divide-x md:divide-plum/10">
          {TESTIMONIALS.map((testimonial) => (
            <article
              key={testimonial.attribution}
              className="test-testimonial-card text-plum md:px-6 md:first:pl-0 md:last:pr-0"
            >
              <blockquote className="font-display text-sm leading-[1.4] text-plum/86 sm:text-base">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <p className="label-condensed mt-4 text-[0.66rem] leading-tight text-coral sm:text-[0.7rem]">
                <span aria-hidden="true">&mdash; </span>
                {testimonial.attribution}
              </p>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}

function CoachingSection({
  marqueeTrackRef,
}: {
  marqueeTrackRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <Section wide className="!pb-20 !pt-20 sm:!pb-28 sm:!pt-28">
      <div className="test-section-rise mx-auto max-w-3xl text-center">
        <h2 className="display-condensed text-[clamp(3.7rem,10vw,7.6rem)] leading-[0.84] text-coral">
          Start where you are.
        </h2>
        <div className="mx-auto mt-7 max-w-2xl space-y-4 font-display text-base leading-relaxed text-plum/82 sm:text-lg">
          <p>
            You do not need to know the right words or have everything figured out before asking for
            help.
          </p>
          <p>
            Bring the questions you already have. We’ll sort through what you want, what you don’t,
            what to watch for, and what your next step could look like.
          </p>
        </div>
      </div>

      <div className="test-service-marquee mx-[calc(50%-50vw)] mt-12 overflow-hidden pb-8 motion-reduce:overflow-x-auto">
        <div
          ref={marqueeTrackRef}
          className="flex w-max will-change-transform motion-reduce:will-change-auto"
        >
          {Array.from({ length: SERVICE_MARQUEE_SET_COUNT }, (_, setIndex) => (
            <div
              key={setIndex}
              data-homepage-marquee-set={setIndex}
              className="flex items-start gap-5 pr-5"
              aria-hidden={setIndex !== 0}
            >
              {COACHING_OPTIONS.map((option) => (
                <CoachingCard
                  key={`${setIndex}-${option.title}`}
                  option={option}
                  duplicate={setIndex !== 0}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 text-center">
        <ButtonLink to="/coaching">Explore Coaching Options</ButtonLink>
      </div>
    </Section>
  );
}

function CoachingCard({ option, duplicate }: { option: CoachingOption; duplicate: boolean }) {
  if (option.image) {
    return (
      <Link
        to={option.to}
        tabIndex={duplicate ? -1 : undefined}
        aria-hidden={duplicate}
        className="group relative flex h-[28rem] w-[76vw] max-w-[18.5rem] shrink-0 flex-col items-center justify-center overflow-hidden rounded-[1.35rem] bg-plum px-6 py-7 text-center sm:w-[16.5rem] md:w-[17.5rem] xl:w-[18.5rem]"
      >
        <img
          src={option.image}
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
      to={option.to}
      tabIndex={duplicate ? -1 : undefined}
      aria-hidden={duplicate}
      className={`group relative flex h-[28rem] w-[76vw] max-w-[18.5rem] shrink-0 flex-col overflow-hidden rounded-[1.35rem] bg-pinkcard px-6 pb-16 pt-7 sm:w-[16.5rem] md:w-[17.5rem] xl:w-[18.5rem] ${
        option.centered ? "items-center justify-center text-center" : ""
      }`}
    >
      <h3
        className={`display-condensed relative z-10 text-coral ${
          option.largeTitle
            ? "max-w-[16.25rem] text-[clamp(2.65rem,3.35vw,3.55rem)] leading-[0.86]"
            : "max-w-[15rem] text-2xl"
        }`}
      >
        {option.title}
      </h3>
      {!option.centered && (
        <p className="prose-doc relative z-10 mt-3 !text-[0.95rem] !leading-snug">
          {option.description}
        </p>
      )}
      {option.sticker && (
        <img
          src={option.sticker}
          alt=""
          aria-hidden
          className={`pointer-events-none absolute ${option.stickerClassName}`}
        />
      )}
      <span className="card-arrow" aria-hidden>
        <ArrowRight className="h-4 w-4" />
      </span>
    </Link>
  );
}

function ShopSection({ products, available }: { products: ProductSummary[]; available: boolean }) {
  return (
    <Section wide className="bg-white !py-20 sm:!py-28">
      <div className="test-section-rise mx-auto mb-12 max-w-3xl text-center">
        <Eyebrow>The Shop</Eyebrow>
        <h2 className="font-display text-[clamp(2.25rem,4.2vw,3.75rem)] leading-[1.02] text-plum">
          Wear your devotion.
        </h2>
        <div className="mx-auto mt-7 max-w-2xl space-y-4 font-display text-base leading-relaxed text-plum/78 sm:text-lg">
          <p>
            Handmade leather collars, impact toys, accessories, and apparel designed for play,
            display, and everything that happens after.
          </p>
          <p>
            Made in San Francisco from full-grain leather and hardware chosen to be used, not just
            looked at.
          </p>
        </div>
      </div>

      {available && products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <div className="mx-auto max-w-2xl border-y border-plum/15 py-10 text-center" role="status">
          <p className="font-display text-xl text-plum">The shop preview is taking a moment.</p>
          <p className="mt-2 text-sm text-plum/68">
            The full collection is still available in the shop.
          </p>
        </div>
      )}

      <div className="mt-12 text-center">
        <ButtonLink to="/shop">Shop the Collection</ButtonLink>
      </div>
    </Section>
  );
}

function GuidesSection() {
  const newestGuide = allFieldGuides.at(-1);

  return (
    <Section wide className="!py-20 sm:!py-28">
      {newestGuide && (
        <div className="test-section-rise mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[minmax(16rem,0.82fr)_minmax(0,1.18fr)] md:gap-14 lg:gap-20">
          <div className="mx-auto w-full max-w-[27rem] md:mx-0">
            <FieldGuideCoverLink
              guide={newestGuide}
              loading="eager"
              showPageStack
              showCaption={false}
            />
          </div>
          <div className="text-center md:text-left">
            <Eyebrow>Newest field manual</Eyebrow>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.6rem)] leading-[0.98] text-plum">
              Field manuals for kink.
            </h2>
            <div className="mt-6 space-y-4 font-display text-base leading-relaxed text-plum/78 sm:text-lg">
              <p>Visual guides to bodies, objects, power, ritual, consent, and desire.</p>
              <p>
                Each manual explores one part of kink through practical ideas, cultural
                observations, and original imagery.
              </p>
            </div>
            <ButtonLink to="/guides" className="mt-8">
              Explore the Guides
            </ButtonLink>
          </div>
        </div>
      )}
    </Section>
  );
}

function formatEpisodeDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.valueOf())) return "";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function formatEpisodeDuration(seconds: number | null) {
  if (seconds === null) return "";
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

function episodeMeta(episode: PodcastEpisode) {
  return [
    episode.episodeNumber ? `Episode ${episode.episodeNumber}` : "",
    formatEpisodeDate(episode.publishedAt),
    formatEpisodeDuration(episode.durationSeconds),
  ]
    .filter(Boolean)
    .join(" · ");
}

function PodcastSection({ podcast }: { podcast: PodcastFeed | null }) {
  const latestEpisode = podcast?.episodes[0] ?? null;

  return (
    <Section wide className="bg-white !py-20 sm:!py-24">
      <div className="test-section-rise mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-[1.5rem] bg-[#1B1B1B] px-6 py-9 text-white sm:px-10 sm:py-10 lg:px-14">
          {latestEpisode && podcast ? (
            <div className="grid gap-7 sm:grid-cols-[11rem_minmax(0,1fr)] sm:items-center sm:gap-9">
              {podcast.artworkUrl && (
                <a
                  href={latestEpisode.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mx-auto block w-full max-w-[14rem] overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-4 focus-visible:ring-offset-[#1B1B1B] sm:max-w-none"
                >
                  <img
                    src={podcast.artworkUrl}
                    alt="Kink in 10 podcast artwork"
                    width={1200}
                    height={1200}
                    loading="lazy"
                    decoding="async"
                    className="aspect-square w-full object-cover"
                  />
                </a>
              )}
              <article>
                <p className="label-condensed text-xs text-coral">Latest podcast episode</p>
                <p className="label-condensed mt-3 text-[0.68rem] text-white/48">
                  {episodeMeta(latestEpisode)}
                </p>
                <h3 className="mt-3 font-display text-2xl leading-tight text-white sm:text-3xl">
                  <a
                    href={latestEpisode.url}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-coral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
                  >
                    {latestEpisode.title}
                  </a>
                </h3>
                {latestEpisode.description && (
                  <p className="mt-4 line-clamp-3 max-w-2xl font-display text-sm leading-relaxed text-white/68 sm:text-base">
                    {latestEpisode.description}
                  </p>
                )}
              </article>
            </div>
          ) : (
            <div className="mx-auto max-w-2xl py-4 text-center" role="status">
              <p className="font-display text-lg text-white">
                The latest episode is taking a moment to load.
              </p>
            </div>
          )}

          <div className="mobile-action-stack mt-8 flex flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <Link to="/podcast" className="btn-editorial">
              <span>Listen to Kink in 10</span>
            </Link>
            <a
              href={podcast?.websiteUrl ?? "https://www.kinkin10.com/"}
              target="_blank"
              rel="noreferrer"
              className="btn-editorial btn-editorial-outline !border-white/60 !text-white"
            >
              <span>Podcast Website</span>
            </a>
          </div>
        </div>

        <div className="mt-6">
          <p className="label-condensed text-center text-[0.65rem] text-coral">
            Listen wherever you get podcasts
          </p>
          <ul
            className="mx-auto mt-3 grid max-w-4xl grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-center"
            aria-label="Podcast platforms"
          >
            {KINK_IN_TEN_LISTEN_LINKS.map((platform) => (
              <li key={platform.name}>
                <a
                  href={platform.href}
                  target="_blank"
                  rel="noreferrer"
                  className="label-condensed inline-flex min-h-10 w-full items-center gap-2 rounded-full border border-plum/16 bg-white px-3 py-2 text-[0.625rem] text-plum transition-colors hover:border-coral hover:bg-coral hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 sm:w-auto"
                >
                  <img
                    src={platform.logoUrl}
                    alt=""
                    width={24}
                    height={24}
                    loading="lazy"
                    decoding="async"
                    className="h-5 w-5 shrink-0 rounded-full object-cover"
                  />
                  <span>{platform.name}</span>
                  <span className="ml-auto sm:ml-0" aria-hidden>
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

function BrandStatement() {
  return (
    <section className="test-section-rise group relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#1B1B1B] px-5 py-8 text-center text-white sm:px-8 sm:py-10 md:px-12 md:py-12">
      <img
        src={ctaBackgroundImg}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full scale-105 object-cover object-[50%_42%] transition-transform duration-500 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-[#1B1B1B]/40" />
      <div className="relative z-10 mx-auto flex max-w-[50rem] flex-col items-center">
        <h2 className="display-condensed text-[3.05rem] leading-[0.86] text-white sm:text-[clamp(3.7rem,6.4vw,5.5rem)]">
          GET INTO KINK WITHOUT GUESSING YOUR WAY THROUGH IT.
        </h2>
        <ButtonLink to="/coaching" className="mt-6 w-full sm:w-auto sm:!px-10">
          Explore Coaching
        </ButtonLink>
      </div>
    </section>
  );
}
