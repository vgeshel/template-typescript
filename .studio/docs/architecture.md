# Architecture

## Architectural Patterns

**End-to-End Type Safety** — TypeScript types flow from database schema through API layer to frontend components without manual synchronization. Kysely generates types from PostgreSQL schema, tRPC infers types from router definitions, and React components receive fully-typed data.

**Test-Driven Development** — All code changes require tests first. Vitest runs in watch mode during development, with 100% coverage enforcement blocking commits. Tests serve as executable documentation and prevent regressions.

**Fail-Fast Quality Gates** — Pre-commit hooks execute typecheck, lint exception detection, linting, and tests before allowing commits. Build-time errors are preferred over runtime errors. No escape hatches are permitted.

**Structured Logging** — Pino provides JSON-structured logs with configurable levels. Console.log is banned to enforce production-grade observability from the start.

**Database-First Schema** — Kysely migrations define schema, then `bun db:codegen` generates TypeScript types. The database is the source of truth for data structures.

## Technology Choices

**Bun Runtime** — Chosen for faster startup times, native TypeScript support, and improved developer experience over Node.js. Trade-off: smaller ecosystem than Node.js, but core dependencies have compatibility.

**Next.js App Router** — Chosen over Pages Router for React Server Component support, better streaming, and modern routing paradigm. Represents Next.js future direction.

**tRPC over REST** — Chosen for automatic type synchronization eliminating need for OpenAPI codegen or manual type definitions. Trade-off: TypeScript-only, but aligns with project's type-safety-first principle.

**Kysely over Prisma** — Chosen for SQL-first approach with full control over queries while maintaining type safety. Prisma's abstraction layer hides SQL and can generate inefficient queries.

**Vitest over Jest** — Chosen for faster execution, native ESM support, and better TypeScript integration. API-compatible with Jest for easy developer onboarding.

**Pino over Winston** — Chosen for performance (benchmarks show 5-10x faster) and JSON-first structured logging. Winston's flexibility not needed for typical applications.

**Zod over Yup/Joi** — Chosen for TypeScript-first design enabling type inference from schemas. Other libraries require separate type definitions.

## Code Organization

**`app/`** — Next.js App Router pages and API routes. Contains `layout.tsx` (root layout with providers), `page.tsx` (home page), and `api/trpc/[trpc]/route.ts` (tRPC HTTP handler).

**`src/server/`** — Backend code including tRPC router (`trpc.ts`) and database client (`db.ts`). Generated database types in `db-types.ts` (never edited manually).

**`src/lib/`** — Shared utilities used across client and server. Includes tRPC client configuration (`trpc.ts`), logger setup (`logger.ts`), and React providers (`providers.tsx`).

**`src/components/`** — Reusable React components. Currently contains `Providers.tsx` wrapping tRPC and React Query providers.

**`src/test/`** — Test utilities and shared test setup files.

**`migrations/`** — Kysely database migrations in timestamp-prefixed files.

**`scripts/`** — Build and development scripts including lint exception checker and coverage threshold validator.

**`.claude/`** — AI agent configuration (excluded from project documentation scope per requirements).

## Security Model

**No Secrets in Code** — Environment variables managed via `.env.local` (gitignored). Example files (`.env.example`) checked into repository without sensitive values.

**Type-Safe Input Validation** — All external input (API requests, environment variables) validated with Zod schemas. Runtime validation prevents injection and malformed data.

**Database Parameterization** — Kysely automatically parameterizes queries preventing SQL injection. Raw SQL usage avoided.

**No Client Secrets** — Server-only code in `src/server/` never bundled to client. Next.js enforces separation.

## Performance Considerations

**Automatic Code Splitting** — Next.js App Router automatically code-splits by route. JavaScript only loaded for visited pages.

**React Server Components** — Server components (default in App Router) render on server reducing client JavaScript bundle size.

**SuperJSON Serialization** — Efficient binary serialization for tRPC payloads with support for Date, Map, Set, BigInt types without manual conversion.

**Bun's Native Speed** — Bun's implementation in Zig provides 2-3x faster package installation and startup compared to Node.js with npm.

**Test Parallelization** — Vitest parallelizes test execution by default. Database tests use `--no-file-parallelism` to prevent race conditions.
