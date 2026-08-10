const zineImageModules = import.meta.glob("../../assets/zines/*/*.webp", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const naturalOrder = new Intl.Collator("en", { numeric: true, sensitivity: "base" });

const ZINE_TITLES: Record<string, string> = {
  "01": "DIY Kink, Cheap Thrills",
  "02": "Collar Me, Devotion & Desire",
  "03": "Femininity, Defined by You",
  "04": "Bondage Beyond Rope",
  "05": "Needles, Care & Doctor Play",
  "06": "Whispers, Tongues & Ear Play",
};

const ZINE_COVER_PAGES: Record<string, number> = {
  "05": 6,
  "06": 3,
};

export type ZinePage = {
  pageNumber: number;
  src: string;
  width: number;
  height: number;
};

export type Zine = {
  order: number;
  issue: string;
  slug: string;
  title: string;
  pages: ZinePage[];
  cover: ZinePage;
};

const groupedPages = new Map<string, ZinePage[]>();

Object.entries(zineImageModules)
  .sort(([left], [right]) => naturalOrder.compare(left, right))
  .forEach(([filePath, src]) => {
    const match = filePath.match(/\/zines\/(\d+)\/z\d+-(\d+)\.webp$/i);
    if (!match) return;

    const [, folder, page] = match;
    if (!folder || !page) return;

    const pages = groupedPages.get(folder) ?? [];
    pages.push({ pageNumber: Number(page), src, width: 1600, height: 2472 });
    groupedPages.set(folder, pages);
  });

export const allZines: Zine[] = Array.from(groupedPages.entries())
  .sort(([left], [right]) => naturalOrder.compare(left, right))
  .map(([folder, pages]) => {
    const sortedPages = [...pages].sort((left, right) => left.pageNumber - right.pageNumber);
    const issue = folder.padStart(2, "0");
    const coverPageNumber = ZINE_COVER_PAGES[issue] ?? 2;
    const cover =
      sortedPages.find((page) => page.pageNumber === coverPageNumber) ??
      sortedPages[1] ??
      sortedPages[0];
    const readingPages = sortedPages.slice(1, -1);

    if (!cover) throw new Error(`Zine ${issue} has no page images.`);

    return {
      order: Number(folder),
      issue,
      slug: `zine-${issue}`,
      title: ZINE_TITLES[issue] ?? `Zine ${issue}`,
      pages: readingPages,
      cover,
    };
  });

export function getZineBySlug(slug: string) {
  return allZines.find((zine) => zine.slug === slug) ?? null;
}

export function getRelatedZines(slug: string, limit = 3) {
  return allZines.filter((zine) => zine.slug !== slug).slice(0, limit);
}
