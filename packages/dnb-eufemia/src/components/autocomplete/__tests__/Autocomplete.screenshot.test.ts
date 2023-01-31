/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import { makeScreenshot } from '../../../core/jest/jestSetupScreenshots'

describe('Autocomplete', () => {
  const defaults = {
    url: '/uilib/components/autocomplete/demos',
  }

  it('have to match different sizes', async () => {
    const screenshot = await makeScreenshot({
      ...defaults,
      selector: '[data-visual-test="autocomplete-sizes"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match disabled state', async () => {
    const screenshot = await makeScreenshot({
      ...defaults,
      selector: '[data-visual-test="autocomplete-disabled"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match custom input width', async () => {
    const screenshot = await makeScreenshot({
      ...defaults,
      selector: '[data-visual-test="autocomplete-input-width"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match autocomplete with drawer-button', async () => {
    const screenshot = await makeScreenshot({
      ...defaults,
      selector:
        '[data-visual-test="autocomplete-drawer-button"] .dnb-autocomplete__inner',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the closed autocomplete', async () => {
    const screenshot = await makeScreenshot({
      ...defaults,
      selector:
        '[data-visual-test="autocomplete-closed"] .dnb-autocomplete__inner',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match autocomplete with search result', async () => {
    const screenshot = await makeScreenshot({
      ...defaults,
      selector: '[data-visual-test="autocomplete-drawer-search"]',
      simulateSelector:
        '[data-visual-test="autocomplete-drawer-search"] .dnb-autocomplete .dnb-input',
      simulate: 'click',
      style: {
        height: '40rem',
      },
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match autocomplete opened list', async () => {
    const screenshot = await makeScreenshot({
      ...defaults,
      selector: '[data-visual-test="autocomplete-opened"]',
      simulateSelector:
        '[data-visual-test="autocomplete-opened"] .focus-trigger .dnb-drawer-list:last-of-type li.first-of-type',
      waitAfterSimulate: 200,
      simulate: 'click',
      style: {
        height: '40rem',
      },
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match autocomplete with suffix value', async () => {
    const screenshot = await makeScreenshot({
      ...defaults,
      selector: '[data-visual-test="autocomplete-suffix"]',
      simulateSelector:
        '[data-visual-test="autocomplete-suffix"] .dnb-autocomplete .dnb-input',
      waitAfterSimulate: 200,
      simulate: 'click',
      style: {
        height: '25rem',
      },
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match small screen autocomplete with suffix value', async () => {
    const screenshot = await makeScreenshot({
      url: '/uilib/components/autocomplete/demos',
      pageViewport: {
        width: 700,
        height: 100,
      },
      selector: '[data-visual-test="autocomplete-suffix"]',
      style: {
        height: '4rem',
      },
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
