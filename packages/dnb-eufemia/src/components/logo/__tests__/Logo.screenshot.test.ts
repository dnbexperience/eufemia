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

describe('Logo', () => {
  setupPageScreenshot({ url: '/uilib/components/logo/demos' })

  it('have to match the default "Logo"', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="logo-default"]',
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
      selector: '[data-visual-test="logo-inherit-color"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  describe('png image', () => {
    it('have to match image snapshot', async () => {
      const image = await loadImage(
        path.resolve(__dirname, '../../../../assets/images/dnb-logo.png')
      )
      expect(image).toMatchImageSnapshot()
    })
  })
})
