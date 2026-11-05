import { expect, test } from '@playwright/test'
import waitForApp from './shared/waitForApp'

for (const colorScheme of ['light', 'dark'] as const) {
  test(`matches the browser background to the page in ${colorScheme} mode`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.emulateMedia({ colorScheme })

    for (const path of ['/web/introduction/', '/']) {
      await page.goto(path)
      await waitForApp(page)
      const content = page.locator('.dnb-app-content')
      const background = await content.evaluate(
        (element) => getComputedStyle(element).backgroundColor
      )
      await expect(page.locator('body')).toHaveCSS(
        'background-color',
        background
      )
    }
  })
}
