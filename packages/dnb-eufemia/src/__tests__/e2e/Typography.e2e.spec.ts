import type { Page } from '@playwright/test'
import { test, expect } from '@playwright/test'

async function clearStorage(page: Page) {
  await page.evaluate(() => window.localStorage.clear())
  await page.evaluate(() => window.sessionStorage.clear())
}

test.afterEach(async ({ page }) => {
  await clearStorage(page)
})

for (const width of [390, 1024]) {
  for (const theme of ['ui', 'sbanken']) {
    test(
      'Native typography for ' +
        theme +
        ' at ' +
        width +
        'px keeps controls and portals scoped',
      async ({ page }) => {
        await page.setViewportSize({ width, height: 900 })
        if (theme === 'ui') {
          await page.goto(
            '/uilib/typography/font-size/?data-visual-test&eufemia-theme=ui#typography-for-native-app-pages'
          )
        } else {
          await page.goto(
            '/uilib/typography/font-size/?data-visual-test&eufemia-theme=sbanken#typography-for-native-app-pages'
          )
        }
        const example = page.locator(
          '[data-visual-test="native-typography"]'
        )
        const toggle = example.getByRole('switch', {
          name: 'Use native app font size',
        })
        const button = example.getByRole('button', {
          name: 'Continue',
          exact: true,
        })
        const input = example.getByRole('textbox', { name: 'Amount' })
        const nativeText = example.getByTestId('native-typography-text')
        const webText = example.getByTestId('web-typography-text')
        const outsideText = example.getByTestId('outside-typography')
        const html = page.locator('html')
        const nativeSize = theme === 'sbanken' ? '16px' : '17px'
        await expect(html).toHaveAttribute('data-portal-ready', 'true')
        await page.evaluate(() => document.fonts.ready)
        const htmlClasses = await html.getAttribute('class')

        await expect(toggle).toBeChecked()
        await expect(nativeText).toHaveCSS('font-size', nativeSize)
        await expect(button.locator('.dnb-button__text')).toHaveCSS(
          'font-size',
          nativeSize
        )
        await expect(button).toHaveCSS('height', '40px')
        await expect(input).toHaveCSS('font-size', nativeSize)
        await expect(input).toHaveCSS('height', '40px')
        await expect(webText).toHaveCSS('font-size', '18px')
        await expect(outsideText).toHaveCSS('font-size', '18px')
        await input.fill('1250')
        await expect(input).toHaveValue('1250')
        await button.click()

        await example.getByRole('button', { name: 'Open dialog' }).click()
        const dialog = page.getByRole('dialog', {
          name: 'Native app font size in a dialog',
        })
        await expect(
          dialog.getByTestId('dialog-typography-text')
        ).toHaveCSS('font-size', nativeSize)
        await expect(
          dialog.getByTestId('dialog-web-typography-text')
        ).toHaveCSS('font-size', '18px')
        await expect(example.getByRole('dialog')).toHaveCount(0)
        const dialogToggle = dialog.getByRole('switch', {
          name: 'Use native app font size in dialog',
        })
        await dialogToggle.uncheck()
        await expect(
          dialog.getByTestId('dialog-typography-text')
        ).toHaveCSS('font-size', '18px')
        await expect(nativeText).toHaveCSS('font-size', '18px')
        await dialogToggle.check()
        await expect(
          dialog.getByTestId('dialog-typography-text')
        ).toHaveCSS('font-size', nativeSize)
        await expect(
          dialog.getByTestId('dialog-web-typography-text')
        ).toHaveCSS('font-size', '18px')
        await page.keyboard.press('Escape')
        await expect(dialog).toBeHidden()

        await toggle.uncheck()
        await expect(nativeText).toHaveCSS('font-size', '18px')
        await expect(button.locator('.dnb-button__text')).toHaveCSS(
          'font-size',
          '18px'
        )
        await expect(input).toHaveCSS('height', '40px')
        await expect(html).toHaveAttribute('class', htmlClasses)

        await example.getByRole('button', { name: 'Open dialog' }).click()
        await expect(
          dialog.getByTestId('dialog-typography-text')
        ).toHaveCSS('font-size', '18px')
        await page.keyboard.press('Escape')
        await toggle.check()
        await expect(nativeText).toHaveCSS('font-size', nativeSize)
        await expect(webText).toHaveCSS('font-size', '18px')
        await expect(outsideText).toHaveCSS('font-size', '18px')
        await expect(html).toHaveAttribute('class', htmlClasses)
      }
    )
  }
}

test.describe('Typography for UI', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(
      '/quickguide-designer/fonts/?data-visual-test&eufemia-theme=ui'
    )

    // Check if app is mounted
    await page.waitForSelector('#root', {
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
      expect(paragraphs).toHaveLength(0)
    }
  })
})

test.describe('Typography for Sbanken', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(
      '/quickguide-designer/fonts/?data-visual-test&eufemia-theme=sbanken'
    )

    // Check if app is mounted (Vite uses #root)
    await page.waitForSelector('#root', {
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
    await expect(element).toHaveCSS('font-size', '34px')
  })

  test('docs should include heading large example with correct font-size', async ({
    page,
  }) => {
    await page.waitForSelector('h2', { state: 'attached' })
    const element = page.locator('.typography-box > h4.dnb-h--large')
    await expect(element).toHaveCSS('font-size', '26px')
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
      expect(paragraphs).toHaveLength(0)
    }
  })
})
