/**
 * Screenshot Test
 *
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../core/jest/jestSetupScreenshots'

describe('Logo with sbanken theme', () => {
  setupPageScreenshot({
    url: '/uilib/components/logo/demos?eufemia-theme=sbanken',
  })

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
})
