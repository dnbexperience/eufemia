/**
 * Scripts test
 *
 */

import path from 'path'
import { runFactory } from '../themeFactory'
import '../../../../src/style/themes/dnb-theme-ui.scss' // just to make sure we re-run the test in watch mode due to changes in this file

beforeAll(async () => {
  global.css = (await runFactory({
    processToNamesList: [
      path.resolve(
        __dirname,
        '../../../../src/style/themes/dnb-theme-ui.scss'
      )
    ],
    returnResult: true
  }))[0]
})

describe('themeFactory collect and generate the themes', () => {
  it('has to have the default theme with correct path', () => {
    expect(global.css).toContain(
      `@import '../../style/themes/dnb-theme-ui.scss';`
    )
  })
})
