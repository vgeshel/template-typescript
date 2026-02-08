# Personas

## Alex — Full-Stack Developer

**Role:** Individual contributor building a new SaaS application

**Goals:**
- Start with production-quality foundations without days of setup
- Maintain type safety across the entire stack
- Deploy with confidence knowing tests verify behavior

**Needs:**
- Working examples of common patterns (API routes, database queries, React components)
- Clear commands for development workflow
- Fast feedback on type errors and test failures

**Pain Points:**
- Previous projects accumulated technical debt through gradual relaxation of standards
- Mock-based tests didn't catch real integration issues
- Type safety compromised through liberal use of `any` and `as` casts

**How They Interact:**
Clone template, run setup commands, start building features using TDD workflow. Uses `bun test` in watch mode during development, relies on pre-commit hooks to catch mistakes.

**Success Criteria:**
Deploys first feature within hours, not days. Refactors confidently knowing tests will catch regressions. Never encounters a production type error.

---

## Jordan — AI Coding Agent

**Role:** Autonomous agent implementing features and fixing bugs

**Goals:**
- Understand project constraints without human intervention
- Make changes safely within established patterns
- Verify correctness before presenting work

**Needs:**
- Explicit rules with no exceptions (documented in CLAUDE.md)
- Failing tests that prove bugs exist before fixing
- Commands that provide clear pass/fail feedback

**Pain Points:**
- Ambiguous requirements lead to multiple implementation attempts
- Implicit conventions not discoverable from code alone
- False confidence from passing but inadequate tests

**How They Interact:**
Reads CLAUDE.md and project documentation first. Follows TDD skill for all changes. Runs typecheck and lint after every edit. Never proceeds until all quality gates pass.

**Success Criteria:**
Commits only working, tested code. Never uses `--no-verify`. Asks clarifying questions when requirements are ambiguous rather than guessing.

---

## Morgan — Team Lead

**Role:** Technical lead onboarding new team members

**Goals:**
- Ensure consistent code quality across the team
- Reduce code review time through automated quality checks
- Establish patterns that scale as team grows

**Needs:**
- Documented architectural decisions
- Enforced standards that don't require manual review
- Clear onboarding path for new developers

**Pain Points:**
- Code reviews become bottlenecks when style and testing gaps require extensive feedback
- Different developers adopt incompatible patterns
- Production bugs from undertested edge cases

**How They Interact:**
Uses this template for new projects. Points team members to DEVELOPER_GUIDE for onboarding. Reviews architectural decisions in DECISION_JOURNAL when considering changes.

**Success Criteria:**
New team members productive on day one. Code reviews focus on business logic, not style or test coverage. Zero production type errors or validation bugs.
