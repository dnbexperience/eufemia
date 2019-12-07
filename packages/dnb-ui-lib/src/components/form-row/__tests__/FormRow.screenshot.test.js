/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  isCI,
  testPageScreenshot,
  setupPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

describe('FormRow screenshot', () => {
  setupPageScreenshot({
    url: '/uilib/components/form-row/form-row-examples'
    // screenshotConfig: {
    //   // use 7% on CI because of the font rendering differences
    //   pixelThresholdRelative: isCI ? 0.07 : 0
    // }
  })
  it('have to match default form-row', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="form-row-default"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match vertical form-row label', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="form-row-vertical-label"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match vertical form-row label with a button', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="form-row-vertical-label-button"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match vertical form-row', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="form-row-vertical"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match horizontal form-row', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="form-row-horizontal-no_wrap"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match a combined form-row', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="form-row-combined"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  if (!isCI) {
    const wrapperStyle = {
      overflow: 'hidden'
    }
    it('have to match "horizontal direction" with all components', async () => {
      const screenshot = await testPageScreenshot({
        wrapperStyle,
        selector: '[data-dnb-test="form-row-all-horizontal-direction"]'
      })
      expect(screenshot).toMatchImageSnapshot()
    })
    it('have to match "vertical direction" with all components', async () => {
      const screenshot = await testPageScreenshot({
        wrapperStyle,
        selector: '[data-dnb-test="form-row-all-vertical-direction"]'
      })
      expect(screenshot).toMatchImageSnapshot()
    })
    it('have to match "vertical everything" with all components', async () => {
      const screenshot = await testPageScreenshot({
        wrapperStyle,
        selector: '[data-dnb-test="form-row-all-vertical-everything"]'
      })
      expect(screenshot).toMatchImageSnapshot()
    })
    it('have to match "vertical label direction" with all components', async () => {
      const screenshot = await testPageScreenshot({
        wrapperStyle,
        selector: '[data-dnb-test="form-row-all-vertical-label-direction"]'
      })
      expect(screenshot).toMatchImageSnapshot()
    })
    it('have to match "vertical label direction" (no label) with all components', async () => {
      const screenshot = await testPageScreenshot({
        wrapperStyle,
        selector:
          '[data-dnb-test="form-row-all-vertical-label-direction-no-label"]'
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  }
})
