# Vibe Coding Template

> **Production-ready coding template** with compound engineering principles built-in.

A Next.js 14 template designed for AI-assisted development using TDD, with Supabase and Drizzle ORM.

## Philosophy: Compound Engineering

Each unit of engineering work should make subsequent units of work easier—not harder.

- ✅ **TDD by default** - Write tests first, then implementation
- ✅ **AI-optimized** - AGENTS.md files guide AI assistants
- ✅ **Toolbox ready** - Amp Toolboxes for automated workflows
- ✅ **Quality gates** - Typecheck → Lint → Unit Tests → E2E

## Quick Start

```bash
# Clone the template
git clone https://github.com/your-org/vibe-coding-template.git my-app
cd my-app

# Install dependencies
pnpm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your credentials

# Install Playwright browsers
pnpm playwright install

# Start development
pnpm dev
```

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 14** | React framework with App Router |
| **Tailwind CSS** | Utility-first styling |
| **Supabase** | Auth, Database, Realtime, Storage |
| **Drizzle ORM** | Type-safe database queries |
| **Vitest** | Unit testing |
| **Playwright** | E2E testing |

## Commands

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Production build
pnpm start            # Start production

# Quality Checks
pnpm typecheck        # TypeScript checking
pnpm lint             # ESLint
pnpm lint:fix         # Auto-fix lint issues

# Testing
pnpm test             # Run unit tests
pnpm test:watch       # Watch mode (TDD)
pnpm test:coverage    # Coverage report
pnpm test:e2e         # E2E tests
pnpm test:e2e:ui      # Playwright UI mode

# Database
pnpm db:generate      # Generate migrations
pnpm db:migrate       # Run migrations
pnpm db:push          # Push schema (dev)
pnpm db:studio        # Drizzle Studio
```

## Project Structure

```
├── .amp/
│   └── tools/              # Amp Toolboxes
│       ├── run_tests       # Unit test runner
│       ├── run_e2e         # E2E test runner
│       ├── typecheck       # Type checker
│       ├── quality_check   # Full quality pipeline
│       ├── tdd_cycle       # TDD workflow helper
│       └── db_migrate      # Database migrations
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── api/            # API routes
│   │   └── ...
│   ├── components/         # React components
│   │   └── ui/             # Primitive components
│   ├── lib/
│   │   ├── db/             # Drizzle ORM + schema
│   │   └── supabase/       # Supabase clients
│   ├── hooks/              # Custom hooks
│   └── types/              # TypeScript types
├── tests/
│   └── e2e/                # Playwright tests
├── AGENTS.md               # Root AI guidelines
└── README.md
```

## AI-Assisted Development

This template is optimized for AI coding assistants like Amp. Each folder contains an `AGENTS.md` file with:

- Folder-specific conventions
- Example patterns to follow
- Testing requirements
- Common pitfalls to avoid

### Amp Toolboxes

The `.amp/tools/` directory contains executable tools for common workflows:

| Tool | Purpose |
|------|---------|
| `run_tests` | Run Vitest with optional patterns |
| `run_e2e` | Run Playwright E2E tests |
| `typecheck` | TypeScript type checking |
| `quality_check` | Full quality pipeline |
| `tdd_cycle` | Guide TDD red-green-refactor |
| `db_migrate` | Drizzle migration helpers |

### TDD Workflow

When adding features, follow this cycle:

```
1. 🔴 RED    - Write a failing test
2. 🟢 GREEN  - Write minimum code to pass
3. 🔵 REFACTOR - Clean up while tests pass
4. 🎭 E2E   - Verify in real browser
```

The AI assistant will use `tdd_cycle` to guide this process.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Database
DATABASE_URL=postgresql://...
```

## Database Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Copy the connection string to `DATABASE_URL`
3. Run migrations:

```bash
pnpm db:push   # Quick dev sync
# or
pnpm db:generate && pnpm db:migrate  # Production
```

## Contributing

1. Follow TDD - write tests first
2. Run quality checks before committing
3. Update AGENTS.md files when adding patterns

## License

MIT
