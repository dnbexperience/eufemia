/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot,
  // isCI,
} from '../../../core/jest/jestSetupScreenshots'

describe('Icon screenshot', () => {
  setupPageScreenshot({
    url: '/uilib/components/icon/demos',
    // screenshotConfig: {
    //   // use 10% on CI because of the font rendering differences
    //   pixelThresholdRelative: isCI ? 0.1 : 0,
    // },
  })

  it('have to match default icons setup', async () => {
    const screenshot = await testPageScreenshot({
      style: {
        // Flex makes the pixel height 100% correct
        display: 'flex',
        'align-items': 'center',
      },
      selector: '[data-visual-test="icon-default"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match inherited sized icons', async () => {
    const screenshot = await testPageScreenshot({
      style: {
        // Flex makes the pixel height 100% correct
        display: 'flex',
        'align-items': 'center',
      },
      selector: '[data-visual-test="icon-inherit-sized"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match icons with border', async () => {
    const screenshot = await testPageScreenshot({
      // screenshotConfig: {
      //   // use 2% on CI because of the font rendering differences
      //   pixelThresholdRelative: isCI ? 0.02 : 0,
      // },
      style: {
        // Flex makes the pixel height 100% correct
        display: 'flex',
        'align-items': 'center',
      },
      selector: '[data-visual-test="icon-border"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match responsive icons', async () => {
    const screenshot = await testPageScreenshot({
      style: {
        // Flex makes the pixel height 100% correct
        display: 'flex',
        'align-items': 'center',
      },
      selector: '[data-visual-test="icon-medium"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Icon screenshot', () => {
  setupPageScreenshot({
    url: '/uilib/components/icon/demos',
    // screenshotConfig: {
    //   pixelThresholdRelative: isCI ? 0.02 : 0,
    // },
  })

  it('have to match all primary icons', async () => {
    const screenshot = await testPageScreenshot({
      style: {
        display: 'inline-flex',
        'flex-wrap': 'wrap',
        width: '30rem',
      },
      selector: '[data-visual-test="icon-all-primary"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match all secondary icons', async () => {
    const screenshot = await testPageScreenshot({
      style: {
        display: 'inline-flex',
        'flex-wrap': 'wrap',
        width: '30rem',
      },
      selector: '[data-visual-test="icon-all-secondary"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
