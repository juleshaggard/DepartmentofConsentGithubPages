import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/marketing/LegalPage";
import { pageHead } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const Route = createFileRoute("/privacy")({
  head: () =>
    pageHead({
      title: "Privacy Policy | Department of Consent",
      description:
        "How Department of Consent collects, uses, and protects information across the coaching site and the Scene Negotiator app.",
      path: "/privacy",
    }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" path="/privacy" draftNotice={false}>
      <p>
        Department of Consent (“we,” “us”) provides coaching, education, and event support for
        adults, plus a browser-based scene-planning tool. We try to collect as little information as
        possible. This policy describes what is actually collected and by whom.
      </p>

      <h2>Information you send us</h2>
      <p>
        <strong>Inquiry and booking form:</strong> when the inquiry form is connected, submitting it
        sends us your name, email, optional pronouns, location or time zone, preferred service, your
        message, your confirmation that you are 18 or older, how you heard about us, and any
        optional contact-method or accessibility notes. This information is used to respond to your
        inquiry and administer services. Please do not submit graphic descriptions, medical records,
        government identification, or a complete sexual history.
      </p>
      <p>
        <strong>Email:</strong> if you email us directly, we receive whatever you choose to send.
      </p>

      <h2>Third-party processors</h2>
      <p>Depending on configuration, the following categories of third parties may process data:</p>
      <ul>
        <li>
          <strong>Form processing:</strong> inquiry form submissions are delivered through a form
          endpoint provider (for example Formspree), which processes the submitted fields.
        </li>
        <li>
          <strong>Scheduling:</strong> if you book through an external scheduling link, the
          scheduling provider collects the information it needs (such as name, email, and
          appointment time) under its own privacy policy.
        </li>
        <li>
          <strong>Newsletter:</strong> if you sign up for the email guide, your email address is
          processed by the newsletter provider named on the signup form, under its own policy. No
          public mailing lists, no selling your information, and no explicit subject lines.
        </li>
        <li>
          <strong>Payments:</strong> we do not process payments on this website. If payment is
          required for a service, it is handled by the provider named at the time of booking.
        </li>
        <li>
          <strong>Fonts:</strong> pages load fonts from Google Fonts, which receives standard
          request data such as your IP address.
        </li>
      </ul>

      <h2>Analytics and cookies</h2>
      <p>
        When enabled, this site uses privacy-focused, cookieless analytics (Plausible) that collects
        aggregate page-view statistics without advertising pixels, session replay, fingerprinting,
        or cross-site tracking. Analytics can be disabled entirely by the site operator, and
        standard content blockers will also block it. The marketing pages set no tracking cookies.
      </p>

      <h2>The Scene Negotiator app</h2>
      <p>
        Scene Negotiator (our scene-planning tool) runs entirely in your browser. Profiles, kink
        ratings, scenes, and preferences are stored in your browser’s local storage — there is no
        server account, and we cannot see this data. If you clear browser data or switch devices, it
        does not follow you.
      </p>
      <p>
        When you generate a share link, the scene’s contents are encoded into the link itself and
        are visible to anyone who has that link. You can edit or erase locally stored data from the
        app’s profile page, but anyone you sent a link to may still hold a copy of the data in that
        link.
      </p>

      <h2>Retention and deletion</h2>
      <p>
        Inquiry correspondence is retained as ordinary business email for as long as needed to
        provide services and meet legal obligations. You may request deletion of your correspondence
        by emailing {siteConfig.contactEmail}; we will honor requests except where retention is
        legally required. Data held by third-party processors is subject to their retention policies
        and deletion tools.
      </p>

      <h2>Security limitations</h2>
      <p>
        We take reasonable care with your information, but no website, email system, or third-party
        service can be guaranteed secure. We do not claim HIPAA compliance, and coaching
        correspondence does not carry the legal privilege that may apply to therapy or legal
        representation.
      </p>

      <h2>California residents</h2>
      <p>
        California residents may have rights under the CCPA/CPRA, including the right to know,
        correct, and delete personal information. We do not sell or share personal information as
        those terms are defined by the CCPA. To exercise these rights, contact{" "}
        {siteConfig.contactEmail}.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy: <strong>{siteConfig.contactEmail}</strong>
      </p>
    </LegalPage>
  );
}
