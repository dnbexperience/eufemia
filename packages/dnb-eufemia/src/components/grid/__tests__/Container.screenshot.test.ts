import { it, describe } from 'vitest'
import { makeScreenshot } from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe('Grid.Container', () => {
  const selector =
    '[data-visual-test="grid-container-responsive"] .dnb-grid-container'

  it('have to match responsive size on large viewport', async () => {
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

  it('have to match responsive size on medium viewport', async () => {
    await makeScreenshot({
      url: '/uilib/layout/grid/container/demos/',
      pageViewport: {
        width: 800,
      },
      selector,
    })
  })

  it('have to match responsive size on small viewport', async () => {
    await makeScreenshot({
      url: '/uilib/layout/grid/container/demos/',
      pageViewport: {
        width: 600,
      },
      selector,
    })
  })
})
