import { Link } from "@tanstack/react-router";
import type { Zine } from "@/lib/zines";

export function ZineCoverLink({
  zine,
  loading = "lazy",
}: {
  zine: Zine;
  loading?: "eager" | "lazy";
}) {
  return (
    <Link
      to="/zines/$zineSlug"
      params={{ zineSlug: zine.slug }}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-4"
    >
      <span className="block overflow-hidden border border-plum/10 bg-[#f5f2ef]">
        <img
          src={zine.cover.src}
          alt={`Cover of ${zine.title}`}
          width={zine.cover.width}
          height={zine.cover.height}
          loading={loading}
          decoding="async"
          className="block h-auto w-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.015] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </span>
      <span className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 text-plum">
        <span className="font-display text-lg leading-tight group-hover:text-coral">
          {zine.title}
        </span>
        <span
          aria-label={`Issue ${zine.issue}`}
          className="display-condensed shrink-0 text-[clamp(2.5rem,4vw,4rem)] leading-[0.8] text-coral"
        >
          {zine.issue}
        </span>
      </span>
    </Link>
  );
}
