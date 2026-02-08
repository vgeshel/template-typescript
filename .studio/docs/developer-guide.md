# Developer Guide

## Onboarding

Welcome to this TypeScript + Next.js template. This guide helps you navigate the codebase and establish productive development workflows.

**Prerequisites:**
- Bun installed (`curl -fsSL https://bun.sh/install | bash`)
- PostgreSQL 16+ running locally
- Git configured with name and email

**First-time Setup:**
```bash
# Clone and install
git clone <repository-url>
cd <project-name>
bun install

# Configure environment
cp .env.example .env.local
cp .env.test.example .env.test.local
# Edit .env.local and .env.test.local with your database URLs

# Create databases
createdb myapp
createdb myapp_test

# Run migrations (when they exist)
bun db:migrate
bun db:codegen

# Verify setup
bun typecheck    # Should pass with no errors
bun lint         # Should pass with no errors
bun test:run     # Should pass all tests
```

## Codebase Navigation

**Start here for common tasks:**
- Adding API endpoints: `src/server/trpc.ts`
- Creating React components: `src/components/`
- Shared utilities: `src/lib/`
- Test utilities: `src/test/`
- Next.js pages: `app/`

**Reading the codebase:**
1. Read `README.md` for project overview
2. Read `CLAUDE.md` for development constraints
3. Explore `src/server/trpc.ts` to understand API structure
4. Look at `*.test.ts` files to see behavior specifications

## Key Directories

**`app/`** — Next.js App Router with React Server Components. Each folder represents a route. `layout.tsx` wraps children, `page.tsx` is the route component.

**`src/server/`** — Backend-only code never sent to browser. tRPC procedures, database queries, business logic.

**`src/lib/`** — Shared utilities usable in both server and client contexts. Logger configuration, tRPC client setup.

**`src/components/`** — React components. Use `'use client'` directive when needed for interactivity.

**`src/test/`** — Test utilities, fixtures, and helpers shared across test files.

**`scripts/`** — Build scripts, development tools, custom commands.

## Development Workflow

**Starting development:**
```bash
bun dev              # Start dev server at http://localhost:3000
```

**Creating a new feature (TDD workflow):**
```bash
# 1. Create failing test
# Edit src/feature/thing.test.ts - write test for new behavior

# 2. Watch it fail
bun test             # Run in watch mode, see test fail

# 3. Implement minimal code to pass
# Edit src/feature/thing.ts - implement feature

# 4. Watch it pass
# Vitest watch mode automatically reruns

# 5. Verify quality
bun typecheck        # No type errors
bun lint             # No linting errors

# 6. Commit (hooks run automatically)
git add .
git commit -m "Add feature: description"
```

**Fixing a bug:**
```bash
# 1. Write test that reproduces bug (test should fail)
# 2. Fix bug (test should pass)
# 3. Verify quality gates
# 4. Commit
```

**Refactoring:**
```bash
# 1. Ensure all tests pass before starting
bun test:run

# 2. Make refactoring changes
# 3. Ensure tests still pass (behavior unchanged)
# 4. Run quality gates
bun typecheck && bun lint && bun test:run

# 5. Commit
```

## How to Run

**Development server:**
```bash
bun dev              # Next.js dev server with hot reload
```

**Production build:**
```bash
bun build            # Creates optimized production build
bun start            # Serves production build
```

**Type checking:**
```bash
bun typecheck        # TypeScript compiler check
```

**Linting:**
```bash
bun lint             # ESLint check
bun lint --fix       # Auto-fix issues
```

**Formatting:**
```bash
bun format           # Prettier format all files
bun format:check     # Check if files are formatted
```

## How to Test

**Watch mode (development):**
```bash
bun test             # Vitest watch mode, reruns on changes
bun test:ui          # Visual test UI
```

**CI mode:**
```bash
bun test:run         # Run all tests once
bun test:coverage    # Run with coverage report
```

**Test-specific commands:**
```bash
bun test:changed     # Only tests affected by git changes
```

**Writing tests:**
- Colocate tests with source: `feature.ts` → `feature.test.ts`
- Use real database, not mocks
- Test observable behavior, not implementation
- Aim for 100% coverage (enforced by Vitest)

## How to Deploy

This template provides no deployment configuration. Common deployment options:

**Vercel (recommended for Next.js):**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Docker:**
Create `Dockerfile`:
```dockerfile
FROM oven/bun:1
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build
CMD ["bun", "start"]
```

**Other platforms:**
Configure environment variables and run:
```bash
bun install --production
bun build
bun start
```

## Branching Strategy

**Main branch protection:**
- Never commit directly to `main`
- All changes via feature branches and pull requests

**Feature branch workflow:**
```bash
# Create feature branch
git checkout -b feature/description

# Make changes, commit frequently
git add .
git commit -m "Description"

# Push and create PR
git push origin feature/description
```

**Branch naming:**
- `feature/description` — New features
- `fix/description` — Bug fixes
- `refactor/description` — Code improvements
- `docs/description` — Documentation

## Review Process

**Before requesting review:**
1. All pre-commit hooks pass (automatic)
2. `bun test:run` passes
3. `bun build` succeeds
4. Changes include tests

**What reviewers check:**
- Business logic correctness
- Test coverage and quality
- Architectural fit
- Security implications

**What reviewers don't check:**
- Code style (Prettier handles this)
- Type correctness (TypeScript handles this)
- Test existence (pre-commit hooks enforce this)
