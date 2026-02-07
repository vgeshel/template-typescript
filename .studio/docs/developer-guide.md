# Developer Guide

## Onboarding

Welcome! This template is designed for building production-ready TypeScript applications with strict quality guardrails. The core philosophy is **reliability over convenience**: we prevent problems rather than detect them later.

**Key Principles:**
1. Tests are written before implementation (TDD)
2. Type safety cannot be bypassed (no `any`, no `as`, no `@ts-ignore`)
3. 100% test coverage is required for all code
4. Pre-commit hooks enforce what CI would check

If you're new to TDD or strict TypeScript, the guardrails will feel restrictive at first. That's intentional. They prevent the shortcuts that cause production bugs.

## Codebase Navigation

### Where to Find Things

**API Endpoints**: `app/api/trpc/[trpc]/route.ts` — tRPC HTTP handler
**API Logic**: `src/server/trpc.ts` — tRPC router and procedures
**React Components**: `src/components/` — Reusable UI components
**Pages**: `app/page.tsx`, `app/*/page.tsx` — Next.js routes
**Utilities**: `src/lib/` — Shared utilities and client libraries
**Logger**: `src/lib/logger.ts` — Pino logger instance
**Tests**: Co-located with source files (`*.test.ts` next to `*.ts`)
**Pre-commit Scripts**: `scripts/check-*.ts` — Quality check utilities
**Skills**: `.claude/skills/` — AI agent guidance for workflows
**Environment Config**: `.env.example` — Required environment variables

### Following the Data Flow

1. **Browser Request** → `app/api/trpc/[trpc]/route.ts` — HTTP request arrives
2. **tRPC Handler** → `src/server/trpc.ts` — Routes to correct procedure
3. **Procedure Handler** — Validates input (Zod), executes logic, returns response
4. **Response** → SuperJSON serialization → HTTP response
5. **Client** → `src/lib/trpc.ts` → React Query cache → Component

## Key Directories

### `app/` — Next.js App Router

File-based routing where directories define URL structure:
- `app/page.tsx` → `/`
- `app/about/page.tsx` → `/about`
- `app/api/trpc/[trpc]/route.ts` → `/api/trpc/*` (dynamic route)

Special files:
- `layout.tsx` — Wraps all pages in the route segment
- `page.tsx` — The page component for the route
- `route.ts` — API route handler (for non-React endpoints)

### `src/server/` — Backend Logic

Server-side code that runs only on the backend:
- `trpc.ts` — tRPC router, procedures, and type exports
- `db.ts` — (If added) Database client initialization

### `src/lib/` — Shared Utilities

Code used by both server and client:
- `logger.ts` — Pino logger (server-side only)
- `trpc.ts` — tRPC React Query client
- `providers.tsx` — React Query provider setup

### `src/components/` — React Components

Reusable UI components. Components are server components by default unless they include `'use client'` directive.

### `scripts/` — Build and Dev Scripts

Utility scripts for development and CI:
- `check-lint-exceptions.ts` — Blocks escape hatches in commits
- `check-coverage-thresholds.ts` — Prevents lowering coverage requirements

### `.claude/skills/` — AI Agent Skills

Procedural guidance for AI coding agents. Each skill is a markdown file describing a specific workflow (TDD, debugging, creating migrations).

## Development Workflow

### First-Time Setup

