import path from 'node:path'
import * as sass from 'sass'
import { expect, test, type Page } from '@playwright/test'

const css = sass.compile(
  path.resolve(__dirname, '../style/dnb-menu.scss')
).css

const hoverBackground = 'rgb(248, 248, 248)'

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
        --token-color-background-neutral-subtle: ${hoverBackground};
        --token-color-stroke-action-focus: rgb(0, 114, 114);
        --focus-outline-width: 0.125rem;
      }
      ${css}
    </style>
    <div class="dnb-menu">
      <button class="dnb-menu__action">
        <span class="dnb-menu__action__text">Action</span>
      </button>
    </div>
  `)
})

// Touch browsers keep :hover on the last tapped action, for example an
// accordion trigger that stays visible after it closes.
test('keeps hover styles off and the focus outline on after a tap', async ({
  page,
}) => {
  const action = page.locator('.dnb-menu__action')
  await action.hover()

  await test.step('touch intent shows no hover background', async () => {
    await setIntent(page, 'touch', 'touch')
    await expect(action).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
  })

  await test.step('mouse intent shows the hover background', async () => {
    await setIntent(page, 'mouse', 'mouse')
    await expect(action).toHaveCSS('background-color', hoverBackground)
  })

  await test.step('keyboard focus shows the outline while hovered', async () => {
    await action.focus()
    await setIntent(page, 'keyboard', 'keyboard')
    await expect(action).toHaveCSS('outline-style', 'solid')
    await expect(action).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
  })
})

// Moving the mouse sets the intent to mouse, while the last input stays
// keyboard. The focus outline must stay visible under the pointer (#11104).
test('keeps the keyboard focus outline when the mouse moves onto the focused action', async ({
  page,
}) => {
  const action = page.locator('.dnb-menu__action')

  await action.focus()
  await setIntent(page, 'keyboard', 'keyboard')
  await expect(action).toHaveCSS('outline-style', 'solid')

  await action.hover()
  await setIntent(page, 'keyboard', 'mouse')
  await expect(action).toHaveCSS('outline-style', 'solid')
})
