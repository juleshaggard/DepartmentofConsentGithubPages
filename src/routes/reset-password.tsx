import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Sticker } from "@/components/Sticker";
import { CloudButton } from "@/components/CloudButton";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [{ title: "No account needed — Department of Consent" }] }),
  component: RemovedAccountRoute,
});

function RemovedAccountRoute() {
  return (
    <Layout>
      <Sticker className="text-center space-y-4">
        <h1 className="font-display text-3xl text-plum">No password to reset</h1>
        <p className="text-sm text-muted-foreground">This static version does not use accounts.</p>
        <CloudButton to="/sessions/new">Start a scene</CloudButton>
      </Sticker>
    </Layout>
  );
}
