import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken'])(
  `Form Components Alignment for %s`,
  (themeName) => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/layout/visual-tests/',
    })

    it('have to match vertical direction', async () => {
      await makeScreenshot({
        withWrapper: false,
        style: { width: '30rem' },
        selector:
          '[data-visual-test="form-components-alignment-vertical"]',
      })
    })

    it('have to match vertical-labels direction', async () => {
      await makeScreenshot({
        withWrapper: false,
        style: { width: '30rem' },
        selector:
          '[data-visual-test="form-components-alignment-vertical-labels"]',
      })
    })

    it('have to match horizontal direction', async () => {
      await makeScreenshot({
        withWrapper: false,
        style: {
          width: '60rem',
          overflow: 'visible',
          padding: '0', // Reset existing styles
          'white-space': 'initial', // Reset existing styles
        },
        selector:
          '[data-visual-test="form-components-alignment-horizontal"] .dnb-flex-container',
      })
    })
  }
)
