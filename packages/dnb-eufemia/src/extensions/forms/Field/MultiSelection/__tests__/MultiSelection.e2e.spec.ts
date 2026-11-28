import path from 'node:path'
import * as sass from 'sass'
import { expect, test, type Page } from '@playwright/test'

const css = sass.compile(
  path.resolve(__dirname, '../style/dnb-multi-selection.scss')
).css
const focusColor = 'rgb(39, 106, 206)'

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
        --token-color-stroke-action: rgb(0, 114, 114);
        --focus-outline-width: 0.1875rem;
      }
      ${css}
    </style>
    <ul>
      <li class="dnb-forms-field-multi-selection__item">
        <span class="dnb-checkbox">
          <label>
            <input type="checkbox" class="dnb-checkbox__input" />
            Option
          </label>
        </span>
      </li>
    </ul>
  `)
})

// Moving the mouse sets the intent to mouse, while the last input stays
// keyboard. The focus outline must stay visible under the pointer.
test('keeps the keyboard focus outline when the mouse moves onto the focused row', async ({
  page,
}) => {
  const row = page.locator('.dnb-forms-field-multi-selection__item')
  const outlineColor = () =>
    row.evaluate((element) =>
      getComputedStyle(element).getPropertyValue('--item-outline-color')
    )

  await page.keyboard.press('Tab')
  await setIntent(page, 'keyboard', 'keyboard')
  await expect(page.locator('.dnb-checkbox__input')).toBeFocused()
  await expect.poll(outlineColor).toBe(focusColor)

  await row.hover()
  await setIntent(page, 'keyboard', 'mouse')
  await expect.poll(outlineColor).toBe(focusColor)
})
