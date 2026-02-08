# Developer Guide

## Onboarding

Welcome! This template enforces strict quality standards to enable fast, confident iteration. The constraints (no `any` types, no `as` casts, 100% test coverage) may feel restrictive initially but exist to prevent production issues, not slow you down.

**First Steps**:

1. Read CLAUDE.md for inviolable constraints
2. Review .claude/rules/ for detailed coding patterns
3. Run the verification workflow once: `bun typecheck && bun lint && bun test:run`
4. Make a trivial change to understand the pre-commit hook behavior

**Key Insight**: The pre-commit hook is your safety net. It catches issues in seconds that would otherwise surface in code review (hours) or production (days).

## Codebase Navigation

**Where to Find Things**:

- **API endpoints**: `src/server/trpc.ts` (add procedures here)
- **Frontend pages**: `app/` directory (Next.js App Router)
- **Shared utilities**: `src/lib/` (logger, tRPC client, providers)
- **React components**: `src/components/`
- **Tests**: Co-located with source files (e.g., `trpc.test.ts` next to `trpc.ts`)
- **Environment config**: `.env.example` (template), `.env.local` (your secrets, gitignored)

**Import Aliases**:

- `@/` maps to `src/` (e.g., `import { logger } from '@/lib/logger'`)

**File Naming**:

- Source: `kebab-case.ts` or `PascalCase.tsx` for components
- Tests: `*.test.ts` or `*.test.tsx`

## Key Directories

**`app/`** — Next.js App Router. Files here become routes automatically. `layout.tsx` is the root layout. `page.tsx` is the home page. `api/trpc/[trpc]/route.ts` is the tRPC HTTP handler.

**`src/server/`** — Backend business logic. The `trpc.ts` file exports `appRouter` with all procedures. Add new procedures here or in separate service modules imported by the router.

**`src/lib/`** — Shared utilities used by both client and server. `trpc.ts` is the client configuration. `logger.ts` is the Pino logger instance. `providers.tsx` wraps React Query with tRPC.

**`src/components/`** — React components. Use `'use client'` directive only when needed (interactivity, browser APIs, context consumers).

**`scripts/`** — Build and validation scripts like `check-lint-exceptions.ts` (runs in pre-commit).

**`.claude/`** — AI agent configuration. `rules/` contains coding standards. `skills/` provides workflow guidance.

## Development Workflow

**Adding a New Feature**:

1. **Write the test first** (TDD is non-negotiable)
   ```bash
   # Create feature.test.ts
   # Write a failing test that specifies behavior
   bun test  # Watch it fail
   ```

2. **Implement the minimal code to pass**
   ```bash
   # Edit source files
   # Tests re-run automatically in watch mode
   ```

3. **Verify quality**
   ```bash
   bun typecheck  # Zero type errors
   bun lint       # Zero lint violations
   ```

4. **Commit**
   ```bash
   git add .
   git commit -m "Add feature X"
   # Pre-commit hook runs automatically
   ```

**Pre-commit Hook Workflow**:

The hook runs (in order):
1. `bun typecheck` — Blocks if type errors exist
2. `scripts/check-lint-exceptions.ts` — Blocks if eslint-disable comments found
3. `bun lint` — Blocks if lint violations exist
4. `lint-staged` — Formats and lints only staged files

If any step fails, the commit is blocked. Fix the issue and try again.

## How to Run

**Development Server**:
```bash
bun dev              # Starts Next.js on http://localhost:3000
```

**Production Build**:
```bash
bun build            # Creates optimized production build
bun start            # Serves production build
```

**Type Checking**:
```bash
bun typecheck        # Runs tsc --noEmit
```

**Linting**:
```bash
bun lint             # Runs ESLint with project rules
bun format           # Formats with Prettier
bun format:check     # Checks formatting without changes
```

## How to Test

**Interactive Testing**:
```bash
bun test             # Watch mode with auto-rerun
bun test:ui          # Opens Vitest UI in browser
```

**CI Testing**:
```bash
bun test:run         # Single run, exits with code
bun test:coverage    # With coverage report
bun test:changed     # Only tests affected by Git changes
```

**Coverage Thresholds**: Tests fail if any metric (statements, branches, functions, lines) drops below 100%. This is intentional.

**Test Organization**: Tests are co-located with source files. Use `describe` blocks to group related tests. Use `it` or `test` for individual cases.

## How to Deploy

**Vercel** (Recommended):
```bash
# Install Vercel CLI
bun add -g vercel

# Deploy
vercel
```

Configure environment variables in Vercel dashboard. Set build command to `bun run build`.

**Docker**:
```dockerfile
FROM oven/bun:1
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build
CMD ["bun", "start"]
```

**Environment Variables**: Production must set `DATABASE_URL` and optionally `LOG_LEVEL`.

## Branching Strategy

**Branches**:
- `main` — Production-ready code, protected
- `feature/*` — New features
- `fix/*` — Bug fixes

**Workflow**:
1. Branch from `main`: `git checkout -b feature/my-feature`
2. Commit frequently with descriptive messages
3. Push and open pull request
4. Never commit directly to `main`

**Review Process**: PRs require passing CI (typecheck, lint, tests) before merge. Pre-commit hooks ensure local quality but CI double-checks.
