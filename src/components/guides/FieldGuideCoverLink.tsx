import { Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import type { FieldGuide } from "@/lib/field-guides";

type GuideStackStyle = CSSProperties & {
  "--guide-stack-rest": string;
  "--guide-stack-fan": string;
  "--guide-stack-delay": string;
};

export function FieldGuideCoverLink({
  guide,
  loading = "lazy",
  showPageStack = false,
}: {
  guide: FieldGuide;
  loading?: "eager" | "lazy";
  showPageStack?: boolean;
}) {
  const stackedPages = showPageStack
    ? guide.pages.filter((page) => page.src !== guide.cover.src).slice(0, 5)
    : [];

  return (
    <Link
      to="/guides/$guideSlug"
      params={{ guideSlug: guide.slug }}
      className="guide-stack-link group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-4"
    >
      <span className={showPageStack ? "relative block pb-8 pr-9 sm:pb-10 sm:pr-11" : "block"}>
        {stackedPages.map((page, index) => {
          const distance = stackedPages.length - index;
          const translateX = 5 + distance * 4.5;
          const translateY = 4 + distance * 3.8;
          const rotation = 0.2 + distance * 0.34;
          const fanTranslateX = 6 + distance * 5;
          const fanTranslateY = 2 + distance * 1.5;
          const fanRotation = 1 + distance * 0.95;

          return (
            <span
              key={page.src}
              aria-hidden="true"
              className="guide-stack-page absolute bottom-8 left-0 right-9 top-0 block origin-bottom-left overflow-hidden border border-plum/15 bg-[#fdfaf6] sm:bottom-10 sm:right-11"
              style={
                {
                  zIndex: index + 1,
                  "--guide-stack-rest": `translate3d(${translateX}px, ${translateY}px, 0) rotate(${rotation}deg)`,
                  "--guide-stack-fan": `translate3d(${fanTranslateX}px, ${fanTranslateY}px, 0) rotate(${fanRotation}deg)`,
                  "--guide-stack-delay": `${index * 35}ms`,
                } satisfies GuideStackStyle
              }
            >
              <img
                src={page.src}
                alt=""
                width={page.width}
                height={page.height}
                loading="lazy"
                decoding="async"
                className="block h-full w-full object-cover"
              />
            </span>
          );
        })}
        <span className="relative z-10 block overflow-hidden border border-plum/10 bg-[#f5f2ef]">
          <img
            src={guide.cover.src}
            alt={`Cover of ${guide.title}`}
            width={guide.cover.width}
            height={guide.cover.height}
            loading={loading}
            decoding="async"
            className="block h-auto w-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.015] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        </span>
      </span>
      <span className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 text-plum">
        <span className="font-display text-lg leading-tight group-hover:text-coral">
          {guide.title}
        </span>
        <span
          aria-label={`Guide ${guide.number}`}
          className="display-condensed shrink-0 text-[clamp(2.5rem,4vw,4rem)] leading-[0.8] text-coral"
        >
          {guide.number}
        </span>
      </span>
    </Link>
  );
}
