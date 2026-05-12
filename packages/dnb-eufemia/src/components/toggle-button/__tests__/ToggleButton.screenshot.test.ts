import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken'])(`ToggleButton for %s`, (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/toggle-button/demos/',
  })

  describe('ToggleButton unchecked', () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/toggle-button/demos/',
    })

    it('have to match toggle-button in unchecked state', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="toggle-button-default"]',
      })
    })

    it('have to match toggle-button in unchecked state with focus', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="toggle-button-default"]',
        simulateSelector:
          '[data-visual-test="toggle-button-default"] .dnb-toggle-button__button',
        simulate: 'focus',
      })
    })

    it('have to match toggle-button in unchecked state with hover', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="toggle-button-default"]',
        simulateSelector:
          '[data-visual-test="toggle-button-default"] .dnb-toggle-button__button',
        simulate: 'hover',
      })
    })
  })

  // NB: Because of focus simulation and screenshotElement.press('Tab')
  // we have to run the two focus simulations in a separate run each
  describe('checked', () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/toggle-button/demos/',
    })

    it('have to match toggle-button in checked state', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="toggle-button-checked"]',
      })
    })

    it('have to match toggle-button in checked state with focus', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="toggle-button-checked"]',
        simulateSelector:
          '[data-visual-test="toggle-button-checked"] .dnb-toggle-button__button',
        simulate: 'focus',
      })
    })

    it('have to match toggle-button in checked state with hover', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="toggle-button-checked"]',
        simulateSelector:
          '[data-visual-test="toggle-button-checked"] .dnb-toggle-button__button',
        simulate: 'hover',
      })
    })

    it('have to match toggle-button in active focus state', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="toggle-button-checked"]',
        simulateSelector:
          '[data-visual-test="toggle-button-checked"] .dnb-toggle-button__button',
        simulate: 'focusclick',
      })
    })

    it('have to match toggle-button group', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="toggle-button-group-default"] .dnb-toggle-button-group',
      })
    })

    it('have to match toggle-button group in vertical layout', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="toggle-button-group-vertical"] .dnb-toggle-button-group',
      })
    })

    it('have to match toggle-button group with form-status', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="toggle-button-group-status"] .dnb-toggle-button-group',
      })
    })
  })

  it('have to match toggle-button in disabled state', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="toggle-button-group-disabled"]',
    })
  })
})
