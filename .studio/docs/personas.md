# Personas

## Sarah - Frontend Developer

**Role:** Frontend engineer building React applications

**Goals:**
- Build type-safe UIs with zero runtime type errors
- Call backend APIs without manually writing type definitions
- Catch bugs during development, not in production

**Needs:**
- Autocomplete for API endpoints in IDE
- Immediate feedback when API contracts change
- Clear validation errors for form inputs

**Pain Points:**
- Manually syncing types between frontend and backend
- Runtime errors from API shape mismatches
- Unclear error messages from failed API calls

**How They Interact:**
- Uses `trpc.health.useQuery()` hooks in React components
- Reads TypeScript errors in IDE before running tests
- Relies on Zod schemas for form validation

**Success Criteria:** Ships features with zero type-related production bugs

---

## Marcus - AI Coding Agent (Claude Code)

**Role:** Autonomous agent implementing features and fixing bugs

**Goals:**
- Write correct code on first attempt without human intervention
- Follow project conventions automatically
- Verify changes before committing

**Needs:**
- Explicit rules about prohibited patterns (`any`, `as` casts)
- TDD workflows enforced through skills system
- Pre-commit validation to catch mistakes

**Pain Points:**
- Outdated training data about library APIs
- Ambiguous requirements leading to incorrect implementations
- Inconsistent code style across files

**How They Interact:**
- Reads `CLAUDE.md` for project constraints
- Invokes `/tdd` skill for test-driven development
- Runs `bun typecheck && bun lint && bun test:run` before committing

**Success Criteria:** Passes all pre-commit hooks without human fixes

---

## Jordan - Full-Stack Developer

**Role:** Developer building complete features from database to UI

**Goals:**
- Scaffold new features rapidly with type safety
- Maintain 100% test coverage across codebase
- Deploy confidently without manual testing

**Needs:**
- End-to-end type inference from server to client
- Fast test execution with isolated database
- Clear error messages when tests fail

**Pain Points:**
- Slow test suites blocking development flow
- Missing test coverage allowing bugs to slip through
- Configuration drift between development and production

**How They Interact:**
- Adds tRPC procedures in `src/server/trpc.ts`
- Writes Vitest tests before implementation
- Uses `bun dev` for fast iteration with hot reload

**Success Criteria:** Deploys features with confidence, zero post-deploy hotfixes
