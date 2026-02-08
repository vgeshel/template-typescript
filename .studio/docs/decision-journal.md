# Decision Journal

This document records significant architectural and technical decisions made during the project's development. Entries are append-only and chronologically ordered.

---

## 2024-01-15: Enforce 100% Test Coverage from Day One

**Context:** Many projects start with lower coverage targets (70-80%) with the intention of increasing them later. However, this rarely happens in practice, and untested code becomes increasingly difficult to test over time.

**Decision:** Require 100% test coverage (statements, branches, functions, lines) enforced by pre-commit hooks that block commits with lower coverage.

**Rationale:**
- Starting with 100% coverage prevents the "tragedy of the commons" where no one feels responsible for adding tests
- Existing untested code becomes harder to test as it ages and accumulates dependencies
- Teams rarely increase coverage thresholds after setting them low
- Pre-commit enforcement removes the need for manual vigilance

**Alternatives Considered:**
- **Incremental coverage (80% → 90% → 100%)** — Rejected because it allows untested code to enter the codebase, making retroactive testing more difficult
- **Coverage by file instead of global** — Rejected because it allows new files to have low coverage
- **Manual coverage review in PRs** — Rejected because it's error-prone and creates friction in code review

**Consequences:**
- All new code must be tested before it can be committed
- Developers spend more time writing tests upfront
- Code quality and confidence are higher
- Refactoring is safer with comprehensive test coverage
- Certain edge cases require `/* istanbul ignore next */` comments with clear justification

---

## 2024-01-15: Ban Type Assertions (`as` casts)

**Context:** TypeScript allows developers to assert types with `as` casts, which bypass the type checker. This creates opportunities for runtime errors when the asserted type doesn't match actual data.

**Decision:** Ban all type assertions via ESLint rule `@typescript-eslint/consistent-type-assertions: ['error', { assertionStyle: 'never' }]`

**Rationale:**
- Type assertions defeat the purpose of TypeScript by telling the compiler "trust me, I know better"
- Runtime data validation with Zod provides both type safety and runtime guarantees
- Type guards can narrow types safely when validation is unnecessary
- Every `as` cast is a potential runtime error

**Alternatives Considered:**
- **Allow assertions with justification comments** — Rejected because it's impossible to enforce "safe" usage through tooling
- **Allow `as const` assertions** — Rejected for consistency, though `as const` is generally safe
- **Allow assertions in test files only** — Rejected because tests should use the same standards as production code

**Consequences:**
- Developers must use Zod schemas to validate external data: `const data = UserSchema.parse(response)`
- Type narrowing requires type guards: `if (typeof x === 'string') { ... }`
- Migration from existing codebases requires replacing all `as` casts
- Code is more verbose but safer

---

## 2024-01-15: Block Lint Exception Comments

**Context:** ESLint and TypeScript provide exception mechanisms (`eslint-disable`, `@ts-ignore`) that allow developers to bypass quality checks. While occasionally necessary, they often hide real issues or indicate poorly designed code.

**Decision:** Pre-commit hook scans staged changes for lint exception comments and blocks commits containing them.

**Rationale:**
- Exception comments undermine code quality checks
- "Just this once" exceptions accumulate over time
- Most exceptions indicate issues that should be fixed, not suppressed
- Forcing developers to fix underlying problems improves code quality

**Alternatives Considered:**
- **Manual review of exceptions in PRs** — Rejected because it's easy to miss during review and creates friction
- **Allow exceptions with required justification** — Rejected because it's impossible to enforce "good enough" justifications
- **Allow exceptions in specific files** — Partially implemented (script files and docs are excluded)

**Consequences:**
- Developers cannot bypass linting rules with comments
- Issues must be fixed rather than suppressed
- Extremely rare cases require modifying `.eslintignore` or the check script itself
- Higher barrier to "quick fixes" that bypass quality standards

---

## 2024-01-15: Use tRPC Instead of REST or GraphQL

**Context:** API design patterns typically require manual type definitions, code generation, or runtime schema validation. REST requires separate frontend/backend types. GraphQL requires schema definitions and code generation.

**Decision:** Use tRPC for all client-server communication, providing end-to-end type safety without code generation.

**Rationale:**
- tRPC infers types automatically from server procedures
- No need for OpenAPI specs, GraphQL schemas, or manual type definitions
- Zod validation provides both type safety and runtime guarantees
- Smaller bundle size than GraphQL clients
- Better type safety than Next.js Server Actions

