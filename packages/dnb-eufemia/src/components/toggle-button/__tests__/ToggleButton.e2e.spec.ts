import { expect, test } from '@playwright/test'
import type { Locator, Page } from '@playwright/test'

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

test.describe('ToggleButton on touch devices', () => {
  test.use({ hasTouch: true })

  test('does not show the hover style after a tap and a key press', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto(
      '/web/components/toggle-button/demos/?data-visual-test'
    )

    await expectNoHoverStyleAfterTapAndKeyPress(
      page,
      page
        .locator(
          '[data-visual-test="toggle-button-default"] .dnb-toggle-button__button'
        )
        .first()
    )
  })
})
