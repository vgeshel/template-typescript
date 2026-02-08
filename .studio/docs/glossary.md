# Glossary

**App Router** — Next.js 13+ routing system using the `app/` directory with server components by default, replacing the Pages Router.

**Bun** — JavaScript runtime and package manager optimized for speed, used instead of Node.js and npm in this project.

**Coverage Threshold** — Minimum percentage of code that must be exercised by tests (100% for statements, branches, functions, and lines in this project).

**dotenvx** — Environment variable loader used to load `.env.local` and `.env.test.local` files for development and testing.

**Husky** — Git hooks manager that runs quality checks (typecheck, lint, tests) before commits.

**lint-staged** — Tool that runs linters only on staged Git files, used with Husky for pre-commit formatting and linting.

**Pino** — High-performance JSON logger for Node.js/Bun, replacing console.log throughout the application.

**Pre-commit Hook** — Git hook that runs before commit creation, blocking commits that fail type checking, linting, or tests.

**Procedure** — A tRPC endpoint definition with typed input, output, and handler logic.

**React Query** — Data fetching and caching library used by tRPC React client for managing server state.

**Server Component** — React component rendered on the server by default in Next.js App Router, enabling zero JavaScript bundle size.

**SuperJSON** — Serialization library that preserves Date, Map, Set, and other JavaScript types across tRPC client-server boundary.

**TDD** — Test-Driven Development: writing failing tests before implementation code to define correct behavior.

**tRPC** — End-to-end type-safe RPC framework where API routes share TypeScript types with clients without code generation.

**Vitest** — Fast unit test runner for Vite-based projects, compatible with Jest API, used for all testing in this project.

**Zod** — TypeScript-first schema validation library used to validate external data (API requests, environment variables, database queries).
