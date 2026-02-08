---
name: block-pre-existing-excuse
enabled: true
event: all
pattern: pre-existing
action: block
---

STOP. You used the word "pre-existing" which suggests you are about to excuse or dismiss a failing check.

Project rules are clear: "Fix ALL known bugs and issues, not just 'high priority' ones. All tests must pass and test coverage must always be 100%. No exceptions ever. If you find a test that was broken before ('pre-existing'), you must fix it."

You MUST fix ALL lint errors, type errors, and test failures — regardless of whether you introduced them or they existed before your changes. There is no such thing as a "pre-existing" issue that you can ignore.
