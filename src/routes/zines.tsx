import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/zines")({
  component: LegacyGuideLayout,
});

function LegacyGuideLayout() {
  return <Outlet />;
}
