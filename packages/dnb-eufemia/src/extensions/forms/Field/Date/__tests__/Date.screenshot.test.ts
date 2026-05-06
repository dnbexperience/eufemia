import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/playwright/screenshotSetup'

const url = '/uilib/extensions/forms/feature-fields/Date/demos/'

for (const themeName of ['ui']) {
  test.describe(`Date for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url,
    })

    test('have to match with a label', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="date-label"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match with a horizontal layout', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="date-horizontal-layout"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match with an error', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="date-error"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match width', async () => {
      const screenshot = await makeScreenshot({
        style: { width: '30rem' },
        selector: '[data-visual-test="date-width"]',
      })
      expect(screenshot).toMatchSnapshot()
    })
  })
}
