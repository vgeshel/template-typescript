# Architecture

## Architectural Patterns

### Full-Stack Type Safety

The application uses **tRPC** to maintain type safety from database to UI without code generation or manual type definitions. TypeScript types flow through these layers:

1. **Database** — Kysely provides type-safe query builders
2. **Server Procedures** — tRPC procedures define input/output schemas with Zod
3. **Network Transport** — tRPC automatically serializes/deserializes with SuperJSON
4. **Client Hooks** — React Query hooks infer types from server procedures

This eliminates the need for API contracts, OpenAPI specs, or manual type definitions.

### Validation at Boundaries

All external data is validated using **Zod schemas** at system boundaries:

- Client input (forms, URL parameters) validated before processing
- API responses from third parties validated before use
- Environment variables validated at application startup

**Rationale:** Runtime validation ensures TypeScript types match actual data. Type assertions (`as` casts) are banned because they bypass validation and create opportunities for runtime errors.

### Test-First Development

All code changes follow **Test-Driven Development**:

1. Write a failing test that defines correct behavior
2. Implement the minimal code to pass the test
3. Refactor with tests as a safety net

**Rationale:** Tests written after implementation tend to test what the code does, not what it should do. Writing tests first ensures they validate actual requirements.

### Quality Ratcheting

**Pre-commit hooks** enforce quality standards that can only improve:

- TypeScript compilation with strict mode
- ESLint with no warnings or errors
- 100% test coverage (statements, branches, functions, lines)
- No lint exception comments (`eslint-disable`, `@ts-ignore`)

**Rationale:** Automated enforcement prevents quality degradation without requiring manual vigilance. It's impossible to accidentally merge code that violates standards.

### Structured Logging

All logging uses **Pino** for structured, machine-readable logs:

```typescript
logger.info({ userId: 123 }, 'User logged in')
```

Console methods (`console.log`, `console.error`) are banned by ESLint.

**Rationale:** Structured logs enable filtering, aggregation, and correlation in production environments. String concatenation in `console.log` produces logs that are difficult to parse and search.

## Technology Choices

### Bun Runtime

**Choice:** Bun instead of Node.js

**Rationale:**
- Native TypeScript execution without transpilation
- Faster startup times (critical for tests and development)
- Built-in test runner and package manager
- Better developer experience with modern APIs

**Trade-offs:** Some npm packages have compatibility issues with Bun. The ecosystem is smaller than Node.js.

### Next.js App Router

**Choice:** Next.js 16 with App Router (not Pages Router)

**Rationale:**
- Server and client components provide better performance
- Built-in SSR and static generation
- File-system routing reduces boilerplate
- React Server Components enable new optimization patterns

**Trade-offs:** App Router is newer and has fewer examples/tutorials than Pages Router.

### tRPC for APIs

**Choice:** tRPC instead of REST, GraphQL, or Next.js Server Actions

**Rationale:**
- End-to-end type safety without code generation
- Automatic type inference from server to client
- Smaller bundle size than GraphQL clients
- Better type safety than Server Actions

**Trade-offs:** tRPC is TypeScript-specific. Non-TypeScript clients require alternative APIs.

### Kysely for Database Access

**Choice:** Kysely instead of Prisma, Drizzle, or raw SQL

**Rationale:**
- Type-safe queries without hiding SQL
- No runtime overhead or code generation at build time
- Database-agnostic (PostgreSQL, MySQL, SQLite)
- Migrations are explicit SQL, not generated magic

**Trade-offs:** Requires manual migration writing. No built-in migration diffing.

### Vitest for Testing

**Choice:** Vitest instead of Jest or Node Test Runner

**Rationale:**
- Fast execution with Vite's architecture
- Compatible with Jest APIs (easy migration)
- Better ESM support than Jest
- Native TypeScript support

**Trade-offs:** Smaller ecosystem than Jest. Some Jest plugins don't work with Vitest.

### Tailwind CSS for Styling

**Choice:** Tailwind CSS instead of CSS Modules, styled-components, or vanilla CSS

**Rationale:**
- Utility-first approach reduces context switching
- No runtime overhead (unlike CSS-in-JS)
- Consistent design tokens through configuration
- Tree-shaking removes unused styles

**Trade-offs:** Long className strings can reduce readability. Requires learning utility classes.

### Zod for Validation

**Choice:** Zod instead of Joi, Yup, or io-ts

**Rationale:**
- TypeScript-first design with excellent type inference
- Zero dependencies
- Integrates seamlessly with tRPC
- Composable schemas with .merge(), .extend()

