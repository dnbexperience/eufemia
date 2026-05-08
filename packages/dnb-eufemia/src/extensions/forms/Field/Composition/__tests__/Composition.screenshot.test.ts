import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/playwright/screenshotSetup'

const url = '/uilib/extensions/forms/base-fields/Composition/demos/'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Composition for ${themeName}`, () => {
    setupPageScreenshot({
      url,
      themeName,
    })

    test('have to match composition', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="forms-field-block-composition"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match composition with label', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="forms-field-block-composition-with-label"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match composition with help button', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="forms-field-block-composition-with-help-button"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match composition alignment', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="forms-field-block-composition-alignment"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match composition wrapping', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="forms-field-block-composition-wrapping"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match composition medium screen', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="forms-field-block-composition-statuses"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match composition small screen', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="forms-field-block-composition-error"]',
      })
      expect(screenshot).toMatchSnapshot()
    })
  })
}
