import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/playwright/screenshotSetup'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Tabs for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/tabs/demos/',
    })

    test('have to match the "Tablist"', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="tabs-tablist"] .dnb-tabs__tabs',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match when used with a single children as react element', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="tabs-single-children-react-element"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match when used with a single element in data', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="tabs-single-element-data"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match tabs with badge notification', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="tabs-badge-notification"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match when using the align property', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="tabs-align-property"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match a tablist with a click handler', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="tabs-clickhandler"] .dnb-tabs__tabs',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match max-width tabs', async () => {
      const screenshot = await makeScreenshot({
        style: {
          width: '40rem',
          height: '4rem',
        },
        selector: '[data-visual-test="tabs-max-width"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match custom section styles', async () => {
      const screenshot = await makeScreenshot({
        style: {
          width: '40rem',
          height: '14rem',
          padding: '0 2rem 4rem 2rem',
        },
        selector: '[data-visual-test="tabs-section-styles"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match tabs with no bottom border', async () => {
      const screenshot = await makeScreenshot({
        style: {
          width: '40rem',
          height: '10rem',
          padding: '0 2rem 4rem 2rem',
        },
        selector: '[data-visual-test="tabs-no-border"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match tabs with no breakout', async () => {
      const screenshot = await makeScreenshot({
        style: {
          width: '40rem',
          height: '10rem',
          padding: '0 2rem 4rem 2rem',
        },
        selector: '[data-visual-test="tabs-no-breakout"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match ignored scrollable tabs', async () => {
      const screenshot = await makeScreenshot({
        style: {
          width: '80rem',
          padding: '0 2rem 4rem 2rem',
        },
        addWrapper: false,
        waitAfterSimulate: 100, // ensure the buttons are "hidden", so give time for a slow CI
        selector: '[data-visual-test="tabs-tablist-scrollable"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match a tab button in focus state', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="tabs-tablist"] .dnb-tabs__tabs',
        simulateSelector:
          '[data-visual-test="tabs-tablist"] .dnb-tabs__tabs__tablist .dnb-tabs__button__snap:nth-of-type(2) button',
        simulate: 'focus',
        waitAfterSimulate: 100, // ensure the buttons are "hidden", so give time for a slow CI
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the "Tablist" on focus state', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="tabs-tablist"] .dnb-tabs__tabs',
        style: { margin: '0 2rem' },
        simulateSelector:
          '[data-visual-test="tabs-tablist"] .dnb-tabs__tabs__tablist',
        simulate: 'focus',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match tabs content with focus ring', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="tabs-section-styles"] .dnb-tabs__content',
        simulateSelector:
          '[data-visual-test="tabs-section-styles"] .dnb-tabs__content',
        simulate: 'focus',
        executeBeforeSimulate: () => {
          document.documentElement.setAttribute(
            'data-whatinput',
            'keyboard'
          )
        },
      })
      expect(screenshot).toMatchSnapshot()
    })
  })
}

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Tabs for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/tabs/demos/',
      pageViewport: {
        width: 480, // 30rem
      },
    })

    test('have to match scrollable tabs narrow', async () => {
      const screenshot = await makeScreenshot({
        style: {
          width: '30rem',
          padding: '0 3rem 4rem 3rem',
        },
        selector: '[data-visual-test="tabs-tablist-scrollable"]',
        addWrapper: false,
      })
      expect(screenshot).toMatchSnapshot()
    })
  })
}

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Tabs for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/tabs/demos/',
      pageViewport: {
        width: 800, // 50rem
      },
    })

    test('have to match horizontally aligned tabs', async () => {
      const screenshot = await makeScreenshot({
        style: {
          width: '50rem',
        },
        selector: '[data-visual-test="tabs-horizontally-aligned"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match scrollable tabs', async () => {
      const screenshot = await makeScreenshot({
        style: {
          width: '50rem',
          padding: '0 3rem 4rem 3rem',
        },
        selector: '[data-visual-test="tabs-tablist-scrollable"]',
        addWrapper: false,
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match first scrollable tabs', async () => {
      const screenshot = await makeScreenshot({
        style: {
          width: '50rem',
          padding: '0 3rem 4rem 3rem',
        },
        selector: '[data-visual-test="tabs-tablist-scrollable"]',
        simulateSelector:
          '[data-visual-test="tabs-tablist-scrollable"] .dnb-tabs__scroll-nav-button:first-child',
        simulate: 'click',
        addWrapper: false,
      })
      expect(screenshot).toMatchSnapshot()
    })
  })
}

for (const themeName of ['ui']) {
  test.describe(`Tabs for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/tabs/demos/',
    })

    test('have to match last scrollable tabs', async () => {
      const screenshot = await makeScreenshot({
        style: {
          width: '50rem',
          padding: '0 3rem 4rem 3rem',
        },
        selector: '[data-visual-test="tabs-tablist-scrollable"]',
        simulateSelector:
          '[data-visual-test="tabs-tablist-scrollable"] .dnb-tabs__tabs__tablist .dnb-tabs__button__snap:last-of-type button',
        simulate: 'click',
        addWrapper: false,
      })
      expect(screenshot).toMatchSnapshot()
    })
  })
}
