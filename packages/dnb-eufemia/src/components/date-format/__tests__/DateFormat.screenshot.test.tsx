/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('DateFormat', () => {
  setupPageScreenshot({
    url: '/uilib/components/date-format/demos',
  })

  it('should match date styles', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="date-format-date-styles"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match date when inline', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="date-format-date-inline"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
