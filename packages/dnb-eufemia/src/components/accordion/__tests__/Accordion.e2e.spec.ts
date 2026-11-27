import path from 'node:path'
import * as sass from 'sass'
import { expect, test, type Page } from '@playwright/test'

const css = sass.compile(
  path.resolve(__dirname, '../style/dnb-accordion.scss')
).css

const setIntent = (page: Page, whatinput: string, whatintent: string) =>
  page.locator('html').evaluate(
    (element, { whatinput, whatintent }) => {
      element.dataset.whatinput = whatinput
      element.dataset.whatintent = whatintent
    },
    { whatinput, whatintent }
  )

test.beforeEach(async ({ page }) => {
  await page.setContent(`
    <style>
      :root {
        --token-color-stroke-action-focus: rgb(0, 114, 114);
        --focus-outline-width: 0.1875rem;
        --focus-outline-offset: 0.125rem;
      }
      ${css}
    </style>
    <div class="dnb-accordion">
      <div class="dnb-accordion__header" role="button" tabindex="0">
        Header
      </div>
    </div>
  `)
})

// Moving the mouse sets the intent to mouse, while the last input stays
// keyboard. The focus outline must stay visible under the pointer (#11104).
test('keeps the keyboard focus outline when the mouse moves onto the focused header', async ({
  page,
}) => {
  const header = page.locator('.dnb-accordion__header')

  await page.keyboard.press('Tab')
  await setIntent(page, 'keyboard', 'keyboard')
  await expect(header).toBeFocused()
  await expect(header).toHaveCSS('outline-style', 'solid')

  await header.hover()
  await setIntent(page, 'keyboard', 'mouse')
  await expect(header).toHaveCSS('outline-style', 'solid')
})
