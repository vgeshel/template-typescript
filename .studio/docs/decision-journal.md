# Decision Journal

## 2024-01-15: Adopt Bun as Runtime and Package Manager

**Context:** Node.js + npm/yarn/pnpm tooling requires separate TypeScript compilation step and slower package installation. Development experience suffers from long cold start times.

**Decision:** Use Bun for runtime, package manager, and script executor exclusively.

**Rationale:** Bun executes TypeScript directly without compilation step, installs packages significantly faster, and provides simpler API compatibility with Node.js. Performance improvements justify requiring developers to install Bun rather than assuming Node.js availability.

**Alternatives Considered:**
- Node.js + tsx: Still requires separate transpilation tooling, slower than Bun
- Deno: Different module system and less mature Next.js support
- Keep Node.js: Familiar but slower, loses built-in TypeScript execution

**Consequences:** Developers must install Bun before using template. CI/CD pipelines must use Bun Docker images. Cannot use Node.js-specific APIs without checking Bun compatibility.

## 2024-01-18: Ban Type Assertions with ESLint

**Context:** Type assertions (`as` keyword) bypass TypeScript's type checker and hide bugs. Developers were using assertions to silence type errors rather than fixing root causes.

**Decision:** Configure ESLint `@typescript-eslint/consistent-type-assertions` rule to `assertionStyle: 'never'`, completely prohibiting `as` syntax.

**Rationale:** Type assertions are almost always a code smell. Proper solutions include Zod runtime validation, type guards, or fixing incorrect type definitions. Banning assertions forces developers to handle types correctly.

**Alternatives Considered:**
- Allow assertions with lint comments: Creates inconsistency and exceptions accumulate over time
- Restrict to specific patterns: Partial ban is confusing and still allows workarounds
- Education only: Not enforceable, relies on developer discipline

**Consequences:** Existing code using assertions must be refactored. New features require explicit validation or type guards. Initial learning curve for developers unfamiliar with runtime validation patterns.

## 2024-01-20: Enforce 100% Test Coverage

**Context:** Partial test coverage leads to untested code paths and regression bugs. Optional testing creates ambiguity about what requires tests.

**Decision:** Configure Vitest with 100% threshold for statements, branches, functions, and lines. Tests fail if any metric drops below 100%.

**Rationale:** High coverage ensures all code paths are exercised. Mandatory coverage eliminates "should I test this?" questions. Forces consideration of error handling and edge cases.

**Alternatives Considered:**
- 80% threshold: Allows 20% untested code, defeats purpose
- Coverage by area: Creates complexity in configuration, inconsistent standards
- No threshold: Purely advisory, coverage drifts down over time

**Consequences:** Every line of code requires corresponding test. Developers must test error cases and edge conditions. Setup/refactoring overhead increases. Test suite may include trivial tests for completeness.

## 2024-01-25: Choose tRPC Over REST and GraphQL

**Context:** Need type-safe API layer between Next.js frontend and backend. Options include REST with codegen, GraphQL with codegen, or tRPC with direct TypeScript sharing.

**Decision:** Use tRPC for all API procedures. Export `AppRouter` type from server and import in client for end-to-end type safety.

**Rationale:** tRPC provides type safety with zero codegen, zero runtime overhead, and zero schema language. Types flow directly from TypeScript. Better developer experience than REST or GraphQL in TypeScript monorepos.

**Alternatives Considered:**
- REST with OpenAPI codegen: Requires maintaining separate schema files, codegen step in build pipeline
- GraphQL: Requires learning GraphQL schema language, resolver patterns, and codegen tooling
- Next.js API routes without tRPC: Lose type safety at network boundary

**Consequences:** Cannot generate API documentation from OpenAPI schema. Third-party API consumers need alternative interface (REST gateway). Full benefits only realized in TypeScript codebases.

## 2024-01-28: Disable Test File Parallelization

**Context:** Vitest runs test files in parallel by default for performance. Integration tests using shared database connections were causing intermittent failures due to race conditions.

**Decision:** Add `--no-file-parallelism` flag to all test scripts in package.json.

**Rationale:** Database-driven tests require sequential execution to prevent connection pool exhaustion and transaction conflicts. Parallel test execution within files still enabled for performance.

**Alternatives Considered:**
- Database pooling per test file: Complex setup, requires significant test infrastructure
- Mock database entirely: Loses integration test value, only unit tests remain
- Transaction rollback per test: Does not prevent connection pool issues

**Consequences:** Test suite runs slower than maximum parallel execution. Startup overhead of each test file happens sequentially. Encourages writing fewer, more comprehensive integration tests.

## 2024-02-01: Exclude Pino from Next.js Bundling

**Context:** Next.js was attempting to bundle pino and thread-stream packages, causing build failures related to native modules and test files in dependencies.

**Decision:** Add `pino`, `pino-pretty`, and `thread-stream` to `serverExternalPackages` in `next.config.ts`.

**Rationale:** Pino is server-only code with native dependencies that should not be bundled. Marking as external allows Next.js to require these packages directly at runtime rather than bundling.

**Alternatives Considered:**
- Different logger library: Loses Pino's performance benefits and structured logging features
- Fix bundling with webpack config: Complex and fragile, breaks with Next.js updates
- Client-side logging: Not applicable, need server-side structured logs

**Consequences:** Production deployments must have pino packages in node_modules. Docker images must include these dependencies. Cannot use Pino from client components (acceptable limitation).

## 2024-02-05: Adopt Flat ESLint Configuration

**Context:** Legacy ESLint config format (`.eslintrc.json`) is deprecated. New flat config provides better TypeScript support and simpler rule composition.

**Decision:** Use `eslint.config.mjs` with flat config format. Configure type-aware rules requiring TypeScript project reference.

**Rationale:** Flat config is the future of ESLint and required for ESLint 9+. Better integration with typescript-eslint for type-aware rules. Simpler override patterns and plugin composition.

**Alternatives Considered:**
- Keep legacy config: Deprecated, will break in future ESLint versions
- Wait for ecosystem maturity: Flat config already stable and well-supported
- Disable type-aware rules: Loses valuable type checking in linting

**Consequences:** Requires ESLint 9+ and typescript-eslint 8+. Older ESLint plugins may need flat config adapters. Configuration syntax differs from most online examples.
