import { test, expect } from '@playwright/test'

test.describe('Slider', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/uilib/components/slider/demos/?data-visual-test')

    // Check if app is mounted
    await page.waitForSelector('#dnb-drawer-list__portal', {
      state: 'attached',
    })
  })

  test('click on grid switch should enable the grid', async ({ page }) => {
    const inputElements = page.locator(
      '[data-visual-test="slider-multi"] .dnb-slider:nth-child(2) input'
    )

    await expect(inputElements.nth(1)).toHaveValue('30')
    await expect(inputElements.nth(2)).toHaveValue('50')

    await inputElements.nth(1).focus()

    // 30 + 25 = 55
    for (let i = 0; i < 25; i++) {
      await page.keyboard.press('ArrowRight')
    }

    await expect(inputElements.nth(2)).toHaveValue('55') // the elements where swapped
    await expect(inputElements.nth(1)).toHaveValue('50') // therefore, now the first one is at 30
  })
})
