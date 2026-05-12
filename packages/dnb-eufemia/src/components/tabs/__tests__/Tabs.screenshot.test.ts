import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Tabs for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/tabs/demos/',
    })

    test('have to match the "Tablist"', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="tabs-tablist"] .dnb-tabs__tabs',
      })
    })

    test('have to match when used with a single children as react element', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="tabs-single-children-react-element"]',
      })
    })

    test('have to match when used with a single element in data', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="tabs-single-element-data"]',
      })
    })

    test('have to match tabs with badge notification', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="tabs-badge-notification"]',
      })
    })

    test('have to match when using the align property', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="tabs-align-property"]',
      })
    })

    test('have to match a tablist with a click handler', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="tabs-clickhandler"] .dnb-tabs__tabs',
      })
    })

    test('have to match max-width tabs', async () => {
      await makeScreenshot({
        style: {
          width: '40rem',
          height: '4rem',
        },
        selector: '[data-visual-test="tabs-max-width"]',
      })
    })

    test('have to match custom section styles', async () => {
      await makeScreenshot({
        style: {
          width: '40rem',
          height: '14rem',
          padding: '0 2rem 4rem 2rem',
        },
        selector: '[data-visual-test="tabs-section-styles"]',
      })
    })

    test('have to match tabs with no bottom border', async () => {
      await makeScreenshot({
        style: {
          width: '40rem',
          height: '10rem',
          padding: '0 2rem 4rem 2rem',
        },
        selector: '[data-visual-test="tabs-no-border"]',
      })
    })

    test('have to match tabs with no breakout', async () => {
      await makeScreenshot({
        style: {
          width: '40rem',
          height: '10rem',
          padding: '0 2rem 4rem 2rem',
        },
        selector: '[data-visual-test="tabs-no-breakout"]',
      })
    })

    test('have to match ignored scrollable tabs', async () => {
      await makeScreenshot({
        style: {
          width: '80rem',
          padding: '0 2rem 4rem 2rem',
        },
        withWrapper: false,
        selector: '[data-visual-test="tabs-tablist-scrollable"]',
      })
    })

    test('have to match a tab button in focus state', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="tabs-tablist"] .dnb-tabs__tabs',
        simulateSelector:
          '[data-visual-test="tabs-tablist"] .dnb-tabs__tabs__tablist .dnb-tabs__button__snap:nth-of-type(2) button',
        simulate: 'focus',
      })
    })

    test('have to match the "Tablist" on focus state', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="tabs-tablist"] .dnb-tabs__tabs',
        style: { margin: '0 2rem' },
        simulateSelector:
          '[data-visual-test="tabs-tablist"] .dnb-tabs__tabs__tablist',
        simulate: 'focus',
      })
    })

    test('have to match tabs content with focus ring', async () => {
      await makeScreenshot({
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
      await makeScreenshot({
        style: {
          width: '30rem',
          padding: '0 3rem 4rem 3rem',
        },
        selector: '[data-visual-test="tabs-tablist-scrollable"]',
        withWrapper: false,
      })
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
      await makeScreenshot({
        style: {
          width: '50rem',
        },
        selector: '[data-visual-test="tabs-horizontally-aligned"]',
      })
    })

    test('have to match scrollable tabs', async () => {
      await makeScreenshot({
        style: {
          width: '50rem',
          padding: '0 3rem 4rem 3rem',
        },
        selector: '[data-visual-test="tabs-tablist-scrollable"]',
        withWrapper: false,
      })
    })

    test('have to match first scrollable tabs', async () => {
      await makeScreenshot({
        style: {
          width: '50rem',
          padding: '0 3rem 4rem 3rem',
        },
        selector: '[data-visual-test="tabs-tablist-scrollable"]',
        simulateSelector:
          '[data-visual-test="tabs-tablist-scrollable"] .dnb-tabs__scroll-nav-button:first-child',
        simulate: 'click',
        withWrapper: false,
      })
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
      await makeScreenshot({
        style: {
          width: '50rem',
          padding: '0 3rem 4rem 3rem',
        },
        selector: '[data-visual-test="tabs-tablist-scrollable"]',
        simulateSelector:
          '[data-visual-test="tabs-tablist-scrollable"] .dnb-tabs__tabs__tablist .dnb-tabs__button__snap:last-of-type button',
        simulate: 'click',
        withWrapper: false,
      })
    })
  })
}
