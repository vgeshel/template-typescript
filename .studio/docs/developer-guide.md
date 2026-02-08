# Developer Guide

## Onboarding

This template enforces strict type safety and test coverage. Before making changes:

1. Read `CLAUDE.md` for inviolable constraints
2. Verify Bun is installed (`bun --version`)
3. Understand that `any` types and `as` casts are blocked by ESLint
4. All code changes require tests before implementation (TDD)

## Codebase Navigation

**Entry Point:** `app/layout.tsx` renders root HTML structure, loads fonts, wraps children with `Providers`

**API Layer:** `app/api/trpc/[trpc]/route.ts` exposes tRPC router at `/api/trpc` endpoint

**Server Logic:** `src/server/trpc.ts` defines procedures using `publicProcedure` builder and exports `appRouter`

**Client Hooks:** `src/lib/trpc.ts` creates type-safe React hooks from `AppRouter` type

**React Setup:** `src/components/Providers.tsx` wraps app with React Query provider for tRPC

**Home Page:** `app/page.tsx` displays "Hello, World!" with Tailwind styling

## Key Directories

| Directory | Purpose |
|-----------|---------|
| `app/` | Next.js App Router - routing, layouts, pages |
| `src/server/` | Backend tRPC procedures and business logic |
| `src/lib/` | Client-side utilities (tRPC client, logger, providers) |
| `src/components/` | Reusable React components |
| `src/test/` | Test utilities and helpers (excluded from coverage) |
| `scripts/` | Build scripts and validation tools |

## Development Workflow

**TDD Cycle:**
1. Write failing test describing desired behavior
2. Run `bun test` to verify test fails
3. Implement minimal code to pass test
4. Run `bun test:run` to verify all tests pass
5. Refactor with tests as safety net

**Pre-Commit Checklist:**
```bash
bun typecheck  # Must pass with zero errors
bun lint       # Must pass with zero warnings
bun test:run   # All tests must pass
```

**Branching Strategy:** Create feature branches, never commit directly to main. Give user chance to review changes before committing.

## How to Run

**Development Server:**
```bash
bun dev
```
Opens Next.js dev server at `http://localhost:3000` with hot reload.

**Production Build:**
```bash
bun build
bun start
```

**Type Checking:**
```bash
bun typecheck
```
Runs TypeScript compiler in no-emit mode.

**Linting:**
```bash
bun lint        # Check for issues
bun format      # Auto-fix formatting
bun format:check  # CI mode
```

## How to Test

**Watch Mode (Development):**
```bash
bun test
```
Runs Vitest in watch mode, re-running tests on file changes.

**CI Mode (Pre-Commit):**
```bash
bun test:run
```
Single pass with exit code, suitable for scripts.

**Coverage Report:**
```bash
bun test:coverage
```
Generates HTML coverage report in `coverage/` directory. Must achieve 100% coverage across all metrics.

**Interactive UI:**
```bash
bun test:ui
```
Opens Vitest UI in browser for debugging tests.

**Test Changed Files:**
```bash
bun test:changed
```
Runs tests only for files modified since last commit.

## How to Deploy

This template does not include deployment configuration. Recommended approaches:

**Vercel:**
1. Connect GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main

**Docker:**
1. Create `Dockerfile` with Bun base image
2. Copy source and run `bun build`
3. Use `bun start` as entrypoint

**Self-Hosted:**
1. Install Bun on server
2. Clone repository and run `bun install`
3. Run `bun build && bun start`
4. Use process manager (PM2, systemd) for uptime

## Review Process

1. **Create Feature Branch:** `git checkout -b feature/my-feature`
2. **Implement with TDD:** Write tests, implement code, verify coverage
3. **Run Pre-Commit Checks:** Ensure `bun typecheck && bun lint && bun test:run` passes
4. **Push and Create PR:** Push branch and open pull request
5. **Code Review:** Reviewer checks tests exist for all changes
6. **Merge:** Squash and merge after approval

Pre-commit hooks automatically run type checking, lint exception blocking, ESLint, and formatting via Husky and lint-staged.
