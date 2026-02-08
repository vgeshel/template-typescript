# Personas

## Alex Chen — Solo Indie Developer

**Role:** Full-stack developer launching a SaaS side project

**Goals:**
- Ship an MVP quickly without sacrificing code quality
- Maintain high standards even without code review
- Avoid common TypeScript pitfalls and runtime errors

**Needs:**
- Pre-configured tooling that enforces best practices automatically
- Type safety from database to frontend
- Fast feedback loops during development

**Pain Points:**
- Spending days setting up TypeScript, ESLint, testing infrastructure
- Introducing subtle bugs due to missing type checks
- Forgetting to run tests before committing

**How They Interact:**
Clone the template, configure environment variables, and start building features immediately. Rely on pre-commit hooks to catch issues before they reach production.

**Success Criteria:**
Deploys a production-ready feature within the first day of using the template, with zero runtime type errors.

---

## Jordan Kim — Engineering Team Lead

**Role:** Tech lead standardizing development practices across multiple projects

**Goals:**
- Establish consistent code quality standards across teams
- Reduce onboarding time for new developers
- Enable AI agents to contribute safely to the codebase

**Needs:**
- Enforced conventions that prevent quality drift
- Documentation that stays in sync with code
- Automation that catches errors before code review

**Pain Points:**
- Reviewing PRs with inconsistent code style
- Debugging issues caused by missing test coverage
- Maintaining multiple projects with divergent tooling setups

**How They Interact:**
Fork the template as the starting point for new projects, customize Claude Code skills for team-specific workflows, and rely on pre-commit hooks to enforce standards.

**Success Criteria:**
New team members contribute production-ready code within their first week, and AI agents complete routine tasks without human intervention.

---

## Claude — AI Development Agent

**Role:** Automated developer performing tasks via Claude Code

**Goals:**
- Understand the codebase structure and conventions quickly
- Make changes that pass all quality checks automatically
- Complete tasks without breaking existing functionality

**Needs:**
- Comprehensive documentation and examples
- Clear error messages when quality checks fail
- Automated testing that verifies correctness

**Pain Points:**
- Ambiguous project structure requiring human clarification
- Breaking type safety without realizing it
- Introducing regressions due to missing test coverage

**How They Interact:**
Read `.claude/skills/` for workflow guidance, execute tasks following TDD patterns, and validate work against pre-commit hooks before completion.

**Success Criteria:**
Completes assigned features and bug fixes that pass all automated checks on the first attempt, requiring zero human corrections.
