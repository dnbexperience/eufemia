import path from 'node:path'
import * as sass from 'sass'
import { expect, test, type Page } from '@playwright/test'

const css = sass.compile(
  path.resolve(__dirname, '../style/dnb-table.scss')
).css

const focusColor = 'rgb(0, 114, 114)'

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
      :root { --token-color-stroke-action-focus: ${focusColor}; }
      ${css}
    </style>
    <table class="dnb-table">
      <tbody>
        <tr class="dnb-table__tr dnb-table__tr--clickable" tabindex="0">
          <td class="dnb-table__td">Cell</td>
          <td class="dnb-table__td">Cell</td>
        </tr>
      </tbody>
    </table>
  `)
})

// Moving the mouse sets the intent to mouse, while the last input stays
// keyboard. The focus border must stay visible under the pointer (#11104).
test('keeps the keyboard focus border when the mouse moves onto a clickable row', async ({
  page,
}) => {
  const row = page.locator('.dnb-table__tr--clickable')
  const borderColor = () =>
    row
      .locator('td')
      .first()
      .evaluate((cell) =>
        getComputedStyle(cell, '::before').getPropertyValue(
          '--border-color'
        )
      )

  await page.keyboard.press('Tab')
  await setIntent(page, 'keyboard', 'keyboard')
  await expect(row).toBeFocused()
  await expect.poll(borderColor).toBe(focusColor)

  await row.hover()
  await setIntent(page, 'keyboard', 'mouse')
  await expect.poll(borderColor).toBe(focusColor)
})
