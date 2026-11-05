import { test, expect } from '@playwright/test'
import { AxeBuilder } from '@axe-core/playwright'
import waitForApp from './shared/waitForApp'

for (const path of [
  '/web/components/breadcrumb/',
  '/web/components/breadcrumb/demos/',
  '/web/components/step-indicator/',
  '/web/components/step-indicator/demos/',
  '/web/patterns-and-extensions/sidebar-menu/',
  '/web/patterns-and-extensions/sidebar-menu/demos/',
  '/web/forms/Wizard/Container/',
  '/web/forms/Wizard/Container/demos/',
  '/web/forms/Wizard/demos/',
  '/web/forms/Wizard/location-hooks/',
  '/web/forms/Wizard/location-hooks/demos/',
  '/web/forms/Wizard/Step/',
  '/web/forms/Wizard/Step/demos/',
  '/web/forms/Wizard/useStep/',
  '/web/forms/Wizard/useStep/demos/',
  '/web/components/list/visual-tests/action-footer/',
  '/web/components/list/visual-tests/text-layout/',
  '/web/components/filter/visual-tests/panel-actions/',
]) {
  test(`landmarks have distinguishable names on ${path}`, async ({
    page,
  }) => {
    await page.goto(path)
    await waitForApp(page)

    const result = await new AxeBuilder({ page })
      .withRules(['landmark-unique'])
      .analyze()

    expect(result.violations).toEqual([])
  })
}

test('Wizard landmark names follow the active step', async ({ page }) => {
  await page.goto('/web/forms/Wizard/useStep/demos/')
  await waitForApp(page)

  const firstStep = page.getByRole('region', {
    name: 'Step hook wizard: Step 1',
    exact: true,
  })
  await firstStep
    .getByRole('button', { name: 'Next', exact: true })
    .click()

  await expect(firstStep).toBeHidden()
  await expect(
    page.getByRole('region', {
      name: 'Step hook wizard: Step 2',
      exact: true,
    })
  ).toBeVisible()

  const result = await new AxeBuilder({ page })
    .withRules(['landmark-unique'])
    .analyze()

  expect(result.violations).toEqual([])
})
