/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot,
  // isCI
} from '../../core/jest/jestSetupScreenshots'
describe('Paragraph ', () => {
  setupPageScreenshot({
    url: '/uilib/elements/paragraph',
  })

  it('have to match the paragraph example', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="paragraph-default"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the paragraph with small text', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="paragraph-small"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the paragraph with modifiers', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="paragraph-modifiers"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the paragraph with additional elements', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="paragraph-additional"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
