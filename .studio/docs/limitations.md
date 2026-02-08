# Limitations

## Intentional Non-Features

### No Database Abstraction Beyond Kysely

This template provides Kysely for type-safe SQL queries but does not include an ORM like Prisma or TypeORM. SQL remains visible and explicit.

**Rationale:** ORMs introduce complexity, hide performance characteristics, and make debugging harder. Kysely provides type safety without abstracting away SQL, keeping queries explicit and maintainable.

### No Authentication System

The template does not include pre-configured authentication (OAuth, JWT, sessions, etc.).

**Rationale:** Authentication requirements vary dramatically between projects. Some need social login, others require enterprise SSO, and many have unique security requirements. Including a specific auth system would force removal work for most users.

### No UI Component Library

The template includes Tailwind CSS but no component library like shadcn/ui, Material-UI, or Chakra.

**Rationale:** Component libraries are highly opinionated and tightly coupled to design systems. Most production applications either use a company design system or require custom components. Including a specific library would force removal work.

### No Build-Time Environment Variables

The template uses runtime environment variables loaded by dotenvx, not Next.js build-time `NEXT_PUBLIC_*` variables.

**Rationale:** Build-time variables are baked into JavaScript bundles, making builds environment-specific and preventing deployment of the same artifact to multiple environments. Runtime variables keep builds portable.

### No Client-Side Database Access

There is no direct database access from browser code, only through tRPC endpoints.

**Rationale:** Exposing database credentials to browser code is a security vulnerability. All data access must flow through server-side API endpoints with proper authorization.

### No Relaxed Type Safety Modes

The template does not provide a "loose" mode with `any` types allowed or type assertions enabled.

**Rationale:** Type safety is the core value proposition. Providing an escape hatch would undermine the template's quality guarantees and encourage bypassing proper validation.

## Rejected Approaches

### GraphQL Instead of tRPC

**Why Rejected:** GraphQL requires schema-first development, code generation, and additional tooling complexity. tRPC shares TypeScript types directly between client and server without code generation, providing equivalent type safety with less infrastructure.

### Jest Instead of Vitest

**Why Rejected:** Vitest is faster, has first-class ESM support, and provides better TypeScript integration. Jest's CommonJS legacy causes configuration friction with modern TypeScript tooling.

### Class-Based Architecture

**Why Rejected:** Functional patterns with explicit data flow are easier to test, compose, and reason about. Classes introduce shared mutable state and complicate dependency injection.

### Monorepo Structure

**Why Rejected:** Most projects start as single applications. Monorepo tooling (Turborepo, Nx) adds complexity and learning curve. Projects that outgrow a single repo can migrate later when the need is clear.

## Known Technical Constraints

### 100% Test Coverage Requirement

Vitest is configured with 100% coverage thresholds for statements, branches, functions, and lines.

**Impact:** All production code must have corresponding tests. Adding code without tests fails CI. This is intentional but may feel restrictive for prototyping.

**Workaround:** Use feature branches for exploratory work, then add tests before merging.

### No Console Logging

ESLint blocks `console.log`, `console.error`, and other console methods in favor of the Pino logger.

**Impact:** Quick debugging with console.log fails linting. Developers must use the structured logger.

**Rationale:** Console logging creates unstructured noise in production logs and cannot be filtered by log level.

### No Type Assertions

ESLint blocks all `as` type assertions through `@typescript-eslint/consistent-type-assertions: assertionStyle: never`.

**Impact:** Cannot force TypeScript to accept a type. Must use Zod validation or type guard functions instead.

**Rationale:** Type assertions bypass type safety and lie to the type system. Proper validation or narrowing is always possible.

### Bun Runtime Required

The project uses Bun-specific APIs and is not compatible with Node.js without modifications.

**Impact:** Deployment environments must support Bun, limiting hosting options.

**Trade-off:** Bun provides significantly faster package installation and test execution. Most modern platforms (Vercel, Railway, Fly.io) support Bun.

### PostgreSQL Required

The template assumes PostgreSQL for database operations, with Kysely configured for Postgres-specific features.

**Impact:** Cannot use MySQL, SQLite, or MongoDB without replacing the database layer.

**Rationale:** Supporting multiple databases would complicate the template and dilute type safety guarantees. PostgreSQL is the most feature-complete open source SQL database.

## Out of Scope

### Deployment Configuration

The template does not include Docker files, Kubernetes manifests, or deployment scripts for specific platforms.

**Why:** Deployment requirements vary by hosting provider and organizational infrastructure. Including platform-specific configuration would add noise for most users.

### Monitoring and Observability

No application performance monitoring (APM), error tracking (Sentry), or metrics collection is included.

**Why:** Monitoring vendors and requirements vary dramatically. Production applications need custom instrumentation based on their specific reliability requirements.

### CMS or Admin Panel

The template does not include content management systems or auto-generated admin interfaces.

**Why:** Admin UIs are highly application-specific and tightly coupled to business logic. Generic admin tools rarely fit production requirements.

### Background Job Processing

No job queue, task scheduling, or worker infrastructure is included.

**Why:** Job processing requirements (queuing, retries, scheduling, priority) vary widely. Including a specific solution (BullMQ, Inngest, etc.) would force removal for most projects.

### Real-time Features

No WebSocket infrastructure, server-sent events, or real-time sync is included.

**Why:** Real-time requirements differ dramatically (chat, notifications, collaborative editing). Including a specific solution would constrain architecture without fitting most use cases.
