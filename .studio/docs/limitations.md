# Limitations

## Intentional Non-Features

**No Pages Router support** — This template uses exclusively Next.js App Router. The Pages Router is legacy and not supported. Rationale: Maintaining both routing patterns creates confusion and dilutes focus.

**No JavaScript files** — All source code must be TypeScript. Plain `.js` files are not included in ESLint or build configurations. Rationale: Type safety is a core principle and mixing JS/TS weakens guarantees.

**No type assertions** — The `as` keyword for type assertions is banned by ESLint. Rationale: Type assertions bypass the type checker and hide bugs; use Zod validation or type guards instead.

**No console.log** — Direct console usage is prohibited in favor of the pino logger. Rationale: Structured logging enables filtering, formatting, and log aggregation in production.

## Rejected Approaches

**GraphQL instead of tRPC** — GraphQL adds significant complexity (schema language, resolvers, codegen) for little benefit when both client and server are TypeScript. tRPC provides better type safety with zero runtime overhead.

**Jest instead of Vitest** — Jest's ESM support is problematic and configuration is verbose. Vitest is faster, simpler, and designed for modern JavaScript.

**Monorepo structure** — This template targets single applications, not multi-package workspaces. Rationale: Monorepo tooling (Turborepo, Nx) adds complexity unnecessary for most projects.

## Known Technical Constraints

**Bun runtime required** — Package scripts use `bun` and `bunx` exclusively. Running with Node.js will fail. Rationale: Bun's speed and built-in TypeScript support improve developer experience significantly.

**100% test coverage enforced** — Vitest configuration requires 100% statement, branch, function, and line coverage. This threshold cannot be lowered without modifying `vitest.config.ts`. Rationale: High coverage is a quality gate; exceptions should be explicit and rare.

**PostgreSQL only** — Database references assume PostgreSQL. Other databases may work but are untested. Rationale: PostgreSQL is production-grade and supports the full feature set needed for modern applications.

## Out of Scope

Authentication, authorization, database ORM/query builder, email sending, file uploads, payments, and other application-level features are intentionally excluded. This is a template, not a framework.
