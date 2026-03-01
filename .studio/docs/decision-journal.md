# Decision Journal

This is an append-only, chronologically ordered log of significant technical decisions. Do not edit or remove entries—only append new ones.

---

## 2024-01-15: Bun Runtime Over Node.js

**Context:** Template needed a JavaScript runtime. Node.js is standard but has slow package installation and requires transpilation for TypeScript.

**Decision:** Use Bun as the runtime for development, testing, and production.

**Rationale:**
- 10-25x faster package installation than npm/yarn
- Native TypeScript support without separate transpilation step
- Drop-in replacement for Node.js with better performance
- Built-in test runner (though we chose Vitest for better ecosystem compatibility)

**Alternatives Considered:**
- Node.js — Standard choice but slow and requires additional tooling
- Deno — Secure-by-default but incompatible with much of npm ecosystem

**Consequences:**
- Faster developer setup and CI pipeline
- Some npm packages may have compatibility issues
- Team must install Bun (one-line install script)

---

## 2024-01-20: tRPC Instead of REST or GraphQL

**Context:** Need type-safe API layer between Next.js frontend and backend.

**Decision:** Use tRPC for all client-server communication.

**Rationale:**
- End-to-end type safety without code generation
- TypeScript types are automatically shared between client and server
- Simpler than GraphQL for TypeScript-only projects
- Eliminates API contract drift—breaking changes cause immediate TypeScript errors

**Alternatives Considered:**
- REST APIs — Require manual type synchronization or OpenAPI code generation
- GraphQL — More complex setup, overkill for TypeScript full-stack apps
- Server Actions — Next.js feature but less mature, unclear separation of concerns

**Consequences:**
- Excellent developer experience with autocomplete and type checking
- Cannot expose APIs to non-TypeScript clients without additional layer
- Request batching reduces network overhead

---

## 2024-01-22: 100% Test Coverage Requirement

**Context:** Many projects start with coverage goals but let them slip over time, leading to production bugs.

**Decision:** Enforce 100% test coverage for statements, branches, functions, and lines in Vitest configuration.

**Rationale:**
- Coverage below 100% creates ambiguity about what needs testing
- Uncovered code paths are production incidents waiting to happen
- Forces developers to think about edge cases
- Makes refactoring safer

**Alternatives Considered:**
- 80% coverage threshold — More flexible but creates "testing debt" zones
- No coverage requirements — Relies on developer discipline
- Per-file coverage — Allows some files to have gaps

**Consequences:**
- Higher initial development effort
- Some developers may find it restrictive
- Extremely high confidence in refactoring
- Bugs caught during development, not production

---

## 2024-01-25: Strict TypeScript with No Escape Hatches

**Context:** TypeScript's type safety can be undermined by `any` types and type assertions (`as`).

**Decision:** Prohibit `any` types and `as` casts via ESLint rules. Require Zod validation for external data.

**Rationale:**
- `any` types defeat the purpose of TypeScript
- Type assertions (`as`) are lies to the compiler that cause runtime errors
- Zod validation provides runtime type safety for external data
- Strict enforcement prevents gradual erosion of type safety

**Alternatives Considered:**
- Allow `any` in test files — Rejected because tests need type safety too
- Allow `as` for narrowing — Rejected because type guards are safer
- Optional strict mode — Rejected because enforcement must be automatic

**Consequences:**
- Steeper learning curve for developers used to lax TypeScript
- Forces proper validation at system boundaries
- Near-zero runtime type errors in production
- Excellent autocomplete and refactoring experience

---

## 2024-01-28: Mandatory TDD for All Changes

**Context:** Tests written after implementation often miss edge cases and are influenced by implementation details.

**Decision:** Require TDD (test-first development) for all code changes: features, bug fixes, and refactors.

**Rationale:**
- Writing tests first forces clear thinking about requirements
- Tests written after are often implementation-aware rather than behavior-focused
- Bug fixes need tests to prove the bug exists and that the fix works
- Refactoring without tests is risky

**Alternatives Considered:**
- Tests optional for "small changes" — Rejected because small changes cause production issues
- Tests required but timing flexible — Rejected because developers skip testing when under pressure
- Only require tests for new features — Rejected because bug fixes need tests too

**Consequences:**
- Slower initial development as developers adjust to TDD
- Higher code quality and fewer regressions
- Tests serve as living documentation
- Refactoring becomes safe and frequent

---

## 2024-02-01: Pre-Commit Hooks with No Bypass

**Context:** Code quality checks in CI are too late—broken code already in Git history.

**Decision:** Use Husky to run typecheck, lint, and tests as pre-commit hooks. Prohibit `--no-verify` flag.

**Rationale:**
- Catch issues before they enter version control
- Faster feedback loop than CI
- Prevents "fix CI later" commits
- Forces developers to maintain quality standards

**Alternatives Considered:**
- CI-only checks — Too late, broken commits already in history
- Optional pre-commit hooks — Developers bypass under pressure
- Pre-push hooks instead — Allows local broken commits

**Consequences:**
- Commits take longer (tests must pass first)
- No broken commits in Git history
- CI failures become rare
- Code review focuses on design, not bugs

---

## 2024-02-05: Vitest Over Jest

**Context:** Need a testing framework with good TypeScript and ESM support.

**Decision:** Use Vitest for all testing.

**Rationale:**
- Faster test execution than Jest
- Better ESM support (Jest ESM is experimental)
- Compatible with Vite ecosystem
- Built-in coverage tooling
- Familiar Jest-compatible API

**Alternatives Considered:**
- Jest — Standard choice but slower and ESM support is rough
- Native Bun test runner — Not mature enough, limited ecosystem
- Node.js native test runner — Too basic, no coverage tooling

**Consequences:**
- Fast test execution in watch mode
- Seamless TypeScript support
- Some Jest plugins may not be compatible

---

## 2024-02-10: SuperJSON for tRPC Transformer

**Context:** JSON.stringify loses type information for Date, Map, Set, undefined.

**Decision:** Configure tRPC to use SuperJSON as the data transformer.

**Rationale:**
- Preserves JavaScript types across client-server boundary
- Automatic serialization/deserialization
- No manual date parsing needed
- Handles edge cases like undefined in objects

**Alternatives Considered:**
- JSON (default) — Loses type information, requires manual parsing
- Custom transformer — Reinventing the wheel
- Avoiding complex types — Too restrictive

**Consequences:**
- Dates work seamlessly in tRPC procedures
- Slightly larger payload size
- Better developer experience
