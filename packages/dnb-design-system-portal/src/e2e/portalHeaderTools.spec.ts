import { expect, test } from '@playwright/test'
import waitForApp from './shared/waitForApp'

for (const width of [320, 390, 640]) {
  test(
    'shows the logo and cog in a single phone header row at ' + width,
    async ({ page }) => {
      await page.setViewportSize({ width, height: 844 })
      await page.goto('/quickguide-designer')
      await waitForApp(page)
      const header = page.locator('header.sticky-menu')
      const logo = header.getByRole('link', { name: 'Go to Eufemia home' })
      const tools = header.locator('button#portal-tools')
      await expect(logo).toBeVisible()
      await expect(tools).toHaveAccessibleName(/DNB - (Light|Dark)/)
      await expect(tools.locator('.dnb-button__text')).toHaveCSS(
        'clip-path',
        'inset(50%)'
      )
      const logoBox = await logo.boundingBox()
      const searchBox = await header
        .locator('.portal-search')
        .boundingBox()
      const availableSearchWidth = await header
        .locator('#portal-search')
        .evaluate((input) => {
          const style = getComputedStyle(input)
          return (
            input.getBoundingClientRect().width -
            parseFloat(style.paddingLeft) -
            parseFloat(style.paddingRight)
          )
        })
      expect(availableSearchWidth).toBeGreaterThan(24)
      const toolsBox = await tools.boundingBox()
      expect(toolsBox.width).toBeCloseTo(toolsBox.height, 1)
      expect(toolsBox.y + toolsBox.height / 2).toBeCloseTo(
        logoBox.y + logoBox.height / 2,
        1
      )
      expect(toolsBox.y).toBeCloseTo(searchBox.y, 1)
      expect(searchBox.x).toBeGreaterThanOrEqual(logoBox.x + logoBox.width)
      expect(toolsBox.x).toBeGreaterThanOrEqual(
        searchBox.x + searchBox.width
      )
      expect(toolsBox.x + toolsBox.width).toBeLessThanOrEqual(width)
      await page.setViewportSize({ width: 641, height: 900 })
      await expect(tools.locator('.dnb-button__text')).toHaveCSS(
        'clip-path',
        'none'
      )
    }
  )
  test(
    'keeps hash headings clear of the phone toolbar at ' + width,
    async ({ page }) => {
      await page.setViewportSize({ width, height: 844 })
      await page.goto('/web/components/button/demos/#demos')
      await waitForApp(page)
      const header = page.locator('header.sticky-menu')
      const target = page.locator('#demos')
      await expect
        .poll(async () => {
          const heading = await target.boundingBox()
          const toolbar = await header.boundingBox()
          return heading.y - toolbar.y - toolbar.height
        })
        .toBeGreaterThanOrEqual(0)
    }
  )
}

for (const width of [375, 900]) {
  test(
    'keeps the scrolled menu-button surround even at ' + width + 'px',
    async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.setViewportSize({ width, height: 667 })
      await page.goto('/')
      await waitForApp(page)
      await page.evaluate(() => window.scrollTo(0, 300))
      const header = page.locator('header.sticky-menu')
      await expect(header).toHaveAttribute('data-scrolled', 'true')
      const button = header.locator('#toggle-sidebar-menu')
      await button.hover()
      const gaps = await button.evaluate((button) => {
        const bounds = button.getBoundingClientRect()
        const leading = button.parentElement
        const surround = leading.getBoundingClientRect()
        const style = getComputedStyle(leading, '::before')
        return {
          opacity: style.opacity,
          left:
            bounds.left -
            surround.left -
            parseFloat(style.left) -
            parseFloat(style.borderLeftWidth),
          top:
            bounds.top -
            surround.top -
            parseFloat(style.top) -
            parseFloat(style.borderTopWidth),
          bottom:
            surround.bottom -
            parseFloat(style.bottom) -
            parseFloat(style.borderBottomWidth) -
            bounds.bottom,
        }
      })
      expect(gaps.opacity).toBe('1')
      expect(gaps.left).toBeGreaterThan(0)
      expect(gaps.top).toBeCloseTo(gaps.left, 1)
      expect(gaps.bottom).toBeCloseTo(gaps.left, 1)
    }
  )
}

