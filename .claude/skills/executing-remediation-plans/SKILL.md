---
name: executing-remediation-plans
description: Use this skill to execute a remediation plan created by verifying-plans-against-requirements. Validates structure, executes each item, checks off completed work, and continues until ALL items are done. Never stops early. Triggers on "execute remediation", "apply remediation", "run remediation plan".
---

# Executing Remediation Plans

This skill executes remediation plans created by the `verifying-plans-against-requirements` skill. It enforces complete execution of ALL items with no early stopping.

## CRITICAL RULES

**YOU MUST COMPLETE EVERY SINGLE ITEM. NO EXCEPTIONS.**

- Do NOT stop after "the important items"
- Do NOT stop after "high-priority work"
- Do NOT stop because "the main issues are addressed"
- Do NOT stop because "remaining items are minor"
- Do NOT rationalize skipping ANY item
- ONLY stop when the checklist shows ALL items checked `[x]`

If you feel the urge to stop early, **YOU ARE WRONG**. Continue.

## Execution Process

### Phase 1: Validate Document Structure

The remediation document MUST have front matter and required sections:

```markdown
---
type: remediation-plan
execute-with: executing-remediation-plans
source: [path to source requirements]
target: [path to plan being remediated]
created: [date]
---

# Remediation Plan

> **To execute this plan**, use the `executing-remediation-plans` skill...

---

## Remediation Plan

### 1. [Issue Name]

**Problem**: ...
**Fix**: ...
**Location**: ...
**Content to add/change**: ...

### 2. [Next Issue]

...

---

## Remediation Checklist

### [Category]

- [ ] [Item]
- [ ] [Item]

### Final Verification

- [ ] All checklist items complete
      ...
```

**Validation checks:**

1. Document has YAML front matter with `type: remediation-plan`
2. Front matter includes `source` and `target` paths
3. Document has `## Remediation Plan` section
4. Document has `## Remediation Checklist` section
5. Each plan item has: Problem, Fix, Location, Content
6. Checklist has `### Final Verification` subsection

**If validation fails:**

```
VALIDATION FAILED

Missing required section: [section name]
- Expected: [what should be there]
- Found: [what was there or "nothing"]

Cannot proceed. Please fix the remediation document.
```

### Phase 2: Validate Checklist Matches Plan

Every item in the Remediation Plan must have corresponding checklist item(s).

**Process:**

1. Extract all numbered items from `## Remediation Plan`
2. For each plan item, find matching checklist items in `## Remediation Checklist`
3. Report any discrepancies

**If validation fails:**

```
CHECKLIST MISMATCH

Plan item not in checklist:
- Plan: "Add edge case examples to Gap 2"
- Expected checklist item: "- [ ] Add edge case examples..."
- Found: [nothing]

Checklist item not in plan:
- Checklist: "- [ ] Add foo to bar"
- No corresponding plan section found

Cannot proceed. Please fix the remediation document.
```

### Phase 3: Execute Plan Items

For each item in the plan:

1. **Read the plan item** - Understand Problem, Fix, Location, Content
2. **Execute the fix** - Make the specified changes
3. **Verify the fix** - Confirm the change was applied correctly
4. **Update the checklist** - Change `- [ ]` to `- [x]` for completed item
5. **Continue to next item** - Do NOT stop

**Execution format:**

```markdown
## Executing: [Plan Item Name]

**Reading plan...**

- Problem: [summary]
- Fix: [summary]
- Location: [file:lines]

**Applying fix...**
[Show the actual changes made]

**Verifying...**
[Confirm change is correct]

**Updating checklist...**
Changed: `- [ ] [item]` → `- [x] [item]`

**Status: 3/10 items complete. Continuing...**
```

### Phase 4: Continue Until Complete

After each item, check progress:

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

- "The main issues are addressed"
- "Remaining items are lower priority"
- "Good stopping point"
- "Core issues fixed"

**ALWAYS output:**

- "X items remaining. Continuing..."
- "Not done yet. Next item: [name]"

### Phase 5: Final Verification

Only when ALL checklist items show `[x]`:

1. Re-read the entire checklist
2. Count checked vs unchecked items
3. If ANY unchecked items remain → continue execution
4. If ALL items checked → run final verification steps

```markdown
## Final Verification

Checklist status: 10/10 items complete

Running final checks:

- [ ] Re-read checklist: All items [x] ✓
- [ ] No unchecked items remain ✓
- [ ] Final Verification section items complete ✓

**REMEDIATION COMPLETE**

All items from the remediation plan have been executed.
```

## Anti-Patterns to Avoid

### DO NOT say:

- "I've addressed the key issues"
- "The remaining items are minor"
- "This is a good stopping point"
- "The important work is done"
- "We can handle the rest later"
- "These last few items are optional"

### DO say:

- "5 items remaining. Continuing to next item."
- "Not done. Executing item 6 of 10."
- "Checklist shows unchecked items. Cannot stop."

## Handling Blockers

If you cannot complete an item:

1. **Do NOT skip it** - Document the blocker
2. **Do NOT mark it complete** - Leave it unchecked
3. **Do NOT continue past it** - Stop and report

```markdown
## BLOCKED

Item: [name]
Reason: [why it cannot be completed]

This item cannot be completed without human intervention.
Remaining items may depend on this.

Please resolve and re-run.
```

## Progress Tracking

After every item, update and display:

```
┌─────────────────────────────────┐
│ PROGRESS: ██████░░░░ 6/10 (60%) │
│ Status: EXECUTING               │
│ Next: [item name]               │
└─────────────────────────────────┘
```

When complete:

```
┌─────────────────────────────────┐
│ PROGRESS: ██████████ 10/10 ✓   │
│ Status: COMPLETE                │
└─────────────────────────────────┘
```

## Summary

1. **Validate structure** → Abort if invalid
2. **Validate checklist** → Abort if mismatched
3. **Execute each item** → Update checklist after each
4. **Never stop early** → ALL items must be checked
5. **Report completion** → Only when 100% done
