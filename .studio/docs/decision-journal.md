# Decision Journal

This is an append-only, chronologically ordered log of significant architectural and process decisions. Do not edit or remove existing entries.

## 2025-01-15: Adopt Bun as JavaScript Runtime

**Context:** The project required a JavaScript runtime for executing TypeScript code. Node.js is the traditional choice, but newer alternatives exist.

**Decision:** Use Bun as the JavaScript runtime instead of Node.js.

**Rationale:**
- Bun provides significantly faster execution and package installation
- Built-in TypeScript support eliminates need for ts-node or similar tools
- Native test runner integration simplifies tooling
- Compatible with most Node.js APIs for easy migration if needed

**Alternatives Considered:**
- **Node.js** — Most mature and widely adopted, but slower and requires additional tools for TypeScript
- **Deno** — Good TypeScript support but different module system creates friction with npm ecosystem

**Consequences:**
- Developers must install Bun (simple one-line install)
- Some Node.js-specific packages may have compatibility issues (rare)
- Faster development iteration due to faster execution and installs

## 2025-01-15: Enforce 100% Test Coverage

**Context:** Many projects start with good test coverage but gradually decline as developers skip tests to "move faster."

**Decision:** Require 100% code coverage for statements, branches, functions, and lines. Lock these thresholds in vitest.config.ts and add pre-commit check to prevent lowering them.

**Rationale:**
- Setting thresholds below 100% creates a sliding scale (95% becomes 90%, then 80%, then "we'll add tests later")
- 100% coverage doesn't guarantee bug-free code, but it ensures all code paths have been considered
- Pre-commit enforcement makes it impossible to commit untested code
- Branch coverage catches cases where ternaries and conditionals are only tested in one direction

**Alternatives Considered:**
- **95% threshold** — Rejected because it allows "just this once" exceptions that accumulate
- **No coverage requirement** — Rejected because coverage inevitably decays without enforcement
- **Coverage in CI only** — Rejected because it provides delayed feedback and wastes CI resources

**Consequences:**
- Developers must write tests for every code path, including error branches
- Ternary expressions (`a ? b : c`) and nullish coalescing (`a ?? b`) require multiple tests
- Initial development may feel slower, but bugs are caught immediately rather than in production

## 2025-01-15: Ban Type Assertions and `any` Types

**Context:** TypeScript provides escape hatches (`any` types and `as` type assertions) that bypass type checking. These are commonly used to "fix" type errors quickly but undermine type safety.

**Decision:** Completely ban `any` types and `as` type assertions via ESLint configuration. Enforce Zod validation for external data instead.

**Rationale:**
- `any` types disable type checking, making TypeScript pointless
- `as` assertions tell TypeScript "trust me" without runtime validation, creating unsafe assumptions
- Zod schemas validate data at runtime AND provide type information
- Strict enforcement prevents gradual erosion of type safety

**Alternatives Considered:**
- **Allow `any` in specific cases** — Rejected because "specific cases" become general practice
- **Code review enforcement** — Rejected because it's inconsistent and wastes reviewer time
- **Discourage but don't block** — Rejected because developers under pressure will use escape hatches

**Consequences:**
- Developers must learn Zod for validating external data
- Type errors must be fixed properly rather than suppressed
- Codebase maintains strong type safety guarantees

## 2025-01-15: Adopt Test-Driven Development as Non-Negotiable

**Context:** Tests written after implementation often have low quality (testing the implementation rather than behavior) and provide false confidence.

**Decision:** Require test-driven development (write test first, watch it fail, implement, watch it pass) for all code changes. Provide TDD skill for procedural guidance.

**Rationale:**
- Tests written first define expected behavior before implementation bias sets in
- Watching the test fail proves the test actually validates something
- Tests written after often pass immediately, providing no confidence
- TDD catches bugs during development rather than in production

**Alternatives Considered:**
- **Tests required but order not enforced** — Rejected because tests-after provide false confidence
- **Tests required only for critical code** — Rejected because "critical" is subjective and all code matters
- **Tests optional with high coverage target** — Rejected because coverage can be gamed with shallow tests

**Consequences:**
- Developers must adopt TDD workflow (may require training)
- Initial implementation feels slower, but bugs are caught immediately
- Tests serve as living documentation of expected behavior

## 2025-01-15: Block All Linting Escape Hatches

**Context:** ESLint and TypeScript allow developers to disable checks via comments (`eslint-disable`, `@ts-ignore`, etc.). These bypass quality guardrails.

**Decision:** Implement `check-lint-exceptions.ts` pre-commit script that blocks any commit containing linting disable comments.

