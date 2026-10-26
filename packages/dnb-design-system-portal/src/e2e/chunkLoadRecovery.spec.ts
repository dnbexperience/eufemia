import { test, expect, type Page } from '@playwright/test'
import waitForApp from './shared/waitForApp'

const chunkPatterns = {
  entry: /\/assets\/index-[^/]+\.js$/,
  dependency: /\/assets\/jsx-runtime-[^/]+\.js$/,
  layout: /\/assets\/ChangeStyleTheme-[^/]+\.js$/,
  page: /\/assets\/BankAccountNumber-[^/]+\.js$/,
}

function countDocuments(page: Page) {
  let count = 0
  page.on('request', (request) => {
    if (
      request.isNavigationRequest() &&
      request.frame() === page.mainFrame()
    ) {
      count++
    }
  })
  return () => count
}

test.describe('Chunk load recovery', () => {
  test('recovers from a caught route import failure without an HTML preload', async ({
    page,
  }) => {
    const documents = countDocuments(page)
    await page.addInitScript(() => {
      window.addEventListener('vite:preloadError', () => {
        sessionStorage.setItem('preload-error-observed', '1')
      })
    })
    await page.route('**/Value/BankAccountNumber/', async (route) => {
      const response = await route.fetch()
      const body = (await response.text()).replace(
        /<link rel="modulepreload"[^>]+href="[^"]*\/BankAccountNumber-[^"]+"[^>]*>/g,
        ''
      )
      await route.fulfill({ response, body })
    })
    let requests = 0
    await page.route(chunkPatterns.page, (route) => {
      requests++
      return requests === 1
        ? route.fulfill({
            status: 503,
            headers: { 'cache-control': 'no-store' },
            contentType: 'text/javascript',
            body: '',
          })
        : route.continue()
    })

    await page.goto('/uilib/extensions/forms/Value/BankAccountNumber/', {
      waitUntil: 'commit',
    })
    await waitForApp(page)

    expect(documents()).toBe(2)
    expect(
      await page.evaluate(() =>
        sessionStorage.getItem('preload-error-observed')
      )
    ).toBe('1')
  })

  for (const [name, pattern] of Object.entries(chunkPatterns)) {
    test(`recovers when the ${name} module fails once`, async ({
      page,
    }) => {
      const documents = countDocuments(page)
      let requests = 0
      await page.route(pattern, (route) => {
        requests++
        return requests === 1
          ? route.fulfill({
              status: 503,
              headers: { 'cache-control': 'no-store' },
              contentType: 'text/javascript',
              body: '',
            })
          : route.continue()
      })

      await page.goto(
        '/uilib/extensions/forms/Value/BankAccountNumber/?recovery-test#bankaccountnumber',
        { waitUntil: 'commit' }
      )
      await waitForApp(page)

      expect(requests).toBeGreaterThanOrEqual(2)
      expect(documents()).toBe(2)
      await expect(page).toHaveURL(
        /\/Value\/BankAccountNumber\/\?recovery-test#bankaccountnumber$/
      )
      const button = page
        .locator('#portal-sidebar-menu button[aria-expanded]')
        .first()
      const expanded = await button.getAttribute('aria-expanded')
      await button.click()
      await expect(button).toHaveAttribute(
        'aria-expanded',
        expanded === 'true' ? 'false' : 'true'
      )
    })

    test(`does not loop when the ${name} module keeps failing`, async ({
      page,
    }) => {
      const documents = countDocuments(page)
      let failures = 0
      await page.route(pattern, (route) => {
        failures++
        return route.fulfill({
          status: 503,
          headers: { 'cache-control': 'no-store' },
          contentType: 'text/javascript',
          body: '',
        })
      })

      await page.goto('/uilib/extensions/forms/Value/BankAccountNumber/', {
        waitUntil: 'commit',
      })
      await expect.poll(() => failures).toBeGreaterThanOrEqual(2)
      await expect.poll(documents).toBe(2)
      await page.waitForLoadState('networkidle')

      expect(documents()).toBe(2)
      expect(
        await page.evaluate(() =>
          sessionStorage.getItem('eufemia-portal:chunk-error-reloaded')
        )
      ).toBe('1')
    })
  }
})
