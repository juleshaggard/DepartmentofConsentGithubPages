import {
  DEFAULT_SAFEWORD_ITEMS,
  DEFAULT_SAFEWORDS,
  type KinkDirections,
  type KinkRatings,
  type PlaySession,
  type SessionSide,
  type SessionStatus,
} from "@/lib/storage";
import { appUrl } from "@/lib/app-url";

const PARAM = "doc";
const VERSION = 2;

type LegacySceneEnvelope = {
  v: 1;
  kind: "scene";
  session: PlaySession;
};

type CompactSceneEnvelope = {
  v: typeof VERSION;
  k: "scene";
  s: CompactSession;
};

type CompactSession = {
  t: string;
  o: CompactSide;
  i?: string;
  p?: string;
  d?: string;
  c?: string;
  st?: SessionStatus;
  ps?: CompactSide[];
  r?: string;
  ac?: string[];
};

type CompactSide = Record<string, unknown>;

const SIDE_STRING_FIELDS = [
  ["participantId", "i"],
  ["name", "n"],
  ["pronouns", "pr"],
  ["filledAt", "f"],
  ["healthcare", "h"],
  ["emergencyContact", "e"],
  ["partnerDynamics", "pd"],
  ["timeConstraints", "tc"],
  ["medicalConcerns", "mc"],
  ["substances", "su"],
  ["setting", "se"],
  ["music", "mu"],
  ["dress", "dr"],
  ["callMe", "cm"],
  ["dontCallMe", "dc"],
  ["genitalsRefer", "gr"],
  ["intentions", "in"],
  ["goodTime", "gt"],
  ["badTime", "bt"],
  ["privacy", "pv"],
  ["talkingAfter", "ta"],
  ["penetrativeSex", "px"],
  ["stdTestDate", "sd"],
  ["stdTestResults", "sr"],
  ["prepDoxypep", "pp"],
  ["birthControl", "bc"],
  ["timeOfPlay", "tp"],
  ["vision", "v"],
  ["actions", "a"],
  ["hardLimits", "hl"],
  ["softLimits", "sl"],
  ["yesList", "y"],
  ["aftercare", "af"],
  ["brainstorm", "b"],
] as const satisfies readonly (readonly [keyof SessionSide, string])[];

function cleanString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function cleanStringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.map((item) => (typeof item === "string" ? item.trim() : "")).filter(Boolean)
    : [];
}

function sameStringArray(a: string[] | undefined, b: string[]): boolean {
  return !!a && a.length === b.length && a.every((item, index) => item === b[index]);
}

function cleanRecord<T extends string>(value: unknown): Record<string, T> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return Object.fromEntries(
    Object.entries(value)
      .map(([key, entry]) => [key.trim(), typeof entry === "string" ? entry.trim() : ""])
      .filter(([key, entry]) => key && entry),
  ) as Record<string, T>;
}

function compactTextField(key: keyof SessionSide, value: string): string {
  if (key === "vision" && value.startsWith("::v1::")) {
    return value.split("\n", 1)[0];
  }
  return value;
}

function compactSide(side: SessionSide): CompactSide {
  const out: CompactSide = {};

  for (const [key, compactKey] of SIDE_STRING_FIELDS) {
    const value = cleanString(side[key]);
    if (value) out[compactKey] = compactTextField(key, value);
  }

  if (side.substancesHardLimit) out.shl = 1;
  if (side.safewords?.trim() && side.safewords !== DEFAULT_SAFEWORDS) out.sw = side.safewords;
  if (side.selectedKinks?.length) out.sk = side.selectedKinks;
  if (side.aftercareItems?.length) out.ai = side.aftercareItems;
  if (side.safewordItems?.length && !sameStringArray(side.safewordItems, DEFAULT_SAFEWORD_ITEMS)) {
    out.si = side.safewordItems;
  }

  const ratings = cleanRecord<KinkRatings[string]>(side.ratings);
  if (Object.keys(ratings).length) out.ra = ratings;

  const directions = cleanRecord<KinkDirections[string]>(side.directions);
  if (Object.keys(directions).length) out.di = directions;

  return out;
}

function emptyLinkedSide(participantId = ""): SessionSide {
  return {
    participantId,
    name: "",
    pronouns: "",
    healthcare: "",
    emergencyContact: "",
    partnerDynamics: "",
    timeConstraints: "",
    medicalConcerns: "",
    substances: "",
    substancesHardLimit: false,
    setting: "",
    music: "",
    dress: "",
    callMe: "",
    dontCallMe: "",
    genitalsRefer: "",
    intentions: "",
    goodTime: "",
    badTime: "",
    privacy: "",
    talkingAfter: "",
    penetrativeSex: "",
    stdTestDate: "",
    stdTestResults: "",
    prepDoxypep: "",
    birthControl: "",
    timeOfPlay: "",
    safewords: DEFAULT_SAFEWORDS,
    safewordItems: [...DEFAULT_SAFEWORD_ITEMS],
    vision: "",
    selectedKinks: [],
    actions: "",
    hardLimits: "",
    softLimits: "",
    yesList: "",
    aftercare: "",
    aftercareItems: [],
    brainstorm: "",
    ratings: {},
    directions: {},
  };
}

