# Personas

## Alex the TypeScript Advocate

**Role:** Senior Full-Stack Engineer

**Goals:**
- Start new projects quickly with best practices already configured
- Enforce type safety across the team without manual code review overhead
- Prevent common TypeScript anti-patterns from entering the codebase

**Needs:**
- Pre-configured ESLint rules that ban `any` and `as` casts
- Automatic type generation from database schema
- Clear documentation on architectural decisions for onboarding new team members

**Pain Points:**
- Tired of repeating the same ESLint configuration across multiple projects
- Frustrated when teammates bypass type checks with `@ts-ignore`
- Spends too much time in code review catching type safety violations

**How They Interact:**
- Forks this template when starting new projects
- Customizes the tRPC router and database schema for their domain
- References CLAUDE.md when working with AI coding assistants
- Points new hires to the Developer Guide for onboarding

**Success Criteria:**
- Zero type safety violations reach production
- New team members can commit code that passes all checks within their first week
- Time from project start to first deployment reduces from days to hours

## Jordan the Quality Guardian

**Role:** Tech Lead / Engineering Manager

**Goals:**
- Maintain 100% test coverage without constant enforcement
- Prevent technical debt from accumulating through quality gate bypasses
- Build a culture where TDD is the default, not an exception

**Needs:**
- Pre-commit hooks that enforce test coverage thresholds
- Scripts that detect and block lint exception comments
- Clear standards documented so all team members know expectations

**Pain Points:**
- Finds `eslint-disable` comments months after they're added, when the original context is lost
- Discovers critical bugs in untested code paths during production incidents
- Struggles to justify "slowing down" development for testing to stakeholders

**How They Interact:**
- Uses this template as the foundation for team's coding standards
- Points to pre-commit hook failures as non-negotiable quality gates
- Shows stakeholders that TDD prevents rework and reduces bug rates
- Reviews the Decision Journal to understand rationale for architectural choices

**Success Criteria:**
- Test coverage never drops below 100% in any commit
- No lint exception comments exist in the codebase
- Post-mortems rarely identify missing tests as root cause

## Casey the Claude Code User

**Role:** Product Engineer (Human or AI)

**Goals:**
- Implement features correctly on the first try
- Understand project conventions quickly when context-switching
- Avoid making changes that break builds or tests

**Needs:**
- Clear, structured documentation that AI coding assistants can parse
- Explicit rules about what is prohibited (not just recommended)
- Working examples of common patterns (tRPC routes, tests, database queries)

**Pain Points:**
- AI assistants suggest outdated patterns or deprecated APIs
- Unclear when to write tests vs. when to write implementation
- Pre-commit hooks fail with cryptic errors, unclear how to fix

**How They Interact:**
- Reads CLAUDE.md to understand project constraints before making changes
- Uses TDD skill when implementing features or fixing bugs
- Follows examples from existing test files when writing new tests
- Runs `bun typecheck && bun lint && bun test:run` before each commit

**Success Criteria:**
- All generated code passes type checking and linting on first attempt
- Tests are written before implementation code automatically
- Pre-commit hooks rarely fail because patterns are followed correctly

## Morgan the Migration Maintainer

**Role:** Backend Engineer / Database Administrator

**Goals:**
- Keep database schema in sync with TypeScript types
- Make schema changes safely without breaking existing code
- Ensure database queries are type-safe and catch errors at compile time

**Needs:**
- Type generation from database schema after migrations
- Clear patterns for writing migrations
- Examples of type-safe database queries

**Pain Points:**
- Manual database types drift from actual schema over time
- Migrations break production because types weren't regenerated
- Unclear how to handle JSONB columns in a type-safe way

**How They Interact:**
- Writes migrations in `migrations/` directory using Kysely
- Runs `bun db:migrate` followed by `bun db:codegen` after schema changes
- Uses generated types from `src/server/db-types.ts` in application code
- Never hand-writes database types to avoid drift

**Success Criteria:**
- TypeScript compiler errors immediately after schema changes are detected
- JSONB data is properly typed on read and write
- Migrations are reversible and tested before production deployment