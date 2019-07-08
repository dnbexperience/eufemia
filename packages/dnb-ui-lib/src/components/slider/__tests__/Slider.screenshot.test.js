/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

describe('Slider screenshot', () => {
  setupPageScreenshot({ url: '/uilib/components/slider' })
  it('have to match default slider', async () => {
    const screenshot = await testPageScreenshot({
      style: { width: '20rem' },
      selector: '[data-dnb-test="slider-default"] .dnb-slider__clamp'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the focus state', async () => {
    const screenshot = await testPageScreenshot({
      style: { width: '20rem' },
      selector: '[data-dnb-test="slider-default"] .dnb-slider__clamp',
      simulateSelector:
        '[data-dnb-test="slider-default"] .dnb-slider__thumb button',
      simulate: 'focus'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the hover state', async () => {
    const screenshot = await testPageScreenshot({
      style: { width: '20rem' },
      selector: '[data-dnb-test="slider-default"] .dnb-slider__clamp',
      simulateSelector:
        '[data-dnb-test="slider-default"] .dnb-slider__thumb button',
      simulate: 'hover'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match vertical slider', async () => {
    const screenshot = await testPageScreenshot({
      style: { height: '16rem' },
      selector: '[data-dnb-test="slider-vertical"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
