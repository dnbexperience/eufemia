/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('Autocomplete screenshot', () => {
  setupPageScreenshot({
    url: '/uilib/components/autocomplete/demos',
  })

  it('have to match different sizes', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="autocomplete-sizes"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match custom input width', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="autocomplete-input-width"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match autocomplete with drawer-button', async () => {
    const screenshot = await testPageScreenshot({
      selector:
        '[data-visual-test="autocomplete-drawer-button"] .dnb-autocomplete__inner',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the closed autocomplete', async () => {
    const screenshot = await testPageScreenshot({
      selector:
        '[data-visual-test="autocomplete-closed"] .dnb-autocomplete__inner',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match autocomplete with search result', async () => {
    const screenshot = await testPageScreenshot({
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
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="autocomplete-opened"]',
      simulateSelector:
        '[data-visual-test="autocomplete-opened"] .focus-trigger .dnb-drawer-list:last-of-type li.first-of-type',
      simulate: 'click',
      style: {
        height: '40rem',
      },
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match autocomplete with suffix value', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="autocomplete-suffix"]',
      simulateSelector:
        '[data-visual-test="autocomplete-suffix"] .dnb-autocomplete .dnb-input',
      simulate: 'click',
      style: {
        height: '25rem',
      },
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Autocomplete screenshot', () => {
  setupPageScreenshot({
    url: '/uilib/components/autocomplete/demos',
    pageViewport: {
      width: 600,
      height: 600,
    },
  })

  it('have to match small screen autocomplete with suffix value', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="autocomplete-suffix"]',
      simulateSelector:
        '[data-visual-test="autocomplete-suffix"] .dnb-autocomplete .dnb-input',
      simulate: 'click',
      style: {
        height: '35rem',
      },
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
