import { test, expect } from '@playwright/test'
import { AxeBuilder } from '@axe-core/playwright'

test('Filter examples have distinguishable landmarks', async ({
  page,
}) => {
  for (const path of [
    '/uilib/components/filter/',
    '/uilib/components/filter/demos/',
  ]) {
    await page.goto(path)
    await expect(page.locator('.dnb-live-preview').first()).toBeVisible()

    const result = await new AxeBuilder({ page })
      .withRules(['landmark-unique'])
      .analyze()

    expect(result.violations, path).toEqual([])
  }
})
