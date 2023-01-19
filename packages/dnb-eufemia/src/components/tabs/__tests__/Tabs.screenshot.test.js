/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('Tabs', () => {
  setupPageScreenshot({ url: '/uilib/components/tabs/demos' })

  it('have to match the "Tablist"', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="tabs-tablist"] .dnb-tabs__tabs',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match a tablist with a click handler', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="tabs-clickhandler"] .dnb-tabs__tabs',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match horizontal aligned tabs', async () => {
    const screenshot = await makeScreenshot({
      style: {
        width: '60rem',
      },
      selector: '[data-visual-test="tabs-horizontal-aligned"]',
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
})

describe('Tabs', () => {
  setupPageScreenshot({ url: '/uilib/components/tabs/demos' })

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

  it('have to match a tab button in focus state', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="tabs-tablist"] .dnb-tabs__tabs',
      simulateSelector:
        '[data-visual-test="tabs-tablist"] .dnb-tabs__tabs__tablist .dnb-tabs__button__snap:nth-of-type(2) button',
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

describe('Tabs', () => {
  setupPageScreenshot({
    pageViewport: {
      width: 480, // 30rem
    },
    url: '/uilib/components/tabs/demos',
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

describe('Tabs', () => {
  setupPageScreenshot({
    pageViewport: {
      width: 800, // 50rem
    },
    url: '/uilib/components/tabs/demos',
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
})

describe('Tabs', () => {
  setupPageScreenshot({
    pageViewport: {
      width: 800, // 50rem
    },
    url: '/uilib/components/tabs/demos',
  })

  it('have to match first scrollable tabs', async () => {
    const screenshot = await makeScreenshot({
      style: {
        width: '50rem',
        padding: '0 3rem 4rem 3rem',
      },
      selector: '[data-visual-test="tabs-tablist-scrollable"]',
      simulateSelector:
        '[data-visual-test="tabs-tablist-scrollable"] .dnb-tabs__tabs__tablist .dnb-tabs__button__snap:first-of-type button',
      simulate: 'click',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Tabs', () => {
  setupPageScreenshot({
    pageViewport: {
      width: 800, // 50rem
    },
    url: '/uilib/components/tabs/demos',
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
