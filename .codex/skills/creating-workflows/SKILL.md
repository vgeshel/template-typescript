# Skill: Creating and Modifying Agent Workflows

Use when creating or modifying GitHub Actions workflow YAML files (`workflows/studio-*.yml`) or action definitions (`actions/*/action.yml`) that invoke agent sessions.

## Checklist

Every agent workflow must have:

- [ ] `env:` block with `STUDIO_PROVIDER`, `CLAUDE_MODEL`, `CODEX_MODEL`
- [ ] Codex auth rehydration step (before the agent action step)
- [ ] All 3 credential inputs passed: `studio_anthropic_api_key`, `studio_claude_code_oauth_token`, `studio_openai_api_key`
- [ ] `required: false` on all credential inputs in `action.yml`
- [ ] No credential existence validation in Zod schemas (no `hasValidCredentials` refinements)

## Template: Workflow Credential Block

```yaml
jobs:
  agent-job:
    runs-on: ${{ fromJSON(vars.RUNS_ON || '"ubuntu-latest"') }}
    timeout-minutes: 60
    env:
      STUDIO_PROVIDER: ${{ vars.STUDIO_PROVIDER }}
      CLAUDE_MODEL: ${{ vars.CLAUDE_MODEL }}
      CODEX_MODEL: ${{ vars.CODEX_MODEL }}

    steps:
      - name: Checkout repository
        uses: actions/checkout@v6
        with:
          token: ${{ secrets.STUDIO_PAT }}
          fetch-depth: 0

      - name: Rehydrate Codex auth cache
        run: |
          if [ -n "${CODEX_AUTH_JSON}" ]; then
            mkdir -p ~/.codex
            printf '%s' "$CODEX_AUTH_JSON" > ~/.codex/auth.json
            chmod 600 ~/.codex/auth.json
          fi
        env:
          CODEX_AUTH_JSON: ${{ secrets.CODEX_AUTH_JSON }}

      - name: Configure git
        run: |
          git config user.name "Studio Bot"
          git config user.email "studio-bot@users.noreply.github.com"

      - name: Run Agent Action
        uses: vgeshel/studio/actions/my-action@v0
        with:
          studio_anthropic_api_key: ${{ secrets.STUDIO_ANTHROPIC_API_KEY }}
          studio_claude_code_oauth_token: ${{ secrets.CLAUDE_CODE_OAUTH_TOKEN }}
          studio_openai_api_key: ${{ secrets.STUDIO_OPENAI_API_KEY }}
          github_token: ${{ secrets.STUDIO_PAT }}
```

## Template: action.yml Credential Inputs

```yaml
inputs:
  studio_anthropic_api_key:
    description: 'Anthropic API key for Claude Agent SDK'
    required: false
  studio_claude_code_oauth_token:
    description: 'Claude Code OAuth token (from Claude Pro)'
    required: false
  studio_openai_api_key:
    description: 'OpenAI API key for Codex'
    required: false
```

## Anti-Patterns

- `required: true` on credential inputs in `action.yml`
- `hasValidCredentials` Zod refinements that reject when no credentials provided
- Hardcoding `anthropic_api_key` as the only credential (must support all three)
- Hardcoding provider or model values (use `resolveProvider`/`resolveModelForProvider`)
- Missing Codex auth rehydration step
- Missing `STUDIO_PROVIDER`/`CLAUDE_MODEL`/`CODEX_MODEL` env vars

## Reference Files

- `workflows/studio-coding.yml` — Canonical agent workflow example
- `actions/shared/schemas.ts` — Shared credential schemas (`credentialsBaseSchema`)
- `actions/shared/provider.ts` — Provider/model resolution
- `actions/shared/agent-session.ts` — Provider-agnostic agent session
- `actions/shared/claude-sdk.ts` — Claude-specific SDK utilities
