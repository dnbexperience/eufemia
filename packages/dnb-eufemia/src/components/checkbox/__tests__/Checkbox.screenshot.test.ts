/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe.each(['ui', 'sbanken'])('Checkbox for %s', (themeName) => {
  describe('unchecked', () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/checkbox/demos',
    })

    it('have to match checkbox in unchecked state', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="checkbox-default"] .dnb-checkbox',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match checkbox in unchecked state with focus', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="checkbox-default"] .dnb-checkbox',
        simulateSelector:
          '[data-visual-test="checkbox-default"] .dnb-checkbox__input',
        simulate: 'focus', // should be tested first
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match checkbox in unchecked state with hover', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="checkbox-default"] .dnb-checkbox',
        simulateSelector:
          '[data-visual-test="checkbox-default"] .dnb-checkbox__input',
        simulate: 'hover',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match checkbox in unchecked state with error', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="checkbox-error-unchecked"] .dnb-checkbox',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match checkbox in unchecked state with error and hover', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="checkbox-error-unchecked"] .dnb-checkbox',
        simulate: 'hover',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  })

  // NB: Because of focus simulation and screenshotElement.press('Tab')
  // we have to run the two focus simulations in a separate run each
  describe('checked', () => {
    it('have to match checkbox in checked state', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="checkbox-checked"] .dnb-checkbox',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match checkbox in checked state with focus', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="checkbox-checked"] .dnb-checkbox',
        simulateSelector:
          '[data-visual-test="checkbox-checked"] .dnb-checkbox__input',
        simulate: 'focus', // should be tested first
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match checkbox in checked state with hover', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="checkbox-checked"] .dnb-checkbox',
        simulateSelector:
          '[data-visual-test="checkbox-checked"] .dnb-checkbox__input',
        simulate: 'hover',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match different checkbox sizes', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="checkbox-sizes"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match disabled checkbox', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="checkbox-disabled"] .dnb-checkbox',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match checkbox in error state', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="checkbox-error"] .dnb-checkbox',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match checkbox in checked state with error', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="checkbox-error-checked"] .dnb-checkbox',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match checkbox in checked state with error and hover', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="checkbox-error-checked"] .dnb-checkbox',
        simulate: 'hover',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  })
})
