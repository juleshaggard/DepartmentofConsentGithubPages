import { createFileRoute } from "@tanstack/react-router";
import { GuideArticle } from "@/components/marketing/GuideArticle";
import { guideFirstKinkEvent } from "@/content/guides";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/guides/preparing-for-your-first-kink-event")({
  head: () =>
    pageHead({
      title: guideFirstKinkEvent.title,
      description: guideFirstKinkEvent.description,
      path: guideFirstKinkEvent.path,
      ogType: "article",
    }),
  component: () => <GuideArticle guide={guideFirstKinkEvent} />,
});
