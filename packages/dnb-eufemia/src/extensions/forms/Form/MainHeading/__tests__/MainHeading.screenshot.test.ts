import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/jest/jestSetupScreenshots'

describe('Form.MainHeading', () => {
  setupPageScreenshot({
    url: '/uilib/extensions/forms/extended-features/Form/MainHeading/demos',
  })

  it('have to match over stack', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="layout-main-heading-over-stack"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match over card', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="layout-main-heading-over-card"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
