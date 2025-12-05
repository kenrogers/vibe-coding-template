# Vibe Coding Template

A production-ready Next.js template optimized for AI-assisted development with [Amp](https://ampcode.com). Built with compound engineering principles where each feature makes future development easier.

## Tech Stack

- **Next.js 16** + React 19 with App Router
- **Supabase** for auth, database, and storage
- **Drizzle ORM** for type-safe database queries
- **Tailwind CSS** for styling
- **Vitest** + **Playwright** for testing

## Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/kenrogers/vibe-coding-template.git my-app
cd my-app
pnpm install
```

### 2. Set Up Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
DATABASE_URL=postgresql://...
```

### 3. Install Playwright Browsers

```bash
pnpm playwright install
```

### 4. Start Development

```bash
pnpm dev
```

## Using with Amp

This template includes custom Amp tools in `.amp/tools/` that automate common workflows. Amp automatically reads the `AGENTS.md` file for project conventions.

### Amp Tools Available

| Category | Tool | What It Does |
|----------|------|--------------|
| **Scaffolding** | `scaffold_component` | Generate React component + test file |
| | `scaffold_api_route` | Generate API route with Zod validation |
| | `scaffold_db_table` | Generate Drizzle schema + types |
| **Development** | `find_pattern` | Discover existing patterns before building |
| | `tdd_cycle` | Guide TDD red/green/refactor workflow |
| | `quality_check` | Run full quality pipeline |
| | `run_tests` | Run Vitest unit tests |
| | `run_e2e` | Run Playwright E2E tests |
| **Database** | `db_migrate` | Manage Drizzle migrations |
| | `supabase_cli` | Supabase CLI operations |
| **Setup** | `env_doctor` | Validate environment configuration |
| | `typecheck` | TypeScript type checking |

### Recommended Workflow

When building features with Amp, follow this pattern:

1. **Research** - Ask Amp to find existing patterns: *"Find how we handle components in this codebase"*
2. **Scaffold** - Generate boilerplate: *"Scaffold a UserCard component"*
3. **TDD** - Write tests first: *"Write a failing test for the UserCard component"*
4. **Implement** - Make tests pass: *"Implement UserCard to make the test pass"*
5. **Verify** - Run quality checks: *"Run the quality check"*

### Example Prompts

```
"Add a new API route for user profiles with GET and POST methods"

"Create a projects table with id, title, and status columns"

"Write E2E tests for the login flow"

"Run the full quality check before I commit"
```

## Commands Reference

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Production build
pnpm start            # Start production server

# Quality Checks
pnpm typecheck        # TypeScript checking
pnpm lint             # ESLint
pnpm lint:fix         # Auto-fix lint issues
pnpm quality          # Run all checks

# Testing
pnpm test             # Run unit tests
pnpm test:watch       # Watch mode for TDD
pnpm test:coverage    # Coverage report
pnpm test:e2e         # E2E tests
pnpm test:e2e:ui      # Playwright UI mode

# Database
pnpm db:generate      # Generate migrations
pnpm db:migrate       # Run migrations
pnpm db:push          # Push schema (dev only)
pnpm db:studio        # Open Drizzle Studio
```

## Project Structure

```
├── .amp/tools/         # Amp custom tools
├── src/
│   ├── app/            # Next.js App Router pages & API routes
│   ├── components/     # React components (ui/ and features/)
│   ├── lib/            # Shared utilities (db/, supabase/)
│   ├── hooks/          # Custom React hooks
│   └── types/          # TypeScript type definitions
├── tests/e2e/          # Playwright E2E tests
├── AGENTS.md           # AI assistant conventions
└── .env.example        # Environment template
```

## TDD Workflow

This template enforces Test-Driven Development:

1. **🔴 Red** - Write a failing test
2. **🟢 Green** - Write minimum code to pass
3. **🔵 Refactor** - Clean up while tests pass
4. **🎭 E2E** - Verify in real browser

Amp's `tdd_cycle` tool guides you through each phase.

## Auth with Next.js Proxy

This template uses Next.js 16's Proxy pattern for Supabase auth token refresh. The key files:

- `src/proxy.ts` - Proxy entry point that runs on every request
- `src/lib/supabase/proxy.ts` - Session update logic using `getClaims()`
- `src/lib/supabase/server.ts` - Server-side Supabase client
- `src/lib/supabase/client.ts` - Browser Supabase client

The Proxy automatically refreshes auth tokens and redirects unauthenticated users to `/login`.

## MCP Integration

When `pnpm dev` is running, Amp connects via Next.js MCP to access:

- Build and runtime errors
- Browser console logs
- Page metadata and routes
- Server Action information

This is configured in `.mcp.json`.

## License

MIT
