import { useId, useState } from "react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type NewsletterVariant = "guide" | "footer" | "modal";

type NewsletterFormConfig = {
  provider?: string;
  endpoint?: string;
  emailFieldName?: string;
  kitFormId?: string;
  kitUid?: string;
  kitFormat?: string;
};

type NewsletterSignupProps = {
  compact?: boolean;
  variant?: NewsletterVariant;
  className?: string;
  eyebrow?: string;
  heading?: string;
  description?: string;
  descriptionClassName?: string;
  buttonLabel?: string;
  placeholder?: string;
  formConfig?: NewsletterFormConfig;
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
    description: "Occasional notes for adults learning kink, consent, and community.",
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
  eyebrow,
  heading,
  description,
  descriptionClassName,
  buttonLabel,
  placeholder = "you@example.com",
  formConfig,
  onValidSubmit,
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const emailId = useId();
  const resolvedVariant = variant ?? (compact ? "footer" : "guide");
  const content = variantContent[resolvedVariant];
  const endpoint = formConfig?.endpoint ?? siteConfig.newsletter.endpoint;
  const newsletterProvider = (formConfig?.provider ?? siteConfig.newsletter.provider)
    .trim()
    .toLowerCase();
  const isKitProvider = newsletterProvider === "kit" || newsletterProvider === "convertkit";
  const hasKitFormMetadata = isKitProvider && Boolean(formConfig?.kitFormId && formConfig.kitUid);
  const emailFieldName =
    formConfig?.emailFieldName ||
    siteConfig.newsletter.emailFieldName ||
    (isKitProvider ? "email_address" : "email");
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const showError = touched && !emailValid;
  const displayHeading = heading ?? content.heading;
  const displayDescription = description ?? content.description;
  const displayButtonLabel = buttonLabel ?? content.buttonLabel;
  const displayEyebrow = eyebrow ?? content.eyebrow;
  const hasFramedGuide = resolvedVariant === "guide" && !compact;
  const isFooter = resolvedVariant === "footer";
  const formClasses =
    resolvedVariant === "guide"
      ? "mt-6 flex flex-col sm:flex-row gap-3 max-w-lg"
      : "mt-5 flex w-full max-w-[28rem] flex-col gap-3";
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
        isFooter && "max-w-[28rem]",
        className,
      )}
    >
      {hasFramedGuide ? (
        <>
          {displayEyebrow && <p className="eyebrow mb-2">{displayEyebrow}</p>}
          <h2 className="display-condensed text-coral text-3xl sm:text-5xl">{displayHeading}</h2>
          <p className={cn("prose-doc mt-3", descriptionClassName)}>{displayDescription}</p>
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
              descriptionClassName,
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
          className={cn(hasKitFormMetadata && "seva-form formkit-form", formClasses)}
          data-sv-form={hasKitFormMetadata ? formConfig?.kitFormId : undefined}
          data-uid={hasKitFormMetadata ? formConfig?.kitUid : undefined}
          data-format={hasKitFormMetadata ? (formConfig?.kitFormat ?? resolvedVariant) : undefined}
          data-version={hasKitFormMetadata ? "5" : undefined}
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
              placeholder={placeholder}
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
                placeholder={placeholder}
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
        No public mailing lists, no selling your information, and no explicit subject lines.
      </p>
    </div>
  );
}
