# Developer Guide

## Onboarding

Welcome to the TypeScript + Next.js template project. This guide provides a map to navigate the codebase and understand the development workflow.

**First Steps:**
1. Read CLAUDE.md for inviolable constraints (no `any`, no `as`, TDD required)
2. Review pre-commit hooks in `.husky/pre-commit` to understand quality gates
3. Explore existing tests to understand patterns before writing code

**Key Concepts:**
- **Type safety is non-negotiable** — ESLint blocks `any` types and `as` casts
- **Tests come first** — Write failing test, implement code, refactor
- **Structured logging only** — Use `logger.info()`, never `console.log`
- **Database changes via migrations** — Never edit `db-types.ts` directly

## Codebase Navigation

**Entry Points:**
- `app/layout.tsx` — Root layout wrapping application with providers
- `app/page.tsx` — Home page component
- `app/api/trpc/[trpc]/route.ts` — tRPC HTTP handler for API requests

**API Layer:**
- `src/server/trpc.ts` — tRPC router with procedure definitions (add new endpoints here)
- `src/lib/trpc.ts` — Client-side tRPC configuration

**Database:**
- `src/server/db.ts` — Kysely database client (not yet implemented in current version)
- `src/server/db-types.ts` — Auto-generated types (regenerate with `bun db:codegen`)
- `migrations/` — Kysely schema migrations

**Frontend:**
- `src/components/` — Reusable React components
- `src/lib/providers.tsx` — React Query and tRPC provider wrapper

**Testing:**
- `*.test.ts` and `*.test.tsx` files — Co-located with implementation files
- `vitest.config.ts` — Test configuration with 100% coverage thresholds

## Key Directories

**`app/`** — Next.js App Router pages and layouts. Add new routes by creating directories with `page.tsx` files.

**`src/server/`** — Backend-only code never sent to browser. Contains tRPC router and database logic.

**`src/lib/`** — Shared utilities usable in both client and server code.

**`src/components/`** — React components. Use `'use client'` directive only when necessary (interactivity, hooks).

**`scripts/`** — Development and build scripts. `check-lint-exceptions.ts` blocks ESLint/TypeScript exceptions in pre-commit.

**`migrations/`** — Database schema migrations. Create with `bun db:migrate:create <name>`.

## Development Workflow

**Starting Development:**
```bash
bun install                 # Install dependencies
cp .env.example .env.local  # Configure environment
bun dev                     # Start dev server on :3000
bun test                    # Start test watcher in separate terminal
```

**Adding a Feature (TDD Workflow):**
1. Write failing test describing expected behavior
2. Run `bun test` and verify test fails
3. Implement minimal code to make test pass
4. Run `bun typecheck && bun lint` to verify quality
5. Refactor if needed (tests protect you)
6. Commit (pre-commit hook runs all checks)

**Adding a tRPC Endpoint:**
1. Add procedure to `appRouter` in `src/server/trpc.ts`
2. Define Zod schemas for input/output validation
3. Write test in `src/server/trpc.test.ts`
4. Implement procedure logic
5. Types automatically flow to client via `trpc.useQuery()` or `trpc.useMutation()`

**Adding a Database Migration:**
```bash
bun db:migrate:create add_users_table
# Edit new file in migrations/
bun db:migrate              # Run migration
bun db:codegen              # Regenerate TypeScript types
```

## How to Run

**Development Server:**
```bash
bun dev
```
Starts Next.js dev server on http://localhost:3000 with hot reload and pino-pretty logging.

**Production Build:**
```bash
bun build    # Creates optimized production build
bun start    # Serves production build
```

## How to Test

**Watch Mode (Development):**
```bash
bun test
```
Runs tests on file changes. Ideal for TDD workflow.

**Single Run (CI/Pre-commit):**
```bash
bun test:run
```
Runs all tests once with coverage reporting.

**With UI:**
```bash
bun test:ui
```
Opens Vitest UI in browser for interactive test debugging.

**Coverage Report:**
```bash
bun test:coverage
```
Generates coverage report in `coverage/` directory. Thresholds are 100% for all metrics.

## How to Deploy

**Prerequisites:**
- PostgreSQL database accessible from deployment environment
- Environment variables set (`DATABASE_URL`, `LOG_LEVEL`)

**Build Steps:**
```bash
bun install --production=false  # Install all dependencies including dev
bun db:migrate                  # Run pending migrations
bun build                       # Create production build
```

**Running Production:**
```bash
bun start
```
Serves production build on port 3000. Use reverse proxy (nginx, Caddy) for HTTPS.

**Deployment Platforms:**
- **Vercel** — Add `DATABASE_URL` to environment variables, push to Git
- **Docker** — Create Dockerfile using `oven/bun` base image
- **VPS** — Use systemd service running `bun start` with environment file

## Branching Strategy

**Main Branch Protection:**
- Never commit directly to `main`
- All changes via feature branches and pull requests
- Pre-commit hooks enforce quality on all branches

**Branch Naming:**
- `feature/add-user-auth` — New features
- `fix/trpc-timeout` — Bug fixes
- `refactor/simplify-logger` — Code improvements

## Review Process

**Before Requesting Review:**
```bash
bun typecheck && bun lint && bun test:run
```
All must pass. Pre-commit hook enforces this locally.

**Pull Request Requirements:**
- All tests passing
- 100% test coverage maintained
- No ESLint exceptions or type assertions
- Meaningful commit messages describing "why" not "what"

**Reviewer Checklist:**
- Tests verify actual behavior, not just types
- No `any` types or `as` casts snuck through
- Database queries use transactions where appropriate
- Error handling includes logging with context
