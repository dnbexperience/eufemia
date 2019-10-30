/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

describe('Section screenshot', () => {
  setupPageScreenshot({ url: '/uilib/components/section' })
  // const style = { width: '8rem' }
  it('have to match default section', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="section-default"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match white section', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="section-white"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match divider section', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="section-divider"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match mint-green section', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="section-mint-green"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match emerald-green section', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="section-emerald-green"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match signal-orange section', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="section-signal-orange"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match fire-red section', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="section-fire-red"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
