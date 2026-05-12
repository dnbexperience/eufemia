import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

const url = '/uilib/extensions/forms/base-fields/Composition/demos/'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Composition for ${themeName}`, () => {
    setupPageScreenshot({
      url,
      themeName,
    })

    test('have to match composition', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="forms-field-block-composition"]',
      })
    })

    test('have to match composition with label', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="forms-field-block-composition-with-label"]',
      })
    })

    test('have to match composition with help button', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="forms-field-block-composition-with-help-button"]',
      })
    })

    test('have to match composition alignment', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="forms-field-block-composition-alignment"]',
      })
    })

    test('have to match composition wrapping', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="forms-field-block-composition-wrapping"]',
      })
    })

    test('have to match composition medium screen', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="forms-field-block-composition-statuses"]',
      })
    })

    test('have to match composition small screen', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="forms-field-block-composition-error"]',
      })
    })
  })
}
