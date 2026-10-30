import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test('Intro shortcuts leave focused code blocks on the current page', async ({
  page,
  browserName,
}) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/uilib/intro/07-typography/')
  await waitForApp(page)

  const code = page.locator('pre[tabindex="0"]').first()
  expect(
    await code.evaluate(
      (element) => element.scrollWidth > element.clientWidth
    )
  ).toBe(true)
  await code.locator('..').getByRole('button').press('Tab')
  await expect(code).toBeFocused()

  await code.press('ArrowRight')
  await expect(page).toHaveURL(/\/uilib\/intro\/07-typography\/?$/)
  await expect(code).toBeFocused()
  // WebKit does not scroll a focused pre with ArrowRight by default.
  if (browserName !== 'webkit') {
    await expect
      .poll(() => code.evaluate((element) => element.scrollLeft))
      .toBeGreaterThan(0)
  }

  await code.press('ArrowLeft')
  await expect(page).toHaveURL(/\/uilib\/intro\/07-typography\/?$/)
  await expect(code).toBeFocused()

  await code.evaluate((element) => element.blur())
  await expect(page.locator('body')).toBeFocused()
  await page.keyboard.press('ArrowRight')
  await expect(page).toHaveURL(/\/uilib\/intro\/08-color-usage\/?$/)
  await expect(page.locator('pre').first()).toContainText(
    '--color-ocean-green'
  )
  await page.evaluate(() => {
    ;(document.activeElement as HTMLElement).blur()
  })
  await expect(page.locator('body')).toBeFocused()
  await page.keyboard.press('ArrowLeft')
  await expect(page).toHaveURL(/\/uilib\/intro\/07-typography\/?$/)
})
