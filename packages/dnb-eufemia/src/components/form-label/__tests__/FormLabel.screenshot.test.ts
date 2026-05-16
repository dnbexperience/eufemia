import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken', 'carnegie'])(
  `FormLabel for %s`,
  (themeName) => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/form-label/demos/',
    })

    it('have to match default form-label', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="form-label-default"]',
      })
    })

    it('have to match default form-label with hover', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="form-label-default"]',
        simulate: 'hover',
      })
    })

    it('have to match checkbox label hover', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="form-label-default"]',
        simulate: 'hover',
        simulateSelector:
          '[data-visual-test="form-label-default"] .dnb-checkbox .dnb-form-label',
      })
    })

    it('have to match horizontal form-label', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="form-label-horizontal"]',
      })
    })

    it('have to match fix-content width', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="form-label-default"] label',
        style: {
          'background-color': 'yellow',
        },
        wrapperStyle: {
          display: 'block',
          width: '20rem',
        },
      })
    })
  }
)
