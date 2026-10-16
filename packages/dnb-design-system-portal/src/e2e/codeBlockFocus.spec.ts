import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test('static code blocks show keyboard focus and scroll with arrow keys', async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/uilib/components/pagination/properties/')
  await waitForApp(page)

  const code = page
    .locator('pre[tabindex="0"]')
    .filter({ hasText: 'otherInternalMethods' })

  await code.locator('..').getByRole('button').press('Tab')
  await expect(code).toBeFocused()
  await expect(code).not.toHaveCSS('box-shadow', 'none')
  expect(
    await code.evaluate(
      (element) => element.scrollWidth > element.clientWidth
    )
  ).toBe(true)

  await code.press('ArrowRight')
  await expect
    .poll(() => code.evaluate((element) => element.scrollLeft))
    .toBeGreaterThan(0)

  await page.emulateMedia({ forcedColors: 'active' })
  await expect(code).toHaveCSS('outline-style', 'solid')
  await expect(code).not.toHaveCSS('outline-width', '0px')
})

test('live code editors show only the existing outer focus ring', async ({
  page,
}) => {
  await page.goto('/uilib/components/copy-on-click/demos/')
  await waitForApp(page)

  const editor = page.locator('.dnb-live-editor').first()
  const code = editor.locator('pre[contenteditable]')

  await page
    .getByRole('button', { name: 'Focus mode', exact: true })
    .first()
    .press('Tab')
  await expect(code).toBeFocused()
  await expect(editor).not.toHaveCSS('box-shadow', 'none')
  await expect(code).toHaveCSS('box-shadow', 'none')
})
