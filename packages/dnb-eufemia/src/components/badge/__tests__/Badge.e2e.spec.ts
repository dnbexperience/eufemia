import { test, expect } from '@playwright/test'

test.describe('Badge', () => {
  test('keeps the button clickable underneath the badge', async ({
    page,
  }) => {
    await page.goto('/uilib/components/badge/demos/#overlaid-button')

    const example = page.locator('[data-visual-test="badge-button"]')
    const badge = example.locator('.dnb-badge')
    const button = example.getByRole('button', {
      name: 'Add notification',
    })

    await expect(badge).toHaveText('Notifications 1')
    await button.scrollIntoViewIfNeeded()

    const bounds = await badge.boundingBox()
    const position = {
      x: bounds.x + bounds.width / 2,
      y: bounds.y + bounds.height / 2,
    }

    await page.mouse.click(position.x, position.y)

    await expect(badge).toHaveText('Notifications 2')

    await button.focus()
    await expect(button).toBeFocused()

    await page.keyboard.press('Enter')

    await expect(badge).toHaveText('Notifications 3')

    await button.evaluate((element: HTMLButtonElement) => {
      element.disabled = true
    })
    await page.mouse.click(position.x, position.y)

    await expect(badge).toHaveText('Notifications 3')
  })
})
