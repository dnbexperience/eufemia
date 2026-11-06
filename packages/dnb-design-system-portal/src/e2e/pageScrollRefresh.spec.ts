import { expect, test } from '@playwright/test'
import waitForApp from './shared/waitForApp'

for (const width of [390, 1440]) {
  test(
    'restores a refreshed page before hydration at ' + width,
    async ({ page }) => {
      await page.setViewportSize({ width, height: 900 })
      await page.addInitScript(() => {
        const positions: number[] = []
        Object.assign(window, { restoredPagePositions: positions })
        const scrollTo = window.scrollTo.bind(window)
        window.scrollTo = ((options: ScrollToOptions) => {
          scrollTo(options)
          if (options?.top > 0) {
            positions.push(window.scrollY)
          }
        }) as typeof window.scrollTo
      })
      await page.goto('/web/components/button/demos/')
      await waitForApp(page)
      await page.evaluate(() =>
        window.scrollTo({ top: 1200, behavior: 'instant' })
      )
      await expect
        .poll(() => page.evaluate(() => window.scrollY))
        .toBe(1200)

      let resume: () => void
      const hydration = new Promise<void>((resolve) => {
        resume = resolve
      })
      await page.route(/\.m?js(?:\?|$)/, async (route) => {
        await hydration
        await route.continue()
      })
      try {
        await page.reload({ waitUntil: 'commit' })
        await expect(page.locator('#tab-bar-content')).toHaveCSS(
          'line-height',
          '24px'
        )
        await expect(page.locator('html')).not.toHaveAttribute(
          'data-portal-ready'
        )
        await expect
          .poll(() => page.evaluate(() => window.scrollY))
          .toBe(1200)
        expect(
          await page.evaluate(() => window['restoredPagePositions'])
        ).toEqual([1200])
        resume()
        await waitForApp(page)
        await expect
          .poll(() => page.evaluate(() => window.scrollY))
          .toBe(1200)
        expect(
          await page.evaluate(() => window['restoredPagePositions'])
        ).toEqual([1200, 1200])
      } finally {
        resume()
        await page.unrouteAll({ behavior: 'wait' })
      }
    }
  )
}
