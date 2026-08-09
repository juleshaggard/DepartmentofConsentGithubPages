import { createFileRoute } from "@tanstack/react-router";
import { ShopPolicyPage } from "@/components/shop/ShopPolicyPage";
import { siteConfig } from "@/config/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/shop/privacy-policy")({
  head: () =>
    pageHead({
      title: "Shop Privacy Policy | Department of Consent",
      description:
        "How the Department of Consent shop and its Fourthwall commerce services collect, use, and protect personal information.",
      path: "/shop/privacy-policy",
    }),
  component: ShopPrivacyPolicyPage,
});

function ShopPrivacyPolicyPage() {
  return (
    <ShopPolicyPage title="Privacy Policy" path="/shop/privacy-policy">
      <p>
        This Privacy Policy explains how Department of Consent (“Department of Consent,” “we,”
        “our,” or “us”) handles personal information when you browse or interact with our shop. The
        shop uses Fourthwall to provide catalog, cart, order, fulfillment, and hosted-checkout
        services. Fourthwall separately handles information under its own privacy policy when you
        use those commerce services.
      </p>

      <h2>Information you provide</h2>
      <p>Depending on how you use the shop, you may provide:</p>
      <ul>
        <li>
          Contact and delivery details, such as your name, email address, billing address, shipping
          address, and phone number.
        </li>
        <li>
          Order details, including the products, variants, quantities, delivery method, currency,
          and transaction history associated with a purchase.
        </li>
        <li>
          Communications you send about an order, return, product, commission, or customer-support
          request, including any photographs you provide to document a quality issue.
        </li>
        <li>Your email address if you choose to join the Department of Consent newsletter.</li>
      </ul>
      <p>
        Payment-card and wallet information is collected and processed by Fourthwall and its payment
        providers at checkout. Department of Consent does not receive or store your complete payment
        card number through this website.
      </p>

      <h2>Information collected automatically</h2>
      <p>
        When you visit, standard technical information may be collected, including your IP address,
        browser and device type, referring and viewed pages, approximate location derived from your
        IP address, dates and times of access, and interactions with the site. This information may
        be collected through server logs, cookies, pixels, local storage, and similar technologies.
      </p>
      <p>
        The shop stores a Fourthwall cart identifier in your browser’s local storage so your cart
        can be retrieved between visits. The identifier is cleared if the cart expires or when you
        clear your browser data. It does not contain your complete payment information.
      </p>

      <h2>Analytics and site technologies</h2>
      <p>
        Department of Consent currently uses Google Analytics to understand site traffic and page
        use. Google may receive device, usage, and network information and may use cookies or
        similar technologies. If configured, we may also use Plausible for aggregate site analytics.
        You can limit these technologies through browser settings, content blockers, or Google’s
        available opt-out tools.
      </p>
      <p>
        Pages may also request hosted fonts and other site assets from service providers, which
        receive ordinary request information such as your IP address and browser details.
      </p>

      <h2>How we use information</h2>
      <p>We use personal information to:</p>
      <ul>
        <li>display products, maintain carts, process purchases, and arrange delivery;</li>
        <li>provide order updates, answer questions, and resolve quality or return requests;</li>
        <li>operate, secure, troubleshoot, analyze, and improve the shop;</li>
        <li>detect fraud, misuse, security incidents, or other prohibited activity;</li>
        <li>send requested newsletters or marketing messages, with an unsubscribe option; and</li>
        <li>comply with legal, tax, accounting, and regulatory obligations.</li>
      </ul>
      <p>
        We may aggregate or de-identify information and use it for any lawful purpose where it can
        no longer reasonably identify you.
      </p>

      <h2>How information is disclosed</h2>
      <p>We may disclose information to:</p>
      <ul>
        <li>
          <strong>Fourthwall and commerce providers</strong> that operate catalog, cart, checkout,
          payment, fraud-prevention, production, shipping, customer-service, and return functions.
        </li>
        <li>
          <strong>Operational providers</strong> that support hosting, analytics, email delivery,
          newsletter subscriptions, and other business systems.
        </li>
        <li>
          <strong>Professional advisers and authorities</strong> where reasonably necessary to
          comply with law, protect rights and safety, prevent fraud, or respond to lawful requests.
        </li>
        <li>
          <strong>A successor organization</strong> in connection with a merger, financing,
          reorganization, or sale of all or part of the business, subject to applicable law.
        </li>
      </ul>
      <p>
        We may also disclose information at your direction or with your consent. Department of
        Consent does not sell mailing lists.
      </p>

      <h2>Fourthwall’s role</h2>
      <p>
        Fourthwall provides the shop’s ecommerce services and is the seller and merchant of record
        for products purchased through its checkout. Its data practices are governed by the{" "}
        <a href="https://fourthwall.com/privacy-policy">Fourthwall Privacy Policy</a>. Fourthwall’s
        policy and checkout notices control its own collection and processing of information.
      </p>

      <h2>Retention and security</h2>
      <p>
        We keep personal information for as long as reasonably needed for the purposes described
        here, including customer support, recordkeeping, dispute resolution, and legal compliance.
        Retention by Fourthwall and other providers is governed by their own policies. We use
        reasonable administrative and technical safeguards, but no website, transmission, or storage
        system can be guaranteed completely secure.
      </p>

      <h2>Your choices and privacy rights</h2>
      <p>
        Depending on where you live, you may have rights to request access to, correction of,
        deletion of, or a copy of your personal information, or to object to or restrict certain
        processing. You may unsubscribe from marketing emails through the link in any message. To
        make a request concerning information controlled by Department of Consent, email{" "}
        <a href={"mailto:" + siteConfig.contactEmail}>{siteConfig.contactEmail}</a>. For checkout,
        payment, or order data controlled by Fourthwall, contact Fourthwall through the support
        details associated with your order.
      </p>

      <h2>International visitors</h2>
      <p>
        Department of Consent and its providers operate in the United States and other countries.
        Your information may therefore be transferred to and processed in places with data laws
        different from those where you live, subject to safeguards required by applicable law.
      </p>

      <h2>Adults only</h2>
      <p>
        The Department of Consent website and shop are intended only for adults aged 18 and older.
        We do not knowingly collect personal information from children. If you believe a child has
        provided information through the shop, contact us so we can take appropriate action.
      </p>

      <h2>Other sites and policy changes</h2>
      <p>
        Links to external websites and hosted checkout pages are governed by those services’ own
        policies. We may update this policy as the shop or law changes. The revised version becomes
        effective when posted, with the “Last updated” date changed above.
      </p>

      <h2>Contact</h2>
      <p>
        Questions or privacy requests may be sent to{" "}
        <a href={"mailto:" + siteConfig.contactEmail}>{siteConfig.contactEmail}</a>.
      </p>
    </ShopPolicyPage>
  );
}
