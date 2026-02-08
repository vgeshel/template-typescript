# Limitations

## Intentional Non-Features

### Authentication and Authorization

**What we don't include:**
- User login/registration flows
- Session management
- Password hashing
- OAuth/SSO integration
- Role-based access control (RBAC)

**Rationale:** Authentication requirements vary dramatically across applications. Some need simple username/password, others require enterprise SSO, and some are public-facing with no auth at all. Including a specific auth pattern would force teams to rip it out or work around it. Better to let teams add their preferred solution.

**When to add:** After forking the template and understanding your specific authentication requirements.

### Database Included by Default

**What we don't include:**
- PostgreSQL connection in the template (commented out)
- Database client instantiation in `src/server/db.ts`
- Migration infrastructure

**Rationale:** Not all applications need databases. Simple static sites, proxies, or API aggregators don't require persistence. Including database dependencies increases bundle size and complexity for projects that don't need them. The template shows the pattern but doesn't force it.

**When to add:** Uncomment database code when you need persistent storage.

### Production Deployment Configuration

**What we don't include:**
- Dockerfile
- Kubernetes manifests
- CI/CD pipeline definitions
- Environment-specific configuration (staging, production)
- Monitoring and observability setup

**Rationale:** Deployment targets vary wildly (Vercel, AWS, self-hosted, containers, serverless). Including specific deployment configuration would bias the template toward one platform. Teams should add deployment infrastructure appropriate to their environment.

**When to add:** When you know your production hosting environment.

### Advanced Next.js Features

**What we don't include:**
- Internationalization (i18n)
- Image optimization configuration
- Middleware for routing or auth
- API routes (using tRPC instead)
- Server Actions (using tRPC instead)

**Rationale:** These features add complexity and aren't universally needed. The template focuses on the core architecture (type-safe client-server communication) and lets teams add Next.js features as required.

**When to add:** When your product requirements demand these features.

### State Management Beyond React Query

**What we don't include:**
- Redux, Zustand, or other global state libraries
- Complex client-side caching strategies
- Optimistic updates (beyond React Query defaults)

**Rationale:** React Query (via tRPC) handles server state effectively for most applications. Client-only state can live in React component state or context. Adding a global state library prematurely leads to overengineering. Add state management when component prop drilling becomes unmaintainable.

**When to add:** When client-side state complexity justifies additional tooling.

## Rejected Approaches

### JavaScript Instead of TypeScript

**Rejected:** Using JavaScript without TypeScript for smaller projects.

**Rationale:** The entire value proposition is type safety. TypeScript catches bugs at compile time that JavaScript would only reveal in production. The overhead of configuring TypeScript is front-loaded; the benefits compound over the project lifecycle.

### Relaxed ESLint Rules

**Rejected:** Allowing `any` types or `as` casts in "exceptional" cases.

**Rationale:** Every exception erodes discipline. If a type is truly unknown, use `unknown` and narrow it with type guards or Zod validation. Type assertions bypass the compiler and lead to runtime errors. No shortcuts.

### Optional Test Coverage

**Rejected:** Making test coverage enforcement opt-in or setting thresholds below 100%.

**Rationale:** Once teams see coverage drop, they rarely restore it. 100% coverage ensures every code path is intentionally considered. The few false positives (unreachable branches) should be marked with `/* c8 ignore next */` and justified in comments.

### Node.js Instead of Bun

**Rejected:** Using Node.js as the runtime for broader compatibility.

**Rationale:** Bun is faster, has a better developer experience, and includes test runner and bundler. While Node.js is more mature, Bun's performance benefits outweigh compatibility concerns for new projects. Teams requiring Node.js compatibility can easily swap runtimes.

### Pages Router Instead of App Router

**Rejected:** Using Next.js Pages Router for better ecosystem compatibility.

**Rationale:** App Router is the future of Next.js. While Pages Router has more library support today, new projects should adopt the modern architecture. Server Components provide better performance and simpler data fetching patterns.

## Known Technical Constraints

### Bun Test Runner Limitations

**Constraint:** Vitest runs with `--no-file-parallelism` flag.

**Impact:** Tests run serially instead of in parallel, increasing test suite duration.

**Reason:** Bun's test runner has limitations with parallel database connections in tests. Running serially prevents connection pool exhaustion.

**Workaround:** None currently. Monitor Bun releases for improved parallelism support.

### Server-Side Package Exclusions

**Constraint:** Pino and related packages are excluded from server bundling in `next.config.ts`.

**Impact:** Larger server bundle size; packages aren't optimized by Next.js.

**Reason:** Thread-stream and other pino dependencies include test files that break Turbopack. Externalizing prevents bundling errors.

**Workaround:** Accept the trade-off or switch to a different logging library.

### No Database Included by Default

**Constraint:** Database client code exists but is commented out.

**Impact:** Cannot run database queries without uncommenting code.

**Reason:** Template should work out-of-the-box without requiring PostgreSQL installation.

**Workaround:** Uncomment database code in `src/server/db.ts` when needed.

### 100% Coverage Requirement

**Constraint:** Pre-commit hooks fail if test coverage drops below 100%.

**Impact:** Developers must write tests for all code, including edge cases.

**Reason:** Enforces TDD culture and prevents untested code from entering the codebase.

**Workaround:** Use `/* c8 ignore next */` for truly unreachable code with justification comments.

## Out of Scope

The following are explicitly outside the template's scope:

- **E2E Testing Frameworks** — Use Playwright or Cypress separately for integration tests
- **Component Libraries** — Choose your own UI library (shadcn/ui, Material-UI, etc.)
- **Form Management** — Add React Hook Form, Formik, or similar when needed
- **Analytics and Tracking** — Integrate Google Analytics, Mixpanel, etc. per your requirements
- **Error Monitoring** — Add Sentry, Datadog, or similar for production error tracking
- **Feature Flags** — Integrate LaunchDarkly or similar if you need gradual rollouts
- **CMS Integration** — Connect to Contentful, Sanity, or other CMS as needed
- **Payment Processing** — Integrate Stripe, PayPal, etc. when monetization is required
- **Real-time Features** — Add WebSockets or Server-Sent Events for live updates
- **Background Jobs** — Integrate BullMQ, GraphileWorker, or similar for async processing

These are important for production applications but vary too much across use cases to include in a template.