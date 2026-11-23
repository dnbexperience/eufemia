import { test, expect } from '@playwright/test'

for (const direction of ['ltr', 'rtl']) {
  test(`supports one tab stop and explicit activation in ${direction}`, async ({
    page,
  }) => {
    await page.goto(
      '/web/components/scroll-indicator/demos/?data-visual-test'
    )
    const example = page.locator(
      '[data-visual-test="scroll-indicator-gallery"]'
    )
    const toolbar = example.getByRole('toolbar', { name: 'Gallery' })
    const buttons = toolbar.getByRole('button')
    const image = example.locator('img')
    await expect(buttons).toHaveCount(3)
    await toolbar.evaluate((element, dir) => {
      element.setAttribute('dir', dir)
    }, direction)
    await buttons.first().focus()
    await page.keyboard.press(
      direction === 'ltr' ? 'ArrowRight' : 'ArrowLeft'
    )
    await expect(buttons.nth(1)).toBeFocused()
    await expect(image).toHaveAttribute(
      'alt',
      'First contributor portrait'
    )
    await page.keyboard.press('Enter')
    await expect(image).toHaveAttribute(
      'alt',
      'Second contributor portrait'
    )
    await expect(buttons.nth(1)).toBeFocused()
    await page.keyboard.press('End')
    await expect(buttons.last()).toBeFocused()
    await page.keyboard.press('Space')
    await expect(image).toHaveAttribute(
      'alt',
      'Third contributor portrait'
    )
    await expect(buttons.last()).toBeFocused()
    await page.keyboard.press('Tab')
    await expect(buttons.last()).not.toBeFocused()
    await page.keyboard.press('Shift+Tab')
    await expect(buttons.last()).toBeFocused()
    await page.keyboard.press('Home')
    await expect(buttons.first()).toBeFocused()
    await expect(toolbar.locator('button[tabindex="0"]')).toHaveCount(1)
  })
}
