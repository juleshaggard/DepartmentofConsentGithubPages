import { useEffect } from "react";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { Section } from "@/components/marketing/primitives";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/pricing")({
  head: () =>
    pageHead({
      title: "Coaching and Pricing | Department of Consent",
      description:
        "Beginner kink and polyamory coaching, a free Meet Jules Call, private sessions, packages, event preparation, and approved San Francisco and Oakland event support.",
      path: "/coaching",
      noindex: true,
    }),
  component: PricingCompatibilityPage,
});

function PricingCompatibilityPage() {
  const router = useRouter();

  useEffect(() => {
    router.navigate({ to: "/coaching", replace: true });
  }, [router]);

  return (
    <MarketingLayout>
      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-coral">Coaching and Pricing</p>
          <h1 className="display-condensed mt-3 text-4xl text-coral sm:text-6xl">
            Taking you to the coaching page.
          </h1>
          <p className="prose-doc mx-auto mt-5">
            Coaching options, pricing, and booking now live together.
          </p>
          <div className="mt-8">
            <Link to="/coaching" className="btn-editorial">
              Go to coaching
            </Link>
          </div>
        </div>
      </Section>
    </MarketingLayout>
  );
}
