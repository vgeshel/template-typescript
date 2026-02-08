# Personas

## Alex — Senior Full-Stack Developer

**Role:** Lead developer building a production SaaS application

**Goals:**
- Ship features quickly without infrastructure setup
- Maintain zero runtime type errors
- Establish code quality standards for the team

**Needs:**
- Pre-configured database, API, and testing infrastructure
- Strict type safety enforcement at build time
- Clear patterns for common operations (database transactions, API endpoints)

**Pain Points:**
- Wasted time configuring TypeScript, ESLint, testing, and pre-commit hooks
- Team members bypassing type safety with `any` or `as` casts
- Code quality regressions slipping through review

**How They Interact:**
- Clones the template to start new projects
- Extends tRPC router with new endpoints
- Adds database migrations as features evolve
- Relies on pre-commit hooks to block quality issues

**Success Criteria:**
- Zero setup time to first feature commit
- All team members follow consistent patterns
- Production deploys with confidence due to comprehensive tests

## Casey — AI Coding Agent

**Role:** Automated developer working within Claude Code or similar tools

**Goals:**
- Understand project structure and constraints
- Generate code that passes all quality checks
- Follow TDD workflow without human intervention

**Needs:**
- Explicit rules documented in CLAUDE.md
- Deterministic tooling that fails fast on errors
- Clear feedback when quality standards are violated

**Pain Points:**
- Ambiguous requirements leading to wasted iterations
- Non-deterministic test failures
- Manual intervention required to bypass quality checks

**How They Interact:**
- Reads CLAUDE.md for project constraints
- Runs `bun typecheck && bun lint && bun test:run` after every change
- Writes tests first, then implementation
- Blocked by pre-commit hooks when attempting to use `any` or ESLint exceptions

**Success Criteria:**
- All generated code passes quality checks on first attempt
- Tests are deterministic and fast
- No human intervention needed to fix type errors or test failures

## Morgan — Junior Developer

**Role:** New team member learning TypeScript and Next.js

**Goals:**
- Learn best practices through working code examples
- Understand testing patterns and TDD workflow
- Contribute features without breaking existing functionality

**Needs:**
- Well-documented patterns with examples
- Fast feedback loop (tests run in watch mode)
- Guardrails preventing common mistakes

**Needs:**
- Clear error messages when violating quality standards
- Examples of common patterns (tRPC endpoints, database queries, component tests)
- Pre-commit hooks catching mistakes before pushing

**Pain Points:**
- Overwhelming number of configuration files and tools
- Unclear which testing approach to use
- Accidentally shipping code with type errors

**How They Interact:**
- Runs `bun dev` and `bun test` in watch mode
- Reads existing tests to understand patterns
- Uses ESLint errors as learning opportunities
- Blocked by pre-commit hooks when attempting shortcuts

**Success Criteria:**
- Understands TDD workflow within first week
- Writes type-safe code without relying on `any`
- Confident submitting pull requests knowing tests pass
