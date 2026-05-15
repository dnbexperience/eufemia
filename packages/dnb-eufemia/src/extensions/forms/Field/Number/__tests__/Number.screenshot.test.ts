import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken'])(`Number field for %s`, (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/extensions/forms/base-fields/Number/demos/',
  })

  describe('with step control buttons', () => {
    it('matches the default state', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="number-input-step-controls"] .dnb-forms-field-number',
      })
    })

    it('matches the hover state', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="number-input-step-controls"] .dnb-forms-field-number',
        simulate: 'hover',
      })
    })

    it('matches horizontal layout', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="number-horizontal-layout"]',
      })
    })

    it('matches status messages', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="number-status"]',
      })
    })

    it('matches the focus state', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="number-input-step-controls"] .dnb-forms-field-number',
        simulateSelector:
          '[data-visual-test="number-input-step-controls"] .dnb-input',
        simulate: 'focusclick',
      })
    })

    it('matches the disabled state', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="number-input-step-controls-disabled"] .dnb-forms-field-number',
      })
    })

    it('matches the control button hover state', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="number-input-step-controls"] .dnb-forms-field-number',
        simulateSelector:
          '[data-visual-test="number-input-step-controls"] .dnb-button--control-before',
        simulate: 'hover',
      })
    })

    it('matches the error state', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="number-input-step-controls-error"] .dnb-forms-field-number',
      })
    })

    it('matches with label description', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="number-label-description"]',
      })
    })
  })
})

describe('Field.Number', () => {
  setupPageScreenshot({
    url: '/uilib/extensions/forms/base-fields/Number/demos/',
  })

  it('have to match widths', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="number-widths"]',
    })
  })
})
