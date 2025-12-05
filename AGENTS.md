# AGENTS.md - Compound Engineering Practices

> **Philosophy**: Each unit of engineering work should make subsequent units of work easier—not harder.

This template follows compound engineering principles where every feature you build:
- Documents patterns for the next feature
- Creates reusable components that accelerate future work
- Establishes conventions that reduce decision fatigue
- Codifies knowledge that compounds across the team

## Commands

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Production build
pnpm start            # Start production server

# Quality Checks (run these after making changes)
pnpm typecheck        # TypeScript type checking
pnpm lint             # ESLint
pnpm lint:fix         # Auto-fix lint issues

# Testing - TDD Workflow
pnpm test             # Run Vitest unit tests
pnpm test:watch       # Watch mode for TDD
pnpm test:coverage    # Coverage report
pnpm test:e2e         # Run Playwright E2E tests
pnpm test:e2e:ui      # Playwright UI mode

# Database
pnpm db:generate      # Generate Drizzle migrations
pnpm db:migrate       # Run migrations
pnpm db:push          # Push schema changes (dev only)
pnpm db:studio        # Open Drizzle Studio
```

## Amp Toolbox Tools

This project includes custom Amp tools in `.amp/tools/` to accelerate development:

### Scaffolding Tools
| Tool | Description | Example |
|------|-------------|---------|
| `scaffold_component` | Generate React component + colocated test | `name=UserCard kind=ui variants=true` |
| `scaffold_api_route` | Generate API route with Zod validation | `path=users methods=GET,POST resource=User fields="email:email,name:string"` |
| `scaffold_db_table` | Generate Drizzle schema + types | `name=projects columns="id:uuid!*,title:text!,status:text"` |

### Development Tools
| Tool | Description |
|------|-------------|
| `find_pattern` | Discover existing patterns before building (component, api, schema, hook, lib, test, supabase) |
| `env_doctor` | Validate environment setup and configuration |
| `tdd_cycle` | Guide TDD workflow (red/green/refactor phases) |
| `quality_check` | Run full quality pipeline before commit |
| `run_tests` | Run Vitest unit tests |
| `run_e2e` | Run Playwright E2E tests via CLI (test, codegen, debug, trace, show-report) |
| `db_migrate` | Manage Drizzle migrations |
| `supabase_cli` | Interact with Supabase via CLI (start, stop, migrations, gen-types, functions) |

### Recommended Workflow with Tools
```
1. find_pattern kind=component          # Research existing patterns
2. scaffold_component name=X kind=ui    # Generate with conventions
3. tdd_cycle phase=red test_file=X      # Write failing test
4. tdd_cycle phase=green test_file=X    # Make it pass
5. tdd_cycle phase=refactor test_file=X # Clean up
6. quality_check                        # Verify everything works
```

## Compound Engineering Workflow

### 1. Plan Before Building
Before implementing any feature:
1. Use `find_pattern` tool to research existing patterns
2. Identify similar implementations to follow
3. Write tests FIRST (TDD)
4. Document the approach

### 2. Test-Driven Development (TDD) - MANDATORY
**Every feature MUST follow TDD:**

1. **Write the test first** - Define expected behavior before implementation
2. **Run test to confirm it fails** - Verify the test is valid
3. **Implement the minimum code** - Make the test pass
4. **Refactor** - Clean up while tests stay green
5. **Run Playwright** - Verify the feature works in a real browser

```bash
# TDD Cycle
pnpm test:watch                    # Keep tests running
# Write test -> See it fail -> Implement -> See it pass -> Refactor
pnpm test:e2e                      # Verify E2E after feature complete
```

### 3. Quality Gates Before Commit
Always run these checks:
```bash
pnpm typecheck && pnpm lint && pnpm test && pnpm test:e2e
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── (auth)/            # Auth-related pages
│   └── (dashboard)/       # Dashboard pages
├── components/            # React components
│   ├── ui/               # Primitive UI components
│   └── features/         # Feature-specific components
├── lib/                   # Shared utilities
│   ├── db/               # Drizzle ORM + schema
│   └── supabase/         # Supabase clients
├── hooks/                 # Custom React hooks
└── types/                 # TypeScript type definitions

