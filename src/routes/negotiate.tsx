import { createFileRoute } from "@tanstack/react-router";
import {
  negotiationFormDescription,
  negotiationFormPath,
  negotiationFormTitle,
  PlayPartyNegotiationFormPage,
} from "./play-party-negotiation-form";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/negotiate")({
  head: () =>
    pageHead({
      title: negotiationFormTitle,
      description: negotiationFormDescription,
      path: negotiationFormPath,
    }),
  component: PlayPartyNegotiationFormPage,
});
