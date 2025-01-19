/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe.each(['ui', 'sbanken'])('Breadcrumb for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/breadcrumb/demos',
  })

  it('have to match Breadcrumb single', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="breadcrumb-single"] .dnb-breadcrumb',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match Breadcrumb default', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="breadcrumb-default"] .dnb-breadcrumb',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match Breadcrumb with custom children', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="breadcrumb-children"] .dnb-breadcrumb',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match Breadcrumb collapse', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="breadcrumb-collapse"] .dnb-breadcrumb',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match Breadcrumb collapse opened', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="breadcrumb-collapse"] .dnb-breadcrumb',
      simulateSelector:
        '[data-visual-test="breadcrumb-collapse"] .dnb-breadcrumb__toggle',
      recalculateHeightAfterSimulate: true,
      simulate: 'click',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match Breadcrumb hover state', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="breadcrumb-default"] .dnb-breadcrumb',
      screenshotSelector:
        '[data-visual-test="breadcrumb-default"] .dnb-breadcrumb .dnb-breadcrumb__bar',
      simulateSelector:
        '[data-visual-test="breadcrumb-default"] .dnb-breadcrumb__list .dnb-breadcrumb__item:nth-of-type(2) a',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match Breadcrumb active state', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="breadcrumb-default"] .dnb-breadcrumb',
      screenshotSelector:
        '[data-visual-test="breadcrumb-default"] .dnb-breadcrumb .dnb-breadcrumb__bar',
      simulateSelector:
        '[data-visual-test="breadcrumb-default"] .dnb-breadcrumb__list .dnb-breadcrumb__item:nth-of-type(2) a',
      simulate: 'active',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match Breadcrumb focus state', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="breadcrumb-default"] .dnb-breadcrumb',
      screenshotSelector:
        '[data-visual-test="breadcrumb-default"] .dnb-breadcrumb .dnb-breadcrumb__bar',
      simulateSelector:
        '[data-visual-test="breadcrumb-default"] .dnb-breadcrumb__list .dnb-breadcrumb__item:nth-of-type(2) a',
      simulate: 'focus',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match Breadcrumb multiple', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="breadcrumb-multiple"] .dnb-breadcrumb',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  describe('on small screen', () => {
    setupPageScreenshot({
      url: '/uilib/components/breadcrumb/demos',
      themeName,
      pageViewport: {
        width: 700,
      },
    })

    it('have to match Breadcrumb default', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="breadcrumb-default"] .dnb-breadcrumb',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match Breadcrumb multiple', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="breadcrumb-multiple"] .dnb-breadcrumb',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match Breadcrumb collapse opened', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="breadcrumb-collapse"] .dnb-breadcrumb',
        simulateSelector:
          '[data-visual-test="breadcrumb-collapse"] .dnb-breadcrumb__toggle',
        recalculateHeightAfterSimulate: true,
        simulate: 'click',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  })
})
