import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('should load the homepage', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveURL('/')
  })

  test('should have correct title', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/.*/)
  })

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    await expect(page.locator('body')).toBeVisible()
  })
})
