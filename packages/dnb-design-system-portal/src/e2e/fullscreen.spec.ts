import { test, expect } from '@playwright/test'

test.describe('Fullscreen', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/uilib/components/button/demos')
  })

  test('click on fullscreen button should navigate to the fullscreen page', async ({
    page,
  }) => {
    await page.waitForSelector('nav#portal-sidebar-menu')

    await page.click('a.fullscreen')

    expect(page.url()).toContain(
      '/uilib/components/button/demos/?fullscreen',
    )

    await page.click('a.fullscreen')

    expect(page.url()).toContain('/uilib/components/button/demos/')
  })
})
