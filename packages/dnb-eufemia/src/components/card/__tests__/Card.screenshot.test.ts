/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe.each(['ui', 'sbanken'])('Card for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/card/demos',
  })

  it('have to match border', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="layout-card-border"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match stack', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="layout-card-stack"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match grid', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="layout-card-grid"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match table', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="layout-card-table"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match nested section', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="card-nested-section"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match flex', async () => {
    const screenshot = await makeScreenshot({
      addWrapper: false,
      selector:
        '[data-visual-test="layout-card-flex"] .dnb-flex-container',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match nested cards', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="layout-card-nested"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match outset', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="layout-card-outset"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe.each(['ui', 'sbanken'])(
  'Card small screen for %s',
  (themeName) => {
    const params = {
      themeName,
      pageViewport: {
        width: 400,
      },
      url: '/uilib/components/card/demos',
    }

    it('have to match border', async () => {
      const screenshot = await makeScreenshot({
        ...params,
        selector: '[data-visual-test="layout-card-border"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match grid', async () => {
      const screenshot = await makeScreenshot({
        ...params,
        selector: '[data-visual-test="layout-card-grid"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match nested section', async () => {
      const screenshot = await makeScreenshot({
        ...params,
        addWrapper: false,
        selector: '[data-visual-test="card-nested-section"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match flex', async () => {
      const screenshot = await makeScreenshot({
        ...params,
        addWrapper: false,
        selector:
          '[data-visual-test="layout-card-flex"] .dnb-flex-container',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match nested cards', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="layout-card-nested"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match outset', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="layout-card-outset"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  }
)
