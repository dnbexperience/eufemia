import { test, expect } from '@playwright/test'

test.describe('Fullscreen', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/uilib/components/button/demos')
  })

  test('click on fullscreen button should navigate to the fullscreen page', async ({
    page,
  }) => {
    await page.waitForSelector('nav#portal-sidebar-menu')

    await page.click('button[title="Fullscreen"]')

    await page.waitForSelector('nav#portal-sidebar-menu', {
      state: 'hidden',
    })

    const currentURL = page.url()
    expect(currentURL).toContain(
      '/uilib/components/button/demos/?fullscreen',
    )
  })
})
