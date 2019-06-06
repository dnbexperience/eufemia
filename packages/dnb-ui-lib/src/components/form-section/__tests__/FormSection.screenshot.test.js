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
  it('have to match default form-section', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="form-section-default"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match default form-section with hover', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="form-section-default"]',
      simulate: 'hover'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match vertical form-section', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="form-section-vertical"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
