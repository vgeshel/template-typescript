# Limitations

## Intentional Non-Features

**No Runtime Type Coercion**: The template does not auto-convert types (e.g., string to number). This would hide validation errors. All external data must be explicitly validated with Zod schemas.

**No ESLint Disable Comments**: The pre-commit hook blocks `eslint-disable` comments. If a rule is problematic, it should be changed globally in configuration, not bypassed locally.

**No Any Types or As Casts**: TypeScript escape hatches are forbidden by ESLint configuration. This forces proper type definitions and validation patterns.

**No Database ORM Included**: The template provides PostgreSQL integration patterns but does not prescribe an ORM. Teams must choose based on their needs (Prisma, Drizzle, Kysely, raw SQL).

**No Authentication Scaffolding**: Auth patterns vary too widely by use case. The template provides structure for adding auth, not a pre-built solution.

## Rejected Approaches

**GraphQL Instead of tRPC**: GraphQL requires schema-first design and code generation. tRPC provides type safety with zero codegen overhead, better suited for TypeScript-first teams.

**Jest Instead of Vitest**: Jest's ESM support remains problematic. Vitest provides Jest-compatible API with native ESM and faster execution.

**Pages Router Instead of App Router**: App Router enables server components and better performance primitives. Pages Router is legacy.

**Node.js Instead of Bun**: Bun provides faster package installation, native TypeScript execution, and better developer experience with no runtime compatibility issues for this template's use case.

## Known Technical Constraints

**Bun-Specific Runtime**: Code optimized for Bun may require adaptation for Node.js deployment (e.g., `bun:test` imports). Deployment targets must support Bun or require compatibility adjustments.

**100% Coverage Requirement**: Strict coverage thresholds can slow initial prototyping. This is intentional—incomplete tests represent incomplete understanding.

**No Windows-Specific Testing**: Scripts and tooling assume Unix-like environment. Windows users should use WSL2.

## Out of Scope

**Multi-Tenancy Patterns**: Application architecture decisions like multi-tenancy are project-specific.

**Deployment Infrastructure**: CI/CD pipelines, containerization, and cloud deployment are environment-specific.

**UI Component Library**: The template uses Tailwind CSS but does not include a component library (shadcn/ui, Material-UI, etc.).

**State Management Beyond React Query**: Global client state (Zustand, Redux) is application-specific.

**Real-Time Features**: WebSocket setup, Server-Sent Events, or real-time database subscriptions are not pre-configured.