**Trade-offs:** Error messages can be verbose. Custom validations require manual type inference.

## Code Organization

### Directory Structure

```
├── app/                    # Next.js App Router pages and API routes
│   ├── api/trpc/[trpc]/   # tRPC HTTP handler
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page component
│   └── globals.css        # Tailwind CSS imports
├── src/
│   ├── components/        # React components
│   ├── lib/               # Client-side utilities
│   │   ├── logger.ts      # Pino logger instance
│   │   ├── providers.tsx  # React Query provider
│   │   └── trpc.ts        # tRPC client setup
│   ├── server/            # Server-side code
│   │   └── trpc.ts        # tRPC router and procedures
│   └── test/              # Test utilities and fixtures
├── scripts/               # Build and validation scripts
├── migrations/            # Database migrations (SQL files)
├── .claude/               # AI agent configuration
│   └── skills/            # Procedural workflows
└── .studio/               # Living documentation
```

### Key Directories

**`app/`** — Next.js routing and page components. Uses App Router file conventions (layout.tsx, page.tsx, route.ts).

**`src/components/`** — Reusable React components. Each component has a co-located test file (`Component.test.tsx`).

**`src/lib/`** — Client-side utilities and configuration. Includes tRPC client setup, React Query providers, and logging.

**`src/server/`** — Server-only code that never runs in the browser. Contains tRPC procedures, database queries, and business logic.

**`scripts/`** — Build scripts and pre-commit validation tools. Not included in the application bundle.

**`migrations/`** — Database migrations written as SQL files. Not present in this template by default as database setup is project-specific.

### Import Aliases

The project uses `@/*` alias for imports from `src/`:

```typescript
import { logger } from '@/lib/logger'
import { appRouter } from '@/server/trpc'
```

**Rationale:** Absolute imports prevent brittle relative paths (`../../../lib/logger`) and make refactoring easier.

## Security Model

### Input Validation

All external input is validated with Zod schemas before use:

```typescript
const InputSchema = z.object({ name: z.string() })
const input = InputSchema.parse(req.body)
```

**Never trust:**
- Client form submissions
- URL query parameters
- HTTP headers
- Third-party API responses
- Environment variables

### Type Assertions Banned

Type assertions (`as` casts) are blocked by ESLint. Use Zod validation or type guards:

```typescript
// ❌ Banned
const data = response as User

// ✅ Allowed
const data = UserSchema.parse(response)
```

**Rationale:** Type assertions bypass TypeScript's type checker and create opportunities for runtime errors when actual data doesn't match the asserted type.

### Environment Variable Isolation

Direct access to `process.env` is discouraged. Environment variables should be validated at startup:

```typescript
const ConfigSchema = z.object({
  DATABASE_URL: z.string().url(),
  LOG_LEVEL: z.enum(['trace', 'debug', 'info', 'warn', 'error']).default('info'),
})

const config = ConfigSchema.parse(process.env)
```

This ensures:
- Required variables are present
- Values have correct types and formats
- Defaults are applied consistently

### Logging Security

Structured logging with Pino prevents log injection attacks:

```typescript
// ✅ Safe: userId is a structured field
logger.info({ userId }, 'User action')

// ❌ Dangerous: String interpolation allows injection
console.log(`User ${userId} performed action`)
```

**Rationale:** Structured fields are serialized as JSON, preventing attackers from injecting newlines or ANSI codes into logs.

## Performance Considerations

### Server-Side Rendering (SSR)

Next.js renders pages on the server by default. This provides:
- Faster time-to-first-byte (TTFB)
- Better SEO with pre-rendered HTML
- Reduced client-side JavaScript

**Trade-off:** Server rendering increases server CPU usage. Use client components (`'use client'`) for interactive UI.

### tRPC Batching

The tRPC client uses HTTP batching to combine multiple queries into a single request:

```typescript
// Single HTTP request, two queries
const [user, posts] = await Promise.all([
  trpc.user.get.query({ id: 1 }),
  trpc.posts.list.query(),
])
```

**Rationale:** Reduces network round-trips and improves perceived performance.

### Test Parallelization Disabled

Vitest runs with `--no-file-parallelism` to avoid database connection conflicts:

```json
"test": "bunx vitest --no-file-parallelism"
```

**Trade-off:** Tests run slower, but database state remains consistent between test files.

### Bundle Optimization

Next.js excludes Pino and related packages from server bundle:

```typescript
serverExternalPackages: ['pino', 'pino-pretty', 'thread-stream']
```

**Rationale:** Prevents Turbopack from bundling native modules that don't need transpilation.