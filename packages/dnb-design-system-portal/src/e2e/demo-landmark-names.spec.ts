import { test, expect } from '@playwright/test'
import { AxeBuilder } from '@axe-core/playwright'
import waitForApp from './shared/waitForApp'

for (const path of [
  '/uilib/components/breadcrumb/',
  '/uilib/components/breadcrumb/demos/',
  '/uilib/components/step-indicator/',
  '/uilib/components/step-indicator/demos/',
  '/uilib/extensions/sidebar-menu/',
  '/uilib/extensions/sidebar-menu/demos/',
  '/uilib/extensions/forms/Wizard/Container/',
  '/uilib/extensions/forms/Wizard/Container/demos/',
  '/uilib/extensions/forms/Wizard/demos/',
  '/uilib/extensions/forms/Wizard/location-hooks/',
  '/uilib/extensions/forms/Wizard/location-hooks/demos/',
  '/uilib/extensions/forms/Wizard/Step/',
  '/uilib/extensions/forms/Wizard/Step/demos/',
  '/uilib/extensions/forms/Wizard/useStep/',
  '/uilib/extensions/forms/Wizard/useStep/demos/',
  '/uilib/components/list/visual-tests/action-footer/',
  '/uilib/components/list/visual-tests/text-layout/',
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
  await page.goto('/uilib/extensions/forms/Wizard/useStep/demos/')
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
