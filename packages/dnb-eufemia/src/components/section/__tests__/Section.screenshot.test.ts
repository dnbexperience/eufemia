/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

const sections = {
  ui: [
    'default',
    'white',
    'divider',
    'mint-green',
    'black-3',
    'sea-green',
    'emerald-green',
    'lavender',
    'sand-yellow',
    'pistachio',
    'fire-red',
    'z-index',
    'info',
    'error',
    'warning',
    'success'
  ],
  sbanken: [
    'default',
    'white',
    'info',
    'error',
    'warning',
    'success'
  ]
}

describe.each(['ui', 'sbanken'])('Section for %s', themeName => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/section/demos'
  })

  test.each(sections[themeName])("have to match %p section", async sectionName => {
    const screenshot = await makeScreenshot({
      selector: `[data-visual-test="section-${sectionName}"]`,
    })
    expect(screenshot).toMatchImageSnapshot()
  });
})
