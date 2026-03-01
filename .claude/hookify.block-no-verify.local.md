---
name: block-no-verify
enabled: true
event: bash
pattern: --no-verify
action: block
---

ABSOLUTE PROHIBITION: --no-verify is NEVER allowed under ANY circumstances.

This project strictly prohibits bypassing git hooks with --no-verify.
Project rules state: "If you cannot fix an eslint error, STOP and notify a human. DO NOT, ever, under any circumstances, proceed by relaxing guardrails."

If pre-commit hooks are failing:

1. Fix the underlying issue (lint errors, type errors, test failures)
2. If you cannot fix the issue, STOP and ask the user for help
3. NEVER use --no-verify, --no-gpg-sign, or any other hook-bypassing flag
