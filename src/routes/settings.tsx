import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Sticker } from "@/components/Sticker";
import { Button } from "@/components/ui/button";
import { clearGuestData, emptyProfile, useProfile } from "@/lib/storage";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Profile & settings" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const [profile, setProfile] = useProfile();
  const navigate = useNavigate();

  const clearAll = () => {
    if (!confirm("Clear all profile, kink, and scene data saved in this browser?")) return;
    clearGuestData();
    navigate({ to: "/" });
  };

  return (
    <Layout>
      <div className="space-y-5">
        <h1 className="font-display text-3xl text-plum text-center">Profile</h1>

        <Sticker className="space-y-2">
          <Row label="Name" value={profile.name} />
          <Row label="Pronouns" value={profile.pronouns} />
          <Row label="Call me" value={profile.callMe} />
          <Row label="Don't call me" value={profile.dontCallMe} />
          <Row label="Healthcare" value={profile.healthcare} />
          <Row label="Emergency contact" value={profile.emergencyContact} />
          <Row label="Default aftercare" value={profile.defaultAftercare} />
          <div className="flex flex-col items-center gap-3 pt-2">
            <Button asChild>
              <Link to="/onboarding">Edit profile</Link>
            </Button>
            <Link
              to="/kinks"
              className="text-sm text-link underline underline-offset-4 hover:opacity-80"
            >
              Edit kinks
            </Link>
          </div>
        </Sticker>

        <Sticker variant="coral" className="space-y-2">
          <h2 className="font-display text-plum text-center font-normal text-3xl">Your data</h2>
          <p className="text-xs text-muted-foreground">
            This static version saves data only in this browser. Share and response links carry
            scene data for people you send them to.
          </p>
          <div className="flex flex-col items-center gap-2 pt-2">
            <Button variant="outline" onClick={() => setProfile(emptyProfile)}>
              Reset profile
            </Button>
            <button
              onClick={clearAll}
              className="text-sm font-semibold text-destructive underline underline-offset-4 hover:opacity-80"
            >
              Clear all local data
            </button>
          </div>
        </Sticker>
      </div>
    </Layout>
  );
}

function Row({ label, value }: { label: string; value?: string }) {
  return (
    <div className="border-b border-border/40 py-2 last:border-b-0">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
        {label}
      </div>
      <div className="text-sm whitespace-pre-wrap">{value?.trim() || "Not set"}</div>
    </div>
  );
}
