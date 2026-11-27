import path from 'node:path'
import * as sass from 'sass'
import { expect, test, type Locator, type Page } from '@playwright/test'

const css = sass.compile(
  path.resolve(__dirname, '../style/dnb-dropdown.scss')
).css

const errorColor = 'rgb(213, 37, 37)'
const disabledColor = 'rgb(204, 204, 204)'

const setIntent = (page: Page, whatinput: string, whatintent: string) =>
  page.locator('html').evaluate(
    (element, { whatinput, whatintent }) => {
      element.dataset.whatinput = whatinput
      element.dataset.whatintent = whatintent
    },
    { whatinput, whatintent }
  )

const getBorder = (trigger: Locator) =>
  trigger.evaluate(
    (element) => window.getComputedStyle(element, '::before').boxShadow
  )

test.beforeEach(async ({ page }) => {
  await page.setContent(`
    <style>
      :root {
        --token-color-stroke-error: ${errorColor};
        --token-color-stroke-action-disabled: ${disabledColor};
      }
      ${css}
    </style>
    <span class="dnb-dropdown dnb-dropdown__status--error">
      <button class="dnb-button dnb-button--tertiary dnb-button__status--error dnb-dropdown__trigger" aria-expanded="false">
        Enabled
      </button>
    </span>
    <span class="dnb-dropdown dnb-dropdown__status--error">
      <button class="dnb-button dnb-button--tertiary dnb-button__status--error dnb-dropdown__trigger" disabled>
        Disabled
      </button>
    </span>
    <p>Outside</p>
  `)
})

// Touch browsers keep :hover on the trigger after a tap closes the list,
// so the thicker error border would stay visible.
test('tertiary error border thickens only on mouse hover', async ({
  page,
}) => {
  const trigger = page.getByRole('button', { name: 'Enabled' })
  await setIntent(page, 'mouse', 'mouse')

  await test.step('rest shows the thin error border', async () => {
    await expect
      .poll(() => getBorder(trigger))
      .toBe(`${errorColor} 0px 0px 0px 1px`)
  })

  await test.step('mouse hover shows the thick error border', async () => {
    await trigger.hover()
    await expect
      .poll(() => getBorder(trigger))
      .toBe(`${errorColor} 0px 0px 0px 2px`)
  })

  await test.step('touch intent keeps the thin error border', async () => {
    await setIntent(page, 'touch', 'touch')
    await expect
      .poll(() => getBorder(trigger))
      .toBe(`${errorColor} 0px 0px 0px 1px`)
  })

  await test.step('keyboard intent keeps the thin error border', async () => {
    await setIntent(page, 'keyboard', 'keyboard')
    await expect
      .poll(() => getBorder(trigger))
      .toBe(`${errorColor} 0px 0px 0px 1px`)
  })

  await test.step('disabled trigger keeps the thin border', async () => {
    await setIntent(page, 'mouse', 'mouse')
    const disabled = page.getByRole('button', { name: 'Disabled' })
    await disabled.hover()
    await expect
      .poll(() => getBorder(disabled))
      .toBe(`${disabledColor} 0px 0px 0px 1px`)
  })
})
