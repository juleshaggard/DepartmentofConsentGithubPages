import { useEffect, useRef } from "react";

/**
 * Scroll reveal from the artboard: serif paragraphs sit pale pink and fill
 * to their real color as they enter the viewport.
 *
 * Progressive enhancement only — the prerendered/no-JS state is fully
 * colored, and prefers-reduced-motion disables the effect entirely.
 */
export function RevealText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const paragraphs = Array.from(root.querySelectorAll("p"));
    const pending = paragraphs.filter(
      (p) => p.getBoundingClientRect().top > window.innerHeight * 0.6,
    );
    if (pending.length === 0) return;
    pending.forEach((p) => p.classList.add("reveal-pending"));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.remove("reveal-pending");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -35% 0px" },
    );
    pending.forEach((p) => observer.observe(p));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal-scope ${className ?? ""}`}>
      {children}
    </div>
  );
}
