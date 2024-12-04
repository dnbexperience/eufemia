import { test, expect, Page } from '@playwright/test'

async function clearStorage(page: Page) {
  await page.evaluate(() => window.localStorage.clear())
  await page.evaluate(() => window.sessionStorage.clear())
}

test.afterEach(async ({ page }) => {
  await clearStorage(page)
})

test.describe('Typography for UI', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(
      '/quickguide-designer/fonts?data-visual-test&eufemia-theme=ui'
    )

    // Check if app is mounted
    await page.waitForSelector('#dnb-drawer-list__portal', {
      state: 'attached',
    })
  })

  test('docs should include heading xx-large example with correct font-size', async ({
    page,
  }) => {
    await page.waitForSelector('h2', { state: 'attached' })
    const element = page.locator('.typography-box > .dnb-h--xx-large')
    await expect(element).toHaveCSS('font-size', '48px')
  })

  test('docs should include heading x-large example with correct font-size', async ({
    page,
  }) => {
    await page.waitForSelector('h2', { state: 'attached' })
    const element = page.locator('.typography-box > .dnb-h--x-large')
    await expect(element).toHaveCSS('font-size', '34px')
  })

  test('docs should include heading large example with correct font-size', async ({
    page,
  }) => {
    await page.waitForSelector('h2', { state: 'attached' })
    const element = page.locator('.typography-box > .dnb-h--large')
    await expect(element).toHaveCSS('font-size', '26px')
  })

  test('examples should have correct color', async ({ page }) => {
    const color = 'rgb(51, 51, 51)'
    await page.waitForSelector('.typography-box', { state: 'attached' })

    const elements = page.locator('.typography-box > *').all()
    for (const element of await elements) {
      await expect(element).toHaveCSS('color', color)
    }
  })

  test('line-height examples should have correct line-height', async ({
    page,
  }) => {
    const lineHeights = {
      '.lh-12': '12px',
      '.lh-16': '16px',
      '.lh-20': '20px',
      '.lh-24': '24px',
      '.lh-28': '28px',
      '.lh-32': '32px',
    }
    await page.waitForSelector('.typography-box', { state: 'attached' })
    for (const selector in lineHeights) {
      const lineHeight = lineHeights[selector]
      const element = page.locator(selector)
      await expect(element).toHaveCSS('line-height', lineHeight)
    }
  })

  test('bold text should have correct font-weight', async ({ page }) => {
    await page.waitForSelector('.typography-box > .dnb-t__weight--bold', {
      state: 'attached',
    })
    const element = page
      .locator('.typography-box > .dnb-t__weight--bold')
      .first()
    await expect(element).toHaveCSS('font-weight', '600')
  })

  test('examples should not have paragraphs inside headings', async ({
    page,
  }) => {
    await page.waitForSelector('.typography-box', { state: 'attached' })
    const headings = await page.$$('.typography-box *[class^="dnb-h--"]')
    for (const heading of headings) {
      const paragraphs = await heading.$$('.dnb-p')
      expect(paragraphs.length).toBe(0)
    }
  })
})

test.describe('Typography for Sbanken', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(
      '/quickguide-designer/fonts?data-visual-test&eufemia-theme=sbanken'
    )

    // Check if app is mounted
    await page.waitForSelector('#dnb-drawer-list__portal', {
      state: 'attached',
    })
  })

  test('docs should include heading xx-large example with correct font-size', async ({
    page,
  }) => {
    await page.waitForSelector('h2', { state: 'attached' })
    const element = page.locator('.typography-box > h1.dnb-h--xx-large')
    await expect(element).toHaveCSS('font-size', '48px')
  })

  test('docs should include heading x-large example with correct font-size', async ({
    page,
  }) => {
    await page.waitForSelector('h2', { state: 'attached' })
    const element = page.locator('.typography-box > h4.dnb-h--x-large')
    await expect(element).toHaveCSS('font-size', '38px')
  })

  test('docs should include heading large example with correct font-size', async ({
    page,
  }) => {
    await page.waitForSelector('h2', { state: 'attached' })
    const element = page.locator('.typography-box > h4.dnb-h--large')
    await expect(element).toHaveCSS('font-size', '32px')
  })

  test('examples should have correct color', async ({ page }) => {
    const color = 'rgb(24, 23, 42)'
    await page.waitForSelector('.typography-box', { state: 'attached' })

    const elements = page.locator('.typography-box > *').all()
    for (const element of await elements) {
      await expect(element).toHaveCSS('color', color)
    }
  })

  test('line-height examples should have correct line-height', async ({
    page,
  }) => {
    const lineHeights = {
      '.lh-12': '12px',
      '.lh-16': '16px',
      '.lh-20': '20px',
      '.lh-24': '24px',
      '.lh-28': '28px',
      '.lh-32': '32px',
    }
    await page.waitForSelector('.typography-box', { state: 'attached' })
    for (const selector in lineHeights) {
      const lineHeight = lineHeights[selector]
      const element = page.locator(selector)
      await expect(element).toHaveCSS('line-height', lineHeight)
    }
  })

  test('bold text should have correct font-weight', async ({ page }) => {
    await page.waitForSelector(
      '.typography-box > .dnb-t__weight--medium',
      {
        state: 'attached',
      }
    )
    const element = page
      .locator('.typography-box > .dnb-t__weight--medium')
      .first()
    await expect(element).toHaveCSS('font-weight', '500')
  })

  test('examples should not have paragraphs inside headings', async ({
    page,
  }) => {
    await page.waitForSelector('.typography-box', { state: 'attached' })
    const headings = await page.$$('.typography-box *[class^="dnb-h--"]')
    for (const heading of headings) {
      const paragraphs = await heading.$$('.dnb-p')
      expect(paragraphs.length).toBe(0)
    }
  })
})
