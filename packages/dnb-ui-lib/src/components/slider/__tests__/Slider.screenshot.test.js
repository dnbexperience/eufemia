/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

describe('Slider screenshot', () => {
  setupPageScreenshot({ url: '/uilib/components/slider/demos' })
  it('have to match default slider', async () => {
    const screenshot = await testPageScreenshot({
      style: { width: '20rem' },
      selector: '[data-visual-test="slider-default"] .dnb-slider__wrapper'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the focus state', async () => {
    const screenshot = await testPageScreenshot({
      style: { width: '20rem' },
      selector: '[data-visual-test="slider-default"] .dnb-slider__wrapper',
      simulateSelector:
        '[data-visual-test="slider-default"] .dnb-slider__thumb button',
      simulate: 'focus' // should be tested first
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the hover state', async () => {
    const screenshot = await testPageScreenshot({
      style: { width: '20rem' },
      selector: '[data-visual-test="slider-default"] .dnb-slider__wrapper',
      simulateSelector:
        '[data-visual-test="slider-default"] .dnb-slider__thumb button',
      simulate: 'hover'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match vertical slider', async () => {
    const screenshot = await testPageScreenshot({
      style: { height: '20rem' },
      selector: '[data-visual-test="slider-vertical"] .dnb-slider__wrapper'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
