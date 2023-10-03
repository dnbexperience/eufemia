import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../core/jest/jestSetupScreenshots'

describe('Form.SubHeading', () => {
  setupPageScreenshot({
    url: '/uilib/extensions/forms/extended-features/Form/SubHeading/demos',
  })

  it('have to match over card', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="layout-sub-heading-over-card"]',
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
})
