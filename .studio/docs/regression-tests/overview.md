# Regression Tests Overview

## Core System Tests

- [Type Safety Enforcement](type-safety-enforcement.md) — Verify TypeScript compilation fails with `any` types, `as` casts, and missing type definitions
- [Pre-Commit Hook Execution](pre-commit-hook-execution.md) — Ensure commits are blocked when typecheck, lint, or tests fail
- [Lint Exception Detection](lint-exception-detection.md) — Verify `eslint-disable`, `@ts-ignore`, and similar patterns are caught by pre-commit hook

## API Layer Tests

- [tRPC Health Endpoint](trpc-health-endpoint.md) — `/api/trpc/health` returns `{status: "ok"}` with correct typing
- [tRPC Client-Server Integration](trpc-client-server-integration.md) — Verify type synchronization between client and server, SuperJSON serialization of complex types

## Component Tests

- [Root Layout Rendering](root-layout-rendering.md) — Verify layout renders with Providers wrapper and font variables
- [Home Page Rendering](home-page-rendering.md) — Verify "Hello, World!" heading and welcome message display correctly
- [TrpcProvider Integration](trpc-provider-integration.md) — Verify QueryClient and tRPC client initialization in React tree

## Quality Gate Tests

- [ESLint Rule Enforcement](eslint-rule-enforcement.md) — Verify no-console, no-floating-promises, consistent-type-imports rules fail on violations
- [Test Coverage Thresholds](test-coverage-thresholds.md) — Verify 100% coverage requirement for statements, branches, functions, and lines
- [Logger Usage](logger-usage.md) — Verify Pino logger initialization and child logger creation with bindings
