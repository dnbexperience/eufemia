/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe.each(['ui', 'sbanken'])('Span for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/elements/span',
  })

  it('basics', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="span-basic"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('with modifiers', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="span-modifiers"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('all sizes and weights', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="span-sizes"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
