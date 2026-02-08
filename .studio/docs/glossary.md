# Glossary

**App Router** — Next.js 13+ routing system using the `app/` directory structure with server components by default, replacing the legacy pages router.

**Bun** — JavaScript runtime and package manager used as an alternative to Node.js, providing faster package installation and execution.

**Client Component** — React component marked with `'use client'` directive that runs in the browser and can use hooks and browser APIs.

**dotenvx** — Environment variable management tool that loads `.env.local` and `.env.test.local` files for development and testing.

**ESLint** — Linting tool configured in `eslint.config.mjs` to enforce TypeScript best practices, ban `any` types and `as` casts, and prevent console.log usage.

**Flat Config** — ESLint's modern configuration format using JavaScript arrays instead of nested JSON objects.

**Hookify** — Pre-commit hook system used in `.claude/hookify.*.md` files to enforce quality gates before commits.

**JSONB** — PostgreSQL JSON binary data type used for storing structured data with efficient indexing and querying.

**Kysely** — Type-safe SQL query builder for TypeScript that generates database types from schema migrations.

**Lint Exception** — Code comment like `eslint-disable`, `@ts-ignore`, or `@ts-expect-error` that bypasses linting rules, blocked by pre-commit hooks.

**Migration** — Database schema change script in the `migrations/` directory, executed by Kysely to modify database structure.

**Pino** — Fast JSON logger used instead of console.log for structured logging with configurable log levels.

**Pre-commit Hook** — Git hook that runs quality checks (typecheck, lint, test) before allowing commits, preventing broken code from entering version control.

**Prettier** — Code formatter configured to run automatically on staged files via lint-staged.

**Server Component** — React component that runs on the server by default in Next.js App Router, improving initial page load performance.

**Skill** — Procedural guidance document in `.claude/skills/` that instructs AI agents on specific workflows like TDD or debugging.

**SuperJSON** — Serialization library that extends JSON to support Date, Map, Set, and other JavaScript types, used by tRPC.

**TDD** — Test-driven development workflow where tests are written before implementation code to define expected behavior.

**tRPC** — Type-safe RPC framework that shares TypeScript types between client and server without code generation.

**Type Guard** — TypeScript function that narrows types at runtime, used as an alternative to `as` type assertions.

**Type-aware Linting** — ESLint configuration that uses TypeScript's type checker to catch bugs like unhandled promises.

**Vitest** — Fast test runner with Jest-compatible API, configured with 100% coverage thresholds.

**Zod** — TypeScript-first schema validation library used to validate external data from APIs, user input, and environment variables.
