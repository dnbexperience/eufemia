import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui'])(`Filter for %s`, (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/web/components/filter/demos/',
  })

  it('have to match date and selection filter', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="filter-date-selection"]',
      executeBeforeSimulate: () => {
        const example = document.querySelector(
          '[data-visual-test="filter-date-selection"]'
        )
        const header = example.querySelector('.dnb-filter__header')
        const item = example.querySelector('.dnb-list__item')

        const outlines = [header, item].map((element) => {
          const bounds = element.getBoundingClientRect()
          const outline = getComputedStyle(element, '::after')

          return {
            left: bounds.left + parseFloat(outline.left),
            right: bounds.right - parseFloat(outline.right),
          }
        })

        if (
          outlines[0].left !== outlines[1].left ||
          outlines[0].right !== outlines[1].right
        ) {
          throw new Error(
            `Filter and List outlines must align: ${JSON.stringify(outlines)}`
          )
        }
      },
    })
  })

  it('have to match date and selection filter with open panel', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="filter-date-selection"] .dnb-filter',
      recalculateHeightAfterSimulate: true,
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="filter-date-selection"] button[aria-expanded]',
    })
  })

  it('have to match multi-selection filter with grid layout', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="filter-multi-selection-grid"] .dnb-filter',
    })
  })

  it('have to match manual behavior with open panel', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="filter-manual-behavior"] .dnb-filter',
      recalculateHeightAfterSimulate: true,
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="filter-manual-behavior"] button[aria-expanded]',
    })
  })
})

describe.each([960, 375])('Filter panel actions at %spx', (width) => {
  setupPageScreenshot({
    themeName: 'ui',
    url: '/web/components/filter/visual-tests/panel-actions/',
    pageViewport: { width, height: 800 },
  })

  it('matches a short panel without a bottom close button', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="filter-short-panel"]',
    })
  })

  it('matches a tall panel with a bottom close button', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="filter-tall-panel"]',
    })
  })
})
