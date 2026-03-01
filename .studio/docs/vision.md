# Vision

## Purpose

This is a production-ready TypeScript template for building type-safe Next.js applications with strict quality standards. It provides a foundation for teams that prioritize correctness, maintainability, and developer experience through comprehensive tooling and guardrails.

## Users

- **Development teams** building modern web applications who want type safety and quality enforcement out of the box
- **Solo developers** seeking a battle-tested starting point with best practices baked in
- **AI-assisted development workflows** requiring explicit contracts and TDD patterns

## Problems Solved

- **Type safety gaps**: Eliminates `any` types and unsafe casts through ESLint enforcement and Zod validation
- **Quality regression**: Pre-commit hooks ensure code quality, type checking, and test coverage before commits reach the codebase
- **API type mismatches**: tRPC provides end-to-end type safety from browser to server
- **Inconsistent patterns**: Standardized architecture and testing patterns reduce cognitive load

## Long-term Direction

Evolve into a comprehensive foundation for building production TypeScript applications with PostgreSQL backends, expanding integration patterns, authentication scaffolding, and observability tooling while maintaining zero-compromise type safety and test coverage standards.

## Core Principles

1. **Type safety is non-negotiable** — No `any` types, no `as` casts. Use Zod for runtime validation.
2. **Test-driven development for all changes** — Features, fixes, and refactors must have tests written first.
3. **Quality gates are immutable** — Pre-commit hooks (typecheck, lint, tests) must pass. Never use `--no-verify`.
4. **Explicit over implicit** — External data validation, structured logging, and clear contracts trump convenience.
5. **Developer experience through automation** — Tooling enforces correctness so developers can focus on features.
