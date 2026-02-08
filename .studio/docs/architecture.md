# Architecture

## Architectural Patterns

### Type-Safe Full-Stack with tRPC

The application uses tRPC to maintain end-to-end type safety between client and server without code generation. Server-side procedures defined in `src/server/trpc.ts` automatically propagate type information to client code through the `AppRouter` type export. This enables compile-time checking of API calls, eliminating an entire class of integration bugs.

**Key Characteristics:**
- Server defines procedures with input/output Zod schemas
- Client imports `AppRouter` type for type-safe procedure calls
- SuperJSON transformer handles Date, Map, Set serialization
- React Query integration provides caching and optimistic updates

### Test-Driven Development

All production code follows strict TDD workflow where tests are written before implementation. This is enforced through:
- 100% coverage thresholds in Vitest configuration
- Pre-commit hooks that block commits without passing tests
- Skills in `.claude/skills/tdd/` that guide the workflow

Tests use real infrastructure (database connections, HTTP endpoints) rather than excessive mocking, ensuring tests verify actual behavior.

### Strict Type Safety

TypeScript strict mode is enabled with additional ESLint rules that ban all type safety escape hatches:
- `any` types are completely blocked
- `as` type assertions are blocked (must use Zod validation or type guards)
- Unhandled promises cause lint failures
- Console methods are blocked in favor of structured logging

This eliminates runtime type errors at the cost of requiring explicit validation for external data.

### Fail-Fast Pre-commit Validation

Quality issues are caught immediately through Git pre-commit hooks that run:
1. TypeScript type checking (`bun typecheck`)
2. Lint exception detection (`scripts/check-lint-exceptions.ts`)
3. ESLint with type-aware rules (`bun lint`)
4. Complete test suite with coverage (`bun test:run`)

Failed checks block commits, preventing broken code from entering version control.

### Structured Logging

All logging goes through Pino logger instead of console methods. This ensures:
- Consistent JSON output format for log aggregation
- Configurable log levels (trace, debug, info, warn, error)
- Child loggers with bound context
- Automatic timestamp and level decoration

ESLint blocks console.log usage to enforce this pattern.

## Technology Choices

### Bun Runtime

**Chosen:** Bun
**Alternatives Considered:** Node.js

**Rationale:** Bun provides significantly faster package installation (2-10x) and test execution compared to Node.js. The built-in test runner, bundler, and package manager reduce dependency count. While Node.js has broader platform support, major hosting providers (Vercel, Railway, Fly.io) now support Bun natively.

**Trade-offs:** Limited deployment platform options, smaller ecosystem, occasional compatibility issues with Node-first packages.

### Next.js App Router

**Chosen:** Next.js 16 with App Router
**Alternatives Considered:** Remix, vanilla React with Vite

**Rationale:** Next.js App Router provides server components by default, reducing client-side JavaScript. Built-in routing, API routes, and deployment optimization make it production-ready out of the box. The framework is well-supported by Vercel and has extensive ecosystem.

**Trade-offs:** Framework lock-in, complexity from server/client component distinction, learning curve for server components.

### tRPC

**Chosen:** tRPC
**Alternatives Considered:** GraphQL, REST with OpenAPI

**Rationale:** tRPC shares TypeScript types directly between client and server without code generation or schema files. This eliminates drift between API specification and implementation. The developer experience is superior for TypeScript monoliths where client and server share a codebase.

**Trade-offs:** Requires TypeScript on both client and server, not suitable for polyglot environments, less ecosystem tooling than GraphQL.

### Kysely

**Chosen:** Kysely
**Alternatives Considered:** Prisma, Drizzle, TypeORM

**Rationale:** Kysely generates TypeScript types from database schema while keeping SQL visible. This provides type safety without hiding query performance characteristics. Migrations are written in TypeScript with full IDE support. Unlike ORMs, Kysely does not abstract away SQL, making debugging and optimization straightforward.

**Trade-offs:** More verbose than ORMs for simple CRUD, requires SQL knowledge, no built-in schema management UI.

### Vitest

**Chosen:** Vitest
**Alternatives Considered:** Jest, Node test runner

