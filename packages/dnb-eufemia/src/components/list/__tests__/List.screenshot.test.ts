/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe.each(['ui', 'sbanken'])('List for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/list/demos',
  })

  it('have to match slots list', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="list-slots"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match navigate list', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="list-navigate"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match navigate list in hover state', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="list-navigate"]',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match accordion list', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="list-accordion"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match pending list', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="list-pending"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
