import { expect, test } from '@playwright/test'
import waitForApp from './shared/waitForApp'

for (const width of [1440, 390]) {
  for (const colorScheme of ['light', 'dark'] as const) {
    test(
      'keeps the home heading and background intact at ' +
        width +
        'px in ' +
        colorScheme,
      async ({ page }) => {
        await page.setViewportSize({ width, height: 900 })
        await page.emulateMedia({ colorScheme })
        await page.goto('/')
        await waitForApp(page)

        await expect(page).toHaveTitle('DNB Design System | Eufemia')
        const heading = page.locator('main h1')
        await expect(heading).toHaveCount(1)
        await expect(heading).toHaveText('Welcome to Eufemia')
        const layout = await page.evaluate(() => {
          const home = document.querySelector('[data-portal-home]')
          const hero = home.querySelector('section')
          const heading = home.querySelector('h1')
          const content = document.querySelector('.dnb-app-content')
          return {
            home: home.getBoundingClientRect().toJSON(),
            hero: hero.getBoundingClientRect().toJSON(),
            heading: heading.getBoundingClientRect().toJSON(),
            content: content.getBoundingClientRect().toJSON(),
            headerBackground: getComputedStyle(
              document.querySelector('header.sticky-menu')
            ).backgroundColor,
            footerBackground: getComputedStyle(
              document.querySelector('footer')
            ).backgroundColor,
            overflow:
              document.documentElement.scrollWidth > window.innerWidth,
          }
        })
        expect(layout.home.top).toBeCloseTo(0, 1)
        expect(layout.home.left).toBeCloseTo(layout.content.left, 1)
        expect(layout.home.right).toBeCloseTo(layout.content.right, 1)
        expect(layout.heading.top).toBeGreaterThanOrEqual(layout.hero.top)
        expect(layout.heading.bottom).toBeLessThanOrEqual(
          layout.hero.bottom
        )
        expect(layout.heading.left).toBeGreaterThanOrEqual(
          layout.home.left
        )
        expect(layout.heading.right).toBeLessThanOrEqual(layout.home.right)
        expect(layout.headerBackground).toBe('rgba(0, 0, 0, 0)')
        expect(layout.footerBackground).toBe('rgba(0, 0, 0, 0)')
        expect(layout.overflow).toBe(false)
      }
    )
  }
}
