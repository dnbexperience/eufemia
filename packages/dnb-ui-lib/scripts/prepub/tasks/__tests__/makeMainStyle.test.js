/**
 * Scripts test
 *
 */

import { runFactory } from '../makeMainStyle'
import '../../../../src/style/dnb-ui-core.scss' // just to make sure we re-run the test in watch mode due to changes in this file
import '../../../../src/style/dnb-ui-components.scss' // just to make sure we re-run the test in watch mode due to changes in this file

beforeAll(async () => {
  global.core = await runFactory('./src/style/dnb-ui-core.scss', {
    returnResult: true
  })
  global.components = await runFactory(
    './src/style/dnb-ui-components.scss',
    {
      returnResult: true
    }
  )
})

describe('makeMainStyle transform core SASS to CSS', () => {
  it('has to contain a button selector', () => {
    expect(global.components).toContain('.dnb-button {')
  })
  it('has to have correct core path to fonts', () => {
    expect(global.core).toContain('"../assets/fonts/')
  })
})
