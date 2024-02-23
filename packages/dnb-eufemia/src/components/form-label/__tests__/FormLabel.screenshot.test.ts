/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe.each(['ui', 'sbanken'])('FormLabel for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/form-label/demos',
  })

  it('have to match default form-label', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="form-label-default"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match default form-label with hover', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="form-label-default"]',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match checkbox label hover', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="form-label-default"]',
      simulate: 'hover',
      simulateSelector:
        '[data-visual-test="form-label-default"] .dnb-checkbox .dnb-form-label',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match vertical form-label', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="form-label-vertical"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match fix-content width', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="form-label-vertical"] label',
      style: {
        'background-color': 'yellow',
      },
      wrapperStyle: {
        display: 'block',
        width: '20rem',
      },
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
