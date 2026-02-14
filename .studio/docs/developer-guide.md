# Developer Guide

## Onboarding

This template provides a production-ready Next.js application with end-to-end type safety. After cloning, you'll have working tests, strict linting, and pre-commit hooks enforcing quality standards. Start by reading `README.md` for setup instructions, then explore the codebase following the directory guide below.

## Codebase Navigation

The codebase follows Next.js App Router conventions with some additions for type safety:

- **Start at `app/page.tsx`** — The home page, simplest entry point
- **Then `app/layout.tsx`** — Application shell with providers
- **Follow to `src/components/Providers.tsx`** — Client boundary wrapping tRPC
- **Trace to `src/lib/trpc.ts`** — Client-side tRPC setup
- **End at `src/server/trpc.ts`** — Server-side API definitions

Type flow: `appRouter` type exports from server → imports in client → type-safe procedure calls in components.

## Key Directories

**`app/`** — Next.js pages and API routes. File-based routing: `app/page.tsx` → `/`, `app/about/page.tsx` → `/about`. API routes in `app/api/trpc/[trpc]/route.ts` handle tRPC HTTP requests.

**`src/server/`** — tRPC procedures and server logic. Add new procedures to `appRouter` in `trpc.ts`. Each procedure must have Zod input/output schemas.

**`src/lib/`** — Utilities shared across application. Logger instance, tRPC client, React providers. Import from here using `@/lib/...` alias.

**`src/components/`** — React components. Create new components here with `.test.tsx` files alongside. Mark client components with `'use client'` directive.

**`scripts/`** — Development automation. Pre-commit checks, coverage validation. Add custom scripts here.

**`.studio/docs/`** — Living documentation (this file). Keep synchronized with code changes.

## Development Workflow

**Branch strategy:** This template does not prescribe a branching model. Use feature branches, trunk-based development, or gitflow based on team preference.

**Review process:** Configure in GitHub/GitLab. Pre-commit hooks provide automated quality checks; human review focuses on design and business logic.

**Adding a feature:**
1. Create new tRPC procedure in `src/server/trpc.ts` with Zod schemas
2. Add tests in `src/server/trpc.test.ts` verifying behavior
3. Import procedure in component using `trpc.procedureName.useQuery()` or `useMutation()`
4. Add component tests in `[component].test.tsx`
5. Run `bun test:run` to verify 100% coverage maintained

**Type assertions forbidden:** Use Zod `.parse()` or `.safeParse()` instead of `as` casts. ESLint will block commits containing type assertions.

**No console.log:** Import logger from `@/lib/logger` and use `logger.info()`, `logger.error()`, etc. ESLint enforces this.

## How to Run

**Development server:** No `dev` script exists in this template. The README references `bun dev` but this command is not configured in `package.json`. To start development, add a `dev` script or use `bun --bun next dev` directly.

**Production build:** `bun build` — Runs Next.js production build with Bun runtime.

**Production server:** `bun start` — Starts Next.js production server after building.

**Type checking:** `bun typecheck` — Runs TypeScript compiler without emitting files. Must pass before commits.

**Linting:** `bun lint` — Runs ESLint with type-aware rules. Must pass before commits.

**Formatting:** `bun format` — Formats all files with Prettier. `bun format:check` verifies without modifying.

## How to Test

**Watch mode:** `bun test` — Runs Vitest in watch mode. Re-runs tests when files change.

**Single run:** `bun test:run` — Runs all tests once. Use in CI/CD pipelines.

**Coverage report:** `bun test:coverage` — Generates HTML and LCOV coverage reports in `./coverage`. Must achieve 100% coverage.

**UI mode:** `bun test:ui` — Launches Vitest UI in browser for interactive test debugging.

**Changed files only:** `bun test:changed` — Runs tests for files changed since last commit. Useful for large codebases.

**Test organization:** Place `.test.ts` or `.test.tsx` files alongside implementation. Vitest discovers all `**/*.test.{ts,tsx}` files automatically.

**Coverage requirements:** 100% statement, branch, function, and line coverage enforced by `vitest.config.ts`. Tests fail if any threshold not met.

## How to Deploy

This template includes no deployment configuration. Standard Next.js deployment options apply:

- **Vercel:** `vercel deploy` (recommended for Next.js)
- **Docker:** Create Dockerfile with Bun base image and `bun start`
- **Traditional VPS:** Install Bun, run `bun build && bun start`

Configure `DATABASE_URL` environment variable in deployment environment. Set `LOG_LEVEL` to `info` or `warn` for production.
