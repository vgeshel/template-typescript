# Architecture

## Architectural Patterns

**End-to-End Type Safety** — TypeScript types flow from database schema through server procedures to client components. Changes to database tables regenerate types; changes to tRPC procedures automatically update client types.

**Test-Driven Quality Gates** — All code changes flow through failing tests first. Pre-commit hooks enforce this discipline by blocking commits with failing typecheck, lint, or tests.

**Colocated Tests** — Tests live next to the code they verify (`.test.ts` suffix), not in separate directories. This keeps test maintenance burden visible and reduces stale tests.

**Real Database Testing** — Tests run against actual PostgreSQL, not mocks. This catches query bugs, transaction issues, and schema mismatches that mocks hide.

**Structured Logging** — All logging uses pino for JSON output. No `console.log` allowed. This enables log aggregation, structured querying, and consistent formatting in production.

## Technology Choices

**Bun over Node.js** — Faster startup, built-in TypeScript support, simpler tooling. Native test runner (Vitest) works seamlessly without transpilation complexity.

**tRPC over REST** — Eliminates API client/server type drift. TypeScript compiler catches breaking changes immediately. Reduces boilerplate compared to OpenAPI code generation.

**Kysely over Prisma** — Raw SQL control with type safety. No hidden query optimization or N+1 problems. Generated types stay in sync with actual database schema.

**Vitest over Jest** — Native ESM support, faster execution, better TypeScript integration. Directly compatible with Bun runtime.

**Tailwind CSS** — Utility-first styling avoids CSS file proliferation and naming debates. Tree-shaking removes unused styles automatically.

**Next.js App Router** — React Server Components reduce client JavaScript. Streaming and Suspense improve perceived performance. Built-in API routes colocate backend and frontend.

## Code Organization

```
app/                    # Next.js App Router
├── api/trpc/          # tRPC HTTP handler
├── layout.tsx         # Root layout with providers
└── page.tsx           # Routes and pages

src/
├── components/        # React components
├── lib/              # Shared utilities (logger, tRPC client)
├── server/           # Backend code (tRPC router, database)
└── test/             # Test utilities and fixtures

scripts/              # Build and development scripts
migrations/           # Database schema migrations (future)
```

**Key Directories:**
- `app/api/trpc/` — Single HTTP endpoint for all tRPC procedures
- `src/server/` — Backend-only code, never bundled to client
- `src/lib/` — Shared utilities usable on server and client
- `src/components/` — React components following Next.js conventions

## Security Model

**Input Validation** — All tRPC procedures validate inputs with Zod schemas. Invalid data returns typed errors, not exceptions.

**No Type Assertions** — `as` casts banned by ESLint. Runtime validation required for untrusted data.

**Database Parameterization** — Kysely uses parameterized queries automatically. SQL injection impossible with standard usage.

**Environment Variables** — dotenvx loads environment config. No hardcoded secrets. Separate `.env.local` and `.env.test.local` files isolate environments.

**Error Information Disclosure** — tRPC error responses sanitized by default in production. Stack traces and internal details not exposed to clients.

## Performance Considerations

**React Server Components** — Heavy computation and data fetching happen on server. Client receives rendered HTML, reducing JavaScript payload.

**Batch tRPC Requests** — HTTP batch link combines multiple concurrent queries into single request, reducing latency.

**SuperJSON Serialization** — Efficient binary representation of complex types (Date, Map, Set) without verbose JSON encoding.

**Test Parallelism Disabled** — `--no-file-parallelism` prevents database connection exhaustion. Tests are fast enough serially; parallel execution creates flakiness.

**Bundle Optimization** — Next.js automatic code splitting and tree-shaking. Unused code never reaches production bundles.
