/**
 * Scripts test
 *
 */

import path from 'path'
import { runFactory } from '../themeFactory'
import '../../../../src/style/themes/theme-ui/dnb-theme-ui.scss' // just to make sure we re-run the test in watch mode due to changes in this file

beforeAll(async () => {
  global.css = (await runFactory({
    processToNamesList: [
      path.resolve(
        __dirname,
        '../../../../src/style/themes/theme-ui/dnb-theme-ui.scss'
      )
    ],
    returnResult: true
  }))[0]
})

describe('The main UI Theme', () => {
  it('has to have the default theme with correct path', () => {
    expect(global.css).toContain(
      `@import '../../../style/themes/theme-ui/dnb-theme-ui.scss';`
    )
  })
})
