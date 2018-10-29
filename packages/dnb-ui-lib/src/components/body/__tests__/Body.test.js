/**
 * Component Test
 *
 */

import { loadScss } from '../../../core/jest/jestSetup'
// just to make sure we re-run the test in watch mode due to changes in this file
import '../style/dnb-body.scss'

describe('Body scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-body.scss'))
    expect(scss).toMatchSnapshot()
  })
})
