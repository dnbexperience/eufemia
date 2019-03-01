/**
 * Scripts test
 *
 */

import path from 'path'
import { runFactory } from '../themeFactory'

// just to make sure we re-run the test in watch mode due to changes in theese files
import dnb_theme_ui from '../../../../src/style/themes/theme-ui/dnb-theme-ui.scss' // eslint-disable-line

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
