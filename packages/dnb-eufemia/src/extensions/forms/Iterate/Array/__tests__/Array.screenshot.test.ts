/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import { makeScreenshot } from '../../../../../core/jest/jestSetupScreenshots'

describe('Iterate.Array', () => {
  const url = '/uilib/extensions/forms/Iterate/Array/demos'

  it('have to match view container', async () => {
    const screenshot = await makeScreenshot({
      url,
      selector:
        '[data-visual-test="view-and-edit-container"] .dnb-form-iterate-block',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match edit container', async () => {
    const screenshot = await makeScreenshot({
      url,
      selector: '[data-visual-test="view-and-edit-container"]',
      screenshotSelector: '.dnb-form-iterate-edit-block',
      waitAfterSimulate: 100,
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="view-and-edit-container"] .dnb-form-iterate-push-button',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
