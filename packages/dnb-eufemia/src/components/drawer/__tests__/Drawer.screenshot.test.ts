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

    it('should match default drawer trigger with title', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="simple-drawer"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('should match default drawer trigger', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="full-drawer"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('should match customized drawer trigger', async () => {
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

    it('should match simple drawer window', async () => {
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

    it('should match fullscreen drawer', async () => {
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

    it('should match left placement drawer', async () => {
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

    it('should match full drawer window', async () => {
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

    it('should match callback drawer window', async () => {
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

    it('should match no-animation drawer window', async () => {
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

    it('should match correct scroll view setup', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="drawer-scroll-view"]',
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="drawer-scroll-view"] button:first-of-type',
        screenshotSelector: '.drawer-scroll-view',
        simulateAfter: { keypress: 'Escape' },
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('should match large content drawer scrolled', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="large-content-drawer"]',
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="large-content-drawer"] button:first-of-type',
        waitAfterSimulateSelector: '.dnb-scroll-view',
        screenshotSelector: '.dnb-modal__content .dnb-scroll-view',
        simulateAfter: { keypress: 'Escape' },
        rootClassName: ['hide-page-content'],
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('should apply sticky header when header content changes', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="update-navigation-header-example"]',
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="update-navigation-header-example"] button:first-of-type',
        waitAfterSimulateSelector: '.dnb-scroll-view',
        screenshotSelector: '.dnb-modal__content .dnb-scroll-view',
        simulateAfter: { keypress: 'Escape' },
        rootClassName: ['hide-page-content'],
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

    it('should match top placement drawer', async () => {
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

    it('should match bottom placement drawer', async () => {
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
