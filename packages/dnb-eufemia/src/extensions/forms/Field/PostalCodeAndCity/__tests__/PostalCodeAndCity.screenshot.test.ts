import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/playwright/screenshotSetup'

const url =
  '/uilib/extensions/forms/feature-fields/PostalCodeAndCity/demos/'

for (const themeName of ['ui']) {
  test.describe(`PostalCodeAndCity for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url,
    })

    test('have to match with a label', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="postal-code-and-city-label"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match with error', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="postal-code-and-city-error"]',
      })
      expect(screenshot).toMatchSnapshot()
    })
  })
}

test.describe('PostalCodeAndCity', () => {
  test('have to match medium screen', async () => {
    const screenshot = await makeScreenshot({
      url,
      pageViewport: {
        width: 600,
      },
      selector: '[data-visual-test="postal-code-and-city-label"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match small screen', async () => {
    const screenshot = await makeScreenshot({
      url,
      pageViewport: {
        width: 300,
      },
      selector: '[data-visual-test="postal-code-and-city-label"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match long label', async () => {
    const screenshot = await makeScreenshot({
      url,
      selector: '[data-visual-test="postal-code-and-city-long-label"]',
    })
    expect(screenshot).toMatchSnapshot()
  })
})
