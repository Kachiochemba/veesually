# Site loading + form message fixes

## 1. Contact form: false "Something went wrong" after a successful send

The form posts to Formspree and currently treats anything that isn't `res.ok` (HTTP 2xx) as a failure. Formspree's AJAX endpoint can return a 200 *with* `{ ok: false, errors: [...] }` (e.g. spam/captcha checks), or a non-2xx status while still delivering the email — both of which produce the red "Something went wrong" message you saw, even though the message arrived.

Change `onSubmit` in `src/routes/contact.tsx` to:
- Parse the response body as JSON (`await res.json().catch(() => ({}))`).
- Treat the submission as successful when either `res.ok` is true *or* the JSON body indicates success (`json.ok === true`, or no `errors` array).
- Only show the error message on a real network failure (the `catch` branch) or when Formspree explicitly returns `errors`.
- Surface Formspree's error message when present instead of the generic string.

Net effect: a successful submission only shows the green "Message sent" line; the red error only appears on genuine failures.

## 2. Videos: load and play only when actually visible

Right now every featured-work `<video>` and the showreel start fetching and playing as soon as the page mounts, even if they're far below the fold. On slower connections this stalls the rest of the page and can leave the hero/poster frames stuck.

- Add a small `useInView` hook (IntersectionObserver, `rootMargin: "200px"`).
- `FeaturedClip` (`src/routes/index.tsx`): keep `preload="metadata"` + poster, but only call `.play()` / attach the timeupdate-loop listener once the clip enters view. Pause + detach when it leaves view. Drop the `autoPlay` attribute so the browser doesn't kick off playback before the observer fires.
- `VideoWithToggle` (`src/components/VideoWithToggle.tsx`): same gating for the desktop-autoplay branch — only start playback when the element scrolls into view, and pause when it scrolls out. Manual play/pause via the toggle is unchanged.

This means the homepage paints with just posters, then each clip wakes up as the user scrolls to it.

## 3. Smaller initial network cost

- Hero video (`src/routes/index.tsx`): drop the legacy Coverr placeholder MP4 and just use the existing poster image. The hero is the first paint; a 1080p MP4 from a third-party CDN delays LCP without adding much. Mobile/reduced-motion already shows the image — make desktop use it too unless we have a branded hero clip.
- Add `decoding="async"` and explicit `width`/`height` (or `aspect-ratio` via the existing classes) to the featured `<img>` posters so the browser can reserve space and avoid layout shift while videos warm up.
- Add `<link rel="preconnect">` for the asset CDN (`/__l5e/...` origin) in `src/routes/__root.tsx` `head().links` so the first asset request doesn't pay a fresh TLS handshake.

## 4. Small polish

- Add a `loading="lazy"` + `decoding="async"` pass on the remaining Unsplash images in `ServicesTeaser` / `AboutSnippet` for consistency.
- In `VideoWithToggle`, when the page is hidden (`document.visibilitychange`), pause any playing video so background tabs stop decoding frames.

## Out of scope
No backend, schema, or data changes. No new dependencies.

## Files touched
- `src/routes/contact.tsx` — success/error logic.
- `src/routes/index.tsx` — `FeaturedClip` in-view gating, hero simplification, image attrs.
- `src/components/VideoWithToggle.tsx` — in-view gating, visibility pause.
- `src/hooks/use-in-view.ts` — new tiny IntersectionObserver hook.
- `src/routes/__root.tsx` — preconnect link.
