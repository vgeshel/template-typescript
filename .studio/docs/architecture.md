# Architecture

## Architectural Patterns

**Type-Safe RPC Over REST**: tRPC provides end-to-end type safety without code generation. Server router types automatically flow to client through TypeScript inference, eliminating the API boundary as a source of type errors.

**Server-First Components**: Next.js App Router defaults to server components, minimizing client JavaScript bundle size. Client components marked with 'use client' directive only when interactivity or browser APIs required.

**Test-Driven Development as Infrastructure**: Tests are not optional documentation—they define correctness. 100% coverage thresholds enforce this, ensuring every code path is specified and verified.

**Fail-Fast Quality Gates**: Pre-commit hooks block low-quality code at authorship time, not review time. Typecheck, lint, and test failures prevent commits entirely.

**Structured Logging Only**: Pino JSON logs replace console.log everywhere, enabling log aggregation and structured querying in production.

## Technology Choices

**Bun Over Node.js**: Bun provides faster package installation (~3x), native TypeScript execution without ts-node, and Jest-compatible test runner. No compatibility issues encountered with Next.js or tRPC. Chosen for developer experience gains with zero downside.

**Vitest Over Jest**: Vitest runs ~10x faster with native ESM support. Jest's ESM mode remains experimental. API compatibility means Jest knowledge transfers directly.

**tRPC Over GraphQL**: GraphQL requires schema-first design and code generation. tRPC leverages TypeScript inference for zero-codegen type safety. For TypeScript-first teams, tRPC eliminates GraphQL's complexity without sacrificing type safety.

**App Router Over Pages Router**: App Router enables React Server Components, streaming SSR, and better performance primitives. Pages Router is legacy maintenance mode.

**Zod Over io-ts**: Zod has better TypeScript integration, clearer error messages, and stronger ecosystem momentum. Chosen for developer experience.

**Tailwind CSS Over CSS-in-JS**: Tailwind provides utility-first styling with zero runtime cost. CSS-in-JS solutions add bundle size and runtime overhead.

**Prettier + ESLint Over ESLint Alone**: Prettier handles formatting, ESLint handles logic/security rules. Clear separation of concerns prevents conflicts.

## Code Organization

```
app/                    # Next.js App Router (frontend + API routes)
├── api/trpc/[trpc]/   # tRPC HTTP adapter
├── layout.tsx         # Root layout with Providers
├── page.tsx           # Home page
└── globals.css        # Tailwind imports

src/
├── server/
│   └── trpc.ts        # tRPC router definition and procedures
├── lib/
│   ├── trpc.ts        # tRPC client configuration
│   ├── providers.tsx  # React Query + tRPC provider wrapper
│   └── logger.ts      # Pino logger instance
├── components/
│   └── Providers.tsx  # Client-side provider boundary
└── test/              # Shared test utilities (mocks, fixtures)

scripts/               # Build and validation scripts
.claude/               # AI agent rules and skills
```

**Key Directories**:

- `app/` — Next.js routing and UI entry points
- `src/server/` — Backend logic (tRPC procedures, business logic)
- `src/lib/` — Shared utilities used by both client and server
- `src/components/` — React components (client or server)
- `src/test/` — Test utilities excluded from coverage

## Security Model

**No Process.env Direct Access**: Environment variables must be accessed through validated configuration modules. Prevents typos and missing variables at runtime.

**Zod Validation for External Data**: All client input, API responses, and environment variables validated with Zod schemas before use. TypeScript alone cannot verify runtime data.

**No Type Assertions (as casts)**: Type assertions bypass compiler checks. Forbidden by ESLint. Use type guards or Zod validation instead.

**Dependency Security Scanning**: eslint-plugin-security runs on every commit, catching common vulnerabilities like eval usage or insecure random number generation.

## Performance Considerations

**Server Components by Default**: Next.js App Router renders components on server unless marked 'use client', reducing JavaScript bundle size.

**tRPC Request Batching**: Multiple tRPC calls in the same render automatically batch into single HTTP request via httpBatchLink.

**SuperJSON Optimization**: SuperJSON adds ~5KB gzipped but enables efficient Date/Map/Set serialization without manual transform logic.

**Vitest Parallel Execution**: Tests run in parallel workers by default except where `--no-file-parallelism` specified for database isolation.

**Build-Time Type Checking**: TypeScript compilation happens before build, catching errors before runtime bundle generation.
