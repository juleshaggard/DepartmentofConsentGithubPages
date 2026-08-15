import { FormEvent, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Mail, ShieldCheck } from "lucide-react";
import { JsonLd } from "@/components/marketing/JsonLd";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { Breadcrumbs, ButtonLink, Container, Section } from "@/components/marketing/primitives";
import { pageHead } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const negotiationFormPath = "/negotiate";
const checklistPath = "/play-party-negotiation-checklist";
export const negotiationFormTitle = "Free Play Party Negotiation Guide | Department of Consent";
export const negotiationFormDescription =
  "Get a practical play party negotiation guide for discussing boundaries, risks, signals, logistics, and aftercare before a kink scene.";

const KIT_FORM = {
  endpoint: "https://app.kit.com/forms/9761022/subscriptions",
  formId: "9761022",
  uid: "76b3753411",
  emailFieldName: "email_address",
};

const FORM_PROMISES = [
  "Name what you want before the room gets loud.",
  "Talk through limits, maybes, privacy, and safer-play needs.",
  "Leave with shared signals, aftercare, and a real exit plan.",
] as const;

const CHECKLIST_TOPICS = [
  "Scene fit",
  "Hard limits",
  "Maybes",
  "Health and risk",
  "Safewords",
  "Nonverbal signals",
  "Party logistics",
  "Aftercare",
] as const;

export const Route = createFileRoute("/play-party-negotiation-form")({
  head: () =>
    pageHead({
      title: negotiationFormTitle,
      description: negotiationFormDescription,
      path: negotiationFormPath,
    }),
  component: PlayPartyNegotiationFormPage,
});

export function PlayPartyNegotiationFormPage() {
  return (
    <MarketingLayout>
      <Container>
        <Breadcrumbs
          crumbs={[
            { label: "Home", path: "/" },
            { label: "Play Party Negotiation Guide", path: negotiationFormPath },
          ]}
        />
      </Container>

      <Section wide className="!pt-14 sm:!pt-20">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.98fr)_minmax(21rem,0.72fr)] lg:items-center">
          <div>
            <p className="section-label text-coral">Free guide</p>
            <h1 className="display-condensed max-w-[12ch] text-5xl leading-[0.88] text-coral sm:text-7xl lg:text-8xl">
              Play Party Negotiation Guide
            </h1>
            <p className="prose-doc mt-6 max-w-2xl text-[1.08rem]">
              A practical guide for adults who want to discuss boundaries, risk, signals, logistics,
              and aftercare before a kink scene.
            </p>
            <ul className="mt-7 grid max-w-2xl list-none gap-3 p-0 sm:grid-cols-3 sm:gap-5">
              {FORM_PROMISES.map((promise) => (
                <li key={promise} className="text-sm font-semibold leading-snug text-plum/82">
                  {promise}
                </li>
              ))}
            </ul>
          </div>

          <LeadGateCard />
        </div>
      </Section>

      <Section wide className="!pt-4">
        <div className="grid gap-6 rounded-[1.5rem] bg-[#1B1B1B] px-6 py-8 text-white sm:px-8 lg:grid-cols-[0.7fr_1fr] lg:items-center">
          <div>
            <h2 className="display-condensed max-w-[10ch] text-4xl leading-[0.88] text-coral sm:text-6xl">
              You will get...
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {CHECKLIST_TOPICS.map((topic) => (
              <div
                key={topic}
                className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-4 text-sm font-bold text-white/84"
              >
                {topic}
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section wide className="!pt-0">
        <div className="mx-auto max-w-3xl text-center">
          <ShieldCheck className="mx-auto h-9 w-9 text-[#5BCEFA]" strokeWidth={2.25} />
          <h2 className="mt-4 font-display text-3xl leading-[1.05] text-plum sm:text-4xl">
            This does not make a scene automatically safe. It makes the conversation harder to skip.
          </h2>
          <p className="prose-doc mx-auto mt-4 max-w-2xl">
            Use it before a play party, a private scene, or any moment where excitement is moving
            faster than clarity.
          </p>
        </div>
      </Section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: "Play Party Negotiation Guide",
          description: negotiationFormDescription,
        }}
      />
    </MarketingLayout>
  );
}

function LeadGateCard() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [error, setError] = useState("");
  const isSuccess = status === "success";
  const isSubmitting = status === "submitting";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    setError("");

    if (!email.trim() || !event.currentTarget.checkValidity()) {
      event.preventDefault();
      setError("Enter a valid email address.");
      return;
    }

    setStatus("submitting");
    window.setTimeout(() => {
      setStatus("success");
    }, 900);
  };

  return (
    <aside className="rounded-[1.5rem] border border-plum/12 bg-white p-5 text-plum shadow-[0_24px_80px_rgb(27_27_27_/_0.08)] sm:p-6">
      {isSuccess ? (
        <div className="flex min-h-[23rem] flex-col justify-between rounded-[1.15rem] border border-plum/10 bg-cream/45 p-5">
          <div>
            <CheckCircle2 className="h-9 w-9 text-[#5BCEFA]" strokeWidth={2.25} />
            <p className="section-label mt-6 text-coral">Check your email</p>
            <h2 className="display-condensed mt-2 text-4xl leading-[0.9] text-coral sm:text-5xl">
              You are in.
            </h2>
            <p className="mt-4 font-display text-lg leading-relaxed text-plum/72">
              We are sending you the guide link. You can open it now too.
            </p>
          </div>
          <ButtonLink to={checklistPath} className="mt-7 justify-center">
            Get the guide
          </ButtonLink>
        </div>
      ) : (
        <>
          <div className="flex items-start gap-3">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-coral text-white">
              <Mail className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <h2 className="display-condensed mt-1 text-4xl leading-[0.9] text-coral sm:text-5xl">
                Get the guide.
              </h2>
            </div>
          </div>

          <p className="mt-5 font-display text-lg leading-relaxed text-plum/72">
            Enter your email and we will send you the checklist link.
          </p>

          <iframe
            title="Kit signup response"
            name="kit-negotiation-form-frame"
            className="hidden"
          />
          <form
            action={KIT_FORM.endpoint}
            method="post"
            target="kit-negotiation-form-frame"
            data-sv-form={KIT_FORM.formId}
            data-uid={KIT_FORM.uid}
            data-format="inline"
            data-version="5"
            className="seva-form formkit-form mt-6"
            onSubmit={handleSubmit}
          >
            <label htmlFor="negotiation-email" className="doc-label !text-plum">
              Email address
            </label>
            <input
              id="negotiation-email"
              name={KIT_FORM.emailFieldName}
              type="email"
              required
              autoComplete="email"
              inputMode="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (error) setError("");
              }}
              className={cn(
                "doc-input !rounded-full !border-plum/12 !bg-white !px-5 !py-4 !text-plum placeholder:!text-plum/45",
                error && "!border-coral",
              )}
            />
            {error && <p className="mt-2 text-sm font-semibold text-coral">{error}</p>}
            <button type="submit" className="btn-editorial mt-4 w-full" disabled={isSubmitting}>
              <span>{isSubmitting ? "Sending" : "Send me the guide"}</span>
            </button>
          </form>

          <p className="mt-5 text-xs leading-relaxed text-plum/48">
            No explicit subject lines. No public mailing list. Unsubscribe anytime.
          </p>
        </>
      )}
    </aside>
  );
}
