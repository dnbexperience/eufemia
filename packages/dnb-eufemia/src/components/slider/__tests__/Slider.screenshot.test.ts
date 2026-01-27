/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe.each(['ui', 'sbanken'])('Slider for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/slider/demos',
  })

  it('should match default slider', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '20rem' },
      selector: '[data-visual-test="slider-default"] .dnb-slider__wrapper',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  /**
   * NB: "hover" needs to come before "focus"!
   */
  it('should match the hover state', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '20rem', 'padding-top': '3rem' },
      selector: '[data-visual-test="slider-default"] .dnb-slider__wrapper',
      simulateSelector:
        '[data-visual-test="slider-default"] .dnb-slider__thumb .dnb-slider__button-helper',
      simulate: 'hover',
      waitAfterSimulateSelector: '.dnb-tooltip--active',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match the focus state', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '20rem', 'padding-top': '3rem' },
      selector: '[data-visual-test="slider-default"] .dnb-slider__wrapper',
      simulateSelector:
        '[data-visual-test="slider-default"] .dnb-slider__thumb .dnb-slider__button-helper',
      simulate: 'focusclick',
      waitAfterSimulateSelector: '.dnb-tooltip--active',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match the active state', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '20rem', 'padding-top': '3rem' },
      selector: '[data-visual-test="slider-default"] .dnb-slider__wrapper',
      simulateSelector:
        '[data-visual-test="slider-default"] .dnb-slider__thumb .dnb-slider__button-helper',
      simulate: 'active',
      waitAfterSimulateSelector: '.dnb-tooltip--active',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match vertical slider', async () => {
    const screenshot = await makeScreenshot({
      style: { height: '20rem' },
      selector:
        '[data-visual-test="slider-vertical"] .dnb-slider__wrapper',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match multi thumbs slider', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '20rem', height: '10rem' },
      selector: '[data-visual-test="slider-multi"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match slider with marker', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '20rem', 'padding-top': '2rem' },
      selector: '[data-visual-test="slider-marker"] .dnb-slider__wrapper',
      simulateSelector:
        '[data-visual-test="slider-marker"] .dnb-slider__marker',
      simulate: 'hover',
      waitAfterSimulateSelector: '.dnb-tooltip--active',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
