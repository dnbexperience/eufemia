/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('Drawer', () => {
  describe('large', () => {
    setupPageScreenshot({
      url: '/uilib/components/drawer/demos',
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
    })

    it('have to match simple drawer window', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="simple-drawer"]',
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="simple-drawer"] button:first-of-type',
        screenshotSelector: '.dnb-modal__content .dnb-scroll-view',
        simulateAfter: { keypress: 'Escape' },
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match fullscreen drawer', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="fullscreen-drawer"]',
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="fullscreen-drawer"] button:first-of-type',
        screenshotSelector: '.dnb-modal__content .dnb-scroll-view',
        simulateAfter: { keypress: 'Escape' },
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match left placement drawer', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="left-placement-drawer"]',
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="left-placement-drawer"] button:first-of-type',
        screenshotSelector: '.dnb-modal__content .dnb-scroll-view',
        simulateAfter: { keypress: 'Escape' },
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match full drawer window', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="full-drawer"]',
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="full-drawer"] button:first-of-type',
        screenshotSelector: '.dnb-modal__content .dnb-scroll-view',
        simulateAfter: { keypress: 'Escape' },
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match callback drawer window', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="callback-drawer"]',
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="callback-drawer"] button:first-of-type',
        screenshotSelector: '.dnb-modal__content .dnb-scroll-view',
        simulateAfter: { keypress: 'Escape' },
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match no-animation drawer window', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="drawer-no-animation"]',
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="drawer-no-animation"] button:first-of-type',
        screenshotSelector: '.dnb-modal__content .dnb-scroll-view',
        simulateAfter: { keypress: 'Escape' },
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match correct scroll view setup', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="drawer-scroll-view"]',
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="drawer-scroll-view"] button:first-of-type',
        screenshotSelector: '.drawer-scroll-view',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  })

  describe('small', () => {
    setupPageScreenshot({
      url: '/uilib/components/drawer/demos',
      pageViewport: {
        width: 640,
        height: 800,
      },
    })

    it('have to match top placement drawer', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="top-placement-drawer"]',
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="top-placement-drawer"] button:first-of-type',
        screenshotSelector: '.dnb-modal__content',
        simulateAfter: { keypress: 'Escape' },
        rootClassName: 'hide-page-content',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match bottom placement drawer', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="bottom-placement-drawer"]',
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="bottom-placement-drawer"] button:first-of-type',
        screenshotSelector: '.dnb-modal__content',
        simulateAfter: { keypress: 'Escape' },
        rootClassName: 'hide-page-content',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  })
})
