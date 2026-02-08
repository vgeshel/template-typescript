# Regression Tests Overview

This directory organizes regression test specifications by feature area. Each document describes expected behavior from a user perspective (black-box testing) and serves as the canonical specification of what the system should do.

## Type Safety Tests

- [typescript-strict-mode.md](typescript-strict-mode.md) — Verify strict type checking with no any types, no as casts, and explicit return types required

## API Layer Tests

- [trpc-health-endpoint.md](trpc-health-endpoint.md) — Health check returns `{status: "ok"}` with correct type inference end-to-end
- [trpc-serialization.md](trpc-serialization.md) — SuperJSON correctly serializes Date, Map, Set, and other complex types across client-server boundary

## Quality Gate Tests

- [pre-commit-typecheck.md](pre-commit-typecheck.md) — Pre-commit hook blocks commits when `bun typecheck` fails with type errors
- [pre-commit-lint.md](pre-commit-lint.md) — Pre-commit hook blocks commits when `bun lint` fails with rule violations
- [pre-commit-test.md](pre-commit-test.md) — Pre-commit hook blocks commits when any test fails
- [lint-exception-blocker.md](lint-exception-blocker.md) — `check-lint-exceptions.ts` script detects and blocks eslint-disable comments in source files

## Test Coverage Tests

- [coverage-thresholds.md](coverage-thresholds.md) — Vitest coverage reports fail when statements, branches, functions, or lines fall below 100%
- [coverage-exclusions.md](coverage-exclusions.md) — Test files, type definitions, and test utilities correctly excluded from coverage calculation

## Logging Tests

- [pino-logger-creation.md](pino-logger-creation.md) — Logger initializes with LOG_LEVEL from environment, defaulting to "info"
- [pino-child-logger.md](pino-child-logger.md) — createChildLogger binds context that appears in all subsequent log entries

## Environment Tests

- [dotenvx-loading.md](dotenvx-loading.md) — Environment variables load from `.env.local` in dev and `.env.test.local` in test, with no cross-contamination

## Frontend Tests

- [hello-world-render.md](hello-world-render.md) — Home page renders "Hello, World!" heading with correct Tailwind classes
- [providers-composition.md](providers-composition.md) — Providers component correctly wraps children with tRPC and React Query contexts
