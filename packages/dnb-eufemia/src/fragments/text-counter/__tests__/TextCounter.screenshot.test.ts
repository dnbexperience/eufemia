import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`TextCounter for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/fragments/text-counter/demos/',
    })

    test('have to character counter downwards', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="text-counter-down"]',
      })
    })

    test('have to character counter upwards', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="text-counter-up"]',
      })
    })

    test('have to character counter exceeded', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="text-counter-exceeded"]',
      })
    })
  })
}
