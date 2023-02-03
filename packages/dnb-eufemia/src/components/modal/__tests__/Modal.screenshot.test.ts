/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import { makeScreenshot } from '../../../core/jest/jestSetupScreenshots'

describe('Modal', () => {
  const url = '/uilib/components/modal/visual-tests/hidden-tests'

  it('have to match the default modal trigger button', async () => {
    const screenshot = await makeScreenshot({
      url,
      selector: '[data-visual-test="modal-trigger-default"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the suffix help button usage', async () => {
    const screenshot = await makeScreenshot({
      url,
      selector: '[data-visual-test="modal-help-button"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the default modal window with title', async () => {
    const screenshot = await makeScreenshot({
      url,
      selector: 'div#dnb-modal-root', // only to make sure we have a valid selector
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="modal-trigger-default"] button:first-of-type',
      screenshotSelector: '.dnb-dialog',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the default modal window', async () => {
    const screenshot = await makeScreenshot({
      url: '/uilib/components/modal/visual-tests/hidden-tests',
      pageViewport: {
        width: 700,
        height: 600,
      },
      selector: 'div#dnb-modal-root', // only to make sure we have a valid selector
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="modal-trigger-default"] button:first-of-type',
      screenshotSelector: '.dnb-modal__content',
      rootClassName: 'hide-page-content',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match a fullscreen modal', async () => {
    const screenshot = await makeScreenshot({
      url: '/uilib/components/modal/visual-tests/hidden-tests',
      pageViewport: {
        width: 400,
        height: 400,
      },
      selector: 'div#dnb-modal-root', // only to make sure we have a valid selector
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="modal-fullscreen"] button:first-of-type',
      screenshotSelector: '.dnb-modal__content',
      rootClassName: 'hide-page-content',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
