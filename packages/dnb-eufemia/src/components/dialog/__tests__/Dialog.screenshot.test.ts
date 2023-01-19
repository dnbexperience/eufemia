/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import { makeScreenshot } from '../../../core/jest/jestSetupScreenshots'

describe('Dialog', () => {
  const defaults = {
    url: '/uilib/components/dialog/demos',
    pageViewport: {
      width: 700,
      height: 600,
    },
  }

  it('have to match default dialog trigger', async () => {
    const screenshot = await makeScreenshot({
      ...defaults,
      selector: '[data-visual-test="dialog-default"] .dnb-modal__trigger',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match suffix dialog trigger', async () => {
    const screenshot = await makeScreenshot({
      ...defaults,
      selector: '[data-visual-test="dialog-help-button"] .dnb-input',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match custom dialog trigger', async () => {
    const screenshot = await makeScreenshot({
      ...defaults,
      selector:
        '[data-visual-test="dialog-custom-trigger"] .dnb-modal__trigger',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the dialog help window', async () => {
    const screenshot = await makeScreenshot({
      ...defaults,
      selector: 'div#dnb-modal-root', // only to make sure we have a valid selector
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="dialog-help-button"] button:first-of-type',
      screenshotSelector: '.dnb-modal__content',
      rootClassName: 'hide-page-content',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the dialog fullscreen window', async () => {
    const screenshot = await makeScreenshot({
      ...defaults,
      selector: 'div#dnb-modal-root', // only to make sure we have a valid selector
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="dialog-fullscreen"] button:first-of-type',
      screenshotSelector: '.dnb-modal__content',
      rootClassName: 'hide-page-content',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the dialog window using custom trigger', async () => {
    const screenshot = await makeScreenshot({
      ...defaults,
      selector: 'div#dnb-modal-root', // only to make sure we have a valid selector
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="dialog-custom-trigger"] button:first-of-type',
      screenshotSelector: '.dnb-modal__content',
      rootClassName: 'hide-page-content',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the custom dialog window', async () => {
    const screenshot = await makeScreenshot({
      ...defaults,
      selector: 'div#dnb-modal-root', // only to make sure we have a valid selector
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="full-dialog"] button:first-of-type',
      screenshotSelector: '.dnb-modal__content',
      rootClassName: 'hide-page-content',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the default dialog window', async () => {
    const screenshot = await makeScreenshot({
      ...defaults,
      selector: 'div#dnb-modal-root', // only to make sure we have a valid selector
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="dialog-default"] button:first-of-type',
      screenshotSelector: '.dnb-modal__content',
      rootClassName: 'hide-page-content',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the default confirmation', async () => {
    const screenshot = await makeScreenshot({
      ...defaults,
      selector: 'div#dnb-modal-root', // only to make sure we have a valid selector
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="dialog-confirm-default"] button:first-of-type',
      screenshotSelector: '.dnb-modal__content',
      rootClassName: 'hide-page-content',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the delete confirmation', async () => {
    const screenshot = await makeScreenshot({
      ...defaults,
      selector: 'div#dnb-modal-root', // only to make sure we have a valid selector
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="dialog-confirm-delete"] button:first-of-type',
      screenshotSelector: '.dnb-modal__content',
      rootClassName: 'hide-page-content',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the logged out confirmation', async () => {
    const screenshot = await makeScreenshot({
      ...defaults,
      selector: 'div#dnb-modal-root', // only to make sure we have a valid selector
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="dialog-confirm-loggedout"] button:first-of-type',
      screenshotSelector: '.dnb-modal__content',
      rootClassName: 'hide-page-content',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the cookie concent confirmation', async () => {
    const screenshot = await makeScreenshot({
      ...defaults,
      selector: 'div#dnb-modal-root', // only to make sure we have a valid selector
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="dialog-confirm-cookie"] button:first-of-type',
      screenshotSelector: '.dnb-modal__content',
      rootClassName: 'hide-page-content',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the dialog progressindicator window', async () => {
    const screenshot = await makeScreenshot({
      ...defaults,
      selector: 'div#dnb-modal-root', // only to make sure we have a valid selector
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="dialog-progress-indicator"] button:first-of-type',
      screenshotSelector: '.dnb-modal__content',
      rootClassName: 'hide-page-content',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  describe('scrollable content', () => {
    const defaults = {
      url: '/uilib/components/dialog/demos',
      pageViewport: {
        width: 400,
        height: 400,
      },
      headers: { 'User-Agent': 'iPhone OS 15' },
      waitAfterSimulateSelector: '.dnb-scroll-view',
    }

    it('have to match scrolled to top', async () => {
      const screenshot = await makeScreenshot({
        ...defaults,
        selector: 'div#dnb-modal-root', // only to make sure we have a valid selector
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="dialog-scroll-content"] button:first-of-type',
        screenshotSelector: '.dnb-modal__content',
        rootClassName: 'hide-page-content',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match scrolled to bottom', async () => {
      const screenshot = await makeScreenshot({
        ...defaults,
        selector: 'div#dnb-modal-root', // only to make sure we have a valid selector
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="dialog-scroll-content"] button:first-of-type',
        screenshotSelector: '.dnb-modal__content',
        rootClassName: ['hide-page-content', 'scroll-to-bottom'],
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  })
})
