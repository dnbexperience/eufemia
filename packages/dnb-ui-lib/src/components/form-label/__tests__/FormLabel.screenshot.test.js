/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

describe('FormLabel screenshot', () => {
  setupPageScreenshot({ url: '/uilib/components/form-label' })
  const style = {
    // Flex makes the pixel height 100% correct
    display: 'flex'
  }
  it('have to match default form-label', async () => {
    const screenshot = await testPageScreenshot({
      style,
      selector: '[data-dnb-test="form-label-default"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match default form-label with hover', async () => {
    const screenshot = await testPageScreenshot({
      style,
      selector: '[data-dnb-test="form-label-default"]',
      simulate: 'hover'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match vertical form-label', async () => {
    const screenshot = await testPageScreenshot({
      style,
      selector: '[data-dnb-test="form-label-vertical"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
