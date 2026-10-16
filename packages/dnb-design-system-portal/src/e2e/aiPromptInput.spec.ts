import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test.describe('Ai.PromptInput interaction styles', () => {
  for (const demo of ['compact', 'inline', 'busy']) {
    test(`keeps the ${demo} prompt height when typing starts`, async ({
      page,
    }) => {
      const form = page.locator(
        `[data-visual-test="ai-prompt-input-${demo}"] .dnb-ai-prompt-input`
      )
      const textarea = form.locator('textarea')
      const height = () =>
        form.evaluate((element) => element.getBoundingClientRect().height)
      await textarea.focus()
      const emptyHeight = await height()

      await textarea.fill('H')
      await expect(
        form.locator('.dnb-ai-prompt-input__submit')
      ).toBeVisible()
      await expect.poll(height).toBe(emptyHeight)

      await textarea.fill('Hello')
      await expect.poll(height).toBe(emptyHeight)

      await textarea.fill(' ')
      await expect(
        form.locator('.dnb-ai-prompt-input__submit')
      ).toHaveCount(0)
      await expect.poll(height).toBe(emptyHeight)

      await textarea.fill('Hello\nWorld')
      await expect.poll(height).toBeGreaterThan(emptyHeight)

      await textarea.fill('')
      await expect(
        form.locator('.dnb-ai-prompt-input__submit')
      ).toHaveCount(0)
      await expect.poll(height).toBe(emptyHeight)
    })
  }

  test('returns keyboard focus to the compact input after Stop disappears', async ({
    page,
  }) => {
    const stopDemo = page.locator(
      '[data-visual-test="ai-prompt-input-busy"] .dnb-ai-prompt-input'
    )
    const textarea = stopDemo.locator('textarea')
    await textarea.fill('Hello')
    await textarea.press('Enter')
    const stop = stopDemo.locator('.dnb-ai-prompt-input__stop')
    await expect(stop).toBeVisible()
    await stop.focus()
    await stop.press('Enter')
    await expect(stop).toHaveCount(0)
    await expect(textarea).toBeFocused()
  })

  test.beforeEach(async ({ page }) => {
    await page.goto('/uilib/extensions/ai/PromptInput/demos/')
    await waitForApp(page)
  })

  test('uses the Textarea hover and focus borders on the card', async ({
    page,
  }) => {
    const form = page.locator('.dnb-ai-prompt-input').first()
    const textarea = form.locator('textarea')
    const border = (element: HTMLElement) => ({
      color: getComputedStyle(element)
        .getPropertyValue('--border-color')
        .trim(),
      width: getComputedStyle(element)
        .getPropertyValue('--border-width')
        .trim(),
    })
    await textarea.hover()
    let actual = await form.evaluate(border)
    const hoverColor = await form.evaluate((element) =>
      getComputedStyle(element)
        .getPropertyValue('--token-color-stroke-action-hover')
        .trim()
    )
    expect(actual.color).toBe(hoverColor)
    expect(parseFloat(actual.width)).toBe(0.125)

    await textarea.focus()
    await page.mouse.move(0, 0)
    actual = await form.evaluate(border)
    const focusColor = await form.evaluate((element) =>
      getComputedStyle(element)
        .getPropertyValue('--token-color-stroke-action-pressed')
        .trim()
    )
    expect(actual.color).toBe(focusColor)
    expect(parseFloat(actual.width)).toBe(0.125)
    await expect(form).not.toHaveCSS('filter', 'none')

    const attachment = form.getByRole('button', {
      name: 'Legg til vedlegg',
      exact: true,
    })
    await attachment.focus()
    await expect(form).not.toHaveClass(/dnb-ai-prompt-input--focus/)
    actual = await form.evaluate(border)
    const idleColor = await form.evaluate((element) =>
      getComputedStyle(element)
        .getPropertyValue('--token-color-stroke-neutral-subtle')
        .trim()
    )
    expect(actual.color).toBe(idleColor)
    expect(parseFloat(actual.width)).toBe(0.0625)
    await expect(form).toHaveCSS('filter', 'none')
  })

  test('keeps input error feedback on focus', async ({ page }) => {
    const form = page.locator('.dnb-ai-prompt-input').last()
    await form.locator('textarea').hover()
    await form.locator('textarea').focus()
    const border = await form.evaluate((element) =>
      getComputedStyle(element).getPropertyValue('--border-color').trim()
    )
    const error = await form.evaluate((element) =>
      getComputedStyle(element)
        .getPropertyValue('--token-color-stroke-error')
        .trim()
    )
    expect(border).toBe(error)
  })
})
