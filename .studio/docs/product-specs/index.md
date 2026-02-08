# Product Specifications Index

This template is infrastructure, not an application with user-facing features. The specifications below describe the template's capabilities as a development foundation.

## Developer Experience

- [Type Safety Enforcement](type-safety-enforcement.md) — Strict TypeScript configuration with banned escape hatches ensuring compile-time correctness
- [Pre-commit Quality Gates](pre-commit-quality-gates.md) — Automated checks that block commits with type errors, lint violations, or missing tests
- [Test-Driven Development Workflow](tdd-workflow.md) — Vitest integration with 100% coverage requirements and real database testing support

## Application Infrastructure

- [tRPC API Framework](trpc-api-framework.md) — Type-safe RPC endpoints with SuperJSON serialization and React Query integration
- [Structured Logging](structured-logging.md) — Pino-based JSON logging with log level configuration and child logger creation
- [Environment Management](environment-management.md) — Runtime environment variable loading with separate development and test configurations

## AI Agent Integration

- [Claude Code Skills](claude-code-skills.md) — Procedural guidance documents for test-driven development and database migrations
- [Development Rules System](development-rules-system.md) — Codified constraints in `.claude/rules/` covering code style, testing, and error handling
- [Automated Hook System](automated-hook-system.md) — Hookify-based pre-commit and post-commit hooks that provide AI agents with workflow enforcement
