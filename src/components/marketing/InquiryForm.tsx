import { useState } from "react";
import { siteConfig } from "@/config/site";

const SERVICES = [
  "Introductory consultation",
  "Beginner BDSM coaching",
  "Polyamory / open-relationship coaching",
  "First kink event preparation",
  "Kink event accompaniment (SF Bay Area)",
  "Private workshop",
  "Something else / not sure yet",
] as const;

const HEARD_ABOUT = [
  "Search engine",
  "Friend or partner",
  "Social media",
  "Community event",
  "Other",
] as const;

type FormState = "idle" | "submitting" | "success" | "error";

type Errors = Partial<Record<string, string>>;

/**
 * Inquiry form. Posts to VITE_INQUIRY_FORM_ENDPOINT (Formspree-style) when
 * configured. When not configured, submission is disabled and we say so —
 * no fake success states.
 */
export function InquiryForm() {
  const endpoint = siteConfig.inquiryFormEndpoint;
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Errors>({});

  function validate(data: FormData): Errors {
    const errs: Errors = {};
    if (!String(data.get("name") || "").trim()) errs.name = "Please enter your name.";
    const email = String(data.get("email") || "");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Enter a valid email address.";
    if (!String(data.get("location") || "").trim())
      errs.location = "Please add your location or time zone.";
    if (!String(data.get("service") || "")) errs.service = "Please choose a service.";
    if (!String(data.get("message") || "").trim())
      errs.message = "Tell us briefly what you want help with.";
    if (!data.get("adult")) errs.adult = "You must confirm that you are 18 or older.";
    if (!String(data.get("heard") || "")) errs.heard = "Please choose an option.";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const errs = validate(data);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    if (!endpoint) return; // Submission is disabled without an endpoint.

    setState("submitting");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!res.ok) throw new Error(`Form endpoint responded ${res.status}`);
      setState("success");
      form.reset();
    } catch (err) {
      console.error(err);
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="rounded-2xl border border-mint bg-mint/10 px-6 py-8" role="status">
        <h3 className="font-display text-2xl text-plum">Inquiry received.</h3>
        <p className="prose-doc mt-2">
          Thanks for reaching out. You will get a reply by email — usually within a few business
          days. Nothing else happens automatically, and no one is added to a mailing list.
        </p>
      </div>
    );
  }

  const field = (name: string) =>
    errors[name] ? (
      <p id={`${name}-error`} className="mt-1.5 text-sm text-destructive">
        {errors[name]}
      </p>
    ) : null;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5 max-w-xl">
      {!endpoint && (
        <div className="rounded-xl border border-dashed border-plum/30 bg-card px-5 py-4">
          <p className="text-sm font-semibold text-plum">This form is not connected yet.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Submissions are disabled until a form endpoint is configured. Please email{" "}
            <a
              href={`mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent("Coaching inquiry")}`}
              className="underline underline-offset-4 text-plum"
            >
              {siteConfig.contactEmail}
            </a>{" "}
            instead — include your location or time zone, the service you are interested in, and
            what you would like help with.
          </p>
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        Please do not submit graphic descriptions, medical records, government identification, or a
        complete sexual history through this form.
      </p>

      <div>
        <label htmlFor="inq-name" className="doc-label">
          Name
        </label>
        <input
          id="inq-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          className="doc-input"
          aria-invalid={!!errors.name || undefined}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {field("name")}
      </div>

      <div>
        <label htmlFor="inq-email" className="doc-label">
          Email
        </label>
        <input
          id="inq-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="doc-input"
          aria-invalid={!!errors.email || undefined}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {field("email")}
      </div>

      <div>
        <label htmlFor="inq-pronouns" className="doc-label">
          Pronouns <span className="font-normal text-muted-foreground">(optional)</span>
        </label>
        <input id="inq-pronouns" name="pronouns" type="text" className="doc-input" />
      </div>

      <div>
        <label htmlFor="inq-location" className="doc-label">
          Location or time zone
        </label>
        <input
          id="inq-location"
          name="location"
          type="text"
          required
          className="doc-input"
          placeholder="e.g. San Francisco, or UTC-8"
          aria-invalid={!!errors.location || undefined}
          aria-describedby={errors.location ? "location-error" : undefined}
        />
        {field("location")}
      </div>

      <div>
        <label htmlFor="inq-service" className="doc-label">
          Preferred service
        </label>
        <select
          id="inq-service"
          name="service"
          required
          defaultValue=""
          className="doc-input"
          aria-invalid={!!errors.service || undefined}
          aria-describedby={errors.service ? "service-error" : undefined}
        >
          <option value="" disabled>
            Choose a service…
          </option>
          {SERVICES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {field("service")}
      </div>

      <div>
        <label htmlFor="inq-message" className="doc-label">
          What would you like help with?
        </label>
        <textarea
          id="inq-message"
          name="message"
          rows={5}
          required
          className="doc-input"
          placeholder="You do not need the right terminology. A few clear sentences are enough."
          aria-invalid={!!errors.message || undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {field("message")}
      </div>

      <div>
        <label htmlFor="inq-contact-method" className="doc-label">
          Preferred contact method{" "}
          <span className="font-normal text-muted-foreground">(optional)</span>
        </label>
        <input
          id="inq-contact-method"
          name="contactMethod"
          type="text"
          className="doc-input"
          placeholder="e.g. email"
        />
      </div>

      <div>
        <label htmlFor="inq-access" className="doc-label">
          Accessibility needs <span className="font-normal text-muted-foreground">(optional)</span>
        </label>
        <input id="inq-access" name="accessibility" type="text" className="doc-input" />
      </div>

      <div>
        <label htmlFor="inq-heard" className="doc-label">
          How did you hear about Department of Consent?
        </label>
        <select
          id="inq-heard"
          name="heard"
          required
          defaultValue=""
          className="doc-input"
          aria-invalid={!!errors.heard || undefined}
          aria-describedby={errors.heard ? "heard-error" : undefined}
        >
          <option value="" disabled>
            Choose an option…
          </option>
          {HEARD_ABOUT.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>
        {field("heard")}
      </div>

      <div className="flex items-start gap-3">
        <input
          id="inq-adult"
          name="adult"
          type="checkbox"
          required
          className="mt-1 h-4 w-4 accent-[var(--color-coral)]"
          aria-invalid={!!errors.adult || undefined}
          aria-describedby={errors.adult ? "adult-error" : undefined}
        />
        <label htmlFor="inq-adult" className="text-sm text-plum">
          I confirm that I am 18 years of age or older.
        </label>
      </div>
      {field("adult")}

      {state === "error" && (
        <div
          className="rounded-xl border border-destructive/40 bg-destructive/5 px-5 py-4"
          role="alert"
        >
          <p className="text-sm font-semibold text-destructive">
            Something went wrong sending your inquiry.
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Please try again, or email{" "}
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="underline underline-offset-4 text-plum"
            >
              {siteConfig.contactEmail}
            </a>
            .
          </p>
        </div>
      )}

      <div className="mobile-action-stack sm:mx-0 sm:w-auto sm:max-w-none">
        <button
          type="submit"
          className="btn-editorial w-full sm:w-auto"
          disabled={!endpoint || state === "submitting"}
          aria-disabled={!endpoint || state === "submitting"}
        >
          {state === "submitting" ? "Sending…" : "Submit inquiry"}
        </button>
      </div>

      <p className="text-xs text-muted-foreground">
        Information submitted here is used to respond to your inquiry and administer services. Do
        not use this form for emergencies or reports requiring immediate intervention.
      </p>
    </form>
  );
}
