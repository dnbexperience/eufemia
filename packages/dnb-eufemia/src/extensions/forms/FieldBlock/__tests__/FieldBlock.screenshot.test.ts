import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../core/playwright/screenshotSetup'

const url = '/uilib/extensions/forms/create-component/FieldBlock/demos/'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`FieldBlock for ${themeName}`, () => {
    setupPageScreenshot({
      url,
      themeName,
    })

    test('have to match widths', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="forms-field-block-widths"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match label size', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="forms-field-block-label-size"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match label description', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="forms-field-block-label-description"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match label description without label', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="forms-field-block-label-description-no-label"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match combined statuses', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="forms-field-block-combined-errors"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match status position above', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="forms-field-block-status-position-above"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match vertical help-button', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="forms-field-block-help-button-vertical-label"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match horizontal help-button', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="forms-field-block-help-button-horizontal-label"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match help-button in composition fields', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="forms-field-block-help-button-composition-fields"]',
        style: { width: '30rem' },
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match label description help-button', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="forms-field-block-help-button-label-description"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match label description help-button without label', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="forms-field-block-help-button-label-description-no-label"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match description help-button', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="forms-field-block-help-button-vertical-label-description"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match help-button with HTML', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="forms-field-block-help-button-html"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match horizontal wrap', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="forms-field-block-horizontal-wrap"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match wrapping', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="forms-field-block-wrapping"]',
      })
      expect(screenshot).toMatchSnapshot()
    })
    test('have to match wrapping label description', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="forms-field-block-wrapping-label-description"]',
      })
      expect(screenshot).toMatchSnapshot()
    })
  })
}
