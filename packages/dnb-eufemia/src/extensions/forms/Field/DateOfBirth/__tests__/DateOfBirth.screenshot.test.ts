import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

const url = '/uilib/extensions/forms/feature-fields/DateOfBirth/demos/'

for (const themeName of ['ui']) {
  test.describe(`DateOfBirth for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url,
    })

    test('have to match default', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="date-of-birth-default"]',
      })
    })

    test('have to match label and value', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="date-of-birth-label-and-value"]',
      })
    })

    test('have to match with help', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="date-of-birth-help"]',
      })
    })

    test('have to match with disabled', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="date-of-birth-disabled"]',
      })
    })

    test('have to match with error', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="date-of-birth-error"]',
      })
    })

    test('have to match widths', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="date-of-birth-width"]',
      })
    })
  })
}