tests/
├── unit/                  # Vitest unit tests
├── integration/           # Integration tests
└── e2e/                   # Playwright E2E tests
```

## Code Conventions

### TypeScript
- Strict mode enabled - no `any` types
- Use Zod for runtime validation
- Prefer `interface` over `type` for objects
- Export types alongside implementations

### React Components
- Use Server Components by default
- Add `'use client'` only when needed
- Colocate tests: `Component.tsx` → `Component.test.tsx`
- Props interfaces named: `ComponentNameProps`

### API Routes
- Always validate input with Zod
- Return consistent error shapes
- Use proper HTTP status codes
- Stream responses when appropriate

### Database
- All schema changes via migrations
- Use Drizzle's type-safe queries
- Name tables in snake_case
- Name TypeScript types in PascalCase

### Testing Conventions
- Unit tests: `*.test.ts(x)` colocated with source
- E2E tests: `tests/e2e/*.spec.ts`
- Use descriptive test names: `it('should X when Y')`
- Mock external services, not internal modules

## CLI-First Development (MANDATORY)

**Always use CLI tools instead of programmatic alternatives:**

### Supabase - Use `supabase_cli` tool
- **Local dev**: `supabase_cli action=start` / `action=stop`
- **Migrations**: `supabase_cli action=migration-new name=add_users` → `action=migration-up`
- **Schema diff**: `supabase_cli action=db-diff name=my_changes`
- **Generate types**: `supabase_cli action=gen-types`
- **Edge Functions**: `supabase_cli action=functions-serve` / `action=functions-deploy`
- **NEVER** use raw SQL queries for schema changes - always use migrations
- **NEVER** manually edit database.types.ts - always regenerate from schema

### Playwright - Use `run_e2e` tool
- **Run tests**: `run_e2e action=test spec=auth.spec.ts`
- **Generate tests**: `run_e2e action=codegen` (records browser interactions)
- **Debug failing tests**: `run_e2e action=debug spec=failing.spec.ts`
- **View results**: `run_e2e action=show-report`
- **View traces**: `run_e2e action=trace trace_file=path/to/trace.zip`
- **ALWAYS** run E2E tests after implementing UI features
- **ALWAYS** use codegen to bootstrap new E2E tests

## AI-Assisted Development Guidelines

When using AI coding assistants:

1. **Research First**: Before asking for implementation, have the AI search for existing patterns
2. **TDD Always**: Ask AI to write tests FIRST, then implementation
3. **Verify with Playwright CLI**: After implementation, run `run_e2e action=test` to verify
4. **Use Supabase CLI**: For all database operations, use `supabase_cli` - never raw SQL for schema changes
5. **Document Learnings**: Update AGENTS.md files with new patterns

### Example Workflow
```
User: Add a feature to export user data as CSV

AI should:
1. Search for existing export patterns in codebase
2. Write unit tests for CSV generation
3. Write E2E test for export button click → file download
4. Implement the feature
5. Run all tests to verify
6. Update relevant AGENTS.md with new patterns
```

## Environment Variables

Required for development:
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `DATABASE_URL` - PostgreSQL connection string

See `.env.example` for all variables.

## Dependencies

This template uses:
- **Next.js 16** - React framework with App Router + MCP support
- **React 19** - Latest React with concurrent features
- **Tailwind CSS** - Utility-first styling
- **Supabase** - Auth + Realtime + Storage
- **Drizzle ORM** - Type-safe database access
- **Vitest** - Unit testing
- **Playwright** - E2E testing

## Next.js MCP Integration

This project includes [Next.js MCP](https://nextjs.org/docs/app/guides/mcp) support via `next-devtools-mcp`. When running the dev server, MCP-compatible coding agents can:

- **`get_errors`** - Retrieve build, runtime, and type errors from the dev server
- **`get_logs`** - Access browser console logs and server output
- **`get_page_metadata`** - Query page routes, components, and rendering info
- **`get_project_metadata`** - Get project structure and dev server URL
- **`get_server_action_by_id`** - Look up Server Actions by ID

### MCP Configuration

The `.mcp.json` file at project root configures the MCP server:

```json
{
  "mcpServers": {
    "next-devtools-mcp": {
      "command": "npx",
      "args": ["next-devtools-mcp@latest"]
    }
  }
}
```

When `pnpm dev` is running, coding agents automatically connect via the `/_next/mcp` endpoint.
