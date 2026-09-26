import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'
import isDev from './shared/isDev'

test.describe('Responsiveness', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/uilib/components/')

    // Check if app is mounted
    await waitForApp(page)
  })

  test('change viewport size should add sidebar menu', async ({
    page,
  }) => {
    await expect(page.locator('#portal-sidebar-menu')).toBeVisible()
    await page.setViewportSize({ width: 375, height: 667 }) // Set viewport size to iPhone 6 dimensions

    await expect(page.locator('#portal-sidebar-menu')).toHaveCount(0)
    await page.click('#toggle-sidebar-menu')
    const drawer = page.getByRole('dialog', { name: 'Menu' })
    await expect(drawer).toBeVisible()

    await expect(drawer.getByText('Portal Tools')).toHaveCount(0)

    await drawer.locator('a[href="/uilib/components"]').click()

    // Check if app is mounted
    await waitForApp(page)

    expect(page.url()).toContain('/uilib/components')
  })

  test('uses a full-height desktop sidebar shell', async ({ page }) => {
    const sidebar = page.locator('#portal-sidebar-menu')
    const header = page.locator('header.sticky-menu')
    const sidebarLogo = sidebar.getByRole('link', {
      name: 'Go to Eufemia home',
    })
    const search = header.locator('.portal-search')

    const layout = await page.evaluate(() => {
      const sidebar = document.querySelector('#portal-sidebar-menu')
      const header = document.querySelector('header.sticky-menu')
      const sidebarRect = sidebar.getBoundingClientRect()
      const headerRect = header.getBoundingClientRect()

      return {
        viewportHeight: window.innerHeight,
        sidebarTop: Math.round(sidebarRect.top),
        sidebarBottom: Math.round(sidebarRect.bottom),
        sidebarRight: Math.round(sidebarRect.right),
        headerLeft: Math.round(headerRect.left),
        logoCenter:
          sidebar
            .querySelector('[title="Go to Eufemia home"]')
            .getBoundingClientRect().x +
          sidebar
            .querySelector('[title="Go to Eufemia home"]')
            .getBoundingClientRect().width /
            2,
        sidebarCenter: sidebarRect.left + sidebarRect.width / 2,
      }
    })

    expect(layout.sidebarTop).toBe(0)
    expect(layout.sidebarBottom).toBe(layout.viewportHeight)
    expect(layout.headerLeft).toBe(layout.sidebarRight)
    expect(
      Math.abs(layout.logoCenter - layout.sidebarCenter)
    ).toBeLessThanOrEqual(8)
    await expect(sidebar).toHaveCSS('border-right-width', '1px')
    await expect(page.locator('.dnb-app-content')).toHaveCSS(
      'box-shadow',
      'none'
    )
    await expect(header).toHaveCSS('position', 'fixed')
    await expect(header).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
    await expect(header).toHaveCSS('border-bottom-width', '0px')
    await expect(sidebarLogo).toBeVisible()

    const sidebarWidth = (await sidebar.boundingBox()).width
    expect(sidebarWidth).toBe(384)
    await expect(
      header.getByRole('link', { name: 'Go to Eufemia home' })
    ).not.toBeVisible()
    await expect(page.locator('#toggle-sidebar-menu')).not.toBeVisible()
    expect((await search.boundingBox()).width).toBeLessThanOrEqual(280)

    await page.evaluate(() => window.scrollTo({ top: 400 }))
    await expect.poll(async () => (await header.boundingBox()).y).toBe(0)
    await expect(sidebar).toHaveCSS('position', 'fixed')
  })

  test('keeps the compact toggle above the Portal ScrollView', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1200, height: 500 })
    await page.goto('/uilib/about-the-lib/living-system')
    await waitForApp(page)

    const toggle = page.locator(
      '.dnb-sidebar-menu-responsive-inline__toggle'
    )
    const scrollView = page.locator(
      '.dnb-sidebar-menu-responsive-aside__scroll-view'
    )
    const firstAction = page
      .locator('#portal-sidebar-menu .dnb-sidebar-menu__item__action')
      .first()
    const inline = page.locator(
      '.dnb-sidebar-menu-responsive-inline[data-sidebar-menu-responsive-scope="portal-sidebar-menu"]'
    )
    const pageContent = page.locator('#dnb-app-content')
    const leading = page.locator(
      'header.sticky-menu span[data-compact="true"]'
    )

    await scrollView.evaluate((element) => element.scrollTo(0, 0))
    await expect
      .poll(() => scrollView.evaluate((element) => element.scrollTop))
      .toBe(0)

    const toggleBox = await toggle.boundingBox()
    const firstActionBox = await firstAction.boundingBox()
    const inlineBox = await inline.boundingBox()
    const pageContentBox = await pageContent.boundingBox()
    expect((firstActionBox?.y ?? 0) - (toggleBox?.y ?? 0) - 48).toBe(12)
    expect(pageContentBox?.x).toBe(
      (inlineBox?.x ?? 0) + (inlineBox?.width ?? 0)
    )
    await expect
      .poll(() =>
        leading.evaluate(
          (element) => getComputedStyle(element, '::before').opacity
        )
      )
      .toBe('0')

    await page.evaluate(() => window.scrollTo(0, 800))
    await expect.poll(async () => (await toggle.boundingBox())?.y).toBe(8)
    await expect
      .poll(() =>
        leading.evaluate(
          (element) => getComputedStyle(element, '::before').opacity
        )
      )
      .toBe('1')

    await expect.poll(async () => (await toggle.boundingBox())?.y).toBe(8)
  })

  test('hides the fixed Portal sidebar after drag dismissal', async ({
    page,
  }) => {
    const sidebar = page.locator('#portal-sidebar-menu')
    const sidebarSurface = page.locator(
      '.dnb-sidebar-menu-responsive-inline__content'
    )
    const inline = page.locator(
      '.dnb-sidebar-menu-responsive-inline[data-sidebar-menu-responsive-scope="portal-sidebar-menu"]'
    )
    const handle = sidebar.locator('.dnb-sidebar-menu-resize-handle')
    const trigger = page.locator('#toggle-sidebar-menu')
    const tools = page
      .locator('header.sticky-menu')
      .locator('[class*=toolsStyle]')
    const toolsRight = await tools.evaluate(
      (element) => element.getBoundingClientRect().right
    )
    const handlePosition = await handle.evaluate((element) => {
      const rect = element.getBoundingClientRect()
      return { x: rect.left + 3, y: rect.top + rect.height / 2 }
    })

    await page.mouse.move(handlePosition.x, handlePosition.y)
    await page.mouse.down()
    await page.mouse.move(handlePosition.x - 264, handlePosition.y)
    expect((await inline.boundingBox())?.width).toBeLessThan(240)
    await page.mouse.up()

    await expect(trigger).toBeVisible()
    const triggerBox = await trigger.boundingBox()
    const headerLogoBox = await page
      .locator('header.sticky-menu')
      .getByRole('link', { name: 'Go to Eufemia home' })
      .boundingBox()
    expect(triggerBox?.x).toBe(32)
    expect((triggerBox?.x ?? 0) + (triggerBox?.width ?? 0)).toBeLessThan(
      headerLogoBox?.x ?? 0
    )
    expect(
      await tools.evaluate(
        (element) => element.getBoundingClientRect().right
      )
    ).toBeCloseTo(toolsRight, 0)
    await expect(sidebar).toHaveCSS('visibility', 'hidden')
    await expect(sidebarSurface).toHaveCSS(
      'clip-path',
      'inset(0px 100% 0px 0px)'
    )

    await trigger.click()
    await expect(sidebar).toHaveCSS('visibility', 'visible')
  })

  test('shows a hamburger before the logo on small screens', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 667 })

    const sidebar = page.locator('#portal-sidebar-menu')
    const menuButton = page.locator('#toggle-sidebar-menu')
    const logo = page.locator('header.sticky-menu').getByRole('link', {
      name: 'Go to Eufemia home',
    })
    const logoGraphic = logo.locator('svg')

    await expect(sidebar).toHaveCount(0)
    await expect(menuButton).toBeVisible()
    await expect(menuButton).toHaveClass(/dnb-button--tertiary/)
    await expect(logo).toBeVisible()
    await expect(page.locator('.dnb-drawer')).toHaveCount(0)

    const buttonBox = await menuButton.boundingBox()
    const logoBox = await logo.boundingBox()
    expect(buttonBox.x + buttonBox.width).toBeLessThanOrEqual(logoBox.x)
    await expect(logoGraphic).toHaveAttribute('viewBox', '0 0 114 22')
    await expect(logoGraphic).toHaveCSS('width', '96px')
    await expect(logoGraphic).toHaveCSS('height', '22px')

    await menuButton.click()
    const dialog = page.getByRole('dialog', { name: 'Menu' })
    await expect(dialog).toBeVisible()
    await expect(menuButton).toHaveAttribute('aria-expanded', 'true')

    const drawer = page.locator('.dnb-drawer--left')
    const closeButton = drawer.locator('.dnb-modal__close-button')
    const drawerLogo = drawer.getByRole('link', {
      name: 'Go to Eufemia home',
    })
    await expect(drawer).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 0, 0)')
    await expect(closeButton).toBeVisible()
    await expect(drawerLogo).toBeVisible()
    await expect(page.getByRole('dialog', { name: 'Menu' })).toBeVisible()
    await expect(drawer.locator('.dnb-drawer__title')).toHaveCount(0)
    const drawerBox = await drawer.boundingBox()
    const drawerContentBox = await drawer
      .locator('.dnb-drawer__content')
      .boundingBox()
    const closeButtonBox = await closeButton.boundingBox()
    const drawerLogoBox = await drawerLogo.boundingBox()
    const drawerNavigationBox = await drawer
      .locator('.dnb-drawer__navigation')
      .boundingBox()
    expect(drawerBox.x).toBe(0)
    expect(drawerBox.width).toBeCloseTo(375 * 0.9, 0)
    expect(drawerBox.height).toBe(667)
    expect(closeButtonBox.x).toBeCloseTo(drawerBox.x + 24, 0)
    await expect(
      closeButton.evaluate((element) => {
        const rect = element.getBoundingClientRect()
        return element.contains(
          document.elementFromPoint(
            rect.left + rect.width / 2,
            rect.top + rect.height / 2
          )
        )
      })
    ).resolves.toBe(true)
    expect(drawerLogoBox.x + drawerLogoBox.width / 2).toBeCloseTo(
      drawerContentBox.x + drawerContentBox.width / 2,
      0
    )
    expect(drawerLogoBox.y + drawerLogoBox.height / 2).toBeCloseTo(
      drawerNavigationBox.y + drawerNavigationBox.height / 2,
      0
    )

    await drawer.evaluate((element) => {
      element.scrollTop = 200
    })
    const scrolledCloseButtonBox = await closeButton.boundingBox()
    expect(scrolledCloseButtonBox.y).toBe(closeButtonBox.y)
    await closeButton.click()
    await expect(dialog).toBeHidden()
    await expect(sidebar).not.toBeVisible()
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false')

    await page.setViewportSize({ width: 600, height: 667 })
    await menuButton.click()
    expect((await drawer.boundingBox()).width).toBe(24 * 16)
    await expect(page.locator('.dnb-modal__overlay')).toBeVisible()
    await expect(page.locator('#dnb-app-content')).toBeVisible()
    await closeButton.click()
    await expect(dialog).toBeHidden()
    await expect(sidebar).not.toBeVisible()
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false')
  })

  test('keeps the mobile logo in place while the hamburger hydrates', async ({
    browser,
    page,
  }) => {
    if (await isDev(page)) {
      return // stop here
    }

    const prerenderedContext = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 375, height: 667 },
    })
    const prerenderedPage = await prerenderedContext.newPage()
    await prerenderedPage.goto(new URL('/', page.url()).toString(), {
      waitUntil: 'domcontentloaded',
    })
    const prerenderedLogo = prerenderedPage.locator(
      'header.sticky-menu a[href="/"]'
    )
    if ((await prerenderedLogo.count()) === 0) {
      await prerenderedContext.close()
      return // stop here
    }
    const before = await prerenderedLogo.evaluate(
      (logo) => logo.getBoundingClientRect().left
    )
    await prerenderedContext.close()

    await page.setViewportSize({ width: 375, height: 667 })
    await page.reload()
    await waitForApp(page)
    const after = await page
      .locator('header.sticky-menu a[href="/"]')
      .evaluate((logo) => logo.getBoundingClientRect().left)

    expect(after).toBe(before)
  })

  test('keeps search visible below 70rem', async ({ page }) => {
    const search = page.locator('header.sticky-menu .portal-search')

    await page.setViewportSize({ width: 1121, height: 800 })
    await expect(search).toBeVisible()

    await page.setViewportSize({ width: 1120, height: 800 })
    await expect(search).toBeVisible()

    await page.setViewportSize({ width: 375, height: 800 })
    await expect(search).toBeVisible()

    const portalTools = page.locator('header.sticky-menu #portal-tools')
    const portalToolsRight = await portalTools.evaluate(
      (element) => element.getBoundingClientRect().right
    )
    const viewportWidth = await page.evaluate(
      () => document.documentElement.clientWidth
    )
    expect(portalToolsRight).toBeLessThanOrEqual(viewportWidth - 16)
  })
})