**Alternatives Considered:**
- **REST with OpenAPI code generation** — Rejected because it requires maintaining separate schema definitions and running codegen
- **GraphQL with Apollo/urql** — Rejected because it requires schema definitions, adds significant bundle size, and has worse type inference
- **Next.js Server Actions** — Rejected because type inference is limited and requires manual validation

**Consequences:**
- API is TypeScript-only (non-TypeScript clients need alternative APIs)
- Client and server must use the same TypeScript types
- HTTP batching reduces network requests automatically
- API exploration requires tRPC panel or reading code (no GraphQL Playground equivalent)

---

## 2024-01-15: Use Bun Runtime Instead of Node.js

**Context:** Node.js is the standard JavaScript runtime, but Bun provides better performance and developer experience for TypeScript projects.

**Decision:** Use Bun as the runtime for development, testing, and production.

**Rationale:**
- Native TypeScript execution without transpilation
- Faster startup times (2-3x faster than Node.js)
- Built-in test runner with coverage support
- Better developer experience with modern APIs
- Compatible with most npm packages

**Alternatives Considered:**
- **Node.js with ts-node or tsx** — Rejected because it requires separate transpilation step
- **Deno** — Rejected because npm package compatibility is more limited

**Consequences:**
- Some npm packages may have compatibility issues with Bun
- Production deployments must use Bun runtime (or compile to Node.js-compatible output)
- Ecosystem is smaller than Node.js (fewer examples, tutorials)
- Performance benefits outweigh ecosystem maturity concerns

---

## 2024-01-15: Require TDD for All Code Changes

**Context:** Test-Driven Development is often treated as optional or reserved for complex features. However, bugs often occur in "simple" changes that seemed too trivial to test.

**Decision:** Require TDD for all code changes including features, bug fixes, refactors, and "one-line fixes."

**Rationale:**
- Tests written after implementation test what the code does, not what it should do
- Writing tests first clarifies requirements before implementation
- Bug fixes without tests often fail to address root causes
- "Simple" changes cause production issues more often than expected
- TDD is enforced through pre-commit hooks (100% coverage requirement)

**Alternatives Considered:**
- **TDD for features, optional for bug fixes** — Rejected because bug fixes without tests often don't fix the root cause
- **TDD for complex code only** — Rejected because "complex" is subjective and difficult to enforce
- **Manual test review in PRs** — Rejected because it's inconsistent and creates friction

**Consequences:**
- Development feels slower initially (tests written before code)
- Bugs are caught earlier (many during test writing)
- Refactoring is safer with comprehensive test coverage
- Code review focuses on business logic, not "did you write tests?"
- Developers must learn TDD workflow if unfamiliar

---

## 2024-01-15: Use Kysely Instead of Prisma for Database Access

**Context:** Most TypeScript projects use Prisma for database access. Prisma provides automatic migrations and type generation, but hides SQL and limits control over queries.

**Decision:** Use Kysely for type-safe database queries with explicit SQL.

**Rationale:**
- Kysely provides type safety without hiding SQL
- Developers have full control over queries (important for performance optimization)
- No runtime overhead or code generation at build time
- Database-specific features (indexes, triggers, constraints) are easier to use
- Migrations are explicit SQL, not auto-generated code

**Alternatives Considered:**
- **Prisma** — Rejected because it hides SQL, auto-generates migrations that can be incorrect, and has runtime overhead
- **Drizzle** — Rejected because it's less mature and has fewer examples
- **Raw SQL with manual types** — Rejected because it's error-prone and loses type safety

**Consequences:**
- Developers must write migrations manually (more work, but more control)
- Must run `bun db:codegen` after schema changes to regenerate types
- Queries are more verbose than Prisma's query builder
- Full SQL knowledge is required (not abstracted away)

---

## 2024-01-15: Enforce Strict TypeScript Mode

**Context:** TypeScript strict mode enables multiple type checking flags that catch common bugs. However, strict mode can be inconvenient when migrating existing JavaScript code.

**Decision:** Enable `strict: true` in tsconfig.json and enforce it permanently.

**Rationale:**
- Strict mode catches entire classes of bugs at compile time
- Non-strict TypeScript provides limited value over JavaScript
- Starting strict is easier than migrating later
- Modern TypeScript projects default to strict mode

**Alternatives Considered:**
- **Incremental strict mode adoption** — Rejected because this is a greenfield template with no legacy code
- **Optional strict mode** — Rejected because it defeats the purpose of the template

**Consequences:**
- All code must handle `null` and `undefined` explicitly
- Function parameters and return types are required in most cases
- Implicit `any` types are not allowed
- Developers unfamiliar with strict mode may have a learning curve