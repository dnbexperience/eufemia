/**
 * Element Test
 *
 */

import { loadScss } from '../../../core/jest/jestSetup'

describe('Elements scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../../dnb-ui-elements.scss'))
    expect(scss).toMatchSnapshot()
  })
})
