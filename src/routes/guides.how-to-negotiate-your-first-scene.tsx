import { createFileRoute } from "@tanstack/react-router";
import { GuideArticle } from "@/components/marketing/GuideArticle";
import { guideNegotiateFirstScene } from "@/content/guides";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/guides/how-to-negotiate-your-first-scene")({
  head: () =>
    pageHead({
      title: guideNegotiateFirstScene.title,
      description: guideNegotiateFirstScene.description,
      path: guideNegotiateFirstScene.path,
      ogType: "article",
    }),
  component: () => <GuideArticle guide={guideNegotiateFirstScene} />,
});
