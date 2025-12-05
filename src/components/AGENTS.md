# Components Guidelines

## Defaults
- **Server Components by default** - Only add `'use client'` when you need:
  - Event handlers (onClick, onChange, etc.)
  - React hooks (useState, useEffect, etc.)
  - Browser-only APIs

## Before Creating a Component
1. Search for similar components: `Grep pattern="ComponentName" path="src/components"`
2. Check `ui/` for primitives you can compose
3. Follow existing patterns in the same directory

## Conventions
- Props interface: `ComponentNameProps`
- Colocate tests: `Button.tsx` → `Button.test.tsx`
- One component per file (with subcomponents if needed)

## File Structure
```
components/
├── ui/           # Primitives (Button, Input, Card)
└── features/     # Domain-specific (UserProfile, ChatMessage)
```

## Testing
```bash
pnpm test -- ComponentName  # Run specific component tests
```
