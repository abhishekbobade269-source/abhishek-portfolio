# Abhishek Bobade — Portfolio

An animated portfolio site built with Next.js, TypeScript, Tailwind CSS, and Framer Motion,
plus an ATS-friendly one-page resume generated from the same content.

## Structure

```
src/data/resume.ts        # single source of truth for all resume/portfolio content
src/components/           # NavBar, ThemeToggle, Footer, sections/*, motion/Reveal, background/OrbitBackground
resume/src/resume.html    # ATS-friendly resume source (kept in sync with resume.ts by hand)
resume/src/resume.css     # print-tuned stylesheet for the resume
resume/Abhishek_Bobade_Resume.pdf   # generated PDF (also copied to public/resume/)
resume/original/          # the original resume PDF, kept for reference
scripts/build-resume-pdf.js         # regenerates the PDF via headless Chromium (Playwright)
```

## Local development

```bash
npm install
npm run dev       # http://localhost:3000
npm run lint
npm run build      # production build
```

## Updating content

Edit `src/data/resume.ts` for the site. If the change should also appear on the downloadable
resume, mirror it in `resume/src/resume.html`, then regenerate the PDF:

```bash
node scripts/build-resume-pdf.js
```

This writes `resume/Abhishek_Bobade_Resume.pdf` and copies it to `public/resume/`, which is what
the site's "Download Resume" button serves. Commit the regenerated PDF along with your content
change — Vercel's build does not run Playwright/Chromium, so the PDF is a checked-in artifact,
not something generated at deploy time.

## MCP servers (`.mcp.json`)

This project ships an `.mcp.json` with the servers relevant to building and eventually shipping
this site: `github`, `vercel`, `chrome-devtools`, `context7`, `serena`. It reads secrets from
environment variables (`${VAR}` syntax) rather than storing them in plaintext — copy
`.env.local.example` to `.env.local` and fill in tokens only once you actually need that server
(you don't need any of them just to run `npm run dev`).

Claude Code plugins (ralph-loop, coderabbit, frontend-design-plugin, etc.) are already installed
at the user level on this machine and need no per-project setup.

## Deploying later (not done yet, by design)

This repo is git-initialized locally but has **not** been pushed to GitHub or deployed to Vercel.
When you're ready:

```bash
# 1. Create and push a GitHub repo
gh repo create <your-username>/abhishek-portfolio --public --source=. --remote=origin --push

# 2. Deploy to Vercel (either the CLI, or ask Claude Code to use the `vercel` MCP server
#    once GITHUB_PERSONAL_ACCESS_TOKEN / VERCEL_API_TOKEN are set in .env.local)
npx vercel
```

After deploying, update `metadataBase` in `src/app/layout.tsx` to your real production URL.
