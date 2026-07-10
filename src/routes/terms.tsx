import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/marketing/LegalPage";
import { pageHead } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const Route = createFileRoute("/terms")({
  head: () =>
    pageHead({
      title: "Terms of Service | Department of Consent",
      description:
        "Terms governing Department of Consent coaching, workshops, event support, and the Scene Negotiator app.",
      path: "/terms",
    }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <LegalPage title="Terms of Service" path="/terms">
      <p>
        These terms govern your use of the Department of Consent website, coaching services,
        workshops, event support, and the Scene Negotiator browser app. By using the site or booking
        a service, you agree to them.
      </p>

      <h2>Adults only</h2>
      <p>
        You must be at least 18 years old (or the age of majority where you live) to use this site
        or any Department of Consent service.
      </p>

      <h2>Educational nature of services</h2>
      <p>
        Coaching, workshops, and event support are educational and practical. They are not
        psychotherapy, medical care, legal advice, crisis intervention, or a substitute for a
        licensed professional. See the <a href="/disclaimer">coaching disclaimer</a> for the full
        statement of scope.
      </p>

      <h2>Scope and boundaries</h2>
      <p>
        Services do not include sexual activity, kink play, topping, bottoming, dating, romantic
        companionship, or physical intimacy. Event accompaniment is nonsexual educational and social
        support and does not include security services, medical supervision, guaranteed
        introductions, or guaranteed admission to any event.
      </p>

      <h2>Booking and payment</h2>
      <p>
        Session availability, format, and current rates are confirmed in writing before any session
        is booked. Where an external scheduling or payment provider is used, its terms also apply.
        [PAYMENT TERMS PENDING — provider not yet configured.]
      </p>

      <h2>Cancellation, rescheduling, and refunds</h2>
      <p>
        [PENDING JULES'S APPROVED CANCELLATION AND REFUND POLICY. Until published here, the policy
        confirmed in writing at booking applies.]
      </p>

      <h2>Client conduct and prohibited use</h2>
      <ul>
        <li>No content or conduct involving minors. Ever.</li>
        <li>No non-consensual content, doxxing, harassment, or threats.</li>
        <li>No use of any service or tool to coerce, pressure, or harm anyone.</li>
        <li>No solicitation of sexual services.</li>
        <li>
          Abusive, harassing, or unsafe behavior toward Jules Holloway or others is grounds for
          immediate termination of services.
        </li>
      </ul>

      <h2>The Scene Negotiator app</h2>
      <p>
        Scene Negotiator is a planning and communication tool provided as-is. You are responsible
        for the content you create, store locally, or share through encoded links. Do not
        impersonate others or share another person’s information without their consent. The app is
        not a substitute for negotiating consent directly with your partners.
      </p>

      <h2>Intellectual property</h2>
      <p>
        Site content, guides, and workshop materials belong to Department of Consent. You may share
        links and quote reasonably with attribution; you may not republish substantial portions or
        resell materials without written permission.
      </p>

      <h2>No guarantees</h2>
      <p>
        No coaching outcome, relationship result, event experience, personal safety, or
        compatibility with another person is guaranteed. Department of Consent does not certify any
        person, venue, or event as safe.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        The site and services are provided “as is” without warranties of any kind. To the fullest
        extent allowed by law, Department of Consent and Jules Holloway are not liable for indirect,
        incidental, or consequential damages arising from your use of the site, services, or app, or
        from your participation in any event, relationship, or activity.
      </p>

      <h2>Termination of services</h2>
      <p>
        Either party may end a coaching relationship at any time. Department of Consent may decline
        or discontinue service where it is not an appropriate fit or where these terms are violated.
      </p>

      <h2>Governing law and disputes</h2>
      <p>
        [PENDING ATTORNEY REVIEW — governing law expected to be California; dispute-resolution
        procedure to be confirmed.]
      </p>

      <h2>Changes</h2>
      <p>
        These terms may be updated occasionally. Continued use after changes means you accept the
        updated terms.
      </p>

      <h2>Contact</h2>
      <p>
        Questions? Email <strong>{siteConfig.contactEmail}</strong>.
      </p>
    </LegalPage>
  );
}
