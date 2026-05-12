import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken'])(`HelperClasses for %s`, (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/helpers/classes/visual-tests/',
  })

  it('have to match core-style', async () => {
    await makeScreenshot({
      withWrapper: false,
      selector: '[data-visual-test="helper-core-style"]',
    })
  })

  it('have to match tap-focus', async () => {
    await makeScreenshot({
      withWrapper: false,
      selector: '[data-visual-test="helper-tap-focus"]',
    })
  })

  it('have to match unstyled-list', async () => {
    await makeScreenshot({
      withWrapper: false,
      selector: '[data-visual-test="helper-unstyled-list"]',
    })
  })

  it('have to match sr-only', async () => {
    await makeScreenshot({
      withWrapper: false,
      selector: '[data-visual-test="helper-sr-only"]',
    })
  })

  it('have to match selection', async () => {
    await makeScreenshot({
      withWrapper: false,
      selector: '[data-visual-test="helper-selection"]',
    })
  })

  it('have to match fieldset reset', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="helper-fieldset-reset"] fieldset',
    })
  })

  it('have to match focused skip link', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="skip-link"]',
      simulateSelector: '[data-visual-test="skip-link"] .dnb-skip-link',
      simulate: 'focus',
      screenshotSelector: '[data-visual-test="skip-link"] .dnb-skip-link',
    })
  })
})

describe('media', () => {
  const selector = '[data-visual-test="helper-media-offset"] ul'
  const url = '/uilib/helpers/classes/visual-tests/'

  it('have to match media offset for "isLarge"', async () => {
    await makeScreenshot({
      selector,
      url,
      pageViewport: {
        width: 1056,
      },
    })
  })

  it('have to match media offset for "isLarge" + offset', async () => {
    await makeScreenshot({
      selector,
      url,
      pageViewport: {
        width: 1057,
      },
    })
  })

  it('have to match media offset for below "isMedium"', async () => {
    await makeScreenshot({
      selector,
      url,
      pageViewport: {
        width: 736,
      },
    })
  })

  it('have to match media offset for below "isMedium" + offset', async () => {
    await makeScreenshot({
      selector,
      url,
      pageViewport: {
        width: 865,
      },
    })
  })

  it('have to match media offset for above "isMedium"', async () => {
    await makeScreenshot({
      selector,
      url,
      pageViewport: {
        width: 737,
      },
    })
  })

  it('have to match media offset for above "isMedium" + offset', async () => {
    await makeScreenshot({
      selector,
      url,
      pageViewport: {
        width: 864,
      },
    })
  })

  it('have to match media offset for "isSmall"', async () => {
    await makeScreenshot({
      selector,
      url,
      pageViewport: {
        width: 545,
      },
    })
  })

  it('have to match media offset for "isSmall" + offset', async () => {
    await makeScreenshot({
      selector,
      url,
      pageViewport: {
        width: 544,
      },
    })
  })
})
