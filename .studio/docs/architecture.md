# Architecture

## Architectural Patterns

### Type-Safe API Layer with tRPC

The application uses tRPC to maintain end-to-end type safety between frontend and backend without code generation. The `AppRouter` type is the single source of truth for all API contracts.

**Pattern**: Define procedures in `src/server/trpc.ts`, export the router type, and consume it in the tRPC client. Changes to API signatures are immediately reflected in the client without additional build steps.

**Rationale**: Traditional REST APIs require maintaining separate OpenAPI specs or generating types from schemas. tRPC eliminates this synchronization problem by using TypeScript types directly. The tradeoff is that this approach requires both client and server to be TypeScript.

### Co-located Tests

Test files live alongside the code they test (`example.ts` and `example.test.ts` in the same directory) rather than in a separate `test/` or `__tests__/` directory.

**Pattern**: For every source file `foo.ts`, create a test file `foo.test.ts` in the same directory. Vitest discovers and runs these tests automatically.

**Rationale**: Co-location makes it trivial to find tests and keeps them synchronized with implementation changes. The conventional "separate test directory" approach creates organizational overhead and makes tests harder to discover. The vitest configuration explicitly includes test files from source directories.

### Validation at Boundaries

Zod validation is applied at system boundaries (API inputs, external API responses) but not between internal TypeScript functions.

**Pattern**: Use `schema.parse()` for data entering the system. Trust TypeScript types for internal function calls.

**Rationale**: TypeScript already validates internal function calls at compile time. Adding runtime validation everywhere duplicates work and adds performance overhead. Validate where trust boundaries exist (external data) but rely on type checking internally.

### Structured Logging with Pino

All logging uses the pino library with structured JSON output. Console.log is banned via ESLint.

**Pattern**: Import `logger` from `@/lib/logger` and use `logger.info()`, `logger.error()`, etc. with structured context objects. Use `createChildLogger()` for request-scoped or module-scoped context.

**Rationale**: Structured logs are machine-readable and queryable in log aggregation systems. Console.log produces unstructured text that's difficult to parse and search. Pino provides fast JSON logging with minimal overhead.

### Server and Client Component Separation

Next.js App Router supports both server and client components. This template uses server components by default and client components only when necessary (React Query provider, client-side interactivity).

**Pattern**: Components are server components unless they include `'use client'` directive. The `Providers` component wraps the application with client-side context providers.

**Rationale**: Server components are faster (no JavaScript shipped to client) and have better SEO. Client components are necessary for hooks, state, and browser APIs. Minimizing client components reduces bundle size.

## Technology Choices

### Bun Runtime

**Choice**: Bun instead of Node.js

**Rationale**: Bun provides faster execution, built-in TypeScript support, and a better developer experience (faster installs, built-in test runner integration). The tradeoff is that Bun is newer and has a smaller ecosystem. For this template, the performance and DX benefits outweigh ecosystem maturity concerns.

### Next.js 16 with App Router

**Choice**: Next.js App Router (`app/` directory) instead of Pages Router (`pages/` directory)

**Rationale**: App Router is the future of Next.js and provides better support for React Server Components, streaming, and incremental migration. Pages Router is in maintenance mode. New projects should use App Router.

### Vitest

**Choice**: Vitest instead of Jest

**Rationale**: Vitest is faster, has better TypeScript support, and shares configuration with Vite/Next.js. It provides the same API as Jest but with modern ESM support and less configuration. The migration path from Jest is straightforward if needed.

### Kysely (Not Included but Referenced)

**Choice**: Kysely for type-safe SQL query building (though not actively used in current code)

**Rationale**: The template was designed to include Kysely for database access. Kysely provides compile-time type checking for SQL queries without hiding SQL behind an ORM abstraction. It generates TypeScript types from database schema, ensuring queries are valid at compile time. (Note: The current implementation does not actively use a database, but the architecture supports adding it.)

### Tailwind CSS

**Choice**: Tailwind CSS instead of CSS-in-JS (styled-components, Emotion)

**Rationale**: Tailwind provides utility-first styling with zero runtime cost. CSS-in-JS libraries add runtime overhead for generating styles. Tailwind's approach is faster and integrates well with TypeScript through class name validation tools.

### SuperJSON for tRPC Transformer

