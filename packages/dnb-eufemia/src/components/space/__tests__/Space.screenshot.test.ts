import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/playwright/screenshotSetup'

test.describe('Space', () => {
  setupPageScreenshot({
    url: '/uilib/layout/space/demos/',
  })

  test('have to match the spacing patterns', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="spacing-patterns"] .spacing-patterns',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match the spacing with elements', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="spacing-elements"] .spacing-elements',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match the 2.5 spacing margins', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="spacing-margins"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match the spacing method 1', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="spacing-method-space"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match the spacing method 2', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="spacing-method-form-row"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match the spacing method 3', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="spacing-method-component"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match the spacing reset', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="spacing-reset"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match inner spacing', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="inner-spacing"]',
    })
    expect(screenshot).toMatchSnapshot()
  })
})

test.describe('Space inner spacing breakpoints', () => {
  setupPageScreenshot({
    url: '/uilib/layout/space/demos/',
  })

  test('have to match inner spacing on "small" breakpoint', async () => {
    const screenshot = await makeScreenshot({
      pageViewport: {
        width: 400,
      },
      selector: '[data-visual-test="inner-spacing"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match inner spacing on "medium" breakpoint', async () => {
    const screenshot = await makeScreenshot({
      pageViewport: {
        width: 800,
      },
      selector: '[data-visual-test="inner-spacing"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match inner spacing on "large" breakpoint', async () => {
    const screenshot = await makeScreenshot({
      pageViewport: {
        width: 1000,
      },
      selector: '[data-visual-test="inner-spacing"]',
    })
    expect(screenshot).toMatchSnapshot()
  })
})

test.describe('Space responsive outer spacing', () => {
  setupPageScreenshot({
    url: '/uilib/layout/space/demos/',
  })

  test('have to match responsive outer spacing on "small" breakpoint', async () => {
    const screenshot = await makeScreenshot({
      pageViewport: {
        width: 400,
      },
      selector: '[data-visual-test="responsive-outer-spacing"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match responsive outer spacing on "medium" breakpoint', async () => {
    const screenshot = await makeScreenshot({
      pageViewport: {
        width: 800,
      },
      selector: '[data-visual-test="responsive-outer-spacing"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match responsive outer spacing on "large" breakpoint', async () => {
    const screenshot = await makeScreenshot({
      pageViewport: {
        width: 1000,
      },
      selector: '[data-visual-test="responsive-outer-spacing"]',
    })
    expect(screenshot).toMatchSnapshot()
  })
})

test.describe('Space inline/block', () => {
  setupPageScreenshot({
    url: '/uilib/layout/space/demos/',
  })

  test('have to match space inline/block', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="space-inline-block"]',
    })
    expect(screenshot).toMatchSnapshot()
  })
})

test.describe('Space innerspace media queries', () => {
  setupPageScreenshot({
    url: '/uilib/layout/space/demos/',
  })

  test('have to match innerspace media queries on "small" breakpoint', async () => {
    const screenshot = await makeScreenshot({
      pageViewport: {
        width: 400,
      },
      selector: '[data-visual-test="innerspace-media-queries"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match innerspace media queries on "medium" breakpoint', async () => {
    const screenshot = await makeScreenshot({
      pageViewport: {
        width: 800,
      },
      selector: '[data-visual-test="innerspace-media-queries"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match innerspace media queries on "large" breakpoint', async () => {
    const screenshot = await makeScreenshot({
      pageViewport: {
        width: 1000,
      },
      selector: '[data-visual-test="innerspace-media-queries"]',
    })
    expect(screenshot).toMatchSnapshot()
  })
})

test.describe('Space media queries', () => {
  setupPageScreenshot({
    url: '/uilib/layout/space/demos/',
  })

  test('have to match space media queries on "small" breakpoint', async () => {
    const screenshot = await makeScreenshot({
      pageViewport: {
        width: 400,
      },
      selector: '[data-visual-test="space-media-queries"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match space media queries on "medium" breakpoint', async () => {
    const screenshot = await makeScreenshot({
      pageViewport: {
        width: 800,
      },
      selector: '[data-visual-test="space-media-queries"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match space media queries on "large" breakpoint', async () => {
    const screenshot = await makeScreenshot({
      pageViewport: {
        width: 1000,
      },
      selector: '[data-visual-test="space-media-queries"]',
    })
    expect(screenshot).toMatchSnapshot()
  })
})
