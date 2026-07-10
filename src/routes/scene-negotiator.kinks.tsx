import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Layout } from "@/components/Layout";
import { WhipLoader } from "@/components/WhipLoader";

export const Route = createFileRoute("/scene-negotiator/kinks")({
  head: () => ({ meta: [{ title: "New scene — Scene Negotiator" }] }),
  component: KinksRemovedRedirect,
});

function KinksRemovedRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate({ to: "/scene-negotiator/sessions/new", replace: true });
  }, [navigate]);

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[60vh]">
        <WhipLoader />
      </div>
    </Layout>
  );
}
