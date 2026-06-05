import { test, expect } from '@playwright/test'

test.describe('whatInput keyboard detection', () => {
  test('should set data-whatinput to keyboard when pressing arrow keys after mouse click', async ({
    page,
  }) => {
    await page.goto('/uilib/components/autocomplete/demos')

    const input = page.locator('.dnb-autocomplete__input').first()

    await input.click()

    await expect(page.locator('html')).toHaveAttribute(
      'data-whatinput',
      'mouse'
    )

    await page.keyboard.press('ArrowDown')

    await expect(page.locator('html')).toHaveAttribute(
      'data-whatinput',
      'keyboard'
    )
  })
})
