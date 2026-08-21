const guideImageModules = import.meta.glob("../../assets/guides/*/*.webp", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const naturalOrder = new Intl.Collator("en", { numeric: true, sensitivity: "base" });

const FIELD_GUIDE_TITLES: Record<string, string> = {
  "01": "DIY Kink, Cheap Thrills",
  "02": "Collar Me, Devotion & Desire",
  "03": "Femininity, Defined by You",
  "04": "Bondage Beyond Rope",
  "05": "Needles, Care & Doctor Play",
  "06": "Whispers, Tongues & Ear Play",
};

const FIELD_GUIDE_SLUGS: Record<string, string> = {
  "01": "diy-kink-cheap-thrills",
  "02": "collar-me-devotion-and-desire",
  "03": "femininity-defined-by-you",
  "04": "bondage-beyond-rope",
  "05": "needles-care-and-doctor-play",
  "06": "whispers-tongues-and-ear-play",
};

const FIELD_GUIDE_COVER_PAGES: Record<string, number> = {
  "05": 6,
  "06": 3,
};

export type FieldGuidePage = {
  pageNumber: number;
  src: string;
  width: number;
  height: number;
};

export type FieldGuide = {
  order: number;
  number: string;
  slug: string;
  title: string;
  pages: FieldGuidePage[];
  cover: FieldGuidePage;
  hoverPage: FieldGuidePage;
};

const groupedPages = new Map<string, FieldGuidePage[]>();

Object.entries(guideImageModules)
  .sort(([left], [right]) => naturalOrder.compare(left, right))
  .forEach(([filePath, src]) => {
    const match = filePath.match(/\/guides\/(\d+)\/z\d+-(\d+)\.webp$/i);
    if (!match) return;

    const [, folder, page] = match;
    if (!folder || !page) return;

    const pages = groupedPages.get(folder) ?? [];
    pages.push({ pageNumber: Number(page), src, width: 1600, height: 2472 });
    groupedPages.set(folder, pages);
  });

export const allFieldGuides: FieldGuide[] = Array.from(groupedPages.entries())
  .sort(([left], [right]) => naturalOrder.compare(left, right))
  .map(([folder, pages]) => {
    const sortedPages = [...pages].sort((left, right) => left.pageNumber - right.pageNumber);
    const number = folder.padStart(2, "0");
    const coverPageNumber = FIELD_GUIDE_COVER_PAGES[number] ?? 2;
    const cover =
      sortedPages.find((page) => page.pageNumber === coverPageNumber) ??
      sortedPages[1] ??
      sortedPages[0];
    const readingPages = sortedPages.slice(1, -1);

    if (!cover) throw new Error(`Guide ${number} has no page images.`);

    return {
      order: Number(folder),
      number,
      slug: FIELD_GUIDE_SLUGS[number] ?? `guide-${number}`,
      title: FIELD_GUIDE_TITLES[number] ?? `Guide ${number}`,
      pages: readingPages,
      cover,
      hoverPage: sortedPages[0] ?? cover,
    };
  });

export function getFieldGuideBySlug(slug: string) {
  return allFieldGuides.find((guide) => guide.slug === slug) ?? null;
}

export function getFieldGuideByNumber(number: string) {
  return allFieldGuides.find((guide) => guide.number === number.padStart(2, "0")) ?? null;
}

export function getFieldGuideByLegacySlug(slug: string) {
  const number = slug.match(/^guide-(\d+)$/)?.[1];
  return number ? getFieldGuideByNumber(number) : null;
}

export function getRelatedFieldGuides(slug: string, limit = 3) {
  return allFieldGuides.filter((guide) => guide.slug !== slug).slice(0, limit);
}
