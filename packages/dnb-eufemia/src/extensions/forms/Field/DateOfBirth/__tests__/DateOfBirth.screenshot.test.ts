import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/playwright/screenshotSetup'

const url = '/uilib/extensions/forms/feature-fields/DateOfBirth/demos/'

for (const themeName of ['ui']) {
  test.describe(`DateOfBirth for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url,
    })

    test('have to match default', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="date-of-birth-default"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match label and value', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="date-of-birth-label-and-value"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match with help', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="date-of-birth-help"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match with disabled', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="date-of-birth-disabled"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match with error', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="date-of-birth-error"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match widths', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="date-of-birth-width"]',
      })
      expect(screenshot).toMatchSnapshot()
    })
  })
}
