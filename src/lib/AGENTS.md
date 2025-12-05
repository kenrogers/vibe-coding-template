# Library Code Guidelines

## Principles
- **Pure functions** - No side effects, same input → same output
- **Export types** - Every module exports its types alongside implementations
- **Dependency injection** - Pass dependencies as parameters for testability

## Pattern
```typescript
// ✅ Good - Pure, typed, injectable
export interface ServiceConfig {
  apiUrl: string;
}

export function createService(config: ServiceConfig) {
  return {
    fetch: () => /* uses config.apiUrl */
  };
}

export type Service = ReturnType<typeof createService>;
```

## Before Adding Utilities
1. Check if it exists: `Grep pattern="functionName" path="src/lib"`
2. Check if a library already provides it
3. Add tests first (TDD)

## Subdirectories
- `db/` - Database layer (see db/AGENTS.md)
- `supabase/` - Supabase client configuration
