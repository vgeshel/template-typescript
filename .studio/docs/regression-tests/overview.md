# Regression Tests Overview

Regression tests specify expected system behavior from a user perspective. This template enforces 100% test coverage, ensuring all behavior is documented as executable specifications.

## Test Organization

Tests are colocated with source files using the `.test.ts` or `.test.tsx` suffix:
- `src/server/trpc.test.ts` — tRPC router behavior
- `src/lib/logger.test.ts` — Logging functionality
- `app/page.test.tsx` — React component rendering

## Core Behaviors

- [Type Safety Guarantees](type-safety-guarantees.md) — Compiler and linter enforce strict typing
- [API Health Check](api-health-check.md) — tRPC health endpoint returns status
- [Logging Behavior](logging-behavior.md) — Structured logs with correct levels and formatting
- [React Rendering](react-rendering.md) — Components render without errors
- [tRPC Client-Server Integration](trpc-integration.md) — End-to-end type safety from client to server

## Testing Standards

**Real Database Testing** — Tests use actual PostgreSQL instances, not mocks. Each test runs in isolation with transaction rollback.

**Black-Box Verification** — Tests verify observable behavior, not implementation details. Refactoring should not break tests.

**100% Coverage Requirement** — Every statement, branch, function, and line must be covered. Coverage gaps indicate untested behavior.

**No Test Flakiness** — Tests must be deterministic. Random failures are bugs, not acceptable risk.

## Test Execution

```bash
bun test              # Watch mode for development
bun test:run          # Single run for CI
bun test:coverage     # Coverage report with threshold validation
```

## Future Test Areas

As features are added, create test specifications for:
- Authentication flows
- Database migrations
- Error handling patterns
- Rate limiting
- Caching behavior
- WebSocket connections
