---
name: fixing-bugs
description: Use this skill when fixing bugs, errors, failures, or issues. Triggers on bug reports, error logs, stack traces, "something is broken", "this doesn't work", CI failures, test failures, or unexpected behavior. Enforces strict TDD discipline - reproduction test MUST come before any fix attempt.
---

# Bug Fixing with Mandatory TDD

**This workflow is non-negotiable. You MUST follow it exactly.**

## The Iron Rule

**NO FIX WITHOUT A FAILING TEST FIRST.**

You are forbidden from:

- Guessing at the root cause without evidence
- Making code changes before having a failing test
- Claiming "the issue is X" without a test proving it
- Proceeding if you cannot reproduce the bug in a test

## Workflow Checklist

Copy this checklist and track your progress:

```
Bug Fix Progress:
- [ ] Step 1: Understand the bug report
- [ ] Step 2: Write a failing test that reproduces the bug
- [ ] Step 3: REVIEW - Verify the test is a valid reproduction
- [ ] Step 4: Implement the minimal fix
- [ ] Step 5: Verify the test passes
- [ ] Step 6: Run full test suite
- [ ] Step 7: Refactor if needed (tests must stay green)
```

---

## Step 1: Understand the Bug Report

Before writing any code, fully understand:

- What is the expected behavior?
- What is the actual behavior?
- What are the reproduction steps?
- What environment/context does this occur in?

If any of these are unclear, **ASK THE USER** before proceeding.

---

## Step 2: Write a Failing Test (RED)

**This is the most critical step. Do not skip or shortcut it.**

Create a test that:

1. Sets up the conditions described in the bug report
2. Performs the action that triggers the bug
3. Asserts the EXPECTED behavior (which will fail because of the bug)

### Test Quality Requirements

Your test MUST be:

- **Specific**: Tests the exact scenario from the bug report
- **Realistic**: Uses realistic inputs, not trivial examples
- **Meaningful**: Asserts on actual values, not just "no exception"
- **Isolated**: Tests one thing, fails for one reason

### What If You Can't Write a Test?

If you cannot write a test that reproduces the bug, you MUST:

1. **STOP immediately**
2. **Explain to the user** what you tried and why it didn't work
3. **Ask for guidance** - perhaps:
   - The bug report is incomplete
   - You need more context about the system
   - The bug requires integration/E2E testing you can't do
   - The reproduction steps are ambiguous

**DO NOT PROCEED WITHOUT A FAILING TEST.**

---

## Step 3: REVIEW - Verify Test Validity

Before proceeding, critically review your failing test:

### Validation Checklist

Ask yourself:

- [ ] Does this test fail for the RIGHT reason (the reported bug)?
- [ ] Is the test actually testing the reported scenario?
- [ ] Would this test have caught the bug if written before the bug existed?
- [ ] Is the assertion checking meaningful behavior, not implementation details?
- [ ] Does the error message/failure match the bug report's symptoms?

### Red Flags - Your Test May Be Invalid

STOP and reconsider if:

- The test fails but the error doesn't match the bug report
- The test is trivially simple (one-liner with no setup)
- The test doesn't use realistic inputs from the bug report
- You're not sure WHY the test fails
- The test seems to pass sometimes (flaky)

### Critical: Test Behavior, Not Implementation

**Your test failure message MUST match the production error.**

If the production error was:

```
Claude Code executable not found at .../dist/cli.js
```

Then your test failure should produce that SAME error message. NOT:

```
expected vi.fn() to be called 2 times, but got 0 times
```

The second test is testing implementation (was a function called?) not behavior (does the system work?).

**Ask yourself**: If I showed someone the test failure, would they understand it's the same bug from production?

| Bad (Implementation)       | Good (Behavior)                                  |
| -------------------------- | ------------------------------------------------ |
| "mock was called 0 times"  | "Claude Code executable not found at..."         |
| "expected cp to be called" | Actually run the built artifact and check output |
| "file X exists"            | Run the system and verify it doesn't error       |

### Confirmation

Run the test and examine the failure:

```
bun test:run <test-file> --reporter=verbose
```

Read the failure output carefully. Does it demonstrate the exact problem described in the bug report?

If YES with high confidence: proceed to Step 4.
If NO or UNCERTAIN: return to Step 2 or ask the user for help.

---

## Step 4: Implement the Minimal Fix (GREEN)

Only now may you modify production code.

