/**
 * Scripts test
 *
 */

import { runFactory } from '../makeMainStyle'
import '../../../../src/style/dnb-ui-components.scss' // just to make sure we re-run the test in watch mode due to changes in this file

beforeAll(async () => {
  global.components = await runFactory(
    './src/style/dnb-ui-components.scss',
    {
      returnResult: true
    }
  )
  global.theme = await runFactory('./src/style/themes/dnb-theme-ui.scss', {
    returnResult: true
  })
})

describe('makeMainStyle transform components SASS to CSS', () => {
  it('has to contain a button selector', () => {
    expect(global.components).toContain('.dnb-button {')
  })
  it('has to have correct components path to fonts', () => {
    expect(global.components).toContain('"../assets/fonts/')
  })
})

describe('makeMainStyle transform main theme SASS to CSS', () => {
  it('has to have correct path to fonts', () => {
    expect(global.theme).toContain('"../../assets/fonts/')
  })
})
