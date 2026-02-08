---
name: executing-code-remediation
description: Use this skill to execute a code remediation plan created by verifying-code-against-spec. Validates plan structure, executes each fix with verification, runs automated checks after each change, and continues until ALL items are done. Never stops early. Triggers on "execute code remediation", "apply code fixes", "run code remediation plan".
---

# Executing Code Remediation Plans

This skill executes code remediation plans created by the `verifying-code-against-spec` skill. It enforces complete execution of ALL items with verification after each change. No early stopping.

## CRITICAL RULES

**YOU MUST COMPLETE EVERY SINGLE ITEM. NO EXCEPTIONS.**

- Do NOT stop after "the main fixes"
- Do NOT stop after "critical issues resolved"
- Do NOT stop because "tests are passing now"
- Do NOT stop because "coverage is close enough"
- Do NOT rationalize skipping ANY item
- ONLY stop when the checklist shows ALL items checked `[x]`

If you feel the urge to stop early, **YOU ARE WRONG**. Continue.

**AFTER EACH FIX, RUN VERIFICATION:**

- After code changes: Run `bun typecheck`
- After adding tests: Run `bun test:run` for the specific test file
- After all items: Run `bun test:coverage` for final verification

## Execution Process

### Phase 1: Validate Document Structure

The remediation document MUST have front matter and required sections:

```markdown
---
type: code-remediation-plan
execute-with: executing-code-remediation
spec: [path to implementation spec]
target: [directory containing code to fix]
created: [date]
---

# Code Remediation Plan

> **To execute this plan**, use the `executing-code-remediation` skill...

---

## Remediation Items

### 1. [Fix Name]

**Requirement**: [What spec item this addresses]
**Problem**: [What's wrong]
**Location**: [file:lines]
**Current code**: [snippet]
**Required change**: [snippet]
**Verification**: [How to confirm fix worked]

### 2. [Next Fix]

...

---

## Remediation Checklist

### [Category]

- [ ] [Item]
- [ ] [Item]

### Final Verification

- [ ] All checklist items complete
- [ ] `bun typecheck` passes
- [ ] `bun lint` passes
- [ ] `bun test:coverage` shows 100%
- [ ] Re-run verification skill confirms all requirements addressed
```

**Validation checks:**

1. Document has YAML front matter with `type: code-remediation-plan`
2. Front matter includes `spec` and `target` paths
3. Document has `## Remediation Items` section
4. Document has `## Remediation Checklist` section
5. Each item has: Requirement, Problem, Location, Current code, Required change, Verification
6. Checklist has `### Final Verification` subsection with automated check items

**If validation fails:**

```
VALIDATION FAILED

Missing required section: [section name]
- Expected: [what should be there]
- Found: [what was there or "nothing"]

Cannot proceed. Please fix the remediation document.
```

### Phase 2: Validate Checklist Matches Plan

Every item in the Remediation Items must have corresponding checklist item(s).

**Process:**

1. Extract all numbered items from `## Remediation Items`
2. For each item, find matching checklist entry in `## Remediation Checklist`
3. Report any discrepancies

**If validation fails:**

```
CHECKLIST MISMATCH

Plan item not in checklist:
- Plan: "3. Replace `any` Types with Proper Types"
- Expected checklist items for {file1}:{line}, {file2}:{line}, {file3}:{line}
- Found: Only one checklist item for this fix

Checklist item not in plan:
- Checklist: "- [ ] Add logging to workflow"
- No corresponding plan section found

Cannot proceed. Please fix the remediation document.
```

### Phase 3: Execute Each Fix

For each item in the plan, execute in order:

#### Step 1: Read and Understand

```markdown
## Executing: [Fix Name]

**Reading plan...**

- Requirement: [spec reference]
- Problem: [what's wrong]
- Location: [file:lines]
- Verification: [how to confirm]
```

#### Step 2: Read Current Code

Before making changes, read the actual file to confirm:

- The "Current code" in the plan matches reality
- Line numbers are still accurate
- No conflicting changes have been made

```markdown
**Reading current code at [file:lines]...**

- Plan expects: [snippet from plan]
- Actual code: [snippet from file]
- Match: YES / NO

[If NO: Adjust fix as needed, note the difference]
```

#### Step 3: Apply the Fix

Make the exact change specified in the plan.

```markdown
**Applying fix...**

Changed [file]:

- Lines [X-Y]: [description of change]

[Show the Edit tool call or code diff]
```

#### Step 4: Verify the Fix

Run the verification step specified in the plan.

```markdown
**Verifying fix...**

Verification method: [from plan]
Result: PASS / FAIL

[If code change: run bun typecheck]
[If test addition: run bun test:run for that test file]
```

**CRITICAL**: If verification fails, do NOT continue to next item. Fix the issue first.

```markdown
**Verification FAILED**

Expected: [what should happen]
Actual: [what happened]

Investigating...
[Diagnose and fix the issue]
[Re-run verification]
```

#### Step 5: Update Checklist

After successful verification, update the checklist in the remediation document.

```markdown
**Updating checklist...**
Changed: `- [ ] [item]` → `- [x] [item]`
```

#### Step 6: Show Progress

