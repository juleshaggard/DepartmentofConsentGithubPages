import { describe, expect, it } from "vitest";
import {
  allFieldGuides,
  getFieldGuideByLegacySlug,
  getFieldGuideBySlug,
  getRelatedFieldGuides,
} from "@/lib/field-guides";

describe("field guide archive", () => {
  it("uses folder order and file order for every guide", () => {
    expect(allFieldGuides.map((guide) => guide.number)).toEqual([
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
    ]);
    expect(allFieldGuides.every((guide) => guide.pages.length === 6)).toBe(true);
    expect(allFieldGuides[0]?.pages.map((page) => page.pageNumber)).toEqual([2, 3, 4, 5, 6, 7]);
  });

  it("uses the configured cover image for each guide", () => {
    expect(allFieldGuides.map((guide) => guide.cover.pageNumber)).toEqual([2, 2, 2, 2, 6, 3]);
  });

  it("uses the first image in each guide sequence for its hover state", () => {
    expect(allFieldGuides.map((guide) => guide.hoverPage.pageNumber)).toEqual([1, 1, 1, 1, 1, 1]);
  });

  it("uses editorial titles based on each guide's content", () => {
    expect(allFieldGuides.map((guide) => guide.title)).toEqual([
      "DIY Kink, Cheap Thrills",
      "Collar Me, Devotion & Desire",
      "Femininity, Defined by You",
      "Bondage Beyond Rope",
      "Needles, Care & Doctor Play",
      "Whispers, Tongues & Ear Play",
    ]);
  });

  it("uses descriptive guide permalinks and excludes the current guide from related results", () => {
    expect(allFieldGuides.map((guide) => guide.slug)).toEqual([
      "diy-kink-cheap-thrills",
      "collar-me-devotion-and-desire",
      "femininity-defined-by-you",
      "bondage-beyond-rope",
      "needles-care-and-doctor-play",
      "whispers-tongues-and-ear-play",
    ]);
    expect(getFieldGuideBySlug("femininity-defined-by-you")?.number).toBe("03");
    expect(getFieldGuideByLegacySlug("guide-03")?.slug).toBe("femininity-defined-by-you");
    expect(getFieldGuideBySlug("missing-guide")).toBeNull();
    expect(
      getRelatedFieldGuides("collar-me-devotion-and-desire").map((guide) => guide.number),
    ).toEqual(["01", "03", "04"]);
  });
});
