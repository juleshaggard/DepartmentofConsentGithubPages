import type { PlaySession } from "@/lib/storage";
import { appUrl } from "@/lib/app-url";

const PARAM = "doc";
const VERSION = 1;

type SceneEnvelope = {
  v: typeof VERSION;
  kind: "scene";
  session: PlaySession;
};

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
  const envelope: SceneEnvelope = { v: VERSION, kind: "scene", session };
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
  const envelope = JSON.parse(new TextDecoder().decode(decoded)) as Partial<SceneEnvelope>;
  if (envelope.v !== VERSION || envelope.kind !== "scene" || !envelope.session?.shareToken) {
    throw new Error(
      "This scene link is not compatible with this version of Department of Consent.",
    );
  }
  return envelope.session;
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
