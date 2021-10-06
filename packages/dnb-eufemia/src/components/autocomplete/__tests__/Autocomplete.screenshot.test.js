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
})

describe('Autocomplete screenshot', () => {
  setupPageScreenshot({
    url: '/uilib/components/autocomplete/demos',
  })
  it('have to match autocomplete with search result', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="autocomplete-drawer-search"]',
      simulateSelector:
        '[data-visual-test="autocomplete-drawer-search"] .dnb-autocomplete .dnb-input',
      simulate: 'click',
      waitAfterSimulateSelector:
        '.dnb-drawer-list__options .first-of-type.dnb-drawer-list__option',
      style: {
        height: '40rem',
      },
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Autocomplete screenshot', () => {
  setupPageScreenshot({
    url: '/uilib/components/autocomplete/demos',
  })
  it('have to match autocomplete opened list', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="autocomplete-opened"]',
      simulateSelector:
        '[data-visual-test="autocomplete-opened"] .focus-trigger .dnb-drawer-list:last-of-type li.first-of-type',
      simulate: 'click',
      waitAfterSimulateSelector:
        '.dnb-drawer-list__options li.first-of-type.dnb-drawer-list__option--selected',
      style: {
        height: '40rem',
      },
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
