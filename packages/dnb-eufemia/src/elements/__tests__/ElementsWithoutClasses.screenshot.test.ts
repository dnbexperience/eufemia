/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../core/jest/jestSetupScreenshots'

import { generatePackages } from 'dnb-design-system-portal/scripts/compile-css-packages.cjs'

generatePackages([
  '@dnb/eufemia/src/style/themes/theme-ui/ui-theme-tags.scss',
])

describe('Elements without classes', () => {
  setupPageScreenshot({
    url: '/uilib/elements/elements-without-classes',
  })

  it('should match all the typography variants', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="elements-without-classes"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
