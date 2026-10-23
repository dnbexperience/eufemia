import { expect, test } from '@playwright/test'
import type { Locator } from '@playwright/test'

test.describe('Popover focus restoration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/uilib/components/popover/demos/#controlled-state')
  })

  const closeMethods: Array<
    [string, (content: Locator) => Promise<void>]
  > = [
    [
      'controlled closing',
      (content) => content.getByRole('button', { name: 'Done' }).click(),
    ],
    ['Escape', (content) => content.press('Escape')],
  ]

  for (const [method, close] of closeMethods) {
    test(`returns focus to the opener after ${method}`, async ({
      page,
    }) => {
      const example = page.locator(
        '[data-visual-test="popover-controlled"]'
      )
      const trigger = example.getByRole('button', {
        name: 'Open controlled popover',
      })
      const content = page.locator('#controlled-popover-content')

      await trigger.focus()
      await trigger.press('Enter')
      await expect(content).toBeFocused()
      await close(content)

      await expect(content).toBeHidden()
      await expect(trigger).toBeFocused()
    })
  }

  test('preserves focus when clicking another action outside', async ({
    page,
  }) => {
    const example = page.locator('[data-visual-test="popover-controlled"]')
    const trigger = example.getByRole('button', {
      name: 'Open controlled popover',
    })
    const outside = example.getByRole('button', { name: 'Another action' })
    const content = page.locator('#controlled-popover-content')

    await trigger.focus()
    await trigger.press('Enter')
    await expect(content).toBeFocused()
    await outside.click()

    await expect(content).toBeHidden()
    await expect(trigger).not.toBeFocused()
  })
})
