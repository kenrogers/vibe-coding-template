# Testing Guidelines

## TDD Workflow (Mandatory)
1. **Write test first** - Define expected behavior
2. **Run test** - Confirm it fails
3. **Implement** - Minimum code to pass
4. **Refactor** - Clean up, tests stay green
5. **E2E verify** - Run Playwright for user flows

## Commands
```bash
pnpm test              # Run all unit tests
pnpm test:watch        # TDD mode
pnpm test -- Button    # Run specific tests
pnpm test:e2e          # Run Playwright
pnpm test:e2e:ui       # Playwright with UI
```

## Unit Tests (Vitest)
- Colocate with source: `Component.test.tsx`
- Test behavior, not implementation
- Mock external services only (APIs, databases)

```typescript
describe('calculateTotal', () => {
  it('should sum items with tax', () => {
    expect(calculateTotal([10, 20], 0.1)).toBe(33);
  });
});
```

## E2E Tests (Playwright)
Location: `tests/e2e/*.spec.ts`

```typescript
test('user can log in', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[name="email"]', 'test@example.com');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/dashboard');
});
```

## What to Mock
- ✅ External APIs (OpenAI, Stripe)
- ✅ Database in unit tests
- ❌ Internal modules
- ❌ Simple utilities
