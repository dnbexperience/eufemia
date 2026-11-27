import path from 'node:path'
import * as sass from 'sass'
import { expect, test, type Page } from '@playwright/test'

const css = sass.compile(
  path.resolve(__dirname, '../style/dnb-table.scss')
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
        --token-color-stroke-action-focus: ${focusColor};
        --token-color-stroke-selected: ${hoverColor};
      }
      ${css}
    </style>
    <table class="dnb-table">
      <tbody>
        <tr class="dnb-table__tr">
          <td class="dnb-table__td dnb-table__td--clickable">
            <button type="button" class="dnb-table__td__button" id="plain">Cell</button>
          </td>
          <td class="dnb-table__td dnb-table__td--clickable dnb-table__td--selected">
            <button type="button" class="dnb-table__td__button" id="selected" aria-pressed="true">Cell</button>
          </td>
        </tr>
      </tbody>
    </table>
  `)
})

const borderColor = (page: Page, id: string) => () =>
  page
    .locator(`#${id}`)
    .evaluate((button) =>
      getComputedStyle(button, '::before').getPropertyValue(
        '--border-color'
      )
    )

// Moving the mouse sets the intent to mouse, while the last input stays
// keyboard. The focus border must stay visible under the pointer (#11104).
// Reach each cell with a real key press from its neighbour
for (const { id, from, key } of [
  { id: 'plain', from: 'selected', key: 'Shift+Tab' },
  { id: 'selected', from: 'plain', key: 'Tab' },
]) {
  test(`keeps the keyboard focus border when the mouse moves onto a focused ${id} cell`, async ({
    page,
  }) => {
    const button = page.locator(`#${id}`)

    await page.locator(`#${from}`).focus()
    await page.keyboard.press(key)
    await setIntent(page, 'keyboard', 'keyboard')
    await expect(button).toBeFocused()
    await expect.poll(borderColor(page, id)).toBe(focusColor)

    await button.hover()
    await setIntent(page, 'keyboard', 'mouse')
    await expect.poll(borderColor(page, id)).toBe(focusColor)
  })
}

// The hover border must still show on a cell without focus.
test('shows the hover border on a hovered cell without focus', async ({
  page,
}) => {
  await setIntent(page, 'mouse', 'mouse')
  await page.locator('#plain').hover()

  await expect.poll(borderColor(page, 'plain')).toBe(hoverColor)
})
