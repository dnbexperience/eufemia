import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Span for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/elements/span/demos/',
    })

    test('basics', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="span-basic"]',
      })
    })

    test('with modifiers', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="span-modifiers"]',
      })
    })

    test('all sizes and weights', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="span-sizes"]',
      })
    })
  })
}
