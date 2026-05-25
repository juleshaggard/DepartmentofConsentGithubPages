import {
  deleteStoredSession,
  getStoredSession,
  mergePartnerSide,
  saveStoredSession,
  type PlaySession,
  type SessionSide,
} from "@/lib/storage";

type Patch = Partial<{
  partner_handle: string;
  date: string;
  status: string;
  owner_side: SessionSide;
  partner_side: SessionSide | null;
  reflection: string | null;
  aftercare_completed: string[];
}>;

export async function apiCreateSession(
  s: Pick<PlaySession, "shareToken" | "partnerHandle" | "date" | "status" | "ownerSide">,
): Promise<PlaySession> {
  const session: PlaySession = {
    id: s.shareToken,
    shareToken: s.shareToken,
    partnerHandle: s.partnerHandle,
    date: s.date,
    createdAt: new Date().toISOString(),
    status: s.status,
    ownerSide: s.ownerSide,
    aftercareCompleted: [],
  };
  saveStoredSession(session, "owner");
  return session;
}

export async function apiGetSession(token: string): Promise<PlaySession | null> {
  return getStoredSession(token);
}

export async function apiUpdateSession(token: string, patch: Patch): Promise<PlaySession> {
  const current = getStoredSession(token);
  if (!current) throw new Error("Scene not found in this browser.");
  const updated: PlaySession = {
    ...current,
    partnerHandle: patch.partner_handle ?? current.partnerHandle,
    date: patch.date ?? current.date,
    status: (patch.status as PlaySession["status"] | undefined) ?? current.status,
    ownerSide: patch.owner_side ?? current.ownerSide,
    partnerSide:
      patch.partner_side === undefined ? current.partnerSide : (patch.partner_side ?? undefined),
    partnerSides:
      patch.partner_side === undefined
        ? current.partnerSides
        : patch.partner_side
          ? [patch.partner_side]
          : [],
    reflection:
      patch.reflection === undefined ? current.reflection : (patch.reflection ?? undefined),
    aftercareCompleted: patch.aftercare_completed ?? current.aftercareCompleted,
  };
  saveStoredSession(updated, "owner");
  return updated;
}

export async function apiAddPartnerSide(token: string, side: SessionSide): Promise<PlaySession> {
  const current = getStoredSession(token);
  if (!current) throw new Error("Scene not found in this browser.");
  const updated = mergePartnerSide(current, side);
  saveStoredSession(updated, "partner");
  return updated;
}

export async function apiDeleteSession(token: string): Promise<void> {
  deleteStoredSession(token);
}
