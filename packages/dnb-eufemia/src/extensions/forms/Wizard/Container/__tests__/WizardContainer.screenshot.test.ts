import { makeScreenshot } from '../../../../../core/jest/jestSetupScreenshots'

describe('Wizard.Container', () => {
  const url = '/uilib/extensions/forms/Wizard/Container/demos'
  it('should match border', async () => {
    const screenshot = await makeScreenshot({
      url,
      pageViewport: {
        width: 700,
      },
      wrapperStyle: {
        'padding-left': '2.5rem',
        'padding-right': '2.5rem',
      },
      selector:
        '[data-visual-test="wizard-layout-card-border"] .dnb-forms-wizard-layout__contents',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match large screen', async () => {
    const screenshot = await makeScreenshot({
      url,
      pageViewport: {
        width: 980,
      },
      addWrapper: false, // because it destroys the media query handling
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="wizard-layout-card-border"] .dnb-step-indicator__trigger__button',
      selector: '[data-visual-test="wizard-layout-card-border"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match small screen', async () => {
    const screenshot = await makeScreenshot({
      url,
      pageViewport: {
        width: 400,
      },
      selector: '[data-visual-test="wizard-layout-card-border"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match container with status message in menu', async () => {
    const screenshot = await makeScreenshot({
      url,
      pageViewport: {
        width: 980,
      },
      simulateSelector:
        '[data-visual-test="wizard-with-status-message-in-menu"] .dnb-forms-submit-button',
      simulate: 'click',
      recalculateHeightAfterSimulate: true,
      selector: '[data-visual-test="wizard-with-status-message-in-menu"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match container with status message', async () => {
    const screenshot = await makeScreenshot({
      url,
      pageViewport: {
        width: 980,
      },
      simulateSelector:
        '[data-visual-test="wizard-with-status-message"] .dnb-forms-next-button',
      simulate: 'click',
      recalculateHeightAfterSimulate: true,
      selector: '[data-visual-test="wizard-with-status-message"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match container with status message on a small screen', async () => {
    const screenshot = await makeScreenshot({
      url,
      pageViewport: {
        width: 400,
      },
      simulateSelector:
        '[data-visual-test="wizard-with-status-message"] .dnb-forms-next-button',
      simulate: 'click',
      recalculateHeightAfterSimulate: true,
      selector: '[data-visual-test="wizard-with-status-message"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should behave like nested card with Provider on a large screen', async () => {
    const screenshot = await makeScreenshot({
      url,
      pageViewport: {
        width: 980,
      },
      selector: '[data-visual-test="wizard-outset"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should behave like nested card with Provider on a small screen', async () => {
    const screenshot = await makeScreenshot({
      url,
      pageViewport: {
        width: 400,
      },
      selector: '[data-visual-test="wizard-outset"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
