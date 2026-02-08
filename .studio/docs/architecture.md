# Architecture

## Architectural Patterns

**End-to-End Type Safety** — TypeScript types flow from server procedures through tRPC to client React hooks, eliminating manual type definitions. The `AppRouter` type is exported from server and consumed by client via `createTRPCReact<AppRouter>()`.

**Test-Driven Development** — All code changes require tests before implementation. Vitest enforces 100% coverage thresholds (statements, branches, functions, lines) to prevent untested code from entering the codebase.

**Strict Type Enforcement** — ESLint rules block `any` types and `as` casts. External data must pass through Zod validation. TypeScript strict mode enabled with no exceptions.

**Pre-Commit Quality Gates** — Husky runs type checking, lint exception blocking, ESLint, and lint-staged formatting before allowing commits. The `--no-verify` flag is prohibited in project culture.

**Separation of Concerns** — Server code (`src/server/`) is distinct from client code (`src/lib/`, `src/components/`). Next.js App Router (`app/`) handles routing and rendering, delegating logic to imports.

## Technology Choices

**Bun over Node.js** — Rationale: Native TypeScript support, faster test execution, built-in package manager. All scripts use `bun` and `bunx` commands.

**tRPC over REST** — Rationale: Eliminates API documentation drift, provides autocomplete in IDE, catches breaking changes at compile time. No code generation step required.

**Vitest over Jest** — Rationale: Native TypeScript support, faster execution, compatible with Vite ecosystem. Configured with jsdom for React component testing.

**Pino over Winston** — Rationale: Fastest JSON logger, structured output for production parsing. Never use `console.log` in application code.

**Tailwind CSS over CSS-in-JS** — Rationale: Zero runtime cost, utility-first approach, PostCSS v4 integration with Next.js.

**Superjson over JSON** — Rationale: Preserves Date, Map, Set across network, eliminating manual serialization. Configured in both tRPC client and server.

## Code Organization

**`app/`** — Next.js App Router with file-based routing. `layout.tsx` defines root layout with fonts and providers. `page.tsx` contains route components. `api/trpc/[trpc]/route.ts` exposes tRPC HTTP handler.

**`src/server/`** — Backend tRPC router definitions. `trpc.ts` exports `appRouter` and `publicProcedure` builder.

**`src/lib/`** — Shared client-side utilities. `trpc.ts` creates tRPC React hooks. `providers.tsx` wraps React Query. `logger.ts` provides pino instances.

**`src/components/`** — React components. `Providers.tsx` wraps app with TrpcProvider for client-side context.

**`src/test/`** — Test utilities and setup (excluded from coverage).

**`scripts/`** — Build and validation scripts. `check-lint-exceptions.ts` blocks eslint-disable comments. `check-coverage-thresholds.ts` validates coverage JSON.

**`.claude/`** — AI agent configuration (not project code). Rules and skills for Claude Code.

## Security Model

**No Authentication Yet** — tRPC context is empty object. Future authentication middleware will populate context with user session.

**Input Validation** — All tRPC procedures must define Zod input schemas. Runtime validation occurs before procedure execution.

**Output Validation** — Procedures should define Zod output schemas to guarantee response shape.

**Environment Variables** — Never access `process.env` directly in code (ESLint blocks it). Use dotenvx to load environment files explicitly.

## Performance Considerations

**Batch Requests** — tRPC client uses `httpBatchLink` to combine multiple queries into single HTTP request, reducing network overhead.

**Server External Packages** — Pino, pino-pretty, and thread-stream excluded from Next.js bundling via `serverExternalPackages` to prevent Turbopack issues.

**Sequential Test Execution** — `--no-file-parallelism` flag prevents database contention but increases test suite duration. Trade-off for correctness.

**Static Font Loading** — Geist fonts loaded via `next/font/google` for optimal performance and self-hosting.
