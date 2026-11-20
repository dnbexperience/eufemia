import { test, expect } from '@playwright/test'
import { AxeBuilder } from '@axe-core/playwright'

for (const brand of ['ui', 'sbanken', 'coconut', 'birdhouse']) {
  for (const colorScheme of ['light', 'dark'] as const) {
    test(`${brand} code attributes meet contrast requirements in ${colorScheme} mode`, async ({
      page,
    }) => {
      await page.emulateMedia({ colorScheme })
      await page.goto(
        `/web/components/button/demos/?eufemia-theme=${brand}`
      )
      await page
        .getByRole('button', { name: 'Code', exact: true })
        .first()
        .click()
      await expect(page.locator('.token.attr-name').first()).toBeVisible()

      const result = await new AxeBuilder({ page })
        .include('.token.attr-name')
        .withRules(['color-contrast'])
        .analyze()

      expect(result.violations).toEqual([])
    })
  }
}
