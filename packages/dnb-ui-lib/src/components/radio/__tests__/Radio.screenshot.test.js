/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

describe('Radio unchecked screenshot', () => {
  setupPageScreenshot({ url: '/uilib/components/radio' })
  it('have to match radio in unchecked state', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="radio-default"] .dnb-radio'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match radio in unchecked state with focus', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="radio-default"] .dnb-radio',
      simulateSelector:
        '[data-dnb-test="radio-default"] .dnb-radio__input',
      simulate: 'focus'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match radio in unchecked state with hover', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="radio-default"] .dnb-radio',
      simulateSelector:
        '[data-dnb-test="radio-default"] .dnb-radio__input',
      simulate: 'hover'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

// NB: Because of focus simulation and screenshotElement.press('Tab')
// we have to run the two focus simulations in a seperate run each
describe('Radio checked screenshot', () => {
  setupPageScreenshot({ url: '/uilib/components/radio' })
  it('have to match radio in checked state', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="radio-checked"] .dnb-radio'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match radio in checked state with focus', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="radio-checked"] .dnb-radio',
      simulateSelector:
        '[data-dnb-test="radio-checked"] .dnb-radio__input',
      simulate: 'focus'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match radio in checked state with hover', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="radio-checked"] .dnb-radio',
      simulateSelector:
        '[data-dnb-test="radio-checked"] .dnb-radio__input',
      simulate: 'hover'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match disabled radio', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="radio-disabled"] .dnb-radio'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match radio in error state', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="radio-error"] .dnb-radio'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
