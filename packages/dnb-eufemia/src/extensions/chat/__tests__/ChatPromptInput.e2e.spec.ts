import path from 'node:path'
import * as sass from 'sass'
import { expect, test, type Page } from '@playwright/test'

const css = sass.compile(
  path.resolve(__dirname, '../style/dnb-chat.scss')
).css

const restBorder = 'rgb(235, 235, 235)'
const hoverBorder = 'rgb(0, 114, 114)'

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
        --token-color-stroke-neutral-subtle: ${restBorder};
        --token-color-stroke-action-hover: ${hoverBorder};
      }
      ${css}
    </style>
    <form class="dnb-ai-prompt-input dnb-ai-prompt-input--default" style="width: 20rem; height: 6rem"></form>
  `)
})

const borderColor = (page: Page) =>
  page.locator('.dnb-ai-prompt-input').evaluate((element) => {
    return getComputedStyle(element)
      .getPropertyValue('--border-color')
      .trim()
  })

// Typing sets the input to keyboard, while a touch user keeps touch intent.
// The tapped prompt keeps :hover after the keyboard is closed.
test('keeps the hover border off after typing on a touch device', async ({
  page,
}) => {
  await page.locator('.dnb-ai-prompt-input').hover()

  await test.step('typing after a tap shows no hover border', async () => {
    await setIntent(page, 'keyboard', 'touch')
    await expect.poll(() => borderColor(page)).not.toBe(hoverBorder)
  })

  await test.step('keyboard intent shows no hover border', async () => {
    await setIntent(page, 'keyboard', 'keyboard')
    await expect.poll(() => borderColor(page)).not.toBe(hoverBorder)
  })

  await test.step('mouse intent shows the hover border', async () => {
    await setIntent(page, 'mouse', 'mouse')
    await expect.poll(() => borderColor(page)).toBe(hoverBorder)
  })
})
