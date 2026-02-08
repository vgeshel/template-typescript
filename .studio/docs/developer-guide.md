# Developer Guide

## Onboarding

### Prerequisites

Before starting, ensure you have:
- **Bun** runtime installed (https://bun.sh) — not Node.js
- **PostgreSQL 16+** running locally or accessible remotely
- **Git** for version control
- A code editor with TypeScript support (VS Code, WebStorm, etc.)

### Initial Setup

1. **Clone or create from template**
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env.local
   cp .env.test.example .env.test.local
   ```

   Edit `.env.local` and `.env.test.local` with your database URLs:
   ```
   DATABASE_URL="postgres://user:password@localhost:5432/myapp"
   LOG_LEVEL="info"
   ```

4. **Create databases**
   ```bash
   createdb myapp
   createdb myapp_test
   ```

5. **Run migrations** (when migrations exist)
   ```bash
   bun db:migrate
   bun db:codegen
   ```

6. **Verify installation**
   ```bash
   bun typecheck  # Should pass with no errors
   bun lint       # Should pass with no errors
   bun test:run   # Should pass all tests
   ```

7. **Start development server**
   ```bash
   bun dev
   ```
   Open http://localhost:3000 to see the application.

## Codebase Navigation

### Finding Files

Use these patterns to locate code:

**tRPC API endpoints:**
```bash
# Server-side procedures
cat src/server/trpc.ts

# Client-side tRPC hooks
grep -r "trpc\." src/
```

**React Components:**
```bash
# All components
ls src/components/

# Page components
ls app/**/page.tsx
```

**Tests:**
```bash
# All tests
find . -name "*.test.ts" -o -name "*.test.tsx"

# Tests for specific file
ls src/lib/logger.test.ts  # matches src/lib/logger.ts
```

**Configuration:**
```bash
# TypeScript config
cat tsconfig.json

# ESLint config
cat eslint.config.mjs

# Test config
cat vitest.config.ts

# Next.js config
cat next.config.ts
```

**AI Agent Rules:**
```bash
# All rules
ls .claude/rules/

# Specific pattern (e.g., testing)
cat .claude/rules/testing.md
```

## Key Directories

### `app/` — Next.js App Router

Contains pages, layouts, and API routes. Files in this directory define URL routes:
- `app/page.tsx` → `/`
- `app/about/page.tsx` → `/about`
- `app/api/trpc/[trpc]/route.ts` → `/api/trpc/*` (tRPC handler)

**Layout hierarchy:** `layout.tsx` files wrap child pages and can be nested for shared UI.

### `src/server/` — Backend Code

Server-only code that never runs in the browser:
- `trpc.ts` — tRPC router and procedure definitions
- `db.ts` — Kysely database client (if using database)
- `db-types.ts` — Generated TypeScript types from database schema (never edit manually)

**Import restriction:** Client code cannot import from `src/server/` due to Next.js build system.

### `src/lib/` — Shared Utilities

Code that works in both server and client contexts:
- `logger.ts` — Pino logger instance
- `trpc.ts` — tRPC client configuration
- `providers.tsx` — React Query + tRPC provider

### `src/components/` — React Components

Reusable UI components. Add `'use client'` directive at the top of files that use hooks or browser APIs.

### `src/test/` — Test Utilities

Shared test setup, fixtures, and helper functions. Imported by `*.test.ts` files.

### `scripts/` — Development Tools

CLI utilities for pre-commit checks and development tasks:
- `check-lint-exceptions.ts` — Blocks commits with lint exceptions
- `check-coverage-thresholds.ts` — Validates test coverage meets 100%

Run these directly: `bun scripts/check-lint-exceptions.ts`

### `.claude/` — AI Agent Configuration

Guidance for Claude Code and other AI coding agents:
- **`rules/`** — Constraints and patterns (type safety, testing, error handling)
- **`skills/`** — Procedural workflows (TDD, debugging, migrations)
- **`hookify.*.md`** — Pre-commit hook definitions

## Development Workflow

### Test-Driven Development (Required)

**ALL code changes must follow TDD workflow:**

1. **Write a failing test first**
   ```bash
   # Create test file if it doesn't exist
   touch src/lib/my-feature.test.ts

   # Write test describing expected behavior
   # Run tests and watch it fail
   bun test src/lib/my-feature.test.ts
   ```

2. **Implement minimal code to pass**
   ```bash
   # Write implementation in src/lib/my-feature.ts
   # Run tests until they pass
   bun test src/lib/my-feature.test.ts
   ```

3. **Refactor if needed**
   ```bash
   # Tests protect you during refactoring
   bun test:run  # Full test suite
   ```

**See `.claude/skills/tdd/SKILL.md` for detailed guidance.**

### Type Safety Workflow

When adding new features that handle external data:

1. **Define Zod schema**
   ```typescript
   const UserSchema = z.object({
     name: z.string(),
     email: z.string().email(),
   })
   type User = z.infer<typeof UserSchema>
   ```

2. **Validate at API boundary**
   ```typescript
   publicProcedure
     .input(UserSchema)
     .query(({ input }) => {
       // input is typed as User
     })
   ```

3. **Never use `as` or `any`**
   ```typescript
   // ❌ Blocked by ESLint
   const user = data as User
   const result: any = getValue()

   // ✅ Required pattern
   const user = UserSchema.parse(data)
   const result: string = getValue()  // explicit type
   ```

### Pre-commit Checklist

Before committing, these commands MUST pass:

```bash
bun typecheck  # TypeScript type checking
bun lint       # ESLint validation
bun test:run   # Full test suite with coverage
```

These run automatically in pre-commit hooks. **Never use `--no-verify`** to bypass.

### Adding Dependencies

1. **Install package**
   ```bash
   bun add <package>           # Production dependency
   bun add -d <package>        # Dev dependency
   ```

2. **Check documentation**
   ```bash
   # DO NOT rely on LLM knowledge of package APIs
   # Check package.json for version, then search official docs
   cat package.json | grep <package>
   ```

3. **Update types if needed**
   ```bash
   bun add -d @types/<package>
   ```

## How to Run

### Development Server

```bash
bun dev
```

Starts Next.js dev server at http://localhost:3000 with:
- Hot module reloading
- Pretty-printed logs (pino-pretty)
- Fast refresh for React components

### Production Build

```bash
bun build
```

Creates optimized production build in `.next/` directory.

### Production Server

```bash
bun start
```

Runs production build. Requires `bun build` to run first.

### Type Checking

```bash
bun typecheck
```

Runs TypeScript compiler without emitting files. Use this frequently during development.

### Linting

```bash
bun lint         # Check for issues
bun lint --fix   # Auto-fix issues
```

Runs ESLint with type-aware rules. Most issues can be auto-fixed.

### Formatting

```bash
bun format              # Format all files
bun format:check        # Check formatting without changes
```

Runs Prettier on all source files.

## How to Test

### Watch Mode (Development)

```bash
bun test
```

Runs tests in watch mode, re-running on file changes. Useful during TDD.

### Single Run (CI)

```bash
bun test:run
```

Runs all tests once and exits. Used in CI and pre-commit hooks.

### Coverage Report

```bash
bun test:coverage
```

Generates HTML coverage report in `coverage/` directory. Opens automatically in browser.

### Test UI

```bash
bun test:ui
```

Launches Vitest UI for interactive test exploration.

### Run Specific Tests

```bash
bun test src/lib/logger.test.ts              # Single file
bun test src/lib/                            # Directory
bun test -t "should create child logger"     # Test name pattern
```

## How to Deploy

This template does not include deployment configuration. Common deployment approaches:

### Vercel (Recommended)

1. Push code to GitHub/GitLab
2. Import project in Vercel dashboard
3. Set environment variables in Vercel settings
4. Deploy automatically on push to main

Vercel has first-class Next.js and Bun support.

### Docker

1. Create `Dockerfile`:
   ```dockerfile
   FROM oven/bun:1
   WORKDIR /app
   COPY package.json bun.lockb ./
   RUN bun install --frozen-lockfile --production
   COPY . .
   RUN bun build
   CMD ["bun", "start"]
   ```

2. Build and run:
   ```bash
   docker build -t myapp .
   docker run -p 3000:3000 myapp
   ```

### Other Platforms

- **Railway** — Detects Bun automatically, zero config
- **Fly.io** — Supports Bun with minimal configuration
- **AWS/GCP/Azure** — Use Docker deployment

## Branching Strategy

### Feature Development

```bash
# Never commit directly to main
git checkout -b feature/my-feature

# Make changes, following TDD workflow
# Pre-commit hooks run automatically
git add .
git commit -m "Add my feature"

# Push and create pull request
git push origin feature/my-feature
```

### Bug Fixes

```bash
git checkout -b fix/bug-description

# Write failing test demonstrating bug
# Fix bug
# Verify test passes
git commit -m "Fix bug description"
```

### Commit Messages

Follow conventional commit format:
- `feat: Add user authentication`
- `fix: Resolve database connection leak`
- `refactor: Extract validation logic`
- `test: Add coverage for edge cases`
- `docs: Update developer guide`

## Review Process

1. **Create pull request** with description of changes
2. **CI runs automatically** — must pass typecheck, lint, and tests
3. **Review focuses on:**
   - Business logic correctness
   - Test coverage of edge cases
   - API design and naming
   - Performance implications
4. **Merge to main** after approval

**Code style and type safety are automated** — reviewers should not comment on formatting or lint issues since CI enforces them.

## Troubleshooting

### Type errors after dependency update

```bash
# Regenerate lockfile
rm bun.lockb
bun install

# Clear TypeScript cache
rm -rf .next
rm -rf node_modules/.cache
bun typecheck
```

### Tests failing with database errors

```bash
# Verify test database exists
createdb myapp_test

# Check .env.test.local has correct URL
cat .env.test.local

# Run migrations on test database
DATABASE_URL=$(grep DATABASE_URL .env.test.local | cut -d '=' -f2-) bun db:migrate
```

### ESLint complaining about type assertions

```typescript
// ❌ ESLint blocks this
const value = data as string

// ✅ Use Zod validation
const StringSchema = z.string()
const value = StringSchema.parse(data)

// ✅ Or type guard
function isString(value: unknown): value is string {
  return typeof value === 'string'
}
if (isString(data)) {
  const value = data  // typed as string
}
```

### Pre-commit hook failing

```bash
# Don't bypass with --no-verify
# Instead, fix the underlying issue:

# Type errors
bun typecheck

# Lint errors
bun lint --fix

# Test failures
bun test:run

# Identify specific failure
git commit  # Read error message carefully
```
