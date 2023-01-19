/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('Tag', () => {
  setupPageScreenshot({ url: '/uilib/components/tag/demos' })

  it('have to match Tag default', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="tag-default"] .dnb-tag',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match Tag with icon', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="tag-icon"] .dnb-tag',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match a removable Tag', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="tag-removable"] .dnb-tag',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match a removable Tag list', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="tag-removable-list"] .dnb-tag',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match a inline Tag', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="tag-inline"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match a skeleton Tag', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="tag-skeleton"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Clickable tag', () => {
  setupPageScreenshot({
    url: '/uilib/components/tag/visual-tests/clickable-tag',
  })
  it('have to match a clickable Tag', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="tag-clickable"] .dnb-tag',
    })

    expect(screenshot).toMatchImageSnapshot()
  })
})
