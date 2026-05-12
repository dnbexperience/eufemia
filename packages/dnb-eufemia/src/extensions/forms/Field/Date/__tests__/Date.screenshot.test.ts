import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

const url = '/uilib/extensions/forms/feature-fields/Date/demos/'

for (const themeName of ['ui']) {
  test.describe(`Date for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url,
    })

    test('have to match with a label', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="date-label"]',
      })
    })

    test('have to match with a horizontal layout', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="date-horizontal-layout"]',
      })
    })

    test('have to match with an error', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="date-error"]',
      })
    })

    test('have to match width', async () => {
      await makeScreenshot({
        style: { width: '30rem' },
        selector: '[data-visual-test="date-width"]',
      })
    })
  })
}
