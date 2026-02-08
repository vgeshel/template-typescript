# Limitations

## Intentional Non-Features

**Authentication/Authorization** — This template provides no auth system. Projects have vastly different requirements (OAuth, JWT, session-based, multi-tenant), so we intentionally leave this to implementers.

**Database ORM** — We use Kysely for raw SQL with type safety, not Prisma or an ORM. This gives full SQL control and avoids ORM query complexity, but requires writing more explicit queries.

**Multi-database Support** — PostgreSQL only. Supporting multiple databases would require conditional query syntax and testing infrastructure for each, diluting the template's focus.

**API Versioning** — No built-in API version management. Most projects don't need this initially; add when you have actual breaking changes.

**Environment-specific Logging** — Logger configuration is basic. Production deployments should customize pino transports for their infrastructure (CloudWatch, Datadog, etc.).

## Rejected Approaches

**Mock-based Testing** — We test against real PostgreSQL databases instead of mocks. Mocks give false confidence and don't catch integration issues. The tradeoff is slightly slower tests for much higher reliability.

**Allowing `any` Types** — Strict no-`any` rule blocks legitimate uses like complex generic scenarios. However, type safety erosion always starts with "just this one case," so we ban it entirely.

**Flexible Pre-commit Hooks** — Some teams want optional hooks or local overrides. We require hooks to pass with no escape hatch because quality gates are worthless if bypassable.

**JavaScript Support** — TypeScript only, no `.js` or `.jsx` files. Supporting both fragments the codebase and undermines type safety benefits.

## Known Technical Constraints

**Bun Required** — This template uses Bun-specific features and may not work correctly with Node.js. Bun's ecosystem is less mature than Node, which may affect some third-party libraries.

**Coverage Thresholds Apply to All Code** — 100% coverage requirement applies to every file. Complex UI state machines or error boundaries may make this impractical; you'll need to adjust thresholds.

**tRPC Overhead for Simple APIs** — tRPC adds complexity for basic REST endpoints. If you're building a public REST API, standard Next.js API routes may be more appropriate.

## Out of Scope

**Frontend State Management** — Beyond React Query (via tRPC), no global state solution is provided. Add Zustand, Jotai, or Redux based on your complexity.

**Styling System** — Tailwind CSS is included but components are unstyled. Choose your own component library or design system.

**Deployment Configuration** — No Docker, Kubernetes, or platform-specific configuration. Deployment targets vary too widely to include reasonable defaults.

**Monitoring and Observability** — No APM, error tracking, or metrics. Production systems should integrate OpenTelemetry, Sentry, or similar tools.
