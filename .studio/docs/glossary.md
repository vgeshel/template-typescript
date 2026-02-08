# Glossary

**App Router** — Next.js 13+ routing paradigm using the `app/` directory instead of `pages/`, supporting React Server Components and streaming.

**Bun** — JavaScript runtime and package manager used in place of Node.js, providing faster startup and native TypeScript support.

**ESLint** — Linting tool enforcing code quality rules, configured with strict TypeScript-aware rules and no-escape-hatch policy.

**Husky** — Git hooks manager executing pre-commit checks (typecheck, lint, test) before allowing commits.

**Istanbul** — Code coverage tool (via @vitest/coverage-istanbul) measuring test coverage with 100% threshold enforcement.

**Kysely** — Type-safe SQL query builder for PostgreSQL, generating TypeScript types from database schema.

**Lint-staged** — Tool running Prettier and ESLint only on staged files during pre-commit for faster checks.

**Pino** — Fast, structured JSON logger used instead of console.log for production-grade logging.

**Prettier** — Code formatter ensuring consistent style across the codebase, integrated with pre-commit hooks.

**SuperJSON** — Serialization library preserving JavaScript types (Date, Map, Set, BigInt) across tRPC client-server boundary.

**Tailwind CSS** — Utility-first CSS framework for styling React components.

**tRPC** — End-to-end typesafe API framework enabling TypeScript types to flow from server to client without codegen.

**Vitest** — Fast unit test framework compatible with Jest API, used with React Testing Library for component tests.

**Zod** — TypeScript-first schema validation library for parsing external data (API requests, environment variables).
