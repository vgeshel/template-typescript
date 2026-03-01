# Personas

## Emma - Full-Stack Developer

**Role:** Senior developer building a new SaaS product

**Goals:**
- Ship features quickly without sacrificing quality
- Maintain type safety across the entire stack
- Avoid runtime errors from API mismatches

**Needs:**
- Clear project structure and conventions
- Fast feedback loops during development
- Confidence that tests prevent regressions

**Pain Points:**
- Previous projects had type safety gaps between frontend and backend
- Manual testing was time-consuming and error-prone
- Inconsistent code quality across team members

**How They Interact:**
Uses the template as a starting point for new projects, extends the tRPC router with new procedures, writes tests before implementing features, relies on pre-commit hooks to catch issues early.

**Success Criteria:**
Ships features with zero production type errors, maintains 100% test coverage, onboards new team members in under a day.

## Alex - AI-Assisted Developer

**Role:** Developer working with Claude Code or similar AI agents

**Goals:**
- Leverage AI for code generation while maintaining quality
- Ensure AI-generated code meets project standards
- Use TDD workflow with AI assistance

**Needs:**
- Explicit contracts and validation rules
- Automated quality gates that reject non-compliant code
- Clear documentation for AI agents (CLAUDE.md)

**Pain Points:**
- AI tools sometimes generate code with `any` types or missing tests
- Need guardrails to ensure AI follows project conventions
- Manual review of all AI code is tedious

**How They Interact:**
Provides requirements to AI agents, relies on TypeScript and ESLint to reject invalid code, uses pre-commit hooks as final validation, reviews test coverage reports.

**Success Criteria:**
AI-generated code passes all quality checks on first attempt, zero manual type fixes needed, maintains TDD discipline with AI assistance.

## Jordan - DevOps Engineer

**Role:** Platform engineer setting up CI/CD pipelines

**Goals:**
- Establish consistent quality standards across projects
- Automate deployment workflows
- Prevent broken code from reaching production

**Needs:**
- Standardized testing and build commands
- Clear separation between dev and production configurations
- Reliable quality metrics (coverage, type safety)

**Pain Points:**
- Different projects have different conventions
- Manual quality checks are unreliable
- CI failures are often mysterious

**How They Interact:**
Uses package.json scripts for CI pipeline stages, monitors test coverage thresholds, configures environment variables via dotenvx, validates builds before deployment.

**Success Criteria:**
Zero-config CI setup, automated deployments only when all checks pass, consistent quality metrics across all projects.
