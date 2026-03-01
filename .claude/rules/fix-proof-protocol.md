# Bugfix Proof Protocol

This rule defines when a bug/CI issue may be called `fixed`.

## Status Terms (Mandatory)

- `patched`: Code changed, but the exact failing path has not been proven green yet.
- `fixed`: The exact failing path was reproduced and then rerun successfully after the fix.

Never use `fixed` when the status is only `patched`.

## Required Proof Sequence

For any bug fix, test failure fix, or CI failure fix:

1. Identify the exact failing command/test from the source artifact (CI log, error report, stack trace).
2. Reproduce the failure using that exact command/path when possible.
3. Add a regression test (or equivalent automated check) that fails before the fix.
4. Implement the fix.
5. Rerun the exact failing command/path and confirm success.
6. Run project verification commands (`bun typecheck`, `bun lint`, `bun test:changed`, and `bun test:coverage` unless explicitly out of scope).

## Completion Claim Format

Before claiming completion, include a `Proof` section with:

- Exact command(s) run
- Whether each command failed before and passed after
- Final exit/result summary

## If Exact Reproduction Is Not Possible Locally

If environment constraints block exact reproduction (e.g., missing credentials, unavailable CI-only infra):

- State explicitly: `patched, not proven locally`.
- Explain the blocker concretely.
- Provide the nearest equivalent local verification run.
- Do not claim `fixed` until the relevant CI check passes.
