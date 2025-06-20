/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe.each(['ui', 'sbanken'])('Autocomplete for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/autocomplete/demos',
    pageViewport: {
      width: 1280,
      height: 1024, // The height influences this test: data-visual-test="autocomplete-drawer-search"
    },
  })

  it('have to match different sizes', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="autocomplete-sizes"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match custom input width', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="autocomplete-input-width"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match autocomplete with drawer-button', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="autocomplete-drawer-button"] .dnb-autocomplete__inner',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the closed autocomplete', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="autocomplete-closed"] .dnb-autocomplete__inner',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match autocomplete with search result', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="autocomplete-drawer-search"]',
      simulateSelector:
        '[data-visual-test="autocomplete-drawer-search"] .dnb-autocomplete .dnb-input',
      simulate: 'click',
      waitAfterSimulateSelector:
        '[data-visual-test="autocomplete-drawer-search"] .dnb-autocomplete--opened',
      style: {
        height: '30rem',
      },
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match autocomplete with suffix value', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="autocomplete-suffix"]',
      simulateSelector:
        '[data-visual-test="autocomplete-suffix"] .dnb-autocomplete .dnb-input',
      waitAfterSimulateSelector:
        '[data-visual-test="autocomplete-suffix"] .dnb-autocomplete--opened',
      simulate: 'click',
      style: {
        height: '25rem',
      },
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the status with status_state info', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="autocomplete-status"] .dnb-autocomplete__inner',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe.each(['ui', 'sbanken'])('Autocomplete for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/autocomplete/demos',
    pageViewport: {
      width: 700,
    },
  })

  it('have to match small screen autocomplete with suffix value', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="autocomplete-suffix"]',
      style: {
        height: '4rem',
      },
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe.each(['ui', 'sbanken'])('Autocomplete for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/autocomplete/visual-tests',
  })

  it('have to match disabled state', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="autocomplete-disabled"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match disabled options', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="autocomplete-disabled-options"]',
      simulateSelector:
        '[data-visual-test="autocomplete-disabled-options"] .dnb-autocomplete .dnb-input',
      waitAfterSimulateSelector:
        '[data-visual-test="autocomplete-disabled-options"] .dnb-autocomplete--opened',
      simulate: 'click',
      style: {
        height: '25rem',
      },
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match autocomplete opened list', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="autocomplete-opened"]',
      simulateSelector:
        '[data-visual-test="autocomplete-opened"] .focus-trigger .dnb-drawer-list:last-of-type li.first-of-type',
      waitAfterSimulateSelector:
        '[data-visual-test="autocomplete-opened"] .dnb-autocomplete--opened',
      simulate: 'click',
      style: {
        height: '40rem',
      },
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
