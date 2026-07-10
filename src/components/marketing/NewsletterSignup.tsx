import { useState } from "react";
import { siteConfig } from "@/config/site";

/**
 * Email capture for the "Before Your First Kink Event" guide.
 *
 * When a newsletter endpoint is configured (VITE_NEWSLETTER_ENDPOINT), this
 * renders a real form POST to the provider so the provider's own confirmation
 * flow runs. When no provider is configured we say so plainly — we never
 * pretend a subscription succeeded.
 */
export function NewsletterSignup({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const endpoint = siteConfig.newsletter.endpoint;
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const showError = touched && !emailValid;

  return (
    <div
      className={
        compact ? "" : "rounded-2xl border border-plum/15 bg-blush/40 px-6 py-8 sm:px-10 sm:py-10"
      }
    >
      {!compact && (
        <>
          <p className="eyebrow mb-2">Free email guide</p>
          <h2 className="font-display text-3xl sm:text-4xl text-plum leading-[1.08]">
            Before Your First Kink Event
          </h2>
          <p className="prose-doc mt-3">
            A practical guide to choosing an event, understanding the rules, protecting your
            boundaries, and knowing what to expect.
          </p>
        </>
      )}

      {endpoint ? (
        <form
          action={endpoint}
          method="post"
          className="mt-6 flex flex-col sm:flex-row gap-3 max-w-lg"
          onSubmit={(e) => {
            if (!emailValid) {
              e.preventDefault();
              setTouched(true);
            }
          }}
        >
          <div className="flex-1">
            <label htmlFor="newsletter-email" className="doc-label">
              Email address
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched(true)}
              aria-invalid={showError || undefined}
              aria-describedby={showError ? "newsletter-email-error" : undefined}
              className="doc-input"
              placeholder="you@example.com"
            />
            {showError && (
              <p id="newsletter-email-error" className="mt-1.5 text-sm text-destructive">
                Enter a valid email address.
              </p>
            )}
          </div>
          <div className="sm:self-end">
            <button type="submit" className="btn-editorial w-full sm:w-auto">
              Get the free guide
            </button>
          </div>
        </form>
      ) : (
        <div className="mt-6 max-w-lg rounded-xl border border-dashed border-plum/30 bg-card px-5 py-4">
          <p className="text-sm font-semibold text-plum">Email delivery is not set up yet.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            The signup form will appear here once an email provider is connected. In the meantime,
            you can request the guide by emailing{" "}
            <a
              href={`mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(
                "Before Your First Kink Event — guide request",
              )}`}
              className="underline underline-offset-4 text-plum"
            >
              {siteConfig.contactEmail}
            </a>
            .
          </p>
        </div>
      )}

      <p className="mt-4 text-xs text-muted-foreground max-w-lg">
        Occasional educational emails. No public mailing lists, no selling your information, and no
        explicit subject lines.
      </p>
    </div>
  );
}
