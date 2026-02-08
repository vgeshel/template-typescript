# Personas

## Alex — Full-Stack Developer

**Role**: Senior engineer building a SaaS application with Next.js

**Goals**:
- Ship features quickly without compromising quality
- Maintain type safety across frontend and backend
- Minimize integration bugs between client and server

**Needs**:
- Type-safe API layer without code generation overhead
- Fast test feedback loop during development
- Clear patterns for data validation and error handling

**Pain Points**:
- REST APIs require manual type synchronization between client and server
- Inconsistent validation approaches lead to runtime errors
- Slow test suites delay feature iterations

**How They Interact**: Clones the template, extends the tRPC router with new procedures, writes tests before implementation, commits with pre-commit hooks enforcing quality.

**Success Criteria**: Deploys features with zero type errors and full test coverage in under an hour.

---

## Jordan — AI Coding Agent

**Role**: Autonomous agent implementing features and fixing bugs

**Goals**:
- Understand project structure and constraints quickly
- Make changes without breaking existing functionality
- Follow established patterns consistently

**Needs**:
- Machine-readable documentation of inviolable rules
- TDD workflow guidance for every code change
- Fast verification commands (typecheck, lint, test)

**Pain Points**:
- Outdated training data causes dependency API mismatches
- Unclear project conventions lead to inconsistent implementations
- Missing tests make it hard to verify changes don't break behavior

**How They Interact**: Reads CLAUDE.md and .claude/rules/, invokes TDD skill before code changes, runs verification commands after every edit, respects pre-commit hooks.

**Success Criteria**: Implements features that pass all quality gates on first attempt without human intervention.

---

## Morgan — DevOps Engineer

**Role**: Platform engineer standardizing team infrastructure

**Goals**:
- Enforce consistent quality standards across teams
- Reduce onboarding time for new developers
- Minimize production bugs from type errors or missing tests

**Needs**:
- Template with pre-configured CI/CD patterns
- Git hooks that prevent low-quality commits
- 100% coverage thresholds to ensure test discipline

**Pain Points**:
- Teams configure linting and testing inconsistently
- Quality checks run only in CI, not during development
- Missing tests discovered too late in review process

**How They Interact**: Adopts template as organizational standard, customizes .claude/rules/ for team conventions, monitors pre-commit hook enforcement.

**Success Criteria**: All team projects maintain 100% coverage and zero type errors without manual enforcement.
