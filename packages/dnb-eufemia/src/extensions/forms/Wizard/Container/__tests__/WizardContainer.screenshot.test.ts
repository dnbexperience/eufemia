import { makeScreenshot } from '../../../../../core/jest/jestSetupScreenshots'

describe('Wizard.Container', () => {
  const url =
    '/uilib/extensions/forms/extended-features/Wizard/Container/demos'
  it('have to match border', async () => {
    const screenshot = await makeScreenshot({
      url,
      pageViewport: {
        width: 700,
      },
      selector:
        '[data-visual-test="wizard-layout-card-border"] .dnb-forms-wizard-layout__contents',
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
      selector: '[data-visual-test="wizard-layout-card-border"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match small screen', async () => {
    const screenshot = await makeScreenshot({
      url,
      pageViewport: {
        width: 400,
      },
      selector: '[data-visual-test="wizard-layout-card-border"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
