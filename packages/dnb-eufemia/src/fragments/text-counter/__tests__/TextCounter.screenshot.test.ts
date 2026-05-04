import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/playwright/screenshotSetup'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`TextCounter for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/fragments/text-counter/demos/',
    })

    test('have to character counter downwards', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="text-counter-down"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to character counter upwards', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="text-counter-up"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to character counter exceeded', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="text-counter-exceeded"]',
      })
      expect(screenshot).toMatchSnapshot()
    })
  })
}
