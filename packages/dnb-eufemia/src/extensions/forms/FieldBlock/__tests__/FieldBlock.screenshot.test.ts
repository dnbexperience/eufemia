import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../core/vitest-screenshots/setupVitestScreenshots'

const url = '/uilib/extensions/forms/create-component/FieldBlock/demos/'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`FieldBlock for ${themeName}`, () => {
    setupPageScreenshot({
      url,
      themeName,
    })

    test('have to match widths', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="forms-field-block-widths"]',
      })
    })

    test('have to match label size', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="forms-field-block-label-size"]',
      })
    })

    test('have to match label description', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="forms-field-block-label-description"]',
      })
    })

    test('have to match label description without label', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="forms-field-block-label-description-no-label"]',
      })
    })

    test('have to match combined statuses', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="forms-field-block-combined-errors"]',
      })
    })

    test('have to match status position above', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="forms-field-block-status-position-above"]',
      })
    })

    test('have to match vertical help-button', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="forms-field-block-help-button-vertical-label"]',
      })
    })

    test('have to match horizontal help-button', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="forms-field-block-help-button-horizontal-label"]',
      })
    })

    test('have to match help-button in composition fields', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="forms-field-block-help-button-composition-fields"]',
        style: { width: '30rem' },
      })
    })

    test('have to match label description help-button', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="forms-field-block-help-button-label-description"]',
      })
    })

    test('have to match label description help-button without label', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="forms-field-block-help-button-label-description-no-label"]',
      })
    })

    test('have to match description help-button', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="forms-field-block-help-button-vertical-label-description"]',
      })
    })

    test('have to match help-button with HTML', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="forms-field-block-help-button-html"]',
      })
    })

    test('have to match horizontal wrap', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="forms-field-block-horizontal-wrap"]',
      })
    })

    test('have to match wrapping', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="forms-field-block-wrapping"]',
      })
    })
    test('have to match wrapping label description', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="forms-field-block-wrapping-label-description"]',
      })
    })
  })
}
