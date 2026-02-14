# Architecture

## Architectural Patterns

**End-to-End Type Safety** — TypeScript types flow from database through tRPC procedures to React components. The `AppRouter` type is shared between server and client, eliminating manual type synchronization and catching integration errors at compile time.

**Server-First Rendering** — Next.js App Router defaults to Server Components. Only components requiring interactivity use `'use client'` directive. This reduces JavaScript bundle size and improves initial page load.

**Test-Driven Development** — The 100% coverage requirement enforces writing tests before implementation. Tests serve as living documentation and prevent regressions.

**Fail-Fast Quality Gates** — Pre-commit hooks block commits that fail type checking, linting, or formatting. Issues are caught locally before reaching the repository.

## Technology Choices

**Bun over Node.js** — Bun provides faster execution (2-3x), built-in TypeScript support without transpilation, and a better developer experience. The template uses Bun for package management, test running, and script execution.

**tRPC over REST/GraphQL** — tRPC eliminates the need for code generation, manual type synchronization, and API documentation. TypeScript types are the single source of truth. This dramatically reduces boilerplate while maintaining type safety.

**Vitest over Jest** — Vitest starts faster, has better ESM support, and integrates seamlessly with Vite. The configuration supports both unit and component tests with Istanbul coverage.

**Pino over Winston/Bunyan** — Pino is the fastest Node.js logger with minimal overhead. Structured JSON output integrates well with log aggregation systems. Pino-pretty provides human-readable formatting in development.

**Zod over Yup/Joi** — Zod is TypeScript-first with automatic type inference. Schemas serve as both runtime validation and TypeScript types, eliminating duplication.

**TailwindCSS 4.x** — Latest version with PostCSS plugin architecture. Utility-first approach provides rapid UI development without CSS file maintenance.

## Code Organization

**`app/`** — Next.js App Router directory. Contains routes, layouts, and the tRPC API handler. Files here follow Next.js conventions (page.tsx, layout.tsx, route.ts).

**`src/server/`** — Backend logic including tRPC router definition and procedure implementations. Never imported by client code.

**`src/lib/`** — Shared utilities used by both client and server. Includes tRPC client, logger, and provider configurations.

**`src/components/`** — React components. Currently contains only the Providers wrapper, which orchestrates tRPC and React Query setup.

**`src/test/`** — Test utilities and setup files. Excluded from production builds and coverage calculations.

**`scripts/`** — Build and development scripts. Includes Studio integration and utility commands.

## Security Model

**No `any` types** — ESLint rule blocks `any`, forcing explicit typing. Prevents accidental type holes that could allow invalid data.

**External data validation** — All data crossing system boundaries (API requests, environment variables, external APIs) must be validated with Zod schemas before use.

**eslint-plugin-security** — Detects potential security issues like unsafe regex, eval usage, and command injection patterns at lint time.

**Environment variable isolation** — Development and test environments use separate `.env.*.local` files, preventing accidental data corruption.

## Performance Considerations

**SuperJSON serialization** — Handles complex JavaScript types (Date, Map, Set) that standard JSON cannot serialize. Adds minimal overhead while preventing serialization bugs.

**Server component default** — Most components render server-side, reducing client JavaScript bundle size and improving Time to Interactive.

**HTTP batch linking** — tRPC batches multiple requests into a single HTTP call, reducing network overhead when multiple procedures are called simultaneously.

**External package exclusion** — Next.js config marks Pino and related packages as external to prevent unnecessary bundling of Node.js-specific code.
