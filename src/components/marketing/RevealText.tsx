import { Fragment, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Scroll reveal from the artboard: serif paragraphs sit pale pink and fill
 * to their real color as they scroll into the viewport (GSAP ScrollTrigger,
 * scrubbed so the fill tracks the scroll position).
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

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray<HTMLElement>("p", ref.current!).forEach((p) => {
        gsap.fromTo(
          p,
          { color: "#fbd3da" },
          {
            color: "#fc5142",
            ease: "none",
            scrollTrigger: {
              trigger: p,
              start: "top 88%",
              end: "top 45%",
              scrub: 0.4,
            },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

type CharacterParagraph = string | readonly string[];

export function CharacterRevealText({
  paragraphs,
  className,
  paragraphClassName,
}: {
  paragraphs: readonly CharacterParagraph[];
  className?: string;
  paragraphClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.utils.toArray<HTMLElement>(".char-reveal-paragraph", ref.current!).forEach((paragraph) => {
        const chars = paragraph.querySelectorAll<HTMLElement>(".char-reveal-char");

        gsap.fromTo(
          chars,
          { y: 18, opacity: 0, color: "#fbd3da" },
          {
            y: 0,
            opacity: 1,
            color: "#fc5142",
            duration: 0.72,
            ease: "power3.out",
            stagger: { each: 0.009, from: "start" },
            scrollTrigger: {
              trigger: paragraph,
              start: "top 84%",
              once: true,
            },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {paragraphs.map((paragraph, paragraphIndex) => {
        const lines = Array.isArray(paragraph) ? paragraph : [paragraph];
        const readableText = lines.join(" ");

        return (
          <p key={readableText} className={`char-reveal-paragraph ${paragraphClassName ?? ""}`}>
            <span className="sr-only">{readableText}</span>
            <span aria-hidden="true">
              {lines.map((line, lineIndex) => (
                <Fragment key={`${paragraphIndex}-${lineIndex}`}>
                  {line.split(/(\s+)/).map((token, tokenIndex) =>
                    token.trim() === "" ? (
                      <span
                        key={`${paragraphIndex}-${lineIndex}-${tokenIndex}`}
                        className="char-reveal-space"
                      >
                        {token}
                      </span>
                    ) : (
                      <span
                        key={`${paragraphIndex}-${lineIndex}-${tokenIndex}`}
                        className="char-reveal-word"
                      >
                        {Array.from(token).map((char, charIndex) => (
                          <span
                            key={`${paragraphIndex}-${lineIndex}-${tokenIndex}-${charIndex}`}
                            className="char-reveal-char"
                          >
                            {char}
                          </span>
                        ))}
                      </span>
                    ),
                  )}
                  {lineIndex < lines.length - 1 && <br />}
                </Fragment>
              ))}
            </span>
          </p>
        );
      })}
    </div>
  );
}
