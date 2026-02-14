# Architecture

## Architectural Patterns

**Type-driven development** — Types flow from database schema through tRPC procedures to React components with no gaps. Zod schemas define runtime validation boundaries.

**Server Components by default** — Next.js App Router uses React Server Components for pages and layouts. Client components marked explicitly with `'use client'` directive only when needed for interactivity.

**Colocation over separation** — Test files live beside implementation files (`component.tsx` + `component.test.tsx`). Related code stays together rather than separating by file type.

**Progressive enhancement** — Server-rendered HTML with client-side hydration. Application works with JavaScript disabled for static content.

## Technology Choices

**Next.js 16** — Chosen for App Router with Server Components, file-based routing, and excellent TypeScript support. Eliminates need for separate backend framework.

**tRPC** — Selected over REST or GraphQL for zero-overhead type safety. TypeScript types flow automatically from server to client without codegen. SuperJSON handles complex types.

**Vitest** — Preferred over Jest for faster execution, simpler ESM support, and better TypeScript integration. Istanbul coverage provider meets 100% threshold requirement.

**Bun runtime** — Replaces Node.js for faster startup, built-in TypeScript execution, and simpler dependency management. Package scripts assume Bun availability.

**Pino logger** — Structured JSON logging with configurable levels. Fast performance for production use. Replaces console.log throughout codebase.

**Tailwind CSS v4** — Utility-first styling with PostCSS integration. Version 4 simplifies configuration and improves build performance.

**ESLint flat config** — Modern ESLint configuration format with type-aware rules. Enforces type safety rules (no `any`, no `as` assertions, no console).

## Code Organization

**`app/`** — Next.js App Router directory with file-based routing. Pages, layouts, and route handlers. Contains `api/trpc/` for HTTP adapter.

**`src/server/`** — tRPC router definitions and server-side logic. Exports `appRouter` type for client import.

**`src/lib/`** — Shared utilities used by both client and server. Logger configuration, tRPC client, React providers.

**`src/components/`** — React components. Currently contains only `Providers` wrapper for application-level context.

**`src/test/`** — Test utilities and fixtures. Excluded from coverage calculation.

**`scripts/`** — Build and development automation. Pre-commit checks, coverage validation, and custom tooling.

**`.claude/`** — Development tool configuration. Excluded from application logic.

## Security Model

**Type safety as security boundary** — Runtime validation with Zod at all external inputs. No type assertions bypass checking.

**No client secrets** — Environment variables only available on server. Client cannot access `process.env` values.

**Strict ESLint rules** — Security plugin enabled. Prevents common vulnerabilities like unsafe regex and prototype pollution.

**Pre-commit validation** — Quality gates run before code enters repository. Prevents committing code with type errors or lint violations.

## Performance Considerations

**Server Components reduce bundle size** — Most components render on server and send HTML instead of JavaScript.

**HTTP batching** — tRPC batches multiple queries into single HTTP request, reducing roundtrips.

**SuperJSON optimization** — Efficient serialization format for complex types. Smaller payload than JSON with metadata.

**Test parallelization disabled** — Vitest runs with `--no-file-parallelism` to prevent database connection conflicts during integration tests.

**External server packages** — Pino and related packages excluded from Next.js bundling to prevent build errors and reduce bundle size.
