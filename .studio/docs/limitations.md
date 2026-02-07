# Limitations

## Intentional Non-Features

### No Relaxed Type Safety Mode

This template does not provide a "learning mode" or configuration option to disable strict TypeScript checks. Type safety is enforced via:
- `strict: true` in tsconfig.json
- Banned `any` types
- Banned `as` type assertions
- Pre-commit detection of `@ts-ignore` and related comments

**Rationale**: Gradual adoption of type safety leads to inconsistent codebases where some modules are safe and others aren't. Starting strict and staying strict is simpler than migrating later. If the strictness is too challenging, this template may not be the right fit.

### No Coverage Threshold Override

The vitest.config.ts enforces 100% coverage for statements, branches, functions, and lines. There is no configuration to lower these thresholds or exclude files from coverage.

**Rationale**: Lowering coverage thresholds is a slippery slope. Once set to 95%, it becomes 90%, then 80%, then "we'll add tests later." The pre-commit hook `check-coverage-thresholds.ts` actively prevents modifying these values. If 100% coverage is not achievable for a specific file, it likely indicates a design problem (too many conditionals, unclear responsibilities).

### No Database ORM

This template does not include Prisma, TypeORM, or similar ORMs. It uses Kysely for type-safe SQL query building without abstracting SQL away.

**Rationale**: ORMs introduce magic, hide performance characteristics, and create impedance mismatches between application and database models. Kysely provides type safety while keeping SQL explicit and visible. Teams that prefer ORMs should fork this template and add their preferred tool.

### No Client-Side State Management Library

This template does not include Redux, Zustand, or other global state management libraries. It uses React Query (via tRPC) for server state and React context/hooks for UI state.

**Rationale**: Most "global state" is actually server state that should be fetched and cached via React Query. Adding a state management library encourages storing server data in the client, leading to stale data and cache invalidation bugs. If complex client-side state management is needed, evaluate the architecture first.

### No CSS-in-JS Library

This template uses Tailwind CSS exclusively. It does not include styled-components, Emotion, or other CSS-in-JS solutions.

**Rationale**: Tailwind provides utility-first styling with excellent TypeScript integration and no runtime cost. CSS-in-JS libraries add runtime overhead and complexity. Teams preferring CSS-in-JS should fork and replace the styling approach.

### No Automatic API Documentation Generation

This template does not generate OpenAPI/Swagger documentation from tRPC routes.

**Rationale**: tRPC's design principle is that the TypeScript types *are* the API contract. Generating OpenAPI specs from tRPC is possible but adds complexity and couples internal typings to external contracts. If OpenAPI is required (for non-TypeScript consumers), consider using tRPC alongside a separate REST API or a dedicated documentation tool.

## Rejected Approaches

### Monorepo Structure

This template is a single-package application, not a monorepo with separate `packages/client` and `packages/server`.

**Rationale**: Monorepos add tooling complexity (workspace management, build orchestration) that isn't justified for a full-stack Next.js app where frontend and backend are deployed together. Teams building multiple related packages should use a proper monorepo tool (Turborepo, Nx).

### Runtime Validation of Internal Function Boundaries

This template does not add Zod validation to every function. Validation is applied at system boundaries (API inputs, external API responses) but not between internal modules.

**Rationale**: TypeScript already validates internal function calls at compile time. Adding runtime validation everywhere adds performance overhead and duplicates work TypeScript already does. Validate at trust boundaries (external data) but trust internal types.

### Test File Co-location in Separate Directory

Tests are co-located with source files (`example.ts` and `example.test.ts` in the same directory) rather than in a separate `__tests__` or `test/` directory.

**Rationale**: Co-located tests are easier to find and keep in sync with the code they test. The vitest configuration explicitly includes test files from source directories. Teams preferring separate test directories would need to reconfigure vitest and adjust import paths.

### Graceful Degradation of Pre-commit Hooks

The pre-commit hooks do not have a "soft" mode that warns instead of blocking commits. All checks must pass or the commit is blocked.

**Rationale**: Warnings get ignored. If a check is worth running, it's worth enforcing. Developers who need to commit work-in-progress code should use branches and feature flags, not bypass quality checks.

## Known Technical Constraints

### Bun Runtime Requirement

This template requires Bun as the JavaScript runtime. It will not work correctly with Node.js or Deno without modification.

**Constraint**: Package scripts use `bun` commands, and the lockfile is `bun.lockb`.

**Workaround**: To use Node.js, replace `bun` with `npm` or `pnpm` in package.json scripts, remove `bun.lockb`, and regenerate `package-lock.json` or `pnpm-lock.yaml`. Some scripts may need adjustment.

### PostgreSQL Database Dependency

This template assumes PostgreSQL as the database. It will not work with MySQL, SQLite, or MongoDB without modification.

**Constraint**: Kysely database client is configured for PostgreSQL dialect. Migrations may use PostgreSQL-specific features.

**Workaround**: Replace Kysely dialect configuration and rewrite migrations to avoid PostgreSQL-specific syntax. Consider whether this template is the right fit if not using PostgreSQL.

### Server-Side Rendering Constraints

While Next.js supports various rendering strategies, this template's tRPC setup is optimized for client-side data fetching via React Query. Server-side rendering of tRPC queries requires additional configuration.

**Constraint**: The tRPC client is configured for browser-based HTTP requests.

**Workaround**: Use Next.js server components for server-side data fetching or configure tRPC SSR helpers. Evaluate whether SSR is necessary for the use case.

### Test Parallelism Disabled

The vitest configuration includes `--no-file-parallelism` in all test commands.

**Constraint**: Tests run sequentially by file, which may be slower for large test suites.

**Rationale**: Parallel test execution can cause race conditions in database tests or shared state. Sequential execution ensures test isolation. Teams with a large number of independent unit tests may want to enable parallelism and isolate integration tests.

## Out of Scope

The following are explicitly out of scope for this template:

- **Authentication/Authorization**: No auth system is included. Teams should add NextAuth, Clerk, or custom auth based on requirements.
- **Database Seeding**: No seed data or fixture generation is provided. Add as needed for development and testing.
- **Email/SMS**: No email or SMS service integration is included.
- **File Uploads**: No file upload handling or cloud storage integration is provided.
- **Payment Processing**: No payment gateway integration is included.
- **Internationalization**: No i18n library or translation system is provided.
- **Analytics/Monitoring**: No APM, error tracking, or analytics tools are configured.
- **Deployment Configuration**: No Docker, Kubernetes, or cloud platform configs are included. Deployment is environment-specific.

These features are intentionally omitted because they are application-specific and would add opinions that don't apply to all use cases.