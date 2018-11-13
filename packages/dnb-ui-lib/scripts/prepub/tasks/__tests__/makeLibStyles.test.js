/**
 * Scripts test
 *
 */

import { runFactory } from '../makeLibStyles'
import '../../../../src/components/button/style/dnb-button.scss' // just to make sure we re-run the test in watch mode due to changes in this file

beforeAll(async () => {
  global.css = await runFactory(
    './src/components/button/style/dnb-button.scss',
    {
      returnResult: true
    }
  )
})

describe('makeLibStyles transform main SASS to CSS', () => {
  it('has to contain a button selector', () => {
    expect(global.css).toContain('.dnb-button {')
  })
  it('has to have correct path to fonts', () => {
    expect(global.css).toContain('"../../../assets/fonts/')
  })
})
