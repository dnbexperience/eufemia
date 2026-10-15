import { test, expect } from '@playwright/test'

for (const url of [
  '/uilib/components/card/visual-tests/close-button-padding/?data-visual-test&eufemia-theme=ui',
  '/uilib/components/card/visual-tests/close-button-padding/?data-visual-test&eufemia-theme=sbanken',
  '/uilib/components/card/visual-tests/close-button-padding/?data-visual-test&eufemia-theme=carnegie',
]) {
  const theme = url.slice(url.lastIndexOf('=') + 1)
  for (const width of [375, 1280]) {
    test(
      'aligns close buttons with the content for ' +
        theme +
        ' at ' +
        width +
        'px',
      async ({ page }) => {
        await page.setViewportSize({ width, height: 1024 })
        await page.goto(url)
        const cards = page.locator(
          '[data-visual-test="card-close-padding"] .dnb-card'
        )
        await expect(cards).toHaveCount(5)
        await page.evaluate(() => document.fonts.ready)

        for (const card of await cards.all()) {
          const offset = await card.evaluate((element) => {
            const text = element.querySelector('.dnb-p')
            const button = element.querySelector('.dnb-card__close-button')
            const textRect = text.getBoundingClientRect()
            const buttonRect = button.getBoundingClientRect()
            const lineHeight = parseFloat(
              getComputedStyle(text).lineHeight
            )
            return (
              buttonRect.top +
              buttonRect.height / 2 -
              textRect.top -
              lineHeight / 2
            )
          })
          expect(Math.abs(offset)).toBeLessThanOrEqual(1)
        }
      }
    )
  }
}
