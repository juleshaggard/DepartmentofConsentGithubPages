/**
 * Scene Negotiator smoke tests.
 *
 * Confirms that, after the move to /scene-negotiator:
 *  1. the route still resolves and its landing page renders, and
 *  2. the core interaction — creating a scene, storing it locally, and
 *     encoding/decoding a share link — still works.
 */
import { beforeEach, describe, expect, it } from "vitest";
import { Blob as NodeBlob } from "node:buffer";

// jsdom's Blob lacks .stream(), which sceneLinks uses for gzip compression.
// Node's Blob implements the web standard, so use it in tests.
globalThis.Blob = NodeBlob as unknown as typeof Blob;
import { render, screen } from "@testing-library/react";
import { RouterProvider } from "@tanstack/react-router";
import { getRouter } from "@/router";
import { apiCreateSession, apiGetSession, apiUpdateSession } from "@/lib/sessionsApi";
import { emptyProfile, emptySide, newSession } from "@/lib/storage";
import { decodeScene, encodeScene, encodedSceneFromHash, sceneHash } from "@/lib/sceneLinks";

beforeEach(() => {
  localStorage.clear();
});

describe("route", () => {
  it("resolves /scene-negotiator and renders the app landing page", async () => {
    const router = getRouter();
    await router.navigate({ to: "/scene-negotiator" });
    await router.load();

    const matchedIds = router.state.matches.map((m) => m.routeId as string);
    expect(matchedIds).toContain("/scene-negotiator/");

    render(<RouterProvider router={router} />);
    expect(
      await screen.findByRole("heading", {
        name: /build the kink scene you both actually want/i,
      }),
    ).toBeTruthy();
  });

  it("keeps child session routes registered", async () => {
    const router = getRouter();
    await router.navigate({ to: "/scene-negotiator/sessions/new" });
    await router.load();
    const matchedIds = router.state.matches.map((m) => m.routeId as string);
    expect(matchedIds).toContain("/scene-negotiator/sessions/new");
  });
});

describe("core interaction: create, store, and share a scene", () => {
  it("creates a scene in localStorage and reads it back", async () => {
    const session = newSession({ ...emptyProfile, name: "Test" }, {}, "PartnerHandle");
    const created = await apiCreateSession(session);
    expect(created.shareToken).toBeTruthy();

    const fetched = await apiGetSession(created.shareToken);
    expect(fetched?.partnerHandle).toBe("PartnerHandle");

    const updated = await apiUpdateSession(created.shareToken, { status: "shared" });
    expect(updated.status).toBe("shared");
    expect((await apiGetSession(created.shareToken))?.status).toBe("shared");
  });

  it("round-trips a scene through an encoded share link hash", async () => {
    const session = newSession({ ...emptyProfile, name: "Test" }, {}, "PartnerHandle");
    session.ownerSide = emptySide({ ...emptyProfile, name: "Test" }, { spanking: "yes" });

    const encoded = await encodeScene(session);
    const hash = sceneHash(encoded);
    const extracted = encodedSceneFromHash(hash);
    expect(extracted).toBe(encoded);

    const decoded = await decodeScene(extracted!);
    expect(decoded.shareToken).toBe(session.shareToken);
    expect(decoded.ownerSide.ratings.spanking).toBe("yes");
  });
});
