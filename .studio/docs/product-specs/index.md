# Product Specifications Index

This template is intentionally minimal—it provides infrastructure, not features. The specifications below describe what comes pre-configured out of the box.

## Core Infrastructure

- [Type-Safe API Layer](type-safe-api.md) — tRPC integration providing end-to-end type safety between client and server
- [Quality Enforcement System](quality-enforcement.md) — Pre-commit hooks that block commits failing type checks, linting, or introducing eslint-disable comments
- [Test Coverage Enforcement](test-coverage.md) — Vitest configuration requiring 100% code coverage for all application code
- [Development Environment](development-environment.md) — Bun runtime, hot module reloading, and structured logging with Pino

## UI Framework

- [Next.js App Router Setup](nextjs-app-router.md) — File-system based routing with React Server Components by default
- [Tailwind CSS Integration](tailwind-integration.md) — Utility-first styling with PostCSS configuration
- [React Query Integration](react-query-integration.md) — Server state management integrated with tRPC client

## Code Quality

- [ESLint Configuration](eslint-config.md) — Type-aware linting rules enforcing strict TypeScript practices
- [Prettier Formatting](prettier-formatting.md) — Automatic code formatting via lint-staged
- [TypeScript Strict Mode](typescript-strict.md) — Comprehensive compiler checks with zero tolerance for `any` or `as` casts

## AI Development Support

- [Claude Code Skills](claude-code-skills.md) — Pre-configured development workflows for AI agents
- [TDD Workflow Automation](tdd-workflow.md) — Test-driven development guidance and patterns
