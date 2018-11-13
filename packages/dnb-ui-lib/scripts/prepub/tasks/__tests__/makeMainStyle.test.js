/**
 * Scripts test
 *
 */

import { runFactory } from '../makeMainStyle'
import '../../../../src/style/dnb-ui-components.scss' // just to make sure we re-run the test in watch mode due to changes in this file

beforeAll(async () => {
  global.css = await runFactory('./src/style/dnb-ui-components.scss', {
    returnResult: true
  })
})

describe('makeMainStyle transform main SASS to CSS', () => {
  it('has to contain a button selector', () => {
    expect(global.css).toContain('.dnb-button {')
  })
  it('has to have correct path to fonts', () => {
    expect(global.css).toContain('"../assets/fonts/')
  })
})
