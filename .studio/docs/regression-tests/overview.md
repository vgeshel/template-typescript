# Regression Tests Overview

All test specifications enforce expected behavior from a user perspective (black-box testing).

## API Behavior Tests

- [tRPC Router Tests](trpc-router-tests.md) — Health endpoint returns correct status object, tRPC initialization with superjson transformer works correctly
- [API Route Handler Tests](api-route-handler-tests.md) — GET/POST requests to `/api/trpc` route to tRPC handler, context creation returns empty object

## Client Integration Tests

- [tRPC Client Tests](trpc-client-tests.md) — Client creation with correct base URL, batch link configuration, superjson transformer applied
- [React Provider Tests](react-provider-tests.md) — TrpcProvider wraps children with QueryClientProvider, tRPC client instance shared across components

## Component Rendering Tests

- [Layout Tests](layout-tests.md) — Root layout renders with correct fonts, metadata includes title and description, Providers wrap children
- [Home Page Tests](home-page-tests.md) — Main heading displays "Hello, World!", welcome message renders with correct styling

## Utility Tests

- [Logger Tests](logger-tests.md) — Logger initializes with correct log level from environment, child logger inherits parent configuration with additional bindings
- [Lint Exception Check Tests](lint-exception-check-tests.md) — Script fails when `eslint-disable` comments found, passes when codebase is clean
- [Coverage Threshold Tests](coverage-threshold-tests.md) — Script validates coverage JSON meets 100% thresholds across all metrics
