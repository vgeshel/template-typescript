# Product Specifications Index

This template is a development foundation, not a product with user-facing features. The specifications below describe the capabilities and guarantees provided to developers using this template.

## Template Features

- [Type Safety Enforcement](type-safety.md) — Strict TypeScript configuration with zero escape hatches
- [Testing Infrastructure](testing-infrastructure.md) — Vitest with real database testing and 100% coverage requirements
- [Quality Gates](quality-gates.md) — Pre-commit hooks enforcing typecheck, lint, and test passage
- [Development Workflow](development-workflow.md) — Commands and patterns for daily development
- [tRPC API Layer](trpc-api-layer.md) — End-to-end typesafe API with client generation
- [Logging System](logging-system.md) — Structured JSON logging via pino
- [Database Integration](database-integration.md) — PostgreSQL with Kysely type-safe queries

## Configuration Patterns

- [Environment Management](environment-management.md) — dotenvx-based configuration with separate test environments
- [ESLint Configuration](eslint-configuration.md) — Type-aware linting with no-any and no-cast rules
- [Code Formatting](code-formatting.md) — Prettier with import organization

## Future Specifications

As this template is extended, add specifications for:
- Authentication patterns
- Database migration workflow
- Deployment configurations
- Performance monitoring
- Error tracking integration
