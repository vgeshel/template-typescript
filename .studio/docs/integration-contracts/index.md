# Integration Contracts Index

This document catalogs the contracts (APIs, boundaries, and interfaces) between components and external systems.

## Internal APIs

- [tRPC AppRouter Contract](trpc-approuter.md) — TypeScript-defined API routes between client and server, enforcing type safety with Zod schemas

## Framework Integration Points

- [Next.js API Routes](nextjs-api-routes.md) — HTTP endpoint at `/api/trpc` handling tRPC requests via fetch adapter
- [React Query Provider](react-query-provider.md) — Client-side data fetching and caching integration wrapping the application
- [SuperJSON Transformer](superjson-transformer.md) — Serialization contract supporting JavaScript types beyond JSON (Date, Map, Set, etc.)

## Environment Configuration

- [Environment Variables](environment-variables.md) — Expected configuration loaded via dotenvx from `.env.local` and `.env.test.local`

## Testing Boundaries

- [Test Utilities](test-utilities.md) — Shared test helpers and setup located in `src/test/`
- [Coverage Thresholds](coverage-thresholds.md) — 100% coverage requirement contract enforced by Vitest

## Build and Runtime Contracts

- [Bun Runtime API](bun-runtime.md) — Runtime-specific features and APIs used by build and test scripts
- [TypeScript Path Aliases](typescript-paths.md) — Module resolution using `@/` prefix mapped to `src/` directory