**Rationale:** Vitest is significantly faster than Jest and has first-class ESM and TypeScript support. The configuration is simpler than Jest for modern TypeScript projects. Compatible API means Jest knowledge transfers directly.

**Trade-offs:** Smaller ecosystem of plugins, less mature than Jest, occasional edge case bugs.

### Zod

**Chosen:** Zod
**Alternatives Considered:** io-ts, Yup, Joi

**Rationale:** Zod is TypeScript-first with excellent type inference. Schemas are composable and can be used for both validation and type generation. tRPC has first-class Zod integration, making them natural complements.

**Trade-offs:** Less mature than Joi for complex validation scenarios, error messages need customization for user-facing forms.

## Code Organization

### Directory Structure

```
├── app/                    # Next.js App Router
│   ├── api/trpc/[trpc]/   # tRPC HTTP handler (generated route)
│   ├── globals.css        # Tailwind CSS imports
│   ├── layout.tsx         # Root layout with Providers
│   └── page.tsx           # Home page
├── src/
│   ├── components/        # React components
│   │   └── Providers.tsx  # Client component wrapping TrpcProvider
│   ├── lib/               # Shared utilities
│   │   ├── logger.ts      # Pino logger instance
│   │   ├── providers.tsx  # tRPC + React Query provider
│   │   └── trpc.ts        # tRPC client configuration
│   ├── server/
│   │   └── trpc.ts        # tRPC router and procedures
│   └── test/              # Test utilities and setup
├── scripts/               # Build and development scripts
│   ├── check-lint-exceptions.ts  # Pre-commit hook script
│   └── check-coverage-thresholds.ts  # Coverage validation
├── .claude/               # AI agent configuration
│   ├── rules/             # Code style and pattern rules
│   ├── skills/            # Procedural workflow guidance
│   └── hookify.*.md       # Pre-commit hook definitions
└── migrations/            # Kysely database migrations (currently empty)
```

### Key Responsibilities

**`app/`** — Next.js routing and page components. Layout configures providers and fonts. API routes mount tRPC handler.

**`src/server/`** — Backend logic including tRPC procedures, database access, and business logic. No browser code should import from here directly.

**`src/lib/`** — Shared utilities that work in both browser and server contexts. Logger, tRPC client, and providers.

**`src/components/`** — React UI components. Use 'use client' directive when needing hooks or browser APIs.

**`scripts/`** — CLI utilities for development and CI. Check scripts run in pre-commit hooks and CI pipelines.

**`.claude/`** — AI agent guidance system. Rules define constraints, skills define workflows, hookify files define Git hooks.

## Security Model

### Input Validation

All external data (API requests, environment variables, file uploads) must be validated with Zod schemas before use. ESLint blocks type assertions, forcing explicit validation.

```typescript
// Blocked by ESLint
const data = req.body as UserData

// Required pattern
const UserSchema = z.object({ name: z.string(), email: z.string().email() })
const data = UserSchema.parse(req.body)
```

### Database Access

Database credentials are never exposed to browser code. All database access flows through server-side tRPC procedures. Client code cannot import `src/server/` modules due to Next.js server/client boundary.

### Environment Variables

Environment variables are loaded at runtime by dotenvx, not baked into client bundles. Secrets never appear in JavaScript sent to browsers.

### Pre-commit Security Checks

ESLint security plugin runs on all code changes to detect common vulnerabilities:
- SQL injection patterns
- Command injection
- Path traversal
- Unsafe regular expressions

## Performance Considerations

### Server Components by Default

Next.js App Router uses server components by default, reducing client-side JavaScript bundle size. Only interactive components need 'use client' directive.

### tRPC Batching

tRPC client uses HTTP batching link to combine multiple simultaneous procedure calls into a single HTTP request, reducing network overhead.

### Vitest Test Parallelization

Tests are configured with `--no-file-parallelism` to avoid database connection issues during parallel test execution. Individual tests within files still run in parallel.

### SuperJSON Serialization

SuperJSON allows passing Date objects and other complex types directly between server and client, avoiding serialization/deserialization logic in application code.

### Build Caching

Next.js incremental compilation and TypeScript incremental builds speed up development iteration and CI build times.
