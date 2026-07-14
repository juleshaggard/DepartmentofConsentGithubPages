import { useId, useState } from "react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type NewsletterVariant = "guide" | "footer" | "modal";

type NewsletterSignupProps = {
  compact?: boolean;
  variant?: NewsletterVariant;
  className?: string;
  heading?: string;
  description?: string;
  buttonLabel?: string;
  onValidSubmit?: () => void;
};

const variantContent: Record<
  NewsletterVariant,
  {
    eyebrow?: string;
    heading: string;
    description: string;
    buttonLabel: string;
  }
> = {
  guide: {
    eyebrow: "Free email guide",
    heading: "Before Your First Kink Event",
    description:
      "A practical guide to choosing an event, understanding the rules, protecting your boundaries, and knowing what to expect.",
    buttonLabel: "Get the free guide",
  },
  footer: {
    heading: "Stay in the loop",
    description: "Occasional notes for adults learning kink, polyamory, consent, and community.",
    buttonLabel: "Join the list",
  },
  modal: {
    heading: "Want the beginner notes?",
    description: "Short, practical emails for moving from kink-curious to kink-confident.",
    buttonLabel: "Join the list",
  },
};

/**
 * Email capture for the "Before Your First Kink Event" guide.
 *
 * When a newsletter endpoint is configured (VITE_NEWSLETTER_ENDPOINT), this
 * renders a real form POST to the provider so the provider's own confirmation
 * flow runs. When no provider is configured we say so plainly — we never
 * pretend a subscription succeeded.
 */
export function NewsletterSignup({
  compact = false,
  variant,
  className,
  heading,
  description,
  buttonLabel,
  onValidSubmit,
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const emailId = useId();
  const resolvedVariant = variant ?? (compact ? "footer" : "guide");
  const content = variantContent[resolvedVariant];
  const endpoint = siteConfig.newsletter.endpoint;
  const newsletterProvider = siteConfig.newsletter.provider.trim().toLowerCase();
  const emailFieldName =
    siteConfig.newsletter.emailFieldName ||
    (newsletterProvider === "kit" || newsletterProvider === "convertkit"
      ? "email_address"
      : "email");
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const showError = touched && !emailValid;
  const displayHeading = heading ?? content.heading;
  const displayDescription = description ?? content.description;
  const displayButtonLabel = buttonLabel ?? content.buttonLabel;
  const hasFramedGuide = resolvedVariant === "guide" && !compact;
  const isFooter = resolvedVariant === "footer";
  const formClasses =
    resolvedVariant === "guide"
      ? "mt-6 flex flex-col sm:flex-row gap-3 max-w-lg"
      : "mt-5 flex max-w-sm flex-col gap-3";
  const inputClasses = isFooter
    ? "h-12 w-full rounded-full border border-white/18 bg-white px-4 font-display text-base text-[#1B1B1B] outline-none transition focus:border-coral focus:ring-2 focus:ring-coral/35 disabled:cursor-not-allowed disabled:opacity-65"
    : "doc-input";
  const labelClasses = isFooter
    ? "mb-2 block font-sans text-sm font-semibold leading-tight text-white/82"
    : "doc-label";
  const errorId = `${emailId}-error`;

  return (
    <div
      className={cn(
        hasFramedGuide && "rounded-3xl bg-pinkcard px-6 py-8 sm:px-10 sm:py-10",
        isFooter && "max-w-sm",
        className,
      )}
    >
      {hasFramedGuide ? (
        <>
          {content.eyebrow && <p className="eyebrow mb-2">{content.eyebrow}</p>}
          <h2 className="display-condensed text-coral text-3xl sm:text-5xl">{displayHeading}</h2>
          <p className="prose-doc mt-3">{displayDescription}</p>
        </>
      ) : (
        <div>
          <h2
            className={cn(
              "display-condensed leading-[0.92]",
              isFooter ? "text-2xl text-white" : "text-4xl text-coral sm:text-5xl",
            )}
          >
            {displayHeading}
          </h2>
          <p
            className={cn(
              "mt-3 font-display text-base leading-relaxed",
              isFooter ? "text-white/72" : "text-[#1B1B1B]/72",
            )}
          >
            {displayDescription}
          </p>
        </div>
      )}

      {endpoint ? (
        <form
          action={endpoint}
          method="post"
          className={formClasses}
          onSubmit={(e) => {
            if (!emailValid) {
              e.preventDefault();
              setTouched(true);
              return;
            }
            onValidSubmit?.();
          }}
        >
          <div className="flex-1">
            <label htmlFor={emailId} className={labelClasses}>
              Email address
            </label>
            <input
              id={emailId}
              name={emailFieldName}
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched(true)}
              aria-invalid={showError || undefined}
              aria-describedby={showError ? errorId : undefined}
              className={inputClasses}
              placeholder="you@example.com"
            />
            {showError && (
              <p
                id={errorId}
                className={cn(
                  "mt-1.5 text-sm",
                  resolvedVariant === "footer" ? "text-white" : "text-destructive",
                )}
              >
                Enter a valid email address.
              </p>
            )}
          </div>
          <div className={resolvedVariant === "guide" ? "sm:self-end" : ""}>
            <button
              type="submit"
              className={cn(
                "btn-editorial w-full",
                resolvedVariant === "guide" && "sm:w-auto",
                isFooter && "bg-coral text-white hover:bg-white hover:text-coral",
              )}
            >
              {displayButtonLabel}
            </button>
          </div>
        </form>
      ) : (
        <div
          className={cn(
            isFooter
              ? "mt-5 max-w-sm"
              : "mt-5 max-w-lg rounded-xl border border-dashed border-plum/30 bg-card px-5 py-4",
          )}
        >
          <div className={cn(formClasses, "!mt-0")}>
            <div className="flex-1">
              <label htmlFor={emailId} className={labelClasses}>
                Email address
              </label>
              <input
                id={emailId}
                name={emailFieldName}
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClasses}
                placeholder="you@example.com"
              />
            </div>
            <div className={resolvedVariant === "guide" ? "sm:self-end" : ""}>
              <button
                type="button"
                disabled
                className={cn(
                  "btn-editorial w-full cursor-not-allowed opacity-60",
                  resolvedVariant === "guide" && "sm:w-auto",
                  isFooter && "bg-coral text-white hover:bg-coral hover:text-white",
                )}
              >
                {displayButtonLabel}
              </button>
            </div>
          </div>
          <p className={cn("mt-4 text-sm font-semibold", isFooter ? "text-white/82" : "text-plum")}>
            Email delivery is not set up yet.
          </p>
          <p className={cn("mt-1 text-sm", isFooter ? "text-white/58" : "text-muted-foreground")}>
            Connect a newsletter provider to save new signups. In the meantime, you can request the
            guide by emailing{" "}
            <a
              href={`mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(
                "Before Your First Kink Event — guide request",
              )}`}
              className={cn(
                "underline underline-offset-4",
                isFooter ? "text-white hover:text-coral" : "text-plum",
              )}
            >
              {siteConfig.contactEmail}
            </a>
            .
          </p>
        </div>
      )}

      <p
        className={cn(
          "mt-4 max-w-lg text-xs",
          isFooter ? "text-white/42" : "text-muted-foreground",
        )}
      >
        Occasional educational emails. No public mailing lists, no selling your information, and no
        explicit subject lines.
      </p>
    </div>
  );
}
