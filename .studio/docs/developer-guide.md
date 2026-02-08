# Developer Guide

## Onboarding

Welcome! This template provides a production-ready foundation for TypeScript + Next.js applications with strict quality enforcement. You'll learn:

- How to navigate the codebase structure
- How to run, test, and deploy the application
- How to work with AI coding assistants
- Key architectural patterns and constraints

**Time to first commit:** Most developers contribute their first passing commit within 1-2 hours.

**Prerequisites:**
- Bun runtime installed ([bun.sh](https://bun.sh))
- PostgreSQL 16+ (if using database features)
- Familiarity with TypeScript and React
- Understanding of Git workflows

**First Steps:**

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd template-typescript
   bun install
   ```

2. **Run the Test Suite**
   ```bash
   bun test:run
   ```
   All tests should pass. If they don't, something is misconfigured.

3. **Start Development Server**
   ```bash
   bun dev
   ```
   Visit http://localhost:3000 to see the app.

4. **Read CLAUDE.md**
   This file contains inviolable constraints. Familiarize yourself with:
   - TDD workflow (mandatory for all changes)
   - Type safety rules (no `any`, no `as`)
   - Pre-commit hook requirements

5. **Make a Test Change**
   Edit `app/page.tsx` to change the welcome text. Run `bun test:run` to see tests fail. Update the test, then see it pass. This demonstrates the TDD workflow.

## Codebase Navigation

### Finding Your Way Around

**"Where do I add a new API endpoint?"**
→ `src/server/trpc.ts` — Add procedures to the `appRouter`

**"Where do I add a new page?"**
→ `app/` directory — Create a new directory with `page.tsx`

**"Where do I add a shared React component?"**
→ `src/components/` — Export components that are reused across pages

**"Where do I add utility functions?"**
→ `src/lib/` — For code shared between client and server

**"Where do I add server-only code?"**
→ `src/server/` — Never imported in client components

**"Where do I add database queries?"**
→ `src/server/db.ts` — After uncommenting database setup

**"Where do I write tests?"**
→ Co-located with source files as `*.test.ts` or `*.test.tsx`

**"Where are build scripts?"**
→ `scripts/` — Maintenance and CI/CD scripts

**"Where is AI assistant configuration?"**
→ `CLAUDE.md` and `.claude/` — Skip these when analyzing project code

### Critical Files

| File | Purpose | Edit Frequency |
|------|---------|----------------|
| `src/server/trpc.ts` | API endpoint definitions | High (every new feature) |
| `src/lib/trpc.ts` | tRPC client setup | Low (rarely changed) |
| `app/page.tsx` | Home page UI | High (feature development) |
| `eslint.config.mjs` | Linting rules | Low (team decisions) |
| `vitest.config.ts` | Test configuration | Low (rarely changed) |
| `next.config.ts` | Next.js config | Low (rarely changed) |
| `package.json` | Dependencies and scripts | Medium (adding packages) |
| `CLAUDE.md` | AI assistant instructions | Low (team standards) |

## Key Directories

### `app/` — Next.js App Router

Contains pages, layouts, and API routes. File-system based routing:

- `app/page.tsx` → `/` route
- `app/about/page.tsx` → `/about` route
- `app/layout.tsx` → Root layout wrapping all pages
- `app/api/trpc/[trpc]/route.ts` → tRPC HTTP handler

**Server Components by default.** Add `'use client'` directive only when needed.

### `src/server/` — Server-Only Code

Code in this directory never runs in the browser. Use for:

- Database clients and queries
- tRPC procedure implementations
- Server-side business logic
- Secrets and sensitive operations

**Import path:** `@/server/...` (using TypeScript path alias)

### `src/lib/` — Shared Utilities

Code shared between client and server:

- tRPC client configuration
- Logging setup
- React providers
- Validation schemas (Zod)

**Import path:** `@/lib/...`

### `src/components/` — React Components

Reusable UI components imported across pages:

- Client Components (`'use client'` directive)
- Shared UI patterns (buttons, forms, modals)
- Provider wrappers

**Import path:** `@/components/...`

### `scripts/` — Maintenance Scripts

Utility scripts for development and CI/CD:

- `check-lint-exceptions.ts` — Detects banned lint bypass comments
- `check-coverage-thresholds.ts` — Verifies 100% coverage requirement

Run these manually during development or let pre-commit hooks execute them.

### `migrations/` — Database Migrations

SQL schema changes in version-controlled files (create this directory when using database features):

```bash
bun db:migrate:create add_users_table
```

**Migration workflow:**
1. Create migration → Modify generated file with SQL
2. Apply migration → `bun db:migrate`
3. Regenerate types → `bun db:codegen`

## Development Workflow

### Standard Feature Development (TDD)

**Every code change follows this workflow:**

1. **Write a Failing Test**
   ```bash
   # Create or edit a test file
   vim src/server/trpc.test.ts

   # Run tests in watch mode
   bun test
   ```
   The test should fail because the feature doesn't exist yet.

2. **Write Minimal Implementation**
   ```bash
   vim src/server/trpc.ts
   ```
   Write just enough code to make the test pass.

3. **Verify Test Passes**
   ```bash
   bun test:run
   ```
   All tests should pass, including the new one.

4. **Refactor If Needed**
   Improve code structure while keeping tests green.

5. **Run Pre-Commit Checks**
   ```bash
   bun typecheck && bun lint && bun test:run
   ```
   Fix any failures before committing.

6. **Commit**
   ```bash
   git add .
   git commit -m "Add feature X"
   ```
   Pre-commit hooks automatically run. If they fail, fix issues and try again.

### Working with AI Assistants

If using Claude Code or other AI coding agents:

1. **Start Every Session by Referencing CLAUDE.md**
   The AI should read this file to understand constraints.

2. **Use the TDD Skill**
   When available, invoke the TDD skill for guided test-driven development.

3. **Never Request `--no-verify`**
   If pre-commit hooks fail, fix the issue. Never bypass quality gates.

4. **Verify AI Suggestions Against Rules**
   AI may suggest outdated patterns. Check against project rules:
   - No `any` types
   - No `as` casts
   - No lint exception comments

### Adding a New tRPC Endpoint

1. **Write Test First** (`src/server/trpc.test.ts`)
   ```typescript
   describe('getUserById', () => {
     it('returns user with valid ID', async () => {
       const result = await caller.getUserById({ id: '123' })
       expect(result).toEqual({ id: '123', name: 'Alice' })
     })
   })
   ```

2. **Add Procedure** (`src/server/trpc.ts`)
   ```typescript
   import { z } from 'zod'

   export const appRouter = t.router({
     getUserById: publicProcedure
       .input(z.object({ id: z.string() }))
       .output(z.object({ id: z.string(), name: z.string() }))
       .query(({ input }) => {
         // Implementation
         return { id: input.id, name: 'Alice' }
       }),
   })
   ```

3. **Use in Component** (`app/page.tsx`)
   ```typescript
   'use client'
   import { trpc } from '@/lib/trpc'

   export default function Home() {
     const { data } = trpc.getUserById.useQuery({ id: '123' })
     return <div>{data?.name}</div>
   }
   ```

Types flow automatically from server to client. No manual type definitions needed.

## How to Run

### Development Mode

```bash
bun dev
```

Starts Next.js dev server on http://localhost:3000 with:
- Hot module replacement (HMR)
- Structured logging with pino-pretty
- Fast Refresh for instant UI updates

**Environment:** Uses `.env.local` for configuration.

### Production Build

```bash
bun build
bun start
```

Creates optimized production build in `.next/` and starts production server.

**Environment:** Uses `.env.production` for configuration.

### Type Checking

```bash
bun typecheck
```

Runs TypeScript compiler without emitting files. Verifies all types are correct.

**Run this after every code change.** Pre-commit hooks will fail if types don't check.

### Linting

```bash
bun lint              # Check for issues
bunx eslint --fix     # Auto-fix issues
```

Runs ESLint with type-aware rules. Catches:
- Type safety violations (`any`, `as`)
- Unused variables
- Floating promises
- Console.log usage

### Formatting

```bash
bun format            # Format all files
bun format:check      # Check formatting without changing files
```

Runs Prettier on all TypeScript, JSON, and Markdown files.

## How to Test

### Watch Mode (Development)

```bash
bun test
```

Runs Vitest in watch mode. Re-runs tests when files change. Use during active development.

### Single Run (Pre-Commit)

```bash
bun test:run
```

Runs full test suite once and exits. Use before committing.

### Coverage Report

```bash
bun test:coverage
```

Generates coverage report in `coverage/` directory. Opens HTML report showing:
- Statement coverage (must be 100%)
- Branch coverage (must be 100%)
- Function coverage (must be 100%)
- Line coverage (must be 100%)

### UI Mode

```bash
bun test:ui
```

Opens Vitest UI in browser for interactive test exploration.

### Writing Tests

**Location:** Co-locate tests with source files:
- `src/server/trpc.ts` → `src/server/trpc.test.ts`
- `app/page.tsx` → `app/page.test.tsx`

**Naming Convention:**
- Unit tests: `*.test.ts` or `*.test.tsx`
- React component tests: `*.test.tsx` with `@vitest-environment jsdom`

**Test Structure:**
```typescript
import { describe, expect, it } from 'vitest'

describe('Feature Name', () => {
  describe('specific behavior', () => {
    it('describes expected outcome', () => {
      // Arrange — Set up test data
      const input = { value: 42 }

      // Act — Execute the code being tested
      const result = myFunction(input)

      // Assert — Verify the outcome
      expect(result).toBe(42)
    })
  })
})
```

**React Component Tests:**
```typescript
/**
 * @vitest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import MyComponent from './MyComponent'

describe('MyComponent', () => {
  it('renders expected content', () => {
    render(<MyComponent />)
    expect(screen.getByText('Expected Text')).toBeDefined()
  })
})
```

## How to Deploy

**This template does not include deployment configuration.** Add deployment setup based on your hosting environment:

### Vercel (Recommended for Next.js)

1. Install Vercel CLI: `bun add -g vercel`
2. Run: `vercel`
3. Follow prompts to link project
4. Push to Git → Auto-deploys on merge to main

### Docker

1. Create `Dockerfile`:
   ```dockerfile
   FROM oven/bun:1 as builder
   WORKDIR /app
   COPY package.json bun.lockb ./
   RUN bun install --frozen-lockfile
   COPY . .
   RUN bun run build

   FROM oven/bun:1-slim
   WORKDIR /app
   COPY --from=builder /app/.next ./.next
   COPY --from=builder /app/package.json ./
   COPY --from=builder /app/node_modules ./node_modules
   ENV NODE_ENV=production
   EXPOSE 3000
   CMD ["bun", "start"]
   ```

2. Build: `docker build -t myapp .`
3. Run: `docker run -p 3000:3000 myapp`

### Self-Hosted Server

1. Build locally: `bun build`
2. Copy `.next/`, `package.json`, `node_modules/` to server
3. Run: `NODE_ENV=production bun start`
4. Use process manager like PM2 or systemd

**Environment Variables:** Set production values in `.env.production` or hosting platform environment settings.

## Branching Strategy

**Feature Branches:**
```bash
git checkout -b feature/user-authentication
# Make changes, commit
git push origin feature/user-authentication
# Open pull request to main
```

**Bug Fix Branches:**
```bash
git checkout -b fix/login-validation
# Make changes, commit
git push origin fix/login-validation
# Open pull request to main
```

**Never commit directly to `main`.** Use feature branches and pull requests.

## Code Review Process

**Before Requesting Review:**

1. ✅ All tests pass (`bun test:run`)
2. ✅ Type checking passes (`bun typecheck`)
3. ✅ Linting passes (`bun lint`)
4. ✅ Coverage remains at 100% (`bun test:coverage`)
5. ✅ Pre-commit hooks pass without `--no-verify`

**Review Checklist:**

- [ ] Tests verify actual values, not just existence
- [ ] No `any` types or `as` casts introduced
- [ ] No lint exception comments added
- [ ] External data validated with Zod schemas
- [ ] Database types regenerated after schema changes
- [ ] Documentation updated if public API changed

**Approval Required:** At least one team member must approve before merging.

**Merge Strategy:** Squash and merge to keep history clean.