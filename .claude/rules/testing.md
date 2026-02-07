# Test-Driven Development (TDD)

TDD is mandatory. The test is the spec. It is the only spec.

## Red → Green → Refactor

1. **RED**: Write a failing test first. The test defines what the code should do.
2. **GREEN**: Write the minimum code to make the test pass.
3. **REFACTOR**: Clean up the code while keeping tests green.

Without a test, you don't know what the code is supposed to do.

## Three-Tier Testing Strategy

### Tier 1: Unit Tests (always required)

- 100% coverage with mocked dependencies
- Test internal logic, wiring, error handling
- Use hand-crafted fixtures for specific scenarios

### Tier 2: Property-Based Tests (required at external boundaries)

**When required:** Any code that parses, validates, or processes data from external sources:

- Agent output (LLM responses)
- GitHub API responses
- File contents read from disk
- Git command output

**How:** Use fast-check arbitraries from `actions/shared/tests/arbitraries/`:

- `agent-output.ts` — content, formatting, and transport layer arbitraries
- `github-api.ts` — GitHub API response shapes
- `file-content.ts` — markdown state file shapes
- `git-output.ts` — git command output shapes

**Why:** Hand-crafted mocks cover 1-2 scenarios. Property tests generate hundreds,
catching edge cases like truncation, malformed input, conversational wrapping,
and unexpected field shapes.

### Tier 3: Integration Tests (required for agent workflows)

**When required:** Any workflow that:

- Runs an agent and parses its output
- Reads external data and makes decisions based on it

**How:**

- Place in `tests/component/` directory
- Mock only the agent SDK and external services
- Let the parsing pipeline run for real (extractJsonFromText, Zod validation)
- Write to real temp directories when testing file I/O
- Verify results on disk, not just function calls

**E2E tests:** New agent workflows should be added to `scripts/e2e.integration.test.ts`
which runs with real agents under `INTEGRATION_TEST=true`.

## Coverage Goal: 100%

- Every function must have tests
- Every code path must be exercised
- Every edge case must be covered

## Test Quality Requirements

Tests must be thorough and meaningful:

- **Test with realistic inputs**, not just trivial examples
- **Verify specific results**, not just "no exception thrown"
- **Assert on actual values**: Check that function returns `[1, 2, 3]`, not just that it returns an array
- **Test error cases**: Verify the right error is thrown with the right message
- **Test edge cases**: Empty inputs, null values, boundary conditions
- **Test all code paths**: Both branches of every if statement

### Bad Test

```typescript
it('processes data', () => {
  expect(() => processData(input)).not.toThrow()
})
```

### Good Test

```typescript
it('processes data correctly', () => {
  const result = processData({ items: [1, 2, 3], multiplier: 2 })
  expect(result).toEqual({ items: [2, 4, 6], count: 3 })
})
```

## Bug Fixes Are TDD Too

When fixing a bug, TDD still applies:

1. **RED**: Write a test that FAILS because of the bug (reproduces the bug)
2. **GREEN**: Fix the bug so the test passes
3. **REFACTOR**: Clean up if needed

DO NOT:

- Guess at the cause without a reproduction test
- Jump to a fix without first writing a failing test
- Claim "the issue is X" without evidence from a test

## Test Commands

```bash
bun test             # Run tests in watch mode
bun test:run         # Run tests once (all tests)
bun test:changed     # Run tests related to uncommitted changes only (fast iteration)
bun test:coverage    # Run ALL tests with coverage (100% is mandatory — enforced by pre-commit hooks AND CI)
```

## Development Iteration

During the red-green-refactor cycle, use fast incremental commands:

```bash
bun typecheck        # Type safety
bun lint             # Code style (cached — only re-lints changed files)
bun test:changed     # Tests related to uncommitted changes
```

`bun test:changed` uses Vitest's `--changed` flag, which analyzes static imports to find tests affected by your uncommitted changes. This is fast but may miss indirect dependencies — always run the full suite before committing.

## Verification Before Commit

**ALWAYS run `bun test:coverage` before committing new code.**

The full verification sequence is:

```bash
bun typecheck        # Type safety
bun lint             # Code style
bun test:coverage    # ALL tests AND coverage verification
```

**DO NOT** use `bun test:run` or `bun test:changed` for final verification — they don't check coverage. Pre-commit hooks will fail if coverage is below 100%.

