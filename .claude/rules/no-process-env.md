# No Direct process.env Access

## Rule

**Never use `process.env` directly.** All environment variable access must go through the centralized utility at `actions/shared/env.ts`.

## Functions

```typescript
import { getEnv, getFullEnv } from '../actions/shared/env'

// Read a single variable
const value = getEnv('MY_VAR')

// Get all env vars as Record<string, string>
const env = getFullEnv()
```

## Why

- The ESLint rule `n/no-process-env` enforces this at lint time
- Only `actions/shared/env.ts` is exempt from the rule
- Tests must mock `getEnv`/`getFullEnv` instead of mutating `process.env`

## Forbidden

```typescript
// ❌ Direct access
process.env.MY_VAR
process.env['MY_VAR']
{ ...process.env }
Object.entries(process.env)
```

## Test Pattern

```typescript
const { mockGetEnv } = vi.hoisted(() => ({
  mockGetEnv: vi.fn<(key: string) => string | undefined>(),
}))
vi.mock('../actions/shared/env', () => ({
  getEnv: (key: string) => mockGetEnv(key),
  getFullEnv: vi.fn(() => ({})),
}))
```
