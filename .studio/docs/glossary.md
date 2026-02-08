# Glossary

**App Router** — Next.js 13+ routing system using the `app/` directory with file-based routing and server components

**Bun** — JavaScript runtime and package manager used instead of Node.js, providing faster execution and built-in TypeScript support

**Context** — Empty object passed through tRPC request handlers, available for future authentication or request-scoped data

**dotenvx** — Environment variable management tool from `@dotenvx/dotenvx` package for loading `.env.local` and `.env.test.local` files

**Geist** — Google font family (sans and mono variants) used for typography in the application

**httpBatchLink** — tRPC client link that batches multiple procedure calls into single HTTP requests

**Pino** — Structured JSON logger that outputs logs to stdout with configurable levels

**Pre-commit Hooks** — Git hooks managed by Husky that run type checking, linting, and formatting before allowing commits

**publicProcedure** — tRPC procedure builder with no authentication, used for creating public API endpoints

**React Query** — Data fetching library from `@tanstack/react-query` integrated with tRPC for server state management

**SSR** — Server-Side Rendering, where Next.js generates HTML on the server before sending to client

**Superjson** — Serialization library for tRPC that preserves JavaScript types (Date, Map, Set) across network boundaries

**Tailwind CSS** — Utility-first CSS framework configured via PostCSS

**tRPC** — End-to-end typesafe API layer using TypeScript inference to share types between client and server

**Vitest** — Testing framework with 100% coverage thresholds enforced for all source files

**Zod** — TypeScript-first schema validation library for runtime type checking of external data
