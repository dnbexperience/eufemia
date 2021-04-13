/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

describe('Switch unchecked screenshot', () => {
  setupPageScreenshot({ url: '/uilib/components/switch/demos' })
  it('have to match switch in unchecked state', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="switch-default"] .dnb-switch'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match switch in unchecked state with focus', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="switch-default"] .dnb-switch',
      simulateSelector:
        '[data-visual-test="switch-default"] .dnb-switch__input',
      simulate: 'focus' // should be tested first
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match switch in unchecked state with hover', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="switch-default"] .dnb-switch',
      simulateSelector:
        '[data-visual-test="switch-default"] .dnb-switch__input',
      simulate: 'hover'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

// NB: Because of focus simulation and screenshotElement.press('Tab')
// we have to run the two focus simulations in a separate run each
describe('Switch checked screenshot', () => {
  setupPageScreenshot({ url: '/uilib/components/switch/demos' })
  it('have to match switch in checked state', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="switch-checked"] .dnb-switch'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match switch in checked state with focus', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="switch-checked"] .dnb-switch',
      simulateSelector:
        '[data-visual-test="switch-checked"] .dnb-switch__input',
      simulate: 'focus' // should be tested first
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match switch in checked state with hover', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="switch-checked"] .dnb-switch',
      simulateSelector:
        '[data-visual-test="switch-checked"] .dnb-switch__input',
      simulate: 'hover'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match switch in different sizes', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="switch-sizes"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match disabled switch', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="switch-disabled"] .dnb-switch'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match switch in error state', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="switch-error"] .dnb-switch'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
