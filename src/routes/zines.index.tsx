import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/zines/")({
  beforeLoad: () => {
    throw redirect({ to: "/guides", replace: true, statusCode: 301 });
  },
  component: () => null,
});
