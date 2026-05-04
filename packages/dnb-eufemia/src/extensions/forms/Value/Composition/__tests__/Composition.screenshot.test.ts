import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/playwright/screenshotSetup'

test.describe('Value.Composition', () => {
  setupPageScreenshot({
    url: '/uilib/extensions/forms/Value/Composition/demos/',
  })

  test('have to match forms-value-composition-default', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="forms-value-composition-default"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match forms-value-composition-summary-list', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="forms-value-composition-summary-list"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match forms-value-composition-summary-list-combined', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="forms-value-composition-summary-list-combined"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match forms-value-composition-help', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="forms-value-composition-help"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match forms-value-composition-wrapping', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="forms-value-composition-wrapping"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match forms-value-composition-summary-list-grid', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="forms-value-composition-summary-list-grid"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test.describe('small', () => {
    setupPageScreenshot({
      url: '/uilib/extensions/forms/Value/Composition/demos/',
      pageViewport: {
        width: 600,
      },
    })

    test('have to match forms-value-composition-summary-list', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="forms-value-composition-summary-list"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match forms-value-composition-summary-list-grid', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="forms-value-composition-summary-list-grid"]',
      })
      expect(screenshot).toMatchSnapshot()
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
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="forms-value-composition-summary-list-grid"]',
      })
      expect(screenshot).toMatchSnapshot()
    })
  })
})
