# Decision Journal

## 2024-01-15: Adopt Bun as Runtime

**Context:** Project needed a JavaScript runtime for development and production. Node.js is the standard choice but has performance limitations and requires additional TypeScript tooling.

**Decision:** Use Bun as the primary runtime for package management, test execution, and script running.

**Rationale:** Bun provides 2-3x faster execution than Node.js, built-in TypeScript support without transpilation, and a better developer experience. The ecosystem has matured sufficiently for production use.

**Alternatives Considered:**
- Node.js — Standard choice but slower and requires ts-node or tsx for TypeScript execution
- Deno — Better TypeScript support than Node but smaller ecosystem and unfamiliar conventions

**Consequences:** Developers must install Bun rather than using Node.js. Some npm packages may have compatibility issues, though this is increasingly rare.

## 2024-01-15: Choose tRPC Over REST API

**Context:** Template needed an API layer between frontend and backend. Traditional REST APIs require manual type synchronization and code generation.

**Decision:** Use tRPC for all client-server communication.

**Rationale:** tRPC provides end-to-end type safety without code generation. The `AppRouter` type is automatically shared between client and server, catching integration errors at compile time. This eliminates entire classes of bugs.

**Alternatives Considered:**
- REST API — Requires manual type definitions and OpenAPI schema maintenance
- GraphQL — Adds significant complexity and requires schema definition language

**Consequences:** Developers must learn tRPC patterns. External consumers cannot easily call the API (but this template is not designed for public APIs).

## 2024-01-15: Enforce 100% Test Coverage

**Context:** Many projects start with good test coverage but it degrades over time as developers skip tests for "quick fixes."

**Decision:** Configure Vitest with 100% coverage thresholds for statements, branches, functions, and lines.

**Rationale:** Strict coverage requirements enforce test-driven development. Tests serve as living documentation and prevent regressions. The short-term slowdown is worth the long-term reliability.

**Alternatives Considered:**
- 80% threshold — Commonly recommended but allows uncovered edge cases to accumulate
- No coverage requirement — Leads to inconsistent testing practices across the codebase

**Consequences:** Development velocity decreases initially. Trivial code (like getters) requires test coverage. Teams must commit to TDD workflow.

## 2024-01-15: Block All `any` Types

**Context:** TypeScript's `any` type creates holes in type safety. Developers use it as an escape hatch when proper typing is difficult.

**Decision:** Configure ESLint to block all `any` types with the `@typescript-eslint/no-explicit-any` rule set to error.

**Rationale:** Allowing `any` defeats the purpose of TypeScript. Proper types (including `unknown` for truly dynamic data) force developers to think about data shapes and handle edge cases.

**Alternatives Considered:**
- Allow `any` in specific cases — Creates inconsistency and encourages overuse
- Use `unknown` everywhere — Better than `any` but still requires explicit narrowing

**Consequences:** Developers must learn proper TypeScript patterns (discriminated unions, type guards, Zod validation). Integration with untyped libraries requires wrapper types.

## 2024-01-15: Use SuperJSON for tRPC Serialization

**Context:** Standard JSON serialization cannot handle JavaScript types like Date, Map, Set, BigInt, undefined, and RegExp. This causes bugs when these types cross the API boundary.

**Decision:** Configure tRPC to use SuperJSON as the transformer.

**Rationale:** SuperJSON extends JSON to support all common JavaScript types, preventing serialization errors. The overhead is minimal (a few hundred bytes and microseconds per request).

**Alternatives Considered:**
- Standard JSON — Would require manual date string parsing and forbid using Map/Set
- Custom transformer — Reinventing serialization is error-prone

**Consequences:** Slightly larger payload sizes. Client and server must both use SuperJSON. Types like Date work transparently across the API.

## 2024-01-15: Require Pre-commit Hooks

**Context:** Quality checks are useless if developers can bypass them. Optional hooks are inevitably skipped under time pressure.

**Decision:** Use Husky to enforce pre-commit hooks that run type checking, lint exception checking, and ESLint. Configure as required dependency, not optional.

**Rationale:** Required hooks ensure every commit meets quality standards. Issues are caught locally before reaching CI or code review.

**Alternatives Considered:**
- Optional hooks — Developers bypass them when rushing
- CI-only checks — Issues discovered too late, after code is pushed

**Consequences:** Commits take longer (15-30 seconds for quality checks). Developers must fix issues immediately rather than deferring to later.

## 2024-01-15: Disable Test Parallelism

**Context:** Vitest supports parallel test execution for speed, but this causes database connection issues when tests share a database.

**Decision:** Configure all test scripts with `--no-file-parallelism` flag.

**Rationale:** Database tests require sequential execution to avoid connection pool exhaustion and race conditions. Reliability is more important than test speed.

**Alternatives Considered:**
- Parallel tests with separate databases — Complex setup and resource-intensive
- Mock database in tests — Loses confidence that tests reflect production behavior

**Consequences:** Tests run slower (10-30 seconds instead of 2-5 seconds). Teams with large test suites may need to revisit this decision.
