import path from 'path'
import {
  test,
  expect,
  loadImage,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/playwright/screenshotSetup'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Logo for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/logo/demos/',
    })

    test('have to match all logos', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="logo-all"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the default "Logo"', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="logo-default"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the auto sized "Logo"', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="logo-auto-size"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the inherited sized "Logo"', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="logo-inherit-size"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the inherited color', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="logo-color"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the fixed size', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="logo-fixed"]',
      })
      expect(screenshot).toMatchSnapshot()
    })
  })
}

for (const themeName of ['ui', 'sbanken', 'eiendom', 'carnegie']) {
  test.describe(`Logo for ${themeName}`, () => {
    setupPageScreenshot({ themeName, url: '/uilib/components/logo/demos' })

    test('have to match the theme', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="logo-theme-change"]',
        screenshotSelector:
          '[data-visual-test="logo-theme-change"] .dnb-logo',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('aligns with text', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="logo-in-text"]',
      })
      expect(screenshot).toMatchSnapshot()
    })
  })
}

test.describe('png image', () => {
  test('have to match image snapshot', async () => {
    const image = await loadImage(
      path.resolve(__dirname, '../../../../assets/images/dnb/dnb-logo.png')
    )
    expect(image).toMatchSnapshot()
  })
})
