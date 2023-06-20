/**
 * Element Test
 *
 */

import { loadScss } from '../../../core/jest/jestSetup'

describe('Elements scss', () => {
  it('has to match style dependencies css', () => {
    const css = loadScss(require.resolve('../../dnb-ui-elements.scss'))
    expect(css).toMatchSnapshot()
  })
})
