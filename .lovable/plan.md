## Goal
Simplify the Work page to show only the 4 featured videos from the homepage, each with an image thumbnail that previews on hover and opens a full video player on click.

## Changes

**`src/routes/work.tsx`**
- Source items from `FEATURED` (the 4 homepage videos) instead of `PORTFOLIO`.
- Keep category filter chips, but build the list from the 4 featured categories only (Events, Fashion, Product Videos, Weddings) plus "All".
- Each card:
  - Shows the still `image` thumbnail by default.
  - On hover, plays the muted/looping `video` inline (swap visibility, video plays only while hovered to save bandwidth).
  - On click, opens a modal/lightbox with the full video playing with controls, sound enabled, closeable via backdrop click or close button (Esc key too).
- Show title + category in caption as today.

**Modal**
- Implemented inline in `work.tsx` (no new components needed): fixed overlay, centered `<video controls autoPlay>` using the selected item's `video` URL, max-width responsive, dark backdrop, close button top-right.
- Lock body scroll while open.

## Out of scope
- No changes to `FEATURED` data, homepage, or other routes.
- `PORTFOLIO` array stays as-is (still used nowhere else after this, but leaving it avoids unrelated edits).
