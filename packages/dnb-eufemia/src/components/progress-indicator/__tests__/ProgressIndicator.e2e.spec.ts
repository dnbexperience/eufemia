import { test, expect } from '@playwright/test'

test.describe('ProgressIndicator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(
      '/uilib/components/progress-indicator/demos/?data-visual-test'
    )

    // Check if app is mounted (Vite uses #root)
    await page.waitForSelector('#root', {
      state: 'attached',
    })
  })

  for (const colorScheme of ['light', 'dark'] as const) {
    test.describe(colorScheme, () => {
      test.use({ forcedColors: 'active', colorScheme })

      test('uses Highlight for a linear bar with customColors in forced colors mode', async ({
        page,
        browserName,
      }) => {
        test.skip(
          browserName === 'webkit',
          'WebKit does not support forced colors emulation.'
        )

        const bar = page.locator(
          '[data-visual-test="progress-indicator-custom-horizontal"] .dnb-progress-indicator__linear__bar'
        )
        await expect(bar).toHaveAttribute('style', /background-color/)

        const highlight = await bar.evaluate((bar) => {
          const element = document.createElement('span')
          element.style.backgroundColor = 'Highlight'
          bar.parentElement.appendChild(element)
          const color = getComputedStyle(element).backgroundColor
          element.remove()
          return color
        })

        // customColors.line is set as an inline style, which wins over a
        // stylesheet rule without !important
        await expect(bar).toHaveCSS('background-color', highlight)
      })
    })
  }
})
