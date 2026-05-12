import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken', 'eiendom', 'carnegie'])(
  `Button for %s`,
  (themeName) => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/button/demos/',
    })

    describe('primary', () => {
      it('have to match default state', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="button-primary"]',
        })
      })

      it('have to match focus state', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="button-primary"]',
          simulate: 'focus',
        })
      })

      it('have to match hover state', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="button-primary"]',
          simulate: 'hover',
        })
      })

      it('have to match active state', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="button-primary"]',
          simulate: 'active',
        })
      })
    })

    describe('secondary', () => {
      it('have to match default styles', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="button-secondary"]',
        })
      })

      it('have to match focus state', async () => {
        await makeScreenshot({
          style: {
            'padding-right': '2rem',
          },
          selector: '[data-visual-test="button-secondary"]',
          simulate: 'focus',
        })
      })

      it('have to match hover state', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="button-secondary"]',
          simulate: 'hover',
        })
      })

      it('have to match active state', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="button-secondary"]',
          simulate: 'active',
        })
      })
    })

    describe('tertiary', () => {
      it('have to match all tertiary buttons', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="button-tertiary-all"]',
        })
      })

      it('have to match "dnb-button--tertiary"', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="button-tertiary"]',
        })
      })

      it('have to match focus state', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="button-tertiary"]',
          simulate: 'focus',
        })
      })

      it('have to match hover state', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="button-tertiary"]',
          simulate: 'hover',
        })
      })

      it('have to match active state', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="button-tertiary"]',
          simulate: 'active',
        })
      })

      it('have to match tertiary with top icon', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="button-tertiary-top"]',
        })
      })

      it('have to match disabled buttons', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="button-disabled"]',
        })
      })

      it('have to match button with custom content', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="button-custom-content"]',
        })
      })

      it('have to match tertiary button with text wrap', async () => {
        await makeScreenshot({
          style: {
            width: '20rem',
            height: '6rem',
          },
          selector: '[data-visual-test="button-tertiary-wrap"]',
        })
      })
    })

    describe('error', () => {
      it('have to match', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="button-error"]',
        })
      })

      describe('primary', () => {
        it('have to match focus state', async () => {
          await makeScreenshot({
            selector: '[data-visual-test="button-error-primary"]',
            simulate: 'focus',
          })
        })

        it('have to match hover state', async () => {
          await makeScreenshot({
            selector: '[data-visual-test="button-error-primary"]',
            simulate: 'hover',
          })
        })

        it('have to match active state', async () => {
          await makeScreenshot({
            selector: '[data-visual-test="button-error-primary"]',
            simulate: 'active',
          })
        })
      })

      describe('secondary', () => {
        it('have to match focus state', async () => {
          await makeScreenshot({
            selector: '[data-visual-test="button-error-secondary"]',
            simulate: 'focus',
          })
        })

        it('have to match hover state', async () => {
          await makeScreenshot({
            selector: '[data-visual-test="button-error-secondary"]',
            simulate: 'hover',
          })
        })

        it('have to match active state', async () => {
          await makeScreenshot({
            selector: '[data-visual-test="button-error-secondary"]',
            simulate: 'active',
          })
        })
      })

      describe('tertiary', () => {
        it('have to match focus state', async () => {
          await makeScreenshot({
            selector: '[data-visual-test="button-error-tertiary"]',
            simulate: 'focus',
          })
        })

        it('have to match hover state', async () => {
          await makeScreenshot({
            selector: '[data-visual-test="button-error-tertiary"]',
            simulate: 'hover',
          })
        })

        it('have to match active state', async () => {
          await makeScreenshot({
            selector: '[data-visual-test="button-error-tertiary"]',
            simulate: 'active',
          })
        })
      })
    })

    describe('icon', () => {
      it('have to match icon buttons', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="button-icons"]',
        })
      })

      it('have to match icon button', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="button-icon"]',
        })
      })

      it('have to match icon button with focus state', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="button-icon"]',
          simulate: 'focus',
        })
      })

      it('have to match icon button with hover state', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="button-icon"]',
          simulate: 'hover',
        })
      })

      it('have to match icon button with active state', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="button-icon"]',
          simulate: 'active',
        })
      })

      it('tertiary have to match icon button', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="button-icon-tertiary"]',
        })
      })

      it('tertiary have to match icon button hover', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="button-icon-tertiary"]',
          simulate: 'hover',
        })
      })

      it('tertiary have to match icon button focus', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="button-icon-tertiary"]',
          simulate: 'focus',
        })
      })
    })

    describe('with href', () => {
      it('have to match default styles', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="button-anchor"]',
        })
      })

      it('have to match hover state', async () => {
        await makeScreenshot({
          style: {
            'padding-top': '2rem',
          },
          selector: '[data-visual-test="button-anchor"]',
          simulateSelector:
            '[data-visual-test="button-anchor"] a[target="_blank"]',
          simulate: 'hover',
        })
      })
    })
  }
)

describe.each(['dnb', 'sbanken'])(`Button for %s`, (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/button/demos/',
  })

  describe.each(['primary', 'secondary', 'tertiary'])(
    `on dark background %s`,
    (variant) => {
      it('default', async () => {
        await makeScreenshot({
          selector: `[data-visual-test="button-${variant}-on-dark"]`,
        })
      })

      it('hover', async () => {
        await makeScreenshot({
          selector: `[data-visual-test="button-${variant}-on-dark"]`,
          simulate: 'hover',
        })
      })

      it('active', async () => {
        await makeScreenshot({
          selector: `[data-visual-test="button-${variant}-on-dark"]`,
          simulate: 'active',
        })
      })

      it('focus', async () => {
        await makeScreenshot({
          selector: `[data-visual-test="button-${variant}-on-dark"]`,
          simulate: 'focus',
        })
      })
    }
  )
})

describe.each(['ui'])(`Button for %s`, (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/button/visual-tests/',
  })

  describe('primary', () => {
    it('have to match a stretched button', async () => {
      await makeScreenshot({
        style: {
          'min-width': '20rem',
        },
        selector: '[data-visual-test="button-stretch"]',
      })
    })
  })

  describe('tertiary', () => {
    it('have to match icon', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="button-tertiary-no-icon"]',
      })
    })

    it('have to match tertiary icon alignment', async () => {
      await makeScreenshot({
        style: {
          width: '20rem',
        },
        selector: '[data-visual-test="button-tertiary-alignment"]',
      })
    })
  })

  describe('unstyled', () => {
    it('have to match with icon', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="button-unstyled"]',
      })
    })
  })
})
