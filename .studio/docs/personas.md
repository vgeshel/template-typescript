# Personas

## Alex — TypeScript Application Developer

**Role:** Frontend/Full-stack engineer building production web applications

**Goals:**
- Bootstrap new projects quickly with production-ready tooling
- Write type-safe code without runtime errors
- Ship features confidently without breaking existing functionality
- Maintain high code quality without manual checks

**Needs:**
- Pre-configured TypeScript, ESLint, and testing infrastructure
- Clear documentation of project patterns and conventions
- Fast feedback loops during development
- Automated quality gates that prevent mistakes

**Pain Points:**
- Spending days configuring TypeScript, ESLint, and test infrastructure for new projects
- Discovering type errors or test failures in CI instead of locally
- Inconsistent code quality across team members
- Unclear testing expectations leading to untested edge cases

**How They Interact:**
Alex clones the template repository, runs `bun install`, configures environment variables, and starts building features immediately. They follow the TDD workflow documented in CLAUDE.md, writing tests before implementation. Pre-commit hooks catch issues before they commit, and strict ESLint rules guide them toward type-safe patterns. When stuck, they reference the developer guide for common workflows.

**Success Criteria:**
- Can start building features within 15 minutes of cloning the template
- Pre-commit hooks catch 100% of type errors and lint violations before pushing
- Test coverage remains at 100% without manual tracking
- Deploys confidently knowing tests verify all behavior

## Sam — Engineering Team Lead

**Role:** Technical lead responsible for code quality and team productivity

**Goals:**
- Establish consistent code quality standards across the team
- Reduce production bugs through automated quality checks
- Minimize time spent on code review nitpicks
- Enable junior developers to write production-quality code

**Needs:**
- Automated enforcement of coding standards
- Clear documentation of architectural decisions
- Test coverage visibility and enforcement
- Guidance for onboarding new team members

**Pain Points:**
- Spending code review time on style issues instead of architecture
- Junior developers bypassing quality checks with `eslint-disable` or `@ts-ignore`
- Inconsistent testing practices across the codebase
- Lack of documentation about why certain patterns were chosen

**How They Interact:**
Sam uses this template to standardize new projects across their team. They customize `.claude/rules/` to add team-specific patterns and extend skills for common workflows. The decision journal helps them document architectural choices. Pre-commit hooks automatically enforce standards, freeing them to focus code reviews on business logic and design. They reference the limitations document when team members propose features outside the template's scope.

**Success Criteria:**
- Code reviews focus on architecture and business logic, not style
- New team members productive within their first day using the template
- Zero production bugs from type errors or missing validation
- Team velocity increases by 30% due to reduced configuration overhead

## Claude — AI Coding Agent

**Role:** Autonomous AI assistant building features, fixing bugs, and refactoring code

**Goals:**
- Understand project architecture and conventions automatically
- Follow test-driven development workflows without human intervention
- Make type-safe changes that pass all quality checks
- Learn from codified rules instead of inferring from examples

**Needs:**
- Structured rules in `.claude/rules/` describing constraints and patterns
- Skills in `.claude/skills/` providing step-by-step workflows
- Type definitions and schemas to understand data shapes
- Pre-commit hooks that provide immediate feedback on violations

**Pain Points:**
- Outdated training data about library APIs and best practices
- Ambiguous requirements leading to incorrect implementations
- Lack of structured guidance about project-specific patterns
- No way to verify changes without human review

**How They Interact:**
Claude reads CLAUDE.md to understand inviolable constraints, consults `.claude/rules/` for project-specific patterns, and follows `.claude/skills/tdd/SKILL.md` when implementing features. When making changes, Claude writes tests first, runs `bun test:run` to verify behavior, then runs `bun typecheck && bun lint` before committing. The strict ESLint configuration prevents Claude from using `any` types or bypassing type safety, while decision journals provide historical context about architectural choices.

**Success Criteria:**
- 100% of changes pass pre-commit hooks without human intervention
- All implemented features include comprehensive tests
- Zero type errors or lint violations in committed code
- Can autonomously implement features from requirements documents
