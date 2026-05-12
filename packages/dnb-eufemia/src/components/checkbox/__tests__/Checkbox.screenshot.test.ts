import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken'])(`Checkbox for %s`, (themeName) => {
  describe('unchecked', () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/checkbox/demos/',
    })

    it('have to match checkbox in unchecked state', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="checkbox-default"] .dnb-checkbox',
      })
    })

    it('have to match checkbox in unchecked state with focus', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="checkbox-default"] .dnb-checkbox',
        simulateSelector:
          '[data-visual-test="checkbox-default"] .dnb-checkbox__input',
        simulate: 'focus', // should be tested first
      })
    })

    it('have to match checkbox in unchecked state with hover', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="checkbox-default"] .dnb-checkbox',
        simulateSelector:
          '[data-visual-test="checkbox-default"] .dnb-checkbox__input',
        simulate: 'hover',
      })
    })

    it('have to match checkbox in unchecked state with error', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="checkbox-error-unchecked"] .dnb-checkbox',
      })
    })

    it('have to match checkbox in unchecked state with error and hover', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="checkbox-error-unchecked"] .dnb-checkbox',
        simulate: 'hover',
      })
    })
  })

  // NB: Because of focus simulation and screenshotElement.press('Tab')
  // we have to run the two focus simulations in a separate run each
  describe('checked', () => {
    it('have to match checkbox in checked state', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="checkbox-checked"] .dnb-checkbox',
      })
    })

    it('have to match checkbox in checked state with focus', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="checkbox-checked"] .dnb-checkbox',
        simulateSelector:
          '[data-visual-test="checkbox-checked"] .dnb-checkbox__input',
        simulate: 'focus', // should be tested first
      })
    })

    it('have to match checkbox in checked state with hover', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="checkbox-checked"] .dnb-checkbox',
        simulateSelector:
          '[data-visual-test="checkbox-checked"] .dnb-checkbox__input',
        simulate: 'hover',
      })
    })

    it('have to match different checkbox sizes', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="checkbox-sizes"]',
      })
    })

    it('have to match disabled checkbox', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="checkbox-disabled"] .dnb-checkbox',
      })
    })

    it('have to match checkbox in error state', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="checkbox-error"] .dnb-checkbox',
      })
    })

    it('have to match checkbox in checked state with error', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="checkbox-error-checked"] .dnb-checkbox',
      })
    })

    it('have to match checkbox in checked state with error and hover', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="checkbox-error-checked"] .dnb-checkbox',
        simulate: 'hover',
      })
    })

    it('have to match checkbox in checked state with larger bounding area', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="checkbox-bounding"] .dnb-checkbox',
      })
    })

    it('have to match checkbox in indeterminate state', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="checkbox-indeterminate"] .dnb-checkbox',
      })
    })
    it('have to match checkbox in indeterminate state with larger bounding area', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="checkbox-indeterminate-large"] .dnb-checkbox',
      })
    })
  })
})
