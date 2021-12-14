/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('Tag screenshot', () => {
  setupPageScreenshot({ url: '/uilib/components/tag/demos' })

  it('have to match Tag default', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="tag-default"] .dnb-tag',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match Tag with primary icon', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="tag-icon"] .dnb-tag',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match Tag with secondary icon', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test=""tag-secondary-icon"] .dnb-tag',
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
