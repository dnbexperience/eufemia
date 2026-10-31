import { test, expect } from '@playwright/test'

test.describe('Slider', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/uilib/components/slider/demos/?data-visual-test')

    // Check if app is mounted
    await page.waitForSelector('#eufemia-portal-root', {
      state: 'attached',
    })
  })

  test('should swap thumbs by using ArrowRight', async ({ page }) => {
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

    await expect(inputElements.nth(2)).toHaveValue('55') // the elements were swapped
    await expect(inputElements.nth(1)).toHaveValue('50') // therefore, now the first one is at 30
  })

  for (const colorScheme of ['light', 'dark'] as const) {
    test.describe(colorScheme, () => {
      test.use({ forcedColors: 'active', colorScheme })

      test('keeps the system focus ring on the marker in forced colors mode', async ({
        page,
        browserName,
      }) => {
        test.skip(
          browserName === 'webkit',
          'WebKit does not support forced colors emulation.'
        )

        const marker = page.locator(
          '[data-visual-test="slider-marker"] .dnb-slider__marker'
        )

        // Use the keyboard, so that the keyboard focus styles apply
        await marker.focus()
        await page.keyboard.press('Tab')
        await page.keyboard.press('Shift+Tab')
        await expect(marker).toBeFocused()

        // With forced-color-adjust: none, the brand-colored box-shadow comes
        // back, and the outline stays transparent
        await expect(marker).toHaveCSS('box-shadow', 'none')
        const outlineColor = await marker.evaluate(
          (element) => getComputedStyle(element).outlineColor
        )
        expect(outlineColor).not.toBe('rgba(0, 0, 0, 0)')

        // outline-color alone does not prove a visible ring; also check its size.
        await expect(marker).toHaveCSS('outline-style', 'solid')
        await expect(marker).toHaveCSS('outline-width', '4px')
      })
    })
  }
})
