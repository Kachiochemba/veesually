## Goal

1. Videos on the Work / portfolio page should play with **sound**.
2. Home page videos stay silent (current behavior).
3. The home page showreel video should also appear as an item on the Work page.

## Changes

### 1. `src/components/VideoWithToggle.tsx` — add real audio support

Today the component hardcodes `muted` defaults and only renders a play/pause icon. Update it so:

- `muted` prop is fully respected (no longer forced silent in any path).
- Add a small **mute/unmute** button in the corner of the player (speaker / speaker‑off icon from `lucide-react`), shown whenever the video has started. Clicking it toggles `videoRef.current.muted` and updates local state.
- When opened with `muted={false}`, the video starts unmuted. Because the Work page only plays videos *after* the user clicks a card (a real user gesture), browsers will allow audio playback — no autoplay‑with‑sound policy violation.
- Home page calls (hero showreel, any inline auto‑playing clips) keep using the default `muted` (true), so nothing changes there.

### 2. `src/routes/work.tsx` — unmute the lightbox player

In the modal `<VideoWithToggle ... />` for the active item, pass `muted={false}`. The grid thumbnails are still static images, so this only affects the opened lightbox where the user has just clicked.

### 3. `src/data/site.ts` — add the showreel to `FEATURED`

The home page's showreel uses `luxury-watches.mp4` + `luxury-watches-thumb-5s.jpg` (already imported on the index route). Add a new entry at the top of `FEATURED` so it shows up on `/work`:

```ts
{
  title: "Veesually Showreel",
  category: "Product Videos",
  desc: "A cinematic highlight reel of our recent work across luxury retail, fashion, and editorial videography.",
  image: showreelPoster.url,         // luxury-watches-thumb-5s
  video: showreelVideo.url,          // luxury-watches.mp4
}
```

…and add the matching imports at the top of the file:

```ts
import showreelVideo from "@/assets/luxury-watches.mp4.asset.json";
import showreelPoster from "@/assets/luxury-watches-thumb-5s.jpg.asset.json";
```

The home page keeps its local imports unchanged — no behavior change there.

## Notes

- No other pages or business logic touched.
- "Autoplay with sound" is blocked by browsers globally; the Work lightbox bypasses this because it opens from a user click. If a browser still blocks audio in some edge case, the user can use the new unmute button.
- The thumbnail / category for the showreel can be tweaked later if you want a different label than "Product Videos".
