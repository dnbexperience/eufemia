/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/jest/jestSetupScreenshots'

describe.each(['ui', 'sbanken'])('Expiry field for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/extensions/forms/feature-fields/Expiry',
  })

  it('have to match the empty state', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="expiry-empty"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the input filled in value', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="expiry-with-value"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the horizontal layout', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="expiry-horizontal-layout"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match expiry with help button', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="expiry-with-help"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the disabled state', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="expiry-disabled"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the error state', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="expiry-error"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
