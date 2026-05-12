import {
  test,
  makeScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

test.describe('Modal', () => {
  const url = '/uilib/components/modal/demos/'

  test('have to match the default modal trigger button', async () => {
    await makeScreenshot({
      url,
      selector: '[data-visual-test="modal-standard"]',
    })
  })

  test('have to match the default modal window', async () => {
    await makeScreenshot({
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
  })
})
