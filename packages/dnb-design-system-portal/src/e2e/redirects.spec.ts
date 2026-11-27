import { test, expect } from '@playwright/test'
import isDev from './shared/isDev'
import waitForApp from './shared/waitForApp'

test.describe('Redirects', () => {
  test.describe('server-side', () => {
    test.use({ javaScriptEnabled: false })

    test('redirects /index.html to clean URL', async ({ page }) => {
      if (await isDev(page)) {
        return // stop here
      }

      const response = await page.goto(
        '/uilib/components/button/index.html'
      )
      await expect(page).toHaveURL(/\/web\/components\/button\/?$/)
      expect(response?.status()).toBeLessThan(400)
    })

    test('opens the Events section for an old Events tab URL', async ({
      page,
    }) => {
      if (await isDev(page)) {
        return // stop here
      }

      await page.goto('/web/components/button/events/')
      await expect(page).toHaveURL(
        /\/web\/components\/button\/properties\/#events$/
      )
    })
  })

  test('opens the Events section for an old Events tab URL', async ({
    page,
  }) => {
    await page.goto('/web/components/button/events/')
    await expect(page).toHaveURL(
      /\/web\/components\/button\/properties\/#events$/
    )
  })

  test('keeps the section of an old Events tab URL', async ({ page }) => {
    await page.goto('/web/components/autocomplete/events/#methods')
    await expect(page).toHaveURL(
      /\/web\/components\/autocomplete\/properties\/#methods$/
    )
  })

  test('redirects /uilib/components/button/info/ to parent', async ({
    page,
  }) => {
    if (await isDev(page)) {
      return // stop here
    }

    await page.goto('/uilib/components/button/info/')
    await page.waitForURL(/\/web\/components\/button\/?$/)
    expect(page.url()).toMatch(/\/web\/components\/button\/?$/)
  })

  test('does not redirect non-info tab pages', async ({ page }) => {
    if (await isDev(page)) {
      return // stop here
    }

    await page.goto('/uilib/components/button/demos/')
    await waitForApp(page)
    expect(page.url()).toMatch(/\/web\/components\/button\/demos\/?$/)
  })
})
