import { test, expect } from '@playwright/test'

const demo = '/web/components/breadcrumb/visual-tests/animation/'

test('wraps long labels within a narrow breadcrumb', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 })
  await page.goto(demo + '#chartist')
  const breadcrumb = page.getByRole('navigation', { name: 'Chart path' })
  await expect(breadcrumb.locator('[aria-current="page"]')).toHaveText(
    'Chartist'
  )
  await expect(
    breadcrumb.locator('.dnb-breadcrumb__item--enter')
  ).toHaveCount(0)
  await breadcrumb
    .locator('[aria-current="page"] p')
    .evaluate((element) => {
      element.textContent =
        'A long library name that should stay readable on narrow screens'
    })
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth)
  ).toBeLessThanOrEqual(320)
})

test('keeps the home icon in the navigation link hit area', async ({
  page,
}) => {
  await page.goto(demo + '#chartist')
  const icon = page.locator('.dnb-breadcrumb__item__home-icon')
  const bounds = await icon.boundingBox()
  await page.mouse.click(
    bounds.x + bounds.width / 2,
    bounds.y + bounds.height / 2
  )
  await expect(page).toHaveURL(/#overview$/, { timeout: 1000 })
})

test('reverses an unfinished entrance from its current width', async ({
  page,
}) => {
  await page.goto(demo + '#overview')
  await expect(
    page.getByRole('heading', { name: 'Overview', level: 1, exact: true })
  ).toBeVisible()
  await page.evaluate(() => {
    window.location.hash = 'chartist'
  })
  const entering = page.locator('.dnb-breadcrumb__item--enter')
  await expect(entering).toHaveCount(1)
  const before = await entering.evaluate((element) => {
    const animation = element.getAnimations()[0]
    animation.pause()
    animation.currentTime = 180
    const expandedHeight = element.getBoundingClientRect().height
    animation.currentTime = 0
    const collapsedWidth = element.getBoundingClientRect().width
    animation.currentTime = 90
    return {
      collapsedWidth,
      expandedHeight,
      height: element.getBoundingClientRect().height,
      width: element.getBoundingClientRect().width,
    }
  })
  expect(before.collapsedWidth).toBeLessThan(1)
  expect(before.width).toBeGreaterThan(1)
  expect(before.height).toBe(before.expandedHeight)

  await page.evaluate(() => {
    window.location.hash = 'overview'
  })
  const exiting = page.locator('.dnb-breadcrumb__item--exit')
  await expect(exiting).toHaveCount(1)
  const after = await exiting.evaluate((element) => {
    const animation = element.getAnimations()[0]
    animation.pause()
    animation.currentTime = 0
    return element.getBoundingClientRect().width
  })
  expect(Math.abs(after - before.width)).toBeLessThan(1)
})

test('preserves keyboard focus when a link becomes the current page', async ({
  page,
  browserName,
}) => {
  await page.goto(demo + '#chartist')
  const breadcrumb = page.getByRole('navigation', { name: 'Chart path' })
  const home = breadcrumb.getByRole('link', {
    name: 'Charts',
    exact: true,
  })
  await expect(breadcrumb.locator('[aria-current="page"]')).toHaveText(
    'Chartist'
  )
  await home.focus()
  await page.keyboard.press('Enter')
  await expect(
    page.getByRole('heading', { name: 'Overview', level: 1, exact: true })
  ).toBeVisible()
  await expect(breadcrumb.locator('[aria-current="page"]')).toBeFocused()
  await expect(breadcrumb.locator('li')).toHaveCount(1)
  await page.keyboard.press(browserName === 'webkit' ? 'Alt+Tab' : 'Tab')
  await expect(
    page.getByRole('button', { name: 'Back', exact: true })
  ).toBeFocused()
})

test('keeps exits inert and settles replacement, history and rapid navigation', async ({
  page,
}) => {
  await page.goto(demo + '#chartist')
  const breadcrumb = page.getByRole('navigation', { name: 'Chart path' })
  await expect(breadcrumb.locator('[aria-current="page"]')).toHaveText(
    'Chartist'
  )
  await page.evaluate(() => {
    window.location.hash = 'nivo'
  })
  const exiting = breadcrumb.locator('[inert]')
  await expect(exiting).toHaveAttribute('aria-hidden', 'true')
  await expect(breadcrumb.getByRole('listitem')).toHaveCount(2)
  await expect(breadcrumb.locator('[aria-current="page"]')).toHaveText(
    'Nivo'
  )
  await expect(exiting).toHaveCount(0)
  await page.goBack()
  await expect(breadcrumb.locator('[aria-current="page"]')).toHaveText(
    'Chartist'
  )
  await page.goForward()
  await expect(breadcrumb.locator('[aria-current="page"]')).toHaveText(
    'Nivo'
  )
  await page.getByRole('button', { name: 'Rapid navigation' }).click()
  await expect(page).toHaveURL(/#overview$/)
  await expect(breadcrumb.locator('li')).toHaveCount(1)
  await expect(breadcrumb.locator('[aria-current="page"]')).toHaveText(
    'Charts'
  )
})

test('removes items immediately with reduced motion and retains the icon node', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto(demo + '#chartist')
  const breadcrumb = page.getByRole('navigation', { name: 'Chart path' })
  await expect(breadcrumb.locator('[aria-current="page"]')).toHaveText(
    'Chartist'
  )
  const icon = await breadcrumb
    .locator('li > .dnb-icon')
    .first()
    .elementHandle()
  await breadcrumb
    .getByRole('link', { name: 'Charts', exact: true })
    .click()
  await expect(breadcrumb.locator('li')).toHaveCount(1)
  expect(await icon.evaluate((element) => element.isConnected)).toBe(true)
  expect(
    await breadcrumb.evaluate((element) =>
      element
        .getAnimations({ subtree: true })
        .some(
          (animation) => Number(animation.effect.getTiming().duration) > 1
        )
    )
  ).toBe(false)
})
