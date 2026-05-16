import { it, describe } from 'vitest'
import { makeScreenshot } from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe('Flex.Container', () => {
  it('have to match divider', async () => {
    await makeScreenshot({
      url: '/uilib/layout/flex/container/demos/',
      selector:
        '[data-visual-test="flex-container-divider"] .dnb-flex-container',
    })
  })

  it('have to match with children', async () => {
    await makeScreenshot({
      url: '/uilib/layout/flex/container/demos/',
      selector:
        '[data-visual-test="flex-container-with-children"] .dnb-flex-container',
    })
  })

  it('have to match bookend line', async () => {
    await makeScreenshot({
      url: '/uilib/layout/flex/container/demos/',
      selector:
        '[data-visual-test="flex-container-line-framed"] .dnb-flex-container',
    })
  })

  it('have to match wrapped bookend line', async () => {
    await makeScreenshot({
      url: '/uilib/layout/flex/container/demos/',
      pageViewport: {
        width: 240,
      },
      selector:
        '[data-visual-test="flex-container-line-framed"] .dnb-flex-container',
    })
  })

  it('have to match field on large viewport', async () => {
    await makeScreenshot({
      url: '/uilib/layout/flex/container/demos/',
      selector:
        '[data-visual-test="flex-container-field"] .dnb-flex-container',
    })
  })

  it('have to match field on small viewport', async () => {
    await makeScreenshot({
      url: '/uilib/layout/flex/container/demos/',
      pageViewport: {
        width: 600,
      },
      selector:
        '[data-visual-test="flex-container-field"] .dnb-flex-container',
    })
  })

  it('have to match field on x-small viewport', async () => {
    await makeScreenshot({
      url: '/uilib/layout/flex/container/demos/',
      pageViewport: {
        width: 300,
      },
      selector:
        '[data-visual-test="flex-container-field"] .dnb-flex-container',
    })
  })
})
