import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/jest/jestSetupScreenshots'

describe.each(['ui', 'sbanken'])(
  'ArraySelection field for %s',
  (themeName) => {
    setupPageScreenshot({
      pageViewport: {
        width: 800,
      },
      themeName,
      url: '/uilib/extensions/forms/base-fields/ArraySelection/demos',
    })

    describe('checkbox', () => {
      it('should match checkbox-options-vertical', async () => {
        const screenshot = await makeScreenshot({
          selector:
            '[data-visual-test="array-selection-checkbox-options-vertical"]',
        })
        expect(screenshot).toMatchImageSnapshot()
      })

      it('should match checkbox-options-horizontal', async () => {
        const screenshot = await makeScreenshot({
          selector:
            '[data-visual-test="array-selection-checkbox-options-horizontal"]',
        })
        expect(screenshot).toMatchImageSnapshot()
      })

      it('should match checkbox-horizontal', async () => {
        const screenshot = await makeScreenshot({
          selector:
            '[data-visual-test="array-selection-checkbox-horizontal"]',
        })
        expect(screenshot).toMatchImageSnapshot()
      })

      it('should match checkbox-horizontal-layout', async () => {
        const screenshot = await makeScreenshot({
          selector:
            '[data-visual-test="array-selection-checkbox-horizontal-layout"]',
        })
        expect(screenshot).toMatchImageSnapshot()
      })

      it('should match checkbox-help', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="array-selection-checkbox-help"]',
        })
        expect(screenshot).toMatchImageSnapshot()
      })

      it('should match checkbox-nesting-logic', async () => {
        const screenshot = await makeScreenshot({
          selector:
            '[data-visual-test="array-selection-checkbox-nesting-logic"]',
          simulate: 'click',
          simulateSelector:
            '[data-visual-test="array-selection-checkbox-nesting-logic"] .dnb-checkbox:nth-of-type(2) input',
          recalculateHeightAfterSimulate: true,
        })
        expect(screenshot).toMatchImageSnapshot()
      })
    })

    describe('button', () => {
      it('should match button-options-vertical', async () => {
        const screenshot = await makeScreenshot({
          selector:
            '[data-visual-test="array-selection-button-options-vertical"]',
        })
        expect(screenshot).toMatchImageSnapshot()
      })

      it('should match button-options-horizontal', async () => {
        const screenshot = await makeScreenshot({
          selector:
            '[data-visual-test="array-selection-button-options-horizontal"]',
        })
        expect(screenshot).toMatchImageSnapshot()
      })

      it('should match button-horizontal', async () => {
        const screenshot = await makeScreenshot({
          selector:
            '[data-visual-test="array-selection-button-horizontal"]',
        })
        expect(screenshot).toMatchImageSnapshot()
      })

      it('should match button-horizontal-layout', async () => {
        const screenshot = await makeScreenshot({
          selector:
            '[data-visual-test="array-selection-button-horizontal-layout"]',
        })
        expect(screenshot).toMatchImageSnapshot()
      })

      it('should match button-help', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="array-selection-button-help"]',
        })
        expect(screenshot).toMatchImageSnapshot()
      })

      it('should match button-nesting-logic', async () => {
        const screenshot = await makeScreenshot({
          selector:
            '[data-visual-test="array-selection-button-nesting-logic"]',
          simulate: 'click',
          simulateSelector:
            '[data-visual-test="array-selection-button-nesting-logic"] .dnb-toggle-button:nth-of-type(2) button',
          recalculateHeightAfterSimulate: true,
        })
        expect(screenshot).toMatchImageSnapshot()
      })
    })

    describe('checkbox-button', () => {
      it('should match simple checkbox-button', async () => {
        const screenshot = await makeScreenshot({
          selector: '[data-visual-test="array-selection-checkbox-button"]',
        })
        expect(screenshot).toMatchImageSnapshot()
      })

      it('should match checkbox-button-options-horizontal', async () => {
        const screenshot = await makeScreenshot({
          style: { width: '40rem' },
          selector:
            '[data-visual-test="array-selection-checkbox-button-options-horizontal"]',
        })
        expect(screenshot).toMatchImageSnapshot()
      })
    })
  }
)
