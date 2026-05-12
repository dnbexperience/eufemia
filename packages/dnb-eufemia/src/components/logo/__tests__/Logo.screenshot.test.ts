import {
  test,
  expect,
  loadImage,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Logo for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/logo/demos/',
    })

    test('have to match all logos', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="logo-all"]',
      })
    })

    test('have to match the default "Logo"', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="logo-default"]',
      })
    })

    test('have to match the auto sized "Logo"', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="logo-auto-size"]',
      })
    })

    test('have to match the inherited sized "Logo"', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="logo-inherit-size"]',
      })
    })

    test('have to match the inherited color', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="logo-color"]',
      })
    })

    test('have to match the fixed size', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="logo-fixed"]',
      })
    })
  })
}

for (const themeName of ['ui', 'sbanken', 'eiendom', 'carnegie']) {
  test.describe(`Logo for ${themeName}`, () => {
    setupPageScreenshot({ themeName, url: '/uilib/components/logo/demos' })

    test('have to match the theme', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="logo-theme-change"]',
        screenshotSelector:
          '[data-visual-test="logo-theme-change"] .dnb-logo',
      })
    })

    test('aligns with text', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="logo-in-text"]',
      })
    })
  })
}

test.describe('png image', () => {
  test('have to match image snapshot', async () => {
    // The path is resolved server-side; we hand it a path
    // relative to the eufemia package root.
    const image = await loadImage(
      'assets/images/dnb/dnb-logo.png'
    )
    await expect(image).toMatchImageSnapshot()
  })
})
