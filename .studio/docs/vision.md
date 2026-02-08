# Vision

## Purpose

This project is a production-ready TypeScript + Next.js template designed to accelerate development of type-safe, full-stack web applications. It provides a curated, opinionated foundation with strict type safety, database integration, and quality assurance tooling pre-configured.

## Users

- **Development teams** building production Next.js applications
- **Individual developers** seeking a batteries-included starting point
- **Organizations** requiring strict type safety and code quality standards
- **AI coding agents** working within structured development environments

## Problems Solved

- **Type safety erosion** — Eliminates `any` types and `as` casts through ESLint enforcement
- **Inconsistent patterns** — Establishes standard patterns for database access, API routing, and testing
- **Setup overhead** — Removes configuration burden for tRPC, PostgreSQL, testing, and pre-commit hooks
- **Quality regression** — Enforces TDD workflow and 100% test coverage through tooling

## Long-term Direction

Serve as the definitive reference implementation for type-safe, test-driven Next.js development. Evolve with the Next.js ecosystem while maintaining zero-compromise quality standards. Enable teams to ship production features immediately without infrastructure setup.

## Core Principles

1. **Type Safety First** — No runtime type exceptions. Use Zod for external data, strict TypeScript everywhere.
2. **Test-Driven Development** — Every code change requires a test first. No exceptions.
3. **Explicit Over Implicit** — Prefer verbose clarity over clever abstractions.
4. **Fail Fast** — Pre-commit hooks block bad code from entering the repository.
5. **No Escape Hatches** — ESLint exceptions and type assertions are blocked to prevent quality erosion.
