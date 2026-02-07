# Personas

## Taylor - Senior Full-Stack Developer

**Role**: Lead developer responsible for architecture decisions and code quality

**Goals**:
- Build reliable, maintainable applications that don't break in production
- Establish consistent patterns that the whole team follows
- Reduce time spent debugging type errors and test failures
- Ship features confidently without extensive manual QA

**Needs**:
- Strong type safety guarantees that can't be bypassed
- Comprehensive test coverage to enable safe refactoring
- Automated quality checks that catch issues before code review
- Clear patterns for common tasks (API routes, data validation, logging)

**Pain Points**:
- Team members adding `any` types or `eslint-disable` comments to "move faster"
- Discovering untested edge cases in production
- Inconsistent patterns across different parts of the codebase
- Time wasted on preventable issues in code review

**How They Interact**:
- Clones template to start new projects with quality baked in
- Uses TDD workflow for all feature development
- Relies on pre-commit hooks to enforce standards without manual review
- References CLAUDE.md to understand project conventions

**Success Criteria**:
- Zero production incidents caused by type errors or untested code paths
- Code reviews focus on design rather than catching basic quality issues
- New team members follow established patterns without extensive training

---

## Alex - AI Developer Assistant (Claude Code)

**Role**: Autonomous coding agent assisting with feature implementation and bug fixes

**Goals**:
- Write correct, well-tested code that passes all quality checks
- Follow project-specific patterns and conventions
- Complete tasks without requiring multiple rounds of fixes
- Understand what behaviors are allowed vs. forbidden

**Needs**:
- Explicit guidance on required workflows (TDD, pre-commit checks)
- Clear documentation of architectural patterns and constraints
- Skills that provide step-by-step procedures for complex tasks
- Immediate feedback when violating project rules

**Pain Points**:
- Generic coding advice conflicts with project-specific rules
- Unclear whether to use libraries from training data or current versions
- Accidentally bypassing guardrails without realizing it's forbidden
- Writing code that works but doesn't match project patterns

**How They Interact**:
- Reads CLAUDE.md before making any code changes
- Invokes skills (tdd, systematic-debugging) for guided workflows
- Uses exact commands from documentation rather than improvising
- Follows the TDD cycle: write test, watch it fail, implement, refactor

**Success Criteria**:
- All code passes type checking, linting, and 100% coverage on first try
- Pre-commit hooks succeed without manual intervention
- Code follows established patterns without deviation
- Tests genuinely validate behavior rather than just achieving coverage

---

## Jordan - Junior Developer

**Role**: New team member learning professional development practices

**Goals**:
- Contribute features without breaking existing functionality
- Learn test-driven development and strict TypeScript patterns
- Understand why certain practices are enforced
- Build confidence through clear success criteria

**Needs**:
- Step-by-step guidance for common workflows
- Clear explanations of tool error messages
- Examples of correct patterns to follow
- Fast feedback on mistakes before code review

**Pain Points**:
- Overwhelmed by unfamiliar tools and strict rules
- Uncertain whether tests are "good enough"
- Unsure how to fix type errors without using `as`
- Fear of committing broken code and wasting reviewers' time

**How They Interact**:
- Follows developer guide for onboarding and common tasks
- Runs `bun test` in watch mode while developing
- Uses TDD skill documentation as a checklist
- Learns from pre-commit hook failures

**Success Criteria**:
- Able to implement features independently within first month
- Commits consistently pass pre-commit hooks
- Understands the "why" behind project rules
- Catches own mistakes before asking for help

---

## Morgan - DevOps Engineer

**Role**: Responsible for deployment pipelines and infrastructure

**Goals**:
- Ensure consistent quality standards between local and CI environments
- Minimize CI failures and flaky tests
- Keep deployment process simple and reliable
- Provide fast feedback to developers

**Needs**:
- Local pre-commit checks that match CI exactly
- Deterministic tests that don't rely on external services
- Clear documentation of required environment setup
- Build scripts that work in containerized environments

**Pain Points**:
- Tests that pass locally but fail in CI
- Unclear which environment variables are required
- Long CI pipeline times due to redundant checks
- Debugging environment-specific issues

**How They Interact**:
- Reads README and .env.example for environment setup
- Reviews pre-commit hook to understand what CI should run
- Uses package.json scripts as source of truth for commands
- Verifies database migration workflow

**Success Criteria**:
- CI pipeline mirrors pre-commit checks exactly
- Zero "works on my machine" issues
- Deployment process documented and reproducible
- Fast feedback loop (pre-commit catches issues CI would catch)