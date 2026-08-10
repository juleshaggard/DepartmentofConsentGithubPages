import { describe, expect, it } from "vitest";
import { allZines, getRelatedZines, getZineBySlug } from "@/lib/zines";

describe("zine archive", () => {
  it("uses folder order and file order for every issue", () => {
    expect(allZines.map((zine) => zine.issue)).toEqual(["01", "02", "03", "04", "05", "06"]);
    expect(allZines.every((zine) => zine.pages.length === 6)).toBe(true);
    expect(allZines[0]?.pages.map((page) => page.pageNumber)).toEqual([2, 3, 4, 5, 6, 7]);
  });

  it("uses the configured cover image for each issue", () => {
    expect(allZines.map((zine) => zine.cover.pageNumber)).toEqual([2, 2, 2, 2, 6, 3]);
  });

  it("uses editorial titles based on each issue's content", () => {
    expect(allZines.map((zine) => zine.title)).toEqual([
      "DIY Kink, Cheap Thrills",
      "Collar Me, Devotion & Desire",
      "Femininity, Defined by You",
      "Bondage Beyond Rope",
      "Needles, Care & Doctor Play",
      "Whispers, Tongues & Ear Play",
    ]);
  });

  it("looks up permalinks and excludes the current issue from related zines", () => {
    expect(getZineBySlug("zine-03")?.issue).toBe("03");
    expect(getZineBySlug("missing-zine")).toBeNull();
    expect(getRelatedZines("zine-02").map((zine) => zine.issue)).toEqual(["01", "03", "04"]);
  });
});
