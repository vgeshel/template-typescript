---
name: verifying-plans-against-requirements
description: Use this skill before finalizing any plan, remediation document, or implementation spec. Systematically verifies that a plan document addresses ALL requirements from a source document and complies with project rules. Prevents superficial "check twice" verification that misses gaps. Triggers on "verify plan", "check plan against", "validate completeness".
---

# Verifying Plans Against Requirements

This skill ensures plans are truly comprehensive by forcing systematic, line-by-line verification rather than superficial self-assessment.

## When to Use

- Before finalizing any plan document
- After writing a remediation plan for identified gaps
- When asked to "check" or "verify" a plan against requirements
- Before claiming a document is "complete" or "comprehensive"

## The Problem This Solves

Superficial verification looks like:

- Reading your own plan and feeling good about it
- Adding "✅" checkmarks without verifying content
- Focusing only on numbered items while missing other sections
- Claiming "checked twice" without systematic comparison

## Verification Process

### Step 1: Extract ALL Requirements from Source

Read the source document and extract EVERY distinct requirement, concern, or recommendation into a numbered list.

**Extract from ALL sections, not just numbered items:**

- Numbered gaps/issues
- Recommendations sections
- Concerns mentioned in assessments
- Items in tables
- Examples that imply requirements
- Alignment/status tables with warnings

**Format:**

```
## Extracted Requirements

1. [Section: Gap 1] Use structured output instead of XML
2. [Section: Gap 2] Add concrete test quality examples
3. [Section: Test Quality Assessment] Add integration tests for file system
4. [Section: Test Quality Assessment] Add tests verifying prompt effectiveness
5. [Section: Alignment Table] Address edge case coverage (marked ⚠️)
...
```

### Step 2: Check Project Rules

Read `.claude/rules/*.md` and identify rules that could be violated in a plan document.

**Common violations to check:**

- Priority labels (P0/P1/P2/P3, "high priority", "low priority")
- Time estimates
- Skipping items as "deferred" without addressing them

**Format:**

```
## Applicable Project Rules

1. [fundamental-principles.md] No priorities - fix ALL issues
2. [fundamental-principles.md] No time estimates
3. [testing.md] 100% test coverage required
...
```

### Step 3: Verify Each Requirement

For EACH extracted requirement, find the specific content in the plan that addresses it.

**Do NOT:**

- Mark as addressed if only mentioned in passing
- Accept vague references ("this is covered by Gap 2")
- Trust summary tables without verifying underlying content

**Format:**

```
## Verification Results

### Requirement 1: [Section: Gap 1] Use structured output instead of XML
- **Status**: ADDRESSED
- **Location in plan**: Lines 40-155, Gap 1 section
- **Specific content**: Describes tryParseJsonReviewResult function, JSON schema export, prompt changes

### Requirement 4: [Section: Test Quality Assessment] Add tests verifying prompt effectiveness
- **Status**: NOT ADDRESSED
- **Issue**: Plan adds examples to prompt but does not add tests that verify the reviewer catches trivial tests
- **Gap**: Need test that runs reviewer against known-bad code and verifies it fails
```

### Step 4: Check Rule Compliance

Scan the plan document for violations of each applicable project rule.

**Format:**

```
## Rule Compliance

### Rule: No priorities
- **Status**: VIOLATED
- **Violations found**:
  - Line 14: "Priority Order" table header
  - Line 27: "(P0)" label
  - Line 325: "(P1)" label
  - Lines 1282-1338: All checklist sections use priority labels
```

### Step 5: Generate Report

Produce a clear report with:

1. **Summary**: X of Y requirements addressed, Z rule violations
2. **Unaddressed Requirements**: List with specific gaps
3. **Rule Violations**: List with line numbers
4. **Recommendations**: What to add/change

## Output Format

```markdown
# Plan Verification Report

## Summary

- **Requirements**: X/Y addressed (Z unaddressed)
- **Rule Compliance**: N violations found
- **Verdict**: PASS / FAIL

## Unaddressed Requirements

| #   | Requirement                          | Source Section          | Issue                                                               |
| --- | ------------------------------------ | ----------------------- | ------------------------------------------------------------------- |
| 4   | Tests verifying prompt effectiveness | Test Quality Assessment | Not addressed - plan adds prompt examples but no verification tests |
| 5   | Edge case coverage                   | Alignment Table         | Only error path examples, no boundary/edge case guidance            |

## Rule Violations

| Rule          | Location                     | Violation               |
| ------------- | ---------------------------- | ----------------------- |
| No priorities | Lines 14, 27, 325, 1282-1338 | Uses P0/P1/P2/P3 labels |

## Required Changes

1. Add test that verifies reviewer catches trivial tests (requirement #4)
2. Add edge case examples to Gap 2 section (requirement #5)
3. Remove all priority labels and reorganize by execution order (rule violation)
```

## Step 6: Produce Remediation Plan

If verification fails, produce a concrete plan to fix each gap.

**IMPORTANT**: Always include front matter that specifies how to execute the plan:

````markdown
---
type: remediation-plan
execute-with: executing-remediation-plans
source: [path to the source requirements document]
target: [path to the plan being remediated]
created: [date]
---

# Remediation Plan

> **To execute this plan**, use the `executing-remediation-plans` skill:
>
> ```
> /skill executing-remediation-plans
> ```
>
> The skill will validate structure, execute each item, and track progress.

---

## Remediation Plan

### 1. [Unaddressed Requirement or Violation]

**Problem**: [What's missing or wrong]

**Fix**: [Exact changes to make]

**Location**: [File and line numbers to modify]

**Content to add/change**:
````

[Actual text or code to add]

```

### 2. [Next issue]
...

---

## Remediation Checklist

### [Category 1: e.g., Rule Violation Name]
- [ ] [Specific action with file and line number]
- [ ] [Next action]

### [Category 2: e.g., Requirement Name]
- [ ] [Specific action]

### Final Verification
- [ ] All checklist items complete
- [ ] No violations remain
- [ ] All requirements addressed
```

The remediation plan must be:

- **Specific**: Exact file paths, line numbers, content
- **Actionable**: Can be executed without further research
- **Complete**: Covers every unaddressed requirement and violation
- **Trackable**: Includes a checklist so execution state is explicit and clear

## Output

**REQUIRED**: The remediation plan MUST be saved to a file, not just output in the conversation.

### File Location

Save the remediation plan in the **same directory** as the source requirements document:

- If requirements are at `.studio/123-feature/implementation-spec.md`
- Save remediation plan to `.studio/123-feature/plan-remediation-plan.md`

- If requirements are at `docs/workflow-refactoring/spec.md`
- Save remediation plan to `docs/workflow-refactoring/plan-remediation-plan.md`

### File Naming

Use the pattern: `plan-remediation-plan.md` (or `plan-remediation-plan-{date}.md` if multiple iterations)

### Why Files Are Required

1. **Trackable** - Progress can be tracked across sessions
2. **Executable** - The `executing-remediation-plans` skill can read and execute it
3. **Auditable** - History of what was verified and fixed
4. **Shareable** - Can be reviewed by humans before execution

## Key Principles

1. **Extract first, verify second** - Never verify while reading source
2. **Line-by-line, not summary** - Check each requirement individually
3. **Specific locations required** - "Addressed in Gap 2" is not sufficient
4. **Rules are non-negotiable** - Any violation fails the check
5. **Verify content, not claims** - Ignore "✅" tables, check actual content
6. **Always produce remediation** - Don't just report problems, fix them
