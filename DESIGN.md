---
name: Department of Consent
description: Warm, candid kink education, coaching, guides, and commerce presented with editorial clarity.
colors:
  coral: "#fc5142"
  ink: "#1b1b1b"
  paper: "oklch(0.965 0.018 50)"
  surface: "oklch(0.99 0.01 30)"
  soft-pink: "#ffe8ef"
  mint: "oklch(0.78 0.12 165)"
  focus-sky: "#5bcefa"
typography:
  editorial-display:
    fontFamily: "Trocchi, Georgia, serif"
    fontSize: "clamp(2.5rem, 6vw, 5.8rem)"
    fontWeight: 400
    lineHeight: 1.05
  condensed-display:
    fontFamily: "Phudu, Arial Narrow, sans-serif"
    fontSize: "clamp(3.7rem, 10vw, 7.6rem)"
    fontWeight: 900
    lineHeight: 0.95
    letterSpacing: "0"
  body:
    fontFamily: "Instrument Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Phudu, Arial Narrow, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.045em"
rounded:
  control: "0.6rem"
  card: "1.25rem"
  card-large: "2rem"
  pill: "999px"
spacing:
  xs: "0.5rem"
  sm: "1rem"
  md: "1.5rem"
  lg: "3rem"
  section: "clamp(5rem, 8vw, 7rem)"
components:
  primary-button:
    backgroundColor: "{colors.coral}"
    textColor: "{colors.surface}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.8rem 1.7rem"
    height: "2.9rem"
  editorial-card:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    rounded: "{rounded.card}"
    padding: "1.75rem 1.5rem"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1rem"
    height: "3rem"
---

## Overview

The visual north star is **The Friendly Provocation**: a warm printed field guide colliding with candid community photography. The site should feel direct, curious, practical, and a little mischievous—never clinical, seedy, anonymous, or generically luxurious. Consent, choice, and clarity must remain visible in both language and interaction.

Use editorial scale, generous breathing room, real people, and real products. Let serif headlines carry intimacy and reflection; use the condensed display face for decisive statements and coral calls to action. Commerce should feel like part of the same publication, not a separate ecommerce template.

**The No-Divider Rule:** never use decorative horizontal rules, `<hr>` elements, `border-top`, or `border-bottom` to separate adjacent marketing sections. Create rhythm with whitespace, background changes, imagery, typography, and composition. Borders remain appropriate when they communicate a functional component boundary or state—for example navigation, form fields, tables, accordions, selected controls, and product-image frames.

## Colors

Coral is the primary action and emphasis color. It should mark buttons, important labels, active states, and occasional large display type without becoming an all-purpose background.

Ink is the default text and structural color. Paper and surface tones keep the site warm rather than stark. Do not use soft pink as a section, panel, or card background; use ink for dark feature modules instead. Mint is reserved for affirmative or supportive moments. Focus sky exists primarily for accessible focus indication.

Prefer broad, quiet color fields over outlines. Adjacent page sections may shift between paper, white surface, photography, and dark ink treatments; those shifts should replace decorative separator lines.

## Typography

Trocchi is the editorial voice. Use it for reflective headlines, readable feature copy, guide titles, product names, and moments that should feel human and considered.

Phudu is the declarative voice. Use it for oversized uppercase statements, compact eyebrows, labels, issue numbers, navigation, and calls to action. Large Phudu headlines should be tightly set and visually strong; labels remain small, legible, and restrained.

Instrument Sans is the utility voice. Use it for forms, controls, metadata, navigation support, commerce details, and dense explanatory text. Keep body text comfortable, with a typical measure of 38–48rem. Avoid mixing all three families in a single small component.

## Elevation

The interface is flat by default. Hierarchy comes from composition, color, scale, and spacing—not a stack of floating cards.

Use a soft ambient shadow only when something genuinely floats above its surroundings, such as the photographic CTA, a cart sheet, or a menu surface. Pink editorial cards and ordinary content sections should not receive decorative shadows. Hover motion is subtle: generally a one- or two-pixel lift with fast easing. Respect reduced-motion preferences.

Rounded corners should describe component families consistently: compact inputs use the control radius, editorial and commerce cards use the card radius, large image-led panels may use the large-card radius, and buttons use the pill radius.

## Components

**Global navigation** uses the real Department of Consent mark, compact condensed labels, generous lateral spacing, and one clear primary action when appropriate. Mobile navigation must preserve the same hierarchy without icon clutter.

**Primary buttons** are coral pills with white text in the condensed label style. Provide clear hover, focus, active, disabled, and loading states. The visible focus ring must never rely on color contrast alone against coral.

**Editorial cards** use dark ink or documentary photography, light text, a strong condensed headline, concise supporting copy, and at most one clear action. Light pink is not a card or panel background. Avoid badges, decorative icons, and card-within-card nesting.

**Product cards** lead with imagery, then title and price. The second product image may appear on hover when available. Do not add generic sale badges, shadow-heavy shells, or unnecessary metadata.

**Guide cards** treat each cover as a piece of printed matter. Preserve its proportions, pair it with the generated guide title and large coral number, and keep surrounding chrome quiet.

**Forms and newsletter capture** use explicit labels, generous tap targets, plain privacy language, and clear success and failure states. Form borders are functional and therefore allowed.

**Section transitions** use vertical spacing, background fields, an image edge, or a strong change in type scale. They never use a decorative line.

## Do's and Don'ts

### Do

- Separate marketing sections with whitespace, color, imagery, scale, and layout changes.
- Use real people, real products, guide artwork, and candid photography as the visual foundation.
- Keep calls to action concrete, singular, and written in plain language.
- Preserve keyboard operation, visible focus, useful alt text, responsive type, and generous touch targets.
- Let coaching, guides, the shop, and the podcast share one recognizable editorial system.
- Use borders only when they explain a component boundary, input, selection, table, navigation state, or interaction.

### Don't

- Do not place decorative horizontal lines, `<hr>` elements, `border-top`, or `border-bottom` between page sections.
- Do not use generic ecommerce cards, promotional widgets, badge clutter, icon-heavy layouts, or unnecessary shadows.
- Do not make the brand feel clinical, sanitized, seedy, secretive, or anonymously luxurious.
- Do not use coral as decoration everywhere; reserve it for emphasis and action.
- Do not hide consent, availability, price, privacy, or next-step information behind clever language.
- Do not break header, footer, typography, or spacing continuity when entering the shop or guide archive.
