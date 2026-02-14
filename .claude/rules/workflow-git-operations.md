# Workflow Git Operations

## All File-Producing Workflows Must Commit and Push

**Every workflow that writes files to the repository must commit those files, push to a branch, and create a PR.**

If a workflow generates or modifies files but never commits them, the work is silently lost when the runner shuts down.

### Required Steps

1. **Create a branch** from the parameterized base branch (never hardcode `main`)
2. **Commit** all generated files using shared git utilities
3. **Push** the branch to origin
4. **Create a PR** targeting the base branch

### Use Shared Utilities

Use shared TypeScript utilities for git and GitHub operations. Search the project for existing wrappers before writing raw git commands in workflow YAML `run:` steps.

### Parameterize the Base Branch

Workflows must accept the base branch as an input parameter, not hardcode it:

```yaml
inputs:
  branch:
    description: 'Base branch for the PR'
    required: false
    type: string
```

Use `${{ inputs.branch || github.event.repository.default_branch }}` as the default.

### Exception

Coding agent workflows (e.g., `coding-agent`, `ci-fix`) that delegate git operations to the Claude agent via prompt instructions are exempt. The agent itself handles branching, committing, and pushing as part of its task.
