import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { Breadcrumbs, Container, Eyebrow, Section } from "@/components/marketing/primitives";
import { InquiryForm } from "@/components/marketing/InquiryForm";
import { pageHead } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const Route = createFileRoute("/book")({
  head: () =>
    pageHead({
      title: "Book Kink or Polyamory Coaching | Department of Consent",
      description:
        "Book an introductory kink or polyamory coaching session with Jules Holloway. Virtual sessions and selected San Francisco Bay Area services.",
      path: "/book",
    }),
  component: BookPage,
});

function BookPage() {
  const scheduler = siteConfig.bookingUrl;

  return (
    <MarketingLayout>
      <Container className="pt-8 sm:pt-12">
        <Breadcrumbs
          crumbs={[
            { label: "Home", path: "/" },
            { label: "Book", path: "/book" },
          ]}
        />
      </Container>

      <Section wide className="!pt-2">
        <div className="max-w-3xl">
          <Eyebrow>Book</Eyebrow>
          <h1 className="display-condensed text-coral text-4xl sm:text-6xl">
            Tell me what you are trying to figure out.
          </h1>
          <p className="prose-doc mt-6">
            You do not need the right terminology or a polished explanation. A few clear details are
            enough to determine the most useful next step.
          </p>
        </div>
      </Section>

      {scheduler ? (
        <Section ruled>
          <h2 className="font-display text-3xl text-plum leading-tight">Schedule directly</h2>
          <p className="prose-doc mt-3">
            Pick a time that works for you. If nothing fits, or you would rather start with a
            question, use the inquiry form below instead.
          </p>
          <div className="mt-6">
            <a href={scheduler} className="btn-editorial">
              Open the scheduling page
            </a>
          </div>
        </Section>
      ) : null}

      <Section ruled>
        <h2 className="font-display text-3xl text-plum leading-tight">
          {scheduler ? "Or send an inquiry" : "Send an inquiry"}
        </h2>
        <div className="mt-6">
          <InquiryForm />
        </div>
      </Section>

      <Section ruled>
        <div className="prose-doc text-sm !max-w-2xl text-muted-foreground">
          <p>
            All services are for adults aged 18 and older. Coaching is educational and practical —
            it is not psychotherapy, medical care, legal advice, or crisis support, and it does not
            include kink play, topping, bottoming, dating, romantic companionship, or physical
            intimacy. Event accompaniment is nonsexual.
          </p>
        </div>
      </Section>
    </MarketingLayout>
  );
}
