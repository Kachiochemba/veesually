# Video Behavior Updates

The hero background is currently a stock video (a camera-on-tripod clip). I'll make it desktop-only, gate all other videos behind a thumbnail+play tap on mobile, and add auto-hiding play/pause controls to the showreel.

## 1. Hero (`src/routes/index.tsx` → `Hero`)
- Detect viewport: on mobile (`< md`), render an `<img>` using the current poster URL (the Unsplash camera image already set on the `<video>`).
- On desktop, keep the existing autoplay/muted/loop/playsInline `<video>`.
- Implement via a small `useIsMobile` hook (matchMedia `(max-width: 767px)`) so SSR renders the video by default and swaps on the client. Hero copy and overlays stay unchanged.

## 2. Featured Showreel (`src/routes/index.tsx` → `Showreel`)
- Desktop: video still autoplays muted on loop (unchanged behavior), but with a new tap-to-toggle play/pause overlay.
- Mobile: render the thumbnail (poster) with a center play button; first tap starts playback.
- Add a play/pause icon overlay (lucide `Play` / `Pause`) that:
  - Shows immediately when the user clicks the video or toggles state.
  - Fades out after 2 seconds of inactivity.
  - Reappears on any tap/touch/mousemove over the video.
- Use a 5-second-mark still from the showreel video as the mobile poster (extracted via ffmpeg + uploaded as a Lovable asset, matching the pattern already used for the Featured cards).

## 3. Work page videos (`src/routes/work.tsx`)
- Grid cards (`WorkCard`) already show stills with a hover "▶ Watch" overlay — no change to the grid.
- The modal video currently has `autoPlay` + native `controls`. On mobile, change it so:
  - Modal opens showing the poster with a large center play button.
  - Tap to start playback; native `controls` remain so the user can scrub/pause.
- Desktop modal keeps current autoplay behavior.

## Technical notes
- New shared component: `src/components/VideoWithToggle.tsx` — wraps a `<video>` with state-driven play/pause, an icon overlay, and the 2-second auto-hide timer (cleared/reset on pointer/touch). Reused by Showreel and work modal.
- New shared hook: `src/hooks/use-is-mobile.ts` — `matchMedia("(max-width: 767px)")` with SSR-safe default.
- No changes to data (`src/data/site.ts`) other than (optionally) adding a `posterStart` already present for the showreel thumbnail asset.
- No backend changes. No new dependencies (lucide-react already installed).
