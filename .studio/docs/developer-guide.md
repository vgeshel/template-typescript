# Developer Guide

## Onboarding

Welcome to the TypeScript Next.js template. This guide will get you from zero to productive in under an hour.

**Prerequisites:**
- Bun runtime installed (`curl -fsSL https://bun.sh/install | bash`)
- PostgreSQL 16+ running locally
- Git configured for commits

**First Steps:**

1. Clone the repository and install dependencies:
   ```bash
   bun install
   ```

2. Set up environment files:
   ```bash
   cp .env.example .env.local
   cp .env.test.example .env.test.local
   ```

3. Edit `.env.local` and `.env.test.local` with your PostgreSQL credentials

4. Create databases (if using PostgreSQL):
   ```bash
   createdb myapp
   createdb myapp_test
   ```

5. Run type checking and tests to verify setup:
   ```bash
   bun typecheck
   bun test:run
   ```

## Codebase Navigation

**Start here:** Read `CLAUDE.md` for project principles and constraints.

**Key files:**
- `src/server/trpc.ts` — tRPC router where you add API procedures
- `src/lib/trpc.ts` — tRPC client configuration
- `src/lib/logger.ts` — Structured logging interface
- `app/api/trpc/[trpc]/route.ts` — HTTP handler for tRPC requests
- `vitest.config.ts` — Test configuration and coverage thresholds
- `package.json` — Available scripts and dependencies

**Pattern matching:** Find examples by searching existing tests:
- How to add a tRPC procedure: `src/server/trpc.test.ts`
- How to call tRPC from client: `src/lib/trpc.test.ts`
- How to test React components: `src/components/Providers.test.tsx`

## Key Directories

| Directory | Purpose | What Goes Here |
|-----------|---------|----------------|
| `app/` | Next.js App Router | Pages, layouts, route handlers |
| `src/server/` | Backend logic | tRPC routers, procedures, business logic |
| `src/lib/` | Shared utilities | Logger, tRPC client, common helpers |
| `src/components/` | React components | Reusable UI components |
| `src/test/` | Test utilities | Test helpers, fixtures, mocks |
| `scripts/` | Build tooling | Custom scripts for builds, checks |
| `.claude/` | AI agent config | Development skills, code rules |

## Development Workflow

**TDD Cycle (MANDATORY):**

1. Write a failing test that describes desired behavior
2. Run `bun test` and verify the test fails
3. Write minimal code to make the test pass
4. Run `bun test` and verify the test passes
5. Refactor if needed, keeping tests green
6. Run `bun typecheck && bun lint` before committing

**Adding a new tRPC procedure:**

1. Write test in `src/server/trpc.test.ts` for new procedure
2. Watch it fail: `bun test`
3. Add procedure to `appRouter` in `src/server/trpc.ts`
4. Watch it pass: `bun test`
5. Verify types: `bun typecheck`

**Making any code change:**

Never edit code without a test first. See `CLAUDE.md` TDD section.

## How to Run

**Development server:**
```bash
# Start Next.js dev server
# Note: No `bun dev` script exists - check package.json for actual scripts
# Based on package.json, build with:
bun run build
bun run start
```

**Type checking:**
```bash
bun typecheck
```

**Linting:**
```bash
bun lint          # Check for errors
```

**Formatting:**
```bash
bun format        # Auto-format all files
bun format:check  # Check without modifying
```

## How to Test

**Test modes:**
```bash
bun test          # Watch mode for development
bun test:run      # CI mode - run once, exit
bun test:ui       # Visual test interface
bun test:coverage # Generate coverage report
bun test:changed  # Run only tests for changed files
```

**Test requirements:**
- 100% coverage required (statements, branches, functions, lines)
- Tests must be co-located with source files (`.test.ts` or `.test.tsx`)
- All tests must pass before commits allowed

**Writing tests:**
- Use Vitest globals (`describe`, `it`, `expect`)
- Use `@testing-library/react` for component tests
- Use `@testing-library/user-event` for interaction simulation

## How to Deploy

**Build for production:**
```bash
bun run build    # Creates optimized production build
```

**Start production server:**
```bash
bun run start    # Starts Next.js in production mode
```

**Environment variables:**
- Production requires same environment variables as `.env.example`
- Use dotenvx for encrypted secrets: `dotenvx run -- bun run start`
- Never commit `.env.local` or `.env.test.local`

**Pre-deployment checklist:**
- [ ] All tests pass: `bun test:run`
- [ ] Type check passes: `bun typecheck`
- [ ] Lint passes: `bun lint`
- [ ] Build succeeds: `bun build`
- [ ] Environment variables configured on hosting platform

## Branching Strategy

**Branch naming:**
- Feature branches: `feature/description`
- Bug fixes: `fix/description`
- Refactoring: `refactor/description`

**Commit workflow:**
- Never commit directly to `main`
- Create feature branch from `main`
- Make changes following TDD
- Pre-commit hooks run automatically (typecheck, lint, tests)
- Push branch and create pull request
- Merge after review

**Review process:**
- All tests must pass in CI
- Type checking must pass
- Test coverage must remain 100%
- No `eslint-disable` comments allowed
- No `any` types or `as` casts allowed
