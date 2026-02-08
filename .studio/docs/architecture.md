# Architecture

## Architectural Patterns

**End-to-end type safety** — The architecture enforces type safety from client to server without code generation. React components call tRPC procedures that return inferred TypeScript types. Runtime validation uses Zod schemas, eliminating the need for type casts.

**Server-first rendering** — Next.js App Router defaults to React Server Components, reducing JavaScript sent to the client. Only components requiring interactivity (like Providers) use `'use client'` directive.

**Colocated tests** — Every source file has a corresponding `.test.ts` or `.test.tsx` file in the same directory. This enforces 100% coverage and makes tests easy to find when modifying code.

**Structured logging** — All logging goes through Pino rather than console statements. ESLint blocks `console.log()` usage, forcing structured JSON logging that's queryable in production.

**Pre-commit quality gates** — Git hooks run type checking, linting, and formatting before allowing commits. A custom script blocks any `eslint-disable` comments, preventing developers from bypassing quality rules.

## Technology Choices

**TypeScript** — Chosen for static type checking that catches errors at compile time rather than runtime. Configured in strict mode with additional ESLint rules that ban `any` types and `as` casts.

**Next.js App Router** — Selected for its file-system based routing, built-in optimization, and React Server Components support. Provides a production-ready framework without complex configuration.

**tRPC** — Enables type-safe APIs without schema files or code generation. The client automatically knows what procedures exist and what types they accept/return. Integrated with React Query for caching and optimistic updates.

**Vitest** — Faster than Jest while maintaining API compatibility. Provides built-in coverage reporting with Istanbul and a UI mode for debugging tests.

**Bun** — Replaces Node.js for faster dependency installation, builds, and test execution. Compatible with Next.js while providing significant performance improvements.

**SuperJSON** — Extends JSON serialization to handle Date, undefined, Map, Set, and other JavaScript types. Prevents common serialization bugs when passing data between server and client.

**Tailwind CSS** — Utility-first CSS framework that eliminates context switching between files. Styles are colocated with components, and unused styles are purged automatically.

**Pino** — High-performance structured logger designed for production. JSON output enables log aggregation and querying in tools like Datadog or CloudWatch.

**Husky + lint-staged** — Enforces code quality at commit time rather than PR time, reducing feedback loops. Only formats and lints staged files for fast hook execution.

## Code Organization

**`app/`** — Next.js App Router pages and API routes. Layout and page components define the routing structure. The `api/trpc/[trpc]/` subdirectory hosts the tRPC HTTP handler.

**`src/components/`** — Shared React components. Currently contains only Providers wrapper for client-side context initialization.

**`src/lib/`** — Shared utilities and configuration. Includes tRPC client setup, logger initialization, and React Query provider.

**`src/server/`** — Server-only code including tRPC router definitions. This directory is never imported by client components.

**`src/test/`** — Shared test utilities and setup helpers. Excluded from coverage calculations.

**`scripts/`** — Build and development automation scripts. Contains quality enforcement tools like `check-lint-exceptions.ts`.

**`.claude/`** — Claude Code configuration for AI agent development workflows (excluded from project documentation scope per instructions).

## Security Model

**No runtime type assertions** — ESLint rule `consistent-type-assertions: never` blocks all `as` casts. External data must be validated with Zod schemas that return typed results or throw errors.

**Environment variable safety** — The `no-process-env` ESLint rule blocks direct `process.env` access except in specific configuration files. All environment variables must be loaded through dotenvx.

**Content Security Policy** — Not configured by default. Applications handling sensitive data should add CSP headers in `next.config.js`.

**XSS protection** — React escapes all dynamic content by default. No `dangerouslySetInnerHTML` usage in the template.

## Performance Considerations

**Request batching** — tRPC's `httpBatchLink` combines multiple API calls into a single HTTP request, reducing round trips.

**Tree shaking** — ESLint enforces `consistent-type-imports`, enabling better dead code elimination during builds.

**Server-side rendering** — Pages render on the server by default, delivering meaningful content in the initial HTML response rather than waiting for JavaScript to load.

**Coverage thresholds** — While 100% coverage ensures quality, it adds test execution overhead. Projects with performance-critical CI pipelines may need to adjust the threshold.
