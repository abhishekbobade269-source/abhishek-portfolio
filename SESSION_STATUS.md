# Portfolio Status — 2026-09-15

> Superseded 2026-09-14 version. The code fixes below are shipped and live. The imagery work
> that follows is **planning/asset-review only** — nothing has been wired into the code yet.

## Where things stand

- **Live site:** https://abhishek-portfolio-rose.vercel.app
- **GitHub:** https://github.com/abhishekbobade269-source/abhishek-portfolio (public, `main`
  branch). Auto-deploy is wired: every push to `main` redeploys automatically.
- **Git identity:** all commits authored as `Abhishek Bobade <abhishekbobade269@gmail.com>`, no
  Claude/other co-author trailers — keep it that way going forward.
- **Vercel project:** `abhishek-portfolio` under `abhishekbobade269-2821s-projects`. Deployment
  Protection (Vercel SSO) is **off** — the site must stay publicly reachable, don't re-enable it.
  Framework preset is explicitly set to `nextjs`.

## What shipped this session (committed + pushed, live now)

1. **Fixed: footer/section-3 overlap bug.** Two layered bugs:
   - `HomeSkills` was a strict `md:h-screen` with `HomeFooter` immediately after it in normal
     flow, so the last screen-height of scroll always showed a partial slice of section 3 cut by
     the footer. Fixed by having `HomeFooter` measure its own rendered height (`ResizeObserver`)
     into a `--footer-height` CSS var on `documentElement`, and `HomeSkills` now sizes itself
     `md:h-[calc(100vh-var(--footer-height,72px))]` instead.
   - That surfaced a **second, previously-invisible bug**: the skills grid's implicit row had no
     `md:grid-rows-1`, so its content could silently overflow and get clipped by the section's
     own `overflow-hidden`, independent of the footer. Fixed by constraining the row and
     re-tuning the heading clamp size / chip layout / flex ratios that no longer fit the
     corrected space. Verified at 768/900/1024/1080 desktop heights + mobile (390×844) with
     Playwright, measuring real element heights, not just screenshots.
2. **Fixed: missing projects.** The Bling Haven (client work) and Android Penetration Testing
   (academic) now show as small badges on the Projects section's "Shipped Products" card, Bling
   Haven linking to its live demo. Mobile card `min-h` bumped 160px → 230px so the badges don't
   collide with the heading above them.
3. **Verified & pushed:** `tsc --noEmit`, `eslint .`, `next build` all clean. Commit `76bbaac` on
   `main`.

## Imagery — visual-system planning (this session, NOT yet coded)

### The system we agreed on

Rather than random unrelated backgrounds, a 5-part visual identity, all sharing one grammar
(white background, thin gray/mint line-work, `#34d399` glowing nodes — this hex is also already
the color used in the coded favicon, `src/app/icon.tsx`, so it's consistent with something that
already existed):

| Theme | Lives in | Slot type |
|---|---|---|
| Hero — 3D network orb/core | Hero section's big card | Currently a shared masked-pan background — **needs a code change** to become one dedicated image (see below) |
| About — network silhouette (chest/shoulders, no head) | The "Operations Executive at Upstep Academy" card in the Skills panel | Currently just a `bg-white/20 backdrop-blur-xl` tint over the shared panel image, **no dedicated image slot exists yet — needs a code change** |
| AI/Automation — central core + workflow nodes | Skills section's dedicated right-hand image panel (`SKILLS_BG`) | Already a single dedicated image slot — straightforward file swap |
| Projects — data pipeline/deployment | Projects section shared background (`SECTION2_IMAGE`) | Already the masked-pan technique, same as it uses today — straightforward file swap, no restructuring needed |
| Closing — AB monogram | Footer, next to the copyright line | Footer currently has **no image element at all** — needs a small code addition |

Two themes from the original 7-idea brainstorm (**Engineering** — architecture diagram, and
**Experience** — connected-project constellation) were deliberately dropped: there's no honest
homepage slot for them without reversing the earlier 8-section → 3-section consolidation, and the
4 case-study pages (`/work/drone`, `/work/nids`, `/work/wifi`, `/work/inventory`) intentionally
keep their own distinct per-project visual identity (e.g. NIDS is a dark terminal/security-product
look) rather than inheriting this lighter homepage system.

### Images generated and reviewed — final picks

All in `AI Images/` (repo root, not yet moved into `public/`). **Recommended file per slot:**

