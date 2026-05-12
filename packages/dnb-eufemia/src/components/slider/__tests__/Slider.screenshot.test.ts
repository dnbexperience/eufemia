import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Slider for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/slider/demos/',
    })

    test('have to match default slider', async () => {
      await makeScreenshot({
        style: { width: '20rem' },
        styleSelector: '[data-visual-test="slider-default"]',
        selector:
          '[data-visual-test="slider-default"] .dnb-slider__wrapper',
      })
    })

    /**
     * NB: "hover" needs to come before "focus"!
     */
    test('have to match the hover state', async () => {
      await makeScreenshot({
        style: { width: '20rem' },
        styleSelector: '[data-visual-test="slider-default"]',
        selector:
          '[data-visual-test="slider-default"] .dnb-slider__wrapper',
        simulateSelector:
          '[data-visual-test="slider-default"] .dnb-slider__thumb .dnb-slider__button-helper',
        simulate: 'hover',
      })
    })

    test('have to match the focus state', async () => {
      await makeScreenshot({
        style: { width: '20rem' },
        styleSelector: '[data-visual-test="slider-default"]',
        selector:
          '[data-visual-test="slider-default"] .dnb-slider__wrapper',
        simulateSelector:
          '[data-visual-test="slider-default"] .dnb-slider__thumb .dnb-slider__button-helper',
        simulate: 'focusclick',
      })
    })

    test('have to match the active state', async () => {
      await makeScreenshot({
        style: { width: '20rem' },
        styleSelector: '[data-visual-test="slider-default"]',
        selector:
          '[data-visual-test="slider-default"] .dnb-slider__wrapper',
        simulateSelector:
          '[data-visual-test="slider-default"] .dnb-slider__thumb .dnb-slider__button-helper',
        simulate: 'active',
      })
    })

    test('have to match vertical slider', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="slider-vertical"] .dnb-slider__wrapper',
      })
    })

    test('have to match multi thumbs slider', async () => {
      await makeScreenshot({
        style: { width: '20rem' },
        selector: '[data-visual-test="slider-multi"]',
      })
    })

    test('have to match slider with marker', async () => {
      await makeScreenshot({
        style: { width: '20rem' },
        styleSelector: '[data-visual-test="slider-marker"]',
        selector:
          '[data-visual-test="slider-marker"] .dnb-slider__wrapper',
        simulateSelector:
          '[data-visual-test="slider-marker"] .dnb-slider__marker',
        simulate: 'hover',
      })
    })
  })
}
