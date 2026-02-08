# Vision

## Purpose

This is a production-ready TypeScript + Next.js + PostgreSQL template designed to accelerate new project development with best-in-class type safety, testing practices, and developer experience. The template establishes rigorous quality standards through strict TypeScript configuration, comprehensive ESLint rules, and mandatory test coverage, serving as a foundation for building scalable, maintainable web applications.

## Users

**Primary Users:**
- Development teams starting new TypeScript web applications
- Engineers who value type safety and test-driven development
- Organizations seeking standardized, production-ready project templates
- AI coding agents (Claude Code) working with agentic development workflows

**Secondary Users:**
- Open source contributors learning modern TypeScript best practices
- Technical architects evaluating stack choices for new projects

## Problems Solved

1. **Project Bootstrap Overhead** — Eliminates weeks of configuration by providing pre-configured tooling, linting rules, testing infrastructure, and pre-commit hooks
2. **Type Safety Gaps** — Enforces strict type safety by banning `any` types, `as` casts, and requiring Zod validation for all external data
3. **Code Quality Regression** — Prevents quality erosion through automated pre-commit checks that block lint exceptions, enforce 100% test coverage, and verify type correctness
4. **Inconsistent Testing** — Establishes test-driven development as the default workflow with Vitest integration, real database testing, and comprehensive test utilities
5. **AI Agent Guidance** — Provides structured rules and skills in `.claude/` to enable effective agentic development with AI coding assistants

## Long-term Direction

The template evolves to remain a reference implementation of TypeScript + Next.js best practices:

- **Continuous Modernization** — Track and adopt emerging patterns in the Next.js and TypeScript ecosystems
- **Expanded Stack Coverage** — Add optional integrations for common needs (authentication, payments, monitoring) while maintaining zero-config defaults
- **Improved Developer Experience** — Enhance local development workflows, debugging tools, and error messages
- **AI-First Development** — Refine Claude Code skills and rules to maximize effectiveness of agentic development workflows

## Core Principles

1. **Type Safety Over Convenience** — Never compromise type safety for development speed. Strict TypeScript with no escape hatches prevents entire classes of runtime errors.

2. **Test Everything, Always** — Test-driven development is non-negotiable for all code changes. Tests define correct behavior and protect against regressions.

3. **Fail Fast, Fail Explicitly** — Use comprehensive pre-commit checks to catch issues immediately. Better to block commits than deploy broken code.

4. **Quality by Default** — Make the right thing the easy thing through configuration, automation, and guard rails. Developers inherit strict quality standards without thinking about them.

5. **Documentation as Code** — Rules, workflows, and architectural decisions live as code in `.claude/` and `.studio/` directories, enabling AI agents and human developers to access the same knowledge base.
