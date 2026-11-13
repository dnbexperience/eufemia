import { expect, test } from '@playwright/test'
import type { Locator } from '@playwright/test'

// A click during the open animation is retried with a smooth scroll and can miss
function waitForOpenAnimation(content: Locator) {
  return content.evaluate(async (element) => {
    const animations =
      element.closest('.dnb-popover')?.getAnimations() ?? []
    await Promise.all(animations.map((animation) => animation.finished))
  })
}

test('constrains the optional minimum height to available space above and below', async ({
  page,
}) => {
  await page.setViewportSize({ width: 900, height: 800 })
  await page.goto('/web/components/popover/demos/#minimum-height')
  await expect(page.locator('html')).toHaveAttribute(
    'data-portal-ready',
    'true'
  )
  const trigger = page
    .locator('[data-visual-test="popover-minimum-height"]')
    .getByRole('button', { name: 'Open with minimum height' })
  const popover = page.locator('.dnb-popover--active')

  for (const [top, placement] of [
    [24, 'bottom'],
    [730, 'top'],
  ] as const) {
    await trigger.evaluate((element: HTMLElement, top) => {
      Object.assign(element.style, {
        position: 'fixed',
        top: `${top}px`,
        left: '400px',
        zIndex: '100',
      })
    }, top)
    await trigger.focus()
    await trigger.press('Enter')
    await expect(
      popover.locator(`.dnb-popover__arrow__placement--${placement}`)
    ).toBeVisible()
    await expect
      .poll(async () => (await popover.boundingBox()).height)
      .toBeCloseTo(256, 0)
    await popover.press('Escape')
    await expect(popover).toHaveCount(0)
  }

  await trigger.evaluate((element: HTMLElement) => {
    element.style.top = '24px'
  })
  await trigger.focus()
  await trigger.press('Enter')
  await page.setViewportSize({ width: 900, height: 260 })
  await expect
    .poll(async () => {
      const box = await popover.boundingBox()
      return box.height < 256 && box.y >= 15 && box.y + box.height <= 245
    })
    .toBe(true)
})

test.describe('Popover focus restoration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/web/components/popover/demos/#controlled-state')
    await expect(page.locator('html')).toHaveAttribute(
      'data-portal-ready',
      'true'
    )
  })

  const closeMethods: Array<
    [string, (content: Locator) => Promise<void>]
  > = [
    [
      'controlled closing',
      (content) => content.getByRole('button', { name: 'Done' }).click(),
    ],
    ['Escape', (content) => content.press('Escape')],
  ]

  for (const [method, close] of closeMethods) {
    test(`returns focus to the opener after ${method}`, async ({
      page,
    }) => {
      const example = page.locator(
        '[data-visual-test="popover-controlled"]'
      )
      const trigger = example.getByRole('button', {
        name: 'Open controlled popover',
      })
      const content = page.locator('#controlled-popover-content')

      await trigger.focus()
      await trigger.press('Enter')
      await expect(content).toBeFocused()
      await waitForOpenAnimation(content)
      await close(content)

      await expect(content).toBeHidden()
      await expect(trigger).toBeFocused()
    })
  }

  test('preserves focus when clicking another action outside', async ({
    page,
  }) => {
    const example = page.locator('[data-visual-test="popover-controlled"]')
    const trigger = example.getByRole('button', {
      name: 'Open controlled popover',
    })
    const outside = example.getByRole('button', { name: 'Another action' })
    const content = page.locator('#controlled-popover-content')

    await outside.evaluate((element) => {
      element.style.marginBottom = '16rem'
    })
    await trigger.focus()
    await trigger.press('Enter')
    await expect(content).toBeFocused()
    await waitForOpenAnimation(content)
    await outside.click()

    await expect(content).toBeHidden()
    await expect(outside).toBeFocused()
    await expect(trigger).not.toBeFocused()
  })
})