Write the **minimum code necessary** to make the test pass:

- Don't refactor yet
- Don't fix "nearby" issues
- Don't improve code style
- Just make the test green

---

## Step 5: Verify the Test Passes

Run your specific test:

```
bun test:run <test-file>
```

The test MUST pass. If it doesn't, your fix is incomplete.

---

## Step 6: Run Full Test Suite

Ensure you haven't broken anything:

```
bun test:coverage
```

All tests must pass. Coverage must remain at required levels.

---

## Step 7: Refactor (Optional)

Now you may clean up, but:

- Keep all tests green
- Run tests after each change
- Don't introduce new behavior

---

## Common Mistakes to Avoid

### 1. "I know what the problem is"

No. You have a hypothesis. A test proves or disproves it.

### 2. "The fix is obvious"

Even obvious fixes need tests. The test documents the bug and prevents regression.

### 3. "I can't easily test this"

Then ask for help. Don't skip the test.

### 4. "I'll write the test after"

No. That's not TDD. The test comes FIRST.

### 5. "The test passes but I'm not sure it's right"

Then it's not right. Review it again or ask for help.

---

## Examples

### Good: Proper Bug Fix Flow

```
User: "The login fails when email has uppercase letters"

Step 1: Understand - emails with uppercase should work but don't
Step 2: Write test:
  it('accepts uppercase letters in email', () => {
    const result = login('User@Example.com', 'password')
    expect(result.success).toBe(true)  // This will FAIL (the bug)
  })
Step 3: Run test, confirm it fails because uppercase emails are rejected
Step 4: Fix the code (e.g., normalize email to lowercase)
Step 5: Test passes
Step 6: All tests pass
```

### Bad: Skipping the Test

```
User: "The login fails when email has uppercase letters"

"I see the issue - the code does case-sensitive comparison.
Let me fix that by adding .toLowerCase()..."

WRONG! No test was written. How do you know that's the real issue?
What if there are multiple places with this bug? What prevents regression?
```

---

## Integration Tests for Runtime Bugs

Some bugs only manifest at runtime in the real environment. Unit tests with mocks cannot catch these. You need integration tests.

### When to Use Integration Tests

Use integration tests when the bug involves:

- **Build artifacts**: Files missing after bundling, dynamic imports failing
- **Runtime environment**: Environment variables, file paths, process spawning
- **External systems**: APIs, databases, file systems in production context
- **Dynamic loading**: Modules loaded at runtime, not statically imported

### Example: Build Artifact Bug

**Production error:**

```
Claude Code executable not found at .../dist/cli.js
```

**Bad unit test (mocks don't catch the real issue):**

```typescript
it('copies cli.js', () => {
  expect(mockCp).toHaveBeenCalledTimes(2) // Tests implementation, not behavior
})
```

**Good integration test (actually runs the built artifact):**

```typescript
it('can run built action without "executable not found" error', async () => {
  const actionPath = join(ACTIONS_DIR, 'pm-agent', 'dist', 'index.js')

  // Actually spawn the built artifact
  const child = spawn('node', [actionPath], {
    env: { GITHUB_REPOSITORY: 'test/repo' },
  })
  const output = await collectOutput(child)

  // Assert on actual behavior, not implementation
  expect(output).not.toContain('Claude Code executable not found')
})
```

### Integration Test Structure

Integration tests should:

1. **Run the real build** - not mocked
2. **Execute the actual artifact** - spawn the process
3. **Check real output** - stdout/stderr, not mock calls
4. **Be skipped in normal test runs** - they're slow and require setup

### Skipping Integration Tests

Use `describe.skipIf` to skip integration tests unless explicitly enabled:

```typescript
describe.skipIf(!process.env.INTEGRATION_TEST)(
  'build-actions integration tests',
  () => {
    beforeAll(() => {
      // Run the actual build
      execSync('bun run build', { cwd: PROJECT_ROOT, stdio: 'inherit' })
    })

    it('produces working artifacts', async () => {
      // Test real behavior
    })
  },
)
```

Run integration tests explicitly:

```bash
INTEGRATION_TEST=true bun test:run <test-file>
```

### CI Configuration

Add a separate workflow for integration tests:

```yaml
# .github/workflows/integration-test.yml
jobs:
  integration:
    steps:
      - run: bun test:run --reporter=verbose
        env:
          INTEGRATION_TEST: true
```
