# Limitations

## Intentional Non-Features

**No Pages Router Support** — Only Next.js App Router is supported. The Pages Router is legacy and lacks React Server Component support. Migration path: use App Router from the start.

**No Type Escape Hatches** — `any` types, `as` casts, `@ts-ignore`, and ESLint exceptions are blocked by tooling. Rationale: these undermine type safety and lead to runtime errors. Use Zod validation or proper type guards instead.

**No Console Logging** — `console.log` is banned by ESLint. Rationale: structured logging with Pino provides better production observability. Use `logger.info()`, `logger.debug()`, etc.

**No Optional Testing** — All code requires tests with 100% coverage. Rationale: tests are documentation and prevent regressions. The cost of bugs in production exceeds the cost of writing tests.

**No Git Bypass** — `git commit --no-verify` circumvents quality checks and is prohibited. Rationale: pre-commit hooks exist to prevent broken code from entering the repository.

## Rejected Approaches

**JavaScript Support** — This template is TypeScript-only. Rationale: JavaScript lacks compile-time type checking, defeating the core value proposition.

**Relaxed ESLint Rules** — Some templates use "warn" instead of "error" for linting violations. Rationale: warnings are ignored in practice. Errors enforce consistency.

**Optional Database Integration** — Unlike some templates that make database integration optional, this template requires PostgreSQL. Rationale: most production applications need a database, and Kysely's type generation is core to the value proposition.

**Multiple Testing Frameworks** — Only Vitest is supported (no Jest, Mocha, etc.). Rationale: reduces cognitive overhead and configuration complexity.

## Known Technical Constraints

**Bun Required** — This template requires Bun as the runtime and package manager. Node.js is not supported. Constraint: some packages have incomplete Bun compatibility.

**PostgreSQL Only** — Kysely supports other databases, but type generation is configured for PostgreSQL. Migration to other databases requires configuration changes.

**100% Coverage Threshold** — Test coverage thresholds are set to 100% for statements, branches, functions, and lines. This may be impractical for some teams but is intentional to prevent coverage erosion.

## Out of Scope

**Authentication/Authorization** — User authentication, session management, and authorization are not included. Rationale: implementations vary too widely to provide a useful default.

**Frontend Component Library** — No UI component library (Material-UI, Chakra, etc.) is included beyond Tailwind. Rationale: component library choice is highly opinionated.

**Deployment Configuration** — No Vercel, Docker, or Kubernetes configuration is provided. Rationale: deployment targets vary significantly between projects.

**Database Migrations Rollback** — Kysely migrations are forward-only. Rollback logic must be written manually. Rationale: rollbacks in production are risky and should be explicit.
