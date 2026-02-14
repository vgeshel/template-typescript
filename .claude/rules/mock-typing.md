# Mock Typing

## Every `vi.fn()` Must Use the Real Function Signature

**All mock functions must be typed with the exact parameter and return types of the function they replace.**

The purpose of typing mocks is to make TypeScript catch mismatches between what the mock returns and what the real function returns. If a mock uses `unknown` or loose types, TypeScript cannot detect when the mock's behavior diverges from the real function — which is the entire class of bugs we are trying to prevent.

### Required Pattern

Before typing a mock, **read the source module** to find the real function's signature:

```typescript
// Source: the module being mocked (e.g., shared/git.ts)
// export function commitAndPush(files: string[], message: string, branch: string): ResultAsync<void, GitError>

// Test file — mock uses the SAME signature:
const mockCommitAndPush =
  vi.fn<
    (
      files: string[],
      message: string,
      branch: string,
    ) => ResultAsync<void, GitError>
  >()
```

Now TypeScript enforces correctness:

```typescript
mockCommitAndPush.mockReturnValue(ok(undefined)) // ✅ Matches ResultAsync<void, GitError>
mockCommitAndPush.mockReturnValue(okAsync(undefined)) // ✅ Also correct
mockCommitAndPush.mockReturnValue(ok('done')) // ❌ TypeScript ERROR: string ≠ void
mockCommitAndPush.mockReturnValue(true) // ❌ TypeScript ERROR: boolean ≠ ResultAsync
```

### Forbidden Patterns

1. **No untyped `vi.fn()`**:

   ```typescript
   // ❌ FORBIDDEN — returns `any`, defeats all type checking
   const mockFn = vi.fn()
   ```

2. **No `unknown` as escape hatch**:

   ```typescript
   // ❌ FORBIDDEN — `unknown` silences lint but provides no type safety
   const mockFn = vi.fn<(...args: unknown[]) => unknown>()
   ```

3. **No `unknown` in `vi.mock()` factory wrappers**:

   ```typescript
   // ❌ FORBIDDEN — erases the real function's parameter types
   vi.mock('./git', () => ({
     commitAndPush: (...args: unknown[]) => mockCommitAndPush(...args),
   }))

   // ✅ REQUIRED — uses the real parameter types
   vi.mock('./git', () => ({
     commitAndPush: (files: string[], message: string, branch: string) =>
       mockCommitAndPush(files, message, branch),
   }))
   ```

### How to Type a Mock

1. **Find the source function.** Read the module being mocked. Find the exported function.
2. **Copy its signature.** Use the exact parameter names, types, and return type.
3. **Apply to `vi.fn<Signature>()`.**

Common examples from this codebase:

```typescript
// @actions/core
const coreGetInput =
  vi.fn<(name: string, options?: { required?: boolean }) => string>()
const coreSetOutput = vi.fn<(name: string, value: string) => void>()
const coreSetFailed = vi.fn<(message: string | Error) => void>()
const coreInfo = vi.fn<(message: string) => void>()

// GitHub API wrappers (e.g., shared/github.ts)
const mockCreateOctokit = vi.fn<(token: string) => Octokit>()
const mockCreatePullRequest =
  vi.fn<
    (
      octokit: Octokit,
      owner: string,
      repo: string,
      params: PullRequestParams,
    ) => ResultAsync<PullRequest, GitHubError>
  >()

// Git operations (e.g., shared/git.ts)
const mockCommitAndPush =
  vi.fn<
    (
      files: string[],
      message: string,
      branch: string,
    ) => ResultAsync<void, GitError>
  >()
const mockCreateBranch =
  vi.fn<(branch: string) => ResultAsync<void, GitError>>()

// Logger (e.g., shared/logger.ts)
const mockLoggerInfo =
  vi.fn<(obj: Record<string, unknown>, msg?: string) => void>()
const mockLoggerError =
  vi.fn<(obj: Record<string, unknown>, msg?: string) => void>()
```

### Object Method Stubs

When mocking objects with methods (e.g., an Octokit instance), type each method:

```typescript
// ❌ FORBIDDEN
const mockOctokit = {
  issues: {
    get: vi.fn(),
    create: vi.fn(),
  },
}

// ✅ REQUIRED — type each method stub
const mockOctokit = {
  issues: {
    get: vi.fn<
      (params: {
        owner: string
        repo: string
        issue_number: number
      }) => Promise<{ data: Issue }>
    >(),
    create:
      vi.fn<
        (params: {
          owner: string
          repo: string
          title: string
          body: string
        }) => Promise<{ data: Issue }>
      >(),
  },
}
```

If the exact SDK types are complex, import them:

```typescript
import type { RestEndpointMethodTypes } from '@octokit/rest'

type GetIssueParams = RestEndpointMethodTypes['issues']['get']['parameters']
type GetIssueResponse = RestEndpointMethodTypes['issues']['get']['response']

const mockGet = vi.fn<(params: GetIssueParams) => Promise<GetIssueResponse>>()
```

### `vi.mock()` Factory Functions Must Use Real Signatures

The `vi.mock()` factory is the bridge between the mock variable and the module's export. It must preserve the real function's types end-to-end. A factory that uses `unknown` parameters erases type information even when the mock variable itself is properly typed.

**Required pattern**: The factory wrapper must mirror the real function's parameter types:

```typescript
// Source: export function getIssue(octokit: Octokit, owner: string, repo: string, number: number): ResultAsync<Issue, GitHubError>

const mockGetIssue =
  vi.fn<
    (
      octokit: Octokit,
      owner: string,
      repo: string,
      number: number,
    ) => ResultAsync<Issue, GitHubError>
  >()

// Factory uses the same parameters — types flow through correctly
vi.mock('./github', () => ({
  getIssue: (octokit: Octokit, owner: string, repo: string, number: number) =>
    mockGetIssue(octokit, owner, repo, number),
}))
```

**Alternatively**, assign the typed mock directly when hoisting is not a concern:

```typescript
vi.mock('./github', () => ({
  getIssue: mockGetIssue,
}))
```

Direct assignment is simpler and cannot introduce type mismatches between the factory wrapper and the mock. Prefer it unless the test specifically needs the wrapper (e.g., to add conditional logic).

**Forbidden**: Factories that launder types through `unknown`:

```typescript
// ❌ FORBIDDEN — args lose their types, return value becomes `any`
vi.mock('./github', () => ({
  getIssue: (...args: unknown[]) => mockGetIssue(...args),
}))
```

This is dangerous even when `mockGetIssue` is properly typed, because the factory's return type is inferred from the arrow function — which returns `any` since `mockGetIssue(...args: unknown[])` bypasses the typed overload.

### Why This Matters

An untyped mock is a lie. It tells TypeScript "trust me, this function works correctly" while allowing any return value. When the real function's signature changes (new parameter, different return type), untyped mocks silently continue returning the old shape — and tests pass while production breaks.

Typed mocks turn this silent failure into a compile-time error.
