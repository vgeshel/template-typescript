# Vision

## Purpose

This project is a production-ready TypeScript application template that provides a strictly-typed, test-driven foundation for building Next.js web applications. It serves as a starting point for teams who want to build reliable, maintainable software with comprehensive quality guardrails built in from day one.

## Users

**Primary Users:**
- Development teams building full-stack TypeScript web applications
- Teams committed to test-driven development and 100% code coverage
- Organizations that value type safety, code quality, and preventative quality checks
- AI-assisted development workflows (Claude Code and similar tools)

**Secondary Users:**
- Individual developers learning rigorous software engineering practices
- Teams evaluating modern TypeScript stack patterns
- Organizations seeking to standardize project templates

## Problems Solved

1. **Setup Friction**: Eliminates the weeks of configuration and tooling decisions required to start a new project with best practices
2. **Quality Gaps**: Prevents common quality issues by making guardrails non-negotiable through pre-commit hooks
3. **Type Safety Erosion**: Blocks escape hatches (`any` types, `as` casts, linting disables) that undermine TypeScript's guarantees
4. **Test Coverage Decay**: Enforces 100% test coverage from the start, preventing the "we'll add tests later" trap
5. **Inconsistent Standards**: Provides a single source of truth for patterns, conventions, and workflows

## Long-term Direction

This template will evolve to:
- Remain current with latest stable versions of Next.js, React, and TypeScript
- Expand skill library for common development patterns (database migrations, API design, deployment)
- Provide reference implementations for common architectural patterns
- Serve as a living example of maintainable, well-tested TypeScript code
- Support both human and AI developer workflows with clear, executable guidance

The template prioritizes **reliability over convenience** and **prevention over detection**. Features that compromise these principles will not be added.

## Core Principles

1. **No Escape Hatches**: Type safety and quality guardrails cannot be disabled. If the checks fail, fix the underlying issue rather than suppressing the warning.

2. **Test-Driven Always**: All production code must have tests written first. No exceptions. The test proves the feature works; the lack of a test proves nothing.

3. **100% Coverage Non-Negotiable**: Code coverage thresholds are locked at 100% for all metrics (statements, branches, functions, lines). Coverage decay indicates insufficient testing.

4. **Explicit Over Implicit**: Configuration, types, and behavior should be clear and discoverable. Magic and convention are acceptable only when they reduce complexity without hiding behavior.

5. **Fail Fast, Fail Loud**: Problems should be caught at the earliest possible moment (compile time > pre-commit > CI > production). Pre-commit hooks enforce what CI would catch.