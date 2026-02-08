---
name: verify-test-claims
enabled: true
event: stop
pattern: .*
action: block
---

**STOP - Verify test claims before completing!**

Before stopping, you MUST verify you haven't lied about test results.

**Check each of these:**

1. **Did you claim any tests pass?** (Look for: ✅, "tests pass", "all checks passed", "E2E test passes", "coverage is 100%", etc.)

2. **For each claim, did you actually run that specific test in THIS session, AFTER your changes?**
   - `bun test:coverage` verifies unit tests and coverage
   - `INTEGRATION_TEST=true bun test:run scripts/e2e.integration.test.ts` verifies E2E
   - These are DIFFERENT tests - running one doesn't verify the other

3. **Did you show the actual command output?** If you claimed tests pass but didn't include the output, you may have lied.

**If you made claims without verification:**

- Do NOT stop
- Run the actual tests now
- Correct any false claims

**Common lies to catch:**

- Claiming E2E tests pass after only running unit tests
- Claiming "all tests pass" without running `bun test:coverage`
- Using ✅ checkmarks without corresponding test output
- Summarizing previous session results as current verification
