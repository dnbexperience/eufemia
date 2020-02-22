/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

describe('Autocomplete screenshot', () => {
  setupPageScreenshot({ url: '/uilib/components/autocomplete/demos' })
  it('have to match the closed autocomplete', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="autocomplete-closed"] .dnb-autocomplete__inner'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the closed autocomplete with focus', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="autocomplete-closed"] .dnb-autocomplete__inner',
      simulateSelector:
        '[data-dnb-test="autocomplete-closed"] .dnb-autocomplete__trigger',
      simulate: 'focus' // should be tested first
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the closed autocomplete with hover', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="autocomplete-closed"] .dnb-autocomplete__inner',
      simulateSelector:
        '[data-dnb-test="autocomplete-closed"] .dnb-autocomplete__trigger',
      simulate: 'hover'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the autocomplete items', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="autocomplete-list"] .dnb-drawer-list__list',
      simulateSelector:
        '[data-dnb-test="autocomplete-list"] .dnb-drawer-list__option:nth-of-type(1)',
      simulate: 'hover'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the autocomplete with click', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="autocomplete-closed"] .dnb-autocomplete__inner',
      simulateSelector:
        '[data-dnb-test="autocomplete-closed"] .dnb-autocomplete__trigger',
      simulate: 'click'
      // waitAfterSimulateSelector:
      //   '[data-dnb-test="autocomplete-closed"] .dnb-drawer-list__options',
      // waitAfterSimulate: 100 // to make sure we make the screenshot afte the animation is show
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the autocomplete with icon on left side', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="autocomplete-left-icon"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the autocomplete with status: error', async () => {
    const screenshot = await testPageScreenshot({
      selector:
        '[data-dnb-test="autocomplete-status-error"] .dnb-autocomplete__inner'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the autocomplete as more_menu', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="autocomplete-more_menu"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the autocomplete as small more_menu', async () => {
    const screenshot = await testPageScreenshot({
      style: {
        width: '2rem',
        height: '2rem'
      },
      selector: '[data-dnb-test="autocomplete-more_menu"]',
      simulateSelector:
        '[data-dnb-test="autocomplete-more_menu"] .dnb-autocomplete:nth-of-type(1) .dnb-autocomplete__trigger',
      simulate: 'click'
      // waitAfterSimulateSelector:
      //   '[data-dnb-test="autocomplete-more_menu"] .dnb-autocomplete:nth-of-type(1) .dnb-drawer-list__options',
      // waitAfterSimulate: 100 // to make sure we make the screenshot afte the animation is show
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
