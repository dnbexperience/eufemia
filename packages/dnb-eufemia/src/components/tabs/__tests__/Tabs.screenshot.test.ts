/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe.each(['ui', 'sbanken'])('Tabs for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/tabs/demos',
  })

  it('have to match the "Tablist"', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="tabs-tablist"] .dnb-tabs__tabs',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match when used with a single children as react element', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="tabs-single-children-react-element"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match when used with a single element in data', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="tabs-single-element-data"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match a tablist with a click handler', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="tabs-clickhandler"] .dnb-tabs__tabs',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match max-width tabs', async () => {
    const screenshot = await makeScreenshot({
      style: {
        width: '40rem',
        height: '4rem',
      },
      selector: '[data-visual-test="tabs-max-width"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match custom section styles', async () => {
    const screenshot = await makeScreenshot({
      style: {
        width: '40rem',
        height: '14rem',
        padding: '0 2rem 4rem 2rem',
      },
      selector: '[data-visual-test="tabs-section-styles"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match tabs with no bottom border', async () => {
    const screenshot = await makeScreenshot({
      style: {
        width: '40rem',
        height: '10rem',
        padding: '0 2rem 4rem 2rem',
      },
      selector: '[data-visual-test="tabs-no-border"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match tabs with no breakout', async () => {
    const screenshot = await makeScreenshot({
      style: {
        width: '40rem',
        height: '10rem',
        padding: '0 2rem 4rem 2rem',
      },
      selector: '[data-visual-test="tabs-no-breakout"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match ignored scrollable tabs', async () => {
    const screenshot = await makeScreenshot({
      style: {
        width: '80rem',
        padding: '0 2rem 4rem 2rem',
      },
      selector: '[data-visual-test="tabs-tablist-scrollable"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match a tab button in focus state', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="tabs-tablist"] .dnb-tabs__tabs',
      simulateSelector:
        '[data-visual-test="tabs-tablist"] .dnb-tabs__tabs__tablist .dnb-tabs__button__snap:nth-of-type(2) button',
      simulate: 'focus',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the "Tablist" on focus state', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="tabs-tablist"] .dnb-tabs__tabs',
      style: { margin: '0 2rem' },
      simulateSelector:
        '[data-visual-test="tabs-tablist"] .dnb-tabs__tabs__tablist',
      simulate: 'focus',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match tabs content with focus ring', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="tabs-section-styles"] .dnb-tabs__content',
      simulateSelector:
        '[data-visual-test="tabs-section-styles"] .dnb-tabs__content',
      simulate: 'focus',
      executeBeforeSimulate: () => {
        document.documentElement.setAttribute('data-whatinput', 'keyboard')
      },
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe.each(['ui', 'sbanken'])('Tabs for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/tabs/demos',
    pageViewport: {
      width: 480, // 30rem
    },
  })

  it('have to match scrollable tabs narrow', async () => {
    const screenshot = await makeScreenshot({
      style: {
        width: '30rem',
        padding: '0 3rem 4rem 3rem',
      },
      selector: '[data-visual-test="tabs-tablist-scrollable"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe.each(['ui', 'sbanken'])('Tabs for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/tabs/demos',
    pageViewport: {
      width: 800, // 50rem
    },
  })

  it('have to match horizontally aligned tabs', async () => {
    const screenshot = await makeScreenshot({
      style: {
        width: '50rem',
      },
      selector: '[data-visual-test="tabs-horizontally-aligned"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match scrollable tabs', async () => {
    const screenshot = await makeScreenshot({
      style: {
        width: '50rem',
        padding: '0 3rem 4rem 3rem',
      },
      selector: '[data-visual-test="tabs-tablist-scrollable"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match first scrollable tabs', async () => {
    const screenshot = await makeScreenshot({
      style: {
        width: '50rem',
        padding: '0 3rem 4rem 3rem',
      },
      selector: '[data-visual-test="tabs-tablist-scrollable"]',
      simulateSelector:
        '[data-visual-test="tabs-tablist-scrollable"] .dnb-tabs__scroll-nav-button:first-child',
      simulate: 'click',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match last scrollable tabs', async () => {
    const screenshot = await makeScreenshot({
      style: {
        width: '50rem',
        padding: '0 3rem 4rem 3rem',
      },
      selector: '[data-visual-test="tabs-tablist-scrollable"]',
      simulateSelector:
        '[data-visual-test="tabs-tablist-scrollable"] .dnb-tabs__tabs__tablist .dnb-tabs__button__snap:last-of-type button',
      simulate: 'click',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
