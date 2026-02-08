# Vision

## Purpose

This project is a production-ready TypeScript application template that serves as a foundation for building type-safe, full-stack web applications. It provides developers with a robust starting point that enforces quality standards through automated tooling, ensuring code correctness and maintainability from day one.

## Users

**Primary Users:**
- Full-stack developers building new TypeScript applications
- Development teams establishing standardized project structures
- Organizations requiring strict type safety and code quality guarantees
- AI coding agents (like Claude Code) working within structured codebases

**Secondary Users:**
- Open-source contributors exploring modern TypeScript patterns
- Educators teaching production-grade web development practices

## Problems Solved

1. **Configuration Fatigue** — Eliminates the overhead of setting up TypeScript, linting, testing, and pre-commit hooks from scratch
2. **Type Safety Erosion** — Prevents gradual degradation of type safety through strict enforcement of no `any` types and no `as` casts
3. **Quality Ratcheting** — Maintains 100% test coverage by blocking commits that lower coverage thresholds
4. **Inconsistent Patterns** — Provides opinionated defaults for logging, API design, and data validation
5. **Runtime vs. Compile-Time Gaps** — Bridges type safety between frontend and backend using tRPC and Zod validation

## Long-term Direction

This template evolves toward being a **zero-compromise development environment** where code quality is maintained through automation rather than discipline. Future enhancements will focus on:

- Expanding patterns for common features (authentication, authorization, background jobs)
- Integrating observability and monitoring best practices
- Providing migration paths for scaling architecture (modularization, microservices)
- Deepening AI agent integration through enhanced skills and workflows

The template remains intentionally minimal, including only foundational elements that apply to virtually all web applications.

## Core Principles

1. **Type Safety Without Escape Hatches** — No `any` types or `as` casts are permitted. Type safety must be achieved through proper validation and type guards, never through suppression.

2. **Test-Driven Development for All Changes** — Every code change, including bug fixes and refactors, requires tests written first. Tests prove bugs exist before fixes, and prevent regressions.

3. **Quality Ratcheting Through Automation** — Code quality can only improve, never degrade. Pre-commit hooks enforce typecheck, lint, test coverage at 100%, and block lint exception comments.

4. **External Data Validation at Boundaries** — All data from external sources (client input, API responses, environment variables) must be validated with Zod before use.

5. **Explicit Over Implicit** — Configuration, dependencies, and patterns are explicit and discoverable. Magic is minimized in favor of clarity.