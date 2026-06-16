## Site-wide polish & dedupe

Apply your selected improvements consistently to every page (mobile + desktop), and remove duplicated content/patterns.

### 1. Hero video — remove blur
- `src/routes/index.tsx`: drop `blur-[1px]` from the hero `<video>` so footage stays sharp. Keep the dark gradient overlay for legibility.

### 2. Remove clutter (site-wide)
- **Scroll indicator**: remove the bottom-right `ArrowDown + "Scroll"` chip from the home hero.
- **Eyebrow numbering**: remove the `— 01 / …`, `— 02 / …` numeric prefixes everywhere.
  - Home: simplify `Section` so the eyebrow becomes just `— {subtitle}` and drop the `index` prop from all five calls.
  - About / Services / Work / Contact: change `— About / The Studio` → `— The Studio`, `— Services / Capabilities` → `— Capabilities`, `— Work / 2024–2026` → `— Selected Work`, `— Contact / Start a Project` → `— Start a Project`.

### 3. Tighten mobile padding
- Section vertical rhythm currently jumps from `py-24` to `md:py-32`. Reduce mobile to `py-16` (keep `md:py-28`).
- Page-top spacing on About/Services/Work/Contact: `pt-32` → `pt-24 md:pt-32`.
- Hero bottom padding on home: `pb-20 md:pb-28` → `pb-14 md:pb-24`.
- Article spacing in Services & FeaturedWork: `space-y-24 md:space-y-32` → `space-y-16 md:space-y-28`.

### 4. Unify button styles
Standardize on two reusable classes used everywhere:
- **Primary (pill, solid)**: `rounded-full bg-foreground px-7 py-4 text-xs uppercase tracking-[0.2em] text-background transition-transform hover:scale-[1.02]`
- **Ghost (pill, outlined)**: `rounded-full border border-border px-7 py-4 text-xs uppercase tracking-[0.2em] hover:border-accent hover:text-accent`
- **Text link**: `border-b border-foreground pb-1 text-sm uppercase tracking-widest hover:border-accent hover:text-accent`

Apply consistently to: hero CTAs, Contact page CTAs (currently `px-6 py-3` — bump to match), Contact form submit, Services "Enquire", About "Work with us", Home "All services" / "Read full story".

### 5. Stronger gold accent usage
- Underline-on-hover (gold) for nav links and text links — already partial; add to footer links and Work filter chips.
- Bump the active Work filter pill from solid foreground to `border-accent text-accent` for a lighter, more on-brand active state.
- Use `text-accent` for stat numbers (already), section eyebrow numerals where kept, and the marquee separator ✦ (already).
- Form inputs: focus underline already `focus:border-accent` — keep, but also give the placeholder label (eyebrow) `text-accent` on focus via `peer` pattern is overkill; instead just leave inputs and ensure the submit button uses primary style.

### 6. Subtle scroll-reveal animations
- Add a single utility `.reveal` in `src/styles.css` that starts at `opacity-0 translate-y-2` and animates to visible on `.is-visible`.
- Add a tiny `useReveal()` hook (IntersectionObserver) in `src/hooks/useReveal.ts`, then apply it to: every `Section` header, each FeaturedWork article, each Services article, About copy block, Testimonial cards, Contact form.
- Keep existing `.fade-up` on hero text.

### 7. Deduplicate content
- **"Meet the creative behind Veesually"** appears on both home (`AboutSnippet`) and `/about` with overlapping copy and the same portrait image.
  - Keep `AboutSnippet` on home as a short teaser but **change the headline** to `Behind the lens.` and trim the paragraph to one sentence; keep the "Read full story →" link as the only path to the full bio.
  - `/about` keeps the full headline, full bio, stats, and values grid.
- **Showreel vs Work**: Home `Showreel` and `/work` both serve as portfolio entry points. Keep Showreel (it's a single hero video), but remove its caption strip `Events · Corporate · Fashion · Product · Interviews · Reels` since that list is already implied by the Work filter chips and Services grid.
- **Services list**: home shows 6, `/services` shows all. Already a teaser — no change, but ensure both link styles match (#4).
- **Italic accent words**: `to life.` on home is now plain text (your earlier instruction). Apply same — remove `italic` class — to `care` (services), `Veesually.` (about), `exceptional.` (contact). Keep them gold via `text-accent`, no italic. This makes the accent treatment consistent across all four page headlines.
- **Contact info duplication**: footer and `/contact` both list email, phone, Instagram, TikTok. Keep both (expected), but ensure they share the same `SITE` constants (already do) — no code change needed; just verifying nothing diverges.

### Files touched
- `src/routes/index.tsx` (hero blur, scroll chip, Section numbering, AboutSnippet trim, Showreel caption, mobile padding, button classes, reveals)
- `src/routes/about.tsx` (eyebrow, italic removal, mobile padding, reveals)
- `src/routes/services.tsx` (eyebrow, italic removal, padding, button classes, reveals)
- `src/routes/work.tsx` (eyebrow, padding, filter pill active style, reveals)
- `src/routes/contact.tsx` (eyebrow, italic removal, padding, button class parity)
- `src/styles.css` (`.reveal` utility)
- `src/hooks/useReveal.ts` (new IntersectionObserver hook)

No changes to data, routing, nav, or footer structure.
