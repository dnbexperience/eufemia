import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test.beforeEach(async ({ page }) => {
  await page.goto('/uilib/extensions/ai/Confirmation/demos/')
  await waitForApp(page)
})

test('matches the confirmation design states', async ({ page }) => {
  const cards = page.locator(
    '[data-visual-test="ai-confirmation-states"] .dnb-ai-confirmation'
  )
  await expect(cards).toHaveCount(4)

  const pending = cards.nth(0)
  await expect(pending.getByRole('heading')).toHaveCSS('font-size', '20px')
  await expect(pending.getByRole('heading')).toHaveCSS(
    'line-height',
    '24px'
  )
  await expect(pending).toHaveCSS('padding', '24px')
  await expect(pending).toHaveCSS('border-radius', '24px')
  await expect(pending.locator('.dnb-ai-confirmation__actions')).toHaveCSS(
    'gap',
    '10px'
  )
  await expect(
    pending.getByRole('button', { name: 'No', exact: true })
  ).toBeEnabled()
  await expect(
    pending.getByRole('button', { name: 'Yes', exact: true })
  ).toHaveCSS('height', '40px')

  await expect(cards.nth(1).locator('.dnb-badge')).toHaveText('Required')
  await expect(
    cards
      .nth(1)
      .getByRole('button', { name: 'Yes', exact: true })
      .locator('.dnb-icon')
  ).toHaveCount(1)
  await expect(
    cards.nth(2).getByRole('button', { name: 'Yes', exact: true })
  ).toBeDisabled()
  await expect(cards.nth(3).locator('.dnb-badge')).toHaveText('Expired')

  for (const card of [cards.nth(2), cards.nth(3)]) {
    const colors = await card.evaluate((element) => ({
      title: getComputedStyle(element.querySelector('h3')).color,
      description: getComputedStyle(
        element.querySelector('.dnb-ai-confirmation__description')
      ).color,
    }))
    expect(colors.title).toBe(colors.description)
    for (const button of await card.getByRole('button').all()) {
      await expect(button).toBeDisabled()
    }
  }
})

test('keeps focus and announces the decision through controlled states', async ({
  page,
}) => {
  const demo = page.locator(
    '[data-visual-test="ai-confirmation-interactive"]'
  )
  const card = demo.locator('.dnb-ai-confirmation')
  const confirm = card.getByRole('button', {
    name: 'Add to watchlist',
    exact: true,
  })
  const decline = card.getByRole('button', {
    name: 'Keep current list',
    exact: true,
  })
  const body = card.locator('.dnb-ai-confirmation__body')
  const reset = demo.getByRole('button', { name: 'Reset decision' })

  await confirm.focus()
  await confirm.press('Enter')
  await expect(card).toHaveClass(/dnb-ai-confirmation--confirmed/)
  await expect(confirm).toBeDisabled()
  await expect(decline).toBeDisabled()
  await expect(body).toBeFocused()
  await expect(card.locator('.dnb-aria-live')).toContainText('Bekreftet')

  await reset.click()
  await decline.focus()
  await decline.press('Space')
  await expect(card).toHaveClass(/dnb-ai-confirmation--declined/)
  await expect(body).toBeFocused()
  await expect(card.locator('.dnb-badge')).toHaveText('Avslått')
})

test('expires the application request without losing keyboard focus', async ({
  page,
}) => {
  const demo = page.locator('[data-visual-test="ai-confirmation-expiry"]')
  const card = demo.locator('.dnb-ai-confirmation')
  await demo
    .getByRole('button', { name: 'Start a five-second request' })
    .click()
  const confirm = card.getByRole('button', { name: 'Ja', exact: true })

  await expect(confirm).toBeEnabled()
  await confirm.focus()
  await expect(card).toHaveClass(/dnb-ai-confirmation--expired/, {
    timeout: 8000,
  })
  await expect(confirm).toBeDisabled()
  await expect(card.locator('.dnb-ai-confirmation__body')).toBeFocused()
  await expect(card.locator('.dnb-aria-live')).toContainText('Utløpt')
})

test('wraps content and action labels in a narrow container', async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 900 })
  const card = page.locator(
    '[data-visual-test="ai-confirmation-interactive"] .dnb-ai-confirmation'
  )
  await expect(
    card.getByRole('button', { name: 'Add to watchlist', exact: true })
  ).toBeVisible()

  const fits = await card.evaluate(
    (element) =>
      element.scrollWidth <= element.clientWidth &&
      Array.from(element.querySelectorAll('button')).every(
        (button) =>
          button.scrollWidth <= button.clientWidth &&
          button.scrollHeight <= button.clientHeight
      )
  )
  expect(fits).toBe(true)
})

test('fills a wide card and aligns the badge and actions to its content edge', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1400, height: 1000 })
  const card = page.locator(
    '[data-visual-test="ai-confirmation-interactive"] .dnb-ai-confirmation'
  )

  const gaps = await card.evaluate((element) => {
    const content = element.querySelector('.dnb-flex-container')
    const body = element.querySelector('.dnb-ai-confirmation__body')
    const badge = element.querySelector('.dnb-ai-confirmation__badge')
    const confirm = element.querySelector(
      '.dnb-ai-confirmation__actions > :last-child'
    )
    const edge = content.getBoundingClientRect().right
    return [body, badge, confirm].map((item) =>
      Math.abs(edge - item.getBoundingClientRect().right)
    )
  })

  for (const gap of gaps) {
    expect(gap).toBeLessThanOrEqual(1)
  }
})
