# Product Specifications Index

This directory contains detailed specifications for each feature area of the template. Each spec describes what the feature does, expected behaviors, and user-facing requirements.

## Quality Enforcement

- [Pre-commit Quality Checks](pre-commit-quality-checks.md) — Automated verification of type safety, linting, test coverage, and code formatting before commits are allowed
- [Lint Exception Detection](lint-exception-detection.md) — Detection and blocking of escape hatches (eslint-disable, @ts-ignore) that bypass quality guardrails
- [Coverage Threshold Protection](coverage-threshold-protection.md) — Prevention of lowering the 100% coverage requirement in vitest configuration

## Testing Infrastructure

- [Test-Driven Development Workflow](test-driven-development-workflow.md) — Guidance system for TDD cycle: write failing test, implement minimal code, refactor
- [100% Coverage Requirement](100-percent-coverage-requirement.md) — Enforcement of complete test coverage for all code paths including branch coverage

## Type Safety

- [Strict TypeScript Configuration](strict-typescript-configuration.md) — Configuration that prohibits escape hatches (any, as casts) and enforces strict type checking
- [Zod-Based Validation](zod-based-validation.md) — Pattern for validating external data using Zod schemas instead of unsafe type assertions

## API Layer

- [tRPC Integration](trpc-integration.md) — Type-safe API layer using tRPC with SuperJSON serialization for end-to-end type safety
- [Health Check Endpoint](health-check-endpoint.md) — Basic health check procedure returning service status

## Frontend Infrastructure

- [Next.js App Router Structure](nextjs-app-router-structure.md) — File-based routing using Next.js 16 App Router with server and client components
- [React Query Integration](react-query-integration.md) — Client-side data fetching and caching via tRPC React Query integration
- [Tailwind CSS Styling](tailwind-css-styling.md) — Utility-first CSS framework configuration with custom fonts

## Development Experience

- [Structured Logging](structured-logging.md) — JSON-formatted logging using pino for consistent log output and child logger context
- [Development Server](development-server.md) — Hot-reloading development server with pretty-printed log output
- [Code Formatting](code-formatting.md) — Automatic code formatting via Prettier with import organization on staged files

## AI Agent Support

- [Claude Code Skills System](claude-code-skills-system.md) — Procedural guidance skills for AI coding agents to follow project-specific workflows
- [CLAUDE.md Guidance](claude-md-guidance.md) — Central instruction file that communicates project rules and patterns to AI agents