## Branch Coverage Patterns

Every conditional expression creates branches. Both branches must be tested:

| Pattern     | Branches | Required Tests                                     |
| ----------- | -------- | -------------------------------------------------- |
| `a ? b : c` | 2        | Test when `a` is truthy AND when `a` is falsy      |
| `a ?? b`    | 2        | Test when `a` is defined AND when `a` is undefined |
| `a \|\| b`  | 2        | Test when `a` is truthy AND when `a` is falsy      |

### Testing Ternary Expressions

For code like:

```typescript
const message = lastOutput ? `Output: ${lastOutput}` : ''
```

Write TWO tests:

```typescript
it('includes output when lastOutput is present', async () => {
  // Setup with lastOutput: 'some value'
  expect(result).toContain('Output:')
})

it('omits output when lastOutput is absent', async () => {
  // Setup with lastOutput: undefined
  expect(result).not.toContain('Output:')
})
```

### Testing Nullish Coalescing

For code like:

```typescript
serverUrl: deps.serverUrl ?? 'https://github.com'
```

Write TWO tests:

```typescript
it('uses provided serverUrl when present', async () => {
  const deps = { serverUrl: 'https://custom.com' }
  expect(result.serverUrl).toBe('https://custom.com')
})

it('uses default serverUrl when not provided', async () => {
  const deps = { serverUrl: undefined }
  expect(result.serverUrl).toBe('https://github.com')
})
```

### Testing Optional Object Patterns

For code like:

```typescript
runContext: deps.runId
  ? { runId: deps.runId, serverUrl: deps.serverUrl ?? 'https://github.com' }
  : undefined
```

Write THREE tests:

1. `runId` not provided → `runContext` is `undefined`
2. `runId` provided with `serverUrl` → uses provided values
3. `runId` provided without `serverUrl` → uses default serverUrl

## Property Testing Patterns

### Testing Agent Output Parsing

```typescript
import { test } from '@fast-check/vitest'
import {
  anyFormattingArb,
  validJsonObjectArb,
  truncatedArb,
} from '../../shared/tests/arbitraries/agent-output'

// Valid JSON in any formatting always extracts
test.prop([anyFormattingArb(validJsonObjectArb)])(
  'extracts JSON regardless of formatting',
  (text) => {
    const result = extractJsonFromText(text)
    expect(result.isOk()).toBe(true)
  },
)

// Truncated JSON returns error, doesn't crash
test.prop([truncatedArb(validJsonObjectArb)])(
  'handles truncation gracefully',
  (text) => {
    const result = extractJsonFromText(text)
    expect(result.isErr()).toBe(true)
  },
)
```

### Testing GitHub API Response Handling

```typescript
import { test } from '@fast-check/vitest'
import {
  issueArb,
  pullRequestArb,
} from '../../shared/tests/arbitraries/github-api'

test.prop([issueArb])('handles any well-formed GitHub issue', (issue) => {
  const result = processIssue(issue)
  expect(result.isOk()).toBe(true)
})
```

## Copy Patterns from Existing Tests

Before writing tests for a new workflow:

1. Find similar workflows in `actions/*/`
2. Read their test files in `actions/*/tests/unit/`
3. Copy the test structure for similar patterns

**Example:** For testing optional `runId`/`serverUrl`, see:

- `actions/coding-agent/tests/unit/impl-spec-workflow.test.ts` lines 381-438

## Mock Safety Rules

### Never mock without verifying the real function

When a test mocks a function with `vi.fn()`, there MUST be a corresponding test
(in the mocked function's own test file) that tests the SAME inputs the caller passes.

If a workflow test calls `mockFns.commitAndPush([], message, branch)`, then
`git.test.ts` MUST have a test for `commitAndPush([], ...)`.

### Always test boundary values

Every function that accepts arrays, strings, or optional parameters MUST be tested with:

- Empty arrays `[]`
- Empty strings `""`
- `undefined` for optional parameters
- Single-element arrays
- The maximum expected size

Use fast-check to generate these systematically:

```typescript
const arrayArb = fc.array(elementArb, { minLength: 0, maxLength: 10 })
```

### Read the callee before changing the caller

Before modifying function arguments at a call site, ALWAYS read the called function's
implementation to understand how it handles the new arguments. Never trust comments
or documentation without verifying the code.
