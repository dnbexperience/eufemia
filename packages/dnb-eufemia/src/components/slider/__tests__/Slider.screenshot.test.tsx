/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('Slider ', () => {
  setupPageScreenshot({ url: '/uilib/components/slider/demos' })

  it('have to match default slider', async () => {
    const screenshot = await testPageScreenshot({
      style: { width: '20rem' },
      selector: '[data-visual-test="slider-default"] .dnb-slider__wrapper',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the focus state', async () => {
    const screenshot = await testPageScreenshot({
      style: { width: '20rem', 'padding-top': '3rem' },
      selector: '[data-visual-test="slider-default"] .dnb-slider__wrapper',
      simulateSelector:
        '[data-visual-test="slider-default"] .dnb-slider__thumb .dnb-slider__button-helper',
      simulate: 'focus',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the hover state', async () => {
    const screenshot = await testPageScreenshot({
      style: { width: '20rem', 'padding-top': '3rem' },
      selector: '[data-visual-test="slider-default"] .dnb-slider__wrapper',
      simulateSelector:
        '[data-visual-test="slider-default"] .dnb-slider__thumb .dnb-slider__button-helper',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the active state', async () => {
    const screenshot = await testPageScreenshot({
      style: { width: '20rem', 'padding-top': '3rem' },
      selector: '[data-visual-test="slider-default"] .dnb-slider__wrapper',
      simulateSelector:
        '[data-visual-test="slider-default"] .dnb-slider__thumb .dnb-slider__button-helper',
      simulate: 'active',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match vertical slider', async () => {
    const screenshot = await testPageScreenshot({
      style: { height: '20rem' },
      selector:
        '[data-visual-test="slider-vertical"] .dnb-slider__wrapper',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match multi thumbs slider', async () => {
    const screenshot = await testPageScreenshot({
      style: { width: '20rem', height: '10rem' },
      selector: '[data-visual-test="slider-multi"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
