import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/jest/jestSetupScreenshots'

describe('Selection', () => {
  setupPageScreenshot({
    url: '/uilib/extensions/forms/base-fields/Selection/demos/',
  })

  describe('autocomplete', () => {
    it('have to match groups', async () => {
      const screenshot = await makeScreenshot({
        style: {
          height: '16rem',
        },
        selector: '[data-visual-test="selection-autocomplete-groups"]',
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="selection-autocomplete-groups"] .dnb-autocomplete .dnb-input__input',
        simulateAfter: { keypress: 'Escape' },
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  })

  describe('dropdown', () => {
    it('have to match dropdown-default', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="selection-dropdown-default"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match dropdown-horizontal', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="selection-dropdown-horizontal"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match dropdown-help', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="selection-dropdown-help"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match dropdown-widths', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="selection-dropdown-widths"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match dropdown-error-message', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="selection-dropdown-error-message"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match dropdown-info-message', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="selection-dropdown-info-message"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match dropdown-warning-message', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="selection-dropdown-warning-message"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match groups', async () => {
      const screenshot = await makeScreenshot({
        style: {
          height: '16rem',
        },
        selector: '[data-visual-test="selection-dropdown-groups"]',
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="selection-dropdown-groups"] .dnb-dropdown__trigger',
        simulateAfter: { keypress: 'Escape' },
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  })

  describe('radio', () => {
    it('have to match radio-options-vertical', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="selection-radio-options-vertical"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match radio-list-options-vertical', async () => {
      const screenshot = await makeScreenshot({
        style: {
          width: '30rem',
        },
        selector:
          '[data-visual-test="selection-radio-list-options-vertical"]',

        simulate: 'hover',
        simulateSelector:
          '[data-visual-test="selection-radio-list-options-vertical"] .dnb-radio:nth-of-type(3)',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match radio-options-horizontal', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="selection-radio-options-horizontal"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match radio-vertical', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="selection-radio-vertical"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match radio-horizontal', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="selection-radio-horizontal"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match radio-nesting-logic', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="selection-radio-nesting-logic"]',
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="selection-radio-nesting-logic"] .dnb-radio:nth-of-type(2) input',
        recalculateHeightAfterSimulate: true,
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match selection-radio-advanced-nesting-logic', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="selection-radio-advanced-nesting-logic"]',
        recalculateHeightAfterSimulate: true,
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match radio-list-widths', async () => {
      const screenshot = await makeScreenshot({
        style: {
          width: '30rem',
        },
        selector: '[data-visual-test="selection-radio-list-widths"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  })

  describe('button', () => {
    it('have to match button-options-vertical', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="selection-button-options-vertical"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match button-options-horizontal', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="selection-button-options-horizontal"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match button-vertical', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="selection-button-vertical"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match button-nesting-logic', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="selection-button-nesting-logic"]',
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="selection-button-nesting-logic"] .dnb-toggle-button:nth-of-type(2) button',
        recalculateHeightAfterSimulate: true,
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  })
})