**Rationale:**
- Escape hatch comments indicate the underlying issue wasn't fixed, just hidden
- Once one developer uses escape hatches, others follow ("if they did it, I can too")
- Blocking at commit time provides immediate feedback and prevents accumulation
- Forces developers to fix root causes rather than suppress warnings

**Alternatives Considered:**
- **Manual code review** — Rejected because inconsistent and wastes reviewer time
- **CI-only detection** — Rejected because delayed feedback and developers may have moved on
- **Allow with justification comment** — Rejected because justifications are rarely valid

**Consequences:**
- Developers cannot bypass linting/type checking under any circumstances
- Pre-commit hook ensures enforcement is automatic and consistent
- Occasionally valid use cases (testing the linting rule itself) require file exclusion

## 2025-01-15: Use tRPC for End-to-End Type Safety

**Context:** Traditional REST APIs require maintaining separate API contracts (OpenAPI) or generating types from schemas. This creates synchronization problems.

**Decision:** Use tRPC for all API communication, sharing the `AppRouter` type between client and server.

**Rationale:**
- tRPC provides compile-time type safety without code generation
- Changes to API signatures are immediately reflected in client code
- Eliminates need for maintaining separate API documentation
- TypeScript types serve as single source of truth

**Alternatives Considered:**
- **REST with OpenAPI** — Rejected because requires maintaining separate schema and generating types
- **GraphQL** — Rejected because adds complexity and code generation overhead
- **REST without types** — Rejected because loses type safety benefits

**Consequences:**
- Both client and server must be TypeScript (not suitable for non-TypeScript clients)
- API changes cause compile errors in client immediately (good for catching breaking changes)
- No automatic API documentation generation (types are the documentation)

## 2025-01-15: Co-locate Tests with Source Files

**Context:** Tests can be organized in separate `test/` directory or co-located with source files.

**Decision:** Co-locate tests next to source files (`example.ts` and `example.test.ts` in same directory).

**Rationale:**
- Co-located tests are easier to find (no hunting through directory structure)
- Keeps tests synchronized with implementation changes
- Reduces friction for writing tests (no path navigation required)
- Vitest configuration supports discovering tests in source directories

**Alternatives Considered:**
- **Separate `test/` directory** — Rejected because increases friction and makes tests harder to find
- **`__tests__/` subdirectories** — Rejected because adds organizational overhead without benefit

**Consequences:**
- Source directories contain both implementation and test files
- Vitest configured to discover tests in `src/`, `app/`, `scripts/`, and `.claude/skills/`
- Test files must be excluded from coverage measurement to avoid skewing metrics

## 2025-01-15: Use Pre-commit Hooks to Enforce Quality

**Context:** CI checks catch quality issues, but only after code is pushed and often after the developer has moved to another task.

**Decision:** Run comprehensive quality checks (typecheck, lint, coverage) in pre-commit hook to catch issues before commit.

**Rationale:**
- Fastest feedback loop (immediate rather than waiting for CI)
- Prevents bad code from entering version control
- Developers fix issues while context is fresh
- Reduces CI failures and wasted CI resources

**Alternatives Considered:**
- **CI-only checks** — Rejected because feedback is too slow and wastes CI resources
- **Optional pre-commit** — Rejected because developers skip optional checks
- **Lightweight pre-commit, full checks in CI** — Rejected because duplicates work and provides delayed feedback

**Consequences:**
- Commits take longer (30-60 seconds for full check suite)
- Developers get immediate feedback on quality issues
- CI runs same checks but rarely finds issues (pre-commit already caught them)

## 2025-01-15: Provide Procedural Skills for AI Agents

**Context:** AI coding agents (like Claude Code) need explicit procedural guidance to follow project-specific workflows correctly.

**Decision:** Create `.claude/skills/` directory with markdown files providing step-by-step workflows (TDD, debugging, migrations).

**Rationale:**
- AI agents work best with explicit procedures rather than high-level principles
- Skills provide reusable, verifiable workflows that ensure consistency
- Human developers can also reference skills for guidance
- Standardizes complex workflows (like TDD) into repeatable steps

**Alternatives Considered:**
- **CLAUDE.md only** — Rejected because high-level guidelines aren't sufficient for complex workflows
- **No AI-specific guidance** — Rejected because AI agents need more structure than humans
- **Tool-specific instructions** — Rejected because skills are tool-agnostic and reusable

**Consequences:**
- AI agents have clear procedures to follow for common tasks
- Skills must be maintained as workflows evolve
- Human developers benefit from having explicit workflow documentation