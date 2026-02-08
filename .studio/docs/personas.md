# Personas

## Alex Chen — Full-Stack Developer Building a New SaaS Product

**Role:** Independent full-stack developer launching a B2B SaaS application

**Goals:**
- Ship quickly without accumulating technical debt
- Build on a foundation that scales from MVP to production
- Avoid configuration and tooling setup overhead
- Ensure code quality without manual review processes

**Needs:**
- Type safety across frontend and backend
- Automated testing and quality checks
- Clear patterns for common tasks (API design, data validation, logging)
- Confidence that code changes won't introduce regressions

**Pain Points:**
- Has been burned by `any` types creeping into codebases over time
- Wasted time debugging runtime errors that TypeScript should have caught
- Struggled with maintaining test coverage as projects grow
- Lost productivity to inconsistent team code standards

**How They Interact:**
1. Clones the template to bootstrap a new project
2. Runs `bun install` and `bun dev` to start development
3. Writes features using TDD workflow guided by CLAUDE.md
4. Relies on pre-commit hooks to catch issues before they're committed
5. Uses tRPC to add type-safe API endpoints
6. References the template's patterns when implementing new features

**Success Criteria:**
- Ships features rapidly without sacrificing quality
- Zero production bugs from type mismatches or missing validation
- Maintains 100% test coverage throughout development
- Spends time building features, not debugging or fixing broken tests

---

## Jordan Martinez — AI Coding Agent (Claude Code)

**Role:** Autonomous AI agent assisting developers with code changes

**Goals:**
- Make changes that pass all quality checks on first attempt
- Follow project-specific patterns and conventions consistently
- Avoid introducing bugs or reducing code quality
- Complete tasks without requiring manual fixes from humans

**Needs:**
- Clear, explicit rules about what is and isn't allowed
- Automated validation that provides immediate feedback
- Documentation that explains rationale, not just mechanics
- Skills and workflows for common development tasks

**Pain Points:**
- Training data may not reflect current API versions
- Difficult to know project-specific constraints without explicit documentation
- Easy to accidentally bypass quality checks (e.g., using `--no-verify`)
- No inherent understanding of "why" certain patterns are required

**How They Interact:**
1. Reads CLAUDE.md to understand project constraints and workflows
2. Uses `/tdd` skill when making code changes
3. Runs `bun typecheck && bun lint && bun test:run` after every change
4. Validates that pre-commit hooks pass before suggesting commits
5. Searches official documentation for dependency APIs rather than relying on training data
6. Follows the TDD workflow: write failing test, implement, refactor

**Success Criteria:**
- All commits pass pre-commit hooks without manual intervention
- Code changes follow established patterns and conventions
- Tests prove correctness of both bug fixes and new features
- No quality degradation (type safety violations, coverage reduction, lint exceptions)

---

## Morgan Kim — Engineering Team Lead Standardizing Development Practices

**Role:** Technical lead at a startup scaling from 5 to 20 engineers

**Goals:**
- Establish consistent development practices across the team
- Reduce code review time spent on style and basic quality issues
- Prevent technical debt accumulation as the team grows
- Onboard new engineers quickly with minimal tribal knowledge

**Needs:**
- Template that encodes best practices as automation
- Pre-commit hooks that enforce standards without manual oversight
- Clear documentation that explains "why" behind each constraint
- Patterns that scale from small to large teams

**Pain Points:**
- Inconsistent code quality across different engineers
- Time wasted in code review discussing lint rules and test coverage
- New hires learning project conventions through trial and error
- Legacy codebases with degraded type safety and low test coverage

**How They Interact:**
1. Adopts template as the standard for all new TypeScript projects
2. References template patterns in code review feedback
3. Points new hires to CLAUDE.md for onboarding
4. Uses template's pre-commit hooks to automate quality enforcement
5. Extends template with team-specific skills and patterns
6. Shares template with other engineering leads as a best practice

**Success Criteria:**
- Code reviews focus on business logic and architecture, not formatting or basic quality
- New engineers are productive within days, not weeks
- Zero production incidents from type safety violations or missing validation
- Team maintains 100% test coverage without constant reminders