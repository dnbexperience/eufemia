import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

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
      await makeScreenshot({
        selector: '[data-visual-test="global-error-404"]',
      })
    })

    test('have to match the 500 status', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="global-error-500"]',
      })
    })

    test('have to match the custom status', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="global-error-custom"]',
      })
    })
  })
}
