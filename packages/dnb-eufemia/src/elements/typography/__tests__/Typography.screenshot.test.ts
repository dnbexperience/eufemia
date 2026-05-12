import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

for (const themeName of ['ui', 'sbanken', 'eiendom', 'carnegie']) {
  test.describe(`Typography for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/typography/',
    })

    test('have to match all the typography variants', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="typography-variants"]',
      })
    })
  })
}

for (const themeName of ['sbanken']) {
  test.describe(`Typography mobile for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/typography/',
      pageViewport: {
        width: 400,
      },
    })

    test('have to match all the typography variants', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="typography-variants"]',
      })
    })
  })
}
