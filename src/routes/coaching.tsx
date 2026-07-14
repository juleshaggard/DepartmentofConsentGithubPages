import { createFileRoute } from "@tanstack/react-router";
import { CoachingPricingContent } from "@/components/marketing/CoachingPricingContent";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/coaching")({
  head: () =>
    pageHead({
      title: "Coaching and Pricing | Department of Consent",
      description:
        "Beginner kink and polyamory coaching, free discovery calls, private sessions, packages, event preparation, and approved San Francisco and Oakland event support.",
      path: "/coaching",
    }),
  component: CoachingPricingContent,
});
