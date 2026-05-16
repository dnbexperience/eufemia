import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken'])(`Slider for %s`, (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/slider/demos/',
  })

  it('have to match default slider', async () => {
    await makeScreenshot({
      style: { width: '20rem' },
      styleSelector: '[data-visual-test="slider-default"]',
      selector: '[data-visual-test="slider-default"] .dnb-slider__wrapper',
    })
  })

  /**
   * NB: "hover" needs to come before "focus"!
   */
  it('have to match the hover state', async () => {
    await makeScreenshot({
      style: { width: '20rem' },
      styleSelector: '[data-visual-test="slider-default"]',
      selector: '[data-visual-test="slider-default"] .dnb-slider__wrapper',
      simulateSelector:
        '[data-visual-test="slider-default"] .dnb-slider__thumb .dnb-slider__button-helper',
      simulate: 'hover',
    })
  })

  it('have to match the focus state', async () => {
    await makeScreenshot({
      style: { width: '20rem' },
      styleSelector: '[data-visual-test="slider-default"]',
      selector: '[data-visual-test="slider-default"] .dnb-slider__wrapper',
      simulateSelector:
        '[data-visual-test="slider-default"] .dnb-slider__thumb .dnb-slider__button-helper',
      simulate: 'focusclick',
    })
  })

  it('have to match the active state', async () => {
    await makeScreenshot({
      style: { width: '20rem' },
      styleSelector: '[data-visual-test="slider-default"]',
      selector: '[data-visual-test="slider-default"] .dnb-slider__wrapper',
      simulateSelector:
        '[data-visual-test="slider-default"] .dnb-slider__thumb .dnb-slider__button-helper',
      simulate: 'active',
    })
  })

  it('have to match vertical slider', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="slider-vertical"] .dnb-slider__wrapper',
    })
  })

  it('have to match multi thumbs slider', async () => {
    await makeScreenshot({
      style: { width: '20rem' },
      selector: '[data-visual-test="slider-multi"]',
    })
  })

  it('have to match slider with marker', async () => {
    await makeScreenshot({
      style: { width: '20rem' },
      styleSelector: '[data-visual-test="slider-marker"]',
      selector: '[data-visual-test="slider-marker"] .dnb-slider__wrapper',
      simulateSelector:
        '[data-visual-test="slider-marker"] .dnb-slider__marker',
      simulate: 'hover',
    })
  })
})
