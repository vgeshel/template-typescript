# Developer Guide

## Onboarding

Welcome! This template provides a TypeScript + Next.js foundation with end-to-end type safety through tRPC. Everything is configured for quality: strict TypeScript, comprehensive ESLint rules, 100% test coverage requirements, and pre-commit hooks that block problematic code.

Start by reading the [Vision](vision.md) to understand core principles, then review the [Glossary](glossary.md) for terminology. The [Architecture](architecture.md) document explains key technology choices and patterns.

## Codebase Navigation

**Finding tRPC procedures:** Start in `src/server/trpc.ts` where the `appRouter` is defined. Each procedure is a typed endpoint. Client code in `src/lib/trpc.ts` automatically has access to these procedures with full type safety.

**Understanding data flow:** User interactions trigger React components (`src/components/`) which call tRPC procedures via `trpc.procedureName.useQuery()` or `.useMutation()`. The tRPC client (`src/lib/trpc.ts`) sends HTTP requests to `/api/trpc`, handled by `app/api/trpc/[trpc]/route.ts`, which routes to the server implementation.

**Tracing a request:** HTTP request → `app/api/trpc/[trpc]/route.ts` → `fetchRequestHandler` → `appRouter` procedure → response serialized with SuperJSON → tRPC client → React Query cache → component re-render.

**Finding tests:** Tests live alongside their implementation files with `.test.ts` or `.test.tsx` extensions. Coverage includes `src/` and `app/` but excludes test utilities in `src/test/`.

## Key Directories

- **`app/`** — Next.js routes and layouts following App Router conventions
- **`app/api/trpc/[trpc]/`** — tRPC HTTP handler, the only API endpoint
- **`src/server/`** — Server-side code including tRPC router
- **`src/lib/`** — Shared utilities (logger, tRPC client, providers)
- **`src/components/`** — React components
- **`.claude/`** — AI agent configuration (skip when exploring project code)
- **`.studio/`** — Living documentation system (you are here)

## Development Workflow

**Starting development:**
1. Install dependencies: `bun install`
2. Copy environment files: `cp .env.example .env.local` and `cp .env.test.example .env.test.local`
3. Configure database URLs in `.env.local` and `.env.test.local`
4. Create databases: `createdb myapp && createdb myapp_test`
5. Run migrations: `bun db:migrate && bun db:codegen`

**Daily workflow:**
1. Create feature branch from main
2. Write tests first (TDD approach)
3. Implement feature until tests pass
4. Run full quality checks: `bun typecheck && bun lint && bun test:run`
5. Commit (pre-commit hooks run automatically)
6. Push and create pull request

## How to Run

**Development server:** Not configured by default — no `dev` script exists in package.json. Add your own based on project needs (typically `next dev`).

**Production build:** `bun build` — Creates optimized production bundle

**Production server:** `bun start` — Runs production build (requires `bun build` first)

**Type checking:** `bun typecheck` — Runs TypeScript compiler without emitting files

**Linting:** `bun lint` — Runs ESLint with all configured rules

**Formatting:** `bun format` — Applies Prettier to all files

**Format check:** `bun format:check` — Verifies formatting without modifying files

## How to Test

**Watch mode:** `bun test` — Runs tests in watch mode, re-running on file changes

**UI mode:** `bun test:ui` — Opens Vitest UI for interactive test exploration

**Single run:** `bun test:run` — Runs all tests once and exits

**Coverage:** `bun test:coverage` — Generates coverage report with 100% threshold enforcement

**Changed files only:** `bun test:changed` — Runs tests only for files changed since last commit

All test commands use `--no-file-parallelism` to prevent database connection conflicts. Tests run sequentially for reliability.

## How to Deploy

Deployment is not configured in this template. Choose based on your infrastructure:

- **Vercel:** Native Next.js support, zero configuration
- **Docker:** Create Dockerfile with Bun base image, copy source, run `bun build`
- **Traditional server:** Run `bun build` locally, upload `.next` directory, run `bun start`

Configure environment variables on your deployment platform. Ensure `DATABASE_URL` points to production database and `LOG_LEVEL` is set appropriately.

## Pre-commit Quality Checks

Every commit automatically runs:
1. **Type checking** (`bun typecheck`) — Ensures TypeScript compiles without errors
2. **Lint exception checker** (`scripts/check-lint-exceptions.ts`) — Blocks `eslint-disable` comments
3. **ESLint** (`bun lint`) — Enforces code quality rules
4. **Prettier** (via lint-staged) — Formats staged files

If any check fails, the commit is blocked. Fix the reported issues and try again. Do not use `--no-verify` to bypass hooks.

## Branching Strategy

Not enforced by template. Recommended approach:
- **main** — Production-ready code, protected branch
- **feature/***  — New features, created from main
- **fix/*** — Bug fixes, created from main
- **refactor/*** — Code improvements without behavior changes

Always create pull requests rather than committing directly to main. Ensure all quality checks pass before requesting review.
