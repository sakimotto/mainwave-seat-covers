# Mainwave Seat Covers — Plan

## Current State (10 Jul 2026)

### Working
- 35 routes, all serving 200
- PostgreSQL + Redis via Docker, both healthy
- Prisma 14 models, 2 migrations applied
- Seed: 13 vehicles + models, 20 seat covers, 13 merchandise products, 11 blog posts
- Vehicle selector (make→model) on homepage
- Admin `/admin/vehicles` for make/model management
- Shop with category filter (All / Front Set / Rear Set / Full Set / Apparel / Car Accessories / Lifestyle)
- Product detail with dynamic color swatches + size pickers
- AI chat API (POST /api/chat) returns 200 with valid body
- Header "Merchandise" dropdown with Apparel / Car Accessories / Lifestyle sub-links
- "Shop By Make" header dropdown

### Known Issues
- All merchandise images return 404 (`/images/products/merch-*.jpg`)
- `/api/chat` can't actually call DeepSeek — missing `LLM_API_KEY` in `.env`
- `/api/contact` returns 405 for GET (should be POST-only, expected)
- Turbopack root warning — `turbopack.root` not set in `next.config.ts`
- Prisma adapter-pg is not serverless-compatible — needs Neon driver for Cloud Run

---

## Tomorrow's Tasks

### Priority 1: Asset Fixes
- [ ] Generate placeholder merchandise images (JPEGs at `public/images/products/merch-*.jpg`)
- [ ] Add `LLM_BASE_URL`, `LLM_API_KEY`, `LLM_MODEL` to `.env` (user provides API key)

### Priority 2: Infrastructure
- [ ] Fix `turbopack.root` in `next.config.ts` to silence workspace root warning
- [ ] Switch Prisma driver from `@prisma/adapter-pg` to `@prisma/adapter-neon` + `@neondatabase/serverless` for Cloud Run compatibility
- [ ] Create `cloudbuild.yaml` for Cloud Run deployment
- [ ] Update `Dockerfile` for serverless (multi-stage, standalone output)

### Priority 3: Cart & Checkout
- [ ] Add cart table to Prisma schema (migration)
- [ ] Cart API routes (add/remove/update items)
- [ ] Cart page with quantity controls, totals
- [ ] Checkout form (customer details, shipping, payment placeholder)

### Priority 4: Polish
- [ ] Test chat widget end-to-end with live DeepSeek API key
- [ ] Add loading/skeleton states for product pages
- [ ] Error boundaries on dynamic routes
- [ ] SEO meta tags for all pages

---

## Deployment Target
- **Cloud Run** (serverless container)
- Domain: mainwaveseatcovers.com.au (or similar)
- Database: Neon (serverless PostgreSQL)
- Redis: Upstash (serverless Redis)
