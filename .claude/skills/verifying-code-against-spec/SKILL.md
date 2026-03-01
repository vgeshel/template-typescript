---
name: verifying-code-against-spec
description: Use this skill to verify that implemented code comprehensively satisfies an implementation spec. Systematically checks EVERY requirement and deliverable against actual code, verifies compliance with project rules, and produces detailed remediation plans. Triggers on "verify code against spec", "check implementation", "verify implementation completeness".
---

# Verifying Code Against Implementation Spec

This skill ensures code implementations are truly complete by forcing systematic verification of EVERY requirement in the implementation spec against actual code, plus compliance with ALL project rules.

## CRITICAL: Complete Verification Required

**The report produced by this skill must be 100% complete.** Every requirement must have a definitive status with concrete evidence.

### Forbidden Phrases

The report may NEVER contain:

- "Need to verify"
- "Need to investigate"
- "Should check"
- "Requires further analysis"
- "Not yet confirmed"
- "TBD" or "TODO"
- "❓" or question marks indicating uncertainty
- Any equivalent deferral language

### Every Requirement Must Have

- **Definitive status**: ADDRESSED, NOT ADDRESSED, or DIFFERS FROM SPEC
- **Concrete evidence**: File path, line number, code snippet
- **Clear verdict**: No ambiguity about whether it passes or fails

If you cannot determine the status, you have not completed the verification. Use Glob, Grep, and Read tools until you have definitive answers for EVERY requirement.

## When to Use

- After implementing features, before claiming "done"
- When asked to verify code matches its specification
- Before creating a pull request for reviewed work
- When subtask implementation is marked complete
- To audit existing implementations against their specs

## The Problem This Solves

Superficial code verification looks like:

- Glancing at code and assuming it matches the spec
- Running tests and assuming passing tests = complete implementation
- Checking a few key files without systematic coverage
- Trusting "it works" without verifying ALL requirements
- Missing project rule violations (TypeScript strictness, Result types, test coverage)

## Inputs Required

When invoking this skill, you need:

1. **Implementation spec path**: The `.md` file containing the implementation specification
2. **Code location**: Directory or files where the implementation lives

Example invocation:

```
Verify code in actions/my-feature/ against spec at .studio/123-my-feature/implementation-spec.md
```

## Verification Process

### Phase 1: Extract ALL Requirements from Implementation Spec

Read the implementation spec and extract EVERY distinct requirement into a numbered list.

**Extract from ALL sections:**

- Deliverables (files, functions, interfaces to create)
- Acceptance criteria (behaviors that must work)
- Technical constraints (patterns to follow, limits to respect)
- Modified files tables
- Code examples (implied patterns to match)
- Test specifications (tests that must exist)
- Schema definitions (types that must be defined)
- API contracts (endpoints, request/response formats)
- Error handling requirements (what errors to handle, how)

**Format:**

```
## Extracted Requirements

### Deliverables
1. [Deliverable] File: {path} must exist
2. [Deliverable] Function: {name} must be exported from {file}
3. [Deliverable] Interface: {name} must be defined in {file}
4. [Deliverable] Schema: {name} Zod schema must exist

### Behaviors
5. [Behavior] {Component} must {do something specific}
6. [Behavior] When {condition}, system must {response}
7. [Behavior] {Function} returns {specific result} given {input}

### Technical Constraints
8. [Constraint] Function returns ResultAsync<{Type}, {ErrorType}>
9. [Constraint] Uses Zod schema for {data} validation
10. [Constraint] No thrown exceptions - uses Result types
11. [Constraint] {Limit}: maximum {N} of {something}

### Tests
12. [Test] Test exists verifying {behavior}
13. [Test] Test covers error path when {condition}
14. [Test] Test verifies {edge case}
```

### Phase 2: Load Project Rules

Read `.claude/rules/*.md` and extract ALL rules that apply to code.

**Key rules to check:**

