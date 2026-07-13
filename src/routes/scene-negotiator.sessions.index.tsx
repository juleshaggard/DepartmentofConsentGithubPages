import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Sticker } from "@/components/Sticker";
import { CloudButton } from "@/components/CloudButton";
import { useMySessions, useKinks, generateSceneTitle } from "@/lib/storage";
import { Calendar } from "lucide-react";
import { WhipLoader } from "@/components/WhipLoader";
import { useMemo } from "react";
import emptySessionsImg from "@/assets/empty-sessions.png";

export const Route = createFileRoute("/scene-negotiator/sessions/")({
  head: () => ({ meta: [{ title: "Scenes — Scene Negotiator" }] }),
  component: SessionsList,
});

function SessionsList() {
  const { data: sessions, isLoading } = useMySessions();
  const [kinks] = useKinks();
  const kinkMap = useMemo(() => Object.fromEntries(kinks.map((k) => [k.id, k.name])), [kinks]);
  const sorted = (sessions ?? []).slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <Layout>
      <div className="space-y-5">
        <div className="text-center">
          <h1 className="font-display text-[2.8rem] sm:text-5xl text-plum leading-[1]">Scenes</h1>
          <p className="text-sm text-muted-foreground leading-[1.45]">
            Active and past play saved in this browser.
          </p>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center min-h-[60vh]">
            <WhipLoader />
          </div>
        )}

        {!isLoading && sorted.length === 0 && (
          <Sticker className="text-center space-y-4 py-10 sm:py-12">
            <img src={emptySessionsImg} alt="" className="h-32 w-32 mx-auto object-contain" />
            <p className="font-display text-2xl text-plum">No scenes yet</p>
            <p className="text-sm text-muted-foreground leading-[1.45]">
              Your first negotiation is just a tap away.
            </p>
            <div className="flex justify-center pt-1">
              <CloudButton to="/scene-negotiator/sessions/new" className="cloud-btn-sm">
                Create one
              </CloudButton>
            </div>
          </Sticker>
        )}

        <div className="space-y-5">
          {sorted.map((s) => (
            <Link
              key={s.shareToken}
              to="/scene-negotiator/sessions/$sessionId"
              params={{ sessionId: s.shareToken }}
              className="block"
            >
              <Sticker className="motion-card">
                <div className="flex justify-between items-start gap-3">
                  <div className="min-w-0">
                    <div className="font-display text-xl text-plum truncate">
                      {generateSceneTitle(s.ownerSide, kinkMap) ||
                        s.partnerHandle ||
                        "Untitled scene"}
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <Calendar className="h-3 w-3" />
                      {s.date}
                    </div>
                  </div>
                  <span className="text-[10px] uppercase px-2 py-1 rounded-full font-semibold bg-blush text-plum">
                    {s.role === "partner" ? "Joined" : "Creator"}
                  </span>
                </div>
              </Sticker>
            </Link>
          ))}
        </div>

        {!isLoading && sorted.length > 0 && (
          <div className="flex justify-center pt-4">
            <CloudButton to="/scene-negotiator/sessions/new">+ New scene</CloudButton>
          </div>
        )}
      </div>
    </Layout>
  );
}
