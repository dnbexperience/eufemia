import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'

const route = '/uilib/components/button/demos/#primary-button'

test('renders a scoped Eufemia preview without JavaScript', async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false })
  try {
    const page = await context.newPage()
    await page.goto(new URL(route, baseURL).toString())
    await expect(
      page.locator('#ButtonPrimary .dnb-live-preview button')
    ).toHaveText('Primary button with text only')
    await expect(
      page.locator('#ButtonPrimary .dnb-live-preview button')
    ).toHaveCSS('font-family', /DNB/)
  } finally {
    await context.close()
  }
})

test('hydrates, edits, pastes, and restores code through upstream LiveEditor', async ({
  page,
  browserName,
}) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto(route)
  await waitForApp(page)

  const editor = page.locator('#ButtonPrimary .dnb-live-editor pre')
  const preview = page.locator('#ButtonPrimary .dnb-live-preview button')
  await expect(preview).toHaveText('Primary button with text only')
  await expect(preview).toHaveCSS('font-family', /DNB/)
  const original = await editor.textContent()

  await editor.click()
  await page.keyboard.press('ControlOrMeta+A')
  await page.keyboard.type('<Button text="Adapter edit" />')
  await expect(preview).toHaveText('Adapter edit')
  await expect(editor).toBeFocused()

  await page.keyboard.press('ControlOrMeta+A')
  if (browserName === 'chromium') {
    await page
      .context()
      .grantPermissions(['clipboard-read', 'clipboard-write'])
    await page.evaluate(() =>
      navigator.clipboard.writeText('<Button text="Adapter paste" />')
    )
    await page.keyboard.press('ControlOrMeta+V')
  } else {
    // Firefox does not expose clipboard permission overrides in Playwright.
    await editor.evaluate((element) => {
      const clipboardData = new DataTransfer()
      clipboardData.setData(
        'text/plain',
        '<Button text="Adapter paste" />'
      )
      element.dispatchEvent(
        new ClipboardEvent('paste', { clipboardData, bubbles: true })
      )
    })
  }
  await expect(preview).toHaveText('Adapter paste')
  await expect(editor).toBeFocused()

  await page.keyboard.press('ControlOrMeta+Z')
  await expect(preview).toHaveText('Adapter edit')
  await page.keyboard.press('ControlOrMeta+Shift+Z')
  await expect(preview).toHaveText('Adapter paste')

  await editor.press('End')
  await page.keyboard.press('Enter')
  await page.keyboard.type('// cursor stays on the new line')
  await expect(editor).toContainText('// cursor stays on the new line')
  await expect(preview).toHaveText('Adapter paste')

  await editor.press('ControlOrMeta+A')
  await page.keyboard.type(original ?? '')
  await expect(preview).toHaveText('Primary button with text only')
  await expect(
    page.locator('#ButtonPrimary .dnb-form-status--error')
  ).toHaveCount(0)
  expect(errors).toEqual([])
})
