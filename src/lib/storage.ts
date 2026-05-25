import { useEffect, useState, useCallback } from "react";
import { nanoid } from "nanoid";

// ===== Types =====

export type Rating = "yes" | "maybe" | "no" | "unsure";
export type Direction = "give" | "receive" | "both";
export type KinkDirections = Record<string, Direction>;

export interface Profile {
  name: string;
  pronouns: string;
  callMe: string;
  dontCallMe: string;
  healthcare: string;
  emergencyContact: string;
  defaultAftercare: string;
  defaultSafewords: string;
}

export interface KinkItem {
  id: string;
  name: string;
  category: string;
  custom?: boolean;
}

export type KinkRatings = Record<string, Rating>;

export interface SessionSide {
  participantId: string;
  name: string;
  pronouns: string;
  filledAt?: string;
  healthcare: string;
  emergencyContact: string;
  partnerDynamics: string;
  timeConstraints: string;
  medicalConcerns: string;
  substances: string;
  substancesHardLimit: boolean;
  setting: string;
  music: string;
  dress: string;
  callMe: string;
  dontCallMe: string;
  genitalsRefer?: string;
  intentions: string;
  goodTime: string;
  badTime: string;
  privacy: string;
  talkingAfter?: string;
  penetrativeSex: string;
  stdTestDate?: string;
  stdTestResults?: string;
  prepDoxypep?: string;
  birthControl?: string;
  timeOfPlay?: string;
  safewords: string;
  safewordItems?: string[];
  vision: string;
  selectedKinks: string[];
  actions: string;
  hardLimits: string;
  softLimits: string;
  yesList: string;
  aftercare: string;
  aftercareItems?: string[];
  brainstorm: string;
  ratings: KinkRatings;
  directions?: KinkDirections;
}

export type SessionStatus = "draft" | "shared" | "agreed" | "completed";

export interface PlaySession {
  id: string;
  shareToken: string;
  partnerHandle: string;
  date: string;
  createdAt: string;
  status: SessionStatus;
  ownerSide: SessionSide;
  partnerSide?: SessionSide;
  partnerSides?: SessionSide[];
  reflection?: string;
  aftercareCompleted?: string[];
}

// ===== Defaults =====

