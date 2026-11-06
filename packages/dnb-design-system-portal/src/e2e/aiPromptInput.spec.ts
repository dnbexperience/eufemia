import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test.describe('Chat.PromptInput interaction styles', () => {
  for (const variant of ['default', 'compact']) {
    test(
      'focuses the textarea from empty ' + variant + ' card space',
      async ({ page }) => {
        const form = page.locator(
          '[data-visual-test="ai-prompt-input-' + variant + '"] form'
        )
        const textarea = form.locator('textarea')
        await textarea.fill('Hello')
        await page.locator('h1').click()
        await form.click({ position: { x: 16, y: 8 } })
        await expect(textarea).toBeFocused()
        await page.keyboard.type(' world')
        await expect(textarea).toHaveValue('Hello world')
        if (variant === 'default') {
          const toolbar = form.locator('.dnb-ai-prompt-input__toolbar')
          await toolbar.click({ position: { x: 40, y: 10 } })
          await expect(textarea).toBeFocused()
        }
      }
    )
  }

  for (const variant of ['custom', 'custom-compact']) {
    test(
      'composes custom controls in the ' + variant + ' layout',
      async ({ page, browserName }) => {
        const form = page.locator(
          '[data-visual-test="ai-prompt-input-' + variant + '"] form'
        )
        const textarea = form.locator('textarea')
        const attachment = form.getByRole('button', {
          name: 'Add attachment',
          exact: true,
        })
        const microphone = form.getByRole('button', {
          name: 'Use microphone',
          exact: true,
        })
        await textarea.fill('Hello')
        const height = () =>
          form.evaluate(
            (element) => element.getBoundingClientRect().height
          )
        const initialHeight = await height()
        const contextAnimation = form.locator(
          ':scope > .dnb-height-animation'
        )
        await expect(contextAnimation).toBeHidden()
        await attachment.click()
        await expect(attachment).toBeDisabled()
        await expect(contextAnimation).toBeVisible()
        await expect(contextAnimation).not.toHaveClass(/--animating/)
        expect(await height()).toBeGreaterThan(initialHeight)
        await expect(textarea).toHaveValue('Hello')
        await form
          .getByRole('button', { name: 'Remove Budget.pdf' })
          .click()
        await expect(attachment).toBeEnabled()
        await expect(contextAnimation).toBeHidden()
        await expect.poll(height).toBe(initialHeight)
        await microphone.click()
        await expect(textarea).toHaveValue('Show my latest transactions')

        const send = form.locator('button[type="submit"]')
        const tab = browserName === 'webkit' ? 'Alt+Tab' : 'Tab'
        if (variant === 'custom-compact') {
          await attachment.focus()
          await page.keyboard.press(tab)
          await expect(textarea).toBeFocused()
        } else {
          await textarea.focus()
          await page.keyboard.press(tab)
          await expect(attachment).toBeFocused()
        }
        await microphone.focus()
        await page.keyboard.press(tab)
        await expect(send).toBeFocused()

        for (const width of [375, 320]) {
          await page.setViewportSize({ width, height: 900 })
          await expect
            .poll(() =>
              form.evaluate(
                (element) => element.scrollWidth <= element.clientWidth
              )
            )
            .toBe(true)
          const inputBox = await textarea.boundingBox()
          expect(inputBox.width).toBeGreaterThan(32)
        }
        await send.click()
        await expect(textarea).toHaveValue('')
        await expect(textarea).toBeFocused()
      }
    )
  }

  test('removes and restores context with a custom action', async ({
    page,
  }) => {
    const form = page.locator(
      '[data-visual-test="ai-prompt-input-context"] form'
    )
    const add = form.getByRole('button', {
      name: 'Add reference',
      exact: true,
    })
    await expect(add).toBeDisabled()
    await form.getByRole('button', { name: 'Remove reference' }).click()
    await expect(add).toBeEnabled()
    await add.click()
    await expect(
      form.locator('.dnb-ai-prompt-input__context')
    ).toContainText('dnb.no/...Insurance')
    await expect(add).toBeDisabled()
    await expect(form.locator('textarea')).not.toHaveValue('')
  })

  test('keeps keyboard focus after sending with the default button', async ({
    page,
  }) => {
    const form = page.locator(
      '[data-visual-test="ai-prompt-input-default"] .dnb-ai-prompt-input'
    )
    const textarea = form.locator('textarea')
    await textarea.fill('Hello')
    const send = form.locator('button[type="submit"]')
    await send.focus()
    await send.press('Enter')
    await expect(textarea).toHaveValue('')
    await expect(textarea).toBeFocused()
  })

  test('keeps keyboard focus after Stop becomes disabled Send', async ({
    page,
  }) => {
    const form = page.locator(
      '[data-visual-test="ai-prompt-input-busy-default"] .dnb-ai-prompt-input'
    )
    const textarea = form.locator('textarea')
    await textarea.fill('Hello')
    await textarea.press('Enter')
    const stop = form.locator('.dnb-ai-prompt-input__stop')
    await expect(stop).toBeVisible()
    await stop.focus()
    await stop.press('Enter')
    await expect(form.locator('button[type="submit"]')).toBeEnabled()
    await expect(textarea).toBeFocused()
  })

  test('uses the Textarea disabled background on the whole card', async ({
    page,
  }) => {
    const form = page.locator(
      '[data-visual-test="ai-prompt-input-disabled"] .dnb-ai-prompt-input'
    )
    const expected = await form.evaluate((element) => {
      const probe = document.createElement('div')
      probe.style.backgroundColor =
        'var(--token-color-background-neutral-subtle)'
      element.append(probe)
      const color = getComputedStyle(probe).backgroundColor
      probe.remove()
      return color
    })
    await expect(form).toHaveCSS('background-color', expected)
    await expect(form.locator('textarea')).toBeDisabled()
    for (const button of await form.locator('button').all()) {
      await expect(button).toBeDisabled()
    }
  })
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
    await page.goto('/web/patterns-and-extensions/chat/PromptInput/demos/')
    await waitForApp(page)
  })

  test('uses the Textarea hover and focus borders on the card', async ({
    page,
  }) => {
    const form = page.locator(
      '[data-visual-test="ai-prompt-input-custom"] .dnb-ai-prompt-input'
    )
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

    const action = form.getByRole('button', {
      name: 'Add attachment',
      exact: true,
    })
    await action.focus()
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
    const form = page.locator(
      '[data-visual-test="ai-prompt-input-error"] .dnb-ai-prompt-input'
    )
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

test.describe('Chat.PromptInput on touch-primary devices', () => {
  test.use({ hasTouch: true })

  test('keeps Enter for newlines and submits with the button', async ({
    page,
  }) => {
    await page.goto('/web/patterns-and-extensions/chat/PromptInput/demos/')
    await waitForApp(page)
    expect(
      await page.evaluate(
        () => matchMedia('(hover: none) and (pointer: coarse)').matches
      )
    ).toBe(true)
    const form = page.locator(
      '[data-visual-test="ai-prompt-input-default"] .dnb-ai-prompt-input'
    )
    const textarea = form.locator('textarea')
    await textarea.fill('Hello')
    await page.locator('h1').tap()
    await form
      .locator('.dnb-ai-prompt-input__toolbar')
      .tap({ position: { x: 40, y: 10 } })
    await expect(textarea).toBeFocused()
    await textarea.press('Enter')
    await textarea.pressSequentially('world')
    await expect(textarea).toHaveValue('Hello\nworld')
    await form.locator('button[type="submit"]').click()
    await expect(textarea).toHaveValue('')
  })
})
