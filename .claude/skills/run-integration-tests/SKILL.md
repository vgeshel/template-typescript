---
name: run-integration-tests
description: Run integration tests one at a time, fix ALL failures at the source using /systematic-debugging, and repeat until every test passes. No exceptions for pre-existing, environmental, or flaky failures. Removing or disabling tests is prohibited.
---

# Run Integration Tests

## Overview

Run the project's integration tests one at a time. When any test fails, fix it at the source using the /systematic-debugging skill. Repeat until every single test passes. No test is left behind.

## The Iron Laws

```
1. ALL FAILURES MUST BE FIXED. NO EXCEPTIONS.
2. REMOVING OR DISABLING FAILING TESTS IS PROHIBITED.
3. EVERY FAILURE IS FIXED USING /systematic-debugging.
4. THE SKILL ENDS ONLY WHEN ALL TESTS PASS.
```

There are **no valid excuses** for a failing test:

| Excuse                                | Response                                        |
| ------------------------------------- | ----------------------------------------------- |
| "Pre-existing failure"                | Fix it. It's a failure.                         |
| "Environmental issue"                 | Fix the environment or the test's assumptions.  |
| "Flaky test"                          | Find the root cause. Flakiness is a bug.        |
| "Agent-dependent / non-deterministic" | Make assertions robust or fix the agent prompt. |
| "Works on CI but not locally"         | Fix it so it works everywhere.                  |
| "Too expensive to run repeatedly"     | Budget is not a reason to skip. Fix the test.   |

## Prohibited Actions

You are **forbidden** from:

- Removing test cases
- Commenting out test cases
- Adding `.skip`, `.todo`, or `skipIf` to failing tests
- Weakening assertions to make tests pass (e.g., changing `toBe(5)` to `toBeGreaterThan(0)`)
- Marking tests as "known failures" or "expected failures"
- Claiming a test "cannot be fixed" without exhausting /systematic-debugging

**All failures must be fixed at the source** — meaning the production code, test setup, environment configuration, or test fixture is corrected so the test passes as originally written.

## Procedure

### Step 1: Discover Integration Tests

Find all integration test files:

```bash
# Primary integration test
ls scripts/e2e.integration.test.ts

# Any other integration test files
find . -name "*.integration.test.ts" -not -path "./node_modules/*"
```

### Step 2: Run Tests One at a Time

Run each integration test file individually. Never run all integration tests in a single batch — failures in one test can mask or cause failures in others.

```bash
INTEGRATION_TEST=true bun vitest run <test-file> --reporter=verbose
```

For the primary e2e integration test, run individual test cases:

```bash
# List test names first
INTEGRATION_TEST=true bun vitest run scripts/e2e.integration.test.ts --reporter=verbose 2>&1 | head -100

# Run specific test by name
INTEGRATION_TEST=true bun vitest run scripts/e2e.integration.test.ts -t "test name here" --reporter=verbose
```

### Step 3: On Any Failure — Use /systematic-debugging

When a test fails:

1. **Capture the exact failure**: test name, error message, stack trace, full output.
2. **Invoke /systematic-debugging** with the captured failure information.
3. Follow the four phases completely:
   - **Phase 1: Root Cause Investigation** — Read error messages, reproduce, check changes, trace data flow.
   - **Phase 2: Pattern Analysis** — Find working examples, compare.
   - **Phase 3: Hypothesis and Testing** — Form hypothesis, test minimally.
   - **Phase 4: Implementation** — Create regression test (if unit-testable), fix, verify.
4. After the fix, **rerun the exact failing test** to confirm it passes.

### Step 4: Rerun After Fix

After fixing a failure, rerun the same test:

```bash
INTEGRATION_TEST=true bun vitest run <test-file> -t "fixed test name" --reporter=verbose
```

If it passes, move to the next test. If it fails, go back to Step 3 for the new failure.

### Step 5: Verify No Regressions

After all individual tests pass, run the full integration suite:

```bash
INTEGRATION_TEST=true bun vitest run scripts/e2e.integration.test.ts --reporter=verbose
```

If any test fails in the full run (e.g., due to test interaction), go back to Step 3.

### Step 6: Run Unit Tests

Confirm no regressions in the unit test suite:

```bash
bun typecheck && bun lint && bun test:coverage
```

All must pass. If anything fails, fix it using /systematic-debugging before proceeding.

### Step 7: Completion Claim

Only claim completion when ALL of the following are true:

- [ ] Every integration test passes individually
- [ ] All integration tests pass in a single full run
- [ ] `bun typecheck` passes
- [ ] `bun lint` passes
- [ ] `bun test:coverage` passes with 100% coverage

Include proof:

```
Integration Test Results:
- Test file: <path>
- Tests run: <N>
- Tests passed: <N>
- Tests failed: 0

Unit Test Results:
- bun typecheck: PASS
- bun lint: PASS
- bun test:coverage: PASS (100% coverage)
```

## Handling LLM-Dependent Tests

Some integration tests use LLM agents whose output varies between runs. When these tests fail:

1. **Do NOT blame the LLM.** The test exists because the behavior should be reliable.
2. **Investigate the prompt.** Is it clear enough? Does it constrain the output format?
3. **Investigate the assertions.** Are they testing the right thing at the right granularity?
4. **Investigate the parsing.** Does the JSON extraction / Zod validation handle edge cases?
5. **Fix at the source:**
   - Improve the prompt to produce more consistent output
   - Make parsing more robust (use shared utilities from `actions/shared/json-extract.ts`)
   - Adjust assertions to test meaningful behavior without being fragile
   - Add retries with backoff for genuinely transient API errors (not for logic failures)

**"The LLM gave bad output" is not an excuse.** If the test expects certain behavior from the LLM, either the prompt needs improvement or the assertion needs to test at the right level of abstraction.

## Handling Environment-Dependent Tests

Some tests require specific environment setup (API keys, authentication, network access). When these fail:

1. **Check the environment requirements** documented in the test file header.
2. **Verify all required environment variables** are set.
3. **Verify authentication** (e.g., `claude` CLI auth, `gh` CLI auth).
4. **If the environment cannot be set up**, fix the test to fail gracefully with a clear skip message — but this is a LAST RESORT and must be documented.

## Quick Reference

| Phase      | Action                                 | Success Criteria                         |
| ---------- | -------------------------------------- | ---------------------------------------- |
| Discover   | Find all integration test files        | List of all `.integration.test.ts` files |
| Run        | Execute each test individually         | Capture pass/fail for each test          |
| Fix        | /systematic-debugging for each failure | Root cause identified and fixed          |
| Rerun      | Confirm fix works                      | Previously failing test now passes       |
| Regression | Full suite run                         | All tests pass together                  |
| Unit       | Full unit suite                        | typecheck + lint + coverage pass         |
| Complete   | All green                              | Zero failures anywhere                   |
