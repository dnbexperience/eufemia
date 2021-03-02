/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  isCI,
  testPageScreenshot,
  setupPageScreenshot
} from '../../../../core/jest/jestSetupScreenshots'

describe('HelperClasses screenshot', () => {
  setupPageScreenshot({
    screenshotConfig: {
      // use 11% on CI because of the font rendering differences
      pixelThresholdRelative: isCI ? 0.11 : 0
    },
    url: '/uilib/helpers/css-examples'
  })
  it('have to match core-style', async () => {
    const screenshot = await testPageScreenshot({
      addWrapper: false,
      selector: '[data-visual-test="helper-core-style"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match tap-focus', async () => {
    const screenshot = await testPageScreenshot({
      addWrapper: false,
      selector: '[data-visual-test="helper-tap-focus"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match unstyled-list', async () => {
    const screenshot = await testPageScreenshot({
      addWrapper: false,
      selector: '[data-visual-test="helper-unstyled-list"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match hide-on-mobile', async () => {
    const screenshot = await testPageScreenshot({
      screenshotConfig: {
        // use 12% on CI because of the font rendering differences
        pixelThresholdRelative: isCI ? 0.12 : 0
      },
      addWrapper: false,
      selector: '[data-visual-test="helper-hide-on-mobile"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  // it('have to match mobile-exclusive', async () => {
  //   const screenshot = await testPageScreenshot({
  //     // addWrapper: false,
  //     selector: '[data-visual-test="helper-mobile-exclusive"]'
  //   })
  //   expect(screenshot).toMatchImageSnapshot()
  // })
  it('have to match width-limit', async () => {
    const screenshot = await testPageScreenshot({
      addWrapper: false,
      selector: '[data-visual-test="helper-width-limit"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match belt', async () => {
    const screenshot = await testPageScreenshot({
      addWrapper: false,
      selector: '[data-visual-test="helper-belt"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  if (!isCI) {
    it('have to match nudge', async () => {
      const screenshot = await testPageScreenshot({
        addWrapper: false,
        style: {
          width: '60rem'
        },
        selector: '[data-visual-test="helper-nudge"]'
      })
      expect(screenshot).toMatchImageSnapshot()
    })
    it('have to match nudge mobile', async () => {
      const screenshot = await testPageScreenshot({
        addWrapper: false,
        style: {
          width: '20rem'
        },
        selector: '[data-visual-test="helper-nudge"]'
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  }
  it('have to match sr-only', async () => {
    const screenshot = await testPageScreenshot({
      addWrapper: false,
      selector: '[data-visual-test="helper-sr-only"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match not-sr-only', async () => {
    const screenshot = await testPageScreenshot({
      addWrapper: false,
      selector: '[data-visual-test="helper-not-sr-only"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
