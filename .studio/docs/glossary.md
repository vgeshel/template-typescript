# Glossary

**App Router** — Next.js routing paradigm introduced in version 13+ using the `app/` directory with file-based routing and React Server Components by default.

**Bun** — JavaScript runtime and package manager used as the primary execution environment for this project, replacing Node.js and npm/yarn/pnpm.

**Hydration** — Process where React attaches event listeners and state to server-rendered HTML, making the page interactive.

**Pre-commit hook** — Git hook that runs automated checks before allowing a commit, enforcing type checking, linting, and formatting.

**Procedure** — tRPC term for an API endpoint definition, either a query (read) or mutation (write).

**React Query** — Data fetching and state management library used by tRPC for handling server state, caching, and automatic refetching.

**Server Components** — React components that render on the server and send HTML to the client without JavaScript, reducing bundle size and improving performance.

**SuperJSON** — Serialization library that extends JSON to support JavaScript types like Date, Map, Set, and BigInt across the network boundary.

**tRPC** — TypeScript RPC framework providing end-to-end type safety between client and server without code generation.

**Type assertion** — TypeScript `as` syntax for overriding type inference, banned in this project in favor of runtime validation.

**Vitest** — Testing framework compatible with Vite's transformation pipeline, used for unit and integration tests with 100% coverage requirement.

**Zod** — TypeScript-first schema validation library used for runtime type checking and data validation at API boundaries.
