/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import path from 'path'
import {
  loadImage,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe.each(['ui', 'sbanken'])('Logo for %s', (themeName) => {
  setupPageScreenshot({ themeName, url: '/uilib/components/logo/demos' })

  it('have to match all logos', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="logo-all"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the default "Logo"', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="logo-default"]',
      matchConfig: {
        failureThreshold: 0.19,
      },
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the auto sized "Logo"', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="logo-auto-size"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the inherited sized "Logo"', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="logo-inherit-size"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the inherited color', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="logo-color"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the fixed size', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="logo-fixed"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe.each(['ui', 'sbanken', 'eiendom', 'carnegie'])(
  'Logo for %s',
  (themeName) => {
    setupPageScreenshot({ themeName, url: '/uilib/components/logo/demos' })

    it('have to match the theme', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="logo-theme-change"]',
        screenshotSelector:
          '[data-visual-test="logo-theme-change"] .dnb-logo',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  }
)

describe('png image', () => {
  it('have to match image snapshot', async () => {
    const image = await loadImage(
      path.resolve(__dirname, '../../../../assets/images/dnb/dnb-logo.png')
    )
    expect(image).toMatchImageSnapshot()
  })
})
