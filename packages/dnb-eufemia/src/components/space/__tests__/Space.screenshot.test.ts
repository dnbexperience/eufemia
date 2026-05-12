import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

test.describe('Space', () => {
  setupPageScreenshot({
    url: '/uilib/layout/space/demos/',
  })

  test('have to match the spacing patterns', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="spacing-patterns"] .spacing-patterns',
    })
  })

  test('have to match the spacing with elements', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="spacing-elements"] .spacing-elements',
    })
  })

  test('have to match the 2.5 spacing margins', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="spacing-margins"]',
    })
  })

  test('have to match the spacing method 1', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="spacing-method-space"]',
    })
  })

  test('have to match the spacing method 2', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="spacing-method-form-row"]',
    })
  })

  test('have to match the spacing method 3', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="spacing-method-component"]',
    })
  })

  test('have to match the spacing reset', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="spacing-reset"]',
    })
  })

  test('have to match inner spacing', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="inner-spacing"]',
    })
  })
})

test.describe('Space inner spacing breakpoints', () => {
  setupPageScreenshot({
    url: '/uilib/layout/space/demos/',
  })

  test('have to match inner spacing on "small" breakpoint', async () => {
    await makeScreenshot({
      pageViewport: {
        width: 400,
      },
      selector: '[data-visual-test="inner-spacing"]',
    })
  })

  test('have to match inner spacing on "medium" breakpoint', async () => {
    await makeScreenshot({
      pageViewport: {
        width: 800,
      },
      selector: '[data-visual-test="inner-spacing"]',
    })
  })

  test('have to match inner spacing on "large" breakpoint', async () => {
    await makeScreenshot({
      pageViewport: {
        width: 1000,
      },
      selector: '[data-visual-test="inner-spacing"]',
    })
  })
})

test.describe('Space responsive outer spacing', () => {
  setupPageScreenshot({
    url: '/uilib/layout/space/demos/',
  })

  test('have to match responsive outer spacing on "small" breakpoint', async () => {
    await makeScreenshot({
      pageViewport: {
        width: 400,
      },
      selector: '[data-visual-test="responsive-outer-spacing"]',
    })
  })

  test('have to match responsive outer spacing on "medium" breakpoint', async () => {
    await makeScreenshot({
      pageViewport: {
        width: 800,
      },
      selector: '[data-visual-test="responsive-outer-spacing"]',
    })
  })

  test('have to match responsive outer spacing on "large" breakpoint', async () => {
    await makeScreenshot({
      pageViewport: {
        width: 1000,
      },
      selector: '[data-visual-test="responsive-outer-spacing"]',
    })
  })
})

test.describe('Space inline/block', () => {
  setupPageScreenshot({
    url: '/uilib/layout/space/demos/',
  })

  test('have to match space inline/block', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="space-inline-block"]',
    })
  })
})

test.describe('Space innerspace media queries', () => {
  setupPageScreenshot({
    url: '/uilib/layout/space/demos/',
  })

  test('have to match innerspace media queries on "small" breakpoint', async () => {
    await makeScreenshot({
      pageViewport: {
        width: 400,
      },
      selector: '[data-visual-test="innerspace-media-queries"]',
    })
  })

  test('have to match innerspace media queries on "medium" breakpoint', async () => {
    await makeScreenshot({
      pageViewport: {
        width: 800,
      },
      selector: '[data-visual-test="innerspace-media-queries"]',
    })
  })

  test('have to match innerspace media queries on "large" breakpoint', async () => {
    await makeScreenshot({
      pageViewport: {
        width: 1000,
      },
      selector: '[data-visual-test="innerspace-media-queries"]',
    })
  })
})

test.describe('Space media queries', () => {
  setupPageScreenshot({
    url: '/uilib/layout/space/demos/',
  })

  test('have to match space media queries on "small" breakpoint', async () => {
    await makeScreenshot({
      pageViewport: {
        width: 400,
      },
      selector: '[data-visual-test="space-media-queries"]',
    })
  })

  test('have to match space media queries on "medium" breakpoint', async () => {
    await makeScreenshot({
      pageViewport: {
        width: 800,
      },
      selector: '[data-visual-test="space-media-queries"]',
    })
  })

  test('have to match space media queries on "large" breakpoint', async () => {
    await makeScreenshot({
      pageViewport: {
        width: 1000,
      },
      selector: '[data-visual-test="space-media-queries"]',
    })
  })
})
