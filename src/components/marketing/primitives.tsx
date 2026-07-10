import { Link } from "@tanstack/react-router";
import type { LinkProps } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { JsonLd } from "@/components/marketing/JsonLd";
import { breadcrumbJsonLd, faqJsonLd, type Crumb } from "@/lib/seo";
import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  wide = false,
}: {
  children: React.ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <div className={cn("mx-auto px-5 sm:px-8", wide ? "max-w-6xl" : "max-w-3xl", className)}>
      {children}
    </div>
  );
}

export function Section({
  children,
  className,
  wide = false,
  ruled = false,
}: {
  children: React.ReactNode;
  className?: string;
  wide?: boolean;
  ruled?: boolean;
}) {
  return (
    <section className={cn("py-12 sm:py-16", ruled && "hairline", className)}>
      <Container wide={wide}>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow mb-3">{children}</p>;
}

export function ButtonLink({
  to,
  children,
  variant = "primary",
  className,
}: {
  to: LinkProps["to"];
  children: React.ReactNode;
  variant?: "primary" | "outline";
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={cn("btn-editorial", variant === "outline" && "btn-editorial-outline", className)}
    >
      {children}
    </Link>
  );
}

export function TextLink({
  to,
  children,
  className,
}: {
  to: LinkProps["to"];
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "inline-flex items-center gap-1 text-sm font-semibold text-plum underline underline-offset-4 hover:text-coral",
        className,
      )}
    >
      {children}
      <ChevronRight className="h-4 w-4" aria-hidden />
    </Link>
  );
}

/** Visible breadcrumbs + BreadcrumbList structured data. */
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
          {crumbs.map((c, i) => {
            const last = i === crumbs.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className="font-semibold text-plum/80">
                    {c.label}
                  </span>
                ) : (
                  <>
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    <Link to={c.path as any} className="hover:underline underline-offset-4">
                      {c.label}
                    </Link>
                    <ChevronRight className="h-3 w-3" aria-hidden />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}

export type Faq = { question: string; answer: React.ReactNode; answerText: string };

/**
 * Accessible FAQ accordion. Emits FAQPage structured data only for the
 * FAQs actually visible on the page.
 */
export function FaqAccordion({ faqs, withJsonLd = false }: { faqs: Faq[]; withJsonLd?: boolean }) {
  return (
    <>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((f, i) => (
          <AccordionItem key={f.question} value={`faq-${i}`}>
            <AccordionTrigger className="text-left font-sans text-base font-semibold text-plum">
              {f.question}
            </AccordionTrigger>
            <AccordionContent className="prose-doc text-[0.95rem]">{f.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      {withJsonLd && (
        <JsonLd
          data={faqJsonLd(faqs.map((f) => ({ question: f.question, answer: f.answerText })))}
        />
      )}
    </>
  );
}

/** Final call-to-action block shared across pages. */
export function CtaBlock({
  headline,
  body,
  primaryLabel = "Book an introductory session",
  primaryTo = "/book",
  secondaryLabel,
  secondaryTo,
}: {
  headline: string;
  body?: string;
  primaryLabel?: string;
  primaryTo?: LinkProps["to"];
  secondaryLabel?: string;
  secondaryTo?: LinkProps["to"];
}) {
  return (
    <Section wide>
      <div className="rounded-3xl bg-mint text-white px-6 py-12 sm:px-14 sm:py-16 text-center">
        <h2 className="font-display text-3xl sm:text-5xl leading-[1.05] max-w-2xl mx-auto">
          {headline}
        </h2>
        {body && (
          <p className="mt-4 font-display text-lg opacity-90 max-w-xl mx-auto leading-normal">
            {body}
          </p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink
            to={primaryTo}
            className="!bg-white !text-coral !border-white hover:!bg-plum hover:!text-white hover:!border-plum"
          >
            {primaryLabel}
          </ButtonLink>
          {secondaryLabel && secondaryTo && (
            <ButtonLink
              to={secondaryTo}
              variant="outline"
              className="!text-white !border-white/60 hover:!bg-white hover:!text-coral"
            >
              {secondaryLabel}
            </ButtonLink>
          )}
        </div>
      </div>
    </Section>
  );
}

/**
 * Pale pink card from the artboard: condensed coral title, optional serif
 * body, arrow chip in the bottom-right corner.
 */
export function PinkCard({
  to,
  title,
  body,
  centered = false,
  className,
  children,
}: {
  to: LinkProps["to"];
  title: string;
  body?: string;
  centered?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "group relative flex min-h-[16rem] flex-col overflow-hidden rounded-3xl bg-pinkcard px-6 pb-16 pt-7 transition-transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        centered && "items-center text-center",
        className,
      )}
    >
      <h3 className="display-condensed relative z-10 text-2xl text-coral">{title}</h3>
      {body && <p className="prose-doc relative z-10 mt-3 !text-[0.95rem] !leading-snug">{body}</p>}
      {children}
      <span
        aria-hidden
        className="absolute bottom-4 right-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-plum shadow-sm transition-colors group-hover:bg-coral group-hover:text-white"
      >
        <ChevronRight className="h-4 w-4" />
      </span>
    </Link>
  );
}

/** Definition callout used to explain insider terms in plain English. */
export function Definition({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <aside className="rounded-xl border border-coral/25 bg-blush/50 px-5 py-4 my-6">
      <p className="text-sm">
        <strong className="font-semibold text-plum">{term}:</strong>{" "}
        <span className="text-plum/85">{children}</span>
      </p>
    </aside>
  );
}
