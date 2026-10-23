import { test, expect } from '@playwright/test'
import { AxeBuilder } from '@axe-core/playwright'

test('List visual test pages have a descriptive level-one heading', async ({
  page,
}) => {
  for (const path of [
    '/uilib/components/list/visual-tests/action-footer/',
    '/uilib/components/list/visual-tests/card-outline/',
    '/uilib/components/list/visual-tests/custom-cells/',
    '/uilib/components/list/visual-tests/focus-fallback/',
    '/uilib/components/list/visual-tests/nested-alignment/',
    '/uilib/components/list/visual-tests/overline-and-subline/',
    '/uilib/components/list/visual-tests/text-layout/',
    '/uilib/components/list/visual-tests/title-in-center/',
  ]) {
    await page.goto(path)
    await expect(page.locator('main')).toBeVisible()

    const result = await new AxeBuilder({ page })
      .withRules(['page-has-heading-one'])
      .analyze()

    expect(result.violations, path).toEqual([])
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      /^List: /
    )
  }
})
