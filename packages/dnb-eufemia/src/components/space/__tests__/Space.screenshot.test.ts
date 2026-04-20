/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('Space', () => {
  setupPageScreenshot({
    url: '/uilib/layout/space/demos/',
  })

  it('have to match the spacing patterns', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="spacing-patterns"] .spacing-patterns',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the spacing with elements', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="spacing-elements"] .spacing-elements',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the 2.5 spacing margins', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="spacing-margins"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the spacing method 1', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="spacing-method-space"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the spacing method 2', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="spacing-method-form-row"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the spacing method 3', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="spacing-method-component"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the spacing reset', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="spacing-reset"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match inner spacing', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="inner-spacing"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Space inner spacing breakpoints', () => {
  setupPageScreenshot({
    url: '/uilib/layout/space/demos/',
  })

  it('have to match inner spacing on "small" breakpoint', async () => {
    const screenshot = await makeScreenshot({
      pageViewport: {
        width: 400,
      },
      selector: '[data-visual-test="inner-spacing"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match inner spacing on "medium" breakpoint', async () => {
    const screenshot = await makeScreenshot({
      pageViewport: {
        width: 800,
      },
      selector: '[data-visual-test="inner-spacing"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match inner spacing on "large" breakpoint', async () => {
    const screenshot = await makeScreenshot({
      pageViewport: {
        width: 1000,
      },
      selector: '[data-visual-test="inner-spacing"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Space responsive outer spacing', () => {
  setupPageScreenshot({
    url: '/uilib/layout/space/demos/',
  })

  it('have to match responsive outer spacing on "small" breakpoint', async () => {
    const screenshot = await makeScreenshot({
      pageViewport: {
        width: 400,
      },
      selector: '[data-visual-test="responsive-outer-spacing"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match responsive outer spacing on "medium" breakpoint', async () => {
    const screenshot = await makeScreenshot({
      pageViewport: {
        width: 800,
      },
      selector: '[data-visual-test="responsive-outer-spacing"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match responsive outer spacing on "large" breakpoint', async () => {
    const screenshot = await makeScreenshot({
      pageViewport: {
        width: 1000,
      },
      selector: '[data-visual-test="responsive-outer-spacing"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Space inline/block', () => {
  setupPageScreenshot({
    url: '/uilib/layout/space/demos/',
  })

  it('have to match space inline/block', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="space-inline-block"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Space innerspace media queries', () => {
  setupPageScreenshot({
    url: '/uilib/layout/space/demos/',
  })

  it('have to match innerspace media queries on "small" breakpoint', async () => {
    const screenshot = await makeScreenshot({
      pageViewport: {
        width: 400,
      },
      selector: '[data-visual-test="innerspace-media-queries"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match innerspace media queries on "medium" breakpoint', async () => {
    const screenshot = await makeScreenshot({
      pageViewport: {
        width: 800,
      },
      selector: '[data-visual-test="innerspace-media-queries"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match innerspace media queries on "large" breakpoint', async () => {
    const screenshot = await makeScreenshot({
      pageViewport: {
        width: 1000,
      },
      selector: '[data-visual-test="innerspace-media-queries"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Space media queries', () => {
  setupPageScreenshot({
    url: '/uilib/layout/space/demos/',
  })

  it('have to match space media queries on "small" breakpoint', async () => {
    const screenshot = await makeScreenshot({
      pageViewport: {
        width: 400,
      },
      selector: '[data-visual-test="space-media-queries"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match space media queries on "medium" breakpoint', async () => {
    const screenshot = await makeScreenshot({
      pageViewport: {
        width: 800,
      },
      selector: '[data-visual-test="space-media-queries"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match space media queries on "large" breakpoint', async () => {
    const screenshot = await makeScreenshot({
      pageViewport: {
        width: 1000,
      },
      selector: '[data-visual-test="space-media-queries"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
