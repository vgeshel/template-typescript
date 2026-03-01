# Limitations

## Intentional Non-Features

**No authentication scaffolding** — Authentication patterns vary widely by use case (OAuth, JWT, session-based). Teams should implement their specific requirements rather than fight with a pre-built solution.

**No database ORM included** — README mentions PostgreSQL and migrations but no ORM is in dependencies. Teams should choose their preferred data access layer (Drizzle, Prisma, Kysely) based on their needs.

**No opinionated UI component library** — Only Tailwind CSS is included. Teams should choose their component library (shadcn/ui, Radix, Headless UI) based on design requirements.

**No environment-specific builds** — Single build output for all environments. Configuration comes from environment variables, not build-time flags.

## Rejected Approaches

**REST APIs instead of tRPC** — Rejected because REST loses type safety between client and server, requiring manual type synchronization or code generation tools.

**Jest instead of Vitest** — Rejected because Vitest is faster, has better ESM support, and integrates seamlessly with Vite/Next.js tooling.

**Lax TypeScript configuration** — Rejected because `any` types and unsafe casts are the primary source of production runtime errors in TypeScript codebases.

**Optional pre-commit hooks** — Rejected because quality gates must be enforced, not optional. Developers who bypass hooks introduce technical debt.

## Known Technical Constraints

**100% test coverage requirement** — Configured in vitest.config.ts. This is strict but intentional. Untested code paths are production incidents waiting to happen.

**No file parallelism in tests** — Tests run with `--no-file-parallelism` flag, likely due to shared test database state. This makes tests slower but prevents race conditions.

**Bun runtime required** — Not compatible with Node.js. Some libraries may have compatibility issues with Bun.

**Next.js App Router only** — Does not support Pages Router. Migration from Pages Router requires architectural changes.

## Out of Scope

**Backend-for-frontend pattern** — This template is for full-stack applications, not BFF proxy layers.

**Static site generation** — While Next.js supports SSG, this template is optimized for dynamic server-rendered applications.

**Monorepo configuration** — This is a single-project template. For monorepos, use Turborepo or Nx with this as a starting point.

**Mobile applications** — This template targets web browsers, not React Native or mobile-specific frameworks.
