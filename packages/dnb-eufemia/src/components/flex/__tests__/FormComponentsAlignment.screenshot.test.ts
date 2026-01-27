import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe.each(['ui', 'sbanken'])(
  'Form Components Alignment for %s',
  (themeName) => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/layout/visual-tests',
    })

    it('should match vertical direction', async () => {
      const screenshot = await makeScreenshot({
        addWrapper: false,
        style: { width: '30rem' },
        selector:
          '[data-visual-test="form-components-alignment-vertical"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('should match vertical-labels direction', async () => {
      const screenshot = await makeScreenshot({
        addWrapper: false,
        style: { width: '30rem' },
        selector:
          '[data-visual-test="form-components-alignment-vertical-labels"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('should match horizontal direction', async () => {
      const screenshot = await makeScreenshot({
        addWrapper: false,
        style: { width: '60rem', overflow: 'visible' },
        selector:
          '[data-visual-test="form-components-alignment-horizontal"] .dnb-flex-container',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  }
)
