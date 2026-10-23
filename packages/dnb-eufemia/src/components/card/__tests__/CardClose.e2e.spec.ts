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

        const mediaCard = cards.filter({ has: page.locator('img') })
        const geometry = await mediaCard.evaluate((element) => {
          const card = element.getBoundingClientRect()
          const image = element
            .querySelector('img')
            .getBoundingClientRect()
          const button = element
            .querySelector('.dnb-card__close-button')
            .getBoundingClientRect()
          return {
            widthDifference: Math.abs(card.width - image.width),
            top: button.top - card.top,
            right: card.right - button.right,
          }
        })
        expect(geometry.widthDifference).toBeLessThanOrEqual(1)
        expect(geometry.top).toBeCloseTo(16, 0)
        expect(geometry.right).toBeCloseTo(16, 0)

        for (const card of await cards
          .filter({ hasNot: page.locator('img') })
          .all()) {
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
          const control = card.locator('.dnb-card__close-button')
          await expect(control).toHaveCSS('width', '24px')
          await expect(control).toHaveCSS('height', '24px')
          expect(
            await control.evaluate(
              (button) => getComputedStyle(button).backgroundColor
            )
          ).not.toBe('rgba(0, 0, 0, 0)')
          const icon = control.locator('svg')
          await expect(icon).toHaveCSS('width', '16px')
          const iconOffset = await icon.evaluate((svg) => {
            const rect = svg.getBoundingClientRect()
            const button = svg.closest('button').getBoundingClientRect()
            return Math.max(
              Math.abs(
                rect.left + rect.width / 2 - button.left - button.width / 2
              ),
              Math.abs(
                rect.top + rect.height / 2 - button.top - button.height / 2
              )
            )
          })
          expect(iconOffset).toBeLessThanOrEqual(1)
        }
      }
    )
  }
}
