import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken', 'carnegie'])(
  `Card for %s`,
  (themeName) => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/card/demos/',
    })

    it('have to match border', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="layout-card-border"]',
      })
    })

    it('have to match stack', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="layout-card-stack"]',
      })
    })

    it('have to match grid', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="layout-card-grid"]',
      })
    })

    it('have to match table', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="layout-card-table"]',
      })
    })

    it('have to match table with outline', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="layout-card-table-outline"]',
      })
    })

    it('have to match nested section', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="card-nested-section"]',
      })
    })

    it('have to match in colored section', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="card-in-colored-section"]',
      })
    })

    it('have to match flex', async () => {
      await makeScreenshot({
        withWrapper: false,
        selector:
          '[data-visual-test="layout-card-flex"] .dnb-flex-container',
      })
    })

    it('have to match nested cards', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="layout-card-nested"]',
      })
    })

    it('have to match drop shadow', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="layout-card-drop-shadow"]',
      })
    })

    it('have to match outset', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="layout-card-outset"]',
        wrapperStyle: {
          padding: '2rem',
        },
      })
    })

    it('have to match background color', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="layout-card-background-color-outline"]',
      })
    })
  }
)

describe.each(['ui', 'sbanken'])(
  `Card small screen for %s`,
  (themeName) => {
    const params = {
      themeName,
      pageViewport: {
        width: 400,
      },
      url: '/uilib/components/card/demos/',
    }

    it('have to match border', async () => {
      await makeScreenshot({
        ...params,
        selector: '[data-visual-test="layout-card-border"]',
      })
    })

    it('have to match grid', async () => {
      await makeScreenshot({
        ...params,
        selector: '[data-visual-test="layout-card-grid"]',
      })
    })

    it('have to match nested section', async () => {
      await makeScreenshot({
        ...params,
        withWrapper: false,
        selector: '[data-visual-test="card-nested-section"]',
      })
    })

    it('have to match flex', async () => {
      await makeScreenshot({
        ...params,
        withWrapper: false,
        selector:
          '[data-visual-test="layout-card-flex"] .dnb-flex-container',
      })
    })

    it('have to match nested cards', async () => {
      await makeScreenshot({
        ...params,
        selector: '[data-visual-test="layout-card-nested"]',
      })
    })

    it('have to match outset', async () => {
      await makeScreenshot({
        ...params,
        selector: '[data-visual-test="layout-card-outset"]',
      })
    })
  }
)
