import path from 'node:path'
import * as sass from 'sass'
import { expect, test } from '@playwright/test'

const css = sass.compile(
  path.resolve(__dirname, '../style/dnb-multi-selection.scss')
).css

const hoverColor = 'rgb(0, 114, 114)'
const focusColor = 'rgb(39, 106, 206)'

test.beforeEach(async ({ page }) => {
  await page.setContent(`
    <style>
      :root {
        --token-color-stroke-action: ${hoverColor};
        --token-color-stroke-action-focus: ${focusColor};
        --focus-outline-width: 0.1875rem;
      }
      ${css}
    </style>
    <div class="dnb-forms-field-multi-selection__popover-content">
      <ul>
        <li class="dnb-forms-field-multi-selection__item" id="first">
          <input type="checkbox" class="dnb-checkbox__input" />
        </li>
        <li class="dnb-forms-field-multi-selection__item" id="second">
          <input type="checkbox" class="dnb-checkbox__input" />
        </li>
      </ul>
    </div>
  `)
})

// After a checkbox click, the intent stays "mouse" while arrow keys move
// focus, so the row under the resting mouse needs its own signal.
test('shows the focus outline on a row that arrow keys focus under the mouse', async ({
  page,
}) => {
  const content = page.locator(
    '.dnb-forms-field-multi-selection__popover-content'
  )
  const first = page.locator('#first')
  const second = page.locator('#second')
  const outline = (row: typeof first) =>
    row.evaluate((element) => {
      const { borderTopColor, borderTopWidth } = getComputedStyle(
        element,
        '::after'
      )
      return `${borderTopWidth} ${borderTopColor}`
    })

  await second.hover()
  await page.locator('html').evaluate((element) => {
    element.dataset.whatinput = 'keyboard'
    element.dataset.whatintent = 'mouse'
  })
  await second.locator('input').focus()

  await test.step('mouse intent shows the hover outline', async () => {
    expect(await outline(second)).toBe(`2px ${hoverColor}`)
  })

  await test.step('arrow navigation shows the focus outline', async () => {
    await content.evaluate((element) =>
      element.setAttribute('data-arrow-navigation', '')
    )
    expect(await outline(second)).toBe(`3px ${focusColor}`)
  })

  await test.step('arrow navigation hides hover on other rows', async () => {
    await first.locator('input').focus()
    await second.hover()
    expect(await outline(second)).toBe('1px rgba(0, 0, 0, 0)')
    expect(await outline(first)).toBe(`3px ${focusColor}`)
  })
})
