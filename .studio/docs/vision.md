# Vision

## Purpose

This project is a production-ready TypeScript + Next.js template designed to accelerate development of type-safe, tested web applications. It provides a foundation with strict quality standards, comprehensive testing infrastructure, and modern development tooling pre-configured.

## Users

- **Development teams** building new TypeScript web applications who want to start with best practices
- **Solo developers** needing a robust starting point with quality guardrails
- **AI coding agents** working within a structured, test-driven environment with clear constraints

## Problems Solved

- **Type safety erosion**: Prevents `any` types and unchecked type assertions through strict ESLint rules
- **Testing gaps**: Enforces 100% test coverage and TDD workflow through pre-commit hooks
- **Configuration overhead**: Eliminates setup time for TypeScript, Next.js, tRPC, testing, and linting
- **Quality regressions**: Blocks commits that fail type checking, linting, or tests

## Long-term Direction

This template will evolve to support common full-stack patterns while maintaining zero-compromise quality standards. Future enhancements may include authentication patterns, database migration tools, and deployment configurations—all maintaining the core principle of type safety and comprehensive testing.

## Core Principles

1. **Type Safety is Non-Negotiable** — No `any` types, no `as` casts, Zod validation for all external data
2. **Test-Driven Development Always** — All code changes require tests first, including bug fixes and refactors
3. **Quality Gates Before Commit** — Pre-commit hooks must pass: typecheck, lint, and all tests
4. **Real Database Testing** — Tests use actual PostgreSQL, not mocks, to verify true behavior
5. **Explicit Over Implicit** — Configuration and patterns are visible and documented, not hidden in tooling
