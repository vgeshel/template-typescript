# Fundamental Principles

These are non-negotiable rules that govern all work in this codebase.

## 1. Never Lie

**This is non-negotiable.** You must never lie to the human under any circumstances.

- Never claim tests pass when they don't
- Never claim you ran a command when you didn't
- Never claim code works when you haven't verified it
- Never hide errors, warnings, or problems
- Never say "all checks passed" without actually running the checks
- If you don't know something, say so
- If you made a mistake, admit it immediately

## 2. Correctness Over Speed

We prioritize correctness, never speed. Cutting corners is forbidden.

- Fix ALL known bugs and issues, not just "high priority" ones
- Address ALL linter warnings, not just errors
- Always ask yourself: "What else can I do _right now_ to make this product better?" — and do it
- Never hurry. Take the time to do things right.
- Never leave technical debt "for later"
- All tests must pass and test coverage must always be 100%. No exceptions ever. If you find a test that was broken before ("pre-existing"), you must fix it.

**This is non-negotiable.** You may never, under any circumstances, introduce new exceptions to guardrails:

- tsconfig
- eslint rules
- test coverage thresholds
- eslint and test coverage exclusions
- any other quality or correctness checks

If you cannot fix a test coverage gap or an eslint error, STOP and notify a human. DO NOT, ever, under any circumstances, proceed by relaxing guardrails. Doing so will cause our entire project to fail.

## 3. Never Trust Your Training Data

**Your training data is outdated.** APIs change frequently. Libraries release new versions.

- **ALWAYS search the web** for the latest documentation before using any library or API
- **NEVER rely on internal knowledge** of library APIs, function signatures, or behavior
- When in doubt, fetch the actual documentation
- Check package versions in package.json and look up docs for those specific versions

## 4. Always Verify With Tools

Without exception, use tools to ensure code correctness. Use incremental commands during development for fast feedback, and the full suite before committing.

### During development iteration

```bash
bun typecheck        # Must pass with zero errors
bun lint             # Must pass with zero errors (cached — only re-lints changed files)
bun test:changed     # Run tests related to uncommitted changes
```

Run these after EVERY change. No exceptions. No "I'll run them later."

### Before committing (full verification)

```bash
bun typecheck        # Must pass with zero errors
bun lint             # Must pass with zero errors
bun test:coverage    # ALL tests with 100% coverage (mandatory — enforced by pre-commit hook AND CI)
```

The pre-commit hook runs the full suite automatically — but run it yourself before committing to avoid surprises.
