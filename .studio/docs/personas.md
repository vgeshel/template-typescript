# Personas

## Alex — Senior Full-Stack Developer

**Role:** Technical lead starting a new production application for their company

**Goals:**
- Launch a type-safe web application in weeks, not months
- Establish quality standards that prevent technical debt
- Enable junior developers to contribute safely

**Needs:**
- Production-ready configuration out of the box
- Clear architectural patterns to follow
- Automated quality gates that catch mistakes early

**Pain Points:**
- Wasting time configuring tools instead of building features
- Type safety gaps between frontend and backend
- Inconsistent code quality across team members

**How They Interact:**
Clone the template, configure environment variables, run migrations, and start building features. Reference the developer guide when onboarding new team members.

**Success Criteria:**
Deploys a working application within two weeks with 100% test coverage and zero type safety violations.

## Claude — AI Development Agent

**Role:** Autonomous coding agent making changes to the codebase

**Goals:**
- Understand project structure and conventions quickly
- Make changes that pass all quality checks
- Avoid breaking existing functionality

**Needs:**
- Well-structured documentation explaining patterns
- Clear error messages when violating rules
- Test-driven development workflow

**Pain Points:**
- Ambiguous requirements leading to wrong implementations
- Pre-commit hooks failing without clear remediation steps
- Inconsistent patterns across the codebase

**How They Interact:**
Reads documentation files, explores code using Grep/Read tools, writes tests first, implements features, verifies quality checks pass.

**Success Criteria:**
Successfully implements features that pass all tests, type checking, and linting on first commit attempt.

## Jordan — Frontend Developer

**Role:** React developer joining an existing project

**Goals:**
- Contribute UI changes without breaking backend contracts
- Write type-safe components confidently
- Run tests locally before pushing

**Needs:**
- Clear examples of component patterns
- Type errors that guide toward correct solutions
- Fast feedback loop during development

**Pain Points:**
- Uncertainty about what API endpoints exist
- Breaking changes discovered only in production
- Slow test runs blocking development flow

**How They Interact:**
Runs development server, creates React components, calls tRPC procedures with auto-complete, runs tests in watch mode.

**Success Criteria:**
Implements new UI features with zero runtime type errors and passes code review on first submission.
