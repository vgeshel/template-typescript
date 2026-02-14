# Glossary

**App Router** — Next.js routing system using the `app/` directory convention with server and client components. Replaces the legacy Pages Router.

**Bun** — JavaScript runtime and package manager used instead of Node.js. Provides faster execution and built-in TypeScript support.

**Client Component** — React component marked with `'use client'` directive that renders on the browser. Required for hooks and interactivity.

**ESLint** — JavaScript linter enforcing code quality rules. Configured with strict rules including security and unicorn plugins.

**Husky** — Git hooks manager that runs quality checks before commits. Configured to run type checking, linting, and formatting.

**lint-staged** — Tool that runs linters only on staged files in Git. Integrated with Husky for efficient pre-commit checks.

**Pino** — Low-overhead Node.js logger with structured JSON output. Used throughout the application for logging.

**Pre-commit hook** — Automated script that runs before each Git commit. Blocks commits that fail type checking, linting, or formatting.

**Procedure** — tRPC endpoint that accepts typed input and returns typed output. Can be a query (read) or mutation (write).

**Server Component** — React component that renders on the server only. Default in Next.js App Router, provides better performance.

**SuperJSON** — Serialization library that extends JSON to support Dates, Maps, Sets, and other JavaScript types. Used as tRPC transformer.

**TailwindCSS** — Utility-first CSS framework. Version 4.x with PostCSS plugin architecture.

**tRPC** — Type-safe RPC framework that shares TypeScript types between client and server. Eliminates manual API typing.

**Vitest** — Fast unit testing framework with Vite integration. Configured with 100% coverage thresholds.

**Zod** — TypeScript-first schema validation library. Used for runtime validation of external data and tRPC inputs/outputs.
