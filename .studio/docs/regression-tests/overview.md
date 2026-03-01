# Regression Tests Overview

This template enforces 100% test coverage. All tests follow TDD principles where tests are written before implementation.

## Core Infrastructure Tests

- **[tRPC Router](trpc-router.md)** — Health check endpoint returns correct status, router initialization with SuperJSON transformer
- **[tRPC Client](trpc-client.md)** — Client configuration, base URL resolution for SSR vs browser, batch link setup
- **[Logger](logger.md)** — Logger initialization with correct level, child logger creation with bindings, format validation
- **[React Providers](react-providers.md)** — QueryClientProvider and tRPC provider setup, client-side rendering

## Testing Requirements

**Coverage Thresholds (vitest.config.ts):**
- Statements: 100%
- Branches: 100%
- Functions: 100%
- Lines: 100%

**Test Organization:**
- Co-located with source files (e.g., `trpc.ts` → `trpc.test.ts`)
- Includes both unit and integration tests
- Tests run without file parallelism to prevent database race conditions

**Test Execution:**
- `bun test` — Watch mode for development
- `bun test:run` — CI mode with full coverage check
- `bun test:ui` — Visual test interface
- `bun test:coverage` — Generate coverage reports

## Future Test Suites

As features are added, create regression test specifications for:

- User authentication flows
- Data validation scenarios
- API error handling
- Database transactions
- Authorization rules
- UI component interactions
