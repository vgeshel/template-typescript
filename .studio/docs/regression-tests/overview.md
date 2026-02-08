# Regression Tests Overview

This document describes the behavioral specifications that define what the system should do. Each test specification describes expected behavior from a black-box perspective, ensuring the application meets its requirements.

## Purpose

Regression tests serve as the canonical specification of system behavior. They document:
- What the system does (features)
- What it doesn't do (boundaries)
- How it handles errors and edge cases
- Performance and quality requirements

## Organization

Test specifications are organized by feature area. Each area contains test scenarios that describe expected behavior for that feature.

---

## Core Infrastructure

### [Type Safety Verification](type-safety-verification.md)

Tests that validate type safety enforcement across the application.

**Scenarios:**
- TypeScript compilation with strict mode enabled
- Rejection of `any` types in source code
- Rejection of `as` type assertions in source code
- Successful compilation with proper type guards and Zod validation

---

### [Pre-Commit Quality Gates](pre-commit-quality-gates.md)

Tests that verify automated quality checks run before commits.

**Scenarios:**
- Pre-commit hook executes typecheck, lint, and test commands
- Pre-commit hook blocks commits with TypeScript errors
- Pre-commit hook blocks commits with ESLint violations
- Pre-commit hook blocks commits with failing tests
- Pre-commit hook blocks commits with coverage below 100%
- Pre-commit hook blocks commits containing lint exception comments

---

### [Lint Exception Detection](lint-exception-detection.md)

Tests that verify the system prevents bypassing code quality checks.

**Scenarios:**
- Detection of `eslint-disable` comments in staged changes
- Detection of `@ts-ignore` comments in staged changes
- Exclusion of allowed files (documentation, the check script itself)
- Formatted error messages explaining violations

---

### [Test Coverage Enforcement](test-coverage-enforcement.md)

Tests that verify coverage thresholds remain at 100%.

**Scenarios:**
- Vitest configuration requires 100% coverage for statements, branches, functions, and lines
- Pre-commit hook rejects changes that lower coverage thresholds
- Coverage reports generated in multiple formats (text, HTML, LCOV, JSON)

---

## API Layer

### [tRPC Health Endpoint](trpc-health-endpoint.md)

Tests for the health check API endpoint.

**Scenarios:**
- `health` query returns `{ status: 'ok' }` object
- Response conforms to Zod output schema
- Endpoint accessible via HTTP GET and POST to `/api/trpc/health`

---

### [tRPC Client Configuration](trpc-client-configuration.md)

Tests for client-side tRPC setup.

**Scenarios:**
- Client uses SuperJSON transformer for Date serialization
- Client uses HTTP batch linking for efficient requests
- Client correctly determines base URL (SSR vs. browser)
- Type inference from server procedures works correctly

---

### [tRPC Server Configuration](trpc-server-configuration.md)

Tests for server-side tRPC router setup.

**Scenarios:**
- Server uses SuperJSON transformer matching client
- Procedures validate outputs with Zod schemas
- Router exports AppRouter type for client inference
- Fetch adapter handles Next.js App Router requests

---

## Frontend Components

### [Providers Component](providers-component.md)

Tests for the React providers setup.

**Scenarios:**
- TrpcProvider wraps children with QueryClientProvider
- QueryClient instance created once per component mount
- tRPC client and QueryClient properly connected

---

### [Home Page](home-page.md)

Tests for the root page component.

**Scenarios:**
- Renders "Hello, World!" heading
- Renders welcome message
- Uses Tailwind classes for layout and styling

---

### [Root Layout](root-layout.md)

Tests for the root layout component.

**Scenarios:**
- Sets page title to "My Application"
- Sets page description
- Loads Geist Sans and Geist Mono fonts
- Wraps children in Providers component
- Applies font variables to body element

---

## Logging Infrastructure

### [Pino Logger Configuration](pino-logger-configuration.md)

Tests for structured logging setup.

**Scenarios:**
- Logger respects LOG_LEVEL environment variable
- Default log level is 'info' when not specified
- createChildLogger creates logger with bindings
- Log output formatted as structured JSON

---

## Development Scripts

### [Check Lint Exceptions Script](check-lint-exceptions-script.md)

Tests for the lint exception detection script.

**Scenarios:**
- Detects ESLint disable comments in git diff
- Detects TypeScript ignore comments in git diff
- Tree mode scans entire file system
- Excludes documentation and script files
- Returns exit code 1 when violations found
- Returns exit code 0 when no violations found
- Formatted error messages with file locations

---

### [Check Coverage Thresholds Script](check-coverage-thresholds-script.md)

Tests for the coverage threshold verification script.

**Scenarios:**
- Validates vitest.config.ts has 100% thresholds for all metrics
- Rejects configurations with lower thresholds
- Returns exit code 1 when thresholds lowered
- Returns exit code 0 when thresholds valid
- Formatted error messages explaining violation

---

## Quality Metrics

**Current Status:**
- **Test Coverage:** 100% (statements, branches, functions, lines)
- **Type Safety:** Strict mode with zero `any` types or `as` casts
- **Linting:** Zero warnings or errors, no exception comments allowed
- **Pre-Commit Compliance:** All checks must pass before commits

**Coverage Requirements:**
- All source code in `src/` and `app/` must be tested
- Test files (`*.test.ts`, `*.test.tsx`) excluded from coverage
- Test utilities in `src/test/` excluded from coverage
- Generated files (`**/*.d.ts`) excluded from coverage