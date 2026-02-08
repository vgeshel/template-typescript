# Regression Tests Overview

This template enforces 100% test coverage with comprehensive test specifications for all functionality. Tests serve as executable specifications describing expected behavior.

## Core API Tests

- [tRPC Router Tests](trpc-router-tests.md) — Test specifications for all tRPC procedures including health check endpoint

## UI Component Tests

- [Home Page Tests](home-page-tests.md) — Test specifications for the default home page rendering
- [Layout Tests](layout-tests.md) — Test specifications for root layout with provider integration
- [Provider Tests](provider-tests.md) — Test specifications for React Query and tRPC provider setup

## Infrastructure Tests

- [Logger Tests](logger-tests.md) — Test specifications for structured logging functionality
- [tRPC Client Tests](trpc-client-tests.md) — Test specifications for client-side tRPC configuration

## Pre-Commit Hook Tests

- [Lint Exception Detection Tests](lint-exception-detection-tests.md) — Test specifications for detecting banned lint bypass comments
- [Coverage Threshold Tests](coverage-threshold-tests.md) — Test specifications for enforcing 100% coverage requirement

## Test Standards

All tests in this template follow these standards:

1. **100% Coverage Required** — Every code path must have test coverage; enforced by pre-commit hooks
2. **Value Verification** — Tests verify actual values, not just existence or shape
3. **No Mocking Unless Necessary** — Prefer testing real implementations; mock only external dependencies
4. **Descriptive Test Names** — Test names describe the behavior being verified
5. **Arrange-Act-Assert Pattern** — Tests follow clear setup, execution, and verification phases
6. **Fast Execution** — Unit tests complete in milliseconds; integration tests in seconds
7. **Isolated Tests** — Tests don't depend on execution order or shared state
8. **Clear Failure Messages** — Failed tests clearly indicate what went wrong