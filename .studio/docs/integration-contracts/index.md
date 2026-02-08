# Integration Contracts Index

## API Contracts

- [tRPC API Contract](trpc-api-contract.md) — Type-safe RPC endpoint definitions with SuperJSON serialization for complex types
- [Health Check Endpoint](health-check-endpoint.md) — `/api/trpc/health` endpoint returning `{status: "ok"}` for monitoring

## Database Contracts

- [Kysely Database Client](kysely-database-client.md) — Type-safe query interface with automatic TypeScript type generation from schema
- [Migration System](migration-system.md) — Forward-only schema migrations with `bun db:migrate` execution

## Build Contracts

- [TypeScript Compilation](typescript-compilation.md) — Strict mode TypeScript with no implicit any and consistent type imports
- [ESLint Validation](eslint-validation.md) — Type-aware linting enforcing no-console, no-any, no-as-cast rules

## Runtime Contracts

- [Environment Variables](environment-variables.md) — Required: `DATABASE_URL`, Optional: `LOG_LEVEL` (defaults to "info")
- [Logger Interface](logger-interface.md) — Pino logger with `info`, `debug`, `warn`, `error` methods and structured logging support
