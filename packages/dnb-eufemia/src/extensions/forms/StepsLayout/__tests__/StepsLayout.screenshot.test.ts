import { makeScreenshot } from '../../../../core/jest/jestSetupScreenshots'

describe('StepsLayout', () => {
  const url =
    '/uilib/extensions/forms/extended-features/StepsLayout/StepsLayout/demos'
  it('have to match border', async () => {
    const screenshot = await makeScreenshot({
      url,
      selector:
        '[data-visual-test="steps-layout-card-border"] .dnb-forms-steps-layout__contents',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match large screen', async () => {
    const screenshot = await makeScreenshot({
      url,
      pageViewport: {
        width: 980,
      },
      addWrapper: false, // because it destroys the media query handling
      selector: '[data-visual-test="steps-layout-card-border"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match small screen', async () => {
    const screenshot = await makeScreenshot({
      url,
      pageViewport: {
        width: 400,
      },
      selector: '[data-visual-test="steps-layout-card-border"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
