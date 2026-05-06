import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../core/playwright/screenshotSetup'

const url = '/uilib/extensions/forms/create-component/ValueBlock/demos/'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`ValueBlock for ${themeName}`, () => {
    setupPageScreenshot({
      url,
      themeName,
    })

    test('have to match inline value', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="value-block-inline"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match help button', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="value-block-help-button"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match help button with html', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="value-block-help-button-html"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match widths', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="forms-value-block-widths"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match wrapping', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="forms-value-block-wrapping"]',
      })
      expect(screenshot).toMatchSnapshot()
    })
  })
}
