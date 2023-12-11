/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('Card', () => {
  setupPageScreenshot({
    url: '/uilib/components/card/demos',
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

describe('Card', () => {
  it('have to match border in small screen size', async () => {
    const screenshot = await makeScreenshot({
      pageViewport: {
        width: 400,
      },
      url: '/uilib/components/card/demos',
      selector: '[data-visual-test="layout-card-border"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
