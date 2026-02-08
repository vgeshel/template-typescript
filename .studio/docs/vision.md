# Vision

## Purpose

This template provides a production-ready foundation for building type-safe full-stack TypeScript applications with Next.js. It eliminates the friction of configuring best practices, allowing developers to focus on building features instead of infrastructure setup.

## Users

- **Application Developers** building full-stack web applications
- **Development Teams** standardizing on TypeScript and Next.js
- **AI Agents** working with structured, well-tested codebases
- **Open Source Contributors** seeking a reference implementation of modern TypeScript practices

## Problems Solved

**Setup Complexity**: Eliminates days of configuration by providing pre-integrated tooling (tRPC, Vitest, ESLint, Prettier, Husky).

**Type Safety Gaps**: Enforces end-to-end type safety through strict TypeScript, no-any rules, Zod validation, and tRPC.

**Quality Assurance**: Embeds quality gates through pre-commit hooks, 100% coverage thresholds, and TDD workflow guidance.

**Runtime Inconsistency**: Provides Bun-optimized scripts and PostgreSQL integration patterns from day one.

## Long-term Direction

Evolve into the canonical TypeScript template for AI-assisted development by continuously refining the integration between human and agentic workflows, demonstrating that strict constraints enable higher velocity.

## Core Principles

**Type Safety First**: No escape hatches. Every `any` or `as` cast represents a failure. External data must be validated with Zod.

**Test-Driven Development**: Tests define correctness. Code without tests is unverified assumptions waiting to break in production.

**Fast Feedback Loops**: Run typecheck, lint, and tests on every change. Catch issues in seconds, not hours.

**Explicit Over Implicit**: Configuration and dependencies must be auditable. No magic, no assumptions.

**Quality as Infrastructure**: Pre-commit hooks and coverage thresholds are not optional—they are the safety net that enables confident iteration.
