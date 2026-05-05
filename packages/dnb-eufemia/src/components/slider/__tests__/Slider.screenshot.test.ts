import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/playwright/screenshotSetup'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Slider for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/slider/demos/',
    })

    test('have to match default slider', async () => {
      const screenshot = await makeScreenshot({
        style: { width: '20rem' },
        styleSelector: '[data-visual-test="slider-default"]',
        selector:
          '[data-visual-test="slider-default"] .dnb-slider__wrapper',
      })
      expect(screenshot).toMatchSnapshot()
    })

    /**
     * NB: "hover" needs to come before "focus"!
     */
    test('have to match the hover state', async () => {
      const screenshot = await makeScreenshot({
        style: { width: '20rem' },
        styleSelector: '[data-visual-test="slider-default"]',
        selector:
          '[data-visual-test="slider-default"] .dnb-slider__wrapper',
        simulateSelector:
          '[data-visual-test="slider-default"] .dnb-slider__thumb .dnb-slider__button-helper',
        simulate: 'hover',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the focus state', async () => {
      const screenshot = await makeScreenshot({
        style: { width: '20rem' },
        styleSelector: '[data-visual-test="slider-default"]',
        selector:
          '[data-visual-test="slider-default"] .dnb-slider__wrapper',
        simulateSelector:
          '[data-visual-test="slider-default"] .dnb-slider__thumb .dnb-slider__button-helper',
        simulate: 'focusclick',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the active state', async () => {
      const screenshot = await makeScreenshot({
        style: { width: '20rem' },
        styleSelector: '[data-visual-test="slider-default"]',
        selector:
          '[data-visual-test="slider-default"] .dnb-slider__wrapper',
        simulateSelector:
          '[data-visual-test="slider-default"] .dnb-slider__thumb .dnb-slider__button-helper',
        simulate: 'active',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match vertical slider', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="slider-vertical"] .dnb-slider__wrapper',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match multi thumbs slider', async () => {
      const screenshot = await makeScreenshot({
        style: { width: '20rem' },
        selector: '[data-visual-test="slider-multi"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match slider with marker', async () => {
      const screenshot = await makeScreenshot({
        style: { width: '20rem' },
        styleSelector: '[data-visual-test="slider-marker"]',
        selector:
          '[data-visual-test="slider-marker"] .dnb-slider__wrapper',
        simulateSelector:
          '[data-visual-test="slider-marker"] .dnb-slider__marker',
        simulate: 'hover',
      })
      expect(screenshot).toMatchSnapshot()
    })
  })
}
