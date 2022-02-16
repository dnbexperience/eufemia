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
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Dialog screenshot', () => {
  setupPageScreenshot({
    url: '/uilib/components/dialog/demos',
  })

  it('have to match default dialog trigger', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="dialog-default"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match suffix dialog trigger', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="dialog-help-button"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match custom dialog trigger', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="dialog-custom-trigger"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