for (const path of [
  '/',
  '/web/components/button/',
  '/web/getting-started/',
]) {
  for (const storedDark of [false, true]) {
    test(
      'hydrates the tools label on ' +
        path +
        ' with stored dark ' +
        storedDark,
      async ({ page }) => {
        await page.emulateMedia({
          colorScheme: storedDark ? 'light' : 'dark',
        })
        if (storedDark) {
          await page.addInitScript(() =>
            localStorage.setItem(
              'eufemia-theme',
              JSON.stringify({ brand: 'ui', colorScheme: 'dark' })
            )
          )
        }
        const errors: Array<Promise<string>> = []
        page.on('console', (message) => {
          if (message.type() === 'error') {
            for (const argument of message.args()) {
              errors.push(
                argument
                  .evaluate((value) =>
                    value instanceof Error ? value.message : String(value)
                  )
                  .catch(() => message.text())
              )
            }
          }
        })
        await page.goto(path)
        await waitForApp(page)
        await expect(page.locator('button#portal-tools')).toHaveText(
          'DNB - Dark'
        )
        expect(
          (await Promise.all(errors)).filter((message) =>
            /#418|Hydration failed|hydration.*match/i.test(message)
          )
        ).toEqual([])
      }
    )
  }
}

test('hides external-link indicators only while the sidebar is collapsed', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.setViewportSize({ width: 1200, height: 900 })
  await page.goto('/')
  await waitForApp(page)
  const sidebar = page.locator('#portal-sidebar-menu')
  const inline = page.locator(
    '[data-sidebar-menu-responsive-scope="portal-sidebar-menu"].dnb-sidebar-menu-responsive-inline'
  )
  const resources = sidebar.locator(
    '[data-sidebar-menu-id="web-figma"], [data-sidebar-menu-id="web-github"]'
  )
  const indicators = resources.locator('.dnb-anchor__launch-icon')
  const logos = resources.locator('.dnb-sidebar-menu__item__icon')
  await expect(indicators).toHaveCount(2)
  await page.mouse.move(1190, 10)
  for (const indicator of await indicators.all()) {
    await expect(indicator).toHaveCSS('visibility', 'hidden')
  }
  for (const logo of await logos.all()) {
    await expect(logo).toHaveCSS('visibility', 'visible')
  }
  await inline.hover({ position: { x: 20, y: 80 } })
  await expect(inline).toHaveClass(/--expanded/)
  for (const indicator of await indicators.all()) {
    await expect(indicator).toHaveCSS('visibility', 'visible')
  }
  await page.mouse.move(1190, 10)
  await expect(inline).not.toHaveClass(/--expanded/)
  for (const indicator of await indicators.all()) {
    await expect(indicator).toHaveCSS('visibility', 'hidden')
  }
  await page.setViewportSize({ width: 1440, height: 900 })
  for (const indicator of await indicators.all()) {
    await expect(indicator).toHaveCSS('visibility', 'visible')
  }
  await page.setViewportSize({ width: 390, height: 900 })
  await page.locator('#toggle-sidebar-menu').click()
  const drawer = page.getByRole('dialog', { name: 'Menu' })
  for (const name of ['Figma', 'GitHub']) {
    await expect(
      drawer
        .getByRole('link', { name, exact: true })
        .locator('.dnb-anchor__launch-icon')
    ).toHaveCSS('visibility', 'visible')
  }
})

