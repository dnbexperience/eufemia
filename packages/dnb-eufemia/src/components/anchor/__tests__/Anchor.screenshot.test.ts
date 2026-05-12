import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken', 'carnegie', 'eiendom'])(
  `Anchor for %s`,
  (themeName) => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/anchor/demos/',
    })

    it('have to match the preview states', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="anchor-states"]',
      })
    })

    it('have to match breaking lines', async () => {
      await makeScreenshot({
        style: {
          'white-space': 'nowrap',
        },
        selector: '[data-visual-test="anchor-newline"]',
      })
    })

    it('have to match anchor with skeleton', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="anchor-skeleton"]',
      })
    })

    it('have to match anchor with icon-right', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="anchor-icon-right"]',
      })
    })

    it('have to match anchor with icon left', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="anchor-icon-left"]',
      })
    })

    it('have to match anchor with icon node', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="anchor-icon-node"]',
      })
    })

    it('have to match anchor with paragraph', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="anchor-paragraph"]',
      })
    })

    it('have to match anchor in heading', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="anchor-heading"]',
      })
    })

    it('have to match anchor with no icon', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="anchor-no-icon-prop"]',
      })
    })

    it('have to match anchor with no launch icon', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="anchor-no-launch-icon-prop"]',
      })
    })

    it('have to match disabled anchor', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="anchor-disabled"]',
      })
    })

    it('have to match anchor on dark surface', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="anchor-surface-dark"]',
      })
    })

    it('have to match the "default" state', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="anchor-basic"]',
      })
    })

    it('have to match the "focus" state', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="anchor-basic"]',
        simulateSelector: '[data-visual-test="anchor-basic"] .dnb-anchor',
        simulate: 'focus',
      })
    })

    it('have to match the "hover" state', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="anchor-basic"]',
        simulateSelector: '[data-visual-test="anchor-basic"] .dnb-anchor',
        simulate: 'hover',
      })
    })

    it('have to match the "active" state', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="anchor-basic"]',
        simulateSelector: '[data-visual-test="anchor-basic"] .dnb-anchor',
        simulate: 'active',
      })
    })

    describe('contrast', () => {
      it('have to match the anchor-contrast no-underline "default" state', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="anchor-contrast-no-underline"]',
        })
      })

      it('have to match the anchor-contrast no-underline no-hover "default" state', async () => {
        await makeScreenshot({
          selector:
            '[data-visual-test="anchor-contrast-no-underline-no-hover"]',
        })
      })

      it('have to match the anchor-contrast no-underline no-hover "hover" state', async () => {
        await makeScreenshot({
          selector:
            '[data-visual-test="anchor-contrast-no-underline-no-hover"]',
          simulateSelector:
            '[data-visual-test="anchor-contrast-no-underline-no-hover"] .dnb-anchor',
          simulate: 'hover',
        })
      })

      it('have to match the anchor-contrast no-underline no-radius "default" state', async () => {
        await makeScreenshot({
          selector:
            '[data-visual-test="anchor-contrast-no-underline-no-radius"]',
        })
      })

      it('have to match the anchor-contrast no-underline no-radius "hover" state', async () => {
        await makeScreenshot({
          selector:
            '[data-visual-test="anchor-contrast-no-underline-no-radius"]',
          simulateSelector:
            '[data-visual-test="anchor-contrast-no-underline-no-radius"] .dnb-anchor',
          simulate: 'hover',
        })
      })

      it('have to match the anchor-contrast no-hover "hover" state', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="anchor-contrast-no-hover"]',
          simulateSelector:
            '[data-visual-test="anchor-contrast-no-hover"] .dnb-anchor',
          simulate: 'hover',
        })
      })

      it('have to match the anchor-contrast no-radius "hover" state', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="anchor-contrast-no-radius"]',
          simulateSelector:
            '[data-visual-test="anchor-contrast-no-radius"] .dnb-anchor',
          simulate: 'hover',
        })
      })

      it('have to match the anchor-contrast "default" state', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="anchor-surface-dark"]',
        })
      })

      it('have to match the anchor-contrast "focus" state', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="anchor-surface-dark"]',
          simulateSelector:
            '[data-visual-test="anchor-surface-dark"] .dnb-anchor',
          simulate: 'focus',
        })
      })

      it('have to match the anchor-contrast "hover" state', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="anchor-surface-dark"]',
          simulateSelector:
            '[data-visual-test="anchor-surface-dark"] .dnb-anchor',
          simulate: 'hover',
        })
      })

      it('have to match the anchor-contrast "active" state', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="anchor-surface-dark"]',
          simulateSelector:
            '[data-visual-test="anchor-surface-dark"] .dnb-anchor',
          simulate: 'active',
        })
      })
    })

    describe('modifiers', () => {
      it('have to match the dnb-anchor--no-icon', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="anchor-no-icon"]',
        })
      })

      it('have to match the dnb-anchor--no-underline', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="anchor-in-section"]',
        })
      })
    })

    it('have to match the "hover" state for modifier no-style', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="anchor-no-style"]',
        simulateSelector:
          '[data-visual-test="anchor-no-style"] .dnb-anchor',
        simulate: 'hover',
      })
    })

    it('have to match the "hover" state for modifier no-hover', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="anchor-no-hover"]',
        simulateSelector:
          '[data-visual-test="anchor-no-hover"] .dnb-anchor',
        simulate: 'hover',
      })
    })

    if (themeName === 'sbanken') {
      it('have to match the dnb-anchor--inline hover', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="anchor-paragraph"]',
          simulateSelector:
            '[data-visual-test="anchor-paragraph"] a.dnb-anchor',
          simulate: 'hover',
        })
      })

      it('have to match the dnb-anchor--inline active', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="anchor-paragraph"]',
          simulateSelector:
            '[data-visual-test="anchor-paragraph"] a.dnb-anchor',
          simulate: 'active',
        })
      })

      it('have to match the dnb-anchor--inline focus', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="anchor-paragraph"]',
          simulateSelector:
            '[data-visual-test="anchor-paragraph"] a.dnb-anchor',
          simulate: 'focus',
        })
      })

      it('have to match with icon hover', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="anchor-icon-left"]',
          simulateSelector:
            '[data-visual-test="anchor-icon-left"] a.dnb-anchor',
          simulate: 'hover',
        })
      })

      it('have to match with icon active', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="anchor-icon-left"]',
          simulateSelector:
            '[data-visual-test="anchor-icon-left"] a.dnb-anchor',
          simulate: 'active',
        })
      })

      it('have to match with icon focus', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="anchor-icon-left"]',
          simulateSelector:
            '[data-visual-test="anchor-icon-left"] a.dnb-anchor',
          simulate: 'focus',
        })
      })
    }

    it('have to break word with icon', async () => {
      const widths = { sbanken: '16rem', ui: '17.5rem' }
      await makeScreenshot({
        selector: '[data-visual-test="anchor-icon-break"]',
        style: { width: widths[themeName] },
      })
    })
  }
)

describe.each(['ui', 'sbanken'])(
  `Anchor target blank for %s`,
  (themeName) => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/anchor/demos/',
    })

    it('have to match blank target anchor in heading', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="anchor-heading-blank"]',
      })
    })

    it('have to match the target blank state', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="anchor-blank"] a',
      })
    })

    it('have to match blank target with icon left', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="anchor-blank-icon-left"] a',
      })
    })

    it('have to match the target blank with href protocol', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="anchor-protocol"]',
      })
    })

    it('have to match the target blank with tooltip', async () => {
      await makeScreenshot({
        style: {
          'padding-top': '2rem',
        },
        selector: '[data-visual-test="anchor-blank"]',
        simulateSelector: '[data-visual-test="anchor-blank"] a.dnb-anchor',
        simulate: 'hover',
      })
    })
  }
)
