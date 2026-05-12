import {
  test,
  makeScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

test.describe('Flex.Container', () => {
  test('have to match divider', async () => {
    await makeScreenshot({
      url: '/uilib/layout/flex/container/demos/',
      selector:
        '[data-visual-test="flex-container-divider"] .dnb-flex-container',
    })
  })

  test('have to match with children', async () => {
    await makeScreenshot({
      url: '/uilib/layout/flex/container/demos/',
      selector:
        '[data-visual-test="flex-container-with-children"] .dnb-flex-container',
    })
  })

  test('have to match bookend line', async () => {
    await makeScreenshot({
      url: '/uilib/layout/flex/container/demos/',
      selector:
        '[data-visual-test="flex-container-line-framed"] .dnb-flex-container',
    })
  })

  test('have to match wrapped bookend line', async () => {
    await makeScreenshot({
      url: '/uilib/layout/flex/container/demos/',
      pageViewport: {
        width: 240,
      },
      selector:
        '[data-visual-test="flex-container-line-framed"] .dnb-flex-container',
    })
  })

  test('have to match field on large viewport', async () => {
    await makeScreenshot({
      url: '/uilib/layout/flex/container/demos/',
      selector:
        '[data-visual-test="flex-container-field"] .dnb-flex-container',
    })
  })

  test('have to match field on small viewport', async () => {
    await makeScreenshot({
      url: '/uilib/layout/flex/container/demos/',
      pageViewport: {
        width: 600,
      },
      selector:
        '[data-visual-test="flex-container-field"] .dnb-flex-container',
    })
  })

  test('have to match field on x-small viewport', async () => {
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
