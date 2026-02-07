# Glossary

**App Router** — Next.js routing system based on the `app/` directory structure, where each folder represents a route segment and special files define UI and behavior.

**Branch Coverage** — Test coverage metric measuring whether both the true and false branches of every conditional expression have been executed during tests. Required to be 100% in this project.

**Bun** — JavaScript runtime and package manager used in this project instead of Node.js. Provides faster execution and built-in TypeScript support.

**Child Logger** — A pino logger instance created with pre-bound context fields, used to add request-specific or module-specific metadata to all log entries.

**Escape Hatch** — A language or linting feature that bypasses safety guarantees (e.g., `any` types, `as` casts, `eslint-disable` comments). Intentionally blocked in this template.

**Guardrail** — Automated checks (type checking, linting, testing) that prevent code quality issues from entering the codebase. Enforced via pre-commit hooks.

**Pre-commit Hook** — Script that runs automatically before git commit completes. Executes type checking, lint exception detection, ESLint, coverage verification, and formatting.

**Procedure** — tRPC endpoint definition that defines inputs, outputs, and handler logic. Can be a query (read operation) or mutation (write operation).

**SuperJSON** — Serialization library that extends JSON to support additional JavaScript types (Date, Map, Set, BigInt, etc.). Used as the tRPC transformer.

**TDD (Test-Driven Development)** — Development workflow where tests are written before implementation code. Tests define expected behavior, then minimal code is written to pass them.

**tRPC** — TypeScript RPC framework that provides end-to-end type safety between client and server without code generation. Used for all API communication in this template.

**Type Guard** — TypeScript function that narrows a type by performing runtime checks. The preferred alternative to type assertions (`as` casts).

**Vitest** — Fast, Vite-native test framework used for unit and integration testing. Configured with 100% coverage thresholds for all metrics.

**Zod** — TypeScript-first schema validation library. Used to validate external data (user input, API responses) rather than using unsafe type assertions.