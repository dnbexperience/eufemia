import { test, expect } from '@playwright/test'
import type { Locator, Page } from '@playwright/test'

for (const theme of ['ui', 'sbanken', 'eiendom', 'carnegie']) {
  for (const variant of ['primary', 'secondary', 'tertiary']) {
    test(`keeps ${variant} keyboard focus styles while hovered in ${theme}`, async ({
      page,
    }) => {
      await page.goto(
        `/uilib/components/button/demos/?data-visual-test&eufemia-theme=${theme}`
      )
      const button = page.locator(
        `button[data-visual-test="button-${variant}"]`
      )
      await expect(button).toBeVisible()
      await page.keyboard.press('Tab')
      await button.focus()

      const focusOutline = () =>
        button.evaluate(
          (element, pseudo) => {
            const style = getComputedStyle(element, pseudo)
            return {
              style: style.outlineStyle,
              width: style.outlineWidth,
              offset: style.outlineOffset,
            }
          },
          variant === 'tertiary' ? '::before' : null
        )

      expect(await focusOutline()).toEqual({
        style: 'solid',
        width: '3px',
        offset: '2px',
      })

      await button.hover()
      await page.keyboard.press('Shift')

      await expect(button).toBeFocused()
      expect(
        await button.evaluate((element) =>
          element.matches(':focus-visible')
        )
      ).toBe(true)
      expect(
        await button.evaluate((element) => element.matches(':hover'))
      ).toBe(true)

      expect(await focusOutline()).toEqual({
        style: 'solid',
        width: '3px',
        offset: '2px',
      })
    })
  }
}

// Touch browsers keep :hover on the last tapped element. The hover styles
// must not come back when the user presses a key after a tap.
async function readTouchStyles(element: Locator) {
  return element.evaluate(async (node) => {
    await Promise.all(
      node
        .getAnimations({ subtree: true })
        .map((animation) => animation.finished.catch(() => {}))
    )
    const style = getComputedStyle(node)
    const after = getComputedStyle(node, '::after')
    const before = getComputedStyle(node, '::before')
    const text = node.querySelector(
      '.dnb-button__text, .dnb-tabs__button__title'
    )

    return {
      color: style.color,
      background: style.backgroundColor,
      border: style.boxShadow,
      after: after.backgroundColor + ' ' + after.opacity,
      outline: `${before.outlineStyle} ${before.outlineWidth} ${before.outlineColor}`,
      text: text
        ? `${getComputedStyle(text).color} ${getComputedStyle(text).textDecorationColor}`
        : null,
    }
  })
}

async function expectNoHoverStyleAfterTapAndKeyPress(
  page: Page,
  element: Locator
) {
  await element.tap()
  await element.blur()
  await page.keyboard.press('a')
  await expect(page.locator('html')).toHaveAttribute(
    'data-whatintent',
    'keyboard'
  )
  expect(await element.evaluate((node) => node.matches(':hover'))).toBe(
    true
  )
  const tapped = await readTouchStyles(element)

  // Move the hover away to get the same state without hover
  await page.mouse.move(0, 0)
  expect(await element.evaluate((node) => node.matches(':hover'))).toBe(
    false
  )
  expect(tapped).toEqual(await readTouchStyles(element))
}

test.describe('Button on touch devices', () => {
  test.use({ hasTouch: true })

  for (const variant of ['primary', 'secondary', 'tertiary']) {
    test(`does not show the ${variant} hover style after a tap and a key press`, async ({
      page,
    }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.goto('/web/components/button/demos/?data-visual-test')

      await expectNoHoverStyleAfterTapAndKeyPress(
        page,
        page.locator(`button[data-visual-test="button-${variant}"]`)
      )
    })
  }
})
