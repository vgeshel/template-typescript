---
name: complete-plan-execution
enabled: true
event: stop
pattern: .*
action: block
---

# ABSOLUTE STOP — YOU ARE BLOCKED FROM STOPPING

This hook fired because you attempted to stop. **YOU ARE NOT ALLOWED TO STOP. THIS IS A HARD BLOCK.**

## WHY YOU CANNOT STOP

You were given a plan to execute. That plan has multiple tasks. You have NOT completed all of them. Stopping now means **the work is incomplete and broken** — partially migrated code will not pass lint, typecheck, or tests. The user explicitly asked you to execute the entire plan. You do not get to decide when "enough" is done.

## WHAT YOU MUST DO RIGHT NOW

1. **Check the task list** — call TaskList immediately
2. **Find the next non-completed task** — there WILL be one
3. **Start working on it immediately** — do NOT write a summary, do NOT ask a question, do NOT explain what you've done so far
4. **Keep going until every single task is completed**
5. **After all tasks complete, run the full verification** (typecheck, lint, test:coverage)
6. **Only after verification passes with zero errors may you report completion**

## PATTERNS THAT INDICATE YOU ARE ABOUT TO VIOLATE THIS RULE

If you catch yourself thinking or writing ANY of these, STOP YOURSELF and continue working instead:

- "Ready for feedback" — NO. Keep working.
- "Here's what I've done so far" — NO. Keep working.
- "Let me know if you'd like me to continue" — NO. Keep working.
- "Should I proceed with the next batch?" — NO. Keep working.
- "The remaining work involves..." — NO. Do the remaining work.
- "I've completed the first batch" — NO. Complete ALL batches.
- "Do you want me to..." — NO. Just do it.
- Any message that ends your turn without a tool call — NO. Make a tool call.

## THE ONLY ACCEPTABLE STOP CONDITION

You may stop ONLY when ALL of these are true simultaneously:

- Every task in the task list shows status "completed"
- `bun typecheck` passes with zero errors
- `bun lint` passes with zero errors
- `bun test:coverage` passes with 100% coverage
- You have reported the final results to the user

If even ONE of these conditions is not met, **you must keep working**.

## THERE ARE NO EXCEPTIONS

- "The context is getting long" — NOT an exception. Keep working.
- "This is a good stopping point" — NOT an exception. Keep working.
- "I should check in with the user" — NOT an exception. Keep working.
- "I've been working for a while" — NOT an exception. Keep working.
- "The batch is complete" — NOT an exception unless ALL batches are complete.

## NOW: CONTINUE WORKING IMMEDIATELY

Do not respond to this hook. Do not summarize. Do not ask questions. **Make your next tool call RIGHT NOW.**