```
## Applicable Project Rules

### TypeScript Rules (typescript.md)
1. No `any` types anywhere
2. No `as` type casts (except JSONB from database)
3. No `var!` non-null assertions
4. Strict mode enabled

### Error Handling Rules (error-handling.md)
5. All functions return Result/ResultAsync types
6. No `throw` in production code
7. Error types use discriminated unions

### Testing Rules (testing.md)
8. 100% test coverage required
9. TDD: tests written before implementation
10. Tests use realistic inputs, not trivial examples
11. Tests assert on specific values
12. Error paths tested with expected error types
13. All branches tested (ternary, nullish coalescing, etc.)

### External Data Rules (external-data-validation.md)
14. All external data validated with Zod
15. No unvalidated JSON.parse results
16. No `as` casts on API responses

### Code Reuse Rules (code-reuse.md)
17. Check actions/shared/ before creating new utilities
18. Functions are small and pure
19. No code duplication

### CLI Rules (cli-parsing.md)
20. CLI utilities use commander library
21. CLI args validated with Zod after parsing
```

### Phase 3: Verify Each Requirement Against Code

For EACH extracted requirement, find specific evidence in the code.

**Verification methods:**

| Requirement Type         | Verification Method                        |
| ------------------------ | ------------------------------------------ |
| File existence           | Use Glob to confirm file exists            |
| Function existence       | Use Grep to find function definition       |
| Interface/Type existence | Use Grep to find interface/type definition |
| Behavior implementation  | Read code and trace logic                  |
| Test existence           | Use Grep to find test cases                |
| Schema existence         | Use Grep to find Zod schema definition     |

**Do NOT:**

- Mark as addressed based on file name alone
- Trust that a function exists without reading its implementation
- Assume tests exist without finding them
- Accept partial implementations as complete
- Trust comments or documentation over actual code

**Format:**

```
## Verification Results

### Requirement 1: File {path} must exist
- **Status**: ADDRESSED
- **Evidence**: File exists at {path} ({N} lines)

### Requirement 2: Function {name} must be exported
- **Status**: ADDRESSED
- **Evidence**: Line {N}: `export async function {name}(`
- **Signature matches spec**: Yes/No

### Requirement 5: {Component} must {behavior}
- **Status**: NOT ADDRESSED
- **Issue**: Function exists but does not implement {specific behavior}
- **Gap**: {What's missing}
- **Location**: {file}:{lines} where fix is needed

### Requirement 8: File {path} with function {name}
- **Status**: DIFFERS FROM SPEC
- **Spec says**: File at `actions/feature/helper.ts` exports `processData`
- **Code has**: Functionality implemented in `actions/feature/workflow.ts` as `runDataProcessing`
- **Assessment**: Code is CORRECT - functionality is complete, just organized differently
- **Recommendation**: Update spec to reflect actual design

### Requirement 12: Test exists verifying {behavior}
- **Status**: PARTIAL
- **Evidence**: Test at {file}:{line} tests basic case
- **Gap**: No test for {edge case / error path}
```

### Status Definitions

| Status            | Meaning                                                                                                           |
| ----------------- | ----------------------------------------------------------------------------------------------------------------- |
| ADDRESSED         | Code matches spec exactly                                                                                         |
| NOT ADDRESSED     | Code is missing or incomplete - requires code fix                                                                 |
| DIFFERS FROM SPEC | Code implements the requirement but differently than spec describes - may require spec update instead of code fix |
| PARTIAL           | Some aspects addressed, others missing - requires code fix                                                        |

### When Code Differs From Spec

Sometimes implementation decisions during coding result in a better design than the spec anticipated. When this happens:

1. **Verify the functionality is complete** - The code must fully implement the requirement's intent
2. **Mark as DIFFERS FROM SPEC** - Not NOT ADDRESSED
3. **Explain the difference clearly** - What spec says vs what code does
4. **Assess correctness** - Is the code approach valid/better?
5. **Recommend spec update** - Add to remediation checklist as a spec change, not a code change

### Phase 4: Check Rule Compliance

Scan ALL implementation files for project rule violations.

**For each rule, systematically check:**

```
## Rule Compliance Check

### Rule: No `any` types
- **Files scanned**: {N}
- **Status**: PASS / VIOLATED
- **Violations** (if any):
  - {file}:{line} - `{code snippet}`
  - {file}:{line} - `{code snippet}`

### Rule: All functions return Result types
- **Files scanned**: {N}
- **Status**: PASS / VIOLATED
- **Violations** (if any):
  - {file}:{line} - function returns Promise, not ResultAsync
  - {file}:{line} - function throws instead of returning Result

### Rule: 100% test coverage
- **Status**: PASS / VIOLATED
- **Coverage**: {N}% (ran `bun test:coverage`)
- **Uncovered lines** (if violated):
  - {file}:{lines} - {description}

### Rule: External data validated with Zod
- **Status**: PASS / VIOLATED
- **Violations** (if any):
  - {file}:{line} - JSON.parse without Zod validation
  - {file}:{line} - API response used directly without schema
```

### Phase 5: Run Automated Checks

Execute project verification commands:

```bash
bun typecheck    # Must pass with zero errors
bun lint         # Must pass with zero errors
bun test:coverage # Must show 100% coverage on new code
```

**Record results:**

```
## Automated Check Results

### TypeCheck
- **Status**: PASS / FAIL
- **Errors**: {N}
  - {file}:{line} - {error message}

### Lint
- **Status**: PASS / FAIL
- **Warnings**: {N}

### Test Coverage
- **Status**: PASS / FAIL
- **Coverage**: {N}% (target: 100%)
- **Uncovered lines**:
  - {file}: lines {X-Y} ({description})
```

### Phase 6: Generate Report

Produce comprehensive verification report:

```markdown
# Code Verification Report

## Summary

- **Requirements**: X/Y addressed (Z unaddressed)
- **Rule Compliance**: N violations found
- **TypeCheck**: PASS/FAIL (N errors)
- **Lint**: PASS/FAIL (N warnings)
- **Test Coverage**: X% (target: 100%)
- **Verdict**: PASS / FAIL

## Unaddressed Requirements

| #   | Requirement   | Type   | Issue            |
| --- | ------------- | ------ | ---------------- |
| {N} | {requirement} | {type} | {what's missing} |

## Rule Violations

| Rule   | File:Line  | Violation     |
| ------ | ---------- | ------------- |
| {rule} | {location} | {description} |

## Uncovered Code

| File   | Lines   | Reason            |
| ------ | ------- | ----------------- |
| {file} | {lines} | {why not covered} |

## Required Changes

1. {First change needed}
2. {Second change needed}
   ...
```

### Phase 7: Produce Remediation Plan

If verification fails, produce detailed remediation plan:

````markdown
---
type: code-remediation-plan
execute-with: executing-code-remediation
spec: { path to implementation spec }
target: { directory containing code to fix }
created: { date }
---

# Code Remediation Plan

> **To execute this plan**, use the `executing-code-remediation` skill:
>
> ```
> /skill executing-code-remediation
> ```
>
> The skill will validate structure, execute each fix, run verification after each change, and track progress.

---

## Remediation Items

### 1. {Fix Title}

**Requirement**: {spec section and line reference}
**Problem**: {what's wrong or missing}
**Location**: `{file}:{lines}`

**Current code**:

```typescript
{existing code snippet}
```

**Required change**:

```typescript
{corrected code snippet}
```

**Verification**: {how to confirm fix worked - command to run or check to perform}

### 2. {Next Fix Title}

...

### N. [SPEC UPDATE] {Spec Discrepancy Title}

**Requirement**: {spec section and line reference}
**Discrepancy**: Code implements requirement differently than spec describes
**Spec says**: {what the spec specifies}
**Code has**: {what the code actually does}
**Assessment**: Code approach is CORRECT because {reason}

**Required spec change** (in `{spec-file}`):

```markdown
{updated spec text}
```

**Verification**: Spec accurately describes actual implementation

---

## Remediation Checklist

### Unaddressed Requirements (Code Fixes)

- [ ] {Fix description} ({file}:{lines})
- [ ] {Fix description} ({file}:{lines})

### Spec Updates (Code is Correct, Spec Needs Update)

- [ ] Update spec: {requirement} - code implements as {actual} instead of {spec says} ({spec-file}:{lines})
- [ ] Update spec: Remove {obsolete requirement} - superseded by {better approach}

### Rule Violations: {Category}

- [ ] {Fix description} ({file}:{line})
- [ ] {Fix description} ({file}:{line})

### Rule Violations: {Another Category}

- [ ] {Fix description} ({file}:{line})

### Test Coverage Gaps

- [ ] Add test for {behavior} ({test file})
- [ ] Add test for {error path} ({test file})

### Final Verification

- [ ] All checklist items complete
- [ ] `bun typecheck` passes
- [ ] `bun lint` passes
- [ ] `bun test:coverage` shows 100%
- [ ] Re-run verification skill confirms all requirements addressed
````

## Key Principles

1. **Complete verification required** - Every requirement gets a definitive status with evidence
2. **No deferred investigations** - Report contains no "need to verify" or equivalent
3. **Extract ALL requirements** - Don't miss anything in the spec
4. **Verify with evidence** - Find actual code, not assumptions
5. **Check ALL rules** - Project rules are non-negotiable
6. **Run automated checks** - TypeCheck, lint, coverage must pass
7. **Be specific** - File paths, line numbers, exact code
8. **Produce actionable remediation** - Fixes must be copy-paste ready
9. **Include verification steps** - How to confirm each fix worked
10. **Spec updates are valid remediation** - If code is correct but differs from spec, update the spec

## Verification Commands

Always run these before declaring code complete:

```bash
bun typecheck        # Zero errors required
bun lint             # Zero errors required
bun test:coverage    # 100% coverage required
```

## Common Gaps to Watch For

Based on project rules, these are frequently missed:

1. **Missing error path tests** - Happy path tested but not error branches
2. **Unvalidated external data** - JSON.parse, API responses, file reads without Zod
3. **`any` types** - Often sneak in through quick fixes
4. **Thrown exceptions** - Should be Result types instead
5. **Missing branch coverage** - Ternary expressions, nullish coalescing
6. **Functions over 50 lines** - Should be broken down
7. **Duplicated logic** - Should use shared utilities

## Output

**REQUIRED**: The remediation plan MUST be saved to a file, not just output in the conversation.

### File Location

Save the remediation plan in the **same directory** as the spec document:

- If spec is at `.studio/123-feature/implementation-spec.md`
- Save remediation plan to `.studio/123-feature/code-remediation-plan.md`

- If spec is at `docs/workflow-refactoring/spec.md`
- Save remediation plan to `docs/workflow-refactoring/code-remediation-plan.md`

### File Naming

Use the pattern: `code-remediation-plan.md` (or `code-remediation-plan-{date}.md` if multiple iterations)

### Why Files Are Required

1. **Trackable** - Progress can be tracked across sessions
2. **Executable** - The `executing-code-remediation` skill can read and execute it
3. **Auditable** - History of what was verified and fixed
4. **Shareable** - Can be reviewed by humans before execution

## Self-Check Before Finalizing Report

Before presenting the verification report, scan it for completeness:

1. **Every requirement has a status** - ADDRESSED, NOT ADDRESSED, DIFFERS FROM SPEC, or PARTIAL
2. **Every status has evidence** - File paths, line numbers, code snippets
3. **No uncertainty language** - No "need to verify", "should check", "❓", etc.
4. **Automated checks completed** - typecheck, lint, and coverage actually ran
5. **All violations have locations** - File:line for every issue found
6. **Remediation is actionable** - Every gap has a concrete fix or spec update

If any of these fail, continue investigating until complete.
