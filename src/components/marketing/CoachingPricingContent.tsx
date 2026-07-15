import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Breadcrumbs, Container, Eyebrow, Section, TextLink } from "./primitives";
import { MarketingLayout } from "./MarketingLayout";
import { siteConfig } from "@/config/site";
import { trackBookingAction } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const bookingLinks = siteConfig.bookingLinks;

type PriceMeta = {
  prefix?: string;
  price: string;
  suffix?: string;
};

const coachingOptions = [
  {
    title: "Beginner BDSM Coaching",
    body: "Understand your interests, learn common terminology, prepare for real-world experiences, and build confidence without pretending to be experienced.",
    cta: "Explore beginner BDSM coaching",
    to: "/services/beginner-bdsm-coaching",
  },
  {
    title: "Polyamory Coaching for Beginners",
    body: "Think through motives, structures, agreements, autonomy, jealousy, dating, time, and the practical realities of opening a relationship.",
    cta: "Explore polyamory coaching",
    to: "/services/polyamory-coaching-for-beginners",
  },
  {
    title: "Kink Coach in San Francisco",
    body: "Work with Jules Holloway online, or ask about selected in-person services in San Francisco and Oakland.",
    cta: "Meet your San Francisco kink coach",
    to: "/services/kink-coach-san-francisco",
  },
  {
    title: "First Event Support",
    body: "Prepare for an event privately or ask about nonsexual event accompaniment.",
    cta: "Explore first event support",
    to: "/services/kink-event-accompaniment",
  },
] as const;

const faqItems = [
  {
    question: "Are all coaching sessions online?",
    answer:
      "Yes. All discovery calls, individual sessions, packages, event preparation sessions, and follow-up sessions take place online. Event Companion is the only in-person service.",
  },
  {
    question: "Where is Event Companion available?",
    answer:
      "Event Companion is available for approved events in San Francisco and Oakland. Availability depends on the event, location, date, timing, safety, and whether the service is a good fit.",
  },
  {
    question: "Is this therapy?",
    answer:
      "No. Coaching focuses on education, communication, confidence, skill-building, and clear answers. It is not psychotherapy, medical care, legal advice, or crisis support.",
  },
  {
    question: "Do I need any experience?",
    answer:
      "No. Most clients are new to kink or exploring it more intentionally for the first time.",
  },
  {
    question: "Is everything confidential?",
    answer:
      "Yes. I treat what you share with care and discretion. Coaching is not psychotherapy, and it does not create therapist-client privilege or medical confidentiality.",
  },
  {
    question: "Can I book Event Companion immediately?",
    answer:
      "No. Event Companion begins with a consultation so we can review the event, logistics, expectations, boundaries, and whether the service is a good fit.",
  },
  {
    question: "What happens after I book?",
    answer:
      "You’ll receive a confirmation email, calendar invitation, and video-call link. Any intake questions will be included during booking.",
  },
] as const;

