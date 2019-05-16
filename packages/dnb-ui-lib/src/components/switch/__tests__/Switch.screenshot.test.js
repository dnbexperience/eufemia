/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

describe('Switch unchecked screenshot', () => {
  setupPageScreenshot({ url: '/uilib/components/switch' })
  it('have to match switch in unchecked state', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="switch-default"] .dnb-switch'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match switch in unchecked state with focus', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="switch-default"] .dnb-switch',
      simulateSelector:
        '[data-dnb-test="switch-default"] .dnb-switch__input',
      simulate: 'focus'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match switch in unchecked state with hover', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="switch-default"] .dnb-switch',
      simulateSelector:
        '[data-dnb-test="switch-default"] .dnb-switch__input',
      simulate: 'hover'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

// NB: Because of focus simulation and screenshotElement.press('Tab')
// we have to run the two focus simulations in a seperate run each
describe('Switch checked screenshot', () => {
  setupPageScreenshot({ url: '/uilib/components/switch' })
  it('have to match switch in checked state', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="switch-checked"] .dnb-switch'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match switch in checked state with focus', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="switch-checked"] .dnb-switch',
      simulateSelector:
        '[data-dnb-test="switch-checked"] .dnb-switch__input',
      simulate: 'focus'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match switch in checked state with hover', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="switch-checked"] .dnb-switch',
      simulateSelector:
        '[data-dnb-test="switch-checked"] .dnb-switch__input',
      simulate: 'hover'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match disabled switch', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="switch-disabled"] .dnb-switch'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
