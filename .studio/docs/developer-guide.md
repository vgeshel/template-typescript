# Developer Guide

## Onboarding

Welcome to the TypeScript + Next.js template! This guide helps you navigate the codebase and understand development workflows.

**Prerequisites:**
- Install [Bun](https://bun.sh) runtime (v1.0+)
- Install PostgreSQL 16+ (if using database features)
- Familiarity with TypeScript, React, and Next.js

**First Steps:**

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd <project-directory>
   bun install
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env.local
   cp .env.test.example .env.test.local
   ```
   Edit `.env.local` with your database URL and configuration.

3. **Run Development Server**
   ```bash
   bun dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Read CLAUDE.md**
   This file contains critical constraints and development principles. All code must follow these rules.

5. **Explore the Codebase**
   Start with `app/page.tsx` (home page) and `src/server/trpc.ts` (API router).

## Codebase Navigation

### Entry Points

**Frontend Entry:** `app/layout.tsx` → wraps all pages with providers
**API Entry:** `app/api/trpc/[trpc]/route.ts` → handles tRPC HTTP requests
**Server Logic:** `src/server/trpc.ts` → defines API procedures

### Data Flow

```
Browser
  ↓
app/page.tsx (React component)
  ↓
src/lib/trpc.ts (tRPC client)
  ↓
HTTP POST /api/trpc
  ↓
app/api/trpc/[trpc]/route.ts (Next.js handler)
  ↓
src/server/trpc.ts (tRPC procedures)
  ↓
Database (via Kysely, if configured)
```

### Configuration Files

| File | Purpose |
|------|---------||
| `package.json` | Dependencies and scripts |
| `tsconfig.json` | TypeScript compiler options |
| `eslint.config.mjs` | Linting rules (strict mode) |
| `vitest.config.ts` | Test runner configuration |
| `next.config.ts` | Next.js build configuration |
| `.env.local` | Environment variables (gitignored) |
| `.husky/pre-commit` | Pre-commit hook commands |

## Key Directories

### `app/` — Next.js Pages and Routes

**Purpose:** File-system based routing for pages and API endpoints.

**Key Files:**
- `layout.tsx` — Root layout, wraps all pages
- `page.tsx` — Home page (route: `/`)
- `api/trpc/[trpc]/route.ts` — tRPC HTTP handler (route: `/api/trpc`)
- `globals.css` — Global styles and Tailwind imports

**Conventions:**
- Each route is a directory with a `page.tsx` file
- API routes use `route.ts` files
- Layouts cascade to child routes

### `src/components/` — React Components

**Purpose:** Reusable UI components used across pages.

**Conventions:**
- Each component has a co-located test file (e.g., `Button.test.tsx`)
- Use `'use client'` directive for interactive components
- Server components don't need the directive

**Example:**
```typescript
// src/components/Button.tsx
export function Button({ children, onClick }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>
}
```

### `src/lib/` — Client-Side Utilities

**Purpose:** Shared utilities used in browser and server contexts.

**Key Files:**
- `trpc.ts` — tRPC client setup with type inference
- `providers.tsx` — React Query provider wrapper
- `logger.ts` — Pino logger instance

**Usage:**
```typescript
import { trpc } from '@/lib/trpc'
import { logger } from '@/lib/logger'

const { data } = trpc.health.useQuery()
logger.info({ data }, 'Health check result')
```

### `src/server/` — Server-Only Code

**Purpose:** Code that only runs on the server. Never bundled for the browser.

**Key Files:**
- `trpc.ts` — tRPC router and procedure definitions
- `db.ts` — Database client (not included by default)

**Important:** Never import from `src/server/` in client components. Next.js will error if you try.

**Example Procedure:**
```typescript
export const appRouter = t.router({
  user: publicProcedure
    .input(z.object({ id: z.number() }))
    .output(z.object({ name: z.string() }))
    .query(async ({ input }) => {
      // Query database, return result
      return { name: 'Example User' }
    }),
})
```

### `scripts/` — Build and Validation Scripts

**Purpose:** Scripts for pre-commit hooks, builds, and tooling.

**Key Files:**
- `check-lint-exceptions.ts` — Detects eslint-disable and @ts-ignore comments
- `check-coverage-thresholds.ts` — Validates coverage remains at 100%

**Usage:** These run automatically in pre-commit hooks. You rarely invoke them manually.

### `.claude/` — AI Agent Configuration

**Purpose:** Configuration and workflows for Claude Code and other AI agents.

**Structure:**
- `settings.json` — Hook and permission configuration
- `skills/` — Procedural workflows for specific tasks

**Key Skill:** `/tdd` — Test-driven development workflow (use for all code changes)

## Development Workflow

### Making Changes (TDD)

**REQUIRED:** All code changes must follow Test-Driven Development.

1. **Write a Failing Test**
   ```typescript
   // src/server/trpc.test.ts
   it('returns user by id', async () => {
     const result = await caller.user.get({ id: 1 })
     expect(result.name).toBe('Alice')
   })
   ```

2. **Run the Test (watch it fail)**
   ```bash
   bun test
   ```

3. **Implement the Code**
   ```typescript
   // src/server/trpc.ts
   export const appRouter = t.router({
     user: {
       get: publicProcedure
         .input(z.object({ id: z.number() }))
         .query(async ({ input }) => {
           return { name: 'Alice' }
         }),
     },
   })
   ```

4. **Run the Test (watch it pass)**
   ```bash
   bun test
   ```

5. **Refactor if Needed**
   Tests protect you during refactoring.

### Running Quality Checks

Before committing, ensure all checks pass:

```bash
bun typecheck  # TypeScript compilation
bun lint       # ESLint
bun test:run   # All tests with coverage
```

**These run automatically in pre-commit hooks.** If they fail, your commit is blocked until you fix the issues.

### Adding a New tRPC Procedure

1. **Write a Test**
   ```typescript
   // src/server/trpc.test.ts
   it('lists all posts', async () => {
     const result = await caller.posts.list()
     expect(result).toHaveLength(2)
   })
   ```

2. **Define the Procedure**
   ```typescript
   // src/server/trpc.ts
   export const appRouter = t.router({
     posts: {
       list: publicProcedure
         .output(z.array(z.object({ title: z.string() })))
         .query(async () => {
           return [{ title: 'Post 1' }, { title: 'Post 2' }]
         }),
     },
   })
   ```

3. **Use in Component**
   ```typescript
   // app/posts/page.tsx
   'use client'
   import { trpc } from '@/lib/trpc'

   export default function PostsPage() {
     const { data } = trpc.posts.list.useQuery()
     return <div>{data?.map(p => <div key={p.title}>{p.title}</div>)}</div>
   }
   ```

### Adding a New Component

1. **Write a Test**
   ```typescript
   // src/components/Card.test.tsx
   it('renders title and children', () => {
     render(<Card title="Test">Content</Card>)
     expect(screen.getByText('Test')).toBeInTheDocument()
     expect(screen.getByText('Content')).toBeInTheDocument()
   })
   ```

2. **Implement the Component**
   ```typescript
   // src/components/Card.tsx
   export function Card({ title, children }: CardProps) {
     return (
       <div>
         <h2>{title}</h2>
         <div>{children}</div>
       </div>
     )
   }
   ```

3. **Use the Component**
   ```typescript
   import { Card } from '@/components/Card'

   export default function Page() {
     return <Card title="Hello">World</Card>
   }
   ```

## How to Run

### Development Server

```bash
bun dev
```

Starts Next.js development server on [http://localhost:3000](http://localhost:3000) with hot reload.

### Production Build

```bash
bun build
```

Creates optimized production build in `.next/` directory.

### Start Production Server

```bash
bun start
```

Serves the production build. Requires `bun build` first.

## How to Test

### Watch Mode (Development)

```bash
bun test
```

Runs tests in watch mode. Tests re-run when files change.

### Single Run (Pre-Commit)

```bash
bun test:run
```

Runs all tests once with coverage report. Used by pre-commit hooks.

### Coverage Report

```bash
bun test:coverage
```

Generates coverage report in `coverage/` directory. Open `coverage/index.html` in browser for detailed view.

### Test-Specific Changes

```bash
bun test:changed
```

Runs tests only for changed files (requires git).

## How to Deploy

### Vercel (Recommended)

1. Connect repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

**Environment Variables to Set:**
- `DATABASE_URL` — PostgreSQL connection string
- `LOG_LEVEL` — Log verbosity (default: info)

### Docker

Create a `Dockerfile`:

```dockerfile
FROM oven/bun:1 as builder
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

FROM oven/bun:1
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
CMD ["bun", "start"]
```

Build and run:
```bash
docker build -t myapp .
docker run -p 3000:3000 -e DATABASE_URL="..." myapp
```

### Traditional Server

1. Build the application: `bun build`
2. Copy `.next/`, `public/`, `node_modules/`, and `package.json` to server
3. Run `bun start` with environment variables

## Branching Strategy

**Main Branch:** Protected, requires pull request reviews

**Feature Branches:** Use descriptive names:
- `feat/add-user-authentication`
- `fix/login-redirect-bug`
- `refactor/simplify-trpc-client`

**Workflow:**

1. Create feature branch from main
   ```bash
   git checkout -b feat/my-feature
   ```

2. Make changes following TDD
   ```bash
   # Write tests, implement, commit
   git add .
   git commit -m "Add feature description"
   ```

3. Push and create pull request
   ```bash
   git push -u origin feat/my-feature
   ```

4. Request review from team member

5. Merge after approval
   ```bash
   git checkout main
   git merge feat/my-feature
   git push
   ```

## Code Review Process

**Before Requesting Review:**
- All tests pass locally
- Coverage remains at 100%
- TypeScript compiles with zero errors
- ESLint produces zero warnings
- Pre-commit hooks pass

**Reviewers Check For:**
- Business logic correctness
- Test quality (do tests prove requirements?)
- Architectural fit (does it follow project patterns?)
- Security considerations (input validation, SQL injection)
- Performance implications (N+1 queries, unnecessary re-renders)

**Reviewers Do NOT Check For:**
- Code formatting (automated by Prettier)
- Linting issues (blocked by pre-commit hooks)
- Type errors (blocked by pre-commit hooks)
- Test coverage (enforced by pre-commit hooks)

## Common Tasks

### Adding a Database Migration

1. Create migration file
   ```bash
   bun db:migrate:create add_users_table
   ```

2. Write SQL in `migrations/YYYYMMDDHHMMSS_add_users_table.ts`

3. Run migration
   ```bash
   bun db:migrate
   ```

4. Regenerate TypeScript types
   ```bash
   bun db:codegen
   ```

**Note:** This template doesn't include database setup by default. You'll need to add Kysely and database drivers for your project.

### Debugging with Logs

Use Pino logger instead of console.log:

```typescript
import { logger } from '@/lib/logger'

// With structured data
logger.info({ userId: 123, action: 'login' }, 'User logged in')

// Error logging
logger.error({ err, userId: 123 }, 'Login failed')
```

View pretty logs in development:
```bash
bun dev | bunx pino-pretty
```

### Fixing Pre-Commit Hook Failures

If pre-commit fails:

1. **TypeScript errors:** Fix type errors, run `bun typecheck`
2. **Lint errors:** Fix violations, run `bun lint`
3. **Test failures:** Fix tests, run `bun test:run`
4. **Coverage below 100%:** Add tests for uncovered code
5. **Lint exceptions detected:** Remove `eslint-disable` or `@ts-ignore` comments

**Never use `git commit --no-verify`** — fix the underlying issue instead.

## Getting Help

**Documentation:**
- [Next.js Docs](https://nextjs.org/docs)
- [tRPC Docs](https://trpc.io/docs)
- [Zod Docs](https://zod.dev)
- [Vitest Docs](https://vitest.dev)

**Common Issues:**
- Check CLAUDE.md for project-specific constraints
- Search closed GitHub issues for similar problems
- Ask in team chat or create a GitHub discussion

**AI Agent Assistance:**
- Use Claude Code with `/tdd` skill for guided development
- Reference CLAUDE.md for AI-specific guidance