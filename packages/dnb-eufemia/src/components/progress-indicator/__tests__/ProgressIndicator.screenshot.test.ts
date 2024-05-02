/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe.each(['ui', 'sbanken'])(
  'ProgressIndicator for %s',
  (themeName) => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/progress-indicator/demos',
    })

    it('with label inside', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="progress-indicator-label-inside"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match the static primary circular with 50 percentage', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="progress-indicator-circular--primary"] .dnb-progress-indicator',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match the static primary linear with 50 percentage', async () => {
      const screenshot = await makeScreenshot({
        style: {
          width: '20rem',
        },
        selector:
          '[data-visual-test="progress-indicator-linear--primary"] .dnb-progress-indicator',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('with custom colors and size', async () => {
      const screenshot = await makeScreenshot({
        style: {
          width: '20rem',
        },
        selector: '[data-visual-test="progress-indicator-customization"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match customized horizontal', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="progress-indicator-custom-horizontal"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match customized  countdown', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="progress-indicator-custom-countdown"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  }
)

describe.each(['ui', 'sbanken'])(
  'ProgressIndicator circular for %s',
  (themeName) => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/progress-indicator/visual-tests',
    })

    it('have to match static primary circular sizes', async () => {
      const screenshot = await makeScreenshot({
        style: {
          height: '3.5rem',
          width: '8rem',
        },
        selector: '[data-visual-test="progress-indicator-sizes"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  }
)
