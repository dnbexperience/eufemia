/**
 * Scripts test
 *
 */

import '../../../../src/core/jest/jestSetup'
import { factory } from '../makeLibStyles'
// just to make sure we re-run the test in watch mode due to changes in this file
import './src/components/button/style/dnb-button.scss'

beforeAll(async () => {
  global.css = await factory(
    './src/components/button/style/dnb-button.scss',
    {
      returnResult: true
    }
  )
})

describe('makeLibStyles Factory', () => {
  it('has to convert SCSS to CSS', async () => {
    expect(global.css).toContain('.dnb-button {')
  })
  it('has to have correct path to fonts', async () => {
    expect(global.css).toContain('"../../assets/fonts/')
  })
})
