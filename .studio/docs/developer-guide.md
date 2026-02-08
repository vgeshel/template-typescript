# Developer Guide

## Onboarding

Welcome! This template provides a production-ready TypeScript + Next.js foundation with strict quality enforcement. Here's what you need to know:

1. **Quality is automated** — Pre-commit hooks will block your commits if type checking, linting, or coverage fails. This is intentional.
2. **100% coverage is required** — Every line of application code must be tested. Tests live next to source files.
3. **No escape hatches** — You cannot use `eslint-disable` comments, `any` types, or `as` casts. Use Zod validation instead.
4. **Bun is the runtime** — All commands use `bun` rather than `npm` or `node`.

Read the README first, then explore the codebase following the structure below.

## Codebase Navigation

Start here to understand the codebase:

1. **`package.json`** — See all dependencies and available scripts
2. **`app/page.tsx`** — The home page; understand the component structure
3. **`src/server/trpc.ts`** — API route definitions; see how to add endpoints
4. **`src/lib/trpc.ts`** — Client-side tRPC setup; understand the client configuration
5. **`eslint.config.mjs`** — Understand the linting rules enforced on your code

## Key Directories

**`app/`** — Next.js file-system routing. Add pages by creating files here. `layout.tsx` wraps all pages. `page.tsx` is the home route. `api/trpc/[trpc]/route.ts` handles API requests.

**`src/components/`** — Shared React components used across multiple pages. Add reusable UI elements here.

**`src/lib/`** — Shared utilities, configuration, and client-side setup. Logger, tRPC client, and React Query provider live here.

**`src/server/`** — Server-only code. Add tRPC procedures (API endpoints) in `trpc.ts`. This code never runs in the browser.

**`scripts/`** — Build automation and quality enforcement scripts. Don't modify these unless you know what you're doing.

## Development Workflow

### Initial Setup

```bash
# Install dependencies
bun install

# Copy environment files
cp .env.example .env.local
cp .env.test.example .env.test.local

# Edit .env.local and .env.test.local with your configuration
```

### Daily Development

```bash
# Run type checking
bun typecheck

# Run linting
bun lint

# Format code
bun format

# Run tests in watch mode
bun test

# Run tests once with coverage
bun test:run
```

Note: The README mentions `bun dev` for starting the development server, but this script does not exist in `package.json`. The available commands are `build` and `start` only.

### Pre-commit Behavior

When you commit, Husky automatically runs:
1. Type checking (`bun typecheck`)
2. Lint exception checker (blocks `eslint-disable`)
3. ESLint on all files
4. Prettier + ESLint on staged files via lint-staged

If any step fails, your commit is blocked. Fix the errors and try again.

### Branching Strategy

Not defined in this template. Teams should establish their own branching model (trunk-based, Git Flow, etc.) based on their needs.

### Code Review Process

Not defined in this template. Since pre-commit hooks enforce quality, code reviews can focus on business logic and architecture rather than style issues.

## How to Run

**Build for production:**
```bash
bun build
```

**Start production server:**
```bash
bun start
```

Note: No development server script exists in `package.json`. The README mentions `bun dev` but this is not configured.

## How to Test

**Run tests in watch mode:**
```bash
bun test
```

**Run tests once:**
```bash
bun test:run
```

**Run tests with UI:**
```bash
bun test:ui
```

**Generate coverage report:**
```bash
bun test:coverage
```

**Run tests on changed files only:**
```bash
bun test:changed
```

Coverage reports are written to `./coverage/`. Open `coverage/index.html` in a browser to view detailed coverage.

## How to Deploy

No deployment configuration is provided. Common options:

**Vercel (recommended for Next.js):**
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

**Docker:**
1. Add a `Dockerfile` using the official Next.js standalone output
2. Build and push to your container registry
3. Deploy to your platform (AWS ECS, Google Cloud Run, etc.)

**Traditional hosting:**
1. Run `bun build` to create `.next/` output
2. Copy `.next/`, `public/`, and `node_modules/` to server
3. Run `bun start` with environment variables configured

## Adding New Features

**To add a tRPC endpoint:**
1. Add a procedure to `appRouter` in `src/server/trpc.ts`
2. Write tests in `src/server/trpc.test.ts`
3. Call from client using `trpc.procedureName.useQuery()` or `.useMutation()`

**To add a page:**
1. Create `app/my-page/page.tsx`
2. Write tests in `app/my-page/page.test.tsx`
3. Navigate to `/my-page` in your browser

**To add a component:**
1. Create `src/components/MyComponent.tsx`
2. Write tests in `src/components/MyComponent.test.tsx`
3. Import and use in pages or other components

**To add environment variables:**
1. Add to `.env.example` and `.env.test.example`
2. Load via dotenvx in your code
3. Never access `process.env` directly (ESLint will block this)
