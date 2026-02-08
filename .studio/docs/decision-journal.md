# Decision Journal

This journal is append-only and chronologically ordered. Do not edit or remove existing entries.

---

## 2024-01-15: Enforce Strict Type Safety with ESLint Rules

**Context:** TypeScript allows escape hatches like `any` types and `as` casts that undermine type safety and allow runtime errors to slip through.

**Decision:** Configure ESLint to block `any` types and `as` casts completely. Require Zod validation for external data instead of type assertions.

**Rationale:** Type safety is only valuable if enforced consistently. Allowing escape hatches creates a culture where developers work around the type system rather than embracing it. Runtime errors from type mismatches are costly in production.

**Alternatives Considered:**
- Allow `any` with lint warnings (rejected: warnings are ignored)
- Require explicit comments justifying `any` usage (rejected: still allows unsafe code)

**Consequences:** Higher upfront cost writing Zod schemas, but eliminates entire class of runtime errors. Forces developers to model domain correctly.

---

## 2024-01-20: Adopt Bun Runtime Instead of Node.js

**Context:** Node.js has slow startup time and requires additional tooling (ts-node, tsx) for TypeScript execution. Test suites take longer to run.

**Decision:** Use Bun as the JavaScript runtime and package manager for the entire project. All scripts use `bun` and `bunx` commands.

**Rationale:** Bun provides native TypeScript support without compilation step, faster package installation, and significantly faster test execution. The ecosystem is mature enough for production use.

**Alternatives Considered:**
- Stick with Node.js + pnpm (rejected: slower test execution impacts TDD workflow)
- Use Node.js with Bun as test runner only (rejected: introduces multiple runtimes)

**Consequences:** Developers must install Bun. Some Node.js-specific packages may have compatibility issues. Deployment environments need Bun support.

---

## 2024-02-10: Require 100% Test Coverage

**Context:** Partial test coverage allows untested code paths to enter production. Coverage metrics like 80% give false confidence.

**Decision:** Configure Vitest to require 100% coverage (statements, branches, functions, lines). Build fails if coverage drops below threshold.

**Rationale:** Every line of code has a purpose. If code is worth writing, it's worth testing. 100% coverage forces intentional thinking about edge cases and error handling.

**Alternatives Considered:**
- 90% coverage threshold (rejected: still allows 10% untested code)
- Coverage by file rather than aggregate (rejected: complex to configure)

**Consequences:** Higher test writing burden. Exploratory code must be written outside coverage directories. Forces smaller, more testable functions.

---

## 2024-02-25: Choose tRPC Over REST for API Layer

**Context:** Traditional REST APIs require manual type synchronization between frontend and backend, leading to runtime errors when contracts drift.

**Decision:** Use tRPC for all API communication, leveraging TypeScript inference to automatically share types between client and server.

**Rationale:** tRPC eliminates entire class of API integration bugs. Changes to server procedures immediately surface as TypeScript errors in client code. IDE autocomplete works across network boundary.

**Alternatives Considered:**
- GraphQL with codegen (rejected: requires build step, more complex setup)
- OpenAPI with type generation (rejected: manual schema maintenance)
- REST with manual types (rejected: no compile-time guarantees)

**Consequences:** Requires TypeScript on both client and server. Less suitable for public APIs consumed by third parties. Team must learn tRPC concepts.

---

## 2024-03-05: Block Pre-Commit Hook Bypass

**Context:** Developers sometimes use `git commit --no-verify` to skip pre-commit hooks when rushing to push code, defeating the purpose of quality gates.

**Decision:** Establish project culture explicitly prohibiting `--no-verify`. Document in CLAUDE.md that pre-commit failures must be fixed, not bypassed.

**Rationale:** Pre-commit hooks exist to prevent broken code from entering repository. Allowing bypasses creates technical debt and erodes team trust in codebase quality.

**Alternatives Considered:**
- Technical enforcement blocking --no-verify flag (rejected: not reliably possible with Git)
- Post-commit hooks instead (rejected: allows broken commits into history)

**Consequences:** Developers must fix issues before committing, even if in hurry. May slow down perceived velocity initially, but prevents compounding issues.

---

## 2024-03-20: Integrate Claude Code Skills for TDD

**Context:** AI coding agents often skip writing tests or write tests after implementation, undermining test-driven development benefits.

**Decision:** Create structured skills system in `.claude/skills/` providing procedural guidance for TDD workflow. Document in CLAUDE.md that TDD applies to all code changes.

**Rationale:** AI agents benefit from explicit, step-by-step instructions. Skills codify best practices in machine-readable format, ensuring consistent behavior across agent sessions.

**Alternatives Considered:**
- Rely on general instructions in CLAUDE.md (rejected: too easy for agents to overlook)
- Post-implementation test generation (rejected: tests should define requirements first)

**Consequences:** Requires maintaining skills documentation alongside code. Benefits human developers by codifying workflows. Improves agent reliability.

---

## 2024-04-01: Use Superjson for tRPC Serialization

**Context:** Standard JSON serialization loses type information for Date, Map, Set, causing bugs when these types cross network boundary.

**Decision:** Configure tRPC to use superjson transformer on both client and server, preserving JavaScript types across network.

**Rationale:** Type preservation eliminates manual serialization/deserialization code. Date objects remain Date instances, not strings. Reduces cognitive load and potential bugs.

**Alternatives Considered:**
- Manual serialization in procedures (rejected: error-prone, verbose)
- Use strings for dates with Zod coercion (rejected: loses type information)

**Consequences:** Slightly larger payload size. Both client and server must use superjson. Types like functions and symbols still cannot be serialized.

---

## 2024-04-15: Sequential Test Execution to Prevent Database Contention

**Context:** Parallel test execution causes database connection conflicts and intermittent test failures when multiple tests access shared resources.

**Decision:** Run Vitest with `--no-file-parallelism` flag, executing test files sequentially.

**Rationale:** Test reliability is more important than test speed. Sequential execution eliminates race conditions and makes test failures reproducible.

**Alternatives Considered:**
- Database transaction rollback per test (rejected: complex setup, doesn't solve connection limits)
- Test isolation via unique databases (rejected: resource intensive, slow setup)

**Consequences:** Slower test execution as test suite grows. May require test splitting strategies for large codebases.
