import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/marketing/LegalPage";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/disclaimer")({
  head: () =>
    pageHead({
      title: "Coaching Disclaimer | Department of Consent",
      description:
        "The scope and limits of Department of Consent coaching: educational services for adults, not therapy, medical care, legal advice, or crisis support.",
      path: "/disclaimer",
    }),
  component: DisclaimerPage,
});

function DisclaimerPage() {
  return (
    <LegalPage title="Coaching Disclaimer" path="/disclaimer" draftNotice={false}>
      <p>
        Department of Consent provides education, coaching, and practical support related to kink,
        consent, communication, relationships, consensual nonmonogamy, community participation, and
        personal decision-making.
      </p>
      <p>
        Coaching is not psychotherapy, psychiatric treatment, medical care, legal advice, crisis
        intervention, case management, or a substitute for services provided by a licensed
        professional.
      </p>
      <p>
        No outcome, relationship result, event experience, personal safety, or compatibility with
        another person can be guaranteed.
      </p>
      <p>
        Kink and sexual activity may involve physical, emotional, interpersonal, legal, privacy, and
        reputational risks. Education and preparation may reduce uncertainty but cannot remove all
        risk.
      </p>
      <p>
        Clients remain responsible for their decisions, actions, boundaries, health considerations,
        legal compliance, and participation in any event, relationship, or activity.
      </p>
      <p>
        Department of Consent and Jules Darling do not certify individuals as safe, trustworthy,
        qualified, or compatible.
      </p>
      <p>All services are intended only for adults aged 18 and older.</p>
      <p>
        Event accompaniment is nonsexual educational and social support. It does not include kink
        play, sexual activity, topping, bottoming, dating, romantic companionship, physical
        intimacy, security services, medical supervision, or guaranteed access to an event.
      </p>
    </LegalPage>
  );
}
