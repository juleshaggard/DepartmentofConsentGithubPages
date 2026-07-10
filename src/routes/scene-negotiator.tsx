import { createFileRoute, Outlet } from "@tanstack/react-router";

// Scene Negotiator is intentionally unlinked from the marketing site and
// excluded from indexing. "Hidden" means unlinked + noindex, not access-controlled.
export const Route = createFileRoute("/scene-negotiator")({
  // The app is a localStorage-only client app; keep it client-rendered.
  ssr: false,
  head: () => ({
    meta: [{ name: "robots", content: "noindex, nofollow" }],
  }),
  component: SceneNegotiatorLayout,
});

function SceneNegotiatorLayout() {
  return <Outlet />;
}