```
┌─────────────────────────────────┐
│ PROGRESS: ████░░░░░░ 4/10 (40%) │
│ Status: EXECUTING               │
│ Next: [next item name]          │
│ TypeCheck: PASSING              │
└─────────────────────────────────┘
```

### Phase 4: Continue Until Complete

After each item, check progress and continue:

```markdown
## Progress Check

Completed: X/Y items
Remaining:

- [ ] Item A
- [ ] Item B
- [ ] Item C

**Continuing to next item...**
```

**NEVER output:**

- "The main issues are fixed"
- "Tests are passing now, that's good enough"
- "Coverage is at 95%, close enough"
- "Core functionality works"
- "We can handle the rest in a follow-up"

**ALWAYS output:**

- "X items remaining. Continuing..."
- "Not done yet. Next item: [name]"
- "Checklist shows unchecked items. Cannot stop."

### Phase 5: Run Final Automated Checks

Only when ALL checklist items (except Final Verification) show `[x]`:

````markdown
## Running Final Automated Checks

### TypeCheck

```bash
bun typecheck
```
````

Result: PASS / FAIL (N errors)

### Lint

```bash
bun lint
```

Result: PASS / FAIL (N warnings)

### Test Coverage

```bash
bun test:coverage
```

Result: X% coverage

Coverage by file:

- {file1}.ts: 100%
- {file2}.ts: 100%
- {file3}.ts: 100%

````

**If any check fails:**

```markdown
## AUTOMATED CHECK FAILED

Check: [typecheck/lint/coverage]
Result: [error details]

This must be fixed before remediation is complete.

Investigating...
[Diagnose and fix]
[Re-run check]
````

### Phase 6: Final Verification

Only when ALL automated checks pass:

```markdown
## Final Verification

Checklist status: 10/10 items complete

Automated checks:

- [x] `bun typecheck` passes (0 errors)
- [x] `bun lint` passes (0 warnings)
- [x] `bun test:coverage` shows 100%

Final checklist verification:

- [x] All checklist items marked complete
- [x] No unchecked items remain
- [x] All automated checks pass

┌─────────────────────────────────┐
│ PROGRESS: ██████████ 10/10 ✓ │
│ Status: COMPLETE │
│ TypeCheck: PASSING │
│ Lint: PASSING │
│ Coverage: 100% │
└─────────────────────────────────┘

**CODE REMEDIATION COMPLETE**

All items from the remediation plan have been executed and verified.

Recommendation: Run the `verifying-code-against-spec` skill again to confirm all requirements are now addressed.
```

## Execution Order

Execute items in this order for maximum efficiency:

1. **Type fixes first** - Fix `any`, `as`, `var!` violations
2. **Structural changes** - Add missing functions, interfaces
3. **Logic implementations** - Implement missing behaviors
4. **Zod validation** - Add schema validation
5. **Error handling** - Convert to Result types
6. **Tests last** - Add tests for implemented code

This order minimizes re-work since later items depend on earlier fixes being correct.

## Handling Blockers

If you cannot complete an item:

1. **Do NOT skip it** - Document the blocker
2. **Do NOT mark it complete** - Leave it unchecked
3. **Do NOT continue past it** - Stop and report

```markdown
## BLOCKED

Item: [name]
Location: [file:lines]
Reason: [why it cannot be completed]

Examples of valid blockers:

- File does not exist and cannot be created
- Dependency not installed
- Conflicting changes from another branch
- Spec is ambiguous and needs clarification

This item cannot be completed without human intervention.
Remaining items may depend on this.

Please resolve and re-run.
```

## Anti-Patterns to Avoid

### DO NOT say:

- "The main functionality is working"
- "Tests are passing, we're done"
- "Coverage is high enough"
- "These remaining items are minor"
- "We can address these later"
- "The important fixes are in"

### DO say:

- "5 items remaining. Continuing to next item."
- "Not done. Executing item 6 of 10."
- "Checklist shows unchecked items. Cannot stop."
- "Coverage is 95%, need 100%. Adding missing tests."
- "TypeCheck shows 1 error. Must fix before proceeding."

## Progress Tracking

After every item, update and display:

```
┌─────────────────────────────────┐
│ PROGRESS: ██████░░░░ 6/10 (60%) │
│ Status: EXECUTING               │
│ Next: Add Zod validation        │
│ TypeCheck: PASSING              │
│ Last Test: PASSING              │
└─────────────────────────────────┘
```

When complete:

```
┌─────────────────────────────────┐
│ PROGRESS: ██████████ 10/10 ✓   │
│ Status: COMPLETE                │
│ TypeCheck: 0 errors             │
│ Lint: 0 warnings                │
│ Coverage: 100%                  │
└─────────────────────────────────┘
```

## Verification Commands Reference

```bash
# After any code change
bun typecheck

# After adding/modifying tests
bun test:run path/to/test.ts

# After all changes complete
bun test:coverage

# To check specific file coverage
bun test:coverage --reporter=verbose

# Full verification sequence
bun typecheck && bun lint && bun test:coverage
```

## Summary

1. **Validate structure** → Abort if invalid
2. **Validate checklist** → Abort if mismatched
3. **Execute each item** → Verify after each, update checklist
4. **Never stop early** → ALL items must be checked
5. **Run automated checks** → TypeCheck, lint, coverage must pass
6. **Report completion** → Only when 100% done with all checks passing
