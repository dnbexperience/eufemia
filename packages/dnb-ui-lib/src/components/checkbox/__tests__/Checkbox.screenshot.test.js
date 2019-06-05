/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

describe('Checkbox unchecked screenshot', () => {
  setupPageScreenshot({ url: '/uilib/components/checkbox' })
  it('have to match checkbox in unchecked state', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="checkbox-default"] .dnb-checkbox__shell'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match checkbox in unchecked state with focus', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="checkbox-default"] .dnb-checkbox__shell',
      simulateSelector:
        '[data-dnb-test="checkbox-default"] .dnb-checkbox__input',
      simulate: 'focus'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match checkbox in unchecked state with hover', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="checkbox-default"] .dnb-checkbox__shell',
      simulateSelector:
        '[data-dnb-test="checkbox-default"] .dnb-checkbox__input',
      simulate: 'hover'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

// NB: Because of focus simulation and screenshotElement.press('Tab')
// we have to run the two focus simulations in a seperate run each
describe('Checkbox checked screenshot', () => {
  setupPageScreenshot({ url: '/uilib/components/checkbox' })
  it('have to match checkbox in checked state', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="checkbox-checked"] .dnb-checkbox__shell'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match checkbox in checked state with focus', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="checkbox-checked"] .dnb-checkbox__shell',
      simulateSelector:
        '[data-dnb-test="checkbox-checked"] .dnb-checkbox__input',
      simulate: 'focus'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match checkbox in checked state with hover', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="checkbox-checked"] .dnb-checkbox__shell',
      simulateSelector:
        '[data-dnb-test="checkbox-checked"] .dnb-checkbox__input',
      simulate: 'hover'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match disabled checkbox', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="checkbox-disabled"] .dnb-checkbox__shell'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match checkbox in error state', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="checkbox-error"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