export const DEFAULT_KINKS: KinkItem[] = [
  // Intimacy
  { id: "k_handstuff", name: "Hand stuff", category: "Intimacy" },
  { id: "k_kissing", name: "Kissing", category: "Intimacy" },
  { id: "k_cock_sucking", name: "Cock sucking", category: "Intimacy" },
  { id: "k_pussy_eating", name: "Pussy eating", category: "Intimacy" },
  { id: "k_fucking", name: "Fucking", category: "Intimacy" },
  { id: "k_anal", name: "Anal play", category: "Intimacy" },
  { id: "k_toys", name: "Toys", category: "Intimacy" },

  // Sensation
  { id: "k_sensation", name: "Sensation", category: "Sensation" },
  { id: "k_temp", name: "Temperature play (ice/wax)", category: "Sensation" },
  { id: "k_scratch", name: "Scratching", category: "Sensation" },

  { id: "k_bite", name: "Biting", category: "Sensation" },
  { id: "k_tickle", name: "Tickling", category: "Sensation" },
  { id: "k_pinch", name: "Pinching", category: "Sensation" },
  { id: "k_ear_licking", name: "Ear licking", category: "Sensation" },
  { id: "k_electro", name: "Electro", category: "Sensation" },

  // Impact
  { id: "k_impact", name: "Impact", category: "Impact" },
  { id: "k_spank_hand", name: "Spanking (hand)", category: "Impact" },
  { id: "k_paddle", name: "Paddling", category: "Impact" },
  { id: "k_flog", name: "Flogging", category: "Impact" },
  { id: "k_cane", name: "Caning", category: "Impact" },
  { id: "k_slap_face", name: "Face slapping", category: "Impact" },
  { id: "k_whipping", name: "Whipping", category: "Impact" },
  { id: "k_body_punching", name: "Body punching", category: "Impact" },
  { id: "k_face_punching", name: "Face punching", category: "Impact" },

  // Bondage
  { id: "k_rope", name: "Rope bondage", category: "Bondage" },
  { id: "k_cuffs", name: "Cuffs / restraints", category: "Bondage" },
  { id: "k_blindfold", name: "Blindfold", category: "Bondage" },
  { id: "k_gag", name: "Gag", category: "Bondage" },
  { id: "k_collar", name: "Collar / leash", category: "Bondage" },
  { id: "k_grabbing", name: "Grabbing / restraining", category: "Bondage" },
  { id: "k_hand_mouth", name: "Hand over mouth", category: "Bondage" },
  { id: "k_saran_wrap", name: "Saran Wrap", category: "Bondage" },

  // Power exchange
  { id: "k_dom", name: "Dominance", category: "Power exchange" },
  { id: "k_sub", name: "Submission", category: "Power exchange" },
  { id: "k_brat", name: "Brat / bratty play", category: "Power exchange" },
  { id: "k_service", name: "Service", category: "Power exchange" },
  { id: "k_humil", name: "Humiliation (light)", category: "Power exchange" },
  { id: "k_degrade", name: "Degradation", category: "Power exchange" },
  { id: "k_praise", name: "Praise", category: "Power exchange" },

  // Sensory
  { id: "k_sensory_dep", name: "Sensory deprivation", category: "Sensory" },
  { id: "k_overstim", name: "Overstimulation", category: "Sensory" },

  // Roleplay
  { id: "k_role_age", name: "Age play (adult)", category: "Roleplay" },
  { id: "k_ageplay_girl", name: "Ageplay / Little girl", category: "Roleplay" },
  { id: "k_role_pet", name: "Pet play", category: "Roleplay" },
  { id: "k_role_primal", name: "Primal play", category: "Roleplay" },
  { id: "k_fuckdoll", name: "Fuckdoll roleplay", category: "Roleplay" },

  // Edge / Taboo
  { id: "k_breath", name: "Breath play", category: "Edge" },
  { id: "k_choking", name: "Choking and strangulation", category: "Edge" },
  { id: "k_knife", name: "Knife / edge play", category: "Edge" },
  { id: "k_blood", name: "Blood play", category: "Edge" },
  { id: "k_fire", name: "Fire play", category: "Edge" },
  { id: "k_fingers_throat", name: "Fingers down throat", category: "Edge" },
  { id: "k_spitting", name: "Spitting", category: "Edge" },
  { id: "k_throat_fucking", name: "Throat fucking", category: "Edge" },
  { id: "k_deepthroat_training", name: "Deepthroat training", category: "Edge" },
  { id: "k_tit_torture", name: "Tit torture", category: "Edge" },
  { id: "k_pussy_torture", name: "Pussy torture", category: "Edge" },
  { id: "k_orgasm_control", name: "Orgasm control", category: "Edge" },
  { id: "k_hypno", name: "Hypno", category: "Edge" },
  { id: "k_unconscious", name: "Unconscious play and fucking", category: "Edge" },
  { id: "k_cnc", name: "Cnc / rape play", category: "Edge" },
  { id: "k_incest", name: "Incest play", category: "Edge" },
  { id: "k_molestation", name: "Molestation", category: "Edge" },
  { id: "k_pissing", name: "Pissing", category: "Edge" },
  { id: "k_pacifier", name: "Pacifier", category: "Edge" },
  { id: "k_vomitting", name: "Vomitting from throat fucking", category: "Edge" },
];

export const DEFAULT_SAFEWORDS = `Verbal:
Red — stop the scene, something is wrong and we can't continue.
Yellow — check in.
Green — good, keep going.
Mercy — no more on the same spot.

Non-verbal:
Thumb up — keep going.
Enthusiastic thumb up — more more more please.
Thumb side — right here is good, no more no less.
Thumb down, double tap — check in please.`;

export const DEFAULT_AFTERCARE_ITEMS: string[] = [
  "Drink water",
  "Eat a snack",
  "Cuddle or maintain comforting physical contact",
  "Offer reassurance and praise",
  "Check emotional state",
  "Confirm consent and boundaries felt respected",
  "Rest quietly together",
  "Use blankets or regulate body temperature",
  "Remove restraints/gear carefully",
  "Check for injuries, bruising, numbness, or circulation problems",
  "Clean and treat marks or wounds",
  "Practice grounding or deep breathing",
  "Create a calm, low-stimulation environment",
  "Allow space for emotions and processing",
  "Ask \u201cWhat do you need right now?\u201d",
  "Discuss what worked well in the scene",
  "Discuss anything uncomfortable or unexpected",
  "Shower, bathe, or freshen up",
  "Sleep or take a nap if needed",
  "Follow up later with a text or check-in",
];

