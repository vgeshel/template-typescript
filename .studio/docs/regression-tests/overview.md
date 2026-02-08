# Regression Test Specifications

## Type Safety

- [No Any Types Allowed](type-safety-no-any.md) — ESLint blocks all `any` types, requiring explicit type annotations
- [No Type Assertions Allowed](type-safety-no-assertions.md) — ESLint blocks `as` casts, requiring Zod validation or type guards instead
- [Strict TypeScript Configuration](type-safety-strict-config.md) — TypeScript strict mode enabled with all strictness flags

## Linting and Formatting

- [ESLint Type-Aware Rules](linting-type-aware.md) — Type-checked linting rules catch unhandled promises and type inconsistencies
- [Console Logging Blocked](linting-no-console.md) — ESLint blocks console methods, requiring Pino logger usage
- [Prettier Formatting](formatting-prettier.md) — Automatic code formatting on save and pre-commit

## Testing

- [100% Test Coverage Required](testing-coverage-100.md) — Vitest enforces 100% coverage for statements, branches, functions, and lines
- [TDD Workflow Enforcement](testing-tdd-workflow.md) — Pre-commit hooks verify tests exist and pass before allowing commits
- [Vitest Integration](testing-vitest-integration.md) — Tests run with globals enabled, coverage reporting, and @/ path alias support

## Pre-commit Hooks

- [Lint Exception Detection](pre-commit-lint-exceptions.md) — Blocks commits containing eslint-disable or @ts-ignore comments
- [Type Check Execution](pre-commit-typecheck.md) — Runs TypeScript type checking before allowing commits
- [Test Execution](pre-commit-test-run.md) — Runs full test suite before allowing commits

## tRPC Integration

- [Health Endpoint Returns Status](trpc-health-endpoint.md) — `/api/trpc/health` returns `{ status: "ok" }` with correct Zod schema
- [SuperJSON Serialization](trpc-superjson.md) — Date, Map, Set, and other JS types serialize correctly across client-server boundary
- [Type Safety Across Client-Server](trpc-type-safety.md) — Client code receives TypeScript errors when server API changes

## Logger

- [Pino Structured Logging](logger-pino-structured.md) — Logger outputs JSON with level, timestamp, and message fields
- [Child Logger Creation](logger-child-logger.md) — createChildLogger adds binding context to all subsequent logs
- [Log Level Configuration](logger-log-level.md) — LOG_LEVEL environment variable controls output verbosity

## Next.js App Router

- [Server Components by Default](nextjs-server-components.md) — Components without 'use client' run on server
- [Client Components with Hooks](nextjs-client-components.md) — Components with 'use client' can use useState, useEffect, etc.
- [Geist Font Loading](nextjs-font-loading.md) — Google Fonts loaded with next/font and CSS variables
