/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('Breadcrumb screenshot', () => {
  setupPageScreenshot({ url: '/uilib/components/breadcrumb/demos' })

  it('have to match Breadcrumb single', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="breadcrumb-single"] .dnb-breadcrumb',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match Breadcrumb multiple', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="breadcrumb-multiple"] .dnb-breadcrumb',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match Breadcrumb multiple with children', async () => {
    const screenshot = await testPageScreenshot({
      selector:
        '[data-visual-test="breadcrumb-multiple-children"] .dnb-breadcrumb',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match Breadcrumb collapse', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="breadcrumb-collapse"] .dnb-breadcrumb',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match Breadcrumb collapse opened', async () => {
    const screenshot = await testPageScreenshot({
      selector:
        '[data-visual-test="breadcrumb-collapse-open"] .dnb-breadcrumb',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
