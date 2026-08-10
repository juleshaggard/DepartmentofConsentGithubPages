# Adding Zines

Use these rules whenever a new zine is added to the Department of Consent archive.

## Files and ordering

1. Put each issue in its own numeric folder under `assets/zines/`.
   - Example: issue 5 belongs in `assets/zines/05/`.
2. Name each image with the issue and page number in numeric order.
   - Example: `z05-01.webp`, `z05-02.webp`, `z05-03.webp`.
3. Use `.webp` images and do not skip or duplicate page numbers.
4. Folder order determines the issue order in the archive. File order determines the reading order inside the issue.

## Image inclusion rules

- Always exclude the first supplied image from the public zine.
- Always exclude the last supplied image from the public zine.
- Show every image between them on the permalink page, in numeric order.
- Use the second supplied image as the default cover shown on the `/zines` grid and in related-zine cards.
- Preserve any issue-specific cover selected in `ZINE_COVER_PAGES` in `src/lib/zines.ts`. Zine 05 uses image 6 and Zine 06 uses image 3.
- Do not reorder, crop, or substitute pages based on their visual content.

For an eight-image folder, this means:

- `01`: excluded
- `02`: grid cover and permalink page 1
- `03` through `07`: remaining permalink pages
- `08`: excluded

The same page rule applies if a future issue contains a different number of supplied images: render `sortedImages.slice(1, -1)`. Use `sortedImages[1]` as the default cover unless the issue has an explicit entry in `ZINE_COVER_PAGES`.

## Creating the grid title

The grid title must be written after reviewing the complete zine in reading order. It should describe the issue's central idea, not its folder number.

1. Read all of the included pages before naming the issue.
2. Identify the repeated subject, argument, instruction, or emotional through-line.
3. Write a concise editorial title that captures that theme and sounds natural in the Department of Consent voice.
4. Prefer 3–7 words. A short two-part construction is welcome when it adds meaning.
5. Use title case. Use a comma or ampersand only when it improves the title.
6. Do not use generic labels such as `Zine 05`, `Issue 05`, or `Untitled`.
7. Do not simply copy a long sentence from a page. A short phrase from the zine may be used when it accurately represents the whole issue.
8. Do not invent a theme that is not supported by the pages.

Existing titles show the intended style:

- `DIY Kink, Cheap Thrills`
- `Collar Me, Devotion & Desire`
- `Femininity, Defined by You`
- `Bondage Beyond Rope`

Add the approved title to `ZINE_TITLES` in `src/lib/zines.ts`, keyed by the two-digit issue number. The title in this map is the text displayed on the archive grid, related-zine cards, metadata, and the zine permalink's accessible heading.

## Completion checklist

- Confirm the folder and filenames match the required numeric format.
- Review every supplied image and create a content-based title.
- Add the title to `ZINE_TITLES` in `src/lib/zines.ts`.
- Confirm the grid cover is the second supplied image or the issue's explicit `ZINE_COVER_PAGES` selection.
- Confirm the permalink excludes the first and last supplied images.
- Confirm the remaining images appear in numeric order.
- Update `src/__tests__/zines.test.ts` for the new issue and title.
- Run the zine tests and the GitHub Pages build before publishing.
