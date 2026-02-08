# Product Specifications Index

This directory contains feature specifications organized by functional area. Each spec defines what the feature does from a user perspective, not how it's implemented.

## Core Infrastructure

- [type-safety.md](type-safety.md) — End-to-end type safety enforcement through TypeScript strict mode, Zod validation, and tRPC
- [testing.md](testing.md) — Test-driven development workflow with Vitest, 100% coverage thresholds, and fast feedback loops
- [quality-gates.md](quality-gates.md) — Pre-commit hooks enforcing type checking, linting, and test passage before commits

## API Layer

- [trpc-integration.md](trpc-integration.md) — Type-safe RPC endpoints with SuperJSON serialization and React Query integration
- [health-check.md](health-check.md) — Basic health check endpoint for monitoring and deployment verification

## Development Workflow

- [pre-commit-validation.md](pre-commit-validation.md) — Automated quality checks preventing low-quality commits through Husky and lint-staged
- [lint-exception-blocking.md](lint-exception-blocking.md) — Script blocking eslint-disable comments to enforce consistent code standards

## Frontend Features

- [hello-world-page.md](hello-world-page.md) — Minimal landing page demonstrating Next.js App Router and Tailwind CSS integration

## Logging

- [structured-logging.md](structured-logging.md) — Pino-based JSON logging with configurable log levels and child logger creation

## Environment Configuration

- [environment-management.md](environment-management.md) — dotenvx-based environment variable loading for development and testing isolation
