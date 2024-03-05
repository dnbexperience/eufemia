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

  it('have to match the preview states', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="anchor-states"]',
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
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the "default" state', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="anchor-basic"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the "focus" state', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="anchor-basic"]',
      simulateSelector: '[data-visual-test="anchor-basic"] .dnb-anchor',
      simulate: 'focus',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the "hover" state', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="anchor-basic"]',
      simulateSelector: '[data-visual-test="anchor-basic"] .dnb-anchor',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the "active" state', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="anchor-basic"]',
      simulateSelector: '[data-visual-test="anchor-basic"] .dnb-anchor',
      simulate: 'active',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  describe('contrast', () => {
    it('have to match the anchor-contrast no-underline "default" state', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="anchor-contrast-no-underline"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match the anchor-contrast no-underline no-hover "default" state', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="anchor-contrast-no-underline-no-hover"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match the anchor-contrast no-underline no-hover "hover" state', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="anchor-contrast-no-underline-no-hover"]',
        simulateSelector:
          '[data-visual-test="anchor-contrast-no-underline-no-hover"] .dnb-anchor',
        simulate: 'hover',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match the anchor-contrast no-underline no-radius "default" state', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="anchor-contrast-no-underline-no-radius"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match the anchor-contrast no-underline no-radius "hover" state', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="anchor-contrast-no-underline-no-radius"]',
        simulateSelector:
          '[data-visual-test="anchor-contrast-no-underline-no-radius"] .dnb-anchor',
        simulate: 'hover',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match the anchor-contrast no-hover "hover" state', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="anchor-contrast-no-hover"]',
        simulateSelector:
          '[data-visual-test="anchor-contrast-no-hover"] .dnb-anchor',
        simulate: 'hover',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match the anchor-contrast no-radius "hover" state', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="anchor-contrast-no-radius"]',
        simulateSelector:
          '[data-visual-test="anchor-contrast-no-radius"] .dnb-anchor',
        simulate: 'hover',
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
        simulateSelector:
          '[data-visual-test="anchor-contrast"] .dnb-anchor',
        simulate: 'focus',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match the anchor-contrast "hover" state', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="anchor-contrast"]',
        simulateSelector:
          '[data-visual-test="anchor-contrast"] .dnb-anchor',
        simulate: 'hover',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match the anchor-contrast "active" state', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="anchor-contrast"]',
        simulateSelector:
          '[data-visual-test="anchor-contrast"] .dnb-anchor',
        simulate: 'active',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  })

  describe('modifiers', () => {
    it('have to match the dnb-anchor--no-icon', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="anchor-no-icon"]',
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

  it('have to match the "hover" state for modifier no-style', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="anchor-no-style"]',
      simulateSelector: '[data-visual-test="anchor-no-style"] .dnb-anchor',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the "hover" state for modifier no-hover', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="anchor-no-hover"]',
      simulateSelector: '[data-visual-test="anchor-no-hover"] .dnb-anchor',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  if (themeName === 'sbanken') {
    it('have to match the dnb-anchor--inline hover', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="anchor-paragraph"]',
        simulateSelector:
          '[data-visual-test="anchor-paragraph"] a.dnb-anchor',
        simulate: 'hover',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match the dnb-anchor--inline active', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="anchor-paragraph"]',
        simulateSelector:
          '[data-visual-test="anchor-paragraph"] a.dnb-anchor',
        simulate: 'active',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match the dnb-anchor--inline focus', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="anchor-paragraph"]',
        simulateSelector:
          '[data-visual-test="anchor-paragraph"] a.dnb-anchor',
        simulate: 'focus',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match with icon hover', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="anchor-icon-left"]',
        simulateSelector:
          '[data-visual-test="anchor-icon-left"] a.dnb-anchor',
        simulate: 'hover',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match with icon active', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="anchor-icon-left"]',
        simulateSelector:
          '[data-visual-test="anchor-icon-left"] a.dnb-anchor',
        simulate: 'active',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match with icon focus', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="anchor-icon-left"]',
        simulateSelector:
          '[data-visual-test="anchor-icon-left"] a.dnb-anchor',
        simulate: 'focus',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  }
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

    it('have to match blank target with icon left', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="anchor-blank-icon-left"] a',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match the target blank with href protocol', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="anchor-protocol"]',
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
          waitAfterSimulate: 200,
        })
        expect(screenshot).toMatchImageSnapshot()
      })
    }
  }
)

// Deprecated – can be removed in v11
describe.each(['ui'])('Anchor legacy icon usage for %s', (themeName) => {
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
})
