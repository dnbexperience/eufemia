import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test.beforeEach(async ({ page }) => {
  await page.goto('/uilib/extensions/ai/Actions/demos/')
  await waitForApp(page)
})

test('matches the Figma action sizes and controlled feedback states', async ({
  page,
}) => {
  const actions = page.locator(
    '[data-visual-test="ai-message-actions"] .dnb-ai-actions'
  )
  const buttons = actions.getByRole('button')
  const positive = actions.getByRole('button', {
    name: 'Good answer',
    exact: true,
  })
  const negative = actions.getByRole('button', {
    name: 'Bad answer',
    exact: true,
  })

  await expect(actions).toHaveCSS('gap', '6px')
  await expect(buttons).toHaveCount(3)
  for (const button of await buttons.all()) {
    await expect(button).toHaveCSS('width', '24px')
    await expect(button).toHaveCSS('height', '24px')
    await expect(button.locator('.dnb-icon')).toHaveCSS('width', '16px')
    await expect(button.locator('.dnb-button__bounding')).toHaveCount(1)
  }

  await expect(positive).toHaveAttribute('aria-pressed', 'false')
  await expect(negative).toHaveAttribute('aria-pressed', 'false')
  const neutral = await positive
    .locator('.dnb-icon')
    .evaluate((element) => getComputedStyle(element).color)
  const box = await positive.boundingBox()

  await positive.focus()
  await positive.press('Space')
  await expect(positive).toHaveAttribute('aria-pressed', 'true')
  await expect(positive).toHaveClass(/dnb-button--selected/)
  await expect(positive).toBeFocused()
  await expect(negative).toHaveAttribute('aria-pressed', 'false')

  await negative.focus()
  await negative.press('Enter')
  await expect(negative).toHaveAttribute('aria-pressed', 'true')
  await expect(negative).toBeFocused()
  await expect(positive).toHaveAttribute('aria-pressed', 'false')
  await expect(negative).toHaveAccessibleName('Bad answer')

  // Inspect the selected appearance outside hover and focus.
  await page.locator('h1').click()
  const selected = await negative.evaluate((element) => {
    const style = getComputedStyle(element)
    return {
      icon: getComputedStyle(element.querySelector('.dnb-icon')).color,
      background: style
        .getPropertyValue('--button-color-bg--default')
        .trim(),
      expectedBackground: style
        .getPropertyValue('--token-color-background-selected-subtle')
        .trim(),
      border: style
        .getPropertyValue('--button-color-border--default')
        .trim(),
      expectedBorder: style
        .getPropertyValue('--token-color-stroke-selected')
        .trim(),
    }
  })

  expect(selected.icon).not.toBe(neutral)
  expect(selected.background).toBe(selected.expectedBackground)
  expect(selected.border).toBe(selected.expectedBorder)
  const after = await positive.boundingBox()
  expect(after.width).toBe(box.width)
  expect(after.height).toBe(box.height)

  await negative.click()
  await expect(negative).toHaveAttribute('aria-pressed', 'false')
  await expect(positive).toHaveAttribute('aria-pressed', 'false')
})

test('uses the copy button tooltip and clipboard behavior', async ({
  page,
}) => {
  await page.evaluate(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: async (text: string) => {
          document.documentElement.setAttribute('data-copied-answer', text)
        },
      },
    })
  })

  const copy = page
    .locator('[data-visual-test="ai-message-actions"]')
    .getByRole('button', { name: 'Copy answer', exact: true })
  await copy.focus()
  await expect(
    page.getByRole('tooltip').filter({ hasText: 'Copy answer' })
  ).toBeVisible()
  await copy.press('Enter')

  await expect(page.locator('html')).toHaveAttribute(
    'data-copied-answer',
    'Your card is now blocked.'
  )
  await expect(
    page.getByRole('tooltip').filter({ hasText: 'Kopiert' })
  ).toBeVisible()
})

test('shows feedback selection while retaining keyboard focus', async ({
  page,
}) => {
  const positive = page
    .locator('[data-visual-test="ai-message-actions"]')
    .getByRole('button', { name: 'Good answer', exact: true })

  await positive.focus()
  const background = await positive.evaluate(
    (element) => getComputedStyle(element).backgroundColor
  )
  const focusRing = await positive.evaluate(
    (element) => getComputedStyle(element, ':before').boxShadow
  )
  expect(focusRing).not.toBe('none')
  const icon = await positive
    .locator('.dnb-icon')
    .evaluate((element) => getComputedStyle(element).color)

  await positive.press('Space')
  await expect(positive).toBeFocused()
  await expect(positive).toHaveAttribute('aria-pressed', 'true')
  await expect(positive).not.toHaveCSS('background-color', background)
  await expect(positive.locator('.dnb-icon')).not.toHaveCSS('color', icon)
  expect(
    await positive.evaluate(
      (element) => getComputedStyle(element, ':before').boxShadow
    )
  ).toBe(focusRing)

  await positive.press('Enter')
  await expect(positive).toBeFocused()
  await expect(positive).toHaveAttribute('aria-pressed', 'false')
  await expect(positive).toHaveCSS('background-color', background)
})