export function CoachingPricingContent() {
  useEffect(() => {
    trackBookingAction("coaching_page_view");
  }, []);

  return (
    <MarketingLayout>
      <Container>
        <Breadcrumbs
          crumbs={[
            { label: "Home", path: "/" },
            { label: "Coaching", path: "/coaching" },
          ]}
        />
      </Container>

      <Section wide className="!pt-10 sm:!pt-14">
        <div className="mx-auto max-w-3xl">
          <Eyebrow>Coaching</Eyebrow>
          <h1 className="display-condensed text-coral text-4xl sm:text-6xl">
            Coaching designed for where you are now.
          </h1>
          <div className="prose-doc mt-6">
            <p>
              Most sessions happen online. Event Companion is the only in-person service, available
              for approved San Francisco and Oakland events.
            </p>
            <p>
              Bring the basic question, the half-formed curiosity, or the thing you are nervous to
              ask. We will choose the right next step from there.
            </p>
          </div>
        </div>
      </Section>

      <Section ruled>
        <PricingCard
          title="Free Discovery Call"
          meta={{ prefix: "20 minutes", price: "Free", suffix: "Online" }}
          body={[
            "Not sure where to start?",
            "Tell me what you want help with, where you feel stuck, and whether coaching fits.",
            "No pressure. No obligation.",
          ]}
          ctaLabel="Book a Discovery Call"
          href={bookingLinks.discoveryCall}
          eventName="discovery_call_click"
        />
      </Section>

      <Section wide ruled>
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <Eyebrow>Session Format</Eyebrow>
            <h2 className="display-condensed text-coral text-3xl sm:text-5xl">
              What a coaching session looks like.
            </h2>
          </div>
          <div className="prose-doc">
            <p>
              Sessions are conversational and structured. We name the situation, clarify the
              decision, and turn broad uncertainty into specific questions and next steps.
            </p>
            <p>
              You choose which details matter. Labels, events, relationships, and fantasies only
              enter the conversation when they help the decision in front of you.
            </p>
          </div>
        </div>
      </Section>

      <Section wide ruled>
        <div className="mx-auto grid w-full max-w-[44rem] gap-5 md:grid-cols-2">
          <PricingCard
            title="One Coaching Session"
            meta={{ prefix: "60 minutes", price: "$175", suffix: "Online" }}
            body={["A focused session for one specific question, challenge, or next step."]}
            bullets={[
              "Understanding your interests",
              "Negotiating a scene",
              "Vetting a partner",
              "Building confidence",
              "Event etiquette",
              "Consent conversations",
              "Relationship dynamics",
              "Finding your place in the community",
            ]}
            ctaLabel="Book a Session"
            href={bookingLinks.coachingSession}
            eventName="coaching_session_click"
            compact
          />
          <PricingCard
            title="Deep Dive Session"
            meta={{ prefix: "90 minutes", price: "$250", suffix: "Online" }}
            body={[
              "More time to sort through your goals, answer questions, and leave with a plan.",
              "This fits when you are new, overwhelmed, or holding several connected questions at once.",
            ]}
            ctaLabel="Book a Deep Dive"
            href={bookingLinks.deepDive}
            eventName="deep_dive_click"
            compact
          />
        </div>
      </Section>

      <Section wide ruled>
        <article className="relative overflow-hidden rounded-[1.35rem] bg-[#1B1B1B] px-6 py-8 text-white sm:px-10 sm:py-10">
          <div className="absolute right-5 top-5 rounded-full bg-mint px-4 py-2 label-condensed text-xs text-[#1B1B1B]">
            Most Popular
          </div>
          <div className="max-w-3xl">
            <p className="eyebrow mb-3 !text-mint">Most Popular</p>
            <h2 className="display-condensed text-coral text-3xl sm:text-5xl">
              Kink Curious to Kink Confident
            </h2>
            <PriceLine meta={{ prefix: "Three online sessions", price: "$475" }} tone="dark" />
            <div className="prose-doc mt-6 !text-white/86">
              <p>
                A beginner coaching package that moves you from “I don’t know where to start” toward
                safer, more confident exploration.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <PackageSession
              title="Session One: Understand what you want"
              tone="dark"
              items={[
                "Your interests",
                "Your boundaries",
                "Your concerns",
                "Consent foundations",
                "Safety basics",
              ]}
            />
            <PackageSession
              title="Session Two: Learn how to handle it"
              tone="dark"
              items={[
                "Finding community",
                "Vetting partners",
                "Negotiation",
                "Communication",
                "Red flags",
                "Community etiquette",
              ]}
            />
            <PackageSession
              title="Session Three: Put it into practice"
              tone="dark"
              items={[
                "Preparing for your first event or experience",
                "Managing nerves",
                "Asking for what you want",
                "Reviewing what you have learned",
                "Creating a personal roadmap",
              ]}
            />
          </div>

          <div className="mt-9 flex justify-center">
            <BookingButton
              href={bookingLinks.package}
              eventName="package_click"
              label="Start the Program"
            />
          </div>
        </article>
      </Section>

      <EventSupportPricingSection />

      <Section wide ruled>
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <Eyebrow>Frequently Asked Questions</Eyebrow>
            <h2 className="display-condensed text-coral text-3xl sm:text-5xl">
              Clear expectations before booking.
            </h2>
          </div>
          <div className="divide-y divide-plum/12 border-y border-plum/12">
            {faqItems.map((item) => (
              <article key={item.question} className="py-5">
                <h3 className="display-condensed text-2xl text-coral sm:text-3xl">
                  {item.question}
                </h3>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-plum/76">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section wide ruled>
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <Eyebrow>Coaching Paths</Eyebrow>
            <h2 className="display-condensed text-coral text-3xl sm:text-5xl">
              Choose the question you are bringing.
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {coachingOptions.map((option) => (
              <article
                key={option.title}
                className="flex flex-col rounded-[1.35rem] bg-white px-6 py-7 shadow-[0_16px_60px_rgb(27_27_27_/_0.045)] ring-1 ring-plum/8"
              >
                <h3 className="display-condensed text-2xl text-coral">{option.title}</h3>
                <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-plum/78">
                  {option.body}
                </p>
                <div className="mt-5">
                  <TextLink to={option.to}>{option.cta}</TextLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section wide ruled>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl leading-tight text-plum sm:text-5xl">
            Still not sure where to start?
          </h2>
          <p className="prose-doc mx-auto mt-4">
            Book a free discovery call and we’ll figure out the most useful next step.
          </p>
          <div className="mt-8">
            <BookingButton
              href={bookingLinks.discoveryCall}
              eventName="discovery_call_click"
              label="Book a Free Discovery Call"
            />
          </div>
        </div>
      </Section>
    </MarketingLayout>
  );
}

export function EventSupportPricingSection() {
  return (
    <Section wide ruled>
      <div className="mx-auto grid w-full max-w-[44rem] gap-5 md:grid-cols-2">
        <PricingCard
          title="First Event Preparation"
          meta={{ prefix: "90 minutes", price: "$225", suffix: "Online" }}
          body={[
            "Heading to your first munch, play party, workshop, or kink event?",
            "You’ll walk in knowing what to expect instead of wondering whether you’re doing everything wrong.",
          ]}
          bullets={[
            "What to wear",
            "What to bring",
            "How to introduce yourself",
            "Consent and etiquette",
            "How to approach people",
            "Managing nerves",
            "What happens at events",
            "How to leave or say no without awkwardness",
          ]}
          ctaLabel="Book Event Prep"
          href={bookingLinks.eventPrep}
          eventName="event_prep_click"
          compact
        />
        <PricingCard
          title="Event Companion"
          meta={{
            prefix: "Online preparation + up to three hours in person + online follow-up",
            price: "$795",
          }}
          body={[
            "Walking through the door can be the hardest part.",
            "We’ll meet online beforehand to prepare. I’ll then accompany you to an approved San Francisco or Oakland event, explain the space, answer questions, and help you move through the experience.",
            "Afterward, we’ll meet online again to process what happened and choose what comes next.",
            "Event Companion is available only after a consultation and is subject to event, location, timing, safety, and fit.",
          ]}
          ctaLabel="Ask About Event Companion"
          href={bookingLinks.eventCompanionInquiry}
          eventName="event_companion_inquiry_click"
          compact
        />
      </div>
    </Section>
  );
}

function PricingCard({
  eyebrow,
  title,
  meta,
  body,
  bullets,
  ctaLabel,
  href,
  eventName,
  compact = false,
}: {
  eyebrow?: string;
  title: string;
  meta: PriceMeta;
  body: string[];
  bullets?: string[];
  ctaLabel: string;
  href: string;
  eventName: Parameters<typeof trackBookingAction>[0];
  compact?: boolean;
}) {
  return (
    <article
      className={cn(
        "rounded-[1.35rem] bg-white px-6 py-7 shadow-[0_16px_60px_rgb(27_27_27_/_0.045)] ring-1 ring-plum/8",
        compact ? "flex flex-col" : "mx-auto max-w-3xl",
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="display-condensed text-coral text-3xl sm:text-4xl">{title}</h2>
      <PriceLine meta={meta} />
      <div className="mt-5 space-y-3 text-[0.98rem] leading-relaxed text-plum/78">
        {body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      {bullets && (
        <ul className="mt-5 list-disc space-y-1.5 pl-5 text-[0.95rem] leading-relaxed text-plum/78">
          {bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      <div className={cn("mt-7", compact && "pt-1 md:mt-auto")}>
        <BookingButton href={href} eventName={eventName} label={ctaLabel} />
      </div>
    </article>
  );
}

function PriceLine({ meta, tone = "light" }: { meta: PriceMeta; tone?: "light" | "dark" }) {
  const isDark = tone === "dark";

  return (
    <p
      className={cn("mt-3 font-display text-xl leading-[1.6]", isDark ? "text-white" : "text-plum")}
    >
      {meta.prefix && (
        <>
          <span>{meta.prefix}</span>
          <span className={cn("mx-1.5", isDark ? "text-white/38" : "text-plum/45")} aria-hidden>
            ·
          </span>
        </>
      )}
      <span
        className={cn(
          "inline-flex -translate-y-[0.05em] items-center rounded-xl border-2 border-mint px-2.5 py-1 font-sans text-[0.78em] font-bold leading-none",
          isDark ? "bg-mint text-[#1B1B1B]" : "bg-mint/15 text-plum",
        )}
      >
        {meta.price}
      </span>
      {meta.suffix && (
        <>
          <span className={cn("mx-1.5", isDark ? "text-white/38" : "text-plum/45")} aria-hidden>
            ·
          </span>
          <span>{meta.suffix}</span>
        </>
      )}
    </p>
  );
}

function PackageSession({
  title,
  items,
  tone = "light",
}: {
  title: string;
  items: string[];
  tone?: "light" | "dark";
}) {
  const isDark = tone === "dark";

  return (
    <section className="border-t-2 border-coral pt-5">
      <h3
        className={cn("font-display text-2xl leading-[1.04]", isDark ? "text-white" : "text-plum")}
      >
        {title}
      </h3>
      <ul
        className={cn(
          "mt-4 list-disc space-y-1.5 pl-5 text-[0.95rem] leading-relaxed",
          isDark ? "text-white/72 marker:text-mint" : "text-plum/78",
        )}
      >
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function BookingButton({
  href,
  eventName,
  label,
}: {
  href: string;
  eventName: Parameters<typeof trackBookingAction>[0];
  label: string;
}) {
  const isCalendly = Boolean(href);
  const handleClick = () => {
    trackBookingAction(eventName);
    if (isCalendly) trackBookingAction("calendly_opened");
  };

  if (!isCalendly) {
    return (
      <Link to="/book" className="btn-editorial w-full sm:w-auto" onClick={handleClick}>
        {label}
      </Link>
    );
  }

  return (
    <a href={href} className="btn-editorial w-full sm:w-auto" onClick={handleClick}>
      {label}
    </a>
  );
}
