import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe('Space', () => {
  setupPageScreenshot({
    url: '/uilib/layout/space/demos/',
  })

  it('have to match the spacing patterns', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="spacing-patterns"] .spacing-patterns',
    })
  })

  it('have to match the spacing with elements', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="spacing-elements"] .spacing-elements',
    })
  })

  it('have to match the 2.5 spacing margins', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="spacing-margins"]',
    })
  })

  it('have to match the spacing method 1', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="spacing-method-space"]',
    })
  })

  it('have to match the spacing method 2', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="spacing-method-form-row"]',
    })
  })

  it('have to match the spacing method 3', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="spacing-method-component"]',
    })
  })

  it('have to match the spacing reset', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="spacing-reset"]',
    })
  })

  it('have to match inner spacing', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="inner-spacing"]',
    })
  })
})

describe('Space inner spacing breakpoints', () => {
  setupPageScreenshot({
    url: '/uilib/layout/space/demos/',
  })

  it('have to match inner spacing on "small" breakpoint', async () => {
    await makeScreenshot({
      pageViewport: {
        width: 400,
      },
      selector: '[data-visual-test="inner-spacing"]',
    })
  })

  it('have to match inner spacing on "medium" breakpoint', async () => {
    await makeScreenshot({
      pageViewport: {
        width: 800,
      },
      selector: '[data-visual-test="inner-spacing"]',
    })
  })

  it('have to match inner spacing on "large" breakpoint', async () => {
    await makeScreenshot({
      pageViewport: {
        width: 1000,
      },
      selector: '[data-visual-test="inner-spacing"]',
    })
  })
})

describe('Space responsive outer spacing', () => {
  setupPageScreenshot({
    url: '/uilib/layout/space/demos/',
  })

  it('have to match responsive outer spacing on "small" breakpoint', async () => {
    await makeScreenshot({
      pageViewport: {
        width: 400,
      },
      selector: '[data-visual-test="responsive-outer-spacing"]',
    })
  })

  it('have to match responsive outer spacing on "medium" breakpoint', async () => {
    await makeScreenshot({
      pageViewport: {
        width: 800,
      },
      selector: '[data-visual-test="responsive-outer-spacing"]',
    })
  })

  it('have to match responsive outer spacing on "large" breakpoint', async () => {
    await makeScreenshot({
      pageViewport: {
        width: 1000,
      },
      selector: '[data-visual-test="responsive-outer-spacing"]',
    })
  })
})

describe('Space inline/block', () => {
  setupPageScreenshot({
    url: '/uilib/layout/space/demos/',
  })

  it('have to match space inline/block', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="space-inline-block"]',
    })
  })
})

describe('Space innerspace media queries', () => {
  setupPageScreenshot({
    url: '/uilib/layout/space/demos/',
  })

  it('have to match innerspace media queries on "small" breakpoint', async () => {
    await makeScreenshot({
      pageViewport: {
        width: 400,
      },
      selector: '[data-visual-test="innerspace-media-queries"]',
    })
  })

  it('have to match innerspace media queries on "medium" breakpoint', async () => {
    await makeScreenshot({
      pageViewport: {
        width: 800,
      },
      selector: '[data-visual-test="innerspace-media-queries"]',
    })
  })

  it('have to match innerspace media queries on "large" breakpoint', async () => {
    await makeScreenshot({
      pageViewport: {
        width: 1000,
      },
      selector: '[data-visual-test="innerspace-media-queries"]',
    })
  })
})

describe('Space media queries', () => {
  setupPageScreenshot({
    url: '/uilib/layout/space/demos/',
  })

  it('have to match space media queries on "small" breakpoint', async () => {
    await makeScreenshot({
      pageViewport: {
        width: 400,
      },
      selector: '[data-visual-test="space-media-queries"]',
    })
  })

  it('have to match space media queries on "medium" breakpoint', async () => {
    await makeScreenshot({
      pageViewport: {
        width: 800,
      },
      selector: '[data-visual-test="space-media-queries"]',
    })
  })

  it('have to match space media queries on "large" breakpoint', async () => {
    await makeScreenshot({
      pageViewport: {
        width: 1000,
      },
      selector: '[data-visual-test="space-media-queries"]',
    })
  })
})
