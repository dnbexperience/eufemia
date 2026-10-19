import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test('aligns the welcome greeting, heading and suggestions with Figma', async ({
  page,
}) => {
  await page.goto('/uilib/extensions/ai/Welcome/demos/')
  await waitForApp(page)
  const welcome = page.locator(
    '[data-visual-test="ai-welcome-chips"] .dnb-ai-welcome'
  )
  await welcome.evaluate((element) => {
    element.style.width = '325px'
    element.style.maxWidth = '100%'
  })
  const greeting = welcome.locator('.dnb-ai-welcome__greeting')
  const avatar = greeting.locator('.dnb-avatar')
  const heading = welcome.getByRole('heading', {
    name: 'Where do you want to start today?',
  })
  const suggestions = welcome.locator('.dnb-ai-suggestions')
  await expect(greeting).toHaveText('Hi Matthias')
  await expect(greeting).toHaveCSS('column-gap', '16px')
  await expect(avatar).toHaveCSS('width', '24px')
  await expect(avatar.locator('.dnb-icon')).toHaveCSS('width', '16px')
  await expect(heading).toHaveCSS('font-size', '26px')
  await expect(heading).toHaveCSS('line-height', '32px')
  await expect(welcome).toHaveCSS('row-gap', '20px')
  await expect(suggestions).toHaveCSS('row-gap', '16px')
  const buttons = suggestions.getByRole('button')
  await expect(buttons).toHaveCount(3)
  const boxes = await buttons.evaluateAll((elements) =>
    elements.map((element) => {
      const { x, y, height } = element.getBoundingClientRect()
      return { x, y, height }
    })
  )
  expect(
    boxes.every((box) => box.x === boxes[0].x && box.height === 40)
  ).toBe(true)
  expect(boxes[1].y - boxes[0].y).toBe(56)
  expect(boxes[2].y - boxes[1].y).toBe(56)
  await buttons.first().focus()
  await expect(buttons.first()).toBeFocused()
})

test('wraps welcome content in a narrow container without changing standalone suggestions', async ({
  page,
}) => {
  await page.goto('/uilib/extensions/ai/Welcome/demos/')
  await waitForApp(page)
  const welcome = page.locator(
    '[data-visual-test="ai-welcome-chips"] .dnb-ai-welcome'
  )
  await welcome.evaluate((element) => {
    element.style.width = '220px'
  })
  await welcome
    .getByRole('button')
    .first()
    .evaluate((element) => {
      element.querySelector('.dnb-button__text').textContent =
        'Please help me understand my spending for this month'
    })
  expect(
    await welcome.evaluate(
      (element) => element.scrollWidth <= element.clientWidth
    )
  ).toBe(true)
  const firstButton = welcome.getByRole('button').first()
  expect(
    await firstButton.evaluate(
      (element) => element.scrollHeight <= element.clientHeight
    )
  ).toBe(true)
  const firstBox = await firstButton.boundingBox()
  const nextBox = await welcome.getByRole('button').nth(1).boundingBox()
  expect(nextBox.y - (firstBox.y + firstBox.height)).toBe(16)
  const greeting = welcome.locator('.dnb-ai-welcome__greeting')
  await expect(greeting.locator('.dnb-avatar')).toHaveCSS('width', '24px')
  await page.goto('/uilib/extensions/ai/Suggestions/demos/')
  await waitForApp(page)
  await expect(
    page.locator(
      '[data-visual-test="ai-suggestion-chips"] .dnb-ai-suggestions'
    )
  ).toHaveCSS('flex-direction', 'row')
})
