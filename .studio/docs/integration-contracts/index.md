# Integration Contracts Index

This document catalogs all external integration points where the application exchanges data with external systems. Each contract defines inputs, outputs, and validation requirements.

## External System Boundaries

- [tRPC HTTP API](trpc-http-api.md) — Public HTTP API exposed at `/api/trpc` for client-server communication. All procedures are type-safe and validated with Zod schemas.

## Database Interfaces

- [PostgreSQL Connection](postgresql-connection.md) — Database connection configuration and type-safe query interface through Kysely. Connection string provided via `DATABASE_URL` environment variable.

## Environment Configuration

- [Environment Variables](environment-variables.md) — Required and optional environment variables for runtime configuration. All variables accessed through validated configuration objects, never directly via `process.env`.

## Development Tool Integrations

- [Pre-Commit Hook Interface](pre-commit-hook-interface.md) — Contract between the Git pre-commit hook and quality check scripts. Exit codes determine commit approval or rejection.

- [Test Runner Interface](test-runner-interface.md) — Vitest configuration and coverage reporting interface used by pre-commit hooks and CI/CD pipelines.

## Frontend-Backend Type Sharing

- [tRPC Type Contract](trpc-type-contract.md) — Mechanism by which TypeScript types are shared between server procedures and client code. Uses `AppRouter` type export for end-to-end type inference.

## Build and Deployment

- [Next.js Build Output](nextjs-build-output.md) — Output artifacts from `bun build` command, including static assets, server bundles, and deployment manifest.

## Logging and Observability

- [Structured Log Format](structured-log-format.md) — Pino JSON log format for structured logging. Log levels (trace, debug, info, warn, error) and required fields for correlation and debugging.