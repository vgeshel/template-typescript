# Integration Contracts Index

## Internal API Boundaries

- [tRPC Health Check Endpoint](trpc-health-check.md) — Health status endpoint returning `{ status: "ok" }` for service monitoring
- [tRPC Client Configuration](trpc-client-config.md) — HTTP batch link with SuperJSON transformer for client-server communication
- [Logger Interface](logger-interface.md) — Pino logger with child logger creation and structured log output

## External Integrations

- [PostgreSQL Database Connection](postgres-connection.md) — Database URL-based connection with Kysely query builder and generated type definitions
- [Environment Variable Contract](environment-variables.md) — Required and optional environment variables for runtime configuration

## Build System Contracts

- [Pre-commit Hook Interface](pre-commit-hook.md) — Scripts executed before git commits with success/failure exit codes
- [Coverage Threshold Validation](coverage-thresholds.md) — Istanbul coverage reports validated against 100% thresholds
- [Lint Exception Detection](lint-exception-detection.md) — Git diff scanning for banned ESLint and TypeScript exception comments
