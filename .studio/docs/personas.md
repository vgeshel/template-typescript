# Personas

## Sara - Full-Stack Developer

**Role:** Mid-level TypeScript developer building a SaaS product

**Goals:**
- Launch MVP quickly without sacrificing code quality
- Maintain type safety across the entire stack
- Focus on features rather than tooling configuration

**Needs:**
- Pre-configured development environment that just works
- Clear patterns for adding new features (pages, API endpoints, components)
- Fast feedback loop with hot reload and type checking

**Pain Points:**
- Wasted time on ESLint/Prettier/TypeScript config conflicts
- Type safety breaking down at API boundaries
- Uncertainty about testing strategy and coverage requirements

**How They Interact:**
- Clones the template to start new projects
- Reads error messages from pre-commit hooks when standards are violated
- References the developer guide when adding new features
- Runs `bun test` in watch mode during development

**Success Criteria:**
Sara ships features confidently knowing tests and type checks will catch issues before production.

## Alex - AI Development Agent

**Role:** Automated coding assistant implementing features and fixes

**Goals:**
- Make changes that pass all automated quality gates
- Understand project conventions quickly from code structure
- Implement features without introducing type errors or breaking tests

**Needs:**
- Strict ESLint rules that prevent common AI mistakes (like `any` types)
- Comprehensive test suite to verify changes
- Clear error messages when quality standards are violated

**Pain Points:**
- Getting stuck when test coverage drops below 100%
- Confusion when implicit type coercion causes runtime errors
- Breaking existing functionality unknowingly

**How They Interact:**
- Reads type definitions to understand API contracts
- Runs tests after each change to verify behavior
- Follows patterns from existing code rather than inventing new approaches

**Success Criteria:**
Alex's changes pass all pre-commit hooks and CI checks on the first try.
