# Form fix + video polish

## 1. Contact form: don't show success and error together
In `src/routes/contact.tsx → onSubmit`:
- On successful submit, also clear `errors` (currently the previous failed `errors.form` lingers when a retry succeeds — which is what the screenshot shows).
- On a fresh submit attempt, reset `sent` back to `false` before sending so the success message from a previous send disappears while retrying.
- Net effect: success ⇒ only "Message sent" shows; failure ⇒ only the error shows; never both.

## 2. Video improvements (`src/components/VideoWithToggle.tsx`, `src/routes/index.tsx`)

### Reduced-motion support
- Add a `usePrefersReducedMotion()` hook (matchMedia `(prefers-reduced-motion: reduce)`).
- Hero (`src/routes/index.tsx`): when reduced motion is on, render the poster image instead of the autoplay video on both desktop and mobile.
- `VideoWithToggle`: when reduced motion is on, skip the desktop autoplay effect — the video stays paused on its poster until the user taps/clicks play.

### Improved video loading
- `VideoWithToggle`: add `preload="metadata"` (so we fetch dimensions + poster only, not the full file) and only flip to `preload="auto"` once the user opts into playback or desktop autoplay fires.
- Hero desktop video: same `preload="metadata"` + `preload="auto"` after first interaction, and add `disableRemotePlayback`.
- Showreel + work modal: lazy-mount the `<source>` only when ready to play (via the existing `started` gate) so mobile users on a slow connection don't fetch the MP4 just by scrolling past.

### Icon hide timing — "Hide on autoplay, show on hover/tap"
- Remove the initial `scheduleHide()` call on autoplay so the icon never flashes on desktop autoplay.
- Initial `iconVisible` state starts `false` once autoplay starts (icon hidden by default).
- Reveal the icon on `mousemove` / `mouseenter` / `touchstart` / `click` over the container, then auto-hide 2s after the last such event.
- Manual play/pause toggles still reveal the icon (and reset the 2s timer) so the user gets visible feedback for their tap, then it fades.
- Mobile poster overlay (pre-start) is unchanged — big play button stays until tapped.

## Files touched
- `src/routes/contact.tsx` — clear `errors` and reset `sent` in `onSubmit`.
- `src/hooks/use-prefers-reduced-motion.ts` (new) — matchMedia hook.
- `src/components/VideoWithToggle.tsx` — reduced-motion gate, `preload` strategy, revised icon visibility logic.
- `src/routes/index.tsx` — hero respects reduced motion + tightened `preload` on the desktop hero video.

No backend or data changes.