1. **Install Bun** (if not installed):
   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```

2. **Install dependencies**:
   ```bash
   bun install
   ```

3. **Configure environment**:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your database URL and other settings.

4. **Start development server**:
   ```bash
   bun dev
   ```
   Open http://localhost:3000 in your browser.

### Daily Development Loop

1. **Pull latest changes**:
   ```bash
   git pull origin main
   bun install  # if dependencies changed
   ```

2. **Create feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Write tests first** (TDD):
   ```bash
   # Open test file in watch mode
   bun test src/server/example.test.ts
   ```

4. **Write failing test** → **Watch it fail** → **Implement** → **Watch it pass** → **Refactor**

5. **Run full verification** before committing:
   ```bash
   bun typecheck && bun lint && bun test:run
   ```

6. **Commit** (pre-commit hooks run automatically):
   ```bash
   git add .
   git commit -m "Add feature X"
   ```
   If pre-commit fails, fix the issues and try again. Never use `--no-verify`.

7. **Push and create PR**:
   ```bash
   git push origin feature/your-feature-name
   ```

## How to Run

### Development Server

```bash
bun dev
```
Starts Next.js development server with hot reloading on http://localhost:3000. Logs are pretty-printed using pino-pretty.

### Production Build

```bash
bun build
```
Creates optimized production build in `.next/` directory.

### Production Server

```bash
bun start
```
Runs production server (must run `bun build` first).

## How to Test

### Watch Mode (During Development)

```bash
bun test
```
Runs vitest in watch mode. Re-runs tests when files change. Use this while developing.

### Single Run (CI Mode)

```bash
bun test:run
```
Runs all tests once and exits. Does not check coverage.

### Coverage Verification (Before Committing)

```bash
bun test:coverage
```
Runs all tests and verifies 100% coverage for all metrics. This is what pre-commit hook runs. Use this before committing.

### Run Specific Test File

```bash
bun test src/server/trpc.test.ts
```

### Run Tests Matching Pattern

```bash
bun test -t "creates an example"
```
Runs only tests with names matching the pattern.

### UI Mode

```bash
bun test:ui
```
Opens vitest UI in browser for interactive test exploration.

## How to Deploy

Deployment is environment-specific and not included in this template. Common approaches:

### Vercel (Recommended for Next.js)

1. Push code to GitHub
2. Connect repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Vercel automatically builds and deploys on push

### Docker

1. Create `Dockerfile`:
   ```dockerfile
   FROM oven/bun:1
   WORKDIR /app
   COPY package.json bun.lockb ./
   RUN bun install --frozen-lockfile
   COPY . .
   RUN bun build
   CMD ["bun", "start"]
   ```

2. Build and run:
   ```bash
   docker build -t myapp .
   docker run -p 3000:3000 --env-file .env.local myapp
   ```

### Manual Server

1. SSH into server
2. Install Bun
3. Clone repository
4. Create `.env.local` with production values
5. Run:
   ```bash
   bun install --frozen-lockfile
   bun build
   bun start
   ```

## Branching Strategy

- **`main`** — Production-ready code. Protected branch, requires PR approval.
- **`feature/*`** — Feature branches. Created from main, merged via PR.
- **`fix/*`** — Bug fix branches. Created from main, merged via PR.

**Never commit directly to main.** All changes go through PRs.

## Code Review Process

1. **Create PR** with description of changes and context
2. **Ensure checks pass** (CI runs same checks as pre-commit)
3. **Request review** from team member
4. **Address feedback** by pushing new commits
5. **Squash and merge** when approved

**What reviewers check:**
- Design and architecture decisions
- Test quality (do tests validate actual behavior?)
- Edge cases and error handling
- Performance implications
- Security concerns

**What reviewers don't need to check:**
- Type safety (enforced by TypeScript)
- Code style (enforced by Prettier/ESLint)
- Test coverage (enforced by pre-commit hook)

## Common Commands Reference

```bash
# Development
bun dev              # Start dev server
bun build            # Production build
bun start            # Run production server

# Code Quality
bun typecheck        # TypeScript type checking
bun lint             # ESLint
bun format           # Format code with Prettier
bun format:check     # Check formatting without changing files

# Testing
bun test             # Watch mode
bun test:run         # Run once
bun test:coverage    # Run with coverage (use before commit)
bun test:ui          # Interactive UI

# Pre-commit Verification (run before committing)
bun typecheck && bun lint && bun test:coverage
```

## Troubleshooting

### Pre-commit Hook Fails with Type Error

**Symptom**: `bun typecheck` fails in pre-commit hook

**Solution**: Fix the type error. Do not use `any`, `as`, or `@ts-ignore` to silence it. If you're stuck, ask for help in code review.

### Pre-commit Hook Fails with Coverage Below 100%

**Symptom**: `bun test:coverage` reports coverage below 100%

**Solution**: Write tests for untested branches. Every ternary (`a ? b : c`) needs tests for both branches. Every nullish coalescing (`a ?? b`) needs tests for defined and undefined.

### Pre-commit Hook Fails with Lint Exceptions

**Symptom**: `check-lint-exceptions.ts` detects `eslint-disable` or `@ts-ignore`

**Solution**: Remove the exception comment and fix the underlying issue. These comments bypass quality checks and are not allowed.

### "Cannot use `as` type assertion"

**Symptom**: ESLint error when using `as` cast

**Solution**: Use Zod validation or type guards instead:
```typescript
// Bad
const data = response as MyType

// Good
const schema = z.object({ ... })
const data = schema.parse(response)
```

### "Cannot use `any` type"

**Symptom**: TypeScript or ESLint error when using `any`

**Solution**: Use proper types. If the type is truly unknown, use `unknown` and narrow it with type guards.

### Tests Pass Locally but Fail in Pre-commit

**Symptom**: `bun test` passes but pre-commit fails

**Cause**: You ran `bun test:run` (no coverage) instead of `bun test:coverage` (with coverage)

**Solution**: Always use `bun test:coverage` before committing.