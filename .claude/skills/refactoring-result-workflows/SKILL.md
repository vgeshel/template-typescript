---
name: refactoring-result-workflows
description: Use when refactoring TypeScript files that use ResultAsync/Result (neverthrow) patterns. Extracts anonymous inline functions > N lines to named module-level functions, flattens deeply nested andThen/orElse chains into linear flows, and iterates recursively until no inline functions remain. Triggers on "extract inline functions", "flatten workflow", "refactor Result chain", or when asked to clean up neverthrow-based code.
---

# Refactoring Result-Based Workflows

This skill extracts inline anonymous functions from ResultAsync chains into named module-level functions, creating cleaner, more testable code.

## ⚠️ CRITICAL: The Main Function Must Be a Linear Chain

**The goal is a main workflow function where ALL steps are visible as a flat, linear chain.**

### ❌ WRONG: Hidden steps in helper functions

```typescript
// BAD - Steps are hidden inside helper functions calling other helpers
export function runWorkflow(deps): ResultAsync<Result, Error> {
  return readAndValidate(ctx).andThen((data) => processAndCommit(ctx, data)) // What happens inside? Hidden!
}

function processAndCommit(ctx, data) {
  return transform(data)
    .andThen((x) => runAgent(ctx, x)) // Nested chain hidden from main
    .andThen((y) => commitChanges(ctx, y)) // More hidden steps
}
```

### ✅ CORRECT: All steps visible in main function

```typescript
// GOOD - Every step is visible in the main workflow function
export function runWorkflow(deps): ResultAsync<Result, Error> {
  // Step 1: Read input
  return (
    functions
      .readInput(inputPath)
      .map((content) => {
        logger.info('Read input')
        return computeHash(content)
      })
      // Step 2: Validate
      .andThen((hash) => functions.validate(hash))
      // Step 3: Transform
      .andThen((validated) => functions.transform(validated))
      // Step 4: Run agent
      .andThen((transformed) => runAgent(ctx, transformed))
      // Step 5: Commit
      .andThen((result) => functions.commitChanges(ctx, result))
      // Step 6: Notify
      .andThen((committed) => notifySuccess(ctx, committed))
  )
}
```

**Key insight**: Someone reading the main function should see the ENTIRE workflow at a glance. Helper functions are for:

- Recursive operations (retry loops)
- Error handlers
- Building result objects
- NOT for grouping sequential steps

## Core Principles

1. **Linear chains in main function**: All workflow steps visible at top level, not hidden in helpers
2. **Flat chains over deep nesting**: `a().andThen(b).andThen(c)` not `a().andThen(() => b().andThen(() => c()))`
3. **Named functions over anonymous**: Extract any callback > 3 lines to a named function
4. **Recursive extraction**: Keep finding and extracting until none remain
5. **Preserve behavior**: All tests must pass after each extraction

## Step-by-Step Process

### 1. Find Anonymous Functions > N Lines

Use this awk script to find anonymous arrow functions that span more than 3 lines:

```bash
awk '
/=>/{depth=0;n=split($0,c,"");for(i=1;i<=n;i++){if(c[i]=="{"||c[i]=="(")depth++;if(c[i]=="}"||c[i]==")")depth--}if(depth>0){in_block=1;block_start=NR}}
in_block&&depth>0{n=split($0,c,"");for(i=1;i<=n;i++){if(c[i]=="{"||c[i]=="(")depth++;if(c[i]=="}"||c[i]==")")depth--}if(depth<=0){lines=NR-block_start+1;if(lines>3)print "Lines "block_start"-"NR" ("lines" lines)";in_block=0}}
' TARGET_FILE.ts
```

If no output, there are no anonymous functions > 3 lines remaining.

### 2. Read and Analyze Each Block

For each reported block:

1. Read the lines to understand what the anonymous function does
2. Determine what context it needs (what variables it captures from closure)
3. Decide the extraction pattern (see patterns below)

### 3. Extract Using Appropriate Pattern

#### Pattern A: Simple Delegation (callback just calls another function)

**Before:**

```typescript
return result.andThen((data) => processData(ctx, data, options))
```

**After:**

```typescript
return result.andThen((data) => processData(ctx, data, options))
// Single line - no extraction needed
```

Or if context is complex, use a curried callback maker:

```typescript
function makeProcessDataCallback(
  ctx: Context,
  options: Options,
): (data: Data) => ResultAsync<Output, Error> {
  return (data) => processData(ctx, data, options)
}

return result.andThen(makeProcessDataCallback(ctx, options))
```

#### Pattern B: Multi-Statement Logic

**Before:**

```typescript
return result.andThen((data) => {
  const processed = transform(data)
  logger.info({ processed }, 'Transformed data')
  return validateAndSave(processed, ctx)
})
```

**After:**

```typescript
function processAndSave(ctx: Context, data: Data): ResultAsync<Output, Error> {
  const processed = transform(data)
  logger.info({ processed }, 'Transformed data')
  return validateAndSave(processed, ctx)
}

return result.andThen((data) => processAndSave(ctx, data))
```

#### Pattern C: Error Handlers

**Before:**

```typescript
return result.orElse((error) =>
  handleNonCriticalError(prNumber, taskDir, error, 'operation description'),
)
```

**After:**

```typescript
function makeErrorHandler(
  prNumber: number,
  taskDir: string,
): (error: Error) => ResultAsync<void, never> {
  return (error) =>
    handleNonCriticalError(prNumber, taskDir, error, 'operation description')
}

return result.orElse(makeErrorHandler(prNumber, taskDir))
```

#### Pattern D: Duplicate Logic (same pattern in multiple places)

If you see the same anonymous function pattern repeated:

```typescript
// Found in 3 places:
.andThen(() => okAsync<Result, Error>({
  success: false,
  prNumber,
  costUsd: state.totalCostUsd,
  // ...
}))
```

Extract to a shared helper:

```typescript
function buildFailureResult(
  prNumber: number,
  state: State,
  errorMessage: string,
): Result {
  return {
    success: false,
    prNumber,
    costUsd: state.totalCostUsd,
    // ...
  }
}

// Then use .map() instead of .andThen():
.map(() => buildFailureResult(prNumber, state, errorMessage))
```

### 4. Flatten Nested Chains

Deep nesting like this:

```typescript
return a().andThen((x) => b(x).andThen((y) => c(y).andThen((z) => d(z))))
```

Should become flat:

```typescript
return a()
  .andThen((x) => b(x))
  .andThen((y) => c(y))
  .andThen((z) => d(z))
```

If data from earlier steps is needed later, use intermediate functions:

```typescript
function processWithContext(ctx: Context, x: X): ResultAsync<Final, Error> {
  return b(x)
    .andThen((y) => c(y))
    .andThen((z) => d(z, x)) // x is available via closure
}

return a().andThen((x) => processWithContext(ctx, x))
```

### 5. Verify and Iterate

After each extraction round:

```bash
bun typecheck   # Must pass
bun test:run    # Must pass
```

Then run the awk script again. Repeat until no anonymous functions > 3 lines remain.

### 6. Final Verification

```bash
# Check no anonymous functions > 3 lines remain
awk '...' TARGET_FILE.ts  # Should output nothing

# All checks pass
bun typecheck
bun lint
bun test:coverage
```

## Context Interface Pattern

When extracting functions that need many closure variables, create a context interface:

```typescript
interface WorkflowContext {
  prNumber: number
  taskDir: string
  owner: string
  repo: string
  deps: Dependencies
  functions: Functions
  octokit: Octokit
}

function processStep(
  ctx: WorkflowContext,
  data: Data,
): ResultAsync<Result, Error> {
  const { prNumber, taskDir, functions } = ctx
  // Use context instead of closure variables
}
```

## Common Mistakes to Avoid

1. **Don't hide workflow steps in helper functions** - The main function should show ALL steps as a linear chain. If you extract `stepA → stepB → stepC` into `doSteps(ctx)`, you've hidden the workflow structure.

2. **Don't create helper-calls-helper chains** - If `helperA` calls `helperB` which calls `helperC`, you've recreated deep nesting. Each helper should be a leaf operation, not a chain of operations.

3. **Don't extract single-expression callbacks** that are ≤3 lines - they're fine as-is

4. **Don't forget to remove unused variables** after extraction - the original destructuring may have variables that are now only used in the extracted function

5. **Don't use `as` type assertions** - use proper types or type guards

### When Helper Functions ARE Appropriate

Helper functions should be used for:

- **Recursive operations**: Retry loops that call themselves
- **Error handlers**: `orElse` callbacks that log and recover
- **Result builders**: Functions that construct result objects
- **Branching logic**: When a step has if/else that leads to different sub-workflows

Helper functions should NOT be used for:

- Grouping 2-3 sequential steps "for readability"
- Hiding complexity from the main function
- Creating "processAndDoThings" functions that chain multiple operations

## Checklist

- [ ] Run awk script to find all anonymous functions > 3 lines
- [ ] For each: determine extraction pattern (A, B, C, or D)
- [ ] Extract to named function with clear name
- [ ] Update call site to use extracted function
- [ ] Remove any now-unused variables from destructuring
- [ ] Run typecheck
- [ ] Run tests
- [ ] Repeat from step 1 until awk outputs nothing
- [ ] **Verify main function is a linear chain** - Can you see ALL workflow steps at a glance?
- [ ] **Verify no helper-calls-helper patterns** - Each helper should be a leaf, not a chain
- [ ] Run full verification (typecheck, lint, test:coverage)
