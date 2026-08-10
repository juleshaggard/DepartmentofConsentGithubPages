# Adding Field Guides

Use these rules whenever a new field guide is added to the Department of Consent archive.

## Files and ordering

1. Put each guide in its own numeric folder under `assets/guides/`.
   - Example: guide 5 belongs in `assets/guides/05/`.
2. Name each image with the guide and page number in numeric order.
   - Example: `z05-01.webp`, `z05-02.webp`, `z05-03.webp`.
3. Use `.webp` images and do not skip or duplicate page numbers.
4. Folder order determines the guide order in the archive. File order determines the reading order inside the guide.

## Image inclusion rules

- Always exclude the first supplied image from the public guide.
- Always exclude the last supplied image from the public guide.
- Show every image between them on the permalink page, in numeric order.
- Use the second supplied image as the default cover shown on the `/guides` grid and in related-guide cards.
- Preserve any guide-specific cover selected in `FIELD_GUIDE_COVER_PAGES` in `src/lib/field-guides.ts`. Guide 05 uses image 6 and Guide 06 uses image 3.
- Do not reorder, crop, or substitute pages based on their visual content.

For an eight-image folder, this means:

- `01`: excluded
- `02`: grid cover and permalink page 1
- `03` through `07`: remaining permalink pages
- `08`: excluded

The same page rule applies if a future guide contains a different number of supplied images: render `sortedImages.slice(1, -1)`. Use `sortedImages[1]` as the default cover unless the guide has an explicit entry in `FIELD_GUIDE_COVER_PAGES`.

## Creating the grid title

The grid title must be written after reviewing the complete guide in reading order. It should describe the guide's central idea, not its folder number.

1. Read all of the included pages before naming the guide.
2. Identify the repeated subject, argument, instruction, or emotional through-line.
3. Write a concise editorial title that captures that theme and sounds natural in the Department of Consent voice.
4. Prefer 3–7 words. A short two-part construction is welcome when it adds meaning.
5. Use title case. Use a comma or ampersand only when it improves the title.
6. Do not use generic labels such as `Guide 05`, `Field Manual 05`, or `Untitled`.
7. Do not simply copy a long sentence from a page. A short phrase from the guide may be used when it accurately represents the whole guide.
8. Do not invent a theme that is not supported by the pages.

Existing titles show the intended style:

- `DIY Kink, Cheap Thrills`
- `Collar Me, Devotion & Desire`
- `Femininity, Defined by You`
- `Bondage Beyond Rope`

Add the approved title to `FIELD_GUIDE_TITLES` in `src/lib/field-guides.ts`, keyed by the two-digit guide number. The title in this map is displayed on the archive grid, related-guide cards, metadata, and the guide permalink's accessible heading.

## Creating the permalink

Every guide must have a descriptive, search-friendly slug derived from its approved title.

1. Use lowercase words separated by hyphens.
2. Remove punctuation and replace `&` with `and`.
3. Keep the important subject words from the title.
4. Do not use numbered URLs such as `guide-07` for the canonical permalink.
5. Keep the slug concise and readable rather than adding unrelated keywords.

Examples:

- `DIY Kink, Cheap Thrills` becomes `/guides/diy-kink-cheap-thrills`.
- `Bondage Beyond Rope` becomes `/guides/bondage-beyond-rope`.

Add the approved slug to `FIELD_GUIDE_SLUGS` in `src/lib/field-guides.ts`, keyed by the same two-digit guide number. Add the matching number and slug to `fieldGuideSlugs` in `scripts/prepare-pages.mjs` so the former numbered URL receives a static GitHub Pages redirect.

## Completion checklist

- Confirm the folder and filenames match the required numeric format.
- Review every supplied image and create a content-based title.
- Add the title to `FIELD_GUIDE_TITLES` in `src/lib/field-guides.ts`.
- Create a descriptive slug and add it to `FIELD_GUIDE_SLUGS` in `src/lib/field-guides.ts`.
- Add the same number and slug to `fieldGuideSlugs` in `scripts/prepare-pages.mjs`.
- Confirm the grid cover is the second supplied image or the guide's explicit `FIELD_GUIDE_COVER_PAGES` selection.
- Confirm the permalink excludes the first and last supplied images.
- Confirm the remaining images appear in numeric order.
- Update `src/__tests__/field-guides.test.ts` for the new guide and title.
- Run the field guide tests and the GitHub Pages build before publishing.
