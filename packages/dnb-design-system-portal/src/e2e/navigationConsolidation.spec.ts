import { expect, test } from '@playwright/test'
import waitForApp from './shared/waitForApp'

for (const width of [1440, 390]) {
  test(
    'uses the combined Logos page and preserves the old guide at ' + width,
    async ({ page }) => {
      await page.setViewportSize({ width, height: 1000 })
      await page.goto('/collections/logos/?from=bookmark#brand-center')
      await waitForApp(page)
      await expect(page).toHaveURL(
        new RegExp('/collections/logos/[?]from=bookmark#brand-center$')
      )
      await expect(page.locator('h1')).toHaveText('Logos#')
      for (const id of [
        'dnb-brand-logos',
        'company-and-partner-logos',
        'developers',
      ]) {
        await expect(page.locator('#' + id)).toBeAttached()
      }
    }
  )
}

for (const [from, to] of [
  [
    '/web/typography/font-weight/#eufemia-has-three-3-font-weights',
    '/web/layout-and-typography/typography/css-reference/#supported-weights',
  ],
  [
    '/design-foundations/motion-principles/#animation-principles',
    '/design-foundations/motion-principles/#motion-principles',
  ],
  [
    '/web/get-started/design-for-web/#why-not-sketch',
    '/web/get-started/design-for-web/#why-not-sketch',
  ],
  [
    '/web/styling-and-themes/legacy-colors/#color-table-for-web',
    '/web/styling-and-themes/legacy-colors/#legacy-color-palette',
  ],
  ['/collections/icons/#bell', '/collections/icons/#bell'],
  [
    '/collections/icons/#react-example-usage',
    '/web/components/icon/usage/#react-example-usage',
  ],
  [
    '/web/contribute/local-development/#get-the-repo-on-your-local-computer',
    '/web/contribute/local-development/#clone-the-repo',
  ],
]) {
  test('preserves ' + from, async ({ page }) => {
    await page.goto(from)
    await waitForApp(page)
    await expect
      .poll(() => new URL(page.url()).pathname + new URL(page.url()).hash)
      .toBe(to)
    await expect(page.locator('#' + to.split('#')[1])).toBeAttached()
  })
}
