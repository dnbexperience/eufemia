import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

const url =
  '/uilib/extensions/forms/feature-fields/PostalCodeAndCity/demos/'

for (const themeName of ['ui']) {
  test.describe(`PostalCodeAndCity for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url,
    })

    test('have to match with a label', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="postal-code-and-city-label"]',
      })
    })

    test('have to match with error', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="postal-code-and-city-error"]',
      })
    })
  })
}

test.describe('PostalCodeAndCity', () => {
  test('have to match medium screen', async () => {
    await makeScreenshot({
      url,
      pageViewport: {
        width: 600,
      },
      selector: '[data-visual-test="postal-code-and-city-label"]',
    })
  })

  test('have to match small screen', async () => {
    await makeScreenshot({
      url,
      pageViewport: {
        width: 300,
      },
      selector: '[data-visual-test="postal-code-and-city-label"]',
    })
  })

  test('have to match long label', async () => {
    await makeScreenshot({
      url,
      selector: '[data-visual-test="postal-code-and-city-long-label"]',
    })
  })
})
