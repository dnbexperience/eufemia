/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

describe('Autocomplete screenshot', () => {
  setupPageScreenshot({
    url: '/uilib/components/autocomplete/demos',
    screenshotConfig: {
      // use 0.04%on CI because of the cursor in the input field
      pixelThresholdRelative: 0.04
    }
  })
  it('have to match different sizes', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="autocomplete-sizes"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match autocomplete with drawer-button', async () => {
    const screenshot = await testPageScreenshot({
      selector:
        '[data-visual-test="autocomplete-drawer-button"] .dnb-autocomplete__inner'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the closed autocomplete', async () => {
    const screenshot = await testPageScreenshot({
      selector:
        '[data-visual-test="autocomplete-closed"] .dnb-autocomplete__inner'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match autocomplete with search result', async () => {
    const style = {
      height: '12rem'
    }
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="autocomplete-drawer-search"]',
      simulateSelector:
        '[data-visual-test="autocomplete-drawer-search"] .dnb-autocomplete .dnb-input',
      simulate: 'click', // should be tested first
      style
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
