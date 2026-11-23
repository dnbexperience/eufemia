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
    await page.goto('/web/components/')

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
    await page
      .getByRole('dialog', { name: 'Settings' })
      .getByRole('radio', { name: 'Sbanken', exact: true })
      .click()

    // Vite: sbanken link should be enabled, ui should be disabled
    const sbankenLink = page.locator('link[data-eufemia-theme="sbanken"]')
    await expect(sbankenLink).toHaveCount(1)
    expect(
      await sbankenLink.evaluate((el: HTMLLinkElement) => el.disabled)
    ).toBe(false)

    const uiLink = page.locator('link[data-eufemia-theme="ui"]')
    await expect
      .poll(() => uiLink.evaluate((el: HTMLLinkElement) => el.disabled))
      .toBe(true)
  })

  test('should set local storage', async ({ page }) => {
    await page.click('#portal-tools')
    await page
      .getByRole('dialog', { name: 'Settings' })
      .getByRole('radio', { name: 'Sbanken', exact: true })
      .click()

    await page.waitForFunction(() => {
      const theme = JSON.parse(
        window.localStorage.getItem('eufemia-theme') || '{}'
      )

      return theme.brand === 'sbanken'
    })

    const localStorageData = await page.evaluate(() => {
      return JSON.parse(
        window.localStorage.getItem('eufemia-theme') || '{}'
      )
    })

    expect(localStorageData.brand).toBe('sbanken')
    // The deprecated `name` is kept mirrored until v13
    expect(localStorageData.name).toBe('sbanken')
  })

  test('should switch back and forth without losing focus', async ({
    page,
  }) => {
    // Keep theme loading pending while checking keyboard focus.
    let finishLoading: () => void
    const loading = new Promise<void>((resolve) => {
      finishLoading = resolve
    })
    await page.route('**/*eufemia-theme-sbanken*.css', async (route) => {
      await loading
      await route.continue()
    })
    await page.reload()
    await waitForApp(page)

    await page.click('#portal-tools')
    const settings = page.getByRole('dialog', { name: 'Settings' })
    await expect(
      settings.getByRole('radio', { name: 'DNB', exact: true })
    ).toBeFocused()
    const sbanken = settings.locator('input[value="sbanken"]')
    try {
      await page.keyboard.press('ArrowRight')
      await expect(sbanken).toBeChecked()
      await expect(sbanken).toBeFocused()
    } finally {
      finishLoading()
    }

    // Wait for sbanken theme to load before switching back
    await page.waitForFunction(() => {
      const sbankenLink = document.querySelector(
        'link[data-eufemia-theme="sbanken"]'
      ) as HTMLLinkElement | null
      return sbankenLink && !sbankenLink.disabled
    })

    await expect(sbanken).toBeChecked()
    await expect(sbanken).toBeFocused()

    await page.keyboard.press('ArrowRight')
    const eiendom = settings.getByRole('radio', {
      name: 'DNB Eiendom',
      exact: true,
    })
    await expect(page.locator('body')).toHaveClass(
      /eufemia-theme__eiendom/
    )
    await expect(eiendom).toBeChecked()
    await expect(eiendom).toBeFocused()

    await settings.getByRole('radio', { name: 'DNB', exact: true }).click()

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
    await page
      .getByRole('dialog', { name: 'Settings' })
      .getByRole('radio', { name: 'Sbanken', exact: true })
      .click()

    await page.waitForFunction(() =>
      document.body.classList.contains('eufemia-theme__sbanken')
    )

    expect(
      await page.evaluate(() =>
        document.body.classList.contains('eufemia-theme__sbanken')
      )
    ).toBe(true)
  })
})

test('should apply the brand from the URL after hydration', async ({
  page,
}) => {
  const hydrationErrors: string[] = []
  page.on('console', (message) => {
    if (message.text().includes('hydration error')) {
      hydrationErrors.push(message.text())
    }
  })

  await page.goto('/web/components/logo/demos/?eufemia-theme=sbanken')
  await waitForApp(page)

  const sbanken = page.getByRole('radio', { name: 'Sbanken', exact: true })
  await expect(sbanken).toHaveValue('sbanken')
  await expect(sbanken).toBeChecked()
  expect(hydrationErrors).toEqual([])
})

test('should enable Coconut from the URL without offering it in settings', async ({
  page,
}) => {
  await page.goto('/web/components/overview?eufemia-theme=coconut')
  await waitForApp(page)

  await expect(page.locator('body')).toHaveClass(/eufemia-theme__coconut/)

  const coconutLink = page.locator('link[data-eufemia-theme="coconut"]')
  await expect(coconutLink).toHaveCount(1)
  await expect
    .poll(() => coconutLink.evaluate((el: HTMLLinkElement) => el.disabled))
    .toBe(false)

  await page.locator('#portal-tools').click()
  const brands = page
    .getByRole('dialog', { name: 'Settings' })
    .getByRole('radiogroup')
    .filter({ has: page.getByRole('radio', { name: 'DNB', exact: true }) })
  await expect(brands.locator('.dnb-chip__text')).toHaveText([
    'DNB',
    'Sbanken',
    'DNB Eiendom',
    'DNB Carnegie',
  ])
  const dnb = brands.getByRole('radio', { name: 'DNB', exact: true })
  await expect(dnb).toBeFocused()
  await expect(dnb).not.toBeChecked()

  await page.evaluate(() => {
    const theme = JSON.parse(localStorage.getItem('eufemia-theme'))
    localStorage.setItem(
      'eufemia-theme',
      JSON.stringify({ ...theme, colorScheme: 'dark' })
    )
  })
  await page.reload()
  await waitForApp(page)
  await expect(page.locator('body')).toHaveClass(/eufemia-theme__coconut/)
  await expect(page.locator('body')).toHaveClass(
    /eufemia-theme__color-scheme--dark/
  )

  await page.locator('#portal-tools').click()
  await brands.getByRole('radio', { name: 'DNB', exact: true }).click()
  await expect(page.locator('body')).toHaveClass(/eufemia-theme__ui/)
  await expect(page.locator('body')).not.toHaveClass(
    /eufemia-theme__coconut/
  )
  await expect
    .poll(() => coconutLink.evaluate((el: HTMLLinkElement) => el.disabled))
    .toBe(true)
})

test.describe('Dark mode', () => {
  const url = '/web/components/'

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
