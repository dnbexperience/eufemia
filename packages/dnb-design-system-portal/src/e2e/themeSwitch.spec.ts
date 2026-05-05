import { test, expect, type Page } from '@playwright/test'
import isDev from './shared/isDev'
import waitForApp from './shared/waitForApp'

async function clearStorage(page: Page) {
  await page.evaluate(() => window.localStorage.clear())
  await page.evaluate(() => window.sessionStorage.clear())
}

test.afterEach(async ({ page }) => {
  await clearStorage(page)
})

test.describe('Theme', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/uilib/components/')

    // Check if app is mounted
    await waitForApp(page)
  })

  test('should have no preload link', async ({ page }) => {
    if (await isDev(page)) {
      return // stop here
    }

    // Vite uses data-eufemia-theme links — no preload links
    expect(
      await page
        .locator('link[rel="preload"][href*="eufemia-theme"]')
        .count()
    ).toEqual(0)
  })

  test('should have one default theme loaded', async ({ page }) => {
    if (await isDev(page)) {
      return // stop here
    }

    // Vite injects <link data-eufemia-theme="ui"> (enabled)
    const uiLink = page.locator('link[data-eufemia-theme="ui"]')
    await expect(uiLink).toHaveCount(1)
    expect(
      await uiLink.evaluate((el: HTMLLinkElement) => el.disabled)
    ).toBe(false)
  })

  test('should load css file', async ({ page }) => {
    await page.click('#portal-tools')
    await page.click('#change-theme')
    await page.click('#change-theme-portal ul li:nth-child(2)')

    // Vite: sbanken link should be enabled, ui should be disabled
    const sbankenLink = page.locator('link[data-eufemia-theme="sbanken"]')
    await expect(sbankenLink).toHaveCount(1)
    expect(
      await sbankenLink.evaluate((el: HTMLLinkElement) => el.disabled)
    ).toBe(false)

    const uiLink = page.locator('link[data-eufemia-theme="ui"]')
    expect(
      await uiLink.evaluate((el: HTMLLinkElement) => el.disabled)
    ).toBe(true)
  })

  test('should set local storage', async ({ page }) => {
    await page.click('#portal-tools')
    await page.click('#change-theme')
    await page.click('#change-theme-portal ul li:nth-child(2)')

    const localStorageData = await page.evaluate(() => {
      return JSON.parse(
        window.localStorage.getItem('eufemia-theme') || '{}'
      )
    })

    expect(localStorageData.name).toBe('sbanken')
  })

  test('should switch back and forth', async ({ page }) => {
    await page.click('#portal-tools')
    await page.click('#change-theme')
    await page.click('#change-theme-portal ul li:nth-child(2)')

    // Wait for sbanken theme to load before switching back
    await page.waitForFunction(() => {
      const sbankenLink = document.querySelector(
        'link[data-eufemia-theme="sbanken"]'
      ) as HTMLLinkElement | null
      return sbankenLink && !sbankenLink.disabled
    })

    await page.click('#change-theme')
    await page.locator('#change-theme-portal ul li:first-child').click()

    // Wait for theme CSS to update after switching back
    await page.waitForFunction(() => {
      const uiLink = document.querySelector(
        'link[data-eufemia-theme="ui"]'
      ) as HTMLLinkElement | null
      return uiLink && !uiLink.disabled
    })

    // ui link should be enabled again, sbanken disabled
    const uiLink = page.locator('link[data-eufemia-theme="ui"]')
    expect(
      await uiLink.evaluate((el: HTMLLinkElement) => el.disabled)
    ).toBe(false)

    const sbankenLink = page.locator('link[data-eufemia-theme="sbanken"]')
    expect(
      await sbankenLink.evaluate((el: HTMLLinkElement) => el.disabled)
    ).toBe(true)
  })

  test('should load css file after template', async ({ page }) => {
    // Vite pre-injects all theme links — verify the correct theme
    // is active after switching.
    await page.click('#portal-tools')
    await page.click('#change-theme')
    await page.click('#change-theme-portal ul li:nth-child(2)')

    expect(
      await page.evaluate(() =>
        document.body.classList.contains('eufemia-theme__sbanken')
      )
    ).toBe(true)
  })
})

