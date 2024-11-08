/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('ListFormat', () => {
  setupPageScreenshot({
    url: '/uilib/components/list-format/demos',
  })

  it('have to match default list', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="list-format-default"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match custom format', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="list-format-custom-format"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match inline', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="list-format-inline"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match variants', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="list-format-variants"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match types', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="list-format-types"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to list format function', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="list-format-function"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
