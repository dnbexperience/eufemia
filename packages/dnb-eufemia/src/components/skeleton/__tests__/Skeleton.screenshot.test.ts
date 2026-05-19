import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken'])(`Skeleton for %s`, (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/skeleton/demos/',
  })

  it('have to match skeleton article figure', async () => {
    await makeScreenshot({
      style: { width: '20rem', height: '20rem' },
      selector: '[data-visual-test="skeleton-figure-article"]',
    })
  })

  it('have to match excluded components', async () => {
    await makeScreenshot({
      style: { width: '20rem', height: '20rem' },
      selector: '[data-visual-test="skeleton-exclude"]',
    })
  })

  it('have to match a removed skeleton', async () => {
    await makeScreenshot({
      style: { width: '20rem', height: '20rem' },
      selector: '[data-visual-test="skeleton-exclude"]',
      simulateSelector:
        '[data-visual-test="skeleton-exclude"] .dnb-button',
      simulate: 'click',
    })
  })

  it('have to match all components - vertical', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="skeleton-all-vertical"]',
    })
  })

  it('have to match all components - horizontal', async () => {
    await makeScreenshot({
      withWrapper: false,
      style: {
        width: '60rem',
        overflow: 'visible',
        padding: '0', // Reset existing styles
        'white-space': 'initial', // Reset existing styles
      },
      selector:
        '[data-visual-test="skeleton-all-horizontal"] .dnb-flex-container',
    })
  })
})