export const DEFAULT_SAFEWORD_ITEMS: string[] = [
  "Red — stop the scene, something is wrong and we can't continue.",
  "Yellow — check in.",
  "Green — good, keep going.",
  "Mercy — no more on the same spot.",
  "Thumb up — keep going.",
  "Enthusiastic thumb up — more more more please.",
  "Thumb side — right here is good, no more no less.",
  "Thumb down, double tap — check in please.",
];

export const emptyProfile: Profile = {
  name: "",
  pronouns: "",
  callMe: "",
  dontCallMe: "",
  healthcare: "",
  emergencyContact: "",
  defaultAftercare: "",
  defaultSafewords: DEFAULT_SAFEWORDS,
};

// ===== Guest-local profile state =====

const KEY_PROFILE = "doc_guest_profile_v1";
const KEY_KINKS = "doc_guest_kinks_v1";
const KEY_RATINGS = "doc_guest_ratings_v1";
const KEY_DIRECTIONS = "doc_guest_directions_v1";
const KEY_SESSIONS = "doc_guest_sessions_v1";
const STORAGE_EVENT = "doc_guest_storage";

function emitGuestStorageChange() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(STORAGE_EVENT));
}

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
  emitGuestStorageChange();
}

function useLocalJson<T>(key: string, fallback: T) {
  const [local, setLocal] = useState<T>(() => readJson(key, fallback));

  useEffect(() => {
    const refresh = () => setLocal(readJson(key, fallback));
    window.addEventListener("storage", refresh);
    window.addEventListener(STORAGE_EVENT, refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener(STORAGE_EVENT, refresh);
    };
  }, [key, fallback]);

  const update = useCallback(
    (next: T | ((prev: T) => T)) => {
      setLocal((prev) => {
        const value = typeof next === "function" ? (next as (p: T) => T)(prev) : next;
        writeJson(key, value);
        return value;
      });
    },
    [key],
  );

  return [local, update] as const;
}

// ===== Public hooks =====

export function useProfile() {
  return useLocalJson<Profile>(KEY_PROFILE, emptyProfile);
}

const REMOVED_KINK_IDS = new Set([
  "k_pen_giving",
  "k_pen_recv",
  "k_oral_giving",
  "k_oral_recv",
  "k_oral_receiving",
]);
const REMOVED_KINK_NAMES = new Set([
  "penetrative (giving)",
  "penetrative (receiving)",
  "oral (giving)",
  "oral (receiving)",
]);

export function useKinks() {
  const [kinks, setKinks] = useLocalJson<KinkItem[]>(KEY_KINKS, DEFAULT_KINKS);
  const filtered = kinks.filter(
    (k) => !REMOVED_KINK_IDS.has(k.id) && !REMOVED_KINK_NAMES.has(k.name?.toLowerCase?.() ?? ""),
  );
  return [filtered.length > 0 ? filtered : DEFAULT_KINKS, setKinks] as const;
}

export function useRatings() {
  return useLocalJson<KinkRatings>(KEY_RATINGS, {});
}

export function useDirections() {
  return useLocalJson<KinkDirections>(KEY_DIRECTIONS, {});
}

// ===== Participant id (per-browser, used inside a session side payload only) =====

const KEY_PARTICIPANT = "doc_participant_id";

export function getParticipantId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem(KEY_PARTICIPANT);
  if (!id) {
    id = nanoid(10);
    localStorage.setItem(KEY_PARTICIPANT, id);
  }
  return id;
}

export function emptySide(
  profile?: Profile,
  ratings?: KinkRatings,
  directions?: KinkDirections,
): SessionSide {
  return {
    participantId: getParticipantId(),
    name: profile?.name ?? "",
    pronouns: profile?.pronouns ?? "",
    healthcare: profile?.healthcare ?? "",
    emergencyContact: profile?.emergencyContact ?? "",
    partnerDynamics: "",
    timeConstraints: "",
    medicalConcerns: "",
    substances: "",
    substancesHardLimit: false,
    setting: "",
    music: "",
    dress: "",
    callMe: profile?.callMe ?? "",
    dontCallMe: profile?.dontCallMe ?? "",
    genitalsRefer: "",
    intentions: "",
    goodTime: "",
    badTime: "",
    privacy: "",
    penetrativeSex: "",
    stdTestDate: "",
    stdTestResults: "",
    prepDoxypep: "",
    birthControl: "",
    timeOfPlay: "",
    safewords: profile?.defaultSafewords ?? DEFAULT_SAFEWORDS,
    safewordItems: [...DEFAULT_SAFEWORD_ITEMS],
    vision: "",
    selectedKinks: [],
    actions: "",
    hardLimits: "",
    softLimits: "",
    yesList: "",
    aftercare: profile?.defaultAftercare ?? "",
    aftercareItems: [],
    brainstorm: "",
    ratings: ratings ? { ...ratings } : {},
    directions: directions ? { ...directions } : {},
  };
}

