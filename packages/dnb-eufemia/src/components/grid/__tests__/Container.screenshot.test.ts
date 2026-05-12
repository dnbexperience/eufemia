import {
  test,
  makeScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

test.describe('Grid.Container', () => {
  const selector =
    '[data-visual-test="grid-container-responsive"] .dnb-grid-container'

  test('have to match responsive size on large viewport', async () => {
    await makeScreenshot({
      url: '/uilib/layout/grid/container/demos/',
      pageViewport: {
        width: 1000,
      },
      style: {
        'white-space': 'nowrap',
      },
      selector,
    })
  })

  test('have to match responsive size on medium viewport', async () => {
    await makeScreenshot({
      url: '/uilib/layout/grid/container/demos/',
      pageViewport: {
        width: 800,
      },
      selector,
    })
  })

  test('have to match responsive size on small viewport', async () => {
    await makeScreenshot({
      url: '/uilib/layout/grid/container/demos/',
      pageViewport: {
        width: 600,
      },
      selector,
    })
  })
})
