/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

describe('Button screenshot', () => {
  setupPageScreenshot({ url: '/uilib/components/button' })
  it('have to match "dnb-button--secondary"', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="button-secondary"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match "dnb-button--primary"', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="button-primary"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match "dnb-button--primary" with hover state', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="button-primary"]',
      simulate: 'hover'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match "dnb-button--primary" with active state', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="button-primary"]',
      simulate: 'active'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match "dnb-button--primary" with focus state', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="button-primary"]',
      simulate: 'focus'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
