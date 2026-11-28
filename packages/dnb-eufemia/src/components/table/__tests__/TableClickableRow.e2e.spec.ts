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
      :root {
        --token-color-stroke-action-focus: ${focusColor};
        --focus-outline-width: 3px;
      }
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

// After Enter or a click, an expanded row under the mouse gets the
// dnb-table__tr--hover class. Its hover rule must not remove the focus border.
test('keeps the keyboard focus border on an expanded row with the hover class', async ({
  page,
}) => {
  const row = page.locator('.dnb-table__tr--clickable')
  await row.evaluate((element) => {
    element.classList.add(
      'dnb-table__tr--expanded',
      'dnb-table__tr--hover'
    )
  })
  const paintedBorder = () =>
    row
      .locator('td')
      .first()
      .evaluate((cell) => {
        const style = getComputedStyle(cell, '::before')
        return `${style.borderLeftWidth} ${style.borderLeftColor}`
      })

  await page.keyboard.press('Tab')
  await setIntent(page, 'keyboard', 'keyboard')
  await expect(row).toBeFocused()
  await expect.poll(paintedBorder).toBe(`3px ${focusColor}`)

  await row.hover()
  await setIntent(page, 'keyboard', 'mouse')
  await expect.poll(paintedBorder).toBe(`3px ${focusColor}`)
})
