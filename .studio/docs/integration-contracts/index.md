# Integration Contracts Index

This directory defines the boundaries and interfaces between system components. Each contract specifies inputs, outputs, and invariants—what is promised, not how it's delivered.

## API Contracts

- [trpc-api.md](trpc-api.md) — tRPC endpoint interface with SuperJSON serialization contract, HTTP batch link protocol, and error handling guarantees

## Internal Boundaries

- [logger-interface.md](logger-interface.md) — Pino logger contract with createChildLogger binding interface and structured log output format
- [providers.md](providers.md) — React provider composition contract wrapping tRPC and React Query contexts for client-side data fetching

## Testing Contracts

- [vitest-configuration.md](vitest-configuration.md) — Test discovery patterns, coverage thresholds (100% all metrics), and module resolution aliases
- [test-environment.md](test-environment.md) — jsdom test environment setup with globals enabled and environment variable isolation via dotenvx

## Build Contracts

- [typescript-compilation.md](typescript-compilation.md) — Strict mode TypeScript with no any/as casts, path aliases (@/ for src/), and zero-error enforcement
- [eslint-configuration.md](eslint-configuration.md) — ESLint rules blocking any types, as casts, and eslint-disable comments; enforcing security, import order, and promise handling

## Runtime Environment

- [bun-runtime.md](bun-runtime.md) — Bun-specific features (native TypeScript, --bun flag usage, bunx command availability) and compatibility expectations
- [environment-variables.md](environment-variables.md) — Required DATABASE_URL (PostgreSQL connection string) and optional LOG_LEVEL (info default, valid: trace/debug/info/warn/error)

## Git Integration

- [pre-commit-hook.md](pre-commit-hook.md) — Hook execution order (typecheck → lint-exception check → lint → lint-staged) with zero-tolerance failure handling
- [lint-staged.md](lint-staged.md) — File pattern matching for TypeScript/JavaScript (prettier + eslint) and other files (prettier only)
