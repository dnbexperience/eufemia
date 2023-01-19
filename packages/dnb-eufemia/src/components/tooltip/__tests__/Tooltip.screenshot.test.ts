/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('Tooltip', () => {
  setupPageScreenshot({
    url: '/uilib/components/tooltip/demos',
  })

  it('have to match tooltip on button hover state', async () => {
    const screenshot = await makeScreenshot({
      style: {
        height: '4rem',
        'padding-top': '2rem',
      },
      selector: '[data-visual-test="tooltip-hover"]',
      simulateSelector: '[data-visual-test="tooltip-hover"] button',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match tooltip in large size', async () => {
    const screenshot = await makeScreenshot({
      style: {
        height: '5rem',
        padding: '3rem 0 0 2rem',
      },
      selector: '[data-visual-test="tooltip-large"]',
      simulateSelector:
        '[data-visual-test="tooltip-large"] .dnb-span:nth-of-type(1)',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
