---
name: gh-fix-ci
description: Inspect failing GitHub Actions checks, extract exact failing command/path, implement fix with proof-first verification, and only claim fixed after exact failing path is green.
---

# GitHub CI Fix Workflow (Proof-First)

## Scope

Use for failures in GitHub Actions checks.

## Required Flow

1. Identify PR and failing check/run/job.
2. Pull logs and extract:
   - exact failing command/path
   - exact failing assertion/error line
3. Reproduce the exact failing command/path locally when possible.
4. Add failing regression test (or equivalent deterministic check).
5. Implement minimal fix.
6. Rerun the exact failing command/path.
7. Run broader verification (`bun typecheck`, `bun lint`, `bun test:changed`, `bun test:coverage`).

## Status Language

- `patched`: fix applied, exact failing path not yet proven green.
- `fixed`: exact failing path rerun and passed.

Never use `fixed` without step 6 proof.

## Required Output

Before completion, provide:

- `Status`
- `Root cause`
- `Proof`:
  - exact failing command/path
  - before result (fail)
  - after result (pass)
  - broader verification results

If exact local reproduction is impossible, state blocker explicitly and keep status as `patched, not proven locally`.