test.describe('Dark mode', () => {
  const url = '/uilib/components/'

  async function gotoAndWait(page: Page) {
    await page.goto(url)
    await waitForApp(page)
  }

  async function setColorScheme(page: Page, colorScheme: string) {
    await page.evaluate((scheme) => {
      const existing = JSON.parse(
        window.localStorage.getItem('eufemia-theme') || '{}'
      )
      window.localStorage.setItem(
        'eufemia-theme',
        JSON.stringify({ ...existing, colorScheme: scheme })
      )
    }, colorScheme)
  }

  test('should apply dark color scheme class to body', async ({
    page,
  }) => {
    await gotoAndWait(page)
    await setColorScheme(page, 'dark')
    await page.reload()
    await waitForApp(page)

    const hasDarkClass = await page.evaluate(() =>
      document.body.classList.contains('eufemia-theme__color-scheme--dark')
    )
    expect(hasDarkClass).toBe(true)
  })

  test('should apply light color scheme class by default', async ({
    page,
  }) => {
    await gotoAndWait(page)

    const hasLightClass = await page.evaluate(() =>
      document.body.classList.contains(
        'eufemia-theme__color-scheme--light'
      )
    )
    expect(hasLightClass).toBe(true)
  })

  test('should set local storage for dark mode', async ({ page }) => {
    await gotoAndWait(page)
    await setColorScheme(page, 'dark')
    await page.reload()
    await waitForApp(page)

    const localStorageData = await page.evaluate(() => {
      return JSON.parse(
        window.localStorage.getItem('eufemia-theme') || '{}'
      )
    })

    expect(localStorageData.colorScheme).toBe('dark')
  })

  test('should switch between dark and light', async ({ page }) => {
    await gotoAndWait(page)
    await setColorScheme(page, 'dark')
    await page.reload()
    await waitForApp(page)

    const hasDarkClass = await page.evaluate(() =>
      document.body.classList.contains('eufemia-theme__color-scheme--dark')
    )
    expect(hasDarkClass).toBe(true)

    // Switch to light
    await setColorScheme(page, 'light')
    await page.reload()
    await waitForApp(page)

    const hasLightClass = await page.evaluate(() =>
      document.body.classList.contains(
        'eufemia-theme__color-scheme--light'
      )
    )
    expect(hasLightClass).toBe(true)

    const hasDarkClassAfterSwitch = await page.evaluate(() =>
      document.body.classList.contains('eufemia-theme__color-scheme--dark')
    )
    expect(hasDarkClassAfterSwitch).toBe(false)
  })

  test('should respect system preference with auto', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' })
    await gotoAndWait(page)
    await setColorScheme(page, 'auto')
    await page.reload()
    await waitForApp(page)

    const hasDarkClass = await page.evaluate(() =>
      document.body.classList.contains('eufemia-theme__color-scheme--dark')
    )
    expect(hasDarkClass).toBe(true)
  })

  test('should apply dark class before React hydration (FOUC prevention)', async ({
    page,
  }) => {
    await gotoAndWait(page)
    await setColorScheme(page, 'dark')

    // Record body class at DOMContentLoaded, before React hydration
    await page.addInitScript(() => {
      document.addEventListener('DOMContentLoaded', () => {
        globalThis.__bodyClassAtDCL = document.body.className
      })
    })

    await page.reload()
    await waitForApp(page)

    const bodyClassAtDCL = await page.evaluate(
      () => globalThis.__bodyClassAtDCL
    )
    expect(bodyClassAtDCL).toContain('eufemia-theme__color-scheme--dark')
  })
})
