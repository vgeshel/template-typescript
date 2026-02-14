# Limitations

## Intentional Non-Features

**No database ORM included** — This template is database-agnostic. Users must choose and configure their own database solution (Prisma, Drizzle, raw SQL, etc.) based on their needs. Including an ORM would impose unnecessary opinions and dependencies.

**No authentication system** — Authentication requirements vary dramatically between applications (OAuth, JWT, sessions, magic links). Providing a generic auth system would require extensive configuration to be useful.

**No UI component library** — TailwindCSS provides styling primitives. Component libraries (shadcn/ui, Chakra, MUI) are opinionated choices left to users based on design requirements.

**No state management beyond React Query** — TanStack Query handles server state. Client state management (Zustand, Redux, Jotai) depends on application complexity and is not needed for most applications.

**No database migrations system** — Migration tooling is tightly coupled to the chosen database solution and ORM. Users should implement this based on their database choice.

## Rejected Approaches

**REST API instead of tRPC** — REST requires manual type synchronization between client and server, defeating the template's core principle of end-to-end type safety.

**Node.js instead of Bun** — Bun provides faster execution, built-in TypeScript support, and a better developer experience. Node.js support would require additional configuration complexity.

**Relaxed TypeScript configuration** — Allowing `any` types or skipping strict checks undermines type safety. Short-term convenience leads to long-term maintenance burden.

**Optional pre-commit hooks** — Making quality checks optional results in inconsistent code quality. Required hooks ensure every commit meets standards.

## Known Technical Constraints

**Requires PostgreSQL 16+** — README references PostgreSQL for database examples. Users with other databases must adapt connection strings and migration patterns.

**100% test coverage requirement** — Strict coverage thresholds can slow development velocity. This trade-off prioritizes reliability over speed.

**No parallel test execution** — Configured with `--no-file-parallelism` to prevent database connection issues. Tests run sequentially, which is slower but more reliable.

## Out of Scope

- Production deployment configuration (Docker, Kubernetes, serverless)
- Monitoring and observability setup (APM, error tracking, metrics)
- Internationalization and localization
- Advanced performance optimizations (code splitting strategies, image optimization)
- Content management system integration
