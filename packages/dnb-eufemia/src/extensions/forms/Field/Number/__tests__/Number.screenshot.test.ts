/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/jest/jestSetupScreenshots'

describe.each(['ui', 'sbanken'])('Number field for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/extensions/forms/base-fields/Number',
  })

  describe('with step control buttons', () => {
    it('matches the default state', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="number-input-step-controls"] .dnb-forms-field-number',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('matches the hover state', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="number-input-step-controls"] .dnb-forms-field-number',
        simulate: 'hover',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('matches horizontal layout', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="number-horizontal-layout"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('matches status messages', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="number-status"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('matches the focus state', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="number-input-step-controls"] .dnb-forms-field-number',
        simulateSelector:
          '[data-visual-test="number-input-step-controls"] .dnb-input',
        simulate: 'focusclick',
        waitAfterSimulate: 250,
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('matches the disabled state', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="number-input-step-controls-disabled"] .dnb-forms-field-number',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('matches the control button hover state', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="number-input-step-controls"] .dnb-forms-field-number',
        simulateSelector:
          '[data-visual-test="number-input-step-controls"] .dnb-button--control-before',
        simulate: 'hover',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('matches the error state', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="number-input-step-controls-error"] .dnb-forms-field-number',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('matches with label description', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="number-label-description"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  })
})

describe('Field.Number', () => {
  setupPageScreenshot({
    url: '/uilib/extensions/forms/base-fields/Number',
  })

  it('have to match widths', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="number-widths"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
