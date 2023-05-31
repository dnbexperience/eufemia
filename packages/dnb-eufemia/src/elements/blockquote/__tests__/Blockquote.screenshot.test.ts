/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe.each(['ui', 'sbanken'])('Blockquote for %s', (themeName, url) => {
  setupPageScreenshot({ themeName, url: '/uilib/elements/blockquote' })
  const style = {
    width: '30rem', // make sure our input gets an explicit width, because of mac/linux rendering differences
  }

  it('have to match default "blockquote"', async () => {
    const screenshot = await makeScreenshot({
      style,
      selector: '[data-visual-test="blockquote-default"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match "blockquote" with top aligned graphic', async () => {
    const screenshot = await makeScreenshot({
      style,
      selector: '[data-visual-test="blockquote-top"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match "blockquote" with top aligned graphic and no background', async () => {
    const screenshot = await makeScreenshot({
      style,
      selector: '[data-visual-test="blockquote-top-no-background"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match "blockquote" with no background', async () => {
    const screenshot = await makeScreenshot({
      style,
      selector: '[data-visual-test="blockquote-no-background"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
