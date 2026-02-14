# Regression Tests Overview

Regression test specifications define expected behavior from a user perspective. The template includes tests for its infrastructure components.

## Infrastructure Tests

- [tRPC Server Tests](trpc-server-tests.md) — Router initialization, procedure registration, SuperJSON transformation, and health check endpoint
- [tRPC Client Tests](trpc-client-tests.md) — Client initialization, HTTP batch link configuration, base URL resolution for SSR, and request serialization
- [Logger Tests](logger-tests.md) — Logger creation with environment-based levels, child logger binding, and structured output formatting

## Component Tests

- [Provider Tests](provider-tests.md) — TrpcProvider initialization, QueryClient creation, and proper provider nesting
- [Layout Tests](layout-tests.md) — Root layout rendering, metadata configuration, font loading, and provider wrapping
- [Page Tests](page-tests.md) — Home page rendering, text content, and styling application

## Quality Gate Tests

- [Type Checking](type-checking-tests.md) — TypeScript compilation with strict mode, no `any` types, and no type assertions
- [ESLint Rules](eslint-tests.md) — All ESLint rules pass including security, unicorn, and import plugins
- [Coverage Thresholds](coverage-tests.md) — 100% statement, branch, function, and line coverage requirements
