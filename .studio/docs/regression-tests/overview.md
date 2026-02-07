# Regression Tests Overview

This document organizes regression test specifications by feature area. Each test describes expected behavior from a user perspective without referencing implementation details.

## Quality Enforcement Tests

- [Pre-commit Hook Tests](pre-commit-hook-tests.md)
  - Given files staged for commit, when pre-commit hook runs, then type checking must pass
  - Given files staged for commit, when pre-commit hook runs, then lint exception detection must pass
  - Given files staged for commit, when pre-commit hook runs, then ESLint must pass
  - Given files staged for commit, when pre-commit hook runs, then coverage thresholds must be 100%
  - Given files staged for commit, when pre-commit hook runs, then test coverage must be 100%
  - Given files staged for commit, when pre-commit hook runs, then formatting must be applied
  - Given any check fails, when pre-commit hook runs, then commit must be blocked

- [Lint Exception Detection Tests](lint-exception-detection-tests.md)
  - Given code with `eslint-disable`, when checked, then violation is detected
  - Given code with `eslint-disable-next-line`, when checked, then violation is detected
  - Given code with `eslint-disable-line`, when checked, then violation is detected
  - Given code with `@ts-ignore`, when checked, then violation is detected
  - Given code with `@ts-nocheck`, when checked, then violation is detected
  - Given code with `@ts-expect-error`, when checked, then violation is detected
  - Given documentation file with pattern reference, when checked, then no violation is detected
  - Given excluded file with pattern, when checked, then no violation is detected

- [Coverage Threshold Protection Tests](coverage-threshold-protection-tests.md)
  - Given vitest config with 100% thresholds, when checked, then check passes
  - Given vitest config with <100% statement threshold, when checked, then check fails
  - Given vitest config with <100% branch threshold, when checked, then check fails
  - Given vitest config with <100% function threshold, when checked, then check fails
  - Given vitest config with <100% line threshold, when checked, then check fails

## Type Safety Tests

- [Type Assertion Ban Tests](type-assertion-ban-tests.md)
  - Given code with `as` type assertion, when linted, then ESLint error is raised
  - Given code with angle bracket assertion, when compiled, then TypeScript error is raised
  - Given code with Zod parse, when linted, then no error is raised

- [Any Type Ban Tests](any-type-ban-tests.md)
  - Given code with explicit `any` type, when linted, then ESLint error is raised
  - Given code with implicit `any` (no type annotation), when type checked, then TypeScript error is raised
  - Given code with proper types, when linted, then no error is raised

- [Console.log Ban Tests](console-log-ban-tests.md)
  - Given code with `console.log`, when linted, then ESLint error is raised
  - Given code with `console.error`, when linted, then ESLint error is raised
  - Given code with `logger.info`, when linted, then no error is raised

## Testing Infrastructure Tests

- [Test Discovery Tests](test-discovery-tests.md)
  - Given test file in `src/**/*.test.ts`, when vitest runs, then test is discovered
  - Given test file in `app/**/*.test.tsx`, when vitest runs, then test is discovered
  - Given test file in `scripts/**/*.test.ts`, when vitest runs, then test is discovered
  - Given test file in `.claude/skills/**/*.test.ts`, when vitest runs, then test is discovered
  - Given non-test TypeScript file, when vitest runs, then file is not run as test

- [Coverage Measurement Tests](coverage-measurement-tests.md)
  - Given source file in `src/`, when coverage runs, then coverage is measured
  - Given source file in `app/`, when coverage runs, then coverage is measured
  - Given test file, when coverage runs, then file is excluded from coverage
  - Given file in `src/test/`, when coverage runs, then file is excluded from coverage

## API Layer Tests

- [tRPC Health Check Tests](trpc-health-check-tests.md)
  - Given health endpoint, when called, then returns `{ status: "ok" }`
  - Given health endpoint, when called with wrong method, then returns error
  - Given health endpoint, when called with no input, then succeeds

- [tRPC HTTP Handler Tests](trpc-http-handler-tests.md)
  - Given GET request to `/api/trpc/health`, when processed, then handler responds
  - Given POST request to `/api/trpc/health`, when processed, then handler responds
  - Given request to non-existent procedure, when processed, then error is returned
  - Given malformed request, when processed, then error is returned

- [SuperJSON Serialization Tests](superjson-serialization-tests.md)
  - Given response with Date object, when serialized, then client receives Date instance
  - Given response with undefined value, when serialized, then client receives undefined
  - Given response with Map, when serialized, then client receives Map
  - Given response with Set, when serialized, then client receives Set

## Frontend Infrastructure Tests

- [Root Layout Tests](root-layout-tests.md)
  - Given root layout, when rendered, then includes TrpcProvider
  - Given root layout, when rendered, then includes html lang attribute
  - Given root layout, when rendered, then includes custom fonts
  - Given root layout, when rendered, then suppresses hydration warnings

- [Home Page Tests](home-page-tests.md)
  - Given home page, when rendered, then displays "Hello, World!" heading
  - Given home page, when rendered, then displays welcome message
  - Given home page, when rendered, then uses Tailwind CSS classes

- [Providers Tests](providers-tests.md)
  - Given Providers component, when rendered, then wraps children with TrpcProvider
  - Given Providers component, when rendered, then children are rendered
  - Given Providers component, when used client-side, then tRPC client is available

## Logging Tests

- [Logger Initialization Tests](logger-initialization-tests.md)
  - Given LOG_LEVEL environment variable, when logger created, then uses specified level
  - Given no LOG_LEVEL, when logger created, then defaults to "info"
  - Given logger, when used, then outputs structured JSON

- [Child Logger Tests](child-logger-tests.md)
  - Given bindings object, when child logger created, then bindings are included in logs
  - Given child logger, when log written, then inherits parent configuration
  - Given child logger, when log written, then includes bound context fields

## Path Resolution Tests

- [Import Alias Tests](import-alias-tests.md)
  - Given import from `@/server/trpc`, when resolved, then maps to `src/server/trpc`
  - Given import from `@/lib/logger`, when resolved, then maps to `src/lib/logger`
  - Given import from `@/components/Providers`, when resolved, then maps to `src/components/Providers`

## Build Tests

- [TypeScript Compilation Tests](typescript-compilation-tests.md)
  - Given valid TypeScript code, when `bun typecheck` runs, then exits with code 0
  - Given type error, when `bun typecheck` runs, then exits with non-zero code
  - Given missing type annotation, when `bun typecheck` runs, then reports error

- [Next.js Build Tests](nextjs-build-tests.md)
  - Given valid application, when `bun build` runs, then build succeeds
  - Given build output, when inspected, then includes optimized bundles
  - Given server packages, when built, then are externalized (pino, pino-pretty, thread-stream)

## Formatting Tests

- [Prettier Tests](prettier-tests.md)
  - Given unformatted code, when lint-staged runs, then code is formatted
  - Given unformatted JSON, when lint-staged runs, then JSON is formatted
  - Given unformatted Markdown, when lint-staged runs, then Markdown is formatted
  - Given imports out of order, when formatted, then imports are organized