import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`String field for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/extensions/forms/base-fields/String/demos/',
    })

    test('have to match widths', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="string-widths"]',
      })
    })

    test('have to match multiple errors', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="multiple-errors"]',
      })
    })

    test('matches horizontal layout', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="string-horizontal-layout"]',
      })
    })

    test('matches status messages', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="string-status"]',
      })
    })

    test('matches with label description', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="string-label-description"]',
      })
    })
  })
}
