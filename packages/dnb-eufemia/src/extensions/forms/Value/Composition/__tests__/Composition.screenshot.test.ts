import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/jest/jestSetupScreenshots'

describe('Form.Composition', () => {
  setupPageScreenshot({
    url: '/uilib/extensions/forms/Value/Composition/demos/',
  })

  it('have to match default layout', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="forms-value-composition-default"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match summary-list grid layout', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="forms-value-composition-summary-list-grid"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match summary-list combined layout', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="forms-value-composition-summary-list-combined"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
