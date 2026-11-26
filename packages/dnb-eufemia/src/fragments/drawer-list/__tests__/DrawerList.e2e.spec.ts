import path from 'node:path'
import * as sass from 'sass'
import { expect, test, type Page } from '@playwright/test'

const css = sass.compile(
  path.resolve(__dirname, '../style/dnb-drawer-list.scss')
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
        --token-color-stroke-action-focus: rgb(39, 106, 206);
        --focus-outline-width: 0.1875rem;
      }
      ${css}
    </style>
    <span class="dnb-drawer-list">
      <ul class="dnb-drawer-list__options">
        <li class="dnb-drawer-list__option">
          <span class="dnb-drawer-list__option__inner">First</span>
        </li>
        <li class="dnb-drawer-list__option dnb-drawer-list__option--focus">
          <span class="dnb-drawer-list__option__inner">Second</span>
        </li>
      </ul>
    </span>
  `)
})

// Arrow keys can move focus to the option under the mouse. That option keeps
// :hover, and the hover style is off while the intent is keyboard.
test('shows the focus outline on the option under the mouse', async ({
  page,
}) => {
  const option = page.locator('.dnb-drawer-list__option--focus')
  await option.hover()

  await test.step('keyboard intent shows the outline', async () => {
    await setIntent(page, 'keyboard', 'keyboard')
    await expect(option).toHaveCSS('outline-style', 'solid')
  })

  await test.step('mouse navigation shows no outline', async () => {
    await setIntent(page, 'mouse', 'mouse')
    await expect(option).toHaveCSS('outline-style', 'none')
  })
})
