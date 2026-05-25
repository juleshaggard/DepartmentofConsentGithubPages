import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Department of Consent" },
      {
        name: "description",
        content: "How Department of Consent collects, uses, and protects your information.",
      },
      { property: "og:title", content: "Privacy Policy — Department of Consent" },
      {
        property: "og:description",
        content: "How Department of Consent collects, uses, and protects your information.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <Layout showFooter>
      <article className="prose prose-sm max-w-none space-y-4">
        <h1 className="font-display text-4xl text-plum">Privacy Policy</h1>
        <p className="text-xs text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <p>
          Department of Consent ("we", "us") helps people negotiate kink, limits, and aftercare. We
          take your privacy seriously and try to collect as little as possible.
        </p>

        <h2 className="font-display text-2xl text-plum pt-4">What we collect</h2>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>
            <strong>Local profile content:</strong> name/handle, pronouns, names you do and don't
            like, healthcare and emergency contact info, default safewords and aftercare needs.
          </li>
          <li>
            <strong>Local kink ratings, scenes, and partner replies:</strong> the limits, scenes,
            and shared scenes you create or receive in this browser.
          </li>
          <li>
            <strong>Encoded links:</strong> scene links contain the scene data needed for another
            browser to read or respond.
          </li>
        </ul>

        <h2 className="font-display text-2xl text-plum pt-4">Where it lives</h2>
        <p>
          This GitHub Pages version stores profile, kink ratings, scenes, and preferences in your
          browser's local storage. There is no Department of Consent server account for this static
          build. If you clear browser data or switch devices, local scenes will not follow you
          unless you kept a scene link.
        </p>

        <h2 className="font-display text-2xl text-plum pt-4">Sharing</h2>
        <p>
          When you generate a share link for a play partner, the contents of that scene (including
          the limits and details you've chosen to share) are encoded into the link and visible to
          anyone who has it. We don't sell your data and we don't share it with advertisers.
        </p>

        <h2 className="font-display text-2xl text-plum pt-4">Your rights</h2>
        <p>
          You can edit your profile or erase data stored on your device from the Profile page.
          Anyone you sent a scene link to may still have a copy of the data in that link.
        </p>

        <h2 className="font-display text-2xl text-plum pt-4">Contact</h2>
        <p>
          Questions? Email <strong>support@departmentofconsent.com</strong>.
        </p>
      </article>
    </Layout>
  );
}
