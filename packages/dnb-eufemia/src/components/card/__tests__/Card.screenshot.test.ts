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

  it('have to match grid', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="layout-card-grid"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match flex', async () => {
    const screenshot = await makeScreenshot({
      addWrapper: false,
      selector:
        '[data-visual-test="layout-card-flex"] .dnb-flex-container',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Card small screen', () => {
  const params = {
    pageViewport: {
      width: 400,
    },
    url: '/uilib/components/card/demos',
  }
  it('have to match border', async () => {
    const screenshot = await makeScreenshot({
      ...params,
      selector: '[data-visual-test="layout-card-border"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match grid', async () => {
    const screenshot = await makeScreenshot({
      ...params,
      selector: '[data-visual-test="layout-card-grid"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match flex', async () => {
    const screenshot = await makeScreenshot({
      ...params,
      addWrapper: false,
      selector:
        '[data-visual-test="layout-card-flex"] .dnb-flex-container',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
