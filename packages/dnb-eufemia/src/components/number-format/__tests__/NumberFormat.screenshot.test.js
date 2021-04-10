/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot,
  isCI
} from '../../../core/jest/jestSetupScreenshots'

describe('NumberFormat screenshot', () => {
  setupPageScreenshot({
    url: '/uilib/components/number-format/demos',
    screenshotConfig: {
      // use 11% on CI because of the font rendering differences
      pixelThresholdRelative: isCI ? 0.11 : 0
    }
  })
  it('have to match default numbers', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="number-format-default"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match numbers in different locales', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="number-format-locales"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match currency', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="number-format-currency"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match phone', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="number-format-phone"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match ban', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="number-format-ban"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match nin', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="number-format-nin"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match org', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="number-format-org"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('NumberFormat with skeleton screenshot', () => {
  setupPageScreenshot({
    url: '/uilib/components/number-format/demos?skeleton'
  })

  it('have to match default numbers', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="number-format-default"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match currency', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="number-format-currency"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match phone', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="number-format-phone"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
