# Limitations

## Intentional Non-Features

**PostgreSQL Database Layer** — The README mentions PostgreSQL and database migrations, but no database code exists in the codebase. This is a template, not a working database application. Database integration is left to implementers.

**Authentication System** — No auth middleware, session management, or user models. The tRPC context is an empty object, providing a hook point for future authentication but no implementation.

**Production Deployment Configuration** — No Docker files, Kubernetes manifests, or cloud provider configurations. The template focuses on development workflow, not deployment infrastructure.

**Visual Components Library** — Only basic Tailwind CSS styling exists. No button components, form elements, or design system. UI implementation is left to users.

## Rejected Approaches

**Node.js Runtime** — Bun is enforced over Node.js for faster test execution and native TypeScript support. The pre-commit hook and scripts assume Bun availability.

**JavaScript (No TypeScript)** — TypeScript strict mode is non-negotiable. The ESLint configuration blocks `any` types and unsafe casts, making plain JavaScript incompatible.

**Manual Testing Only** — Test-first development is enforced through project culture and AI agent rules. Manual testing without automated coverage is explicitly rejected.

## Known Technical Constraints

**100% Test Coverage Requirement** — Vitest enforces 100% coverage thresholds (statements, branches, functions, lines). This prevents exploratory code and requires upfront test design.

**No File Parallelism in Tests** — Tests run sequentially (`--no-file-parallelism`) to avoid database contention issues, resulting in slower test execution for large suites.

**Bun-Specific Dependencies** — The project depends on Bun-specific features. Migration to Node.js would require script modifications and different test runners.

## Out of Scope

- Internationalization (i18n) and localization
- Analytics and monitoring integrations
- Content management systems
- Payment processing integrations
- Email delivery systems
- File upload and storage services
