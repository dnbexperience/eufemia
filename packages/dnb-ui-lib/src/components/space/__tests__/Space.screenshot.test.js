/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

describe('Space screenshot', () => {
  setupPageScreenshot({
    url: '/uilib/components/space/demos'
  })
  // looks like this is not working well
  it.skip('have to match the spacing patterns', async () => {
    const screenshot = await testPageScreenshot({
      waitAfterSimulate: 200,
      selector: '[data-dnb-test="spacing-patterns"] .spacing-patterns'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the 2.5 spacing margins', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="spacing-margins"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the spacing method 1', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="spacing-method-space"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the spacing method 2', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="spacing-method-form-row"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the spacing method 3', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="spacing-method-component"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
