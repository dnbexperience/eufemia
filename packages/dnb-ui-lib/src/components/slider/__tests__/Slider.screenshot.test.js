/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

describe('Slider screenshot', () => {
  setupPageScreenshot({ url: '/uilib/components/slider' })
  it('have to match default slider', async () => {
    const screenshot = await testPageScreenshot({
      style: { width: '20rem' },
      selector: '[data-dnb-test="slider-default"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match vertical slider', async () => {
    const screenshot = await testPageScreenshot({
      style: { height: '12rem' },
      selector: '[data-dnb-test="slider-vertical"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
