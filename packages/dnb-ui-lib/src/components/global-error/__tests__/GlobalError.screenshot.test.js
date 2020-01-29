/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  isCI,
  testPageScreenshot,
  setupPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

describe('GlobalError screenshot', () => {
  if (!isCI) {
    const style = { width: '25em' }
    setupPageScreenshot({
      url: '/uilib/components/global-error'
    })
    it('have to match the 404 status', async () => {
      const screenshot = await testPageScreenshot({
        style,
        selector: '[data-dnb-test="global-error-404"]'
      })
      expect(screenshot).toMatchImageSnapshot()
    })
    it('have to match the 500 status', async () => {
      const screenshot = await testPageScreenshot({
        style,
        selector: '[data-dnb-test="global-error-500"]'
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  } else {
    it('beta release umbrella', () => {
      expect(1).toBe(1)
    })
  }
})
