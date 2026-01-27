import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/jest/jestSetupScreenshots'

describe('Value.Composition', () => {
  setupPageScreenshot({
    url: '/uilib/extensions/forms/Value/Composition/demos/',
  })

  it('should match forms-value-composition-default', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="forms-value-composition-default"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match forms-value-composition-summary-list', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="forms-value-composition-summary-list"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match forms-value-composition-summary-list-combined', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="forms-value-composition-summary-list-combined"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match forms-value-composition-help', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="forms-value-composition-help"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match forms-value-composition-wrapping', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="forms-value-composition-wrapping"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match forms-value-composition-summary-list-grid', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="forms-value-composition-summary-list-grid"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  describe('small', () => {
    setupPageScreenshot({
      url: '/uilib/extensions/forms/Value/Composition/demos/',
      pageViewport: {
        width: 600,
      },
    })

    it('should match forms-value-composition-summary-list', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="forms-value-composition-summary-list"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('should match forms-value-composition-summary-list-grid', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="forms-value-composition-summary-list-grid"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  })

  describe('x-small', () => {
    setupPageScreenshot({
      url: '/uilib/extensions/forms/Value/Composition/demos/',
      pageViewport: {
        width: 400,
      },
    })

    it('should match forms-value-composition-summary-list-grid', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="forms-value-composition-summary-list-grid"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  })
})
