/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('Tooltip', () => {
  setupPageScreenshot({
    url: '/uilib/components/tooltip/demos',
  })
  it('have to match tooltip in active state', async () => {
    const screenshot = await testPageScreenshot({
      style: {
        height: '4rem',
        'padding-top': '2rem',
      },
      selector: '[data-visual-test="tooltip-active"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match tooltip on button hover state', async () => {
    const screenshot = await testPageScreenshot({
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
})
