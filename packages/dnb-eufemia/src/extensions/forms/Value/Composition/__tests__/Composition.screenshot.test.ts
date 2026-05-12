import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

test.describe('Value.Composition', () => {
  setupPageScreenshot({
    url: '/uilib/extensions/forms/Value/Composition/demos/',
  })

  test('have to match forms-value-composition-default', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="forms-value-composition-default"]',
    })
  })

  test('have to match forms-value-composition-summary-list', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="forms-value-composition-summary-list"]',
    })
  })

  test('have to match forms-value-composition-summary-list-combined', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="forms-value-composition-summary-list-combined"]',
    })
  })

  test('have to match forms-value-composition-help', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="forms-value-composition-help"]',
    })
  })

  test('have to match forms-value-composition-wrapping', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="forms-value-composition-wrapping"]',
    })
  })

  test('have to match forms-value-composition-summary-list-grid', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="forms-value-composition-summary-list-grid"]',
    })
  })

  test.describe('small', () => {
    setupPageScreenshot({
      url: '/uilib/extensions/forms/Value/Composition/demos/',
      pageViewport: {
        width: 600,
      },
    })

    test('have to match forms-value-composition-summary-list', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="forms-value-composition-summary-list"]',
      })
    })

    test('have to match forms-value-composition-summary-list-grid', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="forms-value-composition-summary-list-grid"]',
      })
    })
  })

  test.describe('x-small', () => {
    setupPageScreenshot({
      url: '/uilib/extensions/forms/Value/Composition/demos/',
      pageViewport: {
        width: 400,
      },
    })

    test('have to match forms-value-composition-summary-list-grid', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="forms-value-composition-summary-list-grid"]',
      })
    })
  })
})
