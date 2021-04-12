/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot
} from '../../core/jest/jestSetupScreenshots'

describe('List screenshot', () => {
  setupPageScreenshot({
    url: '/uilib/elements/image'
  })
  it('have to match default image element', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="image-plain"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match image element with no source', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="image-no-source"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match image element with caption', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="image-caption"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match image element with skeleton', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="image-skeleton"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
