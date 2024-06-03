/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe.each(['ui', 'sbanken'])('FormStatus for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/form-status/demos',
  })

  const style = {
    'max-width': '60rem', // make sure our input gets an explicit width, because of mac/linux rendering differences
  }

  it('have to match the form-status with icon', async () => {
    const screenshot = await makeScreenshot({
      style,
      selector: '[data-visual-test="form-status"] .dnb-form-status',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the info state', async () => {
    const screenshot = await makeScreenshot({
      style,
      selector: '[data-visual-test="form-status-info"] .dnb-form-status',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match with stretch prop', async () => {
    const screenshot = await makeScreenshot({
      style: {
        'min-width': '60rem',
      },
      selector:
        '[data-visual-test="form-status-stretch"] .dnb-form-status',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the warn state', async () => {
    const screenshot = await makeScreenshot({
      style,
      selector: '[data-visual-test="form-status-warn"] .dnb-form-status',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the marketing state', async () => {
    const screenshot = await makeScreenshot({
      style,
      selector:
        '[data-visual-test="form-status-marketing"] .dnb-form-status',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match custom content', async () => {
    const screenshot = await makeScreenshot({
      style,
      selector: '[data-visual-test="form-status-custom"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match icons used in the icon component', async () => {
    const screenshot = await makeScreenshot({
      style,
      selector: '[data-visual-test="form-status-icons"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match all variants', async () => {
    const screenshot = await makeScreenshot({
      style,
      selector: '[data-visual-test="form-status-all-variants"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
