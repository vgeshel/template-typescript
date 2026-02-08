# Vision

## Purpose

This project is a production-ready TypeScript template for building type-safe full-stack web applications. It provides a pre-configured foundation with modern tooling, strict quality controls, and development automation to accelerate new project creation.

## Users

- **Solo developers** launching new TypeScript web applications
- **Engineering teams** standardizing their stack across multiple projects
- **AI agents** (via Claude Code) performing automated development tasks

## Problems Solved

- **Boilerplate fatigue**: Eliminates hours of initial setup by providing pre-configured TypeScript, Next.js, tRPC, testing, and quality tooling
- **Type safety gaps**: Enforces end-to-end type safety from database to UI with zero runtime type casts
- **Quality drift**: Prevents code quality regression through pre-commit hooks that enforce type checking, linting, and test coverage
- **Integration complexity**: Simplifies the integration of React Query, tRPC, and Next.js App Router

## Long-term Direction

Evolve into a comprehensive starter template ecosystem supporting additional patterns:
- Database integration patterns (PostgreSQL, migrations, query builders)
- Authentication and authorization templates
- Deployment configurations for major platforms
- Enhanced AI agent automation through expanded Claude Code skills

## Core Principles

1. **Zero compromise on type safety**: No `any` types, no `as` casts—use Zod validation instead
2. **Quality enforced by automation**: Pre-commit hooks block commits that fail type checks, linting, or introduce eslint-disable comments
3. **100% test coverage by default**: Every line of application code must be covered by tests
4. **Convention over configuration**: Opinionated defaults eliminate bikeshedding while remaining flexible where it matters
5. **AI-first development**: Designed for collaboration with AI agents through comprehensive documentation and automation skills
