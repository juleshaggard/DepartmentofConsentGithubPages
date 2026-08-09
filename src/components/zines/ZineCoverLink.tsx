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
      <span className="mt-3 flex items-baseline justify-between gap-3 text-plum">
        <span className="font-display text-lg leading-tight group-hover:text-coral">
          {zine.title}
        </span>
        <span className="label-condensed shrink-0 text-[0.7rem] text-plum/55">
          Issue {zine.issue} · {zine.pages.length} pages
        </span>
      </span>
    </Link>
  );
}
