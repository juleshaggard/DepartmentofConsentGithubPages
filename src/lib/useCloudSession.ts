import { useCallback, useEffect, useState } from "react";
import {
  deleteStoredSession,
  getStoredSession,
  mergePartnerSide,
  saveStoredSession,
  type PlaySession,
  type SessionSide,
} from "@/lib/storage";
import { clearSceneHash, decodeScene, encodedSceneFromHash } from "@/lib/sceneLinks";

type Patch = Partial<{
  partner_handle: string;
  date: string;
  status: string;
  owner_side: SessionSide;
  partner_side: SessionSide | null;
  reflection: string | null;
  aftercare_completed: string[];
}>;

function applyPatch(session: PlaySession, patch: Patch): PlaySession {
  return {
    ...session,
    partnerHandle: patch.partner_handle ?? session.partnerHandle,
    date: patch.date ?? session.date,
    status: (patch.status as PlaySession["status"] | undefined) ?? session.status,
    ownerSide: patch.owner_side ?? session.ownerSide,
    partnerSide:
      patch.partner_side === undefined ? session.partnerSide : (patch.partner_side ?? undefined),
    partnerSides:
      patch.partner_side === undefined
        ? session.partnerSides
        : patch.partner_side
          ? [patch.partner_side]
          : [],
    reflection:
      patch.reflection === undefined ? session.reflection : (patch.reflection ?? undefined),
    aftercareCompleted: patch.aftercare_completed ?? session.aftercareCompleted,
  };
}

export function useCloudSession(token: string | undefined) {
  const [session, setSession] = useState<PlaySession | null | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!token) return;
    const encoded = encodedSceneFromHash();
    if (encoded) {
      try {
        const linked = await decodeScene(encoded);
        if (linked.shareToken !== token) {
          throw new Error("This scene link does not match the current page.");
        }
        saveStoredSession(linked, "partner");
        setSession(linked);
        setError(null);
        clearSceneHash();
        return;
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to read scene link");
        setSession(null);
        return;
      }
    }

    const stored = getStoredSession(token);
    setSession(stored);
    setError(stored ? null : "This scene is only stored in the browser or link that created it.");
  }, [token]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    const reload = () => refresh();
    window.addEventListener("storage", reload);
    window.addEventListener("doc_guest_storage", reload);
    return () => {
      window.removeEventListener("storage", reload);
      window.removeEventListener("doc_guest_storage", reload);
    };
  }, [refresh]);

  const update = useCallback(
    async (patch: Patch) => {
      if (!token) return;
      const current = getStoredSession(token) ?? session;
      if (!current) throw new Error("Scene not found in this browser.");
      const updated = applyPatch(current, patch);
      saveStoredSession(updated, "owner");
      setSession(updated);
      return updated;
    },
    [session, token],
  );

  const addPartner = useCallback(
    async (side: SessionSide) => {
      if (!token) return;
      const current = getStoredSession(token) ?? session;
      if (!current) throw new Error("Scene not found in this browser.");
      const updated = mergePartnerSide(current, side);
      saveStoredSession(updated, "partner");
      setSession(updated);
      return updated;
    },
    [session, token],
  );

  const remove = useCallback(async () => {
    if (!token) return;
    deleteStoredSession(token);
    setSession(null);
  }, [token]);

  return { session, error, refresh, update, addPartner, remove } as const;
}
