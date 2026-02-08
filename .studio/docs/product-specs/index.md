# Product Specifications Index

This template is infrastructure, not a product with features. The specifications below describe the development experience and quality enforcement mechanisms provided by the template.

## Development Experience

- [Type Safety Enforcement](type-safety-enforcement.md) — How the template prevents type safety violations through ESLint, TypeScript strict mode, and pre-commit validation
- [Test-Driven Development Workflow](tdd-workflow.md) — Required TDD process for all code changes, including bug fixes and refactors
- [Pre-Commit Quality Gates](pre-commit-quality-gates.md) — Automated checks that run before commits to maintain code quality

## API and Data Patterns

- [Type-Safe API Design with tRPC](trpc-api-design.md) — How to define and use tRPC procedures for end-to-end type safety
- [External Data Validation](external-data-validation.md) — Using Zod to validate client input, API responses, and environment variables at system boundaries
- [Logging Standards](logging-standards.md) — Structured logging with Pino for debugging and observability

## Testing Infrastructure

- [Test Coverage Requirements](test-coverage-requirements.md) — Enforcement of 100% test coverage through Vitest and pre-commit hooks
- [Testing Patterns](testing-patterns.md) — Standard patterns for unit tests, component tests, and tRPC procedure tests

## Code Quality

- [Lint Exception Blocking](lint-exception-blocking.md) — How the template prevents developers from bypassing linting rules with disable comments
- [Coverage Threshold Protection](coverage-threshold-protection.md) — Preventing degradation of coverage requirements in vitest.config.ts