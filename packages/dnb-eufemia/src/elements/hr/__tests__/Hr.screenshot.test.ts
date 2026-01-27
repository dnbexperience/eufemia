/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('Horizontal rule', () => {
  setupPageScreenshot({
    url: '/uilib/elements/horizontal-rule',
  })

  it('should match default horizontal rule', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="hr-default"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match breakout horizontal rule', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="hr-breakout"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match dashed horizontal rule', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="hr-dashed"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
