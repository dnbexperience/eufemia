/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe.each(['ui', 'sbanken'])('CopyOnClick for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/copy-on-click/demos',
  })

  it('have to match the default', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="copy-on-click-default"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match when cursor is disabled', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="copy-on-click-cursor-disabled"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
