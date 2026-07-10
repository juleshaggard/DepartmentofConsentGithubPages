import { createFileRoute } from "@tanstack/react-router";
import { GuideArticle } from "@/components/marketing/GuideArticle";
import { guideRedFlags } from "@/content/guides";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/guides/kink-red-flags-for-beginners")({
  head: () =>
    pageHead({
      title: guideRedFlags.title,
      description: guideRedFlags.description,
      path: guideRedFlags.path,
      ogType: "article",
    }),
  component: () => <GuideArticle guide={guideRedFlags} />,
});
