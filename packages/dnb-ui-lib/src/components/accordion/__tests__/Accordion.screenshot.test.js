/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

describe('Accordion unchecked screenshot', () => {
  setupPageScreenshot({
    url: '/uilib/components/accordion/demos'
  })
  it('have to match accordion in unchecked state', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="accordion-default"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match accordion in unchecked state with focus', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="accordion-default"]',
      simulateSelector:
        '[data-dnb-test="accordion-default"] .dnb-accordion__button',
      simulate: 'focus' // should be tested first
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match accordion in unchecked state with hover', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="accordion-default"]',
      simulateSelector:
        '[data-dnb-test="accordion-default"] .dnb-accordion__button',
      simulate: 'hover'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

// NB: Because of focus simulation and screenshotElement.press('Tab')
// we have to run the two focus simulations in a seperate run each
describe('Accordion checked screenshot', () => {
  setupPageScreenshot({ url: '/uilib/components/accordion/demos' })
  it('have to match accordion in checked state', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="accordion-checked"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match accordion in checked state with focus', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="accordion-checked"]',
      simulateSelector:
        '[data-dnb-test="accordion-checked"] .dnb-accordion__button',
      simulate: 'focus' // should be tested first
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match accordion in checked state with hover', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="accordion-checked"]',
      simulateSelector:
        '[data-dnb-test="accordion-checked"] .dnb-accordion__button',
      simulate: 'hover'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match accordion group', async () => {
    const screenshot = await testPageScreenshot({
      selector:
        '[data-dnb-test="accordion-group-default"] .dnb-accordion-group'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match accordion group in vertical layout', async () => {
    const screenshot = await testPageScreenshot({
      selector:
        '[data-dnb-test="accordion-group-vertical"] .dnb-accordion-group'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match accordion group with form-status', async () => {
    const screenshot = await testPageScreenshot({
      selector:
        '[data-dnb-test="accordion-group-status"] .dnb-accordion-group'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
