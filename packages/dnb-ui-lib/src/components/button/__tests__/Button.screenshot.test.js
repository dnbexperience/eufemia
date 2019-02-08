/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import { testPageScreenshot } from '../../../core/jest/jestSetupScreenshots'

describe('Button screenshot', () => {
  const url = '/uilib/components/button?fullscreen'
  it('have to match "dnb-button--secondary"', async () => {
    const screenshot = await testPageScreenshot({
      url,
      selector:
        '.example-box .dnb-button.dnb-button--secondary:first-child'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match "dnb-button--primary"', async () => {
    const screenshot = await testPageScreenshot({
      url,
      selector: '.example-box .dnb-button.dnb-button--primary:first-child'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match "dnb-button--primary" with hover state', async () => {
    const screenshot = await testPageScreenshot({
      url,
      selector: '.example-box .dnb-button.dnb-button--primary:first-child',
      simulate: 'hover'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match "dnb-button--primary" with active state', async () => {
    const screenshot = await testPageScreenshot({
      url,
      selector: '.example-box .dnb-button.dnb-button--primary:first-child',
      simulate: 'active'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match "dnb-button--primary" with focus state', async () => {
    const screenshot = await testPageScreenshot({
      url,
      selector: '.example-box .dnb-button.dnb-button--primary:first-child',
      simulate: 'focus'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
