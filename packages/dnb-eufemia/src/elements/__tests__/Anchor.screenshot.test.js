/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot,
  isCI,
} from '../../core/jest/jestSetupScreenshots'

describe('Anchor screenshot', () => {
  setupPageScreenshot({
    url: '/uilib/elements/anchor',
    screenshotConfig: {
      // use 7% on CI because of the font rendering differences
      pixelThresholdRelative: isCI ? 0.07 : 0,
    },
  })
  // the first one is on 5.54%
  it('have to match the "default" state', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="anchor-default"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match anchor with icon', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="anchor-icon"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match anchor with paragraph', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="anchor-paragraph"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match anchor in heading', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="anchor-heading"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the "hover" state', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="anchor-hover"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the "active" state', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="anchor-active"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the "focus" state', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="anchor-focus"]',
      simulate: 'focus', // should be tested first
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the anchor-contrast "default" state', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="anchor-contrast"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the anchor-contrast "focus" state', async () => {
    const screenshot = await testPageScreenshot({
      screenshotConfig: {
        // use 7% on CI because of the font rendering differences
        pixelThresholdRelative: isCI ? 0.07 : 0,
      },
      selector: '[data-visual-test="anchor-contrast"]',
      simulate: 'focus', // should be tested first
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the anchor-contrast "hover" state', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="anchor-contrast"]',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  // "active" simulation is suddenly too unstable – no reason found
  // it('have to match the anchor-contrast "active" state', async () => {
  //   const screenshot = await testPageScreenshot({
  //     selector: '[data-visual-test="anchor-contrast"]',
  //     simulate: 'active',
  //   })
  //   expect(screenshot).toMatchImageSnapshot()
  // })
})

describe('Anchor target blank screenshot', () => {
  setupPageScreenshot({
    url: '/uilib/elements/anchor',
    screenshotConfig: {
      // use 7% on CI because of the font rendering differences
      pixelThresholdRelative: isCI ? 0.07 : 0,
    },
  })
  it('have to match blank target anchor in heading', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="anchor-heading-blank"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the target blank state', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="anchor-blank"] a',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  if (!isCI) {
    it('have to match the target blank with tooltip', async () => {
      const screenshot = await testPageScreenshot({
        style: {
          'padding-top': '2rem',
        },
        waitBeforeSimulate: 200,
        selector: '[data-visual-test="anchor-blank"]',
        simulateSelector: '[data-visual-test="anchor-blank"] a.dnb-anchor',
        simulate: 'hover',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  }
})
