# Content Update — Ajoku Victory / VEESUALLY

Apply CV details as written copy across the existing site (no new pages, no layout changes). All edits are text-only.

## 1. `src/data/site.ts` (SITE constant)
Add founder + location fields used by About/Contact/Footer:
- `founder: "Ajoku Victory"`
- `role: "Videographer · Content Creator · Visual Storyteller · Founder of Veesually"`
- `location: "Lagos, Nigeria"`
- Keep existing `phone`, `phoneIntl`, `email`, `instagram`, `tiktok`, `tagline`.

SERVICES list — align titles/descriptions to the CV's 8 services (replace current 6):
1. Event Coverage — conferences, seminars, orientations, launches, conventions.
2. Corporate Videography — considered content for businesses, institutions, organizations.
3. Fashion & Retail Content — luxury fabrics, laces, asoebi, jewelry, wristwatches, native caps.
4. Product Videography — jewelry, watches, luxury retail product films.
5. Social Media Content — short-form for Instagram, TikTok, WhatsApp.
6. Promotional Videos — brand visibility campaigns and launches.
7. Interviews & Testimonials — founder, customer, and convention interviews.
8. Wedding & Pre-Wedding Films — cinematic storytelling for life's biggest moments.

FEATURED list — replace with the 5 CV projects (keep current image URLs, reassigning sensibly):
1. TUS Ireland Pre-Departure Orientation — Events — sessions on Visa Success Guide, Accommodation Readiness, Employment Insights, Student Success Planning, International Education Prep.
2. Ruby Luxe Fashion & Luxury Brand — Fashion — luxury fabrics, laces, asoebi, jewelry, wristwatches, native caps; grand opening + social content.
3. Fashion Brand Launches — Retail — launch coverage, customer experience, interviews, promo, social campaigns.
4. Church Conventions & Youth Conferences — Events — highlights, interviews, worship coverage, recaps, youth engagement.
5. Luxury Product Campaigns — Product Videos — jewelry, watches, luxury retail product films.

## 2. `src/routes/about.tsx`
- Eyebrow: `— The Studio`
- Headline: `Meet Ajoku Victory, the creative behind Veesually.` (keep "Veesually." in gold)
- Body paragraph 1: Ajoku Victory — videographer, content creator, visual storyteller. 2+ years producing high-quality visual content for brands, organizations, educational institutions, churches, conferences, retail, fashion, and corporate clients. Based in Lagos, Nigeria.
- Body paragraph 2: Specializes in storytelling, event documentation, corporate content, product marketing, social-media short-form, and brand visibility. Known for attention to detail, creativity, professionalism, fast turnaround, strong client communication, and high-quality editing.
- Three-up values block: keep structure, update to:
  - "Story-driven" — Narrative before noise.
  - "Premium craft" — Cinema-grade editing and color.
  - "Reliable delivery" — Fast turnaround, clear comms.
- Stats: change to `2+ Years` and `9 Sectors served`.
- Add small "Industries" line under body: Corporate · Education · Fashion · Luxury Retail · Faith · Conferences · Startups · Marketing Agencies · Social Brands.

## 3. `src/routes/services.tsx`
- Eyebrow unchanged (`— Capabilities`).
- Headline unchanged.
- Articles auto-update from new SERVICES (8 items instead of 6).
- Add a short "Tools" strip above the grid: Adobe Premiere Pro · CapCut · Mobile Videography · Content Planning · Storyboarding · Audio Editing.

## 4. `src/routes/work.tsx`
- Intro paragraph copy: "Selected films and content produced for fashion houses, luxury retail, corporate clients, educational institutions, faith organizations, and cultural events."
- PORTFOLIO updates flow from FEATURED data change; no structural changes.

## 5. `src/routes/contact.tsx`
- Add a Location line in the Direct list: `Lagos, Nigeria` (with a small map-pin icon, matching existing icon style).
- Keep phone/email/WhatsApp/Instagram/TikTok unchanged.

## 6. `src/routes/index.tsx` (Home)
- AboutSnippet teaser headline: `Behind the lens — Ajoku Victory.`
- Teaser paragraph: one sentence — "Lagos-based videographer building Veesually into a premium visual-storytelling studio for brands that care how they're seen."
- Keep hero tagline ("…brings brands to life.") unchanged.

## 7. `src/components/site/Footer.tsx`
- Add a small line: `Veesually · Lagos, Nigeria · Founded by Ajoku Victory`.

## Out of scope
- No new routes (no dedicated CV page, no Achievements/Tools sections beyond the strip above).
- No design-system, color, font, or component-style changes.
- No imagery swaps.
