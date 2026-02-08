# Glossary

**App Router** — Next.js routing system based on the file system structure in the `app/` directory, using React Server Components by default.

**Bun** — JavaScript runtime and package manager used in this project for faster builds and test execution compared to Node.js.

**dotenvx** — Environment variable management tool from `@dotenvx/dotenvx` used to load configuration from `.env.local` and `.env.test.local` files.

**httpBatchLink** — tRPC client link from `@trpc/client` that batches multiple requests into a single HTTP call for improved performance.

**Husky** — Git hooks manager that triggers quality checks (type checking, linting, formatting) on pre-commit.

**lint-staged** — Tool that runs Prettier formatting and ESLint fixes only on staged files, invoked by Husky pre-commit hooks.

**Pino** — Structured JSON logger used for application logging instead of console statements.

**publicProcedure** — tRPC procedure builder that defines API endpoints accessible without authentication.

**React Query** — Data fetching and caching library from `@tanstack/react-query` that manages server state in React applications.

**Server Components** — React components that render on the server, reducing JavaScript bundle size sent to the client.

**SuperJSON** — Serialization library that extends JSON to support Date, Map, Set, and other JavaScript types across client-server boundaries.

**Tailwind CSS** — Utility-first CSS framework configured with PostCSS for styling components.

**tRPC** — TypeScript RPC framework enabling end-to-end type safety between client and server without code generation.

**Vitest** — Fast test runner with Jest-compatible API, configured with 100% coverage thresholds.

**Zod** — TypeScript-first schema validation library used for runtime type checking of external data.
