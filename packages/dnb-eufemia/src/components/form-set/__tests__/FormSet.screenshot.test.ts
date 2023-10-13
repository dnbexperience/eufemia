/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('FormSet', () => {
  setupPageScreenshot({ url: '/uilib/layout/form-set/demos' })

  it('have to match default form-set', async () => {
    const screenshot = await makeScreenshot({
      style: {
        width: '40rem', // make sure our input gets an explicit width, because of mac/linux rendering differences
      },
      selector: '[data-visual-test="form-set-default"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match vertical form-set', async () => {
    const screenshot = await makeScreenshot({
      style: {
        width: '30rem', // make sure our input gets an explicit width, because of mac/linux rendering differences
      },
      selector: '[data-visual-test="form-set-vertical"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