function hydrateSide(raw: unknown): SessionSide {
  const compact = raw && typeof raw === "object" && !Array.isArray(raw) ? (raw as CompactSide) : {};
  const side = emptyLinkedSide(cleanString(compact.i));
  const writable = side as Record<string, unknown>;

  for (const [key, compactKey] of SIDE_STRING_FIELDS) {
    const value = cleanString(compact[compactKey]);
    if (value) writable[key] = value;
  }

  side.substancesHardLimit = compact.shl === 1 || compact.shl === true;
  side.safewords = cleanString(compact.sw) || DEFAULT_SAFEWORDS;
  side.selectedKinks = cleanStringArray(compact.sk);
  side.aftercareItems = cleanStringArray(compact.ai);
  side.safewordItems = compact.si ? cleanStringArray(compact.si) : [...DEFAULT_SAFEWORD_ITEMS];
  side.ratings = cleanRecord<KinkRatings[string]>(compact.ra);
  side.directions = cleanRecord<KinkDirections[string]>(compact.di);

  return side;
}

function compactSession(session: PlaySession): CompactSession {
  const partners = session.partnerSides ?? (session.partnerSide ? [session.partnerSide] : []);
  const out: CompactSession = {
    t: session.shareToken,
    o: compactSide(session.ownerSide),
  };

  if (session.id && session.id !== session.shareToken) out.i = session.id;
  if (session.partnerHandle?.trim()) out.p = session.partnerHandle;
  if (session.date?.trim()) out.d = session.date;
  if (session.createdAt?.trim()) out.c = session.createdAt;
  if (session.status && session.status !== "shared") out.st = session.status;
  if (partners.length) out.ps = partners.map(compactSide);
  if (session.reflection?.trim()) out.r = session.reflection;
  if (session.aftercareCompleted?.length) out.ac = session.aftercareCompleted;

  return out;
}

function hydrateSession(raw: CompactSession): PlaySession {
  const shareToken = cleanString(raw.t);
  if (!shareToken) throw new Error("This scene link is missing its scene token.");

  const partners = Array.isArray(raw.ps) ? raw.ps.map(hydrateSide) : [];
  const session: PlaySession = {
    id: cleanString(raw.i) || shareToken,
    shareToken,
    partnerHandle: cleanString(raw.p),
    date: cleanString(raw.d) || new Date().toISOString().slice(0, 10),
    createdAt: cleanString(raw.c) || new Date().toISOString(),
    status: raw.st ?? "shared",
    ownerSide: hydrateSide(raw.o),
    aftercareCompleted: cleanStringArray(raw.ac),
  };

  if (partners.length) {
    session.partnerSide = partners[partners.length - 1];
    session.partnerSides = partners;
  }

  const reflection = cleanString(raw.r);
  if (reflection) session.reflection = reflection;

  return session;
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = "";
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.slice(i, i + chunkSize));
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlToBytes(value: string): Uint8Array {
  const base64 = value
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(base64);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

async function gzip(bytes: Uint8Array): Promise<Uint8Array | null> {
  if (typeof CompressionStream === "undefined") return null;
  const stream = new Blob([bytes]).stream().pipeThrough(new CompressionStream("gzip"));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

async function gunzip(bytes: Uint8Array): Promise<Uint8Array | null> {
  if (typeof DecompressionStream === "undefined") return null;
  const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("gzip"));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

export async function encodeScene(session: PlaySession): Promise<string> {
  const envelope: CompactSceneEnvelope = { v: VERSION, k: "scene", s: compactSession(session) };
  const bytes = new TextEncoder().encode(JSON.stringify(envelope));
  const compressed = await gzip(bytes);
  return compressed ? `g.${bytesToBase64Url(compressed)}` : `j.${bytesToBase64Url(bytes)}`;
}

export async function decodeScene(value: string): Promise<PlaySession> {
  const [mode, payload] = value.split(".", 2);
  if (!mode || !payload) throw new Error("This scene link is missing its scene data.");
  const bytes = base64UrlToBytes(payload);
  const decoded = mode === "g" ? await gunzip(bytes) : mode === "j" ? bytes : null;
  if (!decoded) throw new Error("This browser cannot read this scene link.");
  const envelope = JSON.parse(new TextDecoder().decode(decoded)) as
    | Partial<LegacySceneEnvelope>
    | Partial<CompactSceneEnvelope>;
  if (envelope.v === 1 && "kind" in envelope && envelope.kind === "scene") {
    if (!envelope.session?.shareToken) {
      throw new Error(
        "This scene link is not compatible with this version of Department of Consent.",
      );
    }
    return envelope.session;
  }
  if (envelope.v === VERSION && "k" in envelope && envelope.k === "scene" && envelope.s) {
    return hydrateSession(envelope.s);
  }
  if (!("v" in envelope)) {
    throw new Error(
      "This scene link is not compatible with this version of Department of Consent.",
    );
  }
  throw new Error("This scene link is not compatible with this version of Department of Consent.");
}

export function sceneHash(encoded: string): string {
  return `#${PARAM}=${encoded}`;
}

export function encodedSceneFromHash(
  hash = typeof window === "undefined" ? "" : window.location.hash,
): string | null {
  const raw = hash.startsWith("#") ? hash.slice(1) : hash;
  const params = new URLSearchParams(raw);
  return params.get(PARAM);
}

export async function sceneUrl(path: string, session: PlaySession): Promise<string> {
  const encoded = await encodeScene(session);
  return `${appUrl(path)}${sceneHash(encoded)}`;
}

export function clearSceneHash() {
  if (typeof window === "undefined" || !encodedSceneFromHash()) return;
  history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
}
