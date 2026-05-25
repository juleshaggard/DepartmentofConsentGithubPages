import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Sticker } from "@/components/Sticker";
import { CloudButton } from "@/components/CloudButton";

export const Route = createFileRoute("/checkout/return")({
  head: () => ({ meta: [{ title: "Free static version — Department of Consent" }] }),
  component: CheckoutRemovedPage,
});

function CheckoutRemovedPage() {
  return (
    <Layout>
      <Sticker className="text-center space-y-4">
        <h1 className="font-display text-3xl text-plum">No checkout here</h1>
        <p className="text-sm text-muted-foreground">
          The GitHub Pages version does not use Stripe or accounts.
        </p>
        <CloudButton to="/sessions/new">Start a scene</CloudButton>
      </Sticker>
    </Layout>
  );
}
