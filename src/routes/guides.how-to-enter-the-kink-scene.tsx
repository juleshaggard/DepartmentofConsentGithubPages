import { createFileRoute } from "@tanstack/react-router";
import { GuideArticle } from "@/components/marketing/GuideArticle";
import { guideEnterTheScene } from "@/content/guides";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/guides/how-to-enter-the-kink-scene")({
  head: () =>
    pageHead({
      title: guideEnterTheScene.title,
      description: guideEnterTheScene.description,
      path: guideEnterTheScene.path,
      ogType: "article",
    }),
  component: () => <GuideArticle guide={guideEnterTheScene} />,
});
