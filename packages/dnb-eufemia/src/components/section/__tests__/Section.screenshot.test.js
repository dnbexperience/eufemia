/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('Section screenshot', () => {
  setupPageScreenshot({ url: '/uilib/components/section/demos' })
  // const style = { width: '8rem' }

  it('have to match default section', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="section-default"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match white section', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="section-white"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match divider section', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="section-divider"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match mint-green section', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="section-mint-green"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match black-3 section', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="section-black-3"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match emerald-green section', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="section-emerald-green"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match lavender section', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="section-lavender"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match sand-yellow section', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="section-sand-yellow"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match pistachio section', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="section-pistachio"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match fire-red section', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="section-fire-red"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
