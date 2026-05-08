import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/playwright/screenshotSetup'

test.describe('Drawer', () => {
  test.describe('large', () => {
    setupPageScreenshot({
      url: '/uilib/components/drawer/demos/',
    })

    test('have to match default drawer trigger with title', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="simple-drawer"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match default drawer trigger', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="full-drawer"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match customized drawer trigger', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="drawer-custom-trigger"]',
      })
      expect(screenshot).toMatchSnapshot()
    })
  })

  test.describe('open', () => {
    const pageViewport = {
      width: 700,
      height: 600,
    }

    setupPageScreenshot({
      url: '/uilib/components/drawer/demos/',
      pageViewport,
    })

    test('have to match simple drawer window', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="simple-drawer"]',
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="simple-drawer"] button:first-of-type',
        screenshotSelector: '.dnb-modal__content .dnb-scroll-view',
        simulateAfter: { keypress: 'Escape' },
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match fullscreen drawer', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="fullscreen-drawer"]',
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="fullscreen-drawer"] button:first-of-type',
        screenshotSelector: '.dnb-modal__content .dnb-scroll-view',
        simulateAfter: { keypress: 'Escape' },
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match left placement drawer', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="left-placement-drawer"]',
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="left-placement-drawer"] button:first-of-type',
        screenshotSelector: '.dnb-modal__content .dnb-scroll-view',
        simulateAfter: { keypress: 'Escape' },
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match full drawer window', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="full-drawer"]',
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="full-drawer"] button:first-of-type',
        screenshotSelector: '.dnb-modal__content .dnb-scroll-view',
        simulateAfter: { keypress: 'Escape' },
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match callback drawer window', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="callback-drawer"]',
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="callback-drawer"] button:first-of-type',
        screenshotSelector: '.dnb-modal__content .dnb-scroll-view',
        simulateAfter: { keypress: 'Escape' },
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match no-animation drawer window', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="drawer-no-animation"]',
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="drawer-no-animation"] button:first-of-type',
        screenshotSelector: '.dnb-modal__content .dnb-scroll-view',
        simulateAfter: { keypress: 'Escape' },
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match correct scroll view setup', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="drawer-scroll-view"]',
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="drawer-scroll-view"] button:first-of-type',
        screenshotSelector: '.drawer-scroll-view',
        simulateAfter: { keypress: 'Escape' },
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match large content drawer scrolled', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="large-content-drawer"]',
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="large-content-drawer"] button:first-of-type',
        screenshotSelector: '.dnb-modal__content .dnb-scroll-view',
        simulateAfter: { keypress: 'Escape' },
        rootClassName: ['hide-page-content'],
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to apply sticky header when header content changes', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="update-navigation-header-example"]',
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="update-navigation-header-example"] button:first-of-type',
        screenshotSelector: '.dnb-modal__content .dnb-scroll-view',
        simulateAfter: { keypress: 'Escape' },
        rootClassName: ['hide-page-content'],
      })
      expect(screenshot).toMatchSnapshot()
    })
  })

  test.describe('small', () => {
    setupPageScreenshot({
      url: '/uilib/components/drawer/demos/',
      pageViewport: {
        width: 640,
        height: 800,
      },
    })

    test('have to match top placement drawer', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="top-placement-drawer"]',
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="top-placement-drawer"] button:first-of-type',
        screenshotSelector: '.dnb-modal__content',
        simulateAfter: { keypress: 'Escape' },
        rootClassName: 'hide-page-content',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match bottom placement drawer', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="bottom-placement-drawer"]',
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="bottom-placement-drawer"] button:first-of-type',
        screenshotSelector: '.dnb-modal__content',
        simulateAfter: { keypress: 'Escape' },
        rootClassName: 'hide-page-content',
      })
      expect(screenshot).toMatchSnapshot()
    })
  })
})
