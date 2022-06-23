/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

const pageViewport = {
  width: 700,
  height: 600,
}

describe('Dialog screenshot', () => {
  setupPageScreenshot({
    url: '/uilib/components/dialog/demos',
  })

  it('have to match default dialog trigger', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="dialog-default"] .dnb-modal__trigger',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match suffix dialog trigger', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="dialog-help-button"] .dnb-input',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match custom dialog trigger', async () => {
    const screenshot = await testPageScreenshot({
      selector:
        '[data-visual-test="dialog-custom-trigger"] .dnb-modal__trigger',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Dialog suffix screenshot', () => {
  setupPageScreenshot({
    url: '/uilib/components/dialog/demos',
    pageViewport,
  })

  it('have to match the dialog help window', async () => {
    const screenshot = await testPageScreenshot({
      selector: 'div#dnb-modal-root', // only to make sure we have a valid selector
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="dialog-help-button"] button:first-of-type',
      screenshotSelector: '.dnb-modal__content',
      rootClassName: 'hide-page-content',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Dialog fullscreen screenshot', () => {
  setupPageScreenshot({
    url: '/uilib/components/dialog/demos',
    pageViewport,
  })

  it('have to match the dialog fullscreen window', async () => {
    const screenshot = await testPageScreenshot({
      selector: 'div#dnb-modal-root', // only to make sure we have a valid selector
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="dialog-fullscreen"] button:first-of-type',
      screenshotSelector: '.dnb-modal__content',
      rootClassName: 'hide-page-content',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Dialog custom trigger screenshot', () => {
  setupPageScreenshot({
    url: '/uilib/components/dialog/demos',
    pageViewport,
  })

  it('have to match the dialog window using custom trigger', async () => {
    const screenshot = await testPageScreenshot({
      selector: 'div#dnb-modal-root', // only to make sure we have a valid selector
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="dialog-custom-trigger"] button:first-of-type',
      screenshotSelector: '.dnb-modal__content',
      rootClassName: 'hide-page-content',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Dialog progressindicator screenshot', () => {
  setupPageScreenshot({
    url: '/uilib/components/dialog/demos',
    pageViewport,
  })

  it('have to match the dialog progressindicator window', async () => {
    const screenshot = await testPageScreenshot({
      selector: 'div#dnb-modal-root', // only to make sure we have a valid selector
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="dialog-progress-indicator"] button:first-of-type',
      screenshotSelector: '.dnb-modal__content',
      rootClassName: 'hide-page-content',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Dialog custom screenshot', () => {
  setupPageScreenshot({
    url: '/uilib/components/dialog/demos',
    pageViewport,
  })

  it('have to match the custom dialog window', async () => {
    const screenshot = await testPageScreenshot({
      selector: 'div#dnb-modal-root', // only to make sure we have a valid selector
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="full-dialog"] button:first-of-type',
      screenshotSelector: '.dnb-modal__content',
      rootClassName: 'hide-page-content',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Dialog confirmation screenshot', () => {
  setupPageScreenshot({
    url: '/uilib/components/dialog/demos',
    pageViewport,
  })

  it('have to match the default confirmation', async () => {
    const screenshot = await testPageScreenshot({
      selector: 'div#dnb-modal-root', // only to make sure we have a valid selector
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="dialog-confirm-default"] button:first-of-type',
      screenshotSelector: '.dnb-modal__content',
      rootClassName: 'hide-page-content',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Dialog confirmation screenshot', () => {
  setupPageScreenshot({
    url: '/uilib/components/dialog/demos',
    pageViewport,
  })

  it('have to match the delete confirmation', async () => {
    const screenshot = await testPageScreenshot({
      selector: 'div#dnb-modal-root', // only to make sure we have a valid selector
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="dialog-confirm-delete"] button:first-of-type',
      screenshotSelector: '.dnb-modal__content',
      rootClassName: 'hide-page-content',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Dialog confirmation screenshot', () => {
  setupPageScreenshot({
    url: '/uilib/components/dialog/demos',
    pageViewport,
  })
  it('have to match the logged out confirmation', async () => {
    const screenshot = await testPageScreenshot({
      selector: 'div#dnb-modal-root', // only to make sure we have a valid selector
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="dialog-confirm-loggedout"] button:first-of-type',
      screenshotSelector: '.dnb-modal__content',
      rootClassName: 'hide-page-content',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Dialog confirmation screenshot', () => {
  setupPageScreenshot({
    url: '/uilib/components/dialog/demos',
    pageViewport,
  })
  it('have to match the cookie concent confirmation', async () => {
    const screenshot = await testPageScreenshot({
      selector: 'div#dnb-modal-root', // only to make sure we have a valid selector
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="dialog-confirm-cookie"] button:first-of-type',
      screenshotSelector: '.dnb-modal__content',
      rootClassName: 'hide-page-content',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Dialog simple screenshot', () => {
  setupPageScreenshot({
    url: '/uilib/components/dialog/demos',
    pageViewport,
  })

  it('have to match the default dialog window', async () => {
    const screenshot = await testPageScreenshot({
      selector: 'div#dnb-modal-root', // only to make sure we have a valid selector
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="dialog-default"] button:first-of-type',
      screenshotSelector: '.dnb-modal__content',
      rootClassName: 'hide-page-content',
      waitBeforeSimulate: 200,
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Dialog scrollable content screenshot', () => {
  const pageViewport = {
    width: 400,
    height: 400,
  }

  setupPageScreenshot({
    url: '/uilib/components/dialog/demos',
    pageViewport,
  })

  it('have to match scrolled to top', async () => {
    await global.__PAGE__.setUserAgent('iPhone OS 15')
    const screenshot = await testPageScreenshot({
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
    await global.__PAGE__.setUserAgent('iPhone OS 15')
    const screenshot = await testPageScreenshot({
      selector: 'div#dnb-modal-root', // only to make sure we have a valid selector
      simulate: 'click',
      reload: true, // reload because we add `scroll-to-bottom`
      simulateSelector:
        '[data-visual-test="dialog-scroll-content"] button:first-of-type',
      screenshotSelector: '.dnb-modal__content',
      rootClassName: ['hide-page-content', 'scroll-to-bottom'],
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
