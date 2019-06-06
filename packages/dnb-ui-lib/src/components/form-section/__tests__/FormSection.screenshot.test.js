/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

describe('FormSection screenshot', () => {
  setupPageScreenshot({ url: '/uilib/components/form-section' })
  // const style = { width: '8rem' }
  it('have to match default form-section', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="form-section-default"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match white form-section', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="form-section-white"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match divider form-section', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="form-section-divider"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match mint-green form-section', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="form-section-mint-green"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match emerald-green form-section', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="form-section-emerald-green"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match signal-orange form-section', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="form-section-signal-orange"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