- **Hero:** `AI Images/New folder/01_Hero_3D_network_orb_1254x1254.png` (1254×1254) — good as-is.
- **About:** `AI Images/New folder/ChatGPT Image Sep 15, 2026, 03_00_39 AM.png` (1774×887) —
  picked over the "named" `02_About_network_silhouette_2000x1250.png` because its shoulders are
  smoother/more naturally contoured; the named one's shoulders read as slightly spiky/crown-like.
- **AI/Automation:** `AI Images/New folder/ChatGPT Image Sep 15, 2026, 03_01_58 AM.png`
  (1086×1448) — picked over the "named" `03_AI_Automation_core_workflow_1200x1600.png` because it
  actually shows a central orb/core with 8 square workflow-step nodes radiating outward; the
  named one is just a generic scattered-node texture indistinguishable from other slots.
- **Projects:** `AI Images/New folder/04_Projects_data_pipeline_2600x1300.png` (2600×1300) — the
  "named" file is actually the best one here: consistent square stage-nodes in a clean
  left-to-right rising progression into a glowing end circle. A spare alternate exists at
  `ChatGPT Image Sep 15, 2026, 03_02_15 AM.png` (bullseye/target end instead of plain circle) —
  not needed for this slot but could be reused later as a "shipped/deployed" badge motif.
  minus needed elsewhere.
- **Closing:** `AI Images/New folder/05_Closing_AB_monogram_1254x1254.png` (1254×1254) — usable,
  minor cosmetic flaw (the "B"'s two lobes are slightly asymmetric), likely invisible at the
  small size it'll render at in the footer. Can regenerate for crispness later if it bugs us once
  it's actually in place — not a blocker.

## Pending — pick up here next session

1. **Move the 5 chosen files into `public/backgrounds/`** (rename to something descriptive, e.g.
   `hero-orb.png`, `about-network.png`, `automation-core.png`, `projects-pipeline.png`,
   `footer-monogram.png`) and delete/ignore the rest of `AI Images/` once confirmed.
2. **Straightforward swaps (no restructuring):**
   - `SECTION2_IMAGE` in `home-projects.tsx` → the new pipeline PNG.
   - `SKILLS_BG` in `home-skills.tsx` → the new automation-core PNG.
   - Re-check `useImageWidth`/`focalX` panning math still looks right for Projects with the new
     image (it was tuned for the old generated SVG).
3. **Real code changes needed:**
   - **Hero:** switch from the shared masked-pan background (`HERO_IMAGE` panned across 4 cards)
     to one dedicated image in the big bottom card only — same pattern the Skills panel already
     uses (`SKILLS_BG` in its own `<Image fill>`), not the multi-window pan trick. The 3 pill bars
     above it should probably go back to a plain solid card color once they're not sharing the
     orb image.
   - **About card:** give the "Operations Executive at Upstep Academy" card its own background
     image (a real `<Image>`/CSS background, not backdrop-blur passthrough of the shared panel
     image) using the chosen shoulders/chest PNG. **Double-check afterward that the white text
     stays legible** over wherever the glow lands once cropped in — this was flagged as a risk
     and not yet verified visually.
   - **Footer:** add the AB monogram image, small and quiet, near the copyright line — currently
     text-only, no image markup exists there at all.
4. Once all 5 are wired in and looking right, `scripts/generate-backgrounds.mjs` (the old seeded-
   SVG generator) and the original `public/backgrounds/*.svg` files become dead code — remove
   then, not before.
5. Verify with Playwright across a few viewport heights/mobile afterward, same as the footer-fix
   verification earlier this session — raster images behave differently than the old vector SVGs
   (fixed pixel dimensions instead of infinite resolution), so it's worth re-checking nothing
   looks stretched or blurry on a very wide monitor.

## Reference

- All 4 case studies are untouched and still build clean; they intentionally keep their own
  separate visual identities and are **not** part of this imagery system.
- Resume PDF pipeline (`scripts/build-resume-pdf.js`) and OG image generation
  (`src/app/opengraph-image.tsx`, `src/app/icon.tsx`) are untouched. The favicon's accent color
  (`#34d399`) is what the new imagery's mint-green was matched to.
- Two live secrets pasted into an *earlier* session's chat (a Vercel token/API key, a GitHub PAT)
  — rotate in their dashboards if that still hasn't happened.
