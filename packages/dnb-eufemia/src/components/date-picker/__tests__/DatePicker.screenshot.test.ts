import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/playwright/screenshotSetup'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`DatePicker for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/date-picker/visual-tests/',
    })

    test('have to match the input fields', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="date-picker-input"] .dnb-date-picker__inner',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the date-picker with input in error state', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="date-picker-input-error"] .dnb-date-picker__inner',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the sizes', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="date-picker-sizes"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the disabled states', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="date-picker-disabled"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the calendar in range mode', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="date-picker-calendar-range"] ',
        withWrapper: false,
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the date-picker trigger button', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="date-picker-trigger-default"] .dnb-date-picker__inner',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the date-picker trigger button in error state', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="date-picker-trigger-error"] .dnb-date-picker__inner',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match label alignment right', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="date-picker-label-alignment-right"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match label alignment right with button', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="date-picker-with-button-label-alignment-right"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match calendar view when aligning picker right', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="date-picker-align-picker-right"]',
        withWrapper: false,
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match calendar view when aligning picker right with input', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="date-picker-align-picker-right-with-input"]',
        withWrapper: false,
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match calendar view with year navigation', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="date-picker-year-navigation"]',
        withWrapper: false,
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match month only calendar', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="date-picker-only-month"]',
        withWrapper: false,
      })
      expect(screenshot).toMatchSnapshot()
    })
  })
}
