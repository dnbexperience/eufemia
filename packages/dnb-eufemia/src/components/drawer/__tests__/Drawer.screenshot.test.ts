/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

const rootClassName = 'hide-page-content'
const executeBeforeScreenshot = () => {
  setTimeout(() => {
    document.querySelector('.dnb-scroll-view').scroll({ top: 0 })
  }, 100)
}

describe('Drawer', () => {
  describe('large', () => {
    setupPageScreenshot({
      url: '/uilib/components/drawer/demos',
      each: true,
    })

    it('have to match default drawer trigger with title', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="simple-drawer"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match default drawer trigger', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="full-drawer"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match customized drawer trigger', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="drawer-custom-trigger"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  })

  describe('open', () => {
    const pageViewport = {
      width: 700,
      height: 600,
    }

    setupPageScreenshot({
      url: '/uilib/components/drawer/demos',
      pageViewport,
      each: true,
    })

    const defaults = {
      rootClassName,
      executeBeforeScreenshot,
      waitAfterSimulateSelector: '.dnb-scroll-view',
    }

    it('have to match simple drawer window', async () => {
      const screenshot = await makeScreenshot({
        selector: 'div#dnb-modal-root', // only to make sure we have a valid selector
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="simple-drawer"] button:first-of-type',
        screenshotSelector: '.dnb-modal__content .dnb-scroll-view',
        ...defaults,
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match fullscreen drawer', async () => {
      const screenshot = await makeScreenshot({
        selector: 'div#dnb-modal-root', // only to make sure we have a valid selector
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="fullscreen-drawer"] button:first-of-type',
        screenshotSelector: '.dnb-modal__content .dnb-scroll-view',
        ...defaults,
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match left placement drawer', async () => {
      const screenshot = await makeScreenshot({
        selector: 'div#dnb-modal-root', // only to make sure we have a valid selector
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="left-placement-drawer"] button:first-of-type',
        screenshotSelector: '.dnb-modal__content .dnb-scroll-view',
        ...defaults,
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match full drawer window', async () => {
      const screenshot = await makeScreenshot({
        selector: 'div#dnb-modal-root', // only to make sure we have a valid selector
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="full-drawer"] button:first-of-type',
        screenshotSelector: '.dnb-modal__content .dnb-scroll-view',
        ...defaults,
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match callback drawer window', async () => {
      const screenshot = await makeScreenshot({
        selector: 'div#dnb-modal-root', // only to make sure we have a valid selector
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="callback-drawer"] button:first-of-type',
        screenshotSelector: '.dnb-modal__content .dnb-scroll-view',
        ...defaults,
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match no-animation drawer window', async () => {
      const screenshot = await makeScreenshot({
        selector: 'div#dnb-modal-root', // only to make sure we have a valid selector
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="drawer-no-animation"] button:first-of-type',
        screenshotSelector: '.dnb-modal__content .dnb-scroll-view',
        ...defaults,
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match correct scroll view setup', async () => {
      const screenshot = await makeScreenshot({
        url: '/uilib/components/drawer/visual-tests/hidden-tests',
        pageViewport,
        selector: '[data-visual-test="drawer-scroll-view"]',
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="drawer-scroll-view"] button:first-of-type',
        screenshotSelector: '.drawer-scroll-view',
        rootClassName,
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  })
})
