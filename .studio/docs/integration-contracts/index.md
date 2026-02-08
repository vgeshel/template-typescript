# Integration Contracts Index

## External Integrations

- [tRPC HTTP Handler](trpc-http-handler.md) — POST/GET endpoint at `/api/trpc` accepting batched procedure calls with superjson serialization
- [Next.js App Router](nextjs-app-router.md) — File-based routing system with server/client component boundaries
- [React Query Provider](react-query-provider.md) — Client-side state management for tRPC queries

## Internal API Contracts

- [Health Check Procedure](health-check-procedure.md) — `appRouter.health` query returning `{status: "ok"}` with Zod-validated output
- [Logger Interface](logger-interface.md) — Pino logger with `createChildLogger()` for contextual logging

## Environment Variable Contract

- [Environment Configuration](environment-configuration.md) — `LOG_LEVEL` variable controlling pino verbosity, `.env.local` for development, `.env.test.local` for tests

## Type Safety Boundaries

- [Superjson Transformer](superjson-transformer.md) — Serialization preserving Date, Map, Set, RegExp, BigInt across client-server boundary
- [Zod Validation Layer](zod-validation-layer.md) — Runtime type checking at API boundaries using Zod schemas
