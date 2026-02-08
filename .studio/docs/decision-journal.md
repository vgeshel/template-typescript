# Decision Journal

## 2024-01-15: Adopt Bun as Primary Runtime

**Context:** Node.js with npm/yarn has slow package installation and startup times impacting developer experience. TypeScript requires compilation step adding complexity.

**Decision:** Use Bun as the exclusive runtime and package manager for this template.

**Rationale:** Bun provides native TypeScript support eliminating the transpilation step during development. Benchmarks show 2-3x faster package installation compared to npm. Bun's built-in test runner (not used here) and bundler reduce tooling complexity. Developer feedback on Bun's speed is overwhelmingly positive.

**Alternatives Considered:**
- **Node.js + npm** — Standard ecosystem choice but slower and requires separate TypeScript compilation
- **Node.js + pnpm** — Faster than npm but still requires TypeScript tooling and lacks native TypeScript support
- **Deno** — Native TypeScript support but incompatible with Next.js and npm ecosystem

**Consequences:** Some npm packages have incomplete Bun compatibility. Must document Bun as a hard requirement. Gain significant developer experience improvements and faster CI pipelines.

## 2024-01-15: Enforce Zero Escape Hatches for Type Safety

**Context:** TypeScript projects often degrade over time as developers use `any`, `as` casts, and `@ts-ignore` to bypass type checking when under pressure.

**Decision:** Ban `any` types, `as` type assertions, and all TypeScript/ESLint exception comments via ESLint configuration and pre-commit hooks.

**Rationale:** Type safety is the core value proposition of this template. Escape hatches undermine this by allowing runtime type errors. The `check-lint-exceptions.ts` script detects and blocks these patterns in pre-commit, preventing quality erosion. Zod validation and proper type guards provide type-safe alternatives.

**Alternatives Considered:**
- **Allow exceptions with justification comments** — In practice, justifications are rarely reviewed and exceptions accumulate
- **Warn instead of error** — Warnings are ignored, making them ineffective
- **Trust code review** — Reviewers miss these patterns especially in large PRs

**Consequences:** Steeper learning curve for developers unfamiliar with strict TypeScript. Requires more upfront design of type-safe patterns. Eliminates entire class of runtime type errors. Prevents technical debt accumulation.

## 2024-01-15: Require 100% Test Coverage

**Context:** Test coverage thresholds are often set to 80% or lower, allowing uncovered code paths that become sources of production bugs.

**Decision:** Enforce 100% test coverage for statements, branches, functions, and lines via Vitest configuration.

**Rationale:** Untested code is broken code. The cost of production bugs far exceeds the cost of writing tests. 100% coverage ensures every code path has a test documenting its behavior. Makes refactoring safe by catching unintended changes.

**Alternatives Considered:**
- **80% coverage threshold** — Arbitrary number that allows critical paths to go untested
- **No coverage threshold** — Coverage drifts down over time without enforcement
- **Manual coverage review** — Requires discipline and easily forgotten

**Consequences:** Initial development is slower as tests must be written for all code. Refactoring becomes faster and safer. Production bugs decrease significantly. Tests serve as executable documentation.

## 2024-01-15: Choose tRPC Over REST APIs

**Context:** REST APIs require manual synchronization of types between frontend and backend, often via OpenAPI codegen or handwritten types.

**Decision:** Use tRPC as the exclusive API layer, replacing REST endpoints.

**Rationale:** tRPC provides automatic type synchronization from server to client with zero codegen. Procedure definitions serve as both implementation and API contract. SuperJSON serialization handles complex types (Date, Map, Set) automatically. Reduces API bugs caused by type mismatches.

**Alternatives Considered:**
- **REST + OpenAPI codegen** — Requires maintaining OpenAPI specs and running codegen. Types can drift from implementation.
- **GraphQL** — More complex than tRPC, requires schema-first design, and has larger bundle size
- **Server Actions (Next.js)** — Not yet stable, lacks client-side type inference

**Consequences:** TypeScript-only ecosystem (no clients in other languages). Learning curve for developers unfamiliar with RPC patterns. Eliminates entire class of API contract bugs.

## 2024-01-15: Ban Console Logging in Favor of Pino

**Context:** Applications often use `console.log` during development and ship these statements to production where they provide poor observability.

**Decision:** Ban `console.log` via ESLint and require Pino structured logging for all log statements.

**Rationale:** JSON-structured logs with severity levels are parseable by log aggregation systems. Pino is significantly faster than alternatives (5-10x in benchmarks). Enforcing structured logging from the start prevents technical debt. Log levels (`info`, `debug`, `error`) enable filtering in production.

**Alternatives Considered:**
- **Winston** — More flexible but significantly slower, flexibility not needed for most applications
- **Console with wrappers** — Still ships unstructured logs to production
- **Allow console in development** — Leads to console statements accidentally shipping to production

**Consequences:** Developers must learn Pino API (`logger.info()`, `logger.child()`). All logs are JSON which is less readable during development (mitigated with pino-pretty). Production observability significantly improved.

## 2024-01-15: Adopt Kysely Over Prisma for Database Access

**Context:** Database ORMs provide abstraction over SQL but often generate inefficient queries and hide database details.

**Decision:** Use Kysely as the type-safe database client instead of Prisma or other ORMs.

**Rationale:** Kysely provides full SQL control while maintaining type safety through TypeScript types generated from the database schema. Developers write actual SQL queries (via query builder) making performance characteristics visible. No hidden query generation. Type-first approach catches errors at compile time.

**Alternatives Considered:**
- **Prisma** — Abstracts SQL away making it harder to optimize queries, migration system is more opinionated
- **Drizzle** — Similar to Kysely but less mature and smaller ecosystem
- **Raw SQL with manual types** — No type safety, error-prone

**Consequences:** Requires PostgreSQL knowledge (not hidden behind ORM). Migration system is simpler (forward-only). Full control over query performance. Learning curve for developers used to ORMs.

## 2024-01-15: Implement Pre-Commit Hooks as Non-Negotiable Quality Gates

**Context:** Code quality often degrades when developers skip running checks locally before pushing, relying on CI to catch issues.

**Decision:** Implement Husky pre-commit hooks running typecheck, lint exception detection, linting, and formatting on all commits. Block commits that fail any check.

**Rationale:** Shift-left principle — catch issues before they enter the repository. Fast feedback loop (seconds) compared to CI (minutes). Prevents broken code from blocking other developers. Enforces consistent code style automatically.

**Alternatives Considered:**
- **CI-only checks** — Slower feedback, broken code enters repository
- **Git commit message warnings** — Easily ignored by developers
- **Optional hooks** — Developers skip them under time pressure

**Consequences:** Developers cannot bypass quality checks without explicitly using `--no-verify` (which is banned). Slightly slower commit times (3-5 seconds). Cleaner Git history with fewer "fix lint" commits.
