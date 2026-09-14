# Portfolio Status — 2026-09-15

> Superseded 2026-09-14 version. All three items it left pending are now resolved or in
> progress — see below.

## Where things stand

- **Live site:** https://abhishek-portfolio-rose.vercel.app
- **GitHub:** https://github.com/abhishekbobade269-source/abhishek-portfolio (public, `main`
  branch). Auto-deploy is wired: every push to `main` redeploys automatically.
- **Git identity:** all commits authored as `Abhishek Bobade <abhishekbobade269@gmail.com>`, no
  Claude/other co-author trailers — keep it that way going forward.
- **Vercel project:** `abhishek-portfolio` under `abhishekbobade269-2821s-projects`. Deployment
  Protection (Vercel SSO) is **off** — the site must stay publicly reachable, don't re-enable it.
  Framework preset is explicitly set to `nextjs`.

## What shipped this session

1. **Fixed: footer/section-3 overlap bug** (was pending item #1). Root cause was actually two
   layered bugs, not one:
   - `HomeSkills` was a strict `md:h-screen` with `HomeFooter` immediately after it in normal
     flow, so the last screen-height of scroll always showed a partial slice of section 3 cut by
     the footer. Fixed by having `HomeFooter` measure its own rendered height (`ResizeObserver`)
     into a `--footer-height` CSS var on `documentElement`, and `HomeSkills` now sizes itself
     `md:h-[calc(100vh-var(--footer-height,72px))]` instead — the two now meet with zero overlap
     at any viewport height (verified 768/900/1024/1080).
   - That surfaced a **second, previously-invisible bug**: the skills grid's implicit grid row
     had no `md:grid-rows-1`, so its content (three stacked cards) could silently overflow the
     grid's own height and get clipped by the section's `overflow-hidden` — independent of the
     footer, just masked by it before. The "Get in Touch" CTA card's third line ("worth
     shipping") was actually already being cut off *before* this session's fix, at `h-screen`.
     Fixed by adding `md:grid-rows-1` (forces the row to `minmax(0,1fr)` so children can actually
     shrink), then re-tuning content that no longer fit the shrunk space: the big heading's
     clamp() size, the skill-chip-group card padding/min-width (now one row of 5 instead of
     wrapping to 3+2), and the three cards' flex-grow ratios. All verified via Playwright at
     768/900/1024/1080 desktop heights + mobile (390×844) — no clipping, no overlap, checked with
     real height/scrollHeight measurements, not just eyeballing.
2. **Fixed: missing projects** (was pending item #2). Both now surfaced on the homepage:
   - **The Bling Haven** (client work) and **Android Penetration Testing** (academic exercise)
     appear as small badges in the previously-empty lower half of the Projects section's "Shipped
     Products" card — Bling Haven links out to its live demo, Android Pen Testing is a plain
     label (no public link exists for it). Mobile needed the card's `min-h` bumped
     (160px → 230px) so the badges don't collide with the big heading above them.
   - Repo/demo links on the main 4-card gallery itself: left as-is (case-study pages already
     surface those) — a deliberate call, not an oversight.
3. **Imagery decision (was pending item #3): resolved — user will supply real photos.** No
   image-generation tool was available in this session either. **Next step, needs the user:**
   drop real photos into the repo (see below for what's needed) so they can replace
   `public/backgrounds/*.svg`. Not yet done — this is the one open item for next session.

## Pending — pick up here next session

1. **Wire in real photos once supplied.** Three masked-card background slots to fill, each used
   as one continuous image that multiple cards "window" into (see
   `src/components/masked/masked-card.tsx` — one shared `background-image` + per-card
   `background-position` offset, so the image must be a single wide/continuous composition, not
   separate per-card crops):
   - `public/backgrounds/hero-mesh.svg` → Section 1 (Hero, 4 stacked cards, needs a **wide
     landscape** image, section is full `100vh` tall)
   - `public/backgrounds/projects-grid.svg` → Section 2 (Projects, 4-card mosaic, also **wide
     landscape**, same full-height treatment)
   - `public/backgrounds/skills-portrait.svg` → Section 3 (Skills, single right-hand panel, more
     flexible aspect ratio since it's one card not a multi-card pan)
   - Once real photos (jpg/png/webp) land in `public/backgrounds/` (or wherever the user drops
     them), update the `HERO_IMAGE`/`SECTION2_IMAGE`/`SKILLS_BG` constants in
     `home-hero.tsx`/`home-projects.tsx`/`home-skills.tsx` to point at them, and re-verify the
     `useImageWidth` panning math still looks right (it measures natural image width scaled to
     section height, then offsets by `focalX` — may need `focalX` retuned per photo).
   - `scripts/generate-backgrounds.mjs` (the seeded-SVG generator) becomes dead code once photos
     are in — remove it then, not before.

## Reference

- All 4 case studies (`/work/drone`, `/work/nids`, `/work/wifi`, `/work/inventory`) are untouched
  and still build clean.
- Resume PDF pipeline (`scripts/build-resume-pdf.js`) and OG image generation
  (`src/app/opengraph-image.tsx`, `src/app/icon.tsx`) are untouched.
- Verified this session: `tsc --noEmit`, `eslint .`, `next build` all clean; Playwright checks at
  four desktop heights (768/900/1024/1080 @ 1440 width) + mobile (390×844), full page scroll to
  true bottom each time.
- Two live secrets pasted into a *previous* session's chat (a Vercel token/API key, a GitHub PAT)
  — rotate in their dashboards if that still hasn't happened.
