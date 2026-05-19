import { it, describe } from 'vitest'
import { makeScreenshot } from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

describe('Wizard.Container', () => {
  const url = '/uilib/extensions/forms/Wizard/Container/demos/'
  it('have to match border', async () => {
    await makeScreenshot({
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
  })

  it('have to match large screen', async () => {
    await makeScreenshot({
      url,
      pageViewport: {
        width: 980,
      },
      withWrapper: false, // because it destroys the media query handling
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="wizard-layout-card-border"] .dnb-step-indicator__trigger__button',
      selector: '[data-visual-test="wizard-layout-card-border"]',
    })
  })

  it('have to match small screen', async () => {
    await makeScreenshot({
      url,
      pageViewport: {
        width: 400,
      },
      selector: '[data-visual-test="wizard-layout-card-border"]',
    })
  })

  it('have to match container with status message in menu', async () => {
    await makeScreenshot({
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
  })

  it('have to match container with status message', async () => {
    await makeScreenshot({
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
  })

  it('have to match container with status message on a small screen', async () => {
    await makeScreenshot({
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
  })
})
