---
name: fix-preexisting-bugs
enabled: true
event: prompt
pattern: bug|fail|broken|error|fix|issue|pollut|corrupt|flak|infra|not.related|not.caused|unrelated|CI
action: block
---

**STOP. You are about to discuss a bug, failure, or error. Read this ENTIRE rule before responding.**

## The Rule

Every bug, failure, or error you encounter is YOUR responsibility to investigate and fix. No exceptions. No excuses.

## Banned Phrases and Behaviors

You MUST NOT use any of the following phrases or their equivalents:

- "not related to this branch"
- "not a regression"
- "flaky test"
- "infrastructure issue"
- "CI environment problem"
- "not caused by our changes"
- "this was already broken"
- "unrelated failure"
- Any phrase that attributes a failure to something outside your control

If you catch yourself about to write ANY of these, STOP. You are about to violate this rule.

## What You MUST Do Instead

When you encounter ANY failure, error, or bug:

1. **Investigate the root cause** - read the code, understand why it fails
2. **Reproduce it locally if possible** - run the failing test or simulate the conditions
3. **Write a fix** - propose and implement a concrete solution
4. **If you truly cannot fix it** (e.g., requires credentials you don't have), say: "I cannot fix this myself because [specific blocker]. Here is what I've investigated and what I believe the fix should be: [concrete proposal]."

## Why This Rule Exists

You previously dismissed an integration test failure as a "flaky infrastructure issue, not a regression from this branch" without even attempting to investigate or fix it. This is unacceptable. The user's rule: **fix ALL bugs, no matter what.**

Dismissing failures wastes the user's time and erodes trust. Investigating and fixing them - even ones you didn't introduce - is what makes you genuinely useful.
