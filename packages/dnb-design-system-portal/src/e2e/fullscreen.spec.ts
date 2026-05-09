import { test, expect } from '@playwright/test'

test.describe('Fullscreen', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/uilib/components/button/demos/')
  })

  test('click on fullscreen button should navigate to the fullscreen page', async ({
    page,
  }) => {
    await page.waitForSelector('nav#portal-sidebar-menu')

    await page.click('a.fullscreen')
    await page.waitForURL('**/uilib/components/button/demos/?fullscreen')

    expect(page.url()).toContain(
      '/uilib/components/button/demos/?fullscreen'
    )

    await page.click('a.fullscreen')
    await page.waitForURL('**/uilib/components/button/demos/')

    expect(page.url()).toContain('/uilib/components/button/demos/')
  })

  test('should not produce hydration errors when visiting a fullscreen URL directly', async ({
    page,
  }) => {
    const errors: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text())
      }
    })

    await page.goto('/uilib/components/button/demos/?fullscreen')
    await page.waitForSelector('.dnb-app-content')

    const hydrationErrors = errors.filter(
      (e) =>
        e.includes('#418') || e.includes('#423') || e.includes('Hydration')
    )
    expect(hydrationErrors).toHaveLength(0)
  })

  test('should show header and sidebar after quitting fullscreen from a direct fullscreen URL', async ({
    page,
  }) => {
    await page.goto('/uilib/components/button/demos/?fullscreen')
    await page.waitForSelector('.dnb-app-content')

    // Header and sidebar should be hidden
    await expect(page.locator('header.sticky-menu')).toHaveCount(0)
    await expect(page.locator('nav#portal-sidebar-menu')).toHaveCount(0)

    // Quit fullscreen
    await page.click('a.fullscreen')
    await page.waitForURL('**/uilib/components/button/demos/')

    // Header and sidebar should reappear
    await expect(page.locator('header.sticky-menu')).toBeVisible()
    await expect(page.locator('nav#portal-sidebar-menu')).toBeVisible()
  })
})
