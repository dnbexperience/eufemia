/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot,
  // isCI,
} from '../../../core/jest/jestSetupScreenshots'

// NB: Remember that the fonts are swapped out with arial during the tests

describe('Heading screenshot', () => {
  setupPageScreenshot({
    url: '/uilib/typography/heading',
    // screenshotConfig: {
    //   /*
    //     if we use Helvetica, we can go down to 6%
    //     style: {
    //       'font-family': 'Helvetica, Arial, sans-serif'
    //     },
    //   */
    //   // use 10% on CI because of the font rendering differences
    //   pixelThresholdRelative: isCI ? 0.1 : 0,
    // },
  })

  it('have to match the default heading examples', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="heading-default"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the additional heading examples', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="heading-additional"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Paragraph screenshot', () => {
  setupPageScreenshot({
    url: '/uilib/typography/paragraph',
    // screenshotConfig: {
    //   // use 10% on CI because of the font rendering differences
    //   pixelThresholdRelative: isCI ? 0.1 : 0,
    // },
  })

  it('have to match the paragraph example', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="paragraph-default"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the paragraph with small text', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="paragraph-small"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the paragraph with modifiers', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="paragraph-modifiers"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
