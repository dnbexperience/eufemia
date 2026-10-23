import { describe, it } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken'])('TableOfContent for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/table-of-content/demos/',
  })

  it('matches nested declarative navigation', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="table-of-content-declarative"]',
      style: { width: '18rem' },
    })
  })

  it('matches inline code and wrapped data labels', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="table-of-content-data"]',
      style: { width: '14rem' },
    })
  })

  it('matches keyboard focus', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="table-of-content-declarative"]',
      style: { width: '18rem' },
      simulate: 'focus',
      simulateSelector:
        '[data-visual-test="table-of-content-declarative"] a',
    })
  })
})
