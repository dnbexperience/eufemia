/**
 * Abstract Test
 *
 */

import '../../core/jest/jestSetup'
import { Button, Anchor } from '../dnb-ui-lib'

describe('ESM main library package', () => {
  it('has to have a Button Component', () => {
    expect(typeof Button).toBe('function')
  })
  it('has to have a Anchor Element', () => {
    expect(typeof Anchor).toBe('function')
  })
})
