# Decision Journal

This is an append-only, chronologically ordered log of significant architectural and technical decisions. Do not edit or remove existing entries.

## 2024-01-15: Adopt Bun as Runtime

**Context:** Node.js package installation and test execution were slow, adding friction to development workflow. Team investigated alternative JavaScript runtimes.

**Decision:** Use Bun as the primary runtime for development, testing, and production deployment instead of Node.js.

**Rationale:**
- Bun provides 2-10x faster package installation compared to npm/pnpm
- Built-in test runner is significantly faster than Jest
- Native TypeScript support eliminates transpilation step
- Built-in bundler reduces dependency count
- Major hosting platforms (Vercel, Railway, Fly.io) now support Bun

**Alternatives Considered:**
- **Node.js with pnpm** — Rejected because test execution and cold start times remained slow
- **Deno** — Rejected because Next.js and tRPC ecosystems have limited Deno support

**Consequences:**
- Deployment platform choices are limited to Bun-compatible hosts
- Some Node.js-first packages may have compatibility issues
- Development and CI pipelines are 3-5x faster
- Smaller ecosystem means more research required for edge cases

## 2024-01-18: Ban All Type Assertions

**Context:** Production bugs were traced to `as` type assertions that bypassed TypeScript's type checking. Assertions created false confidence in code correctness.

**Decision:** Configure ESLint to block all `as` type assertions via `@typescript-eslint/consistent-type-assertions: assertionStyle: never`.

**Rationale:**
- Type assertions tell TypeScript "trust me" without runtime validation
- Every assertion represents a potential type mismatch bug
- Zod validation provides runtime type checking with same ergonomics
- Type guard functions provide explicit narrowing without lying to type system

**Alternatives Considered:**
- **Allow assertions with linter comments** — Rejected because developers would use assertions as escape hatch
- **Ban only in production code** — Rejected because test code bugs still waste time

**Consequences:**
- Developers must use `schema.parse()` or type guard functions for type narrowing
- Some library integration code requires wrapper functions instead of direct casts
- Type errors are caught at runtime with clear validation errors instead of silent corruption
- Learning curve for developers accustomed to assertions

## 2024-01-20: Require 100% Test Coverage

**Context:** Untested code paths caused production bugs. Coverage reports showed 60-70% coverage, but no enforcement mechanism existed.

**Decision:** Configure Vitest with 100% coverage thresholds for statements, branches, functions, and lines. Builds fail if coverage drops below 100%.

**Rationale:**
- Partial coverage creates false sense of testing completeness
- Developers naturally avoid testing edge cases without strict requirements
- 100% threshold makes expectations clear and non-negotiable
- Forces explicit decision to add code (must also add tests)

**Alternatives Considered:**
- **90% threshold** — Rejected because developers would leave the "hard 10%" untested
- **No threshold, rely on code review** — Rejected because coverage drops over time without enforcement

**Consequences:**
- All new code requires corresponding tests before merging
- Refactoring is safer because tests catch regressions immediately
- Developers invest more time in test setup and fixtures
- Some boilerplate code (like simple getters) requires trivial tests

## 2024-01-25: Choose tRPC Over GraphQL

**Context:** Team needed type-safe API layer between Next.js frontend and backend. GraphQL and tRPC were the main contenders.

**Decision:** Use tRPC for all client-server communication instead of GraphQL.

**Rationale:**
- tRPC shares TypeScript types directly without code generation or schema files
- Zero drift between API specification and implementation
- Simpler developer experience for TypeScript-first teams
- React Query integration provides caching and optimistic updates
- No GraphQL server infrastructure needed

**Alternatives Considered:**
- **GraphQL** — Rejected because schema-first development adds overhead and code generation complexity
- **REST with OpenAPI** — Rejected because maintaining OpenAPI specs in sync with implementation is error-prone

**Consequences:**
- API is only accessible from TypeScript clients (no polyglot support)
- Cannot easily expose public API to third parties without REST wrapper
- Excellent DX for internal development
- Less ecosystem tooling (no GraphQL Playground equivalent)

## 2024-02-01: Block Console Logging

**Context:** Production logs were filled with unstructured console.log output, making debugging difficult. No log level control existed.

**Decision:** Configure ESLint to block all console methods (log, error, warn, etc.) in favor of structured Pino logger.

**Rationale:**
- Console logging creates unstructured text output that's hard to query
- No log level filtering without structured logging
- Pino provides JSON output compatible with log aggregation services
- Child loggers enable request-scoped context

**Alternatives Considered:**
- **Allow console in development only** — Rejected because developers would forget to remove before deploying
- **Use winston or bunyan** — Rejected because Pino is faster and has better TypeScript support

**Consequences:**
- Developers must use `logger.info()` instead of `console.log()`
- Quick debugging requires understanding Pino API
- Production logs are structured JSON, queryable by log management tools
- Log levels can be controlled via LOG_LEVEL environment variable

## 2024-02-05: Enforce TDD Workflow

