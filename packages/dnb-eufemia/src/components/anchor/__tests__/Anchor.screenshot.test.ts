/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe.each(['ui', 'sbanken'])('Anchor for %s', (themeName) => {
  setupPageScreenshot({ themeName, url: '/uilib/components/anchor' })

  it('have to match the "default" state', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="anchor-default"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match breaking lines', async () => {
    const screenshot = await makeScreenshot({
      style: {
        'white-space': 'nowrap',
      },
      selector: '[data-visual-test="anchor-newline"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match anchor with skeleton', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="anchor-skeleton"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match anchor with icon-right', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="anchor-icon-right"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match anchor with icon left', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="anchor-icon-left"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match anchor with icon node', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="anchor-icon-node"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match anchor with paragraph', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="anchor-paragraph"]',
      matchConfig: {
        failureThreshold: 0.0013,
      },
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match anchor in heading', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="anchor-heading"]',
      matchConfig: {
        failureThreshold: 0.0016,
      },
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the "hover" state', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="anchor-hover"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the "active" state', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="anchor-active"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the "focus" state', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="anchor-focus"]',
      simulate: 'focus',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the anchor-contrast "default" state', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="anchor-contrast"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the anchor-contrast "focus" state', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="anchor-contrast"]',
      simulate: 'focus',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the anchor-contrast "hover" state', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="anchor-contrast"]',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the dnb-anchor--no-underline', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="anchor-in-section"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe.each(['ui', 'sbanken'])(
  'Anchor target blank for %s',
  (themeName) => {
    setupPageScreenshot({ themeName, url: '/uilib/components/anchor' })

    it('have to match blank target anchor in heading', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="anchor-heading-blank"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match the target blank state', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="anchor-blank"] a',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    if (themeName === 'ui') {
      it('have to match the target blank with tooltip', async () => {
        const screenshot = await makeScreenshot({
          style: {
            'padding-top': '2rem',
          },
          selector: '[data-visual-test="anchor-blank"]',
          simulateSelector:
            '[data-visual-test="anchor-blank"] a.dnb-anchor',
          simulate: 'hover',
        })
        expect(screenshot).toMatchImageSnapshot()
      })
    }
  }
)

describe.each(['ui', 'sbanken'])(
  'Anchor legacy icon usage for %s',
  (themeName) => {
    setupPageScreenshot({ themeName, url: '/uilib/components/anchor' })

    it('have to match anchor with legacy icon', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="anchor-legacy-icon"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match anchor with paragraph legacy icon', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="anchor-legacy-paragraph"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match anchor with target blank legacy icon', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="anchor-legacy-blank-with-icon"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  }
)
