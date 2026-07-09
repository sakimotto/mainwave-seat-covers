# Mainwave Seat Covers

A full-production e-commerce website for Mainwave Seat Covers, rebuilt from bullantseatcovers.com.au with a modern Next.js stack, live PostgreSQL database, and AI assistant.

## Tech Stack

- **Framework:** Next.js 16 (App Router, React 19, TypeScript strict)
- **Database:** PostgreSQL + pgvector (via Docker Compose)
- **ORM:** Prisma 7 (with `@prisma/adapter-pg`)
- **Cache:** Redis (via Docker Compose)
- **UI:** shadcn/ui, Tailwind CSS v4, Lucide React
- **AI:** Vercel AI SDK v7 (DeepSeek/Kimi/GLM via OpenAI-compatible API)
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 24+
- Docker Desktop (for PostgreSQL + Redis)

### Setup

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Start database and cache
docker compose up -d db redis

# Run migrations
npx prisma migrate deploy

# Seed the database
npx prisma db seed

# Start dev server
npm run dev
```

### Environment Variables

Copy `.env` and fill in:

```
DATABASE_URL="postgresql://mainwave:mainwave_secret@localhost:5432/mainwave"
LLM_BASE_URL="https://api.deepseek.com"
LLM_API_KEY="sk-your-key-here"
LLM_MODEL="deepseek-chat"
```

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint check |
| `npm run typecheck` | TypeScript check |
| `npm run check` | lint + typecheck + build |

## Project Structure

```
src/
  app/              # Next.js routes (App Router)
  components/       # React components
    ui/             # shadcn/ui primitives
  lib/
    db.ts           # Data access layer (React.cache)
    prisma.ts       # Prisma client
    ai/
      system-prompt.ts  # AI assistant system prompt
      tools.ts          # AI tool definitions
  types/            # TypeScript interfaces
prisma/
  schema.prisma     # Database schema
  seed.ts           # Database seed
```

## Brand

- black: `#1a1a1a`
- red: `#cc0000`
- dark: `#222222`
- grey: `#f5f5f5`
- text: `#333333`
- gold: `#ffd700`
- border: `#e5e5e5`
