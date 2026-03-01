# Architecture

## Architectural Patterns

**Type-Safe Full-Stack** — End-to-end type safety from browser to server using tRPC. Client code knows server response types without code generation. Changes to server contracts immediately cause TypeScript errors in client code.

**Test-Driven Development** — All code changes require tests written first. Tests define correctness before implementation. Enforced through pre-commit hooks and team culture.

**Validated Boundaries** — All external data (user input, API responses, environment variables) must pass through Zod schema validation. No trusting external data shapes.

**Immutable Quality Gates** — Pre-commit hooks enforce type checking, linting, and test passage. Bypassing with `--no-verify` is prohibited. Quality is non-negotiable.

**Structured Logging** — All logging uses Pino for structured JSON output. No `console.log` in application code. Child loggers carry contextual bindings.

## Technology Choices

**Bun (Runtime)** — Chosen over Node.js for faster package installation, built-in TypeScript support, and improved performance. Trade-off: Some npm packages may have compatibility issues.

**Next.js 16 App Router (Frontend Framework)** — Provides React Server Components, file-based routing, and built-in optimization. Pages Router is not supported.

**tRPC (API Layer)** — Eliminates API contract drift through TypeScript inference. No OpenAPI specs or code generation needed. Simpler than GraphQL for TypeScript-only stacks.

**Vitest (Testing)** — Faster than Jest with better ESM support. Integrated coverage tooling. Compatible with Vite ecosystem.

**Tailwind CSS (Styling)** — Utility-first CSS framework. No opinionated component library included—teams choose their own.

**Zod (Validation)** — Runtime validation that generates TypeScript types. Single source of truth for data shapes.

**Pino (Logging)** — Fast structured logging. JSON output for production, pretty-printing for development.

**SuperJSON (Serialization)** — Preserves JavaScript types (Date, Map, Set, undefined) across tRPC boundaries where JSON.stringify would lose them.

**dotenvx (Environment Management)** — Secure environment variable management with encryption support.

## Code Organization

```
app/                          # Next.js App Router
├── api/trpc/[trpc]/         # tRPC HTTP handler
├── layout.tsx               # Root layout with providers
├── page.tsx                 # Home page
└── globals.css              # Tailwind entry point

src/
├── server/
│   └── trpc.ts              # tRPC router definition and procedures
├── lib/
│   ├── trpc.ts              # tRPC client configuration
│   ├── logger.ts            # Pino logger setup
│   └── providers.tsx        # React Query + tRPC providers
├── components/              # Shared React components
└── test/                    # Test utilities and helpers

scripts/                     # Build and tooling scripts
├── check-lint-exceptions.ts # Blocks eslint-disable comments
└── check-coverage-thresholds.ts

.claude/                     # AI agent configuration
├── settings.json            # Hookify configuration
├── skills/                  # Development skills for TDD, debugging
└── rules/                   # Code quality rules
```

## Security Model

**Input Validation** — All external inputs validated with Zod schemas before processing. Type assertions (`as`) are prohibited.

**Environment Variables** — Managed through dotenvx with support for encrypted `.env` files. Never commit secrets.

**Type Safety** — ESLint rules prohibit `any` types and unsafe casts. TypeScript strict mode enabled.

**Dependency Integrity** — Husky pre-commit hooks prevent commits with failing tests or type errors.

## Performance Considerations

**Request Batching** — tRPC httpBatchLink combines multiple client requests into single HTTP call, reducing network overhead.

**Server Components** — Next.js App Router defaults to Server Components, reducing JavaScript bundle size.

**No File Parallelism** — Tests run serially (`--no-file-parallelism`) to prevent database race conditions. Trade-off: Slower test execution for correctness.

**Build Optimization** — Production builds use Bun runtime for faster startup and lower memory usage compared to Node.js.
