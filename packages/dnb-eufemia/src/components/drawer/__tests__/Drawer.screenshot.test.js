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

describe('Drawer', () => {
  setupPageScreenshot({
    url: '/uilib/components/drawer/demos',
  })

  it('have to match default drawer trigger with title', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="simple-drawer"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match default drawer trigger', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="full-drawer"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match customized drawer trigger', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="drawer-custom-trigger"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Drawer simple', () => {
  setupPageScreenshot({
    url: '/uilib/components/drawer/demos',
    pageViewport,
  })

  it('have to match default drawer window', async () => {
    const screenshot = await testPageScreenshot({
      selector: 'div#dnb-modal-root', // only to make sure we have a valid selector
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="simple-drawer"] button:first-of-type',
      screenshotSelector: '.dnb-modal__content',
      rootClassName: 'hide-page-content',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Drawer full', () => {
  setupPageScreenshot({
    url: '/uilib/components/drawer/demos',
    pageViewport,
  })

  it('have to match default drawer window', async () => {
    const screenshot = await testPageScreenshot({
      selector: 'div#dnb-modal-root', // only to make sure we have a valid selector
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="full-drawer"] button:first-of-type',
      screenshotSelector: '.dnb-modal__content',
      rootClassName: 'hide-page-content',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Drawer custom trigger', () => {
  setupPageScreenshot({
    url: '/uilib/components/drawer/demos',
    pageViewport,
  })

  it('have to match default drawer window', async () => {
    const screenshot = await testPageScreenshot({
      selector: 'div#dnb-modal-root', // only to make sure we have a valid selector
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="callback-drawer"] button:first-of-type',
      screenshotSelector: '.dnb-modal__content',
      rootClassName: 'hide-page-content',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Drawer no animation/spacing', () => {
  setupPageScreenshot({
    url: '/uilib/components/drawer/demos',
    pageViewport,
  })

  it('have to match default drawer window', async () => {
    const screenshot = await testPageScreenshot({
      selector: 'div#dnb-modal-root', // only to make sure we have a valid selector
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="drawer-no-animation"] button:first-of-type',
      screenshotSelector: '.dnb-modal__content',
      rootClassName: 'hide-page-content',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Drawer', () => {
  setupPageScreenshot({
    url: '/uilib/components/drawer/visual-tests/hidden-tests',
    pageViewport,
  })

  it('have to match correct scroll view setup', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="drawer-scroll-view"]',
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="drawer-scroll-view"] button:first-of-type',
      screenshotSelector: '.drawer-scroll-view',
      rootClassName: 'hide-page-content',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
