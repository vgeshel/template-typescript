# Decision Journal

This journal records significant architectural and technical decisions in chronological order. Entries are append-only—never edit or remove existing entries.

---

## 2024-01-15: Adopt Bun as Runtime

**Context**: Node.js package installation is slow (~2-3 minutes for fresh install), and TypeScript requires ts-node or build steps for execution.

**Decision**: Use Bun as the JavaScript runtime and package manager.

**Rationale**: Bun provides 3x faster package installation, native TypeScript execution without transpilation, and built-in test runner with Jest-compatible API. Next.js and tRPC have excellent Bun compatibility with zero known issues.

**Alternatives Considered**:
- Node.js + npm: Standard but slow, requires ts-node for TypeScript
- Node.js + pnpm: Faster than npm but still requires ts-node
- Deno: Better TypeScript support but incompatible with npm ecosystem and Next.js

**Consequences**: Deployment environments must support Bun or require adaptation for Node.js. Developer experience improved significantly with instant TypeScript execution.

---

## 2024-01-15: Use tRPC Instead of REST or GraphQL

**Context**: Need type-safe API layer between Next.js frontend and backend without manual type synchronization.

**Decision**: Adopt tRPC for all API endpoints.

**Rationale**: tRPC provides end-to-end type safety through TypeScript inference with zero code generation. Changes to procedure types automatically flow to client callers, eliminating API boundary as source of type errors. Lighter weight than GraphQL with better TypeScript integration.

**Alternatives Considered**:
- REST APIs: Require manual type synchronization, prone to drift
- GraphQL: Requires schema-first design, code generation, and additional tooling complexity
- OpenAPI/Swagger: Code generation slow and types often incomplete

**Consequences**: Team must learn tRPC patterns. Cannot easily expose API to non-TypeScript clients (mobile apps, third-party integrations) without additional REST/GraphQL wrapper.

---

## 2024-01-16: Enforce 100% Test Coverage

**Context**: Partial test coverage creates false confidence. Untested code paths represent unverified assumptions.

**Decision**: Set Vitest coverage thresholds to 100% for statements, branches, functions, and lines.

**Rationale**: 100% coverage forces teams to think through edge cases and error handling. Lower thresholds invite "coverage gaming" where tests exist but don't verify behavior. Strict threshold makes testing non-negotiable.

**Alternatives Considered**:
- 80% coverage: Industry standard but allows gaps
- 90% coverage: Better but still permits untested paths
- No threshold: Relies on developer discipline

**Consequences**: Initial feature development slightly slower as tests must be written first. Refactoring becomes faster since comprehensive tests catch regressions immediately.

---

## 2024-01-16: Block ESLint Disable Comments

**Context**: `eslint-disable` comments allow developers to bypass rules locally, leading to inconsistent code quality.

**Decision**: Pre-commit hook runs `check-lint-exceptions.ts` script that blocks any commits containing eslint-disable comments.

**Rationale**: If a rule is problematic, it should be changed globally in ESLint config, not bypassed per-file. Disabling rules locally hides problems and creates inconsistency.

**Alternatives Considered**:
- Allow eslint-disable with justification comments: Still permits local exceptions
- Manual code review enforcement: Inconsistent and error-prone
- No restriction: Leads to rule bypass proliferation

**Consequences**: Developers cannot bypass ESLint rules. If a rule is truly problematic, must update ESLint config and justify the change to team.

---

## 2024-01-17: Prohibit Any Types and As Casts

**Context**: TypeScript `any` type and `as` casts bypass type checking, creating runtime type errors.

**Decision**: ESLint rules `@typescript-eslint/no-explicit-any` and `@typescript-eslint/consistent-type-assertions` (as: "never") block these patterns entirely.

**Rationale**: `any` represents "I don't know the type," introducing type unsafety. `as` casts tell the compiler "trust me," but runtime data doesn't respect type assertions. Zod validation provides safe alternative for external data.

**Alternatives Considered**:
- Allow `any` with justification: Developers overuse it
- Allow `as` for specific cases: "Specific cases" become "everywhere"
- Use `unknown` instead of `any`: Better but still permits unchecked casts

**Consequences**: External data (API responses, user input, environment variables) must be validated with Zod schemas. Type definitions require explicit modeling. Learning curve for developers used to escape hatches.

---

## 2024-01-18: App Router Over Pages Router

**Context**: Next.js offers two routing systems: Pages Router (legacy) and App Router (current).

**Decision**: Use App Router exclusively.

**Rationale**: App Router enables React Server Components (zero JavaScript for static content), better streaming SSR, improved data fetching patterns, and server-first architecture. Pages Router is maintenance mode only.

**Alternatives Considered**:
- Pages Router: More mature but legacy, missing Server Components
- Hybrid approach: Increased complexity, team confusion

**Consequences**: Newer paradigm with fewer StackOverflow answers. Server Components require understanding server vs. client boundaries ('use client' directive).

---

## 2024-01-19: Vitest Over Jest

**Context**: Jest's ESM support remains experimental and slow despite years of work.

**Decision**: Use Vitest as test runner.

**Rationale**: Vitest provides Jest-compatible API with native ESM support and ~10x faster execution. API compatibility means Jest knowledge transfers directly. Better Vite integration (though not using Vite for build).

**Alternatives Considered**:
- Jest: Industry standard but ESM support problematic
- Node.js test runner: Immature ecosystem
- Bun's test runner: Incompatible with React Testing Library

**Consequences**: CI and developer machines must have compatible Vitest setup. Some Jest plugins require Vitest equivalents.

---

## 2024-01-20: Structured Logging with Pino

**Context**: `console.log` produces unstructured output difficult to parse in production log aggregation systems.

**Decision**: Use Pino for all logging, forbid console.log via ESLint rule.

**Rationale**: Pino produces JSON logs enabling structured querying. High performance (5-10x faster than Winston). Child loggers bind context (request ID, user ID) to all subsequent log entries.

**Alternatives Considered**:
- Winston: Popular but slower, less TypeScript-friendly
- console.log with JSON.stringify: Manual and inconsistent
- No logging library: Unstructured logs

**Consequences**: All log statements must use `logger.info()`, `logger.error()`, etc. Log aggregation systems (Datadog, Logstash) can parse and query logs effectively.

---

## 2024-01-21: TDD as Non-Negotiable Workflow

**Context**: Tests written after implementation often test what the code does, not what it should do, leading to weak test suites that don't catch regressions.

**Decision**: TDD (test-first development) required for all code changes. CLAUDE.md and .claude/skills/tdd/ enforce this for AI agents.

**Rationale**: Writing tests first forces developers to specify behavior before implementation. Tests become specification, not just verification. 100% coverage threshold ensures TDD compliance.

**Alternatives Considered**:
- Tests after implementation: Tests adapt to code instead of specifying behavior
- Optional testing: Inconsistent coverage, weak test suites
- Integration tests only: Miss edge cases and unit-level logic errors

**Consequences**: Development rhythm changes—think about behavior before typing implementation. Initial velocity may feel slower but refactoring velocity increases dramatically due to test safety net.
