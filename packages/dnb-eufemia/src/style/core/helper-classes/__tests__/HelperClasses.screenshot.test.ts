/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../core/jest/jestSetupScreenshots'

describe.each(['ui', 'sbanken'])('HelperClasses for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/helpers/classes/visual-tests',
  })

  it('have to match core-style', async () => {
    const screenshot = await makeScreenshot({
      addWrapper: false,
      selector: '[data-visual-test="helper-core-style"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match tap-focus', async () => {
    const screenshot = await makeScreenshot({
      addWrapper: false,
      selector: '[data-visual-test="helper-tap-focus"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match unstyled-list', async () => {
    const screenshot = await makeScreenshot({
      addWrapper: false,
      selector: '[data-visual-test="helper-unstyled-list"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match sr-only', async () => {
    const screenshot = await makeScreenshot({
      addWrapper: false,
      selector: '[data-visual-test="helper-sr-only"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match selection', async () => {
    const screenshot = await makeScreenshot({
      addWrapper: false,
      selector: '[data-visual-test="helper-selection"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match fieldset reset', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="helper-fieldset-reset"] fieldset',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match focused skip link', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="skip-link"]',
      simulateSelector: '[data-visual-test="skip-link"] .dnb-skip-link',
      simulate: 'focus',
      waitAfterSimulate: 300,
      screenshotSelector: '[data-visual-test="skip-link"] .dnb-skip-link',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('media', () => {
  const selector = '[data-visual-test="helper-media-offset"] ul'
  const url = '/uilib/helpers/classes/visual-tests'

  it('have to match media offset for "isLarge"', async () => {
    const screenshot = await makeScreenshot({
      selector,
      url,
      pageViewport: {
        width: 1055,
      },
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match media offset for "isLarge" + offset', async () => {
    const screenshot = await makeScreenshot({
      selector,
      url,
      pageViewport: {
        width: 1056,
      },
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match media offset for below "isMedium"', async () => {
    const screenshot = await makeScreenshot({
      selector,
      url,
      pageViewport: {
        width: 735,
      },
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match media offset for below "isMedium" + offset', async () => {
    const screenshot = await makeScreenshot({
      selector,
      url,
      pageViewport: {
        width: 865,
      },
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match media offset for above "isMedium"', async () => {
    const screenshot = await makeScreenshot({
      selector,
      url,
      pageViewport: {
        width: 736,
      },
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match media offset for above "isMedium" + offset', async () => {
    const screenshot = await makeScreenshot({
      selector,
      url,
      pageViewport: {
        width: 864,
      },
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match media offset for "isSmall"', async () => {
    const screenshot = await makeScreenshot({
      selector,
      url,
      pageViewport: {
        width: 545,
      },
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match media offset for "isSmall" + offset', async () => {
    const screenshot = await makeScreenshot({
      selector,
      url,
      pageViewport: {
        width: 544,
      },
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
