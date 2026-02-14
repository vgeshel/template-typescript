# Code Reuse

Code reuse reduces bugs, improves maintainability, and ensures consistency. Always prefer using existing, tested code over writing new implementations.

## Core Principles

### 1. Search Before You Implement

**Before writing any new function or logic, always search for existing implementations:**

- Use Grep to search for similar patterns in the codebase
- Check the project's shared utility directories for reusable code
- Search dependencies in `package.json` for library solutions
- Use the Node.js standard library. Don't reimplement functionality available there.
- DO NOT use the Bun library. `import ... from 'bun'` is forbidden.
- Review related files for similar functionality

**Example searches:**

```bash
# Search for existing validation logic
grep -r "validate" --include="*.ts"

# Find files with similar functionality
glob "**/*validation*.ts"

# Check for shared utility directories
ls src/shared/ lib/ utils/ common/
```

### 2. Break Code into Small, Pure Functions

Small, pure functions are:

- **Easier to test** - Single responsibility, predictable outputs
- **More reusable** - Can be composed in different contexts
- **Simpler to understand** - Clear inputs and outputs
- **Better for discovery** - Named functions are searchable

**Bad - Inline logic:**

```typescript
// Hard to reuse, hard to test
function processUser(user: any) {
  const name = user.firstName + ' ' + user.lastName
  const initials = user.firstName[0] + user.lastName[0]
  return { name, initials }
}
```

**Good - Extracted, pure functions:**

```typescript
// Reusable, testable, discoverable
function formatFullName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`
}

function getInitials(firstName: string, lastName: string): string {
  return `${firstName[0]}${lastName[0]}`
}

function processUser(user: User) {
  return {
    name: formatFullName(user.firstName, user.lastName),
    initials: getInitials(user.firstName, user.lastName),
  }
}
```

### 3. Use Clear, Descriptive Names

Function names should clearly describe what they do, making them easy to discover when searching:

- **Good**: `formatDuration`, `parseGitHubUrl`, `validateIssueNumber`, `truncateString`
- **Bad**: `format`, `parse`, `validate`, `truncate`

More specific names prevent accidental misuse and help others find your functions.

### 4. Leverage Standard Libraries

Don't reinvent the wheel. Standard libraries are tested, optimized, and maintained:

**Bad - Custom implementation:**

```typescript
// Reinventing file operations
async function copyDir(src: string, dest: string) {
  // Custom recursive copy logic...
}
```

**Good - Use standard library:**

```typescript
import { cp } from 'node:fs/promises'

// Built-in, tested, and optimized
await cp(src, dest, { recursive: true })
```

**Common standard library utilities:**

- `node:fs/promises` - File operations (read, write, copy, delete)
- `node:path` - Path manipulation (join, resolve, dirname)
- `node:crypto` - Hashing and encryption
- Array methods - `map`, `filter`, `reduce`, `find`, `some`, `every`

### 5. Check Dependencies

Before implementing generic functionality, check if it's already in your dependencies:

**Common examples:**

- **Logging**: Check for `pino`, `winston`, or similar in `package.json`
- **Date/time**: Check for `luxon`, `date-fns`, or similar
- **Validation**: Check for `zod`, `joi`, or similar
- **HTTP requests**: Check for existing API client libraries

Check `package.json` and search for the library's documentation before implementing.

### 6. Refactor When You Create Reusable Code

When you create a new reusable function, search for similar code that could be refactored to use it:

1. Implement the new, general-purpose function
2. Search the codebase for similar patterns
3. Refactor found instances to use the new function
4. Update tests to verify the refactoring

**Important**: This keeps the codebase DRY and prevents future duplication.

## Project-Specific Guidelines

Every project accumulates shared utilities and test infrastructure. Before implementing anything new:

### Check Shared Utilities First

Search the project's shared utility directories for existing code before writing new implementations:

- API client wrappers
- File I/O helpers
- Error handling utilities
- Validation schemas
- Logging configuration
- Formatting and truncation helpers
- Label constants and helpers

### Check for Shared Test Arbitraries

Search for shared test utilities and fast-check arbitraries in the project's test directories:

**Before creating hand-crafted test mocks for external data, check if a shared arbitrary exists.**

### Search for Shared Test Infrastructure

- Property-based test arbitraries (fast-check generators)
- Test fixtures and factories
- Mock utilities and helpers
- Custom test matchers

### Discover Project Patterns

Before writing new code, search the project for how similar functionality is implemented:

1. **API calls**: Search for existing API client wrappers
2. **File operations**: Search for file I/O helpers
3. **Error handling**: Search for Result types or error utilities
4. **Logging**: Search for logger configuration
5. **Input validation**: Search for Zod schemas

## Integration with Other Rules

This rule complements existing principles:

- **Fundamental Principles**: "Never trust your training data" → Always search for current implementations in the codebase
- **Testing**: Small, pure functions achieve 100% test coverage more easily
- **Code Style**: Reuse reduces complexity and keeps code simple
- **Dependencies**: Check library docs before implementing something generic

## Workflow Summary

When implementing new functionality:

1. **Search** - Grep/Glob for similar code in the codebase
2. **Check shared** - Look in the project's shared utility directories for existing utilities
3. **Check dependencies** - Review `package.json` and library docs
4. **Check standard library** - Look for built-in Node.js/Bun functions
5. **Implement** - If nothing exists, write a small, pure, well-named function
6. **Refactor** - Find and update similar code to use the new function
7. **Test** - Write comprehensive tests for the new code
