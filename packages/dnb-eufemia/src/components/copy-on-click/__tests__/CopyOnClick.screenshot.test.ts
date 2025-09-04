/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('CopyOnClick', () => {
  setupPageScreenshot({
    url: '/uilib/components/copy-on-click/demos',
  })

  it('have to match default', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="copy-on-click-default"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match tooltip', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="copy-on-click-default"]',
      simulate: 'click',
      simulateSelector: '.dnb-copy-on-click',
      recalculateHeightAfterSimulate: true,
      waitAfterSimulate: 250,
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
