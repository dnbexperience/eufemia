/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe.each(['ui', 'sbanken'])('WordDefinition for %s', (themeName) => {
  setupPageScreenshot({
    url: '/uilib/components/word-definition/demos',
    themeName,
  })

  it('matches the basic style', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="word-definition-basic"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('matches the popover', async () => {
    const screenshot = await makeScreenshot({
      style: {
        'padding-bottom': '8rem',
      },
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="word-definition-basic"] .dnb-word-definition__trigger',
      selector: '[data-visual-test="word-definition-basic"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('matches various typography styles', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="word-definition-typography"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
