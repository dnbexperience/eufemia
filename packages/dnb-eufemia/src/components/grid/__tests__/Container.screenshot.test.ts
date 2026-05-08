import {
  test,
  expect,
  makeScreenshot,
} from '../../../core/playwright/screenshotSetup'

test.describe('Grid.Container', () => {
  const selector =
    '[data-visual-test="grid-container-responsive"] .dnb-grid-container'

  test('have to match responsive size on large viewport', async () => {
    const screenshot = await makeScreenshot({
      url: '/uilib/layout/grid/container/demos/',
      pageViewport: {
        width: 1000,
      },
      style: {
        'white-space': 'nowrap',
      },
      selector,
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match responsive size on medium viewport', async () => {
    const screenshot = await makeScreenshot({
      url: '/uilib/layout/grid/container/demos/',
      pageViewport: {
        width: 800,
      },
      selector,
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match responsive size on small viewport', async () => {
    const screenshot = await makeScreenshot({
      url: '/uilib/layout/grid/container/demos/',
      pageViewport: {
        width: 600,
      },
      selector,
    })
    expect(screenshot).toMatchSnapshot()
  })
})
