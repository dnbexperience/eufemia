import path from 'node:path'
import * as sass from 'sass'
import { expect, test, type Page } from '@playwright/test'

const css = sass.compile(
  path.resolve(__dirname, '../style/dnb-textarea.scss')
).css

const focusColor = 'rgb(0, 114, 114)'
const hoverColor = 'rgb(1, 2, 3)'

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
        --token-color-stroke-action-pressed: ${focusColor};
        --token-color-stroke-action-hover: ${hoverColor};
      }
      ${css}
    </style>
    <span class="dnb-textarea">
      <textarea class="dnb-textarea__textarea"></textarea>
      <span class="dnb-textarea__state"></span>
    </span>
  `)
})

// Moving the mouse sets the intent to mouse, while the last input stays
// keyboard. The focus border must stay visible under the pointer (#11104).
test('keeps the focus border when the mouse moves onto the focused textarea', async ({
  page,
}) => {
  const textarea = page.locator('textarea')
  const borderColor = () =>
    page
      .locator('.dnb-textarea__state')
      .evaluate((element) =>
        getComputedStyle(element).getPropertyValue(
          '--textarea-color-border'
        )
      )

  await page.keyboard.press('Tab')
  await setIntent(page, 'keyboard', 'keyboard')
  await expect(textarea).toBeFocused()
  await expect.poll(borderColor).toBe(focusColor)

  await textarea.hover()
  await setIntent(page, 'keyboard', 'mouse')
  await expect.poll(borderColor).toBe(focusColor)

  await test.step('shows the hover border when not focused', async () => {
    await textarea.blur()
    await expect.poll(borderColor).toBe(hoverColor)
  })
})
