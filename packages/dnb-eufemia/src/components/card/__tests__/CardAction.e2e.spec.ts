import { test, expect, type Locator, type Page } from '@playwright/test'

function getOutline(card: Locator) {
  return card.evaluate(
    (element) => getComputedStyle(element, '::before').boxShadow
  )
}

function getCards(page: Page) {
  const action = page.locator(
    '[data-visual-test="card-action-nested-card"] .dnb-card-action'
  )
  const ownCard = action.locator('> .dnb-card')
  const nestedCard = ownCard.locator('.dnb-card')

  return { action, ownCard, nestedCard }
}

test.describe('Card.Action with a nested Card', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(
      '/web/components/card/visual-tests/action-with-nested-card/?data-visual-test'
    )
    await expect(page.locator('html')).toHaveAttribute(
      'data-portal-ready',
      'true'
    )
  })

  test('should only change the outline of its own card on hover and press', async ({
    page,
  }) => {
    const { action, ownCard, nestedCard } = getCards(page)
    await expect(nestedCard).toHaveCount(1)

    const ownOutlineAtRest = await getOutline(ownCard)
    const nestedOutlineAtRest = await getOutline(nestedCard)

    // Hover
    await action.hover()
    expect(await getOutline(ownCard)).not.toBe(ownOutlineAtRest)
    expect(await getOutline(nestedCard)).toBe(nestedOutlineAtRest)

    // Press
    await page.mouse.down()
    expect(await getOutline(ownCard)).not.toBe(ownOutlineAtRest)
    expect(await getOutline(nestedCard)).toBe(nestedOutlineAtRest)
    await page.mouse.up()
  })

  test('should only change the outline of its own card on keyboard focus', async ({
    page,
  }) => {
    const { action, ownCard, nestedCard } = getCards(page)
    await expect(nestedCard).toHaveCount(1)

    const ownOutlineAtRest = await getOutline(ownCard)
    const nestedOutlineAtRest = await getOutline(nestedCard)

    // Use the keyboard to focus the action
    await page.keyboard.press('a')
    await action.focus()
    await expect(action).toBeFocused()

    expect(await getOutline(ownCard)).not.toBe(ownOutlineAtRest)
    expect(await getOutline(nestedCard)).toBe(nestedOutlineAtRest)
  })

  test('keeps keyboard focus visible in forced colors without outlining nested cards', async ({
    page,
  }) => {
    await page.emulateMedia({ forcedColors: 'active' })
    const { action, ownCard, nestedCard } = getCards(page)
    await page.keyboard.press('Tab')
    await action.focus()
    await expect(action).toBeFocused()

    await expect(ownCard).toHaveCSS('outline-style', 'solid')
    await expect(ownCard).toHaveCSS('outline-width', '3px')
    await expect(nestedCard).toHaveCSS('outline-style', 'none')
  })
})

test.describe('Card.Action on touch devices', () => {
  test.use({ hasTouch: true })

  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto(
      '/web/components/card/visual-tests/action-with-nested-card/?data-visual-test'
    )
    await expect(page.locator('html')).toHaveAttribute(
      'data-portal-ready',
      'true'
    )
  })

  test('does not keep the hover outline after a tap', async ({ page }) => {
    const { action, ownCard } = getCards(page)
    const ownOutlineAtRest = await getOutline(ownCard)

    await action.tap()

    expect(
      await action.evaluate((element) => element.matches(':hover'))
    ).toBe(true)
    await expect.poll(() => getOutline(ownCard)).toBe(ownOutlineAtRest)
  })

  test('shows the keyboard focus outline after a tap', async ({
    page,
  }) => {
    const { action, ownCard } = getCards(page)

    // The focus outline from the keyboard, before any tap. Use Tab and
    // Shift+Tab, because Firefox does not show focus-visible on a
    // focus() call after a tap.
    await action.focus()
    await page.keyboard.press('Tab')
    await page.keyboard.press('Shift+Tab')
    await expect(action).toBeFocused()
    const focusOutline = await getOutline(ownCard)
    await action.blur()

    await action.tap()

    // Come back with the keyboard. The tapped card keeps :hover.
    await page.keyboard.press('Tab')
    await page.keyboard.press('Shift+Tab')
    await expect(action).toBeFocused()
    expect(
      await action.evaluate((element) => element.matches(':hover'))
    ).toBe(true)
    await expect.poll(() => getOutline(ownCard)).toBe(focusOutline)
  })

  test.describe('with a mouse and touchscreen', () => {
    test.use({ hasTouch: false })

    test('switches hover styles with the current input', async ({
      page,
    }) => {
      const input = page
        .locator(
          '[data-visual-test="card-action-nested-card"] .dnb-card-action'
        )
        .first()
      const readColors = () =>
        page
          .locator(
            '[data-visual-test="card-action-nested-card"] .dnb-card-action > .dnb-card'
          )
          .first()
          .evaluate(
            (element) => getComputedStyle(element, '::before').boxShadow
          )
      const rest = await readColors()

      expect(
        await page.evaluate(() => matchMedia('(hover: hover)').matches)
      ).toBe(true)
      await input.hover()
      await expect.poll(readColors).not.toEqual(rest)

      // Keep native :hover while changing the input, as hybrid devices can do.
      await input.dispatchEvent('pointerdown', { pointerType: 'touch' })
      await expect(page.locator('html')).toHaveAttribute(
        'data-whatintent',
        'touch'
      )
      await expect.poll(readColors).toEqual(rest)

      await page.clock.install()
      await page.clock.fastForward(250)
      await page.mouse.move(0, 0)
      await input.hover()
      await expect(page.locator('html')).toHaveAttribute(
        'data-whatintent',
        'mouse'
      )
      await expect.poll(readColors).not.toEqual(rest)
    })
  })
})
