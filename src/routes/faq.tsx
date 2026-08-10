import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import {
  Breadcrumbs,
  Container,
  CtaBlock,
  Eyebrow,
  FaqAccordion,
  Section,
  type Faq,
} from "@/components/marketing/primitives";
import { pageHead } from "@/lib/seo";
import { FULL_FAQ } from "@/content/faq";

export const Route = createFileRoute("/faq")({
  head: () =>
    pageHead({
      title: "Kink Coaching FAQ | Department of Consent",
      description:
        "Answers about beginner kink coaching, privacy, first-event preparation, accompaniment, session structure, and service boundaries.",
      path: "/faq",
    }),
  component: FaqPage,
});

const FAQS: Faq[] = FULL_FAQ.map((f) => ({
  question: f.question,
  answer: f.answer,
  answerText: f.answer,
}));

function FaqPage() {
  return (
    <MarketingLayout>
      <Container>
        <Breadcrumbs
          crumbs={[
            { label: "Home", path: "/" },
            { label: "FAQ", path: "/faq" },
          ]}
        />
      </Container>

      <Section className="!pt-10 sm:!pt-14">
        <div className="mx-auto max-w-3xl">
          <Eyebrow>FAQ</Eyebrow>
          <h1 className="display-condensed text-coral text-4xl sm:text-6xl">
            Frequently asked questions
          </h1>
        </div>
        <div className="mt-10">
          <FaqAccordion faqs={FAQS} withJsonLd defaultOpenAll />
        </div>
      </Section>

      <CtaBlock
        headline="Still have a question?"
        body="Ask it directly — you will not be added to a mailing list or pushed into a sales funnel."
        primaryLabel="Ask a question"
        primaryTo="/coaching"
      />
    </MarketingLayout>
  );
}
