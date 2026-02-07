# Integration Contracts Index

This directory documents the contracts between system components and external integrations. Each contract describes inputs, outputs, error conditions, and invariants without specifying implementation details.

## API Contracts

- [tRPC HTTP API](trpc-http-api.md) — HTTP API contract for tRPC requests via `/api/trpc` endpoint. Accepts batch or single procedure calls with SuperJSON-serialized payloads. Returns typed responses or errors.

- [Health Check Procedure](health-check-procedure.md) — `health` query procedure that accepts no input and returns `{ status: "ok" }`. Used for service health monitoring.

## Data Contracts

- [SuperJSON Serialization](superjson-serialization.md) — Serialization contract between tRPC client and server. Supports JavaScript types beyond standard JSON (Date, Map, Set, BigInt, undefined, RegExp). Maintains type fidelity across HTTP boundary.

## Development Contracts

- [Pre-commit Hook Contract](pre-commit-hook-contract.md) — Git pre-commit hook that runs quality checks before allowing commit. Executes type checking, lint exception detection, linting, coverage threshold verification, coverage tests, and formatting. Blocks commit if any check fails.

- [Test File Discovery](test-file-discovery.md) — Vitest automatically discovers test files matching `**/*.test.ts` and `**/*.test.tsx` in `src/`, `app/`, `.claude/skills/`, and `scripts/` directories. Co-located with source files.

- [Coverage Reporting](coverage-reporting.md) — Vitest generates coverage reports in multiple formats (text, HTML, LCOV, JSON) in `./coverage` directory. Enforces 100% thresholds for statements, branches, functions, and lines.

## Logging Contracts

- [Pino Logger Output](pino-logger-output.md) — Structured JSON log entries with `level`, `time`, `msg`, and optional context fields. Log level controlled by `LOG_LEVEL` environment variable (trace, debug, info, warn, error).

- [Child Logger Context](child-logger-context.md) — Child loggers inherit parent logger configuration and add bound context fields to all log entries. Used for request-scoped or module-scoped metadata.

## Environment Contracts

- [Environment Variables](environment-variables.md) — Required environment variables: `DATABASE_URL` (PostgreSQL connection string), optional: `LOG_LEVEL` (defaults to "info"). Loaded from `.env.local` for development, `.env.test.local` for tests.

- [Database Connection](database-connection.md) — PostgreSQL connection via `DATABASE_URL` environment variable. Format: `postgres://user:password@host:port/database`. Database must exist before running migrations.

## Build Contracts

- [TypeScript Module Resolution](typescript-module-resolution.md) — Path alias `@/*` resolves to `./src/*` for clean imports. Configured in both tsconfig.json and vitest.config.ts.

- [Next.js Build Output](nextjs-build-output.md) — Production build via `bun build` generates optimized static and server bundles in `.next/` directory. Server-side packages (pino, pino-pretty, thread-stream) are externalized.

## Type Contracts

- [tRPC Router Type Export](trpc-router-type-export.md) — `AppRouter` type exported from `@/server/trpc` provides complete type information for all procedures. Client uses this type for end-to-end type safety.

- [Type-Only Imports](type-only-imports.md) — TypeScript imports prefixed with `type` keyword (e.g., `import type { Foo } from 'bar'`) are erased at runtime. Enforced by ESLint to prevent runtime dependency issues.