import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../core/jest/jestSetupScreenshots'

describe('StepsLayout', () => {
  setupPageScreenshot({
    url: '/uilib/extensions/forms/extended-features/StepsLayout/StepsLayout/demos',
  })

  it('have to match border', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="steps-layout-card-border"] .dnb-forms-steps-layout__contents',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