export function newSession(
  profile: Profile,
  ratings: KinkRatings,
  partnerHandle = "",
  directions?: KinkDirections,
): PlaySession {
  return {
    id: nanoid(12),
    shareToken: nanoid(16),
    partnerHandle,
    date: new Date().toISOString().slice(0, 10),
    createdAt: new Date().toISOString(),
    status: "draft",
    ownerSide: emptySide(profile, ratings, directions),
    aftercareCompleted: [],
  };
}

export function generateSceneTitle(side: SessionSide, kinkMap: Record<string, string>): string {
  const selected = (side.selectedKinks || []).map((id) => kinkMap[id]).filter(Boolean);
  const yesKinks = Object.entries(side.ratings || {})
    .filter(([, r]) => r === "yes")
    .map(([id]) => kinkMap[id])
    .filter(Boolean);
  const kinks = (selected.length > 0 ? selected : yesKinks).slice(0, 2);
  const setting = side.setting?.trim();

  if (kinks.length === 0 && !setting) return "";
  const kinkPart =
    kinks.length === 0 ? "" : kinks.length === 1 ? kinks[0] : `${kinks[0]} & ${kinks[1]}`;
  if (!setting) return kinkPart;
  if (!kinkPart) return setting;
  return `${kinkPart} at ${setting}`;
}

// ===== Guest-local sessions =====

export interface SessionSummary {
  id: string;
  shareToken: string;
  partnerHandle: string;
  date: string;
  createdAt: string;
  role: "owner" | "partner";
  status: SessionStatus;
  ownerSide: SessionSide;
}

type StoredSession = {
  session: PlaySession;
  role: "owner" | "partner";
  savedAt: string;
};

type StoredSessions = Record<string, StoredSession>;

function readStoredSessions(): StoredSessions {
  return readJson<StoredSessions>(KEY_SESSIONS, {});
}

function writeStoredSessions(sessions: StoredSessions) {
  writeJson(KEY_SESSIONS, sessions);
}

export function getStoredSession(token: string | undefined): PlaySession | null {
  if (!token) return null;
  return readStoredSessions()[token]?.session ?? null;
}

export function saveStoredSession(session: PlaySession, role: "owner" | "partner" = "owner") {
  const sessions = readStoredSessions();
  const previousRole = sessions[session.shareToken]?.role;
  sessions[session.shareToken] = {
    session,
    role: previousRole === "owner" ? "owner" : role,
    savedAt: new Date().toISOString(),
  };
  writeStoredSessions(sessions);
}

export function deleteStoredSession(token: string) {
  const sessions = readStoredSessions();
  delete sessions[token];
  writeStoredSessions(sessions);
}

export function mergePartnerSide(session: PlaySession, side: SessionSide): PlaySession {
  const partners = session.partnerSides ?? (session.partnerSide ? [session.partnerSide] : []);
  const participantId = side.participantId;
  const nextPartners = participantId
    ? partners.filter((p) => p.participantId !== participantId)
    : partners;
  return {
    ...session,
    status: "agreed",
    partnerSide: side,
    partnerSides: [...nextPartners, side],
  };
}

export function clearGuestData() {
  if (typeof window === "undefined") return;
  [KEY_PROFILE, KEY_KINKS, KEY_RATINGS, KEY_DIRECTIONS, KEY_SESSIONS].forEach((key) =>
    localStorage.removeItem(key),
  );
  emitGuestStorageChange();
}

export function listStoredSessionSummaries(): SessionSummary[] {
  return Object.values(readStoredSessions()).map(({ session, role }) => ({
    id: session.id,
    shareToken: session.shareToken,
    partnerHandle: session.partnerHandle,
    date: session.date,
    createdAt: session.createdAt,
    role,
    status: session.status,
    ownerSide: session.ownerSide,
  }));
}

export function useMySessions() {
  const [data, setData] = useState<SessionSummary[]>(() => listStoredSessionSummaries());

  useEffect(() => {
    const refresh = () => setData(listStoredSessionSummaries());
    window.addEventListener("storage", refresh);
    window.addEventListener(STORAGE_EVENT, refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener(STORAGE_EVENT, refresh);
    };
  }, []);

  return { data, isLoading: false };
}
