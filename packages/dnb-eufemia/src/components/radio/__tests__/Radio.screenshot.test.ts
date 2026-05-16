import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken'])(`Radio for %s`, (themeName) => {
  describe('unchecked', () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/radio/demos/',
    })

    it('have to match radio in unchecked state', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="radio-default"] .dnb-radio',
      })
    })

    it('have to match radio in unchecked state with focus', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="radio-default"] .dnb-radio',
        simulateSelector:
          '[data-visual-test="radio-default"] .dnb-radio__input',
        simulate: 'focus', // should be tested first
      })
    })

    it('have to match radio in unchecked state with hover', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="radio-default"] .dnb-radio',
        simulateSelector:
          '[data-visual-test="radio-default"] .dnb-radio__input',
        simulate: 'hover',
      })
    })

    it('have to match radio in unchecked state with error', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="radio-error-unchecked"] .dnb-radio',
      })
    })

    it('have to match radio in unchecked state with error and hover', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="radio-error-unchecked"] .dnb-radio',
        simulateSelector:
          '[data-visual-test="radio-error-unchecked"] .dnb-radio__input',
        simulate: 'hover',
      })
    })
  })

  // NB: Because of focus simulation and screenshotElement.press('Tab')
  // we have to run the two focus simulations in a separate run each
  describe('checked', () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/radio/demos/',
    })

    it('have to match radio in checked state', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="radio-checked"] .dnb-radio',
      })
    })

    it('have to match radio in checked state with focus', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="radio-checked"] .dnb-radio',
        simulateSelector:
          '[data-visual-test="radio-checked"] .dnb-radio__input',
        simulate: 'focus', // should be tested first
      })
    })

    it('have to match radio in checked state with hover', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="radio-checked"] .dnb-radio',
        simulateSelector:
          '[data-visual-test="radio-checked"] .dnb-radio__input',
        simulate: 'hover',
      })
    })

    it('have to match disabled group', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="radio-group-disabled"] .dnb-radio-group',
      })
    })

    it('have to match radio group', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="radio-group"] .dnb-radio-group',
      })
    })

    it('have to match radio group in vertical layout', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="radio-group-vertical"] .dnb-radio-group',
      })
    })

    it('have to match radio group with label above', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="radio-group-label-above"] .dnb-radio-group',
      })
    })

    it('have to match radio group with form-status', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="radio-group-status"] .dnb-radio-group',
      })
    })

    it('have to match radio group plain', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="radio-group-plain"]',
      })
    })

    it('have to match radio button in different sizes', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="radio-sizes"]',
      })
    })

    it('have to match radio in checked state with error', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="radio-error-checked"] .dnb-radio',
      })
    })

    it('have to match radio in checked state with error and hover', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="radio-error-checked"] .dnb-radio',
        simulateSelector:
          '[data-visual-test="radio-error-checked"] .dnb-radio__input',
        simulate: 'hover',
      })
    })

    it('have to match radio in checked state with larger bounding area', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="radio-bounding"] .dnb-radio',
      })
    })
  })
})
