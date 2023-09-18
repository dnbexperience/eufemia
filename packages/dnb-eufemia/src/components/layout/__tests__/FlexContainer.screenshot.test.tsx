/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('Layout.FlexContainer', () => {
  setupPageScreenshot({
    url: '/uilib/components/layout/FlexContainer/demos',
  })

  it('have to match divider', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="layout-flex-container-divider"] .dnb-layout__flex-container',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
