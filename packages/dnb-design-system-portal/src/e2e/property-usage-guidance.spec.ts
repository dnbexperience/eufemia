import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'

const guidanceName = 'Read about intended use and customization'

for (const path of [
  '/uilib/usage/customisation/component-properties/#intended-use-and-customization',
  '/uilib/components/breadcrumb/events/',
]) {
  test(`keeps the property note off ${path}`, async ({ page }) => {
    await page.goto(path)
    await waitForApp(page)
    await expect(page.locator('main h1')).toBeVisible()
    await expect(
      page.getByRole('link', { name: guidanceName })
    ).toHaveCount(0)
  })
}

for (const path of [
  '/uilib/components/button/properties/',
  '/uilib/components/breadcrumb/properties/',
  '/uilib/elements/paragraph/properties/',
  '/uilib/extensions/forms/base-fields/String/properties/',
]) {
  test(`shows usage guidance once on ${path}`, async ({ page }) => {
    await page.goto(path)
    await waitForApp(page)
    await expect(page.locator('main table').first()).toBeVisible()

    const guidance = page.getByRole('link', { name: guidanceName })
    await expect(guidance).toHaveCount(1)
    await expect(guidance).toBeVisible()
    await expect(guidance.locator('..')).toContainText(
      'need a use case approved by DNB UX'
    )
  })
}

test('links to the shared guidance and stays off other tabs', async ({
  page,
}) => {
  await page.goto('/uilib/components/breadcrumb/properties/')
  await waitForApp(page)

  await page.getByRole('link', { name: guidanceName }).click()
  await expect(page).toHaveURL(
    new RegExp('component-properties/#intended-use-and-customization$')
  )
  await expect(
    page.getByRole('heading', {
      name: 'Intended use and customization',
      exact: true,
    })
  ).toBeVisible()
  await expect(page.getByRole('link', { name: guidanceName })).toHaveCount(
    0
  )

  await page.goBack()
  await expect(page.getByRole('link', { name: guidanceName })).toHaveCount(
    1
  )
  await page.getByRole('tab', { name: 'Events', exact: true }).click()
  await expect(page).toHaveURL(new RegExp('breadcrumb/events/?$'))
  await expect(page.getByRole('link', { name: guidanceName })).toHaveCount(
    0
  )
})
