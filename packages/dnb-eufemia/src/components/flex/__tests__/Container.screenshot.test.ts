import {
  test,
  expect,
  makeScreenshot,
} from '../../../core/playwright/screenshotSetup'

test.describe('Flex.Container', () => {
  test('have to match divider', async () => {
    const screenshot = await makeScreenshot({
      url: '/uilib/layout/flex/container/demos/',
      selector:
        '[data-visual-test="flex-container-divider"] .dnb-flex-container',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match with children', async () => {
    const screenshot = await makeScreenshot({
      url: '/uilib/layout/flex/container/demos/',
      selector:
        '[data-visual-test="flex-container-with-children"] .dnb-flex-container',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match bookend line', async () => {
    const screenshot = await makeScreenshot({
      url: '/uilib/layout/flex/container/demos/',
      selector:
        '[data-visual-test="flex-container-line-framed"] .dnb-flex-container',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match wrapped bookend line', async () => {
    const screenshot = await makeScreenshot({
      url: '/uilib/layout/flex/container/demos/',
      pageViewport: {
        width: 240,
      },
      selector:
        '[data-visual-test="flex-container-line-framed"] .dnb-flex-container',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match field on large viewport', async () => {
    const screenshot = await makeScreenshot({
      url: '/uilib/layout/flex/container/demos/',
      selector:
        '[data-visual-test="flex-container-field"] .dnb-flex-container',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match field on small viewport', async () => {
    const screenshot = await makeScreenshot({
      url: '/uilib/layout/flex/container/demos/',
      pageViewport: {
        width: 600,
      },
      selector:
        '[data-visual-test="flex-container-field"] .dnb-flex-container',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match field on x-small viewport', async () => {
    const screenshot = await makeScreenshot({
      url: '/uilib/layout/flex/container/demos/',
      pageViewport: {
        width: 300,
      },
      selector:
        '[data-visual-test="flex-container-field"] .dnb-flex-container',
    })
    expect(screenshot).toMatchSnapshot()
  })
})
