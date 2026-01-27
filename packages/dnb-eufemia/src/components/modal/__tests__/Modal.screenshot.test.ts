/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import { makeScreenshot } from '../../../core/jest/jestSetupScreenshots'

describe('Modal', () => {
  const url = '/uilib/components/modal/demos'

  it('should match the default modal trigger button', async () => {
    const screenshot = await makeScreenshot({
      url,
      selector: '[data-visual-test="modal-standard"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match the default modal window', async () => {
    const screenshot = await makeScreenshot({
      url: url,
      pageViewport: {
        width: 700,
        height: 600,
      },
      selector: '[data-visual-test="modal-standard"]', // only to make sure we have a valid selector
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="modal-standard"] button:first-of-type',
      screenshotSelector: '.dnb-modal__content',
      rootClassName: 'hide-page-content',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
