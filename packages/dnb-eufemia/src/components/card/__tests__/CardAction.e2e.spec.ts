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
      '/uilib/components/card/visual-tests/action-with-nested-card/?data-visual-test'
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
})
