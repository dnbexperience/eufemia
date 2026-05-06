import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/playwright/screenshotSetup'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Span for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/elements/span/demos/',
    })

    test('basics', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="span-basic"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('with modifiers', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="span-modifiers"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('all sizes and weights', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="span-sizes"]',
      })
      expect(screenshot).toMatchSnapshot()
    })
  })
}
