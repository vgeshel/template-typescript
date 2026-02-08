# Decision Journal

This journal records significant architectural and technical decisions. Entries are append-only and chronologically ordered.

---

## 2024-01-01: Bun as Primary Runtime

**Context:** Need JavaScript runtime for template. Node.js is standard but Bun offers performance and DX improvements.

**Decision:** Use Bun exclusively, not Node.js

**Rationale:**
- Built-in TypeScript support eliminates transpilation complexity
- Faster cold starts improve developer feedback loops
- Native test runner (Vitest) works without additional configuration
- `bun install` significantly faster than npm/yarn
- Template's purpose is rapid, modern development

**Alternatives Considered:**
- **Node.js** — More mature ecosystem, wider adoption, but requires additional tooling for TypeScript
- **Deno** — Built-in TypeScript and security model, but npm compatibility less mature than Bun

**Consequences:**
- Some npm packages may have Bun compatibility issues
- Smaller community compared to Node.js
- Deployment platforms increasingly support Bun, but not universal

---

## 2024-01-02: Strict Type Safety Enforcement

**Context:** TypeScript projects commonly accumulate `any` types and `as` casts, undermining type safety benefits.

**Decision:** Ban `any` types and `as` assertions via ESLint rules with no exceptions

**Rationale:**
- Type safety erosion always starts with "just this one case"
- Zod runtime validation provides safe alternative to type assertions
- Type guards handle legitimate narrowing needs
- Compiler catches breaking changes only if types are accurate

**Alternatives Considered:**
- **Flexible rules** — Allow `any` in test files or specific scenarios. Rejected because exceptions become precedents.
- **TypeScript strict mode only** — Doesn't prevent `as` casts. Need ESLint to block them.

**Consequences:**
- Complex generic scenarios may require more verbose solutions
- Learning curve for developers accustomed to type assertions
- Increased confidence in refactoring and API changes

---

## 2024-01-03: Real Database Testing Over Mocks

**Context:** Choose between mocking database for fast tests or using real PostgreSQL for accuracy.

**Decision:** Test against real PostgreSQL instances, not mocks

**Rationale:**
- Mocks don't catch query syntax errors, transaction bugs, or schema mismatches
- Real database tests verify actual behavior, not mock expectations
- Modern Docker/PostgreSQL fast enough for practical test execution
- False confidence from passing mock tests worse than slower real tests

**Alternatives Considered:**
- **Mock-based testing** — Faster but doesn't catch integration issues. Would require separate integration test suite anyway.
- **SQLite** — Faster than PostgreSQL but different SQL dialect causes subtle bugs.

**Consequences:**
- Requires PostgreSQL running during development
- Tests slower than pure unit tests (mitigated by Bun's speed)
- Higher confidence in database interactions
- No separate integration test suite needed

---

## 2024-01-04: 100% Test Coverage Requirement

**Context:** Decide coverage threshold for Vitest configuration.

**Decision:** Require 100% statement, branch, function, and line coverage

**Rationale:**
- Untested code is specification gap, not implementation detail
- High coverage standards established at project start easier than retrofitting
- Coverage gaps force explicit decisions about test value
- Quality template should demonstrate quality standards

**Alternatives Considered:**
- **80-90% threshold** — More flexible but arbitrary. Where do you draw the line?
- **No coverage requirement** — Gives flexibility but no forcing function for test completeness.

**Consequences:**
- Complex edge cases may require creative test approaches
- Error handling paths must all be tested
- Developers may need to adjust thresholds for specific contexts
- Comprehensive specification of system behavior

---

## 2024-01-05: tRPC Over REST

**Context:** Need API layer between client and server. Options include REST, GraphQL, tRPC.

**Decision:** Use tRPC for end-to-end type safety

**Rationale:**
- TypeScript types shared automatically between client and server
- Compiler catches breaking changes immediately
- Less boilerplate than REST + OpenAPI
- Integrated with Next.js and React Query
- Template's goal is type safety; tRPC delivers this best

**Alternatives Considered:**
- **REST with OpenAPI** — More standard, better for public APIs, but requires code generation and type synchronization
- **GraphQL** — Flexible querying but adds complexity (schema definition, resolvers, N+1 problems)

**Consequences:**
- Not suitable for public APIs consumed by non-TypeScript clients
- Learning curve for developers unfamiliar with tRPC
- Excellent developer experience for internal TypeScript projects

---

## 2024-01-06: Kysely Over Prisma

**Context:** Choose database library for type-safe queries. Options include Prisma, Kysely, TypeORM, Drizzle.

**Decision:** Use Kysely for type-safe SQL queries

**Rationale:**
- Raw SQL control avoids ORM abstraction leaks
- Type safety without hiding query logic
- No N+1 query surprises
- Generated types from migrations stay in sync
- Lightweight compared to full ORMs

**Alternatives Considered:**
- **Prisma** — More batteries-included (migrations, studio, client generation) but abstracts SQL away and has query optimization edge cases
- **Raw SQL with manual types** — Full control but types drift from schema
- **TypeORM** — Mature but heavy, decorator-based API not idiomatic TypeScript

**Consequences:**
- More verbose queries compared to ORM magic methods
- No automatic migration generation (must write SQL)
- Full query visibility for debugging and optimization

---

## 2024-01-07: Mandatory Pre-commit Hooks

**Context:** Enforce quality standards before code enters version control.

**Decision:** Pre-commit hooks must pass (typecheck, lint, tests) with no `--no-verify` escape hatch

**Rationale:**
- Quality gates after commit (CI) are too late; bad code already in history
- Discipline established by tools, not willpower
- Fast feedback loop catches issues immediately
- Template purpose is demonstrating quality standards

**Alternatives Considered:**
- **Optional hooks** — Gives flexibility but defeats purpose. Developers will bypass when rushed.
- **CI-only checks** — Catches issues but after commit/push, creating noisy history

**Consequences:**
- Cannot commit broken code (even temporarily)
- Must fix quality issues before switching contexts
- Slows commit velocity slightly but improves code quality significantly

---

## 2024-01-08: Colocated Tests

**Context:** Decide test file organization. Options include separate `test/` directory or colocated with source.

**Decision:** Tests live next to source files with `.test.ts` suffix

**Rationale:**
- Reduces friction to write and update tests
- Makes test coverage gaps immediately visible
- Easier to keep tests in sync with implementation changes
- Import paths simpler (relative instead of crossing directories)

**Alternatives Considered:**
- **Separate test directory** — Cleaner file listing but higher maintenance burden and easy to forget tests

**Consequences:**
- More files in source directories
- Test files included in IDE file navigation
- Cannot "hide" low test coverage in distant directory
