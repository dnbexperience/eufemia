/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('GlobalError screenshot', () => {
  const style = { width: '25em' }
  setupPageScreenshot({
    url: '/uilib/components/global-error/demos',
  })
  it('have to match the 404 status', async () => {
    const screenshot = await testPageScreenshot({
      style,
      selector: '[data-visual-test="global-error-404"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the 500 status', async () => {
    const screenshot = await testPageScreenshot({
      style,
      selector: '[data-visual-test="global-error-500"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