**Context:** Bugs were discovered in production that could have been caught by tests. Developers often skipped writing tests, especially for "simple" changes.

**Decision:** Make test-driven development mandatory for all code changes through:
- Pre-commit hooks that block commits with failing tests
- 100% coverage requirements
- Claude Code skills that guide TDD workflow
- CLAUDE.md documentation emphasizing "write test first"

**Rationale:**
- Tests written after implementation tend to test what the code does, not what it should do
- Writing tests first clarifies requirements before implementation
- Failed tests prove tests are valid before seeing them pass
- TDD workflow catches edge cases during development, not production

**Alternatives Considered:**
- **Optional TDD, rely on code review** — Rejected because reviews cannot enforce process
- **Tests required but can be written after** — Rejected because post-hoc tests miss the value of test-first design

**Consequences:**
- Development feels slower initially but prevents production debugging
- Developers must think through requirements before coding
- Test suite serves as executable specification of behavior
- Learning curve for developers unfamiliar with TDD

## 2024-02-10: Block Lint Exceptions in Pre-commit

**Context:** Developers used `eslint-disable` and `@ts-ignore` comments to bypass quality checks when facing type errors or lint violations.

**Decision:** Create pre-commit script (`scripts/check-lint-exceptions.ts`) that scans git diff for lint exception comments and blocks commits containing them.

**Rationale:**
- Lint exceptions undermine all quality guarantees
- Each exception is a potential bug waiting to happen
- Developers use exceptions as quick fix instead of solving root cause
- Automated blocking prevents exceptions from entering codebase

**Alternatives Considered:**
- **Warn but allow exceptions** — Rejected because warnings are ignored
- **Require exception justification in PR** — Rejected because reviews cannot catch all exceptions

**Consequences:**
- Developers must fix underlying type errors instead of suppressing them
- Integration with poorly-typed libraries requires wrapper functions
- Build never fails due to eslint-disable comments
- Zero technical debt from suppressed errors

## 2024-02-15: Use Kysely Over Prisma

**Context:** Database layer needed type-safe query building. Prisma ORM and Kysely query builder were evaluated.

**Decision:** Use Kysely for type-safe SQL queries instead of Prisma ORM.

**Rationale:**
- Kysely keeps SQL visible, making performance characteristics clear
- Type generation from database schema provides same type safety as Prisma
- No hidden N+1 queries or magic behavior
- Simpler mental model (SQL with types, not object graph)
- Better debugging because generated SQL is visible

**Alternatives Considered:**
- **Prisma** — Rejected because ORM abstraction hides SQL and makes optimization harder
- **Drizzle** — Rejected because ecosystem is smaller and documentation is sparse
- **TypeORM** — Rejected because decorator-based approach is incompatible with functional patterns

**Consequences:**
- Developers must know SQL (not just ORM APIs)
- More verbose than Prisma for simple CRUD operations
- Easier to optimize slow queries because SQL is explicit
- Migrations are TypeScript files with full IDE support

## 2024-02-20: Adopt Vitest Over Jest

**Context:** Jest test suite was slow (45+ seconds for 100 tests) and had configuration friction with ESM and TypeScript.

**Decision:** Migrate from Jest to Vitest for all testing.

**Rationale:**
- Vitest is 3-5x faster than Jest with identical API
- Native ESM support eliminates transpilation configuration
- Better TypeScript integration with type-aware mocking
- Compatible API means Jest knowledge transfers directly
- Built-in coverage with Istanbul integration

**Alternatives Considered:**
- **Jest with SWC transform** — Rejected because speed gains were minimal and configuration remained complex
- **Node.js native test runner** — Rejected because no coverage reporting and limited assertion library

**Consequences:**
- Test suite runs in seconds instead of minutes
- Development workflow is faster with better feedback loops
- Smaller plugin ecosystem than Jest
- Occasional edge case bugs due to newer codebase

## 2024-03-01: Implement Claude Code Skills System

**Context:** AI coding agents (Claude Code) needed structured guidance to follow project patterns. Verbal instructions in conversation were inconsistent.

**Decision:** Create `.claude/` directory structure with rules (constraints) and skills (workflows) to guide AI agent behavior.

**Rationale:**
- Rules in `.claude/rules/` codify non-negotiable constraints (type safety, testing, error handling)
- Skills in `.claude/skills/` provide step-by-step workflows for common tasks (TDD, migrations)
- Hookify files define pre-commit hooks that AI agents respect
- Structured markdown files are easier for AI to parse than scattered comments
- Same documentation serves human and AI developers

**Alternatives Considered:**
- **Comments in code** — Rejected because comments don't provide cross-cutting guidance
- **README only** — Rejected because single document becomes too long and hard to navigate
- **Wiki or Notion** — Rejected because external documentation drifts from code

**Consequences:**
- AI agents follow consistent patterns across sessions
- New human developers can read same guidance for onboarding
- Rules must be maintained as project evolves
- `.claude/` directory grows to 20+ files requiring organization
