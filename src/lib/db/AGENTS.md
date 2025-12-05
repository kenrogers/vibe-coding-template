# Database Guidelines

## Schema Changes
**Always use migrations** - Never modify production schema directly
```bash
pnpm db:generate  # Generate migration from schema changes
pnpm db:migrate   # Apply migrations
pnpm db:push      # Dev only - push without migration
```

## Transactions
Use transactions for multi-table operations:
```typescript
await db.transaction(async (tx) => {
  await tx.insert(users).values(userData);
  await tx.insert(profiles).values(profileData);
});
```

## Type-Safe Queries
```typescript
// ✅ Use Drizzle's type-safe API
const user = await db.query.users.findFirst({
  where: eq(users.id, userId),
  with: { posts: true },
});

// ❌ Avoid raw SQL unless necessary
```

## Naming Conventions
- Tables: `snake_case` (e.g., `user_profiles`)
- TypeScript types: `PascalCase` (e.g., `UserProfile`)

## Testing
- Use database fixtures for consistent test data
- Clean up after tests or use transactions that rollback
- See `tests/` for fixture patterns
