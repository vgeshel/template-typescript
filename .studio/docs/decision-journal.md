# Decision Journal

This is a chronologically ordered, append-only log of significant architectural and technical decisions. Do not edit or remove existing entries — only append new ones.

## 2024-01-15: Ban Type Assertions (`as` casts)

**Context:** TypeScript allows type assertions with `as` syntax that override the compiler's type inference. These assertions bypass type safety and can lead to runtime errors when the asserted type doesn't match actual runtime values.

**Decision:** Configure ESLint to ban all type assertions with `@typescript-eslint/consistent-type-assertions` rule set to `{ assertionStyle: 'never' }`.

**Rationale:** Type assertions are a code smell indicating insufficient type information. Use Zod validation for external data and type guards for narrowing union types. The temporary convenience of `as` causes long-term pain when types drift from reality.

**Alternatives Considered:**
- Allow `as const` for literal type narrowing — Rejected because ESLint can't distinguish between safe and unsafe uses
- Allow `as` in test files only — Rejected because it creates inconsistent standards

**Consequences:** Developers must use proper type narrowing techniques. Zod validation becomes mandatory for external data. More upfront work but fewer runtime type errors.

---

## 2024-01-15: Enforce 100% Test Coverage

**Context:** Projects with optional test coverage gradually decline as developers skip tests for "small changes" or "obvious code." Once coverage drops below 100%, the threshold becomes arbitrary and continues to decline.

**Decision:** Configure Vitest with 100% coverage thresholds for statements, branches, functions, and lines. Enforce in pre-commit hooks.

**Rationale:** 100% is the only defensible threshold. Any lower number requires explaining why specific untested code is acceptable. Mandatory coverage enforces TDD culture and catches regressions early.

**Alternatives Considered:**
- 90% threshold — Rejected because it allows 10% of code to remain untested with no justification required
- Optional coverage — Rejected because it doesn't create accountability
- Measure coverage but don't enforce — Rejected because metrics without enforcement are ignored

**Consequences:** Every code change requires accompanying tests. Unreachable code must be marked with `/* c8 ignore next */` with justification comments. Development is slower initially but faster over time due to fewer bugs.

---

## 2024-01-15: Block Lint Exception Comments

**Context:** ESLint provides `eslint-disable` comments and TypeScript provides `@ts-ignore` directives to bypass rules. These are intended for rare edge cases but are frequently misused to silence legitimate errors.

**Decision:** Create `scripts/check-lint-exceptions.ts` to detect and block commits containing lint exception comments. Run in pre-commit hooks.

**Rationale:** Exception comments hide problems instead of fixing them. Once added, they persist indefinitely as context is lost. Blocking them forces developers to address root causes.

**Alternatives Considered:**
- Allow exceptions with required justification comments — Rejected because it's unenforceable and justifications degrade over time
- Allow exceptions in specific files — Rejected because it creates escape hatches that undermine the rule

**Consequences:** Developers must fix underlying issues instead of suppressing warnings. Rare legitimate cases require modifying the ESLint configuration itself, creating accountability through team discussion.

---

## 2024-01-18: Use tRPC Instead of REST

**Context:** Internal APIs require maintaining types on both client and server. REST APIs with TypeScript require either manual type definitions (which drift) or OpenAPI code generation (which is complex).

**Decision:** Use tRPC for all internal API communication. Share `AppRouter` type between server and client for end-to-end type safety.

**Rationale:** tRPC eliminates entire category of API bugs through compile-time checks. No need for OpenAPI specs, code generation, or manual type definitions. Changes to API shape cause immediate TypeScript errors.

**Alternatives Considered:**
- REST with OpenAPI codegen — Rejected due to build complexity and generated code maintenance
- GraphQL — Rejected as overkill for internal APIs; adds complexity without benefits
- REST with manual types — Rejected due to inevitable type drift

**Consequences:** Cannot expose public APIs to third parties without adding REST layer. All endpoints must be defined in TypeScript. Worth it for internal type safety.

---

## 2024-01-20: Use Bun Instead of Node.js

**Context:** Node.js is the standard JavaScript runtime but has slow startup times and requires additional tooling (test runner, bundler, TypeScript transpiler).

**Decision:** Use Bun as the runtime, package manager, and test runner.

**Rationale:** Bun provides 2-3x faster startup, built-in TypeScript support, and integrated test runner. Developer experience improvements outweigh ecosystem maturity concerns for new projects.

