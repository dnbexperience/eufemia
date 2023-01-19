/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('DrawerList', () => {
  setupPageScreenshot({
    url: '/uilib/components/fragments/drawer-list/demos',
  })

  it('have to match the default drawer-list', async () => {
    const screenshot = await makeScreenshot({
      style: {
        width: '14rem',
      },
      selector: '[data-visual-test="drawer-list"] .dnb-drawer-list__list',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
