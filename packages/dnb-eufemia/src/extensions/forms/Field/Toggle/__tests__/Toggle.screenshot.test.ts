/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import { makeScreenshot } from '../../../../../core/jest/jestSetupScreenshots'

describe('Field.Toggle', () => {
  const url = '/uilib/extensions/forms/base-fields/Toggle/demos'

  it('should match buttons variant with help', async () => {
    const screenshot = await makeScreenshot({
      url,
      selector: '[data-visual-test="toggle-variant-buttons-with-help"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match buttons variant without label', async () => {
    const screenshot = await makeScreenshot({
      url,
      selector:
        '[data-visual-test="toggle-variant-buttons-without-label"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match radio variant with help', async () => {
    const screenshot = await makeScreenshot({
      url,
      selector: '[data-visual-test="toggle-variant-radio-with-help"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match radio variant without label', async () => {
    const screenshot = await makeScreenshot({
      url,
      selector: '[data-visual-test="toggle-variant-radio-without-label"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
