# Glossary

**App Router** — Next.js 13+ routing system based on file-system structure in the `app/` directory, replacing the older Pages Router. Uses Server Components by default.

**Bun** — JavaScript runtime and package manager, used as an alternative to Node.js. Faster than Node for many operations and includes a built-in test runner.

**Coverage Threshold** — Minimum percentage of code that must be covered by tests. This project enforces 100% for statements, branches, functions, and lines.

**ESLint Disable Comment** — Comments like `eslint-disable` or `eslint-disable-next-line` that bypass linting rules. Blocked by pre-commit hooks in this project.

**Flat Config** — ESLint 9+ configuration format using `eslint.config.mjs` instead of `.eslintrc` files. Uses JavaScript arrays and objects instead of JSON.

**Husky** — Git hooks manager that runs scripts before commits and pushes. This project uses it to enforce type checking, linting, and test coverage.

**JSONB** — PostgreSQL's binary JSON data type for storing structured data. Provides better performance than text-based JSON and supports indexing.

**Kysely** — Type-safe SQL query builder for TypeScript. Generates types from database schema and provides compile-time query validation.

**Lint Exception** — Any comment that bypasses linting or type checking (`eslint-disable`, `@ts-ignore`, `@ts-expect-error`). Prohibited in this project to prevent quality erosion.

**Lint-Staged** — Tool that runs linters only on staged Git files, making pre-commit hooks faster. Configured in `package.json`.

**Migration** — SQL script that defines schema changes in a version-controlled, sequential manner. Run with `bun db:migrate`.

**Pino** — High-performance structured logging library for Node.js and Bun. Preferred over `console.log` for production applications.

**Pre-commit Hook** — Git hook that runs before each commit. This project's hook runs type checking, lint exception detection, linting, and full test suite with coverage.

**Procedure** — tRPC's term for an API endpoint. Can be a query (read-only) or mutation (write operation).

**Public Procedure** — tRPC procedure accessible without authentication. This template includes only public procedures.

**React Query** — Data fetching and caching library (also called TanStack Query). Used by tRPC for client-side state management.

**Server Component** — React component that renders on the server and sends HTML to the client. Default in Next.js App Router.

**Strict Mode** — TypeScript configuration with maximum type safety. Includes `noImplicitAny`, `strictNullChecks`, and other strict options.

**SuperJSON** — Library that extends JSON serialization to handle JavaScript types like Date, Map, Set, and BigInt. Used by tRPC for client-server communication.

**TDD (Test-Driven Development)** — Practice of writing tests before implementation code. Enforced by 100% coverage requirement in this project.

**tRPC** — End-to-end type-safe RPC framework for TypeScript. Shares types between client and server without code generation.

**Type Assertion** — TypeScript syntax (`as Type`) that overrides type inference. Banned in this project by ESLint because it bypasses type safety.

**Type Guard** — Function that narrows a type using runtime checks. Preferred over type assertions for validating unknown types.

**Vitest** — Fast unit test framework compatible with Jest API. Powered by Vite for better performance than Jest.

**Zod** — TypeScript-first schema validation library. Provides both runtime validation and type inference from schemas.