import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { OriginalHomepage } from "@/routes/index";

export const Route = createFileRoute("/homepage-archive")({
  head: () =>
    pageHead({
      title: "Archived Homepage | Department of Consent",
      description: "An archived version of the former Department of Consent homepage.",
      path: "/homepage-archive",
      noindex: true,
    }),
  component: OriginalHomepage,
});
