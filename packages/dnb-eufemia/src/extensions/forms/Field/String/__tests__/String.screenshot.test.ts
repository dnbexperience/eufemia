import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/playwright/screenshotSetup'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`String field for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/extensions/forms/base-fields/String/demos/',
    })

    test('have to match widths', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="string-widths"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match multiple errors', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="multiple-errors"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('matches horizontal layout', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="string-horizontal-layout"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('matches status messages', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="string-status"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('matches with label description', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="string-label-description"]',
      })
      expect(screenshot).toMatchSnapshot()
    })
  })
}
