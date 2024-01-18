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
    url: '/uilib/layout/space/demos',
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

// eslint-disable-next-line jest/no-identical-title
describe('Space', () => {
  it('have to match inner spacing on "small" breakpoint', async () => {
    const screenshot = await makeScreenshot({
      url: '/uilib/layout/space/demos',
      pageViewport: {
        width: 400,
      },
      selector: '[data-visual-test="inner-spacing"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match inner spacing on "medium" breakpoint', async () => {
    const screenshot = await makeScreenshot({
      url: '/uilib/layout/space/demos',
      pageViewport: {
        width: 800,
      },
      selector: '[data-visual-test="inner-spacing"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match inner spacing on "large" breakpoint', async () => {
    const screenshot = await makeScreenshot({
      url: '/uilib/layout/space/demos',
      pageViewport: {
        width: 1000,
      },
      selector: '[data-visual-test="inner-spacing"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
