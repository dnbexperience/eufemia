import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../core/vitest-screenshots/setupVitestScreenshots'

const url = '/uilib/extensions/forms/create-component/ValueBlock/demos/'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`ValueBlock for ${themeName}`, () => {
    setupPageScreenshot({
      url,
      themeName,
    })

    test('have to match inline value', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="value-block-inline"]',
      })
    })

    test('have to match help button', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="value-block-help-button"]',
      })
    })

    test('have to match help button with html', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="value-block-help-button-html"]',
      })
    })

    test('have to match widths', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="forms-value-block-widths"]',
      })
    })

    test('have to match wrapping', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="forms-value-block-wrapping"]',
      })
    })
  })
}
