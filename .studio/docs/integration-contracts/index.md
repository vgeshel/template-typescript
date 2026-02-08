# Integration Contracts Index

This template establishes contracts for internal component integration and provides patterns for external API integration.

## Internal Contracts

- [tRPC Health Check](trpc-health-check.md) — Health check endpoint returning system status
- [React Query Provider](react-query-provider.md) — Client-side state management integration between tRPC and React Query
- [Logger Interface](logger-interface.md) — Structured logging contract for application-wide logging

## External Integration Patterns

- [Environment Variables](environment-variables.md) — Configuration contract for runtime environment values
- [Database Connection](database-connection.md) — PostgreSQL connection string format and connection pooling requirements

## Testing Contracts

- [Test Utilities](test-utilities.md) — Shared testing helpers and setup utilities
- [Component Testing](component-testing.md) — React Testing Library integration with jsdom environment