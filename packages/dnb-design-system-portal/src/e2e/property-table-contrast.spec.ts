import { test, expect } from '@playwright/test'
import { AxeBuilder } from '@axe-core/playwright'

for (const colorScheme of ['light', 'dark'] as const) {
  test(`property tables meet contrast requirements in ${colorScheme} mode`, async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme })

    for (const path of [
      '/uilib/components/button/properties/',
      '/uilib/components/stat/properties/',
    ]) {
      await page.goto(path)
      await expect(page.locator('.dnb-table').first()).toBeVisible()

      const result = await new AxeBuilder({ page })
        .include('.dnb-table')
        .withRules(['color-contrast'])
        .analyze()

      expect(result.violations, path).toEqual([])
    }
  })
}
