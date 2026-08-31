import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test.describe('Responsiveness', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/uilib/components/')

    // Check if app is mounted
    await waitForApp(page)
  })

  test('change viewport size should add sidebar menu', async ({
    page,
  }) => {
    await expect(page.locator('#portal-sidebar-menu')).toHaveCSS(
      'display',
      'flex'
    )
    await page.setViewportSize({ width: 375, height: 667 }) // Set viewport size to iPhone 6 dimensions

    await expect(page.locator('#portal-sidebar-menu')).toHaveCount(0)
    await page.click('#toggle-sidebar-menu')
    await expect(page.locator('#portal-sidebar-menu')).toHaveCSS(
      'opacity',
      '1'
    )

    await expect(
      page.locator('#portal-sidebar-menu').getByText('Portal Tools')
    ).toHaveCount(0)

    const sidebarLink = '#portal-sidebar-menu a[href="/uilib/components"]'
    await page.click(sidebarLink)

    // Check if app is mounted
    await waitForApp(page)

    expect(page.url()).toContain('/uilib/components')
  })

  test('uses a full-height desktop sidebar shell', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 })

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
    ).toBeLessThan(1)
    await expect(sidebar).toHaveCSS('border-right-width', '1px')
    await expect(header).toHaveCSS('position', 'fixed')
    await expect(header).toHaveCSS('border-bottom-width', '0px')
    await expect(sidebarLogo).toBeVisible()

    const sidebarWidth = (await sidebar.boundingBox()).width
    await page.setViewportSize({ width: 1440, height: 900 })
    expect((await sidebar.boundingBox()).width).toBe(sidebarWidth)
    await expect(
      header.getByRole('link', { name: 'Go to Eufemia home' })
    ).not.toBeVisible()
    await expect(page.locator('#toggle-main-menu')).toHaveCount(0)
    await expect(page.locator('#toggle-sidebar-menu')).not.toBeVisible()
    expect((await search.boundingBox()).width).toBeLessThanOrEqual(280)

    await page.evaluate(() => window.scrollTo({ top: 400 }))
    await expect.poll(async () => (await header.boundingBox()).y).toBe(0)
    await expect(sidebar).toHaveCSS('position', 'fixed')
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

    await expect(sidebar).not.toBeVisible()
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
    await expect(sidebar).toBeVisible()
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
    const closeButtonBox = await closeButton.boundingBox()
    const drawerLogoBox = await drawerLogo.boundingBox()
    const drawerNavigationBox = await drawer
      .locator('.dnb-drawer__navigation')
      .boundingBox()
    expect(drawerBox.x).toBe(0)
    expect(drawerBox.width).toBeCloseTo(375 * 0.8, 0)
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
      drawerBox.x + drawerBox.width / 2,
      0
    )
    expect(drawerLogoBox.y + drawerLogoBox.height / 2).toBeCloseTo(
      drawerNavigationBox.y + drawerNavigationBox.height / 2,
      0
    )

    await sidebar
      .locator('.portal-sidebar-scroll-view')
      .evaluate((element) => {
        element.scrollTop = 200
      })
    const scrolledCloseButtonBox = await closeButton.boundingBox()
    expect(scrolledCloseButtonBox.y).toBe(closeButtonBox.y)
    await closeButton.click()
    await expect(sidebar).not.toBeVisible()
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false')

    await page.setViewportSize({ width: 600, height: 667 })
    await menuButton.click()
    expect((await drawer.boundingBox()).width).toBe(24 * 16)
    await closeButton.click()

    await menuButton.click()
    await expect(sidebar).toBeVisible()
    await expect(drawer).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 0, 0)')
    await expect(page.locator('.dnb-modal__overlay')).toBeVisible()
    await expect(page.locator('#dnb-app-content')).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(sidebar).not.toBeVisible()
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false')
  })

  test('hides search below 70rem', async ({ page }) => {
    const search = page.locator('header.sticky-menu .portal-search')

    await page.setViewportSize({ width: 1121, height: 800 })
    await expect(search).toBeVisible()

    await page.setViewportSize({ width: 1120, height: 800 })
    await expect(search).not.toBeVisible()
  })
})
