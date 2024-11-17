import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/jest/jestSetupScreenshots'

describe('Form.SubHeading', () => {
  setupPageScreenshot({
    url: '/uilib/extensions/forms/Form/SubHeading/demos',
  })

  it('have to match above card', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="layout-sub-heading-above-card"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match inside card', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="layout-sub-heading-inside-card"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match below main heading', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="layout-sub-heading-below-main"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match help button', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="layout-sub-heading-help-button"]',
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="layout-sub-heading-help-button"] .dnb-help-button',
      recalculateHeightAfterSimulate: true,
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
