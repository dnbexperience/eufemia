/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

describe('ToggleButton unchecked screenshot', () => {
  setupPageScreenshot({ url: '/uilib/components/toggle-button' })
  it.skip('have to match toggle-button in unchecked state', async () => {
    const screenshot = await testPageScreenshot({
      selector:
        '[data-dnb-test="toggle-button-default"] .dnb-toggle-button__shell'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it.skip('have to match toggle-button in unchecked state with focus', async () => {
    const screenshot = await testPageScreenshot({
      selector:
        '[data-dnb-test="toggle-button-default"] .dnb-toggle-button__shell',
      simulateSelector:
        '[data-dnb-test="toggle-button-default"] .dnb-toggle-button__input',
      simulate: 'focus'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it.skip('have to match toggle-button in unchecked state with hover', async () => {
    const screenshot = await testPageScreenshot({
      selector:
        '[data-dnb-test="toggle-button-default"] .dnb-toggle-button__shell',
      simulateSelector:
        '[data-dnb-test="toggle-button-default"] .dnb-toggle-button__input',
      simulate: 'hover'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

// NB: Because of focus simulation and screenshotElement.press('Tab')
// we have to run the two focus simulations in a seperate run each
describe('ToggleButton checked screenshot', () => {
  setupPageScreenshot({ url: '/uilib/components/toggle-button' })
  it.skip('have to match toggle-button in checked state', async () => {
    const screenshot = await testPageScreenshot({
      selector:
        '[data-dnb-test="toggle-button-checked"] .dnb-toggle-button__shell'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it.skip('have to match toggle-button in checked state with focus', async () => {
    const screenshot = await testPageScreenshot({
      selector:
        '[data-dnb-test="toggle-button-checked"] .dnb-toggle-button__shell',
      simulateSelector:
        '[data-dnb-test="toggle-button-checked"] .dnb-toggle-button__input',
      simulate: 'focus'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it.skip('have to match toggle-button in checked state with hover', async () => {
    const screenshot = await testPageScreenshot({
      selector:
        '[data-dnb-test="toggle-button-checked"] .dnb-toggle-button__shell',
      simulateSelector:
        '[data-dnb-test="toggle-button-checked"] .dnb-toggle-button__input',
      simulate: 'hover'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it.skip('have to match toggle-button group', async () => {
    const screenshot = await testPageScreenshot({
      selector:
        '[data-dnb-test="toggle-button-group"] .dnb-toggle-button-group'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it.skip('have to match toggle-button group in vertical layout', async () => {
    const screenshot = await testPageScreenshot({
      selector:
        '[data-dnb-test="toggle-button-group-vertical"] .dnb-toggle-button-group'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it.skip('have to match toggle-button group with form-status', async () => {
    const screenshot = await testPageScreenshot({
      selector:
        '[data-dnb-test="toggle-button-group-status"] .dnb-toggle-button-group'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
