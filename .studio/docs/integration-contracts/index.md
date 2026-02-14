# Integration Contracts Index

Integration contracts define the boundaries and guarantees at system edges. This template establishes patterns for defining contracts rather than implementing specific integrations.

## Internal Boundaries

- [tRPC API Contract](trpc-api-contract.md) — Type-safe procedure definitions with Zod validation, SuperJSON serialization, and automatic client generation
- [React Query Integration](react-query-integration.md) — TanStack Query provider configuration for server state management with automatic refetching and caching

## Infrastructure Contracts

- [Logger Interface](logger-interface.md) — Pino logger with structured output, child logger creation, and environment-based log levels
- [Environment Configuration](environment-configuration.md) — Required environment variables (DATABASE_URL, LOG_LEVEL) with validation and development/test isolation

## External Integration Patterns

- [External API Validation](external-api-validation.md) — Pattern for using Zod schemas to validate untrusted external data before processing
- [Database Connection Pattern](database-connection-pattern.md) — Connection string format and environment-based database selection for development/test separation
