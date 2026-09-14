# Portfolio Status — 2026-09-14

> Superseded 2026-09-13 version (that one described a pre-launch, not-yet-pushed state — no longer
> true, see below). Written so this session (or a fresh one) can pick back up without re-deriving
> context.

## Where things stand

- **Live site:** https://abhishek-portfolio-rose.vercel.app
- **GitHub:** https://github.com/abhishekbobade269-source/abhishek-portfolio (public, `main`
  branch). Auto-deploy is wired: every push to `main` redeploys automatically.
- **Git identity:** all commits authored as `Abhishek Bobade <abhishekbobade269@gmail.com>` —
  history was rewritten once (while still unpushed) to remove an earlier contributor's name and
  the Claude co-author trailer, per the user's explicit request. Keep it that way going forward.
- **Vercel project:** `abhishek-portfolio` under `abhishekbobade269-2821s-projects`. Deployment
  Protection (Vercel SSO) is **off** — the site must stay publicly reachable, don't re-enable it.
  Framework preset is explicitly set to `nextjs` (it defaulted to "Other" once and broke routing —
  see Incidents).

## What shipped this session

1. **OfficeStock IMS (Inventory) marked Live** — `resume.ts` status flipped to Live, demo link
   added (`https://office-inventory-management-system-xi.vercel.app`), and `/work/inventory` got a
   "Live Demo" button plus the seeded demo credentials (admin/manager/staff@officestock.dev,
   `Password123!`) so visitors can log in themselves.
2. **First-ever push + deploy of the portfolio itself** (previously local-only, by design). Created
   the GitHub repo, deployed to Vercel, fixed a Deployment-Protection block and a framework
   misconfiguration that was causing platform-level 404s on every route.
3. **Full homepage redesign** — replaced the old 8-section scrolling page (Hero/About/Experience/
   Projects/ClientWork/Skills/Education/Contact) with a 3-section full-screen design built around
   a "masked card" technique (one shared background image, cards act as windows into it via
   matched `background-position` offsets), adapted from a template the user provided:
   - `src/components/masked/` — `useMaskPositions`, `useImageWidth`, `useIsMobile`,
     `useStaggeredReveal` hooks + `MaskedCard` component.
   - `src/components/splash-screen.tsx` — 0→100 counter splash, bottom-left, then fades.
   - `src/components/home-navbar.tsx` — fixed navbar, slide-in overlay menu.
   - `src/components/sections/home-hero.tsx` (Section 1), `home-projects.tsx` (Section 2, pulls
     the 4 independent projects live from `resume.ts`), `home-skills.tsx` (Section 3, folds in all
     5 skill groups + Education + Experience + a contact CTA).
   - `src/components/home-footer.tsx` — minimal closing footer (email/GitHub/LinkedIn).
   - `public/backgrounds/*.svg` + `scripts/generate-backgrounds.mjs` — hand-generated abstract
     background art (orbit/circuit motifs, deterministic seeded generator), **not** photos or AI
     images — there's no image-generation tool available in this session, so this was the agreed
     fallback (see Pending #3 below).
   - Deleted the old Hero/About/Experience/Projects/ClientWork/Skills/Education/Contact section
     components, the old NavBar/Footer/ScrollProgressBar/ThemeToggle, and the site-wide dark-mode
     toggle system (the new homepage is intentionally light-only; homepage was dark mode's only
     consumer).
   - Verified with `tsc`/`eslint`/`next build` and Playwright screenshots (desktop, mobile, nav
     menu open) before pushing. Two real bugs were caught and fixed this way: a fixed-navbar/
     content overlap on sections 2–3, and illegible white-on-white text on inactive project cards.
4. **WiFi Security Lab demo link repointed** — the wifi-deauthentication session shipped a
   standalone Vite/shadcn/Spline landing + case-study site
   (https://landing-iota-black-60.vercel.app) that embeds the old hardware-free demo live via
   iframe. `resume.ts`'s `links.demo` and `/work/wifi`'s CTA ("Live 3D Demo") now point there.
   `links.repo` / the "Code" button were left alone — `wifi-deauth-lab` is still a **private**
   GitHub repo by the user's own choice, so that link 404s for anonymous visitors until they flip
   it public themselves.
5. **Hosting architecture question answered** (no code change): confirmed the existing pattern —
   each project (Drone, NIDS, WiFi, Inventory) stays its own repo + its own deploy, the portfolio
   stays the lightweight hub linking out via `/work/*` pages. This is deliberate (mixed stacks:
   Python/Scapy, Next.js/Prisma/Postgres, MAVLink, etc. — a monorepo would fight all of them at
   once) and was already decided once before (see the IDS "separate-repo-per-project" incident in
   git history) — don't revisit unless a project stops being an independently-built thing.

## Pending — pick up here next session

1. **Bug: Section 3 / footer overlap at the very bottom of the page.** Scrolling to the end shows
   the "Full-Stack & Automation" section's last card ("Let's build…" CTA) visually cut off/
   overlapped by `HomeFooter` rather than cleanly finishing first — reported directly by the user
   with a screenshot. Root cause is likely that section 3 is a strict `h-screen` (no scroll-snap),
   so whatever the viewport height happens to be, the very last scroll position always shows a
   partial slice of section 3 plus the footer beneath it. Needs an actual fix (candidates: scroll-
   snap so each section locks to full-viewport before the next begins, or give the footer its own
   comfortably-clear space / stop section 3 from being exactly `100vh` when a footer follows it) —
   then re-verify with Playwright at a few different viewport heights, not just 900px.
2. **"Wire all projects" — some things aren't represented on the new homepage at all:**
   - **The Bling Haven** (client work / freelance project) — had its own section before
     (`ClientWork`), fully dropped in the redesign. Needs a real place on the new homepage (a 5th
     gallery sub-card? A dedicated small block in Section 2?) rather than staying invisible.
   - **Android Penetration Testing (Academic Exercise)** — also dropped (the new Projects gallery
     only pulls `tag === "Independent Project"` items, i.e. the 4 rebuilds). Decide whether it
     belongs somewhere or is fine staying resume-only.
   - Repo/demo links (as opposed to just the internal case-study link) aren't surfaced anywhere on
     the new homepage's project cards — worth deciding if that matters or if the case-study pages
     covering it is enough.
3. **Real (or better) imagery for the masked-card sections.** The current background art
   (`public/backgrounds/*.svg`) is hand-drawn abstract orbit/circuit art, generated because this
   session has no image-generation tool. The user has now asked for AI-generated images. Options
   to raise next time: (a) check whether an image-gen tool/MCP server is available by then, (b) the
   user supplies real images/photos, (c) stay with the generated-art approach but push it further
   (richer motifs, per-section variation) — needs a decision before more work goes into it.

## Reference

- All 4 case studies (`/work/drone`, `/work/nids`, `/work/wifi`, `/work/inventory`) are untouched
  by the redesign and still build clean.
- Resume PDF pipeline (`scripts/build-resume-pdf.js`) and OG image generation
  (`src/app/opengraph-image.tsx`, `src/app/icon.tsx`) are untouched.
- `scripts/generate-backgrounds.mjs` is deterministic (seeded PRNG) — re-run it if the background
  motif needs to change; don't hand-edit the generated SVGs directly.
- Two live secrets were pasted into this session's chat at different points (a Vercel token/API
  key, a GitHub PAT) — neither was stored anywhere, but both are in this session's transcript and
  should be rotated in their respective dashboards if that hasn't happened yet.
