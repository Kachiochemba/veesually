## Problem
In the work-page lightbox, the video plays inside a fixed 16:9 box with `object-cover`, which crops the actual video frame. For the Luxury Jewelry Editorial (and any video whose native aspect differs from 16:9), the jewelry sits low in frame and gets clipped — the items don't show fully.

## Fix
Render the lightbox video with `object-contain` instead of `object-cover` so the entire native frame is always visible (letterboxed against black if needed). Thumbnails on the grid stay as-is (`object-cover` on the 4:5 card).

### Changes
1. `src/components/VideoWithToggle.tsx` — add an optional `objectFit?: "cover" | "contain"` prop (default `"cover"` to preserve current behavior everywhere else); apply it to the `<video>` className.
2. `src/routes/work.tsx` — pass `objectFit="contain"` to the `VideoWithToggle` inside the modal so the full jewelry frame shows.

No other pages or videos are affected.
