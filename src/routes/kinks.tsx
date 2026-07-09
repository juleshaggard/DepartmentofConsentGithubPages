import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Layout } from "@/components/Layout";
import { WhipLoader } from "@/components/WhipLoader";

export const Route = createFileRoute("/kinks")({
  head: () => ({ meta: [{ title: "New scene — Department of Consent" }] }),
  component: KinksRemovedRedirect,
});

function KinksRemovedRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate({ to: "/sessions/new", replace: true });
  }, [navigate]);

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[60vh]">
        <WhipLoader />
      </div>
    </Layout>
  );
}
