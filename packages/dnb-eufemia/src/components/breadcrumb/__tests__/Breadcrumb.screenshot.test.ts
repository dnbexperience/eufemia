import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken'])(`Breadcrumb for %s`, (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/breadcrumb/demos/',
  })

  it('have to match Breadcrumb single', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="breadcrumb-single"] .dnb-breadcrumb',
    })
  })

  it('have to match Breadcrumb default', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="breadcrumb-default"] .dnb-breadcrumb',
    })
  })

  it('have to match Breadcrumb with custom children', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="breadcrumb-children"] .dnb-breadcrumb',
    })
  })

  it('have to match Breadcrumb collapse', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="breadcrumb-collapse"] .dnb-breadcrumb',
    })
  })

  it('have to match Breadcrumb collapse opened', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="breadcrumb-collapse"] .dnb-breadcrumb',
      simulateSelector:
        '[data-visual-test="breadcrumb-collapse"] .dnb-breadcrumb__toggle',
      recalculateHeightAfterSimulate: true,
      simulate: 'click',
    })
  })

  it('have to match Breadcrumb hover state', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="breadcrumb-default"] .dnb-breadcrumb',
      screenshotSelector:
        '[data-visual-test="breadcrumb-default"] .dnb-breadcrumb .dnb-breadcrumb__bar',
      simulateSelector:
        '[data-visual-test="breadcrumb-default"] .dnb-breadcrumb__list .dnb-breadcrumb__item:nth-of-type(2) a',
      simulate: 'hover',
    })
  })

  it('have to match Breadcrumb active state', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="breadcrumb-default"] .dnb-breadcrumb',
      screenshotSelector:
        '[data-visual-test="breadcrumb-default"] .dnb-breadcrumb .dnb-breadcrumb__bar',
      simulateSelector:
        '[data-visual-test="breadcrumb-default"] .dnb-breadcrumb__list .dnb-breadcrumb__item:nth-of-type(2) a',
      simulate: 'active',
    })
  })

  it('have to match Breadcrumb focus state', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="breadcrumb-default"] .dnb-breadcrumb',
      screenshotSelector:
        '[data-visual-test="breadcrumb-default"] .dnb-breadcrumb .dnb-breadcrumb__bar',
      simulateSelector:
        '[data-visual-test="breadcrumb-default"] .dnb-breadcrumb__list .dnb-breadcrumb__item:nth-of-type(2) a',
      simulate: 'focus',
    })
  })

  it('have to match Breadcrumb multiple', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="breadcrumb-multiple"] .dnb-breadcrumb',
    })
  })

  describe('on small screen', () => {
    setupPageScreenshot({
      url: '/uilib/components/breadcrumb/demos/',
      themeName,
      pageViewport: {
        width: 700,
      },
    })

    it('have to match Breadcrumb default', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="breadcrumb-default"] .dnb-breadcrumb',
      })
    })

    it('have to match Breadcrumb multiple', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="breadcrumb-multiple"] .dnb-breadcrumb',
      })
    })
  })
})
