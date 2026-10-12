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
      // Synthetic paste does not establish the native editor selection.
      // Firefox's Select All can otherwise leave a document-wide range.
      const range = document.createRange()
      const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT
      )
      const first = walker.nextNode()
      let last = first
      while (walker.nextNode()) {
        last = walker.currentNode
      }
      if (!first || !last) {
        throw new Error('Paste requires editor text')
      }
      range.setStart(first, 0)
      range.setEnd(last, last.textContent?.length ?? 0)
      const selection = window.getSelection()
      if (!selection) {
        throw new Error('Paste requires an editor selection')
      }
      selection.removeAllRanges()
      selection.addRange(range)
      element.dispatchEvent(new Event('selectstart', { bubbles: true }))
      const paste = new ClipboardEvent('paste', {
        bubbles: true,
        cancelable: true,
      })
      // Firefox can discard data from a constructed DataTransfer. Supply the
      // read-only clipboard payload consumed by the editor's paste handler.
      Object.defineProperty(paste, 'clipboardData', {
        value: {
          getData: (format: string) =>
            format === 'text/plain'
              ? '<Button text="Adapter paste" />'
              : '',
        },
      })
      if (
        paste.clipboardData?.getData('text/plain') !==
        '<Button text="Adapter paste" />'
      ) {
        throw new Error('Paste event is missing the test clipboard text')
      }
      element.dispatchEvent(paste)
    })
  }
  const pasteState = await editor.evaluate((element) => ({
    code: element.textContent,
    selection: window.getSelection()?.toString(),
    focused: document.activeElement === element,
  }))
  expect(errors, 'Paste must not throw a runtime error').toEqual([])
  await expect(preview, JSON.stringify(pasteState)).toHaveText(
    'Adapter paste'
  )
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
