# Limitations

## Intentional Non-Features

### Database Schema Management Tools

**What:** This template does not include Prisma, Drizzle, or other schema-first ORMs with automatic migration generation.

**Why:**
- Kysely provides type safety without hiding SQL, giving developers full control
- Migration-as-code (writing SQL directly) is more transparent and debuggable
- Generated migrations can produce unexpected results or inefficient SQL
- Database-specific features (indexes, constraints, triggers) are easier to use directly

**Implication:** Developers must write migrations manually and run `bun db:codegen` to regenerate TypeScript types.

### Authentication and Authorization

**What:** No built-in authentication system (JWT, sessions, OAuth) or authorization framework.

**Why:**
- Authentication requirements vary wildly across applications (SSO, magic links, social login, etc.)
- Including a specific auth pattern would force developers to remove or work around it
- Auth is a feature, not infrastructure — it should be implemented per-project needs

**Implication:** Developers must implement authentication based on their specific requirements.

### UI Component Library

**What:** No component library like Material-UI, Chakra UI, or Radix.

**Why:**
- Design requirements are project-specific
- Component libraries add significant bundle size
- Designers often require custom components regardless of library choice
- Tailwind CSS provides sufficient styling primitives

**Implication:** Developers build components as needed or add their preferred component library.

### State Management Library

**What:** No Redux, Zustand, or global state management beyond React Query (provided by tRPC).

**Why:**
- Most application state lives on the server and is fetched via tRPC
- React Query handles server state caching and synchronization
- Client-only state should be managed with React hooks (useState, useContext)
- Global state is rarely needed with proper data fetching patterns

**Implication:** Developers use tRPC queries for server state and React hooks for client state.

### Deployment Configuration

**What:** No Docker files, Kubernetes manifests, or deployment scripts.

**Why:**
- Deployment targets vary (Vercel, AWS, Docker, bare metal)
- Infrastructure-as-code should be maintained separately from application code
- Template focuses on application development, not operations

**Implication:** Developers configure deployment based on their infrastructure choices.

## Rejected Approaches

### Allowing Type Assertions (`as` casts)

**Rejected Approach:** Permit `as` casts in limited circumstances with documentation about safe usage.

**Why Rejected:**
- Impossible to enforce "safe usage" through tooling
- Type assertions bypass TypeScript's type checker, defeating the purpose of type safety
- Every `as` cast is a potential runtime error waiting to happen
- Zod validation and type guards provide safe alternatives

**Consequence:** Developers must use Zod schemas or type guards to narrow types safely.

### Incremental Test Coverage Targets

**Rejected Approach:** Start with lower coverage thresholds (e.g., 80%) and gradually increase them.

**Why Rejected:**
- Lower thresholds create a "tragedy of the commons" where no one writes tests
- Existing untested code becomes increasingly difficult to test as it ages
- Teams rarely increase thresholds after setting them low
- 100% coverage from day one prevents untested code from entering the codebase

**Consequence:** All code must be tested, but this ensures quality from the start.

### Monorepo Structure

**Rejected Approach:** Organize the template as a monorepo with separate packages (frontend, backend, shared).

**Why Rejected:**
- Monorepos add complexity (workspace configuration, build orchestration)
- Most projects start as monoliths and split when necessary
- tRPC shares types automatically without separate packages
- Premature separation increases boilerplate and maintenance

**Consequence:** Projects start as a single package and split if needed based on actual requirements.

### Database Connection Pooling Library

**Rejected Approach:** Include a connection pooling library like pg-pool configured out of the box.

**Why Rejected:**
- Connection pooling requirements vary based on deployment environment
- Serverless platforms (Vercel, AWS Lambda) require different pooling strategies
- Including a specific pooler would be incorrect for many deployment targets

**Consequence:** Projects with PostgreSQL must configure database connections manually. The template currently excludes the `src/server/db.ts` file that would reference Kysely and PostgreSQL because database setup is project-specific.

## Known Technical Constraints

### Bun Runtime Only

**Constraint:** The project is configured to run on Bun, not Node.js.

**Why:** Bun provides faster startup times, native TypeScript support, and better developer experience. However, some npm packages may have compatibility issues.

**Workaround:** If a package doesn't work with Bun, use Node.js-compatible alternatives or contribute fixes to the package.

### 100% Test Coverage Enforcement

**Constraint:** Pre-commit hooks block commits if test coverage falls below 100%.

**Why:** Maintains quality ratcheting by preventing untested code from entering the repository.

**Workaround:** Write tests for all code. Use `/* istanbul ignore next */` comments only for genuinely untestable code (process exit handlers, defensive checks that can't be triggered in tests).

### No Server Actions Support

**Constraint:** The template uses tRPC instead of Next.js Server Actions.

**Why:** tRPC provides full type safety across client and server, while Server Actions have limited type inference and require manual validation.

**Workaround:** None needed. tRPC is a superior pattern for type-safe APIs.

### TypeScript Strict Mode Required

**Constraint:** TypeScript strict mode is enabled and cannot be disabled.

**Why:** Strict mode catches entire classes of bugs at compile time. Disabling it defeats the purpose of TypeScript.

**Workaround:** Fix type errors rather than disabling strict checks.

## Out of Scope

### Performance Monitoring and Observability

The template does not include APM tools, error tracking (Sentry), or metrics collection. These are deployment-specific concerns that vary based on infrastructure.

### Internationalization (i18n)

The template does not include i18n libraries or locale management. Applications requiring internationalization should add libraries like next-i18next based on their needs.

### End-to-End Testing

The template provides unit and integration testing with Vitest but does not include Playwright or Cypress for E2E tests. E2E testing requirements vary based on application complexity.

### GraphQL Support

The template uses tRPC for APIs. Projects requiring GraphQL should replace tRPC with Apollo or urql.

### WebSocket/Real-Time Features

The template does not include WebSocket configuration or real-time libraries. Projects requiring real-time features should add Socket.io or similar libraries.