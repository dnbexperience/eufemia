import { it, describe, expect } from 'vitest'
import {
  loadImage,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken'])(`Logo for %s`, (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/logo/demos/',
  })

  it('have to match all logos', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="logo-all"]',
    })
  })

  it('have to match the default "Logo"', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="logo-default"]',
    })
  })

  it('have to match the auto sized "Logo"', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="logo-auto-size"]',
    })
  })

  it('have to match the inherited sized "Logo"', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="logo-inherit-size"]',
    })
  })

  it('have to match the inherited color', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="logo-color"]',
    })
  })

  it('have to match the fixed size', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="logo-fixed"]',
    })
  })
})

describe.each(['ui', 'sbanken', 'eiendom', 'carnegie'])(
  `Logo for %s`,
  (themeName) => {
    setupPageScreenshot({ themeName, url: '/uilib/components/logo/demos' })

    it('have to match the theme', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="logo-theme-change"]',
        screenshotSelector:
          '[data-visual-test="logo-theme-change"] .dnb-logo',
      })
    })

    it('aligns with text', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="logo-in-text"]',
      })
    })
  }
)

describe('png image', () => {
  it('have to match image snapshot', async () => {
    // The path is resolved server-side; we hand it a path
    // relative to the eufemia package root.
    const image = await loadImage('assets/images/dnb/dnb-logo.png')
    await expect(image).toMatchImageSnapshot()
  })
})
