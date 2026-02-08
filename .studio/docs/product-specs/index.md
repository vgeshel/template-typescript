# Product Specifications Index

This template is not a product itself but a foundation for building products. The following specifications describe the template's own features that support product development.

## Developer Experience Features

- [Type Safety Enforcement](type-safety-enforcement.md) — Strict TypeScript configuration with ESLint rules banning `any` and `as` casts
- [Pre-Commit Quality Gates](pre-commit-quality-gates.md) — Automated checks before every commit including type checking, linting, and 100% test coverage verification
- [Test-Driven Development Workflow](tdd-workflow.md) — Vitest configuration with watch mode, coverage reporting, and testing utilities

## Architecture Features

- [Type-Safe API Layer](type-safe-api-layer.md) — tRPC setup with SuperJSON for end-to-end type safety between client and server
- [Structured Logging](structured-logging.md) — Pino logger configuration with log levels and structured output

## Database Features (Optional)

- [Type-Safe Database Queries](type-safe-database-queries.md) — Kysely configuration with automatic type generation from schema migrations
- [Migration Management](migration-management.md) — Database migration pattern with Kysely migration commands

## AI Assistant Integration

- [Claude Code Configuration](claude-code-configuration.md) — CLAUDE.md specification with inviolable constraints and skill definitions