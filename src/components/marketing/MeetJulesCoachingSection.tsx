import { Section } from "./primitives";
import meetJulesImg from "../../../assets/meetjules.jpg";

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

const COACHING_QUESTIONS = [
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

function CoachingQuestionStream() {
  const scrollingQuestions = [...COACHING_QUESTIONS, ...COACHING_QUESTIONS];

  return (
    <div className="question-scroll mx-auto h-[38rem] max-w-5xl overflow-hidden sm:h-[46rem] lg:h-[50rem]">
      <h2 className="sr-only">Questions Department of Consent can help with</h2>
      <ul className="sr-only">
        {COACHING_QUESTIONS.map((question) => (
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

export function MeetJulesCoachingSection({ cta }: { cta: React.ReactNode }) {
  return (
    <>
      <Section wide className="relative z-10 bg-white !pb-0 !pt-0">
        <CoachingQuestionStream />
      </Section>

      <Section wide className="relative z-10 bg-white !pb-16 !pt-0 sm:!pb-24 sm:!pt-0">
        <div className="mx-auto text-center">
          <div className="relative mx-auto flex flex-col items-center">
            <h2 className="meet-jules-title artboard-rise display-condensed text-center text-[clamp(5.6rem,18vw,15.5rem)] text-coral">
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

        <div className="mt-8 text-center">{cta}</div>
      </Section>
    </>
  );
}
