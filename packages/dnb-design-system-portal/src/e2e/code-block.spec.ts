import { test, expect } from '@playwright/test'

test.describe('CodeBlock', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/uilib/components/textarea/demos')

    // Check if app is mounted
    await page.waitForSelector('#dnb-drawer-list__portal', {
      state: 'attached',
    })
  })

  test('should tab to next element except when code change is made', async ({
    page,
  }) => {
    const textareaList = page.locator('textarea')
    const preList = page.locator('pre')

    // Set our starting point
    textareaList.nth(0).focus()

    await expect(textareaList.nth(0)).toBeFocused()

    await page.keyboard.down('Tab')

    await expect(preList.nth(0)).toBeFocused()

    await page.keyboard.down('Tab')

    await expect(textareaList.nth(1)).toBeFocused()

    await page.keyboard.down('Tab')

    await expect(preList.nth(1)).toBeFocused()

    // Make code change
    await page.keyboard.down('Space')

    // Try a new tab key down
    await page.keyboard.down('Tab')

    // Is still in same pre
    await expect(preList.nth(1)).toBeFocused()
  })
})
