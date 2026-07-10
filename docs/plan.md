# Mainwave Seat Covers — Plan

## Current State (11 Jul 2026)

### Working
- 36 routes (build successfully)
- PostgreSQL + Redis via Docker, both healthy
- Prisma 14 models, 3 migrations applied
- Seed: 13 vehicles + models, 20 seat covers, 13 merchandise products, 11 blog posts
- Vehicle selector (make→model) on homepage
- Admin `/admin/vehicles` for make/model management
- Shop with category filter + search params
- Product detail with dynamic color swatches + size pickers + Add to Cart / Buy Now
- AI chat API (POST /api/chat) works with DeepSeek
- Cart with session-based guest carts (server actions)
- Dynamic cart page with quantity controls, totals, remove
- Checkout page with contact form, shipping address, order summary
- Header "Merchandise" dropdown with sub-links
- "Shop By Make" header dropdown
- Merchandise images now serve 200 (placeholder JPEGs generated)
- `.env` has LLM_BASE_URL, LLM_API_KEY, LLM_MODEL for DeepSeek
- Prisma supports both `adapter-pg` (local) and `adapter-neon` (Cloud Run) via `DATABASE_DRIVER` env var
- `next.config.ts` has `turbopack.root` set
- `cloudbuild.yaml` created for Cloud Run deployment

### Known Issues
- No authentication (customers, cart, orders)
- Checkout submits but doesn't actually create an Order record (placeholder)
- No payment integration
- `<img>` tags should be migrated to Next.js `<Image>` for optimization
- Prisma client needs `prisma generate` step in Docker build

---

## Tasks Remaining (Former Priority 4: Polish)
- [ ] Loading/skeleton states for product pages
- [ ] Error boundaries on dynamic routes
- [ ] SEO meta tags for all pages
- [ ] Migrate `<img>` to `<Image>` where possible

---

## Deployment Target
- **Cloud Run** (serverless container)
- Domain: mainwaveseatcovers.com.au (or similar)
- Database: Neon (serverless PostgreSQL)
- Redis: Upstash (serverless Redis)
