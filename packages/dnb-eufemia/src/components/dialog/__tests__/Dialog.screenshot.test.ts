import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

for (const themeName of ['ui', 'sbanken', 'carnegie']) {
  test.describe(`Dialog for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/dialog/demos/',
      pageViewport: {
        width: 700,
        height: 600,
      },
    })

    test('have to match default dialog trigger', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="dialog-default"] .dnb-modal__trigger',
      })
    })

    test('have to match suffix dialog trigger', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="dialog-help-button"] .dnb-input',
      })
    })

    test('have to match custom dialog trigger', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="dialog-custom-trigger"] .dnb-modal__trigger',
      })
    })

    test('have to match the dialog help window', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="dialog-help-button"]', // only to make sure we have a valid selector
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="dialog-help-button"] button:first-of-type',
        simulateAfter: { keypress: 'Escape' },
        screenshotSelector: '.dnb-modal__content', // leave one with the background
        rootClassName: 'hide-page-content',
      })
    })

    test('have to match a top aligned dialog', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="dialog-vertical-alignment"]', // only to make sure we have a valid selector
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="dialog-vertical-alignment"] button:first-of-type',
        simulateAfter: { keypress: 'Escape' },
        screenshotSelector: '.dnb-modal__content',
        rootClassName: 'hide-page-content',
      })
    })

    test('have to match the dialog fullscreen window', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="dialog-fullscreen"]', // only to make sure we have a valid selector
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="dialog-fullscreen"] button:first-of-type',
        simulateAfter: { keypress: 'Escape' },
        screenshotSelector: '.dnb-modal__content .dnb-scroll-view',
        rootClassName: 'hide-page-content',
      })
    })

    test('have to match the dialog window using custom trigger', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="dialog-custom-trigger"]', // only to make sure we have a valid selector
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="dialog-custom-trigger"] button:first-of-type',
        simulateAfter: { keypress: 'Escape' },
        screenshotSelector: '.dnb-modal__content .dnb-scroll-view',
        rootClassName: 'hide-page-content',
      })
    })

    test('have to match the custom dialog window', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="full-dialog"]', // only to make sure we have a valid selector
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="full-dialog"] button:first-of-type',
        simulateAfter: { keypress: 'Escape' },
        screenshotSelector: '.dnb-modal__content .dnb-scroll-view',
        rootClassName: 'hide-page-content',
      })
    })

    test('have to match the default dialog window', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="dialog-default"]', // only to make sure we have a valid selector
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="dialog-default"] button:first-of-type',
        simulateAfter: { keypress: 'Escape' },
        screenshotSelector: '.dnb-modal__content .dnb-scroll-view',
        rootClassName: 'hide-page-content',
      })
    })

    test('have to match the default confirmation', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="dialog-confirm-default"]', // only to make sure we have a valid selector
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="dialog-confirm-default"] button:first-of-type',
        simulateAfter: { keypress: 'Escape' },
        screenshotSelector: '.dnb-modal__content .dnb-scroll-view',
        rootClassName: 'hide-page-content',
      })
    })

    test('have to match the delete confirmation', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="dialog-confirm-delete"]', // only to make sure we have a valid selector
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="dialog-confirm-delete"] button:first-of-type',
        simulateAfter: { keypress: 'Escape' },
        screenshotSelector: '.dnb-modal__content .dnb-scroll-view',
        rootClassName: 'hide-page-content',
      })
    })

    test('have to match the logged out confirmation', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="dialog-confirm-loggedout"]', // only to make sure we have a valid selector
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="dialog-confirm-loggedout"] button:first-of-type',
        simulateAfter: { keypress: 'Escape' },
        screenshotSelector: '.dnb-modal__content .dnb-scroll-view',
        rootClassName: 'hide-page-content',
      })
    })

    test('have to match the cookie consent confirmation', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="dialog-confirm-cookie"]', // only to make sure we have a valid selector
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="dialog-confirm-cookie"] button:first-of-type',
        simulateAfter: { keypress: 'Escape' },
        screenshotSelector: '.dnb-modal__content .dnb-scroll-view',
        rootClassName: 'hide-page-content',
      })
    })

    test('have to match the dialog progressindicator window', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="dialog-progress-indicator"]', // only to make sure we have a valid selector
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="dialog-progress-indicator"] button:first-of-type',
        simulateAfter: { keypress: 'Escape' },
        screenshotSelector: '.dnb-modal__content .dnb-scroll-view',
        rootClassName: 'hide-page-content',
      })
    })

    test.describe('scrollable content', () => {
      setupPageScreenshot({
        themeName,
        url: '/uilib/components/dialog/demos/',
        pageViewport: {
          width: 400,
          height: 400,
        },
        headers: { 'User-Agent': 'iPhone OS 15' },
      })

      test('have to match scrolled to top', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="dialog-scroll-content"]', // only to make sure we have a valid selector
          simulate: 'click',
          simulateSelector:
            '[data-visual-test="dialog-scroll-content"] button:first-of-type',
          simulateAfter: { keypress: 'Escape' },
          screenshotSelector: '.dnb-modal__content .dnb-scroll-view',
          rootClassName: 'hide-page-content',
        })
      })

      test('have to match scrolled to bottom', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="dialog-scroll-content"]', // only to make sure we have a valid selector
          simulate: 'click',
          simulateSelector:
            '[data-visual-test="dialog-scroll-content"] button:first-of-type',
          simulateAfter: { keypress: 'Escape' },
          screenshotSelector: '.dnb-modal__content .dnb-scroll-view',
          rootClassName: ['hide-page-content', 'scroll-to-bottom'],
        })
      })
    })

    test.describe('scrollable content in variant info', () => {
      setupPageScreenshot({
        themeName,
        url: '/uilib/components/dialog/demos/',
        pageViewport: {
          width: 375,
          height: 667, // Set viewport size to iPhone 6 dimensions
        },
        headers: { 'User-Agent': 'iPhone OS 15' },
      })

      test('have to match scrolled to top', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="dialog-scroll-content-info"]', // only to make sure we have a valid selector
          simulate: 'click',
          simulateSelector:
            '[data-visual-test="dialog-scroll-content-info"] button:first-of-type',
          simulateAfter: { keypress: 'Escape' },
          screenshotSelector: '.dnb-modal__content',
          rootClassName: 'hide-page-content',
        })
      })

      test('have to match scrolled to bottom', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="dialog-scroll-content-info"]', // only to make sure we have a valid selector
          simulate: 'click',
          simulateSelector:
            '[data-visual-test="dialog-scroll-content-info"] button:first-of-type',
          simulateAfter: { keypress: 'Escape' },
          screenshotSelector: '.dnb-modal__content',
          rootClassName: ['hide-page-content', 'scroll-to-bottom-info'],
        })
      })
    })
  })
}
