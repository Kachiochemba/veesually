
# VEESUALLY — Premium Portfolio Website

A cinematic, Apple/Nike-inspired creative agency site for videographer Oghenetejiri Etaghene. Black/white/charcoal palette with subtle gold accents, bold modern type, generous whitespace, and film-grade motion.

## Visual System

- **Palette** (tokens in `src/styles.css`):
  - `--background` near-black `oklch(0.12 0 0)`
  - `--foreground` warm white `oklch(0.97 0.005 80)`
  - `--muted` charcoal `oklch(0.22 0 0)`
  - `--accent` subtle gold `oklch(0.78 0.12 80)` (used sparingly: hairlines, hover states, small marks)
  - `--border` `oklch(1 0 0 / 0.08)`
- **Typography**: Display = Fraunces or Instrument Serif for editorial moments; UI = Inter Tight / Geist for sans. Loaded via `<link>` in `__root.tsx` head. Massive hero type, tight tracking, uppercase eyebrow labels with monospace numerals for section numbering (01 — Work, 02 — About…).
- **Motion**: Subtle on-scroll fades, marquee for client logos, hover scale on project tiles, looping muted hero video. Use CSS + Motion-style transitions (no heavy libs required initially).

## Route Architecture

Separate routes (each with own `head()` meta) — not hash anchors:

```
src/routes/
  __root.tsx           — nav + footer shell, font links, dark theme
  index.tsx            — Hero, brief about, services teaser, featured work, showreel, testimonials, CTA
  work.tsx             — Filterable portfolio gallery (Events, Corporate, Fashion, Retail, Product, Weddings, Interviews, Social)
  services.tsx         — Full services grid w/ descriptions
  about.tsx            — Founder story, philosophy, stats
  contact.tsx          — Form, WhatsApp/Email/Social CTAs
```

## Page Breakdown

**Home (`/`)**
- Full-viewport hero: silent autoplay looping background video (placeholder MP4 URL via Pexels/Coverr — easily swappable), dark gradient overlay, headline "Visual Storytelling That Brings Brands To Life.", subhead, two CTAs ("View Portfolio" → /work, "Book A Project" → /contact). Scroll indicator at bottom.
- Brand marquee strip (client/industry names).
- Section 01 — Services teaser (3 cards + "All services →").
- Section 02 — Featured Projects (5 large editorial tiles in alternating asymmetric layout, each with cover image, title, category tag, short description).
- Section 03 — Showreel: large 16:9 video block with play affordance, title "Featured Showreel", caption listing content categories.
- Section 04 — About snippet: portrait + short bio + "Read more →".
- Section 05 — Client Experience: testimonial cards (name, industry, project type, quote).
- Closing CTA: "Let's Create Something Exceptional" → contact.

**Work (`/work`)**
- Header with section number + title.
- Filter chips: All, Events, Corporate, Fashion, Retail, Product Videos, Weddings, Interviews, Social Media Reels.
- Responsive masonry/grid of project tiles with hover reveal (title, category). Click opens a lightweight detail dialog (project description from brief).

**Services (`/services`)**
- 6 services as numbered editorial rows (alternating image/text), each with description from brief.

**About (`/about`)**
- Large founder portrait, "Meet The Creative Behind Veesually", full bio, list of focus areas, "2+ Years" stat, value props (Authentic Moments / Emotional Connection / Compelling Narratives).

**Contact (`/contact`)**
- Headline "Let's Create Something Exceptional".
- Contact form (name, email, project type select, message) with Zod validation, client-side only — submission opens a prefilled mailto / WhatsApp link (no backend yet).
- Direct contact block: phone 08146304928, email ajokuvictory0032@gmail.com, Instagram @veesually_, TikTok @veesually_.
- Prominent WhatsApp + Email buttons.

**Footer** (in `__root.tsx`)
- VEESUALLY wordmark, tagline, contact info, social links, copyright.

## SEO

Per-route `head()`: unique title, description, og:title, og:description. Leaf routes with hero imagery set og:image. Single H1 per page. Semantic sections.

## Technical Notes

- TanStack Start file-based routes; nav via `<Link>`.
- All colors via semantic tokens — no hardcoded hex in components.
- Images: use Unsplash placeholder URLs themed to videography/fashion/events so the site looks real immediately; user can swap for real shots later.
- Hero video: use a free silent cinematic MP4 (e.g. Pexels CDN URL) as placeholder.
- Form validation with `zod` + `react-hook-form` (already shadcn-compatible).
- No backend / Lovable Cloud needed at this stage — contact form posts via mailto/WhatsApp deep links.

## Out of Scope (for now)

- CMS for projects (hardcoded in a `src/data/projects.ts` module).
- Real video uploads (placeholders only).
- Email backend (mailto/WhatsApp deep links instead).

Ready to build on your approval.