**Choice**: SuperJSON instead of standard JSON serialization

**Rationale**: JavaScript has types that JSON cannot represent (Date, Map, Set, undefined, BigInt). SuperJSON serializes these types correctly, allowing APIs to use richer types without manual serialization logic. The tradeoff is a small bundle size increase.

### ESLint Flat Config

**Choice**: Flat config format (`eslint.config.mjs`) instead of legacy `.eslintrc`

**Rationale**: Flat config is the future of ESLint (legacy format is deprecated) and provides better TypeScript integration. It allows type-aware linting rules that catch more bugs at compile time.

### Husky for Git Hooks

**Choice**: Husky for managing git hooks

**Rationale**: Husky automatically installs git hooks in the repository, ensuring all developers run the same pre-commit checks. This prevents quality issues from reaching code review. Alternative approaches (manual hooks, CI-only checks) are easier to bypass or delay feedback.

## Code Organization

### Top-Level Directories

- **`app/`** — Next.js App Router: routes, layouts, and page components
- **`src/`** — Application source code (components, utilities, server logic)
- **`scripts/`** — Build scripts and CLI utilities
- **`migrations/`** — Database migration files (Kysely)
- **`.claude/`** — Claude Code configuration and skills
- **`.husky/`** — Git hook scripts

### `app/` Directory Structure

- **`app/layout.tsx`** — Root layout component wrapping all pages
- **`app/page.tsx`** — Home page component
- **`app/api/trpc/[trpc]/route.ts`** — tRPC HTTP handler for API requests
- **`app/globals.css`** — Global Tailwind CSS styles

### `src/` Directory Structure

- **`src/server/`** — Server-side code (tRPC router, database client)
  - `trpc.ts` — tRPC router definition and procedure declarations
- **`src/lib/`** — Shared utilities and client-side libraries
  - `logger.ts` — Pino logger instance and child logger factory
  - `trpc.ts` — tRPC React Query client
  - `providers.tsx` — React Query provider wrapper
- **`src/components/`** — React components
  - `Providers.tsx` — Client component that wraps children with providers
- **`src/test/`** — Test utilities and shared test fixtures (excluded from coverage)

### `scripts/` Directory

- **`check-lint-exceptions.ts`** — Pre-commit script that blocks escape hatches (eslint-disable, @ts-ignore)
- **`check-coverage-thresholds.ts`** — Pre-commit script that prevents lowering coverage thresholds

### `.claude/` Directory

- **`.claude/skills/`** — Procedural guidance for AI coding agents (TDD, debugging, refactoring)
- **`.claude/settings.json`** — Hook configuration for Claude Code behavior

## Security Model

### Input Validation

All external inputs (API request bodies, query parameters, form data) must be validated using Zod schemas. Type assertions (`as`) are banned to prevent unsafe assumptions about external data.

### No Secret Hardcoding

Secrets (API keys, database passwords) must be provided via environment variables, never committed to the repository. The `.env.example` file documents required variables without including actual secrets.

### Pre-commit Quality Checks

The pre-commit hook blocks commits that bypass type safety (any types, type assertions, linting disables). This prevents developers from accidentally weakening security guarantees.

### Strict TypeScript Configuration

TypeScript strict mode enables all type-checking flags. This catches potential runtime errors at compile time (null pointer errors, type mismatches, implicit any).

## Performance Considerations

### Server-Side Rendering

Next.js App Router defaults to server-side rendering. Server components are faster than client components because they don't ship JavaScript to the browser.

### Type-Only Imports

Imports prefixed with `type` keyword are erased at runtime, reducing bundle size. ESLint enforces this pattern to prevent unnecessary runtime dependencies.

### Vitest Coverage Configuration

Coverage instrumentation is excluded for test files and test utilities (`src/test/`) to speed up test execution. Only production code is measured for coverage.

### SuperJSON Overhead

SuperJSON adds a small serialization overhead compared to standard JSON. This is acceptable because it enables richer types (Date, Map) and eliminates manual serialization logic. For APIs with extreme performance requirements, standard JSON with manual serialization may be preferred.

### No File Parallelism in Tests

Vitest runs with `--no-file-parallelism` to avoid race conditions in database tests and shared state. This makes tests slower but more reliable. Teams with primarily unit tests (no shared state) can enable parallelism for faster execution.