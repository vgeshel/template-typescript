# Integration Contracts Index

This template provides contracts for internal integrations and external APIs. Each contract specifies inputs, outputs, and invariants without prescribing implementation details.

## Internal APIs

- [tRPC Router Contract](trpc-router-contract.md) — Type-safe procedures with input/output schemas
- [Logger Contract](logger-contract.md) — Structured logging interface and log levels
- [Database Client Contract](database-client-contract.md) — Kysely query builder interface and transaction guarantees

## External Dependencies

- [Next.js App Router](nextjs-app-router.md) — Routing, rendering, and API route conventions
- [React Query](react-query.md) — Client-side data fetching and caching via tRPC
- [PostgreSQL](postgresql.md) — Database schema expectations and query patterns

## Development Tools

- [Vitest Testing API](vitest-testing-api.md) — Test structure, assertions, and lifecycle hooks
- [ESLint Rules Contract](eslint-rules-contract.md) — Enforced code quality rules and their rationale
- [Pre-commit Hook Contract](precommit-hook-contract.md) — Quality checks that must pass before commit

## Future Contracts

As integrations are added, document contracts for:
- Authentication providers (OAuth, SAML, etc.)
- Payment processors
- Email delivery services
- File storage (S3, etc.)
- Real-time communication (WebSockets, SSE)
