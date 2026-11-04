import { expect, test } from '@playwright/test'

for (const width of [375, 639, 1024]) {
  for (const [index, modal] of ['dialog', 'drawer'].entries()) {
    test(`inline help fits inside a ${modal} at ${width}px`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 })
      await page.goto(
        '/uilib/components/help-button/demos/?data-visual-test=true'
      )
      await page.getByTestId(`inline-help-modal-${index}`).click()
      const content = page.locator(`.dnb-${modal}__content`)
      await content.locator('.dnb-help-button__inline').click()
      await expect(
        content.locator('.dnb-help-button__content')
      ).toBeVisible()
      await expect
        .poll(() =>
          page
            .locator(
              modal === 'drawer'
                ? '.dnb-drawer.dnb-scroll-view'
                : '.dnb-dialog > .dnb-scroll-view'
            )
            .evaluate((element) => {
              return element.scrollWidth - element.clientWidth
            })
        )
        .toBeLessThanOrEqual(1)
      await expect
        .poll(() =>
          content
            .locator('.dnb-help-button__content .dnb-section')
            .evaluate((element) => {
              return getComputedStyle(element)
                .getPropertyValue('--outset-right')
                .trim()
            })
        )
        .toBe(width < 640 ? '1rem' : '1.5rem')
    })
  }
}
