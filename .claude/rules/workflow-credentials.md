# Workflow Credential Standards

## All Agent Workflows Must Support Multi-Provider Credentials

Every GitHub Actions workflow that runs an agent session must follow these credential standards.

### Required Environment Variables

```yaml
env:
  STUDIO_PROVIDER: ${{ vars.STUDIO_PROVIDER }}
  CLAUDE_MODEL: ${{ vars.CLAUDE_MODEL }}
  CODEX_MODEL: ${{ vars.CODEX_MODEL }}
```

### Required Codex Auth Rehydration Step

```yaml
- name: Rehydrate Codex auth cache
  run: |
    if [ -n "${CODEX_AUTH_JSON}" ]; then
      mkdir -p ~/.codex
      printf '%s' "$CODEX_AUTH_JSON" > ~/.codex/auth.json
      chmod 600 ~/.codex/auth.json
    fi
  env:
    CODEX_AUTH_JSON: ${{ secrets.CODEX_AUTH_JSON }}
```

### Required Credential Inputs

All three credential inputs must be passed to agent actions:

```yaml
with:
  studio_anthropic_api_key: ${{ secrets.STUDIO_ANTHROPIC_API_KEY }}
  studio_claude_code_oauth_token: ${{ secrets.CLAUDE_CODE_OAUTH_TOKEN }}
  studio_openai_api_key: ${{ secrets.STUDIO_OPENAI_API_KEY }}
```

### Credential Inputs Must Be Optional

In `action.yml`, credential inputs must be `required: false`:

```yaml
inputs:
  studio_anthropic_api_key:
    description: 'Anthropic API key'
    required: false
  studio_claude_code_oauth_token:
    description: 'Claude Code OAuth token'
    required: false
  studio_openai_api_key:
    description: 'OpenAI API key for Codex'
    required: false
```

### Action Code Must NOT Validate Credential Existence

Do not add Zod refinements that require at least one credential. Let SDKs discover credentials from environment variables, config files, and auth caches.

### Canonical Example

See the project's existing workflow files for reference implementations.
