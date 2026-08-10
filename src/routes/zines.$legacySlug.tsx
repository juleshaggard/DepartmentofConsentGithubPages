import { createFileRoute, redirect } from "@tanstack/react-router";
import { getFieldGuideByNumber } from "@/lib/field-guides";

export const Route = createFileRoute("/zines/$legacySlug")({
  beforeLoad: ({ params }) => {
    const number = params.legacySlug.match(/^zine-(\d+)$/)?.[1];
    const guide = number ? getFieldGuideByNumber(number) : null;

    if (!guide) {
      throw redirect({ to: "/guides", replace: true, statusCode: 301 });
    }

    throw redirect({
      to: "/guides/$guideSlug",
      params: { guideSlug: guide.slug },
      replace: true,
      statusCode: 301,
    });
  },
  component: () => null,
});
