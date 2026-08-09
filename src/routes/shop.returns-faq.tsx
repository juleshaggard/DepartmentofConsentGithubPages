import { createFileRoute, Link } from "@tanstack/react-router";
import { ShopPolicyPage } from "@/components/shop/ShopPolicyPage";
import { siteConfig } from "@/config/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/shop/returns-faq")({
  head: () =>
    pageHead({
      title: "Shop Returns & FAQ | Department of Consent",
      description:
        "Answers about Department of Consent shop returns, quality issues, cancellations, refunds, payments, and international orders.",
      path: "/shop/returns-faq",
    }),
  component: ShopReturnsPage,
});

function ShopReturnsPage() {
  return (
    <ShopPolicyPage title="Returns & FAQ" path="/shop/returns-faq" eyebrow="Orders and support">
      <p>
        We want your order to arrive as described and free from production defects. Department of
        Consent uses Fourthwall for checkout, production, fulfillment, and order support. Because
        most pieces are made or prepared to order, the rules below differ from a conventional retail
        return policy.
      </p>

      <h2>What if my item is damaged or has a quality issue?</h2>
      <p>
        If your order arrives damaged, misprinted, or with another visible production issue, report
        it within 30 days of receiving it. Fourthwall will review eligible defects for a replacement
        or refund under its quality guarantee.
      </p>
      <p>
        Include your order number and clear photographs showing the entire item and the specific
        issue. Place the item flat in a well-lit area so the photos can be reviewed. Use the support
        link in your order email where available, or email{" "}
        <a href={"mailto:" + siteConfig.contactEmail}>{siteConfig.contactEmail}</a> so we can direct
        your request correctly.
      </p>

      <h2>Can I return an item because I changed my mind or chose the wrong size?</h2>
      <p>
        No. Made-to-order products are not eligible for general returns, exchanges, or refunds,
        including returns based on fit, size selection, color preference, or a change of mind. Check
        the product description, measurements, and selected variant carefully before placing your
        order.
      </p>

      <h2>Can I cancel or change an order?</h2>
      <p>
        If the order has not entered production, you may be able to edit or cancel it using the link
        in your confirmation email. Once production has begun, an order generally cannot be changed
        or cancelled. If you discover an error, act as quickly as possible through the confirmation
        email or order-support channel; a request is not guaranteed until Fourthwall confirms it.
      </p>

      <h2>How are approved refunds handled?</h2>
      <p>
        Approved refunds are returned to the original payment method. PayPal refunds may appear
        within approximately one business day; card and bank processing commonly takes 7–10 business
        days after approval, depending on the financial institution. Timing outside Fourthwall’s
        control may vary.
      </p>

      <h2>What payment methods are accepted?</h2>
      <p>
        Available methods are displayed at Fourthwall checkout and may depend on your device,
        location, currency, and order. Common options may include major payment cards, PayPal, Apple
        Pay, Google Pay, or eligible local and installment methods. Checkout is authoritative if an
        option is unavailable.
      </p>

      <h2>Who handles my order?</h2>
      <p>
        Fourthwall is the seller and merchant of record for products purchased through its hosted
        checkout and handles payment, fulfillment, order inquiries, eligible returns, and refunds.
        Department of Consent designs and presents the shop and can help route a request, but cannot
        override Fourthwall’s production or payment decisions.
      </p>

      <h2>What about international duties and taxes?</h2>
      <p>
        International shipments may be subject to import tax, customs duty, brokerage fees, or
        similar charges imposed by the destination country. Where available, these amounts may be
        collected at checkout; otherwise, the recipient is responsible for charges assessed on
        delivery. Check the checkout notice and your local customs authority before ordering.
      </p>

      <h2>Where can I read the related terms?</h2>
      <p>
        See the Department of Consent shop <Link to="/shop/privacy-policy">Privacy Policy</Link> and{" "}
        <Link to="/shop/terms-of-service">Terms of Service</Link>. Fourthwall also publishes its{" "}
        <a href="https://fourthwall.com/privacy-policy">Privacy Policy</a> and{" "}
        <a href="https://fourthwall.com/terms-of-service">Terms of Service</a>, which apply to its
        checkout and commerce services.
      </p>

      <h2>Still need help?</h2>
      <p>
        Keep your order number handy and email{" "}
        <a href={"mailto:" + siteConfig.contactEmail}>{siteConfig.contactEmail}</a>. For the fastest
        resolution, use the Fourthwall support link in your order confirmation when one is provided.
      </p>
    </ShopPolicyPage>
  );
}
