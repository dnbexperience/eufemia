import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/playwright/screenshotSetup'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`GlobalError for ${themeName}`, () => {
    const pageViewport = {
      width: 400,
    }

    setupPageScreenshot({
      themeName,
      pageViewport,
      url: '/uilib/components/global-error/demos/',
    })

    test('have to match the 404 status', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="global-error-404"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the 500 status', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="global-error-500"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the custom status', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="global-error-custom"]',
      })
      expect(screenshot).toMatchSnapshot()
    })
  })
}
