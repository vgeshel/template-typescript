# Integration Contracts Index

Integration contracts define the boundaries and invariants of external interactions. This template establishes contracts for runtime dependencies and deployment environments.

## External Services

- [PostgreSQL Database](postgresql-database.md) — Connection requirements, environment variables, and migration expectations
- [Logging System](logging-system.md) — Pino logger interface, log levels, and structured output format

## Internal APIs

- [tRPC Health Endpoint](trpc-health-endpoint.md) — Health check procedure returning `{ status: "ok" }` for monitoring
- [tRPC Client Interface](trpc-client-interface.md) — Type-safe client creation, base URL resolution, and SuperJSON transformation

## Build & Runtime Contracts

- [Bun Runtime Requirements](bun-runtime.md) — Minimum Bun version, required flags, and environment expectations
- [Next.js Server Configuration](nextjs-server.md) — External package handling for pino, build output expectations
- [Environment Variables](environment-variables.md) — Required and optional environment variables with validation rules
