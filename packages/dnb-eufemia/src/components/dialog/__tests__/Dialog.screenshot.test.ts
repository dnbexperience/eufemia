/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe.each(['ui', 'sbanken'])('Dialog for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/dialog/demos',
    pageViewport: {
      width: 700,
      height: 600,
    },
  })

  it('should match default dialog trigger', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="dialog-default"] .dnb-modal__trigger',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match suffix dialog trigger', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="dialog-help-button"] .dnb-input',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match custom dialog trigger', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="dialog-custom-trigger"] .dnb-modal__trigger',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match the dialog help window', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="dialog-help-button"]', // only to make sure we have a valid selector
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="dialog-help-button"] button:first-of-type',
      simulateAfter: { keypress: 'Escape' },
      screenshotSelector: '.dnb-modal__content', // leave one with the background
      rootClassName: 'hide-page-content',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match a top aligned dialog', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="dialog-vertical-alignment"]', // only to make sure we have a valid selector
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="dialog-vertical-alignment"] button:first-of-type',
      simulateAfter: { keypress: 'Escape' },
      screenshotSelector: '.dnb-modal__content',
      rootClassName: 'hide-page-content',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match the dialog fullscreen window', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="dialog-fullscreen"]', // only to make sure we have a valid selector
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="dialog-fullscreen"] button:first-of-type',
      simulateAfter: { keypress: 'Escape' },
      screenshotSelector: '.dnb-modal__content .dnb-scroll-view',
      rootClassName: 'hide-page-content',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match the dialog window using custom trigger', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="dialog-custom-trigger"]', // only to make sure we have a valid selector
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="dialog-custom-trigger"] button:first-of-type',
      simulateAfter: { keypress: 'Escape' },
      screenshotSelector: '.dnb-modal__content .dnb-scroll-view',
      rootClassName: 'hide-page-content',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match the custom dialog window', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="full-dialog"]', // only to make sure we have a valid selector
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="full-dialog"] button:first-of-type',
      simulateAfter: { keypress: 'Escape' },
      screenshotSelector: '.dnb-modal__content .dnb-scroll-view',
      rootClassName: 'hide-page-content',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match the default dialog window', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="dialog-default"]', // only to make sure we have a valid selector
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="dialog-default"] button:first-of-type',
      simulateAfter: { keypress: 'Escape' },
      screenshotSelector: '.dnb-modal__content .dnb-scroll-view',
      rootClassName: 'hide-page-content',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match the default confirmation', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="dialog-confirm-default"]', // only to make sure we have a valid selector
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="dialog-confirm-default"] button:first-of-type',
      simulateAfter: { keypress: 'Escape' },
      screenshotSelector: '.dnb-modal__content .dnb-scroll-view',
      rootClassName: 'hide-page-content',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match the delete confirmation', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="dialog-confirm-delete"]', // only to make sure we have a valid selector
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="dialog-confirm-delete"] button:first-of-type',
      simulateAfter: { keypress: 'Escape' },
      screenshotSelector: '.dnb-modal__content .dnb-scroll-view',
      rootClassName: 'hide-page-content',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match the logged out confirmation', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="dialog-confirm-loggedout"]', // only to make sure we have a valid selector
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="dialog-confirm-loggedout"] button:first-of-type',
      simulateAfter: { keypress: 'Escape' },
      screenshotSelector: '.dnb-modal__content .dnb-scroll-view',
      rootClassName: 'hide-page-content',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match the cookie concent confirmation', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="dialog-confirm-cookie"]', // only to make sure we have a valid selector
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="dialog-confirm-cookie"] button:first-of-type',
      simulateAfter: { keypress: 'Escape' },
      screenshotSelector: '.dnb-modal__content .dnb-scroll-view',
      rootClassName: 'hide-page-content',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match the dialog progressindicator window', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="dialog-progress-indicator"]', // only to make sure we have a valid selector
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="dialog-progress-indicator"] button:first-of-type',
      simulateAfter: { keypress: 'Escape' },
      screenshotSelector: '.dnb-modal__content .dnb-scroll-view',
      rootClassName: 'hide-page-content',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  describe('scrollable content', () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/dialog/demos',
      pageViewport: {
        width: 400,
        height: 400,
      },
      headers: { 'User-Agent': 'iPhone OS 15' },
    })

    it('should match scrolled to top', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="dialog-scroll-content"]', // only to make sure we have a valid selector
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="dialog-scroll-content"] button:first-of-type',
        waitAfterSimulateSelector: '.dnb-scroll-view',
        simulateAfter: { keypress: 'Escape' },
        screenshotSelector: '.dnb-modal__content .dnb-scroll-view',
        rootClassName: 'hide-page-content',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('should match scrolled to bottom', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="dialog-scroll-content"]', // only to make sure we have a valid selector
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="dialog-scroll-content"] button:first-of-type',
        waitAfterSimulateSelector: '.dnb-scroll-view',
        simulateAfter: { keypress: 'Escape' },
        screenshotSelector: '.dnb-modal__content .dnb-scroll-view',
        rootClassName: ['hide-page-content', 'scroll-to-bottom'],
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  })

  describe('scrollable content in variant info', () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/dialog/demos',
      pageViewport: {
        width: 375,
        height: 667, // Set viewport size to iPhone 6 dimensions
      },
      headers: { 'User-Agent': 'iPhone OS 15' },
    })

    it('should match scrolled to top', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="dialog-scroll-content-info"]', // only to make sure we have a valid selector
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="dialog-scroll-content-info"] button:first-of-type',
        waitAfterSimulateSelector: '.dnb-scroll-view',
        simulateAfter: { keypress: 'Escape' },
        screenshotSelector: '.dnb-modal__content',
        rootClassName: 'hide-page-content',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('should match scrolled to bottom', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="dialog-scroll-content-info"]', // only to make sure we have a valid selector
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="dialog-scroll-content-info"] button:first-of-type',
        waitAfterSimulateSelector: '.dnb-scroll-view',
        simulateAfter: { keypress: 'Escape' },
        screenshotSelector: '.dnb-modal__content',
        rootClassName: ['hide-page-content', 'scroll-to-bottom-info'],
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  })
})
