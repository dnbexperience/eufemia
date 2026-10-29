import { expect, test } from '@playwright/test'

test.describe('Dropdown focus', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/uilib/components/dropdown/demos/')
    await expect(page.locator('html')).toHaveAttribute(
      'data-portal-ready',
      'true'
    )
  })

  test('returns focus to the trigger after Escape', async ({ page }) => {
    const trigger = page.locator(
      '[data-visual-test="dropdown-closed"] button.dnb-dropdown__trigger'
    )

    await trigger.click()
    // The list handles keys itself after its opening delay. Then Arrow Down
    // moves focus to an option, so Escape below takes that path.
    await expect(async () => {
      await page.keyboard.press('ArrowDown')
      await expect(page.locator('[role="option"]:focus')).toHaveCount(1, {
        timeout: 250,
      })
    }).toPass()
    await page.keyboard.press('Escape')

    await expect(trigger).toHaveAttribute('aria-expanded', 'false')
    await expect(trigger).toBeFocused()
  })

  test('returns focus to the trigger after Escape while the list opens', async ({
    page,
  }) => {
    const trigger = page.locator(
      '[data-visual-test="dropdown-closed"] button.dnb-dropdown__trigger'
    )

    await trigger.click()
    await page.keyboard.press('Escape')

    await expect(trigger).toHaveAttribute('aria-expanded', 'false')
    await expect(trigger).toBeFocused()
  })
})
