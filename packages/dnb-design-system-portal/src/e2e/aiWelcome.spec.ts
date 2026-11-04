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
  const greeting = welcome.locator('.dnb-ai-welcome__greeting')
  const avatar = greeting.locator('.dnb-avatar')
  const heading = welcome.getByRole('heading', {
    name: 'Where do you want to start today?',
  })
  const suggestions = welcome.locator('.dnb-ai-suggestions')

  // Keep the measured Figma layout explicit; derive repeated geometry below.
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

  const layout = await suggestions.evaluate((element) => ({
    gap: parseFloat(getComputedStyle(element).rowGap),
    buttons: Array.from(element.querySelectorAll('button')).map(
      (button) => {
        const { x, y, height } = button.getBoundingClientRect()
        return { x, y, height }
      }
    ),
  }))

  expect(
    layout.buttons.every((box) => box.x === layout.buttons[0].x)
  ).toBe(true)
  for (let index = 1; index < layout.buttons.length; index++) {
    const previous = layout.buttons[index - 1]
    expect(
      layout.buttons[index].y - previous.y - previous.height
    ).toBeCloseTo(layout.gap)
  }

  await buttons.first().focus()
  await expect(buttons.first()).toBeFocused()
})

test('wraps real long labels without changing standalone suggestions', async ({
  page,
}) => {
  await page.goto('/uilib/extensions/ai/Welcome/demos/')
  await waitForApp(page)

  const welcome = page.locator(
    '[data-visual-test="ai-welcome-long-labels"] .dnb-ai-welcome'
  )
  await expect(welcome.getByRole('button').first()).toHaveText(
    'Vis betalingsoppdragsoversikten'
  )

  const layout = await welcome.evaluate((element) => {
    const suggestions = element.querySelector('.dnb-ai-suggestions')
    return {
      fits: element.scrollWidth <= element.clientWidth,
      gap: parseFloat(getComputedStyle(suggestions).rowGap),
      buttons: Array.from(suggestions.querySelectorAll('button')).map(
        (button) => {
          const { y, height } = button.getBoundingClientRect()
          const text = button.querySelector('.dnb-button__text')
          return {
            y,
            height,
            fits:
              button.scrollWidth <= button.clientWidth &&
              button.scrollHeight <= button.clientHeight,
            textHeight: text.getBoundingClientRect().height,
            lineHeight: parseFloat(getComputedStyle(text).lineHeight),
          }
        }
      ),
    }
  })

  expect(layout.fits).toBe(true)
  expect(layout.buttons.every((button) => button.fits)).toBe(true)
  expect(layout.buttons[0].textHeight).toBeGreaterThan(
    layout.buttons[0].lineHeight
  )
  expect(
    layout.buttons[1].y - layout.buttons[0].y - layout.buttons[0].height
  ).toBeCloseTo(layout.gap)

  await page.goto('/uilib/extensions/ai/Suggestions/demos/')
  await waitForApp(page)

  await expect(
    page.locator(
      '[data-visual-test="ai-suggestion-chips"] .dnb-ai-suggestions'
    )
  ).toHaveCSS('flex-direction', 'row')
})