for (const width of [390, 1440]) {
  test(
    'shows brand settings and Web resource links at ' + width + 'px',
    async ({ page }) => {
      await page.emulateMedia({
        colorScheme: 'light',
        reducedMotion: 'reduce',
      })
      await page.setViewportSize({ width, height: 900 })
      await page.goto('/')
      await waitForApp(page)
      const header = page.locator('header.sticky-menu')
      await expect(
        header.locator('a[href*="github.com"], a[href*="figma.com"]')
      ).toHaveCount(0)
      const tools = header.locator('button#portal-tools')
      await expect(tools).toHaveText('DNB - Light')
      await expect(tools).not.toHaveAttribute('title')
      await expect(tools).toHaveAccessibleName('DNB - Light, Portal Tools')
      await expect(tools).not.toHaveAttribute('aria-pressed')
      await expect(tools).toHaveAttribute('aria-expanded', 'false')
      await expect(tools).not.toHaveClass(/dnb-toggle-button__button/)
      await expect(tools.locator('.dnb-icon')).toHaveCSS('width', '16px')
      await expect(tools.locator('.dnb-icon svg')).toBeVisible()
      await tools.hover()
      const tooltip = page.getByRole('tooltip', {
        name: 'Open the portal tools',
      })
      await expect(tooltip).toBeVisible()
      await expect(tools).toHaveAccessibleDescription(
        'Open the portal tools'
      )
      await expect(tooltip.locator('.dnb-tooltip__arrow')).toHaveClass(
        /dnb-tooltip__arrow__placement--bottom/
      )
      await tools.click()
      const drawer = page.getByRole('dialog', { name: 'Portal Tools' })
      await expect(drawer).toBeVisible()
      await expect(tools).toHaveAttribute('aria-expanded', 'true')
      await drawer
        .getByRole('radio', { name: 'Dark', exact: true })
        .click()
      await expect(tools).toHaveText('DNB - Dark')
      await drawer.locator('#change-theme').click()
      await page
        .getByRole('option', { name: 'Sbanken (WIP)', exact: true })
        .click()
      await expect(tools).toHaveText('Sbanken - Dark')
      await drawer
        .getByRole('button', { name: /Close|Lukk/ })
        .first()
        .click()
      await expect(tools).toBeFocused()
      await expect(tools).toHaveAttribute('aria-expanded', 'false')
      await page.reload()
      await waitForApp(page)
      await expect(tools).toHaveText('Sbanken - Dark')
      expect(
        await tools.evaluate((el) => el.getBoundingClientRect().right)
      ).toBeLessThanOrEqual(width)

      if (width < 960) {
        await header.locator('#toggle-sidebar-menu').click()
      }
      const platform = page.getByRole('navigation', {
        name: 'Platform Content Menu',
      })
      const figma = platform.getByRole('link', {
        name: 'Figma',
        exact: true,
      })
      const github = platform.getByRole('link', {
        name: 'GitHub',
        exact: true,
      })
      await github.scrollIntoViewIfNeeded()
      await expect(
        figma.locator('.dnb-sidebar-menu__item__icon svg')
      ).toBeVisible()
      await expect(
        github.locator('.dnb-sidebar-menu__item__icon svg')
      ).toBeVisible()
      await expect(figma).toHaveAttribute(
        'href',
        'https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web'
      )
      await expect(github).toHaveAttribute(
        'href',
        'https://github.com/dnbexperience/eufemia/'
      )
      await expect(figma).toHaveAttribute('target', '_blank')
      await expect(
        figma.locator('xpath=../preceding-sibling::*[1]')
      ).toHaveClass(/divider/)
      const selector = platform.getByRole('combobox')
      await selector.click()
      await expect
        .poll(
          async () =>
            (await page
              .locator('html')
              .getAttribute('data-dnb-drawer-list-active')) ===
            (
              await page
                .locator(
                  '.dnb-sidebar-menu__sections-portal .dnb-drawer-list'
                )
                .getAttribute('id')
            )?.replace(/-drawer-list$/, '')
        )
        .toBe(true)
      await page.keyboard.press('Home')
      await page.keyboard.press('ArrowDown')
      await page.keyboard.press('Enter')
      await expect(figma).toHaveCount(0)
      await expect(github).toHaveCount(0)
      await selector.click()
      await expect
        .poll(
          async () =>
            (await page
              .locator('html')
              .getAttribute('data-dnb-drawer-list-active')) ===
            (
              await page
                .locator(
                  '.dnb-sidebar-menu__sections-portal .dnb-drawer-list'
                )
                .getAttribute('id')
            )?.replace(/-drawer-list$/, '')
        )
        .toBe(true)
      await page.keyboard.press('Home')
      await page.keyboard.press('Enter')
      await expect(github).toBeAttached()
    }
  )
}

test('keeps long brand labels accessible in the phone cog button', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 900 })
  await page.addInitScript(() => {
    localStorage.setItem(
      'eufemia-theme',
      JSON.stringify({ brand: 'carnegie', colorScheme: 'dark' })
    )
  })
  await page.goto('/')
  await waitForApp(page)
  const header = page.locator('header.sticky-menu')
  const tools = header.locator('button#portal-tools')
  await expect(tools).toHaveText('DNB Carnegie - Dark')
  await expect(tools).toHaveAccessibleName(
    'DNB Carnegie - Dark, Portal Tools'
  )
  const logoBox = await header
    .getByRole('link', { name: 'Go to Eufemia home' })
    .boundingBox()
  const toolsBox = await tools.boundingBox()
  expect(toolsBox.width).toBeCloseTo(toolsBox.height, 1)
  expect(toolsBox.y + toolsBox.height / 2).toBeCloseTo(
    logoBox.y + logoBox.height / 2,
    1
  )
  expect(toolsBox.x).toBeGreaterThanOrEqual(16)
  expect(toolsBox.x + toolsBox.width).toBeLessThanOrEqual(304)
})

test('shows the resolved system color scheme and restores focus on Escape', async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: 'dark' })
  await page.goto('/')
  await waitForApp(page)
  const tools = page.locator('button#portal-tools')
  await expect(tools).toHaveText('DNB - Dark')
  await page.emulateMedia({ colorScheme: 'light' })
  await expect(tools).toHaveText('DNB - Light')
  await tools.click()
  const drawer = page.getByRole('dialog', { name: 'Portal Tools' })
  await expect(drawer).toBeVisible()
  await expect(drawer.locator('#change-theme')).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(tools).toBeFocused()
  await expect(tools).toHaveAttribute('aria-expanded', 'false')
})
