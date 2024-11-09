import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/jest/jestSetupScreenshots'

describe('Form.MainHeading', () => {
  setupPageScreenshot({
    url: '/uilib/extensions/forms/Form/MainHeading/demos',
  })

  it('have to match over stack', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="layout-main-heading-over-stack"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match over card', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="layout-main-heading-preceding-card"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match help button', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="layout-main-heading-help-button"]',
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="layout-main-heading-help-button"] .dnb-help-button',
      recalculateHeightAfterSimulate: true,
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
