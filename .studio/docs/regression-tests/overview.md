# Regression Tests Overview

This document describes the test specifications that define expected system behavior.

## Test Infrastructure

- [Test Runner Configuration](test-runner-config.md) — Vitest setup with 100% coverage enforcement, file matching patterns, and path alias resolution

## Component Testing

- [Providers Component Tests](providers-tests.md) — Verify TrpcProvider wraps children correctly and initializes React Query client
- [Layout Component Tests](layout-tests.md) — Validate root layout renders with proper HTML structure, fonts, and metadata
- [Page Component Tests](page-tests.md) — Confirm home page renders welcome message with expected styling

## API Testing

- [tRPC Router Tests](trpc-router-tests.md) — Verify health check endpoint returns `{ status: 'ok' }` with correct Zod schema validation
- [tRPC Client Tests](trpc-client-tests.md) — Validate client initialization with correct URL and SuperJSON transformer in both browser and SSR contexts
- [API Route Handler Tests](api-route-tests.md) — Confirm `/api/trpc` endpoint handles GET and POST requests through fetch adapter

## Library Integration Tests

- [Logger Tests](logger-tests.md) — Verify Pino logger initialization with correct log level from environment and child logger creation with bindings

## Quality Enforcement Tests

- [Lint Exception Checker Tests](lint-exception-tests.md) — Validate script that blocks commits containing `eslint-disable` comments
- [Coverage Threshold Tests](coverage-threshold-tests.md) — Confirm enforcement of 100% coverage requirement across statements, branches, functions, and lines

## Test Execution Patterns

All tests follow these patterns:
- **Unit tests** colocated with source files using `.test.ts` or `.test.tsx` extensions
- **Coverage reporting** generates text, HTML, LCOV, and JSON formats in `./coverage` directory
- **No file parallelism** via `--no-file-parallelism` flag to prevent test isolation issues
- **Watch mode** default for development, single-run mode for CI
