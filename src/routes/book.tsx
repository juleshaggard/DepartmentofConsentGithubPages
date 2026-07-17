import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { Breadcrumbs, Container, Eyebrow, Section } from "@/components/marketing/primitives";
import { pageHead } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const Route = createFileRoute("/book")({
  head: () =>
    pageHead({
      title: "Book Kink or Polyamory Coaching | Department of Consent",
      description:
        "Book an introductory kink or polyamory coaching session with Jules Darling. Virtual sessions and selected San Francisco Bay Area services.",
      path: "/book",
    }),
  component: BookPage,
});

function BookPage() {
  const scheduler = siteConfig.bookingUrl;

  return (
    <MarketingLayout>
      <Container>
        <Breadcrumbs
          crumbs={[
            { label: "Home", path: "/" },
            { label: "Book", path: "/book" },
          ]}
        />
      </Container>

      <Section wide className="!pt-10 sm:!pt-14">
        <div className="mx-auto max-w-3xl">
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
          <p className="prose-doc mt-3">Pick a time that works for you.</p>
          <div className="mobile-action-stack mt-6 sm:w-auto sm:max-w-none">
            <a href={scheduler} className="btn-editorial w-full sm:w-auto">
              Open the scheduling page
            </a>
          </div>
        </Section>
      ) : null}

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
