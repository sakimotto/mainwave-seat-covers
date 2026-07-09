<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Website Reverse-Engineer Template

## What This Is
A reusable template for reverse-engineering any website into a clean, modern Next.js codebase using AI coding agents. The Next.js + shadcn/ui + Tailwind v4 base is pre-scaffolded — just run `/clone-website <url1> [<url2> ...]`.

## Tech Stack
- **Framework:** Next.js 16 (App Router, React 19, TypeScript strict)
- **UI:** shadcn/ui (Radix primitives, Tailwind CSS v4, `cn()` utility)
- **Icons:** Lucide React (default — will be replaced/supplemented by extracted SVGs)
- **Styling:** Tailwind CSS v4 with oklch design tokens
- **Deployment:** Vercel

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run lint` — ESLint check
- `npm run typecheck` — TypeScript check
- `npm run check` — Run lint + typecheck + build

## Code Style
- TypeScript strict mode, no `any`
- Named exports, PascalCase components, camelCase utils
- Tailwind utility classes, no inline styles
- 2-space indentation
- Responsive: mobile-first

## Design Principles
- **Pixel-perfect emulation** — match the target's spacing, colors, typography exactly
- **No personal aesthetic changes during emulation phase** — match 1:1 first, customize later
- **Real content** — use actual text and assets from the target site, not placeholders
- **Beauty-first** — every pixel matters

## Project Structure
```
src/
  app/              # Next.js routes
  components/       # React components
    ui/             # shadcn/ui primitives
    icons.tsx       # Extracted SVG icons as React components
  lib/
    utils.ts        # cn() utility (shadcn)
  types/            # TypeScript interfaces
  hooks/            # Custom React hooks
public/
  images/           # Downloaded images from target site
  videos/           # Downloaded videos from target site
  seo/              # Favicons, OG images, webmanifest
docs/
  research/         # Inspection output (design tokens, components, layout)
  design-references/ # Screenshots and visual references
scripts/            # Asset download scripts
```

## MOST IMPORTANT NOTES
- When launching Claude Code agent teams, ALWAYS have each teammate work in their own worktree branch and merge everyone's work at the end, resolving any merge conflicts smartly since you are basically serving the orchestrator role and have full context to our goals, work given, work achieved, and desired outcomes.
- After editing `AGENTS.md`, run `bash scripts/sync-agent-rules.sh` to regenerate platform-specific instruction files.
- After editing `.claude/skills/clone-website/SKILL.md`, run `node scripts/sync-skills.mjs` to regenerate the skill for all platforms.

@docs/research/INSPECTION_GUIDE.md

---

## Session Summary (10 Jul 2026)

### Current State
- **Project:** Mainwave Seat Covers (clone of bullantseatcovers.com.au)
- **Stack:** Next.js 16.2.1, React 19.2.4, Prisma 7 (adapter-pg), Tailwind v4, AI SDK 7
- **Database:** PostgreSQL + pgvector, Redis — both via Docker, healthy
- **Seed:** 13 vehicles, 20 seat cover products, 13 merchandise products, 11 blog posts
- **Routes:** 35 all serving 200 OK
- **AI Chat API:** POST /api/chat returns 200 (needs LLM_API_KEY in .env to call DeepSeek)

### What We Built Today
- Fixed footer.tsx JSX parse error (stale Turbopack cache)
- All pages verified working: /, /shop, /product/**, /vehicle/**, /blog, /admin/vehicles, /about-us, etc
- Chat API confirmed working with valid request body
- Created docs/plan.md with tomorrow's task breakdown
- Known issues: merchandise images 404, missing LLM_API_KEY, no cart/checkout yet

### Key Technical Notes
- `useChat` v7 API: no input/handleInputChange, use `sendMessage({ text })`, `parts` for rendering
- `createOpenAI` from @ai-sdk/openai with custom baseURL for DeepSeek/Kimi/GLM
- Zod 4.4.3 — `.describe()` exists but `_def` lacks `description`
- Prisma client at `src/generated/prisma/client` — all imports use `/client` suffix
- Prisma v7 adapter pattern: `new PrismaClient({ adapter })` with `@prisma/adapter-pg`
