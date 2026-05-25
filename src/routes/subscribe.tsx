import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Sticker } from "@/components/Sticker";
import { CloudButton } from "@/components/CloudButton";

export const Route = createFileRoute("/subscribe")({
  head: () => ({ meta: [{ title: "Free static version — Department of Consent" }] }),
  component: SubscribeRemovedPage,
});

function SubscribeRemovedPage() {
  return (
    <Layout>
      <Sticker className="text-center space-y-4">
        <h1 className="font-display text-3xl text-plum">Free static version</h1>
        <p className="text-sm text-muted-foreground">
          Subscriptions are not part of this GitHub Pages build. Everything here runs locally in
          your browser.
        </p>
        <CloudButton to="/sessions/new">Start a scene</CloudButton>
      </Sticker>
    </Layout>
  );
}
