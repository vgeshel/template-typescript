# Mock Contract Testing

## Read Implementations Before Mocking

When calling a shared function from a workflow, **read its implementation** (not just its type signature) to enumerate all possible return shapes. The caller's tests must exercise every distinct return shape.

Type signatures tell you `ResultAsync<T, E>`. Implementations tell you there are 5 variants of `T` and 2 ways to get `E`.

## Reference Contract Tests

The project maintains a contract test file that verifies mock behavior matches real function behavior. When mocking a shared function:

1. Check the contract test file for existing contract tests
2. Ensure your mock return values match the documented shapes
3. If no contract test exists for the function you're mocking, add one

## When Adding a New Shared Function

If you create a new shared function that consumers will mock, add a contract test section that:

- Tests the real function with representative inputs
- Documents all distinct return shapes
- Lists which workflow test files mock this function

## `CommitAllResult` — 5 Variants

Every caller of `commitAllAndPush` must handle all 5 `CommitAllResult` variants:

| Variant       | Shape                                                    | Expected behavior                  |
| ------------- | -------------------------------------------------------- | ---------------------------------- |
| No changes    | `{ success: true, filesChanged: [] }`                    | Succeed or skip                    |
| Success       | `{ success: true, filesChanged: [...], commitSha }`      | Normal flow                        |
| Hooks failure | `{ success: false, failureReason: 'hooks', hookOutput }` | Retry with agent fix               |
| Push failure  | `{ success: false, failureReason: 'push', commitSha }`   | `resolveCommitResult` for recovery |
| Other failure | `{ success: false, failureReason: 'other', hookOutput }` | Fail or escalate                   |

Plus `Err(GitError)` for git command failures (e.g., not a git repository).

All `commitAllAndPush` callers should include push recovery via `resolveCommitResult`, unless there is a documented reason not to (e.g., initial push to a new branch where non-fast-forward is impossible).
