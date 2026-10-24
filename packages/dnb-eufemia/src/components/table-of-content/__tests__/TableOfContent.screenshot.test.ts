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

  it('matches a hovered row', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="table-of-content-declarative"]',
      style: { width: '18rem' },
      simulate: 'hover',
      simulateSelector:
        '[data-visual-test="table-of-content-declarative"] a',
    })
  })

  it('matches dark navigation', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="table-of-content-declarative"]',
      style: { width: '18rem' },
      colorScheme: 'dark',
      wrapperStyle: {
        background: 'var(--token-color-background-neutral)',
      },
    })
  })

  it('keeps a selected row highlighted while hovered in dark mode', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="table-of-content-declarative"]',
      style: { width: '18rem' },
      colorScheme: 'dark',
      wrapperStyle: {
        background: 'var(--token-color-background-neutral)',
      },
      simulate: 'hover',
      simulateSelector:
        '[data-visual-test="table-of-content-declarative"] a[aria-current]',
    })
  })

  it('matches expanded mobile text links', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="table-of-content-declarative"]',
      pageViewport: { width: 600, height: 900 },
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="table-of-content-declarative"] button',
    })
  })

  it('matches mobile keyboard focus in dark mode', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="table-of-content-declarative"]',
      pageViewport: { width: 600, height: 900 },
      colorScheme: 'dark',
      wrapperStyle: {
        background: 'var(--token-color-background-neutral)',
      },
      simulate: [
        {
          action: 'click',
          selector:
            '[data-visual-test="table-of-content-declarative"] button',
        },
        {
          action: 'focus',
          selector: '[data-visual-test="table-of-content-declarative"] a',
        },
      ],
    })
  })
})
