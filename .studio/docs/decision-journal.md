# Decision Journal

This document records significant architectural and tooling decisions made during the project's development. Entries are append-only and chronologically ordered.

---

## 2024-01-15: Chose Bun Over Node.js as Runtime

**Context:** The project needed a JavaScript runtime for development and production. Node.js is the standard choice, but Bun offers significant performance improvements.

**Decision:** Use Bun as the primary runtime for all package scripts and test execution.

**Rationale:** Bun provides faster dependency installation, build times, and test execution compared to Node.js. The compatibility with Node.js APIs means Next.js and other npm packages work without modification. Performance gains are substantial (2-10x faster in many operations) without introducing breaking changes.

**Alternatives Considered:**
- **Node.js**: Standard but slower. No compelling reason to use it when Bun is compatible.
- **Deno**: Better security model but incompatible with many npm packages. Too limiting for a general-purpose template.

**Consequences:** Users must install Bun to use this template. This adds a setup step but is well worth the performance benefits.

---

## 2024-01-16: Enforced 100% Test Coverage

**Context:** Many projects start with good test coverage but gradually decline as deadlines approach. Coverage thresholds are often set to 80% or 90%, allowing untested code to accumulate.

**Decision:** Configure Vitest to require 100% coverage across statements, branches, functions, and lines. Builds fail if coverage drops below this threshold.

**Rationale:** Setting coverage to 100% eliminates ambiguity about what needs testing. Developers cannot rationalize skipping tests for "simple" code. The strictness prevents quality erosion over time.

**Alternatives Considered:**
- **80-90% threshold**: Common in industry but allows critical code paths to go untested.
- **No coverage requirement**: Relies on discipline, which inevitably breaks down.

**Consequences:** Writing tests takes longer, especially for UI-heavy code. Teams uncomfortable with this strictness can override the threshold in `vitest.config.ts`, but the default forces quality-first thinking.

---

## 2024-01-18: Banned Type Assertions with ESLint Rule

**Context:** TypeScript's `as` keyword (type assertions) lets developers tell the compiler "trust me, this is the right type." This bypasses type checking and often causes runtime errors when the assertion is wrong.

**Decision:** Enable ESLint rule `consistent-type-assertions: never` to block all `as` casts. Developers must use Zod schema validation or proper type guards instead.

**Rationale:** Type assertions are a symptom of missing validation. External data (API responses, user input) should be validated with Zod, which provides both runtime checks and compile-time types. Internal code should use proper typing and type guards. Assertions almost always indicate a design flaw.

**Alternatives Considered:**
- **Allow assertions in specific cases**: Too subjective. Developers will always find reasons their case is "special."
- **Use `unknown` instead of `any`**: Better than `any` but still allows assertions. Doesn't solve the root problem.

**Consequences:** Initial development takes slightly longer as developers learn to validate data properly. The payoff is significantly fewer runtime type errors in production.

---

## 2024-01-20: Blocked eslint-disable Comments

**Context:** ESLint rules can be disabled with comments like `// eslint-disable-next-line`. While occasionally necessary, this becomes an escape hatch that undermines code quality over time.

**Decision:** Created `scripts/check-lint-exceptions.ts` that runs in pre-commit hooks and fails if any `eslint-disable` comments are found.

**Rationale:** If a rule is worth enforcing, it should be enforced everywhere. If a rule is problematic, it should be removed or adjusted in `eslint.config.mjs` rather than disabled case-by-case. Exceptions are a slippery slope.

**Alternatives Considered:**
- **Allow exceptions with justification comments**: Requires human review to verify justifications are valid. Doesn't scale.
- **Only block new exceptions**: Hard to enforce and creates technical debt.

**Consequences:** Developers cannot work around linting rules even when they believe they have good reasons. This forces conversations about whether rules should be changed globally rather than bypassed locally.

---

## 2024-01-22: Chose tRPC Over REST or GraphQL

**Context:** The project needed an API layer for client-server communication. REST is ubiquitous, GraphQL is powerful but complex, and tRPC offers type safety with minimal boilerplate.

**Decision:** Use tRPC for all client-server communication, integrated with React Query for state management.

**Rationale:** tRPC provides end-to-end type safety without code generation or schema files. When a server procedure changes, client code gets TypeScript errors immediately. No API documentation is needed because the types are the documentation. React Query integration provides caching, optimistic updates, and background refetching.

**Alternatives Considered:**
- **REST API**: Requires maintaining separate client and server types. OpenAPI schemas help but don't provide compile-time safety.
- **GraphQL**: Powerful but heavy. Requires schema definition language, resolvers, and code generation. Overkill for most full-stack TypeScript projects.

