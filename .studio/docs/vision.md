# Vision

## Purpose

This is a production-ready TypeScript + Next.js template designed to establish best practices for building type-safe, test-driven web applications. It provides a standardized foundation with strict quality controls, eliminating the need to repeatedly configure tooling and establish coding standards for new projects.

## Users

**Primary Users:**
- Development teams starting new TypeScript web applications who want a battle-tested foundation
- Individual developers who value type safety, test coverage, and code quality enforcement
- Teams using Claude Code or other AI coding assistants who need clear architectural guardrails

**Secondary Users:**
- Organizations standardizing on TypeScript + Next.js patterns across multiple projects
- Open source contributors who want to understand modern TypeScript development practices

## Problems Solved

1. **Inconsistent project setup** — Teams waste time configuring ESLint, TypeScript, testing frameworks, and pre-commit hooks for each new project
2. **Type safety erosion** — Without strict enforcement, `any` types and type assertions (`as`) gradually undermine TypeScript's benefits
3. **Low test coverage** — Projects without enforced TDD culture accumulate technical debt and regression bugs
4. **Quality gate bypass** — Developers using `eslint-disable` or `@ts-ignore` comments circumvent quality checks
5. **Database type drift** — Manual database types fall out of sync with schema migrations, causing runtime errors

## Long-term Direction

This template should remain minimal yet opinionated, providing:
- **Zero-tolerance type safety** — Maintain the ban on `any` types and `as` casts
- **Mandatory TDD** — Keep 100% test coverage requirements enforced by pre-commit hooks
- **Database-first patterns** — Demonstrate best practices for type-safe database interactions
- **AI-friendly architecture** — Clear conventions that AI coding assistants can follow reliably
- **Gradual feature expansion** — Add authentication, authorization, and production deployment patterns as separate branches or examples

The template should remain a starting point, not a framework. Teams should fork and customize it for their needs.

## Core Principles

1. **Type Safety is Non-Negotiable** — TypeScript's value comes from eliminating runtime type errors. Ban `any`, `as`, and validation bypasses. Use Zod for runtime validation of external data.

2. **Test-Driven Development (TDD) Always** — Write failing tests before writing code. Enforce 100% coverage. Tests are specifications that prevent regressions and guide implementation.

3. **Fail Fast with Pre-Commit Hooks** — Catch issues locally before they reach CI/CD. Never allow `--no-verify` bypasses. If hooks fail, fix the issue.

4. **Explicit Over Implicit** — Prefer verbose, searchable code over magic. Use ESLint to enforce consistent patterns. Ban `console.log` in favor of structured logging.

5. **Database Schema as Source of Truth** — Generate TypeScript types from database schema. Keep migrations as the authoritative schema definition. Never hand-write database types.