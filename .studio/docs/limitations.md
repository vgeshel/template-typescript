# Limitations

## Intentional Non-Features

**Database abstraction layer** — This template does not include an ORM or query builder. The README mentions PostgreSQL integration, but package.json shows no database dependencies. Projects requiring database access should add Drizzle ORM, Prisma, or similar tools explicitly.

**Authentication system** — No authentication or authorization is included. Each application has unique security requirements that cannot be templated effectively. Users must implement their own auth strategy using NextAuth, Clerk, or custom solutions.

**State management beyond React Query** — No global state management library (Redux, Zustand, Jotai) is included. React Query handles server state, and local state uses React hooks. Complex client-side state management is left to applications that need it.

**Internationalization (i18n)** — Localization and translation infrastructure is not provided. Applications targeting multiple languages should add next-intl or similar libraries based on their requirements.

**Deployment configuration** — No Docker, Kubernetes, or platform-specific deployment configs are included. Deployment strategies vary too widely to provide a one-size-fits-all solution.

## Rejected Approaches

**JavaScript support** — This template is TypeScript-only. Plain JavaScript is explicitly not supported because the value proposition is end-to-end type safety. Allowing JavaScript would undermine the core principle.

**Webpack configuration** — Next.js handles bundling internally. Exposing webpack configuration would add complexity without meaningful benefit for 95% of use cases.

**Monorepo tooling** — This template is designed for standalone applications. Turborepo or Nx integration is explicitly excluded to keep the scope focused.

## Known Technical Constraints

**Bun requirement** — The template assumes Bun as the runtime. While Next.js works with Node.js, scripts in `package.json` use `bun` commands explicitly. Porting to Node.js requires updating all scripts.

**100% coverage enforcement** — Vitest is configured to fail if coverage falls below 100%. This is intentionally strict but may be too aggressive for projects with UI-heavy code that's difficult to test.

**No client-side routing** — All routing goes through Next.js App Router. Custom client-side routing (like React Router) is not supported and would conflict with the framework's assumptions.

## Out of Scope

- Real-time features (WebSockets, Server-Sent Events)
- File upload and storage integrations
- Background job processing and queues
- Scheduled tasks and cron jobs
- Mobile application support (React Native)
- Progressive Web App (PWA) configuration
- Analytics and monitoring integrations
- Email sending infrastructure
