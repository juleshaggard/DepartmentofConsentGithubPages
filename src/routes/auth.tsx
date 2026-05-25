import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Sticker } from "@/components/Sticker";
import { CloudButton } from "@/components/CloudButton";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "No account needed — Department of Consent" }] }),
  component: AuthRemovedPage,
});

function AuthRemovedPage() {
  return (
    <Layout>
      <Sticker className="text-center space-y-4">
        <h1 className="font-display text-3xl text-plum">No account needed</h1>
        <p className="text-sm text-muted-foreground">
          This GitHub Pages version runs entirely in your browser. Start a scene or edit your local
          profile.
        </p>
        <div className="flex flex-col items-center gap-2">
          <CloudButton to="/sessions/new">Start a scene</CloudButton>
          <CloudButton variant="outline" to="/onboarding">
            Edit profile
          </CloudButton>
        </div>
      </Sticker>
    </Layout>
  );
}
