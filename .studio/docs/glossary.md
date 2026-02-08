# Glossary

**App Router** — Next.js 13+ routing system based on the file system, where `app/` directory structure defines routes. Replaces the older Pages Router.

**Bun** — JavaScript runtime and package manager used as the primary execution environment for this project. Faster alternative to Node.js with native TypeScript support.

**Coverage Threshold** — Minimum percentage of code that must be covered by tests. This project enforces 100% coverage for statements, branches, functions, and lines.

**ESLint Exception** — Comments like `eslint-disable` or `@ts-ignore` that bypass linting rules. Blocked by pre-commit hooks to prevent quality erosion.

**Kysely** — Type-safe SQL query builder that generates TypeScript types from database schema. Supports PostgreSQL, MySQL, and SQLite.

**Lint Exception Detection** — Pre-commit script that scans staged changes for comments that disable linting rules, preventing developers from bypassing quality checks.

**Pino** — Fast, structured logger for Node.js/Bun. Used for all logging instead of `console.log`.

**Pre-commit Hook** — Git hook that runs automated checks (typecheck, lint, test coverage) before allowing commits. Enforces quality standards without manual intervention.

**Quality Ratcheting** — Practice of using automation to ensure code quality can only improve over time, never degrade. Implemented through pre-commit hooks and coverage thresholds.

**SSR (Server-Side Rendering)** — Rendering React components on the server before sending HTML to the browser. Next.js provides SSR capabilities.

**SuperJSON** — Library that extends JSON to support JavaScript types like Date, Map, Set, and undefined. Used by tRPC for data serialization.

**TDD (Test-Driven Development)** — Development practice where tests are written before implementation code. Required for all changes in this project.

**tRPC** — End-to-end type-safe API framework that generates TypeScript types from server procedures, eliminating the need for API contracts or code generation.

**Type Assertion** — TypeScript `as` keyword that forces a type without validation. Banned by ESLint configuration in favor of Zod validation.

**Type Guard** — Function that performs runtime checks to narrow TypeScript types. Used instead of type assertions for safe type narrowing.

**Vitest** — Fast unit test framework compatible with Jest APIs, built on Vite. Used for all testing in this project.

**Zod** — TypeScript-first schema validation library. Used to validate external data and ensure runtime type safety at system boundaries.