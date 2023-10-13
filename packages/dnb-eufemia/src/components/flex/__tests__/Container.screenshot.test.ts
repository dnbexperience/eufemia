/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import { makeScreenshot } from '../../../core/jest/jestSetupScreenshots'

describe('Flex.Container', () => {
  it('have to match divider', async () => {
    const screenshot = await makeScreenshot({
      url: '/uilib/layout/flex/container/demos',
      selector:
        '[data-visual-test="flex-container-divider"] .dnb-flex-container',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match field on large viewport', async () => {
    const screenshot = await makeScreenshot({
      url: '/uilib/layout/flex/container/demos',
      selector:
        '[data-visual-test="flex-container-field"] .dnb-flex-container',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match field on small viewport', async () => {
    const screenshot = await makeScreenshot({
      url: '/uilib/layout/flex/container/demos',
      pageViewport: {
        width: 600,
      },
      selector:
        '[data-visual-test="flex-container-field"] .dnb-flex-container',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match field on x-small viewport', async () => {
    const screenshot = await makeScreenshot({
      url: '/uilib/layout/flex/container/demos',
      pageViewport: {
        width: 300,
      },
      selector:
        '[data-visual-test="flex-container-field"] .dnb-flex-container',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
