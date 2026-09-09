import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test.use({
  launchOptions: {
    firefoxUserPrefs: { 'font.size.variable.x-western': 32 },
  },
})

test.describe('motion with enlarged default fonts', () => {
  for (const reducedMotion of ['no-preference', 'reduce'] as const) {
    test(`scene geometry stays within its viewBox with ${reducedMotion}`, async ({
      page,
    }) => {
      await page.emulateMedia({ reducedMotion })
      await page.goto('/quickguide-designer/motion/')
      await waitForApp(page)
      await expect(page.locator('html')).toHaveCSS('font-size', '32px')
      const gallery = page.locator('.dnb-motion-demos')
      await gallery.evaluate((element) => {
        element.getAnimations({ subtree: true }).forEach((animation) => {
          animation.pause()
          animation.currentTime = 1800
        })
      })
      await expect(
        gallery.locator('.dnb-motion-scene__switch-thumb')
      ).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 28, 0)')
      await expect(
        gallery.locator('.dnb-motion-scene__following-row')
      ).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 0, 72)')
      await expect(
        gallery.locator(
          '.dnb-motion-scene__breadcrumb .dnb-motion-scene__disclosure-clip'
        )
      ).toHaveCSS('height', '104px')
      await expect(
        gallery.locator('.dnb-motion-scene__graph-label').first()
      ).toHaveCSS('font-size', '12px')
      await expect(
        gallery.locator('.dnb-motion-scene__submit-label')
      ).toHaveCSS('font-size', '16px')
      await expect(
        gallery.locator('.dnb-motion-scene__submit-cutout')
      ).toHaveAttribute('rx', '22')
      await expect(
        gallery.locator('g.dnb-motion-scene__illustration-roof')
      ).toHaveCSS('opacity', '1')
      await expect(
        gallery.locator('g.dnb-motion-scene__garage-door')
      ).toHaveCSS(
        'transform',
        reducedMotion === 'reduce' ? 'none' : 'matrix(1, 0, 0, 1, 0, -52)'
      )
      const icon = await gallery
        .locator('.dnb-motion-scene__icon')
        .evaluate((element) => ({
          viewport: element
            .querySelector('foreignObject')
            .getBoundingClientRect().width,
          glyph: element.querySelector('svg').getBoundingClientRect()
            .width,
        }))
      expect(Math.abs(icon.glyph - icon.viewport)).toBeLessThan(1)
      expect(
        await gallery
          .locator('.dnb-motion-demo__caption .dnb-p')
          .first()
          .evaluate((element) =>
            parseFloat(getComputedStyle(element).fontSize)
          )
      ).toBeGreaterThan(16)
    })
  }
})
