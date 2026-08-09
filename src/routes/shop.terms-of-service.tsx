import { createFileRoute, Link } from "@tanstack/react-router";
import { ShopPolicyPage } from "@/components/shop/ShopPolicyPage";
import { siteConfig } from "@/config/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/shop/terms-of-service")({
  head: () =>
    pageHead({
      title: "Shop Terms of Service | Department of Consent",
      description:
        "Terms governing use of the Department of Consent shop and purchases completed through Fourthwall.",
      path: "/shop/terms-of-service",
    }),
  component: ShopTermsPage,
});

function ShopTermsPage() {
  return (
    <ShopPolicyPage title="Terms of Service" path="/shop/terms-of-service">
      <p>
        These Shop Terms of Service (“Terms”) govern your use of the Department of Consent shop and
        its product pages (the “Shop”). By accessing the Shop, adding an item to a cart, or making a
        purchase, you agree to these Terms. If you do not agree, do not use the Shop.
      </p>

      <h2>Department of Consent and Fourthwall</h2>
      <p>
        Department of Consent controls the Shop’s design, editorial content, and product
        presentation. Fourthwall provides the ecommerce platform, cart, hosted checkout, payment,
        production, fulfillment, returns, and related commerce services. Fourthwall—not Department
        of Consent—is the seller and merchant of record for products purchased through Fourthwall’s
        checkout. Your purchase is also subject to the terms and notices displayed by Fourthwall at
        checkout, including Fourthwall’s{" "}
        <a href="https://fourthwall.com/terms-of-service">Terms of Service</a> and{" "}
        <a href="https://fourthwall.com/privacy-policy">Privacy Policy</a>.
      </p>

      <h2>Adults only</h2>
      <p>
        You must be at least 18 years old and have legal capacity to use the Shop. You are
        responsible for complying with the laws that apply where you live and where a product will
        be delivered or used.
      </p>

      <h2>Product information and availability</h2>
      <p>
        We aim to describe and photograph products accurately, but screens, materials, and
        made-to-order production can produce minor variations in color, texture, dimensions, or
        finish. Product descriptions, images, prices, variants, stock, and availability may change
        without notice. Placing an item in a cart does not reserve it. Fourthwall may refuse or
        cancel an order where a product is unavailable, incorrectly priced, restricted, or suspected
        of fraud or misuse.
      </p>

      <h2>Orders, prices, and payment</h2>
      <p>
        Prices are shown in U.S. dollars unless the Shop or checkout states otherwise. Shipping,
        tax, duties, and other charges are shown or calculated during checkout where available. You
        authorize Fourthwall and its payment providers to charge the payment method you select for
        the total shown at checkout. An order is accepted only when confirmed by Fourthwall.
      </p>
      <p>
        We may correct pricing or catalog errors and may change prices or promotions at any time.
        Changes do not affect an already accepted order except where required to correct an obvious
        error and permitted by law.
      </p>

      <h2>Production, shipping, and delivery</h2>
      <p>
        Many products are made or prepared after purchase. Production and delivery estimates are not
        guarantees. Fourthwall and its suppliers or carriers may experience delays outside
        Department of Consent’s control. You are responsible for providing a complete and accurate
        delivery address and for charges or losses caused by an incorrect address, subject to
        applicable law and Fourthwall’s policies.
      </p>

      <h2>Cancellations, returns, and refunds</h2>
      <p>
        Made-to-order products generally cannot be returned or exchanged for fit, size selection,
        preference, or a change of mind. Eligible manufacturing defects or visible quality issues
        reported within 30 days of receipt may qualify for replacement or refund after review. Order
        changes and cancellations may be possible only before production begins. The complete
        process is described in our <Link to="/shop/returns-faq">Returns &amp; FAQ</Link> page, and
        Fourthwall’s checkout and order terms remain authoritative for the transaction.
      </p>

      <h2>Safe and lawful use</h2>
      <p>
        Products are offered to adults for lawful, consensual use. Read all product information,
        inspect an item before each use, stop using damaged or worn items, and use judgment
        appropriate to the activity and people involved. Product content is not medical, legal, or
        safety advice, and no product replaces communication, informed consent, appropriate skill,
        or professional guidance.
      </p>

      <h2>Permission to use the Shop</h2>
      <p>
        Subject to these Terms, Department of Consent grants you a limited, personal,
        non-commercial, non-transferable, revocable right to access and use the Shop. You may not:
      </p>
      <ul>
        <li>use the Shop for unlawful, fraudulent, abusive, or harmful activity;</li>
        <li>interfere with the Shop, checkout, security controls, or another person’s use;</li>
        <li>
          introduce malicious code, scrape at unreasonable volume, or attempt unauthorized access;
        </li>
        <li>impersonate another person or submit inaccurate payment or delivery information;</li>
        <li>infringe intellectual-property, privacy, publicity, or other rights; or</li>
        <li>copy, resell, or commercially exploit Shop content without written permission.</li>
      </ul>

      <h2>Intellectual property</h2>
      <p>
        The Shop’s branding, text, photography, artwork, product designs, layout, and other content
        are owned by Department of Consent or its licensors and are protected by applicable law.
        Fourthwall retains rights in its platform and services. No rights are granted except the
        limited permission expressly stated in these Terms.
      </p>

      <h2>Feedback</h2>
      <p>
        If you voluntarily send suggestions about the Shop, you allow Department of Consent to use
        those suggestions without restriction or compensation, provided that this does not transfer
        ownership of personal information or creative work you identify as confidential.
      </p>

      <h2>Third-party services and links</h2>
      <p>
        The Shop links to and depends on services operated by others, including Fourthwall, payment
        providers, carriers, and analytics providers. Department of Consent does not control those
        services. Their terms and policies apply when you use them, and links do not imply an
        endorsement of unrelated third-party content.
      </p>

      <h2>Disclaimer of warranties</h2>
      <p>
        To the fullest extent permitted by law, the Shop and Department of Consent content are
        provided “as is” and “as available,” without express or implied warranties. We do not
        promise that the Shop will always be available, uninterrupted, secure, error-free, or that
        every description or image will be free from minor inaccuracies. Rights that cannot legally
        be waived remain unaffected.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, Department of Consent and its owner, personnel, and
        licensors will not be liable for indirect, incidental, special, consequential, exemplary, or
        punitive damages arising from use of or inability to use the Shop. Nothing in these Terms
        excludes liability that cannot be excluded under applicable law. Fourthwall’s responsibility
        for product orders is governed by the terms applying to its checkout and services.
      </p>

      <h2>Indemnity</h2>
      <p>
        To the extent permitted by law, you agree to indemnify and hold Department of Consent
        harmless from third-party claims, losses, and reasonable costs arising from your unlawful
        misuse of the Shop, violation of these Terms, or infringement of another person’s rights.
      </p>

      <h2>Suspension and changes</h2>
      <p>
        We may modify, suspend, or discontinue all or part of the Shop, and may restrict access for
        conduct that violates these Terms or threatens the Shop or others. We may update these Terms
        by posting a revised version and changing the “Last updated” date. Continued use after an
        update means you accept the revised Terms to the extent permitted by law.
      </p>

      <h2>Governing law and general terms</h2>
      <p>
        These Terms are governed by California law, without regard to conflict-of-law rules, except
        where consumer law in your location requires otherwise. If any provision is unenforceable,
        it will be limited to the minimum extent necessary and the remaining provisions will remain
        in effect. A failure to enforce one provision is not a waiver. These Terms, the shop{" "}
        <Link to="/shop/privacy-policy">Privacy Policy</Link>, and the{" "}
        <Link to="/shop/returns-faq">Returns &amp; FAQ</Link> are the agreement between you and
        Department of Consent regarding your use of the Shop; Fourthwall’s separate terms govern its
        commerce services and the transaction.
      </p>

      <h2>Electronic communications and contact</h2>
      <p>
        You agree that order confirmations, notices, and other transaction communications may be
        delivered electronically. Questions about these Terms may be sent to{" "}
        <a href={"mailto:" + siteConfig.contactEmail}>{siteConfig.contactEmail}</a>. Questions about
        a purchase should use the Fourthwall support details included with the order whenever
        available.
      </p>
    </ShopPolicyPage>
  );
}
