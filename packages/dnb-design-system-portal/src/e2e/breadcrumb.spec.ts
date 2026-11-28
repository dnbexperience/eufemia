import { test, expect } from '@playwright/test'

test('shows animated navigation as an interactive component demo', async ({
  page,
}) => {
  await page.goto('/web/components/breadcrumb/demos/#animated-navigation')
  const breadcrumb = page.getByRole('navigation', {
    name: 'Animated example',
  })
  await expect(breadcrumb.locator('[aria-current="page"]')).toHaveText(
    'Overview'
  )
  await page.getByRole('button', { name: 'Accounts', exact: true }).click()
  await expect(breadcrumb.locator('[aria-current="page"]')).toHaveText(
    'Accounts'
  )
  await page.getByRole('button', { name: 'Payments', exact: true }).click()
  await expect(breadcrumb.locator('[aria-current="page"]')).toHaveText(
    'Payments'
  )
  await breadcrumb
    .getByRole('link', { name: 'Overview', exact: true })
    .click()
  await expect(breadcrumb.locator('li')).toHaveCount(1)
  await expect(breadcrumb.locator('[aria-current="page"]')).toHaveText(
    'Overview'
  )
})

for (const { section, root, leaf, labels } of [
  {
    section: 'Forms',
    root: '/web/forms/',
    leaf: '/web/forms/base-fields/String/',
    labels: ['Forms', 'Base fields', 'String'],
  },
  {
    section: 'Chat',
    root: '/web/patterns-and-extensions/chat/',
    leaf: '/web/patterns-and-extensions/chat/PromptInput/',
    labels: ['Chat', 'Prompt input'],
  },
]) {
  test(
    'animates the shared ' + section + ' breadcrumb across navigation',
    async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 })
      await page.goto(leaf)
      await expect(page.locator('html')).toHaveAttribute(
        'data-portal-ready',
        'true'
      )

      const breadcrumb = page.locator(
        '#content-grid-header .dnb-breadcrumb'
      )
      const list = breadcrumb.locator('.dnb-breadcrumb__bar ol')
      const items = list.locator(':scope > li')
      await expect(items).toHaveText(labels)
      const rootItem = await items.first().elementHandle()
      const icon = await items.first().locator('.dnb-icon').elementHandle()
      const originalList = await list.elementHandle()

      await breadcrumb
        .getByRole('link', { name: section, exact: true })
        .click()
      await expect(page).toHaveURL(new RegExp(root + '$'))
      await expect(list.locator('[aria-current="page"]')).toHaveText(
        section
      )
      await expect(items).toHaveText([section])
      await expect(breadcrumb.getByRole('link')).toHaveCount(0)
      expect(
        await list.evaluate(
          (element, original) => element === original,
          originalList
        )
      ).toBe(true)
      expect(
        await items
          .first()
          .evaluate((element, original) => element === original, rootItem)
      ).toBe(true)
      expect(
        await items
          .first()
          .locator('.dnb-icon')
          .evaluate((element, original) => element === original, icon)
      ).toBe(true)

      await page.goBack()
      await expect(page).toHaveURL(new RegExp(leaf + '$'))
      await expect(items).toHaveText(labels)
      await expect(list.locator('[aria-current="page"]')).toHaveText(
        labels.at(-1)
      )
      await expect(items).toHaveClass(
        labels.map(() => /dnb-breadcrumb__item--animated/)
      )
      expect(
        await items
          .first()
          .evaluate((element, original) => element === original, rootItem)
      ).toBe(true)
      expect(
        await items
          .first()
          .locator('.dnb-icon')
          .evaluate((element, original) => element === original, icon)
      ).toBe(true)
    }
  )
}