**Alternatives Considered:**
- Node.js + pnpm + Jest — Rejected due to slow startup and tooling complexity
- Deno — Rejected due to smaller ecosystem and different module system

**Consequences:** Some Node.js-specific packages may not work. Smaller community for troubleshooting. Benefits for greenfield projects outweigh risks. Teams can migrate to Node.js if needed with minimal changes.

---

## 2024-01-22: Adopt Next.js App Router

**Context:** Next.js offers two routing systems: Pages Router (stable, mature) and App Router (new, Server Components).

**Decision:** Use App Router for new projects despite less ecosystem maturity.

**Rationale:** App Router is the future of Next.js. Server Components reduce client-side JavaScript and simplify data fetching. Better to adopt modern architecture now than migrate later.

**Alternatives Considered:**
- Pages Router — Rejected because it's legacy; all new Next.js features target App Router
- Wait for App Router maturity — Rejected because migration costs increase over time

**Consequences:** Some third-party libraries don't support Server Components yet. Steeper learning curve for developers familiar with Pages Router. Long-term benefits justify short-term friction.

---

## 2024-01-25: Externalize Pino from Server Bundle

**Context:** Next.js Turbopack tried to bundle Pino and related packages, causing build failures due to thread-stream test files.

**Decision:** Add `serverExternalPackages: ['pino', 'pino-pretty', 'thread-stream']` to `next.config.ts`.

**Rationale:** Pino includes native modules and test files that break bundlers. Externalizing prevents build errors while maintaining logging functionality.

**Alternatives Considered:**
- Switch to different logger — Rejected because Pino's performance and API are superior
- Fix Turbopack bundling — Rejected because it's outside our control
- Remove structured logging — Rejected because logging is critical for production

**Consequences:** Larger server bundle size. Pino isn't optimized by Next.js bundler. Acceptable trade-off for reliable builds.

---

## 2024-01-28: Run Tests Serially with `--no-file-parallelism`

**Context:** Vitest's default parallel test execution caused database connection pool exhaustion when tests opened multiple database connections simultaneously.

**Decision:** Add `--no-file-parallelism` flag to all test commands in `package.json`.

**Rationale:** Serial execution prevents connection pool exhaustion. While slower than parallel execution, reliability is more important than speed for pre-commit hooks.

**Alternatives Considered:**
- Increase connection pool size — Rejected because it doesn't scale; more tests = more connections
- Use test database per test file — Rejected due to setup complexity and resource usage
- Mock database in tests — Rejected because we want to test real database interactions

**Consequences:** Test suite takes longer to run. For current test count (< 50 tests), impact is negligible (< 5 seconds). Will need to revisit if test count grows significantly.

---

## 2024-02-01: Require Present Continuous Form for Todo Items

**Context:** Todo items have a `content` field describing the task. When a task moves to `in_progress` state, showing "Add authentication" feels incomplete — it doesn't indicate work is happening.

**Decision:** Add `activeForm` field to todo items requiring present continuous tense (e.g., "Adding authentication"). Display `activeForm` when task is `in_progress`, display `content` otherwise.

**Rationale:** UX improvement provides better status visibility. Clear distinction between pending ("Add") and active ("Adding") tasks. Small change with outsized impact on perceived progress.

**Alternatives Considered:**
- Generate active form automatically — Rejected because English grammar is complex; automatic conversion would fail
- Use emoji indicators instead — Rejected because text is more accessible and professional
- Show status label separate from task name — Rejected because it adds visual clutter

**Consequences:** Todo items require two descriptions instead of one. Developers must think about phrasing when creating tasks. Worth it for clearer status communication.

---

## 2024-02-05: Comment Out Database Code by Default

**Context:** Template includes database patterns but requires PostgreSQL installation. Many developers clone template just to explore it and shouldn't need database setup.

**Decision:** Comment out database client initialization in `src/server/db.ts`. Document uncomment step in README.

**Rationale:** Template should work out-of-the-box without external dependencies. Database patterns are visible as examples but don't require installation. Uncomment when actually needed.

**Alternatives Considered:**
- Remove database code entirely — Rejected because database patterns are valuable examples
- Include SQLite for zero-config database — Rejected because production apps typically use PostgreSQL; SQLite patterns don't transfer
- Make database optional via feature flag — Rejected as overengineering for template

**Consequences:** Developers must manually uncomment database code when needed. Clear documentation prevents confusion. Slight friction justified by better out-of-box experience.