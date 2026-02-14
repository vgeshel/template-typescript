# Regression Tests Overview

Regression tests verify that template features continue working as expected. Each test specification describes expected behavior from a black-box perspective without implementation details.

## Core Infrastructure Tests

- [TypeScript Compilation](typescript-compilation.md) — All source files type-check without errors using `bun typecheck`
- [ESLint Rules Enforcement](eslint-enforcement.md) — All configured rules pass, no eslint-disable comments allowed
- [Test Coverage Requirements](test-coverage.md) — 100% statement, branch, function, and line coverage achieved
- [Pre-commit Hook Execution](precommit-hook.md) — All quality gates pass before allowing commits

## API Layer Tests

- [tRPC Health Check](trpc-health-check.md) — Health endpoint returns `{ status: "ok" }` with correct type inference
- [tRPC Client Creation](trpc-client-creation.md) — Client initializes with correct base URL in both SSR and client contexts
- [SuperJSON Transformation](superjson-transformation.md) — Complex types (Date, Map, Set) serialize correctly across network boundary

## Frontend Tests

- [Home Page Rendering](home-page-rendering.md) — Default page displays "Hello, World!" heading and welcome message
- [Layout Font Loading](layout-font-loading.md) — Geist Sans and Geist Mono fonts load with correct CSS variables
- [Providers Initialization](providers-initialization.md) — React Query and tRPC providers wrap application correctly

## Build & Runtime Tests

- [Production Build](production-build.md) — `bun build` completes without errors and generates `.next` directory
- [Development Server](dev-server.md) — Server starts and responds to HTTP requests on default port
- [Logger Configuration](logger-configuration.md) — Pino logger respects LOG_LEVEL environment variable
