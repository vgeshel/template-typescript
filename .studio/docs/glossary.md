# Glossary

**App Router** — Next.js 13+ routing system using the `app/` directory with React Server Components by default.

**Bun** — JavaScript runtime and package manager used instead of Node.js, offering faster execution and built-in TypeScript support.

**Kysely** — Type-safe SQL query builder that generates TypeScript types from database schema migrations.

**Pre-commit hook** — Git hook that runs quality checks (typecheck, lint, tests) before allowing a commit to proceed.

**Procedure** — tRPC endpoint definition that combines input validation, business logic, and output typing.

**Public procedure** — tRPC procedure accessible without authentication (this template's default).

**Strict mode** — TypeScript compiler setting enabling all type-checking flags for maximum safety.

**SuperJSON** — Serialization library allowing tRPC to transmit JavaScript types (Date, Map, Set) that JSON cannot represent.

**Test coverage threshold** — Vitest configuration requiring 100% statement, branch, function, and line coverage.

**tRPC** — End-to-end typesafe API framework eliminating the need for manual API client/server type synchronization.

**Type assertion** — TypeScript `as` syntax that overrides type inference; banned in this project in favor of runtime validation.

**Zod** — Runtime schema validation library that generates TypeScript types from validation schemas.

**JSONB** — PostgreSQL JSON binary storage format offering efficient querying and indexing of JSON data.

**pino** — Fast JSON logger used instead of `console.log` for structured, production-ready logging.

**lint-staged** — Tool that runs linters only on Git-staged files during pre-commit hooks.
