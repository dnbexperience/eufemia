import { expect, test } from '@playwright/test'

test.describe('Drawer focus', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/uilib/components/drawer/demos/')
    await expect(page.locator('html')).toHaveAttribute(
      'data-portal-ready',
      'true'
    )
  })

  test('moves focus into the drawer when it opens on click', async ({
    page,
  }) => {
    const trigger = page
      .locator('[data-visual-test="simple-drawer"]')
      .getByRole('button', { name: 'Open drawer' })

    await trigger.click()

    await expect(page.getByRole('dialog')).toBeFocused()
  })

  test('moves focus into the drawer when it opens with the keyboard', async ({
    page,
  }) => {
    const trigger = page
      .locator('[data-visual-test="simple-drawer"]')
      .getByRole('button', { name: 'Open drawer' })

    await trigger.focus()
    await trigger.press('Enter')

    await expect(page.getByRole('dialog')).toBeFocused()
  })
})
