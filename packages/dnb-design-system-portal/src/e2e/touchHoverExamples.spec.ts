import { expect, test, type Page } from '@playwright/test'
import tapWithTouchEvents from './shared/tapWithTouchEvents'
import waitForApp from './shared/waitForApp'

async function renderActionElementsExample(page: Page) {
  await page.goto(
    '/web/styling-and-themes/design-tokens/overview/?eufemia-theme=carnegie'
  )
  await waitForApp(page)
  const css = await page
    .getByRole('heading', { name: 'Action elements', exact: true })
    .locator('xpath=following::pre[1]')
    .textContent()
  await page.evaluate((css) => {
    const style = document.createElement('style')
    style.textContent = css
    document.head.append(style)
    const button = document.createElement('button')
    button.className = 'my-button'
    button.textContent = 'Action'
    document.querySelector('main h1').after(button)
  }, css)
  return page.locator('button.my-button')
}

function unstyledButton(page: Page) {
  return page.locator(
    '[data-visual-test="span-skeleton"] button.dnb-button--reset'
  )
}

test.describe('hover examples with a mouse', () => {
  test('the action elements example shows its hover color', async ({
    page,
  }) => {
    const button = await renderActionElementsExample(page)
    await expect(button).toHaveCSS('background-color', 'rgb(0, 0, 0)')
    await button.hover()
    await expect(button).toHaveCSS('background-color', 'rgb(51, 51, 51)')
  })

  test('the unstyled button example shows its hover color', async ({
    page,
  }) => {
    await page.goto('/web/layout-and-typography/elements/')
    await waitForApp(page)
    const button = unstyledButton(page)
    await button.hover()
    await expect(button).toHaveCSS('color', 'rgb(220, 42, 42)')
  })
})

test.describe('hover examples on touch devices', () => {
  test.use({ hasTouch: true })

  test('the action elements example keeps its color after a tap', async ({
    page,
  }) => {
    const button = await renderActionElementsExample(page)
    await button.tap()
    expect(await button.evaluate((node) => node.matches(':hover'))).toBe(
      true
    )
    await expect(button).toHaveCSS('background-color', 'rgb(0, 0, 0)')
  })

  test('the unstyled button example keeps its color after a tap', async ({
    page,
  }) => {
    await page.goto('/web/layout-and-typography/elements/')
    await waitForApp(page)
    const button = unstyledButton(page)
    await button.tap()
    expect(await button.evaluate((node) => node.matches(':hover'))).toBe(
      true
    )
    await expect(button).toHaveCSS('color', 'rgb(0, 0, 0)')
  })
})

test.describe('hover examples on devices that have both touch and a mouse', () => {
  test.beforeEach(({ browserName }) => {
    test.skip(browserName !== 'chromium', 'Touch input uses Chromium CDP')
  })

  test('the action elements example keeps its color after a tap', async ({
    page,
  }) => {
    const button = await renderActionElementsExample(page)
    await tapWithTouchEvents(button)
    expect(
      await button.evaluate(
        (node) =>
          node.matches(':hover') &&
          matchMedia('(any-hover: hover)').matches
      )
    ).toBe(true)
    await expect(button).toHaveCSS('background-color', 'rgb(0, 0, 0)')
  })

  test('the unstyled button example keeps its color after a tap', async ({
    page,
  }) => {
    await page.goto('/web/layout-and-typography/elements/')
    await waitForApp(page)
    const button = unstyledButton(page)
    await tapWithTouchEvents(button)
    expect(
      await button.evaluate(
        (node) =>
          node.matches(':hover') &&
          matchMedia('(any-hover: hover)').matches
      )
    ).toBe(true)
    await expect(button).toHaveCSS('color', 'rgb(0, 0, 0)')
  })
})
