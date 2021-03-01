/**
 * Scripts test
 *
 */

import path from 'path'
import { runFactory } from '../themeFactory'

beforeAll(async () => {
  global.css = (
    await runFactory({
      processToNamesList: [
        path.resolve(
          __dirname,
          '../../../../src/style/themes/theme-ui/dnb-theme-ui.scss'
        )
      ],
      returnResult: true
    })
  )[0]
})

describe('The main UI Theme', () => {
  it('has to have the default theme with correct path', () => {
    expect(global.css).toContain(
      `@import '../../../style/themes/theme-ui/dnb-theme-ui.scss';`
    )
  })
})
