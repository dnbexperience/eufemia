/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe.each(['ui', 'sbanken'])('ToggleButton for %s', (themeName) => {
  describe('ToggleButton unchecked', () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/toggle-button/demos',
    })

    it('have to match toggle-button in unchecked state', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="toggle-button-default"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match toggle-button in unchecked state with focus', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="toggle-button-default"]',
        simulateSelector:
          '[data-visual-test="toggle-button-default"] .dnb-toggle-button__button',
        simulate: 'focus',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match toggle-button in unchecked state with hover', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="toggle-button-default"]',
        simulateSelector:
          '[data-visual-test="toggle-button-default"] .dnb-toggle-button__button',
        simulate: 'hover',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  })

  // NB: Because of focus simulation and screenshotElement.press('Tab')
  // we have to run the two focus simulations in a separate run each
  describe('checked', () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/toggle-button/demos',
    })

    it('have to match toggle-button in checked state', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="toggle-button-checked"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match toggle-button in checked state with focus', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="toggle-button-checked"]',
        simulateSelector:
          '[data-visual-test="toggle-button-checked"] .dnb-toggle-button__button',
        simulate: 'focus',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match toggle-button in checked state with hover', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="toggle-button-checked"]',
        simulateSelector:
          '[data-visual-test="toggle-button-checked"] .dnb-toggle-button__button',
        simulate: 'hover',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match toggle-button in active focus state', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="toggle-button-checked"]',
        simulateSelector:
          '[data-visual-test="toggle-button-checked"] .dnb-toggle-button__button',
        simulate: 'focusclick',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match toggle-button group', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="toggle-button-group-default"] .dnb-toggle-button-group',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match toggle-button group in vertical layout', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="toggle-button-group-vertical"] .dnb-toggle-button-group',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match toggle-button group with form-status', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="toggle-button-group-status"] .dnb-toggle-button-group',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  })

  it('have to match toggle-button in disabled state', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="toggle-button-group-disabled"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
