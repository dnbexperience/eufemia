/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('Layout.Card', () => {
  setupPageScreenshot({
    url: '/uilib/components/layout/Card/demos',
  })

  it('have to match border', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="layout-card-border"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match stack', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="layout-card-stack"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
