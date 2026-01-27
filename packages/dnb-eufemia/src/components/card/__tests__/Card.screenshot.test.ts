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

  it('should match border', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="layout-card-border"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match stack', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="layout-card-stack"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match grid', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="layout-card-grid"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match table', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="layout-card-table"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match table with outline', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="layout-card-table-outline"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match nested section', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="card-nested-section"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match in colored section', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="card-in-colored-section"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match flex', async () => {
    const screenshot = await makeScreenshot({
      addWrapper: false,
      selector:
        '[data-visual-test="layout-card-flex"] .dnb-flex-container',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match nested cards', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="layout-card-nested"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match outset', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="layout-card-outset"]',
      wrapperStyle: {
        padding: '2rem',
      },
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match background color', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="layout-card-background-color-outline"]',
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

    it('should match border', async () => {
      const screenshot = await makeScreenshot({
        ...params,
        selector: '[data-visual-test="layout-card-border"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('should match grid', async () => {
      const screenshot = await makeScreenshot({
        ...params,
        selector: '[data-visual-test="layout-card-grid"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('should match nested section', async () => {
      const screenshot = await makeScreenshot({
        ...params,
        addWrapper: false,
        selector: '[data-visual-test="card-nested-section"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('should match flex', async () => {
      const screenshot = await makeScreenshot({
        ...params,
        addWrapper: false,
        selector:
          '[data-visual-test="layout-card-flex"] .dnb-flex-container',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('should match nested cards', async () => {
      const screenshot = await makeScreenshot({
        ...params,
        selector: '[data-visual-test="layout-card-nested"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('should match outset', async () => {
      const screenshot = await makeScreenshot({
        ...params,
        selector: '[data-visual-test="layout-card-outset"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  }
)
