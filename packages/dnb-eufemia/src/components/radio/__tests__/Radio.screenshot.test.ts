/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('Radio', () => {
  describe('unchecked', () => {
    setupPageScreenshot({ url: '/uilib/components/radio/demos' })

    it('have to match radio in unchecked state', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="radio-default"] .dnb-radio',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match radio in unchecked state with focus', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="radio-default"] .dnb-radio',
        simulateSelector:
          '[data-visual-test="radio-default"] .dnb-radio__input',
        simulate: 'focus', // should be tested first
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match radio in unchecked state with hover', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="radio-default"] .dnb-radio',
        simulateSelector:
          '[data-visual-test="radio-default"] .dnb-radio__input',
        simulate: 'hover',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  })

  // NB: Because of focus simulation and screenshotElement.press('Tab')
  // we have to run the two focus simulations in a separate run each
  describe('checked', () => {
    setupPageScreenshot({ url: '/uilib/components/radio/demos' })

    it('have to match radio in checked state', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="radio-checked"] .dnb-radio',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match radio in checked state with focus', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="radio-checked"] .dnb-radio',
        simulateSelector:
          '[data-visual-test="radio-checked"] .dnb-radio__input',
        simulate: 'focus', // should be tested first
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match radio in checked state with hover', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="radio-checked"] .dnb-radio',
        simulateSelector:
          '[data-visual-test="radio-checked"] .dnb-radio__input',
        simulate: 'hover',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match disabled group', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="radio-group-disabled"] .dnb-radio-group',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match radio group', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="radio-group"] .dnb-radio-group',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match radio group in vertical layout', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="radio-group-vertical"] .dnb-radio-group',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match radio group with label above', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="radio-group-label-above"] .dnb-radio-group',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match radio group with form-status', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="radio-group-status"] .dnb-radio-group',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match radio group plain', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="radio-group-plain"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match radio button in different sizes', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="radio-sizes"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  })
})