**Consequences:** tRPC only works for TypeScript clients. If the project later needs a public API for external consumers, REST or GraphQL must be added alongside tRPC.

---

## 2024-01-23: Colocated Tests with Source Files

**Context:** Projects often separate tests into a `test/` or `__tests__/` directory. This makes tests harder to find when modifying code and easier to forget.

**Decision:** Place every test file next to its source file using `.test.ts` or `.test.tsx` extensions. `src/components/Button.tsx` is tested by `src/components/Button.test.tsx`.

**Rationale:** Colocation makes tests impossible to miss. When modifying a file, the corresponding test is always visible in the editor's file tree. This convention, combined with 100% coverage enforcement, makes it psychologically harder to skip testing.

**Alternatives Considered:**
- **Separate test directory**: Traditional but hides tests from developers' immediate view.
- **`__tests__/` subdirectories**: Better than fully separate but still adds friction.

**Consequences:** File trees become larger as each source file has an accompanying test file. This is a minor inconvenience compared to the benefit of impossible-to-miss tests.

---

## 2024-01-25: Chose Tailwind CSS Over CSS Modules or Styled Components

**Context:** React applications need a styling solution. CSS Modules provide scoping, styled-components offers CSS-in-JS, and Tailwind provides utility classes.

**Decision:** Use Tailwind CSS with PostCSS for all styling.

**Rationale:** Tailwind colocates styles with components, eliminating context switching between files. Utility classes are discoverable via autocomplete. The JIT compiler purges unused styles automatically. Performance is excellent because styles are static at build time.

**Alternatives Considered:**
- **CSS Modules**: Requires separate `.module.css` files. Context switching slows development.
- **styled-components**: Runtime overhead and complexity. Harder to optimize.
- **Plain CSS**: No scoping mechanism leads to naming conflicts and cascade issues.

**Consequences:** Developers must learn Tailwind's utility class conventions. JSX becomes more verbose with long `className` strings. The trade-off is faster development and better performance.

---

## 2024-01-28: Used Pino for Structured Logging

**Context:** Developers often use `console.log()` for logging, which produces unstructured output that's hard to query in production.

**Decision:** Use Pino for all logging and block `console.log()` usage with ESLint.

**Rationale:** Pino outputs structured JSON logs that can be ingested by log aggregation systems (Datadog, Splunk, CloudWatch). Performance is excellent—Pino is one of the fastest Node.js loggers. Structured logs enable querying by severity, context, and custom fields.

**Alternatives Considered:**
- **Winston**: More features but slower. Complexity not needed for most applications.
- **Bunyan**: Similar to Pino but less actively maintained.
- **console.log()**: Fast to write but produces unstructured output that's hard to use in production.

**Consequences:** Developers must learn Pino's API instead of using `console.log()`. The learning curve is minimal, and production debugging becomes significantly easier.

---

## 2024-02-01: Selected Next.js App Router Over Pages Router

**Context:** Next.js offers two routing systems: the older Pages Router and the newer App Router based on React Server Components.

**Decision:** Use Next.js App Router exclusively. No Pages Router code exists in the template.

**Rationale:** App Router is the future of Next.js. Server Components reduce JavaScript sent to the client by default. File-system routing is more intuitive with the `app/` directory structure. Nested layouts are easier to implement.

**Alternatives Considered:**
- **Pages Router**: Stable and mature but being phased out. Not worth teaching new developers the old system.
- **Mix of both**: Possible but confusing. Pick one paradigm and stick with it.

**Consequences:** Developers must learn Server Components and the `'use client'` directive. The mental model differs from traditional React, but the benefits (less JavaScript, better performance) are worth it.

---

## 2024-02-05: No Database Configuration in Template

**Context:** The README mentions PostgreSQL integration and database commands (`bun db:migrate`, `bun db:codegen`) but `package.json` contains no database dependencies or scripts.

**Decision:** Keep the template database-agnostic. Don't include Prisma, Drizzle, or any ORM by default.

**Rationale:** Database choices are highly application-specific. Some projects need PostgreSQL, others use SQLite or MongoDB. ORMs are opinionated—Prisma, Drizzle, and Kysely all have trade-offs. Including one creates a stronger opinion than necessary for a general template.

**Alternatives Considered:**
- **Include Prisma**: Most popular but opinionated. Developers who prefer Drizzle or raw SQL would remove it.
- **Include multiple options**: Increases template complexity and maintenance burden.

**Consequences:** The README contains stale references to database commands that don't exist. This should be fixed by either removing the database mentions or adding a database option. For now, the template remains intentionally database-free.
