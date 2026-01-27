/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('GlobalError', () => {
  const pageViewport = {
    width: 400,
  }

  setupPageScreenshot({
    pageViewport,
    url: '/uilib/components/global-error/demos',
  })

  it('should match the 404 status', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="global-error-404"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match the 500 status', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="global-error-500"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match the custom status', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="global-error-custom"]',
      matchConfig: {
        failureThreshold: 0.17, // because of dev vs build diff
      },
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
