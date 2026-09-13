# Portfolio + Multi-Project Status — 2026-09-13

> Originally written ahead of a system restart (for Docker installation) that would have closed
> every open Claude Code session. The restart didn't end up happening — Docker got installed
> without one — so all sessions listed below stayed alive and this file is now just a running
> status log rather than a pre-restart snapshot. Kept for reference; each project folder also has
> its own detailed `PROGRESS.md` for exactly where it left off.

## Overview

Building an animated Next.js portfolio for Abhishek Bobade, tying together an industry-grade
resume and five real engineering projects: four personal builds (started as college coursework,
now being rebuilt to a professional standard) plus one live freelance client project. **Each
project folder is its own independent git repo — not a monorepo** (this was a real point of
confusion, resolved today — see Incidents below).

## This session's role

This Claude Code session lives in this portfolio folder and is a supervisor/integrator, not the
builder of the other four projects — each has (or had) its own separate Claude Code session
actively building it. **Do not spawn a new agent into any of the four project folders below
without first checking who currently owns that folder** (`ListAgents`) — a real file-collision
incident happened here once already (see Incidents).

## Portfolio site (this folder's own code)

- Next.js 16 + TypeScript + Tailwind v4 + Framer Motion, dark-mode-first with a light toggle.
- Sections: Hero, About, Experience, Projects (5 cards with status badges + stack tags), Client
  Work (theblinghaven), Skills, Education, Contact.
- Resume: `resume/Abhishek_Bobade_Resume.pdf` (ATS-friendly, single page), generated from
  `resume/src/resume.html` via `node scripts/build-resume-pdf.js` — re-run that after editing the
  HTML source, and commit the regenerated PDF.
- Git: own repo, not yet pushed to GitHub or deployed to Vercel (deliberate — "build locally,
  deploy later").
- `.mcp.json` configured (github/vercel/chrome-devtools/context7/serena), reads secrets from env
  vars (see `.env.local.example`) — none set yet.
- Build/lint/typecheck all clean as of last check.

## Per-project status

### Ai Automation Drone (DroneOps AI)
- All 12 build phases complete per its own `PROGRESS.md` (scaffold → domain → security → data →
  API → automation → dashboard UI → tests → CI/CD → Docker → docs → verify).
- Own independent git repo. Latest commit: "Add Redis-backed storage for a genuinely free
  serverless deploy."
- **No GitHub remote configured yet** — needs `gh repo create ... --source=. --remote=origin --push`.
- Not yet linked into the portfolio with a live demo/repo link (shows "In Development" — flip its
  `status`/`links` in `src/data/resume.ts` once pushed/deployed).

### IDS — Network Intrusion Detection System
- Pushed to GitHub: https://github.com/abhishekbobade269-source/network-intrusion-detection-system
- Has its own detailed restart instructions in its `PROGRESS.md` (venv setup, `nids train`,
  `nids replay`, git verification) — written in anticipation of this same restart.
- **Incident (resolved)**: this session's commits initially landed directly inside the
  *portfolio's* own git repo (no nested `.git` of its own), and it placed a CI workflow at the
  portfolio root, assuming a monorepo. Fixed: portfolio untracked it (`git rm --cached`, no data
  lost), the session then `git init`-ed its own repo fresh and re-pushed the CI file scoped to
  itself only.

### WiFi Deauthentication Lab
- Pushed to GitHub: https://github.com/abhishekbobade269-source/wifi-deauth-lab
- Furthest along of the four rebuilds early on; now includes a hardware-free interactive browser
  demo — likely closest to portfolio-ready.
- Safety-gated by design: every attack path requires an explicit, expiring authorization allow-list
  plus an interactive confirmation step; framed throughout as a lab-only educational tool, never a
  ready-to-point-at-anything tool.

### Inventory & Asset Management System (OfficeStock IMS)
- Owned by a separate dedicated session (not this one) — it collided with a background agent this
  session had spawned before realizing that session already existed; the agent was stopped
  immediately, no work was lost (confirmed via a clean rebuild afterward).
- Full Next.js 16 + Prisma/Postgres app: auth, RBAC, dashboard, and modules for items, categories,
  suppliers, offices, stock movements, purchase orders, asset assignments, admin users, audit log.
- Own local git repo (3 commits). **GitHub push attempted but failed** (permission guard on
  public-repo creation, missing/bad credentials for private) — push from your own machine:
  `gh repo create office-inventory-management-system --private --source=. --remote=origin --push`
- **Blocked on Docker** — this is why the restart is happening. Its own `PROGRESS.md` has the exact
  resume commands: `docker compose up -d db` → `npx prisma migrate deploy` → seed script → `npm run
  dev` (seeded logins: admin/manager/staff@officestock.dev, password `Password123!`) → Playwright
  e2e → full `docker compose up --build`.

### theblinghaven (Client Work — "the ecommerce site")
- Live in production, freelance client project; unrelated to the restart, nothing pending here
  from this session.
- Storefront linked from the portfolio's Client Work section: https://theblinghaven-web.vercel.app
- Its own status docs (`SESSION_STATUS.md`, `PENDING_TASKS.md`) live in its own folder as always.

## What's not done yet (overall)

1. None of the four personal projects are linked into the portfolio with live demo/repo links yet
   (by design — "written case studies now, live links later"). Once each is pushed/deployed, add
   `links: { repo, demo }` to its entry in `src/data/resume.ts` and flip `status` to `"Live"`.
2. The portfolio itself hasn't been pushed to GitHub or deployed to Vercel.
3. Drone needs a GitHub remote.
4. Inventory needs a GitHub push (from a machine/session with working `gh`/git credentials) and its
   first real Docker-backed run — the actual reason for this restart.
5. Consider rotating the GitHub PAT that was visible in theblinghaven's `.mcp.json` earlier in this
   effort (flagged previously, still outstanding).

## After restart

Reopen a Claude Code session in this folder (`Abhi_Portfolio`) and reference this file. No
servers, databases, or background processes were left running by any of these sessions as of this
writing.
