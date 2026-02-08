# Project Context

## What This Project Is

A production-ready template for TypeScript + Next.js + PostgreSQL applications with exceptional type safety, test coverage, and developer experience. This is **infrastructure, not an application** — it provides the foundation for building web applications but does not implement any business features.

The template enforces rigorous quality standards through:
- Strict TypeScript with no escape hatches (`any` types and `as` casts are blocked)
- Mandatory 100% test coverage with TDD workflow
- Pre-commit hooks that block commits with type errors, lint violations, or failing tests
- Structured logging with Pino instead of console methods
- Type-safe API layer with tRPC sharing types between client and server

## Current State

**Version:** 0.1.0 (initial template release)

**Maturity:** Production-ready template, actively maintained

**Key Capabilities:**
- Next.js 16 App Router with React 19 server components
- tRPC 11 with SuperJSON for type-safe APIs
- Vitest testing with 100% coverage enforcement
- Kysely integration ready (migrations directory exists but empty)
- Bun runtime for fast package management and test execution
- ESLint flat config with type-aware rules
- Pre-commit hooks for quality enforcement

**Known Limitations:**
- No authentication system (intentionally excluded)
- No UI component library (Tailwind CSS only)
- No database migrations yet (migrations/ directory empty)
- No deployment configuration (platform-agnostic)
- Bun-only (not compatible with Node.js without modifications)

## Why It Exists

**Problem:** Starting new TypeScript projects requires weeks of configuration for tooling, linting, testing, and quality enforcement. Most projects end up with inconsistent standards, partial test coverage, and type safety escape hatches that undermine TypeScript's value.

**Solution:** This template provides a fully-configured foundation with non-negotiable quality standards. Developers can clone the template and start building features immediately, inheriting strict type safety and comprehensive testing infrastructure.

**Target Audience:**
- Teams starting new TypeScript web applications
- Engineers who value type safety and test-driven development
- Organizations seeking standardized project foundations
- AI coding agents (Claude Code) working with agentic development workflows

## Technology Choices

**Runtime:** Bun (not Node.js) — chosen for 2-10x faster package installation and test execution

**Framework:** Next.js 16 with App Router — server components by default reduce client JavaScript

**API Layer:** tRPC — type-safe RPCs without code generation, sharing TypeScript types between client and server

**Database:** PostgreSQL with Kysely — type-safe SQL queries without ORM abstraction

**Testing:** Vitest — 3-5x faster than Jest with better ESM and TypeScript support

**Validation:** Zod — TypeScript-first schemas for runtime validation, integrated with tRPC

**Logging:** Pino — structured JSON logging with configurable levels

## Architectural Philosophy

1. **Type Safety Over Convenience** — No compromises on type safety. ESLint blocks `any` types and `as` casts.

2. **Test Everything, Always** — TDD is mandatory. 100% coverage enforced. Tests define correct behavior.

3. **Fail Fast, Fail Explicitly** — Pre-commit hooks catch issues immediately instead of in CI or production.

4. **Quality by Default** — Automation and guard rails make quality the path of least resistance.

5. **Documentation as Code** — Rules and workflows live in `.claude/` and `.studio/` directories as structured files.

## Project Structure

```
├── app/                    # Next.js App Router (pages, layouts, API routes)
├── src/
│   ├── components/        # React components
│   ├── lib/               # Shared utilities (logger, tRPC client, providers)
│   ├── server/            # Backend code (tRPC router, database)
│   └── test/              # Test utilities
├── scripts/               # Development tools (lint exception checker, coverage validation)
├── migrations/            # Kysely database migrations (currently empty)
├── .claude/               # AI agent rules and skills
└── .studio/               # Living documentation system
```

## Getting Started

See [Developer Guide](developer-guide.md) for detailed onboarding instructions.

**Quick start:**
```bash
bun install
cp .env.example .env.local
createdb myapp
bun dev
```

## Related Documentation

- [Vision](vision.md) — Purpose, users, problems solved, and core principles
- [Architecture](architecture.md) — Architectural patterns and technology rationale
- [Developer Guide](developer-guide.md) — Onboarding and development workflows
- [Decision Journal](decision-journal.md) — Historical record of significant decisions
- [Glossary](glossary.md) — Domain-specific terms and definitions